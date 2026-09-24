<?php
declare(strict_types=1);

final class Schema
{
    private const CATALOG_VERSION = 2;

    public static function migrate(PDO $db, array $admin, array $company): void
    {
        $queries = [
            "CREATE TABLE IF NOT EXISTS cms_users (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(120) NOT NULL,
                email VARCHAR(190) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                role VARCHAR(30) NOT NULL DEFAULT 'admin',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
            "CREATE TABLE IF NOT EXISTS cms_settings (
                setting_key VARCHAR(120) PRIMARY KEY,
                setting_value TEXT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
            "CREATE TABLE IF NOT EXISTS cms_products (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                slug VARCHAR(190) NOT NULL UNIQUE,
                title VARCHAR(190) NOT NULL,
                title_en VARCHAR(190) NOT NULL,
                category VARCHAR(100) NOT NULL,
                summary TEXT NOT NULL,
                summary_en TEXT NOT NULL,
                content MEDIUMTEXT NULL,
                content_en MEDIUMTEXT NULL,
                image VARCHAR(255) NULL,
                specs_json TEXT NULL,
                details_json MEDIUMTEXT NULL,
                status ENUM('draft','published') NOT NULL DEFAULT 'published',
                sort_order INT NOT NULL DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_product_status (status, sort_order)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
            "CREATE TABLE IF NOT EXISTS cms_articles (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                slug VARCHAR(190) NOT NULL UNIQUE,
                title VARCHAR(255) NOT NULL,
                title_en VARCHAR(255) NOT NULL,
                category VARCHAR(100) NOT NULL,
                category_en VARCHAR(100) NOT NULL DEFAULT '',
                excerpt TEXT NOT NULL,
                excerpt_en TEXT NOT NULL,
                content MEDIUMTEXT NULL,
                content_en MEDIUMTEXT NULL,
                image VARCHAR(255) NULL,
                related_json TEXT NULL,
                status ENUM('draft','published') NOT NULL DEFAULT 'published',
                published_at DATETIME NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_article_status (status, published_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
            "CREATE TABLE IF NOT EXISTS cms_jobs (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                slug VARCHAR(190) NOT NULL UNIQUE,
                title VARCHAR(190) NOT NULL,
                title_en VARCHAR(190) NOT NULL,
                department VARCHAR(120) NOT NULL,
                department_en VARCHAR(120) NOT NULL DEFAULT '',
                location VARCHAR(160) NOT NULL,
                employment_type VARCHAR(80) NOT NULL,
                employment_type_en VARCHAR(80) NOT NULL DEFAULT '',
                description MEDIUMTEXT NOT NULL,
                description_en MEDIUMTEXT NOT NULL,
                status ENUM('draft','published') NOT NULL DEFAULT 'published',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_job_status (status, created_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
            "CREATE TABLE IF NOT EXISTS cms_inquiries (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(150) NOT NULL,
                company VARCHAR(150) NULL,
                email VARCHAR(190) NOT NULL,
                phone VARCHAR(80) NULL,
                inquiry_type VARCHAR(100) NOT NULL,
                message TEXT NOT NULL,
                status ENUM('new','in_progress','closed') NOT NULL DEFAULT 'new',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_inquiry_status (status, created_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
        ];

        foreach ($queries as $query) $db->exec($query);
        self::addColumn($db, 'cms_products', 'details_json', 'MEDIUMTEXT NULL AFTER specs_json');
        self::addColumn($db, 'cms_articles', 'category_en', "VARCHAR(100) NOT NULL DEFAULT '' AFTER category");
        self::addColumn($db, 'cms_articles', 'related_json', 'TEXT NULL AFTER image');
        self::addColumn($db, 'cms_jobs', 'department_en', "VARCHAR(120) NOT NULL DEFAULT '' AFTER department");
        self::addColumn($db, 'cms_jobs', 'employment_type_en', "VARCHAR(80) NOT NULL DEFAULT '' AFTER employment_type");

        if ((int) $db->query('SELECT COUNT(*) FROM cms_users')->fetchColumn() === 0) {
            $statement = $db->prepare('INSERT INTO cms_users (name, email, password_hash, role) VALUES (?, ?, ?, ?)');
            $statement->execute([$admin['name'], strtolower($admin['email']), password_hash($admin['password'], PASSWORD_DEFAULT), 'admin']);
        }

        self::seedSettings($db, $company);
        self::seedCatalog($db);
    }

    private static function addColumn(PDO $db, string $table, string $column, string $definition): void
    {
        $statement = $db->prepare('SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?');
        $statement->execute([$table, $column]);
        if ((int) $statement->fetchColumn() === 0) $db->exec("ALTER TABLE {$table} ADD COLUMN {$column} {$definition}");
    }

    private static function seedSettings(PDO $db, array $settings): void
    {
        $statement = $db->prepare('INSERT IGNORE INTO cms_settings (setting_key, setting_value) VALUES (?, ?)');
        foreach ($settings as $key => $value) $statement->execute([$key, $value]);
    }

    private static function seedCatalog(PDO $db): void
    {
        $version = $db->query("SELECT setting_value FROM cms_settings WHERE setting_key = 'catalog_version' LIMIT 1")->fetchColumn();
        if ((int) $version >= self::CATALOG_VERSION) return;

        $catalogPath = __DIR__ . '/data/catalog.json';
        $catalog = json_decode((string) file_get_contents($catalogPath), true, 512, JSON_THROW_ON_ERROR);
        $categoryMap = ['passive' => 'Passive', 'active' => 'Active', 'fttx' => 'FTTx Tools', 'software' => 'Software', 'itai' => 'IT & AI'];
        $productImages = [
            'patchcord' => 'hero-fiber.webp', 'drop-cable' => 'implementation-fiber.webp', 'joint-closure' => 'implementation-fiber.webp',
            'odp' => 'implementation-fiber.webp', 'otb' => 'hero-fiber.webp', 'splitter' => 'hero-fiber.webp',
            'ont' => 'service-active.webp', 'olt' => 'service-active.webp', 'splicer' => 'service-fttx.webp',
            'otdr' => 'service-fttx.webp', 'nms' => 'service-software.webp', 'ai-platform' => 'service-ai.webp',
        ];
        $articleImages = [
            'fiber-optic-indonesia' => 'implementation-fiber.webp', 'fttx-tools' => 'service-fttx.webp',
            'partnership-2024' => 'implementation-enterprise.webp', 'fttx-broadband' => 'hero-fiber.webp',
            'enterprise-network' => 'implementation-enterprise.webp', 'ai-network' => 'service-ai.webp',
        ];

        $db->beginTransaction();
        try {
            $legacyProducts = ['fiber-optic-patchcord','optical-distribution-point','gpon-ont','fusion-splicer','network-management-platform','ai-operations-analytics'];
            $placeholders = implode(',', array_fill(0, count($legacyProducts), '?'));
            $delete = $db->prepare("DELETE FROM cms_products WHERE slug IN ({$placeholders})");
            $delete->execute($legacyProducts);

            $productSql = 'INSERT INTO cms_products (slug,title,title_en,category,summary,summary_en,content,content_en,image,specs_json,details_json,status,sort_order)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,"published",?) ON DUPLICATE KEY UPDATE title=VALUES(title),title_en=VALUES(title_en),category=VALUES(category),summary=VALUES(summary),summary_en=VALUES(summary_en),content=VALUES(content),content_en=VALUES(content_en),image=VALUES(image),specs_json=VALUES(specs_json),details_json=VALUES(details_json),status="published",sort_order=VALUES(sort_order)';
            $productStatement = $db->prepare($productSql);
            foreach ($catalog['products'] as $index => $product) {
                $specs = [];
                foreach ($product['specs'] as $spec) $specs[$spec['label']['ID']] = $spec['value'];
                $productStatement->execute([
                    $product['id'], $product['name'], $product['name'], $categoryMap[$product['cat']] ?? $product['cat'],
                    self::summary($product['desc']['ID']), self::summary($product['desc']['EN']), $product['desc']['ID'], $product['desc']['EN'],
                    $productImages[$product['id']] ?? 'implementation-digital.webp',
                    json_encode($specs, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                    json_encode($product, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), $index + 1,
                ]);
            }

            $legacyArticles = ['infrastruktur-fiber-optik-indonesia','tool-fttx-untuk-deployment','dms-memperkuat-ekosistem'];
            $placeholders = implode(',', array_fill(0, count($legacyArticles), '?'));
            $delete = $db->prepare("DELETE FROM cms_articles WHERE slug IN ({$placeholders})");
            $delete->execute($legacyArticles);

            $articleSql = 'INSERT INTO cms_articles (slug,title,title_en,category,category_en,excerpt,excerpt_en,content,content_en,image,related_json,status,published_at)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,"published",?) ON DUPLICATE KEY UPDATE title=VALUES(title),title_en=VALUES(title_en),category=VALUES(category),category_en=VALUES(category_en),excerpt=VALUES(excerpt),excerpt_en=VALUES(excerpt_en),content=VALUES(content),content_en=VALUES(content_en),image=VALUES(image),related_json=VALUES(related_json),status="published",published_at=VALUES(published_at)';
            $articleStatement = $db->prepare($articleSql);
            foreach ($catalog['articles'] as $article) {
                $published = DateTimeImmutable::createFromFormat('d M Y', $article['date']) ?: new DateTimeImmutable();
                $articleStatement->execute([
                    $article['id'], $article['title']['ID'], $article['title']['EN'], $article['cat']['ID'], $article['cat']['EN'],
                    $article['excerpt']['ID'], $article['excerpt']['EN'], $article['body']['ID'], $article['body']['EN'],
                    $articleImages[$article['id']] ?? 'implementation-digital.webp',
                    json_encode($article['related'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), $published->format('Y-m-d 09:00:00'),
                ]);
            }

            $db->exec("DELETE FROM cms_jobs WHERE slug IN ('network-engineer','business-development-executive','software-developer')");
            $jobs = [
                ['network-engineer','Network Engineer','Network Engineer','Teknik','Engineering','Jakarta','Penuh Waktu','Full-time'],
                ['fiber-optic-technician','Teknisi Fiber Optik','Fiber Optic Technician','Operasional Lapangan','Field Operations','Jakarta / Regional','Penuh Waktu','Full-time'],
                ['software-developer','Pengembang Perangkat Lunak','Software Developer','Teknologi','Technology','Jakarta','Penuh Waktu','Full-time'],
                ['it-solutions-consultant','Konsultan Solusi IT','IT Solutions Consultant','Penjualan & Solusi','Sales & Solutions','Jakarta','Penuh Waktu','Full-time'],
                ['product-specialist','Spesialis Produk','Product Specialist','Produk','Product','Jakarta','Penuh Waktu','Full-time'],
                ['business-development-manager','Manajer Pengembangan Bisnis','Business Development Manager','Pengembangan Bisnis','Business Development','Jakarta','Penuh Waktu','Full-time'],
            ];
            $jobSql = 'INSERT INTO cms_jobs (slug,title,title_en,department,department_en,location,employment_type,employment_type_en,description,description_en,status)
                VALUES (?,?,?,?,?,?,?,?,?,?,"published") ON DUPLICATE KEY UPDATE title=VALUES(title),title_en=VALUES(title_en),department=VALUES(department),department_en=VALUES(department_en),location=VALUES(location),employment_type=VALUES(employment_type),employment_type_en=VALUES(employment_type_en),description=VALUES(description),description_en=VALUES(description_en),status="published"';
            $jobStatement = $db->prepare($jobSql);
            foreach ($jobs as $job) {
                $jobStatement->execute([
                    ...$job,
                    "Kami mencari {$job[1]} untuk bergabung dengan tim DMS dan mengerjakan proyek infrastruktur konektivitas serta teknologi nyata untuk klien enterprise dan telekomunikasi.",
                    "We are looking for a {$job[2]} to join DMS and work on real-world connectivity and technology infrastructure projects for enterprise and telecommunications clients.",
                ]);
            }

            $versionStatement = $db->prepare('INSERT INTO cms_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)');
            $versionStatement->execute(['catalog_version', (string) self::CATALOG_VERSION]);
            $db->commit();
        } catch (Throwable $error) {
            if ($db->inTransaction()) $db->rollBack();
            throw $error;
        }
    }

    private static function summary(string $text): string
    {
        return mb_strlen($text) > 190 ? rtrim(mb_substr($text, 0, 187)) . '…' : $text;
    }
}

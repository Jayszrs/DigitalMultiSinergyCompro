<?php
declare(strict_types=1);

final class Schema
{
    public static function migrate(PDO $db, array $admin): void
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
                excerpt TEXT NOT NULL,
                excerpt_en TEXT NOT NULL,
                content MEDIUMTEXT NULL,
                content_en MEDIUMTEXT NULL,
                image VARCHAR(255) NULL,
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
                location VARCHAR(160) NOT NULL,
                employment_type VARCHAR(80) NOT NULL,
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

        if ((int) $db->query('SELECT COUNT(*) FROM cms_users')->fetchColumn() === 0) {
            $statement = $db->prepare('INSERT INTO cms_users (name, email, password_hash, role) VALUES (?, ?, ?, ?)');
            $statement->execute([$admin['name'], strtolower($admin['email']), password_hash($admin['password'], PASSWORD_DEFAULT), 'admin']);
        }

        self::seedSettings($db);
        self::seedContent($db);
    }

    private static function seedSettings(PDO $db): void
    {
        $settings = [
            'company_name' => 'Digital Multi Sinergy',
            'company_tagline' => 'Technology & Connectivity',
            'email' => 'info@digitalmultisinergy.co.id',
            'phone' => '+62 878-9111-8166',
            'whatsapp' => '6287891118166',
            'address' => 'Cervino Apartment, Office Floor L1, M, N, Jl. KH Abdullah Syafei No.27, RT.3/RW.1, Tebet Barat, Kec. Tebet, Daerah Khusus Ibukota Jakarta 12810',
            'business_hours' => 'Senin–Jumat, 09.00–17.00 WIB',
            'instagram_url' => 'https://www.instagram.com/digitalmultisinergy.official',
            'linkedin_url' => 'https://www.linkedin.com/company/digitalmultisinergy',
            'map_query' => 'Cervino Apartment Office Floor L1 M N Jl KH Abdullah Syafei No 27 Tebet Jakarta 12810',
            'project_count' => '50+',
            'partner_count' => '20+',
            'experience_years' => '4+',
        ];
        $statement = $db->prepare('INSERT IGNORE INTO cms_settings (setting_key, setting_value) VALUES (?, ?)');
        foreach ($settings as $key => $value) $statement->execute([$key, $value]);
    }

    private static function seedContent(PDO $db): void
    {
        if ((int) $db->query('SELECT COUNT(*) FROM cms_products')->fetchColumn() === 0) {
            $products = [
                ['fiber-optic-patchcord','Fiber Optic Patchcord','Fiber Optic Patchcord','Passive','Patchcord presisi untuk koneksi fiber optik yang stabil dan rendah loss.','Precision patchcord for stable, low-loss fiber optic connections.','Tersedia dalam berbagai pilihan connector, polishing, panjang, dan tipe fiber untuk jaringan FTTx maupun enterprise.','Available in multiple connector, polish, length, and fiber options for FTTx and enterprise networks.','hero-fiber.webp','{"Fiber":"G657A2 / G652D","Connector":"SC / LC / FC","Insertion Loss":"≤ 0.3 dB"}'],
                ['optical-distribution-point','Optical Distribution Point','Optical Distribution Point','Passive','ODP tangguh untuk distribusi akses fiber di lapangan.','Rugged ODP for field fiber access distribution.','Enclosure distribusi dengan manajemen kabel yang rapi untuk deployment indoor dan outdoor.','Distribution enclosure with tidy cable management for indoor and outdoor deployment.','implementation-fiber.webp','{"Capacity":"8 / 16 / 24 Core","Protection":"IP65","Application":"FTTH / FTTx"}'],
                ['gpon-ont','GPON Optical Network Terminal','GPON Optical Network Terminal','Active','ONT berperforma tinggi untuk konektivitas pelanggan broadband.','High-performance ONT for broadband customer connectivity.','Mendukung layanan internet, voice, dan IPTV dengan pengelolaan jaringan yang efisien.','Supports internet, voice, and IPTV services with efficient network management.','service-active.webp','{"Standard":"ITU-T G.984","Ports":"GE / FE / Wi-Fi","Management":"OMCI"}'],
                ['fusion-splicer','Fusion Splicer','Fusion Splicer','FTTx Tools','Splicer ringkas dengan proses penyambungan cepat dan presisi.','Compact splicer with fast, precise fiber joining.','Dirancang untuk teknisi lapangan dengan alignment akurat, baterai tahan lama, dan interface yang mudah digunakan.','Designed for field technicians with precise alignment, long battery life, and an intuitive interface.','service-fttx.webp','{"Alignment":"Core / Cladding","Splice Time":"≤ 8 seconds","Heating":"≤ 18 seconds"}'],
                ['network-management-platform','Network Management Platform','Network Management Platform','Software','Monitoring jaringan terpusat dengan dashboard real-time.','Centralized network monitoring with real-time dashboards.','Platform modular untuk observability, alerting, inventory, dan reporting operasional.','A modular platform for observability, alerting, inventory, and operational reporting.','service-software.webp','{"Deployment":"Cloud / On-premise","Integration":"REST API","Access":"Role-based"}'],
                ['ai-operations-analytics','AI Operations Analytics','AI Operations Analytics','IT & AI','Analitik prediktif untuk membantu operasi yang lebih proaktif.','Predictive analytics for more proactive operations.','Mengubah data operasional menjadi insight, deteksi anomali, dan rekomendasi tindakan.','Turns operational data into insights, anomaly detection, and recommended actions.','service-ai.webp','{"Model":"Customizable","Data":"Batch / Streaming","Output":"Dashboard / API"}'],
            ];
            $statement = $db->prepare('INSERT INTO cms_products (slug,title,title_en,category,summary,summary_en,content,content_en,image,specs_json,status,sort_order) VALUES (?,?,?,?,?,?,?,?,?,?,"published",?)');
            foreach ($products as $index => $product) $statement->execute([...$product, $index + 1]);
        }

        if ((int) $db->query('SELECT COUNT(*) FROM cms_articles')->fetchColumn() === 0) {
            $articles = [
                ['infrastruktur-fiber-optik-indonesia','Infrastruktur Fiber Optik dalam Ekonomi Digital Indonesia','Fiber Optic Infrastructure in Indonesia’s Digital Economy','Teknologi','Mengapa fiber optik tetap menjadi fondasi transformasi digital di berbagai sektor.','Why fiber optics remain the foundation of digital transformation across sectors.','Kebutuhan konektivitas yang stabil terus meningkat. Infrastruktur fiber optik memberikan kapasitas, latensi, dan keandalan yang diperlukan untuk layanan digital modern.','Demand for stable connectivity keeps growing. Fiber infrastructure provides the capacity, latency, and reliability required by modern digital services.','implementation-fiber.webp','2026-08-14 09:00:00'],
                ['tool-fttx-untuk-deployment','Memilih Tool FTTx untuk Deployment yang Efisien','Choosing FTTx Tools for Efficient Deployment','Produk','Panduan ringkas memilih splicer, OTDR, dan alat ukur untuk tim lapangan.','A concise guide to selecting splicers, OTDRs, and field measurement tools.','Pemilihan perangkat yang tepat mempersingkat waktu instalasi dan membantu menjaga kualitas hasil pekerjaan di lapangan.','Choosing the right equipment shortens installation time and helps maintain consistent field quality.','service-fttx.webp','2026-07-28 09:00:00'],
                ['dms-memperkuat-ekosistem','DMS Memperkuat Ekosistem Kemitraan Teknologi','DMS Strengthens Its Technology Partnership Ecosystem','Perusahaan','Kolaborasi yang lebih luas untuk menghadirkan solusi konektivitas end-to-end.','Broader collaboration to deliver end-to-end connectivity solutions.','Kemitraan teknologi memungkinkan integrasi produk, keahlian, dan dukungan yang lebih lengkap bagi pelanggan.','Technology partnerships bring together products, expertise, and support for more complete customer outcomes.','implementation-enterprise.webp','2026-06-15 09:00:00'],
            ];
            $statement = $db->prepare('INSERT INTO cms_articles (slug,title,title_en,category,excerpt,excerpt_en,content,content_en,image,status,published_at) VALUES (?,?,?,?,?,?,?,?,?,"published",?)');
            foreach ($articles as $article) $statement->execute($article);
        }

        if ((int) $db->query('SELECT COUNT(*) FROM cms_jobs')->fetchColumn() === 0) {
            $jobs = [
                ['network-engineer','Network Engineer','Network Engineer','Engineering','Jakarta Selatan','Full-time','Mengelola implementasi, testing, troubleshooting, dan dokumentasi jaringan pelanggan.','Manage customer network implementation, testing, troubleshooting, and documentation.'],
                ['business-development-executive','Business Development Executive','Business Development Executive','Commercial','Jakarta Selatan','Full-time','Mengembangkan peluang bisnis dan membangun hubungan dengan pelanggan serta partner teknologi.','Develop business opportunities and relationships with customers and technology partners.'],
                ['software-developer','Software Developer','Software Developer','Technology','Hybrid – Jakarta','Full-time','Membangun aplikasi web dan integrasi sistem untuk solusi digital pelanggan.','Build web applications and system integrations for customer digital solutions.'],
            ];
            $statement = $db->prepare('INSERT INTO cms_jobs (slug,title,title_en,department,location,employment_type,description,description_en,status) VALUES (?,?,?,?,?,?,?,?,"published")');
            foreach ($jobs as $job) $statement->execute($job);
        }
    }
}

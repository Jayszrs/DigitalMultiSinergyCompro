<?php
declare(strict_types=1);

final class Cms
{
    private const TABLES = ['products' => 'cms_products', 'articles' => 'cms_articles', 'jobs' => 'cms_jobs'];

    public function __construct(private PDO $db) {}

    public function settings(): array
    {
        return $this->db->query('SELECT setting_key, setting_value FROM cms_settings')->fetchAll(PDO::FETCH_KEY_PAIR);
    }

    public function saveSettings(array $values): void
    {
        $allowed = ['company_name','company_tagline','email','phone','whatsapp','address','business_hours','instagram_url','linkedin_url','map_query','project_count','partner_count','experience_years'];
        $statement = $this->db->prepare('INSERT INTO cms_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)');
        foreach ($allowed as $key) if (array_key_exists($key, $values)) $statement->execute([$key, trim((string) $values[$key])]);
    }

    public function all(string $type, bool $publishedOnly = false): array
    {
        $table = $this->table($type);
        $where = $publishedOnly ? " WHERE status = 'published'" : '';
        $order = $type === 'articles' ? 'published_at DESC' : ($type === 'products' ? 'sort_order ASC, id DESC' : 'created_at DESC');
        return $this->db->query("SELECT * FROM {$table}{$where} ORDER BY {$order}")->fetchAll();
    }

    public function find(string $type, int $id): ?array
    {
        $statement = $this->db->prepare('SELECT * FROM ' . $this->table($type) . ' WHERE id = ?');
        $statement->execute([$id]);
        return $statement->fetch() ?: null;
    }

    public function findBySlug(string $type, string $slug): ?array
    {
        $statement = $this->db->prepare('SELECT * FROM ' . $this->table($type) . " WHERE slug = ? AND status = 'published' LIMIT 1");
        $statement->execute([$slug]);
        return $statement->fetch() ?: null;
    }

    public function save(string $type, array $data, ?int $id = null): int
    {
        return match ($type) {
            'products' => $this->saveProduct($data, $id),
            'articles' => $this->saveArticle($data, $id),
            'jobs' => $this->saveJob($data, $id),
            default => throw new InvalidArgumentException('Invalid content type.'),
        };
    }

    public function delete(string $type, int $id): void
    {
        $statement = $this->db->prepare('DELETE FROM ' . $this->table($type) . ' WHERE id = ?');
        $statement->execute([$id]);
    }

    public function inquiries(): array
    {
        return $this->db->query('SELECT * FROM cms_inquiries ORDER BY created_at DESC')->fetchAll();
    }

    public function createInquiry(array $data): void
    {
        $statement = $this->db->prepare('INSERT INTO cms_inquiries (name,company,email,phone,inquiry_type,message) VALUES (?,?,?,?,?,?)');
        $statement->execute([$data['name'],$data['company'],$data['email'],$data['phone'],$data['inquiry_type'],$data['message']]);
    }

    public function updateInquiry(int $id, string $status): void
    {
        if (!in_array($status, ['new','in_progress','closed'], true)) $status = 'new';
        $statement = $this->db->prepare('UPDATE cms_inquiries SET status = ? WHERE id = ?');
        $statement->execute([$status, $id]);
    }

    public function counts(): array
    {
        $counts = [];
        foreach (['products','articles','jobs'] as $type) $counts[$type] = (int) $this->db->query('SELECT COUNT(*) FROM ' . $this->table($type))->fetchColumn();
        $counts['inquiries'] = (int) $this->db->query("SELECT COUNT(*) FROM cms_inquiries WHERE status != 'closed'")->fetchColumn();
        return $counts;
    }

    private function saveProduct(array $data, ?int $id): int
    {
        $fields = [
            'slug' => slugify((string) ($data['slug'] ?: $data['title'])), 'title' => trim((string) $data['title']), 'title_en' => trim((string) $data['title_en']),
            'category' => trim((string) $data['category']), 'summary' => trim((string) $data['summary']), 'summary_en' => trim((string) $data['summary_en']),
            'content' => trim((string) $data['content']), 'content_en' => trim((string) $data['content_en']), 'image' => trim((string) $data['image']),
            'specs_json' => trim((string) $data['specs_json']), 'status' => $data['status'] === 'draft' ? 'draft' : 'published', 'sort_order' => (int) ($data['sort_order'] ?? 0),
        ];
        return $this->persist('cms_products', $fields, $id);
    }

    private function saveArticle(array $data, ?int $id): int
    {
        $fields = [
            'slug' => slugify((string) ($data['slug'] ?: $data['title'])), 'title' => trim((string) $data['title']), 'title_en' => trim((string) $data['title_en']),
            'category' => trim((string) $data['category']), 'excerpt' => trim((string) $data['excerpt']), 'excerpt_en' => trim((string) $data['excerpt_en']),
            'content' => trim((string) $data['content']), 'content_en' => trim((string) $data['content_en']), 'image' => trim((string) $data['image']),
            'status' => $data['status'] === 'draft' ? 'draft' : 'published', 'published_at' => $this->normalizeDateTime((string) ($data['published_at'] ?: date('Y-m-d H:i:s'))),
        ];
        return $this->persist('cms_articles', $fields, $id);
    }

    private function saveJob(array $data, ?int $id): int
    {
        $fields = [
            'slug' => slugify((string) ($data['slug'] ?: $data['title'])), 'title' => trim((string) $data['title']), 'title_en' => trim((string) $data['title_en']),
            'department' => trim((string) $data['department']), 'location' => trim((string) $data['location']), 'employment_type' => trim((string) $data['employment_type']),
            'description' => trim((string) $data['description']), 'description_en' => trim((string) $data['description_en']), 'status' => $data['status'] === 'draft' ? 'draft' : 'published',
        ];
        return $this->persist('cms_jobs', $fields, $id);
    }

    private function persist(string $table, array $fields, ?int $id): int
    {
        if ($id) {
            $assignments = implode(', ', array_map(fn($key) => "{$key} = ?", array_keys($fields)));
            $statement = $this->db->prepare("UPDATE {$table} SET {$assignments} WHERE id = ?");
            $statement->execute([...array_values($fields), $id]);
            return $id;
        }
        $columns = implode(', ', array_keys($fields));
        $placeholders = implode(', ', array_fill(0, count($fields), '?'));
        $statement = $this->db->prepare("INSERT INTO {$table} ({$columns}) VALUES ({$placeholders})");
        $statement->execute(array_values($fields));
        return (int) $this->db->lastInsertId();
    }

    private function normalizeDateTime(string $value): string
    {
        $value = str_replace('T', ' ', trim($value));
        return strlen($value) === 16 ? $value . ':00' : $value;
    }

    private function table(string $type): string
    {
        if (!isset(self::TABLES[$type])) throw new InvalidArgumentException('Invalid content type.');
        return self::TABLES[$type];
    }
}

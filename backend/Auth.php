<?php
declare(strict_types=1);

final class Auth
{
    public function __construct(private PDO $db) {}

    public function attempt(string $email, string $password): bool
    {
        $statement = $this->db->prepare('SELECT id, name, email, password_hash, role FROM cms_users WHERE email = ? LIMIT 1');
        $statement->execute([strtolower(trim($email))]);
        $user = $statement->fetch();
        if (!$user || !password_verify($password, $user['password_hash'])) return false;
        session_regenerate_id(true);
        unset($user['password_hash']);
        $_SESSION['cms_user'] = $user;
        return true;
    }

    public function check(): bool
    {
        return !empty($_SESSION['cms_user']['id']);
    }

    public function user(): ?array
    {
        return $_SESSION['cms_user'] ?? null;
    }

    public function requireLogin(): void
    {
        if (!$this->check()) redirect('admin/login');
    }

    public function logout(): void
    {
        unset($_SESSION['cms_user']);
        session_regenerate_id(true);
    }
}

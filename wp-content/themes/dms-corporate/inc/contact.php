<?php
if (!defined('ABSPATH')) { exit; }

add_action('admin_post_nopriv_dms_submit_inquiry', 'dms_submit_inquiry');
add_action('admin_post_dms_submit_inquiry', 'dms_submit_inquiry');

function dms_submit_inquiry(): void {
    if (!isset($_POST['dms_contact_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['dms_contact_nonce'])), 'dms_contact')) {
        wp_die(__('Invalid request.', 'dms'));
    }

    $name = sanitize_text_field(wp_unslash($_POST['name'] ?? ''));
    $company = sanitize_text_field(wp_unslash($_POST['company'] ?? ''));
    $email = sanitize_email(wp_unslash($_POST['email'] ?? ''));
    $phone = sanitize_text_field(wp_unslash($_POST['phone'] ?? ''));
    $type = sanitize_text_field(wp_unslash($_POST['inquiry_type'] ?? ''));
    $message = sanitize_textarea_field(wp_unslash($_POST['message'] ?? ''));

    if (!$name || !$email || !$message || !is_email($email)) {
        wp_safe_redirect(add_query_arg('inquiry', 'invalid', wp_get_referer() ?: home_url('/contact-us/')));
        exit;
    }

    $post_id = wp_insert_post([
        'post_type' => 'dms_inquiry',
        'post_status' => 'private',
        'post_title' => sprintf('%s — %s', $name, current_time('Y-m-d H:i')),
        'post_content' => $message,
    ]);

    if (!is_wp_error($post_id)) {
        foreach (compact('name', 'company', 'email', 'phone', 'type') as $key => $value) {
            update_post_meta($post_id, '_dms_' . $key, $value);
        }
        $to = get_theme_mod('dms_email', get_option('admin_email'));
        $subject = sprintf('[DMS Inquiry] %s — %s', $type ?: 'Website', $name);
        $body = "Name: {$name}\nCompany: {$company}\nEmail: {$email}\nPhone: {$phone}\nType: {$type}\n\n{$message}";
        wp_mail($to, $subject, $body, ['Reply-To: ' . $name . ' <' . $email . '>']);
    }

    wp_safe_redirect(add_query_arg('inquiry', 'success', wp_get_referer() ?: home_url('/contact-us/')));
    exit;
}

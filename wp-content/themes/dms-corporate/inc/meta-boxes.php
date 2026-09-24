<?php
if (!defined('ABSPATH')) { exit; }

add_action('add_meta_boxes', function () {
    add_meta_box('dms_product_specs', __('Product Specifications', 'dms'), 'dms_product_specs_box', 'dms_product', 'normal', 'high');
    add_meta_box('dms_job_details', __('Job Details', 'dms'), 'dms_job_details_box', 'dms_job', 'side', 'default');
    add_meta_box('dms_inquiry_details', __('Inquiry Details', 'dms'), 'dms_inquiry_details_box', 'dms_inquiry', 'side', 'high');
});

function dms_product_specs_box($post): void {
    wp_nonce_field('dms_save_product_specs', 'dms_product_specs_nonce');
    $fields = [
        'fiber_type' => 'Fiber Type',
        'connector' => 'Connector',
        'return_loss' => 'Return Loss',
        'insertion_loss' => 'Insertion Loss',
        'sku' => 'SKU / Model',
    ];
    echo '<div class="dms-admin-fields">';
    foreach ($fields as $key => $label) {
        $value = get_post_meta($post->ID, '_dms_' . $key, true);
        printf('<p><label for="dms_%1$s"><strong>%2$s</strong></label><br><input style="width:100%%" id="dms_%1$s" name="dms_%1$s" value="%3$s"></p>', esc_attr($key), esc_html($label), esc_attr($value));
    }
    echo '</div>';
}

function dms_job_details_box($post): void {
    wp_nonce_field('dms_save_job_details', 'dms_job_details_nonce');
    foreach (['location' => 'Location', 'type' => 'Employment Type', 'department' => 'Department'] as $key => $label) {
        $value = get_post_meta($post->ID, '_dms_' . $key, true);
        printf('<p><label for="dms_%1$s"><strong>%2$s</strong></label><br><input style="width:100%%" id="dms_%1$s" name="dms_%1$s" value="%3$s"></p>', esc_attr($key), esc_html($label), esc_attr($value));
    }
}

function dms_inquiry_details_box($post): void {
    $fields = ['name' => 'Name', 'company' => 'Company', 'email' => 'Email', 'phone' => 'Phone', 'type' => 'Inquiry Type'];
    echo '<table style="width:100%">';
    foreach ($fields as $key => $label) {
        printf('<tr><td><strong>%s</strong></td><td>%s</td></tr>', esc_html($label), esc_html((string)get_post_meta($post->ID, '_dms_' . $key, true)));
    }
    echo '</table>';
}

add_action('save_post_dms_product', function ($post_id) {
    if (!isset($_POST['dms_product_specs_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['dms_product_specs_nonce'])), 'dms_save_product_specs')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;
    foreach (['fiber_type', 'connector', 'return_loss', 'insertion_loss', 'sku'] as $key) {
        if (isset($_POST['dms_' . $key])) update_post_meta($post_id, '_dms_' . $key, sanitize_text_field(wp_unslash($_POST['dms_' . $key])));
    }
});

add_action('save_post_dms_job', function ($post_id) {
    if (!isset($_POST['dms_job_details_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['dms_job_details_nonce'])), 'dms_save_job_details')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;
    foreach (['location', 'type', 'department'] as $key) {
        if (isset($_POST['dms_' . $key])) update_post_meta($post_id, '_dms_' . $key, sanitize_text_field(wp_unslash($_POST['dms_' . $key])));
    }
});

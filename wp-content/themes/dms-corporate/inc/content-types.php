<?php
if (!defined('ABSPATH')) { exit; }

add_action('init', function () {
    register_post_type('dms_product', [
        'labels' => [
            'name' => __('Products', 'dms'),
            'singular_name' => __('Product', 'dms'),
            'add_new_item' => __('Add New Product', 'dms'),
            'edit_item' => __('Edit Product', 'dms'),
        ],
        'public' => true,
        'menu_icon' => 'dashicons-products',
        'has_archive' => 'products',
        'rewrite' => ['slug' => 'products'],
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail'],
        'show_in_rest' => true,
    ]);

    register_taxonomy('dms_product_category', 'dms_product', [
        'labels' => [
            'name' => __('Product Categories', 'dms'),
            'singular_name' => __('Product Category', 'dms'),
        ],
        'public' => true,
        'hierarchical' => true,
        'rewrite' => ['slug' => 'product-category'],
        'show_in_rest' => true,
    ]);

    register_post_type('dms_job', [
        'labels' => [
            'name' => __('Careers', 'dms'),
            'singular_name' => __('Job', 'dms'),
            'add_new_item' => __('Add New Job', 'dms'),
            'edit_item' => __('Edit Job', 'dms'),
        ],
        'public' => true,
        'menu_icon' => 'dashicons-businessperson',
        'has_archive' => 'career',
        'rewrite' => ['slug' => 'career'],
        'supports' => ['title', 'editor', 'excerpt'],
        'show_in_rest' => true,
    ]);

    register_post_type('dms_inquiry', [
        'labels' => [
            'name' => __('Inquiries', 'dms'),
            'singular_name' => __('Inquiry', 'dms'),
        ],
        'public' => false,
        'show_ui' => true,
        'menu_icon' => 'dashicons-email-alt',
        'supports' => ['title', 'editor'],
    ]);
});

add_action('after_switch_theme', function () {
    flush_rewrite_rules();
});

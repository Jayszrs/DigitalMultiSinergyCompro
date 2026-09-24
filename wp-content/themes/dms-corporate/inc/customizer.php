<?php
if (!defined('ABSPATH')) { exit; }

add_action('customize_register', function ($wp_customize) {
    $wp_customize->add_section('dms_company', [
        'title' => __('DMS Company Information', 'dms'),
        'priority' => 30,
    ]);

    $fields = [
        'dms_phone' => ['Phone', '+62 ...'],
        'dms_email' => ['Email', 'info@digitalmultisinergy.co.id'],
        'dms_address' => ['Address', 'Company office address'],
        'dms_business_hours' => ['Business Hours', 'Monday - Friday, 08:00 - 17:00'],
        'dms_whatsapp' => ['WhatsApp (international number)', '6280000000000'],
    ];
    foreach ($fields as $id => [$label, $default]) {
        $wp_customize->add_setting($id, ['default' => $default, 'sanitize_callback' => 'sanitize_text_field']);
        $wp_customize->add_control($id, ['label' => __($label, 'dms'), 'section' => 'dms_company', 'type' => 'text']);
    }

    $wp_customize->add_section('dms_home', [
        'title' => __('DMS Home Hero', 'dms'),
        'priority' => 31,
    ]);
    $wp_customize->add_setting('dms_hero_title', [
        'default' => 'Technology & Connectivity Solutions Built for Tomorrow.',
        'sanitize_callback' => 'sanitize_text_field',
    ]);
    $wp_customize->add_control('dms_hero_title', ['label' => __('Hero Title', 'dms'), 'section' => 'dms_home', 'type' => 'text']);
    $wp_customize->add_setting('dms_hero_copy', [
        'default' => 'Delivering reliable connectivity, telecommunications, IT and technology solutions through quality products and professional implementation.',
        'sanitize_callback' => 'sanitize_textarea_field',
    ]);
    $wp_customize->add_control('dms_hero_copy', ['label' => __('Hero Copy', 'dms'), 'section' => 'dms_home', 'type' => 'textarea']);
});

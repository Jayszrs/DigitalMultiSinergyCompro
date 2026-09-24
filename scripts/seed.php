<?php
if (!defined('WP_CLI') || !WP_CLI) { exit; }

function dms_get_or_create_page($title, $slug, $content = '') {
    $page = get_page_by_path($slug);
    if ($page) return $page->ID;
    return wp_insert_post(['post_type'=>'page','post_status'=>'publish','post_title'=>$title,'post_name'=>$slug,'post_content'=>$content]);
}

$home_id = dms_get_or_create_page('Home', 'home');
$about_id = dms_get_or_create_page('About Us', 'about-us', '<p>Digital Multi Sinergy delivers technology and connectivity solutions with a focus on products, implementation and long-term reliability.</p>');
$news_id = dms_get_or_create_page('News', 'news');
$contact_id = dms_get_or_create_page('Contact Us', 'contact-us');

update_option('show_on_front', 'page');
update_option('page_on_front', $home_id);
update_option('page_for_posts', $news_id);
update_option('permalink_structure', '/%postname%/');

$menu_name = 'Primary';
$menu = wp_get_nav_menu_object($menu_name);
$menu_id = $menu ? $menu->term_id : wp_create_nav_menu($menu_name);
if (!is_wp_error($menu_id) && !wp_get_nav_menu_items($menu_id)) {
    wp_update_nav_menu_item($menu_id, 0, ['menu-item-title'=>'Home','menu-item-object'=>'page','menu-item-object-id'=>$home_id,'menu-item-type'=>'post_type','menu-item-status'=>'publish']);
    wp_update_nav_menu_item($menu_id, 0, ['menu-item-title'=>'About Us','menu-item-object'=>'page','menu-item-object-id'=>$about_id,'menu-item-type'=>'post_type','menu-item-status'=>'publish']);
    wp_update_nav_menu_item($menu_id, 0, ['menu-item-title'=>'Products','menu-item-url'=>home_url('/products/'),'menu-item-type'=>'custom','menu-item-status'=>'publish']);
    wp_update_nav_menu_item($menu_id, 0, ['menu-item-title'=>'News','menu-item-object'=>'page','menu-item-object-id'=>$news_id,'menu-item-type'=>'post_type','menu-item-status'=>'publish']);
    wp_update_nav_menu_item($menu_id, 0, ['menu-item-title'=>'Career','menu-item-url'=>home_url('/career/'),'menu-item-type'=>'custom','menu-item-status'=>'publish']);
    wp_update_nav_menu_item($menu_id, 0, ['menu-item-title'=>'Contact','menu-item-object'=>'page','menu-item-object-id'=>$contact_id,'menu-item-type'=>'post_type','menu-item-status'=>'publish']);
}
$locations = get_theme_mod('nav_menu_locations', []);
$locations['primary'] = $menu_id;
$locations['footer'] = $menu_id;
set_theme_mod('nav_menu_locations', $locations);

$categories = ['Passive','Active','FTTx Tools','Software','IT & AI'];
foreach ($categories as $category) if (!term_exists($category, 'dms_product_category')) wp_insert_term($category, 'dms_product_category');

$products = [
 ['Patchcord','Passive','Connector options, fiber type and length.',['fiber_type'=>'G657A2 / G657A1 / G652D','connector'=>'SC / LC / FC','return_loss'=>'≥ 50 dB','insertion_loss'=>'≤ 0.3 dB']],
 ['Drop Cable','Passive','Fiber access cable for FTTx deployment.',[]],
 ['Joint Closure','Passive','Fiber protection and splicing enclosure.',[]],
 ['ODP','Passive','Optical distribution point for access networks.',[]],
 ['OTB','Passive','Optical termination box for fiber distribution.',[]],
 ['Splitter','Passive','Optical power distribution component.',[]],
 ['ONT','Active','Optical network terminal for subscriber connectivity.',[]],
 ['Splicer','FTTx Tools','Fiber fusion splicing equipment.',[]],
 ['OTDR','FTTx Tools','Optical fiber testing and diagnostics tool.',[]],
];
foreach ($products as [$title,$category,$excerpt,$specs]) {
    $existing = get_posts(['post_type'=>'dms_product','title'=>$title,'posts_per_page'=>1,'post_status'=>'any']);
    if ($existing) continue;
    $id = wp_insert_post(['post_type'=>'dms_product','post_status'=>'publish','post_title'=>$title,'post_excerpt'=>$excerpt,'post_content'=>'<p>Add verified product overview, features, applications and technical data here.</p>']);
    wp_set_object_terms($id, $category, 'dms_product_category');
    foreach ($specs as $k=>$v) update_post_meta($id,'_dms_'.$k,$v);
}

if (!get_posts(['post_type'=>'post','posts_per_page'=>1])) {
  foreach ([
    ['Digital Multi Sinergy Website Launch','Company News','A new digital experience for customers, partners and technology stakeholders.'],
    ['Understanding Modern FTTx Infrastructure','Technology','A concise overview of the components that support reliable fiber access networks.'],
    ['Building Reliable Connectivity Projects','Projects','Key considerations from requirement planning through implementation.'],
  ] as [$title,$cat,$excerpt]) {
    $cat_id = wp_create_category($cat);
    wp_insert_post(['post_type'=>'post','post_status'=>'publish','post_title'=>$title,'post_excerpt'=>$excerpt,'post_content'=>'<p>Replace this sample article with approved Digital Multi Sinergy content.</p>','post_category'=>[$cat_id]]);
  }
}

$jobs = [
 ['Network Engineer','Engineering','Jakarta','Full-time'],
 ['Business Development Executive','Commercial','Jakarta','Full-time'],
 ['Software Developer','Technology','Hybrid','Full-time'],
];
foreach ($jobs as [$title,$dept,$location,$type]) {
    $existing = get_posts(['post_type'=>'dms_job','title'=>$title,'posts_per_page'=>1,'post_status'=>'any']);
    if ($existing) continue;
    $id = wp_insert_post(['post_type'=>'dms_job','post_status'=>'publish','post_title'=>$title,'post_content'=>'<p>Replace this sample vacancy with an approved job description, responsibilities and requirements.</p>']);
    update_post_meta($id,'_dms_department',$dept); update_post_meta($id,'_dms_location',$location); update_post_meta($id,'_dms_type',$type);
}

flush_rewrite_rules();
WP_CLI::success('DMS demo content created.');

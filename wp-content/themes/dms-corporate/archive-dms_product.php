<?php
get_header();
$q = sanitize_text_field(wp_unslash($_GET['q'] ?? ''));
$cat = sanitize_title(wp_unslash($_GET['product_cat'] ?? ''));
$args = ['post_type' => 'dms_product', 'posts_per_page' => 12, 'paged' => max(1, get_query_var('paged'))];
if ($q) $args['s'] = $q;
if ($cat) $args['tax_query'] = [[ 'taxonomy' => 'dms_product_category', 'field' => 'slug', 'terms' => $cat ]];
$products = new WP_Query($args);
$terms = get_terms(['taxonomy' => 'dms_product_category', 'hide_empty' => false]);
?>
<section class="page-hero compact-hero"><div class="container"><span class="eyebrow eyebrow--dark">Products</span><h1>Technology products for reliable connectivity.</h1></div></section>
<section class="section section--flush-top">
<div class="container catalog-toolbar">
    <form class="product-search" method="get"><label class="screen-reader-text" for="product-q">Search products</label><input id="product-q" name="q" value="<?php echo esc_attr($q); ?>" placeholder="Search products..."><button class="button button--sm" type="submit">Search</button></form>
    <div class="filter-tabs"><a class="<?php echo $cat ? '' : 'is-active'; ?>" href="<?php echo esc_url(get_post_type_archive_link('dms_product')); ?>">All</a><?php if (!is_wp_error($terms)) foreach ($terms as $term) printf('<a class="%s" href="%s">%s</a>', $cat === $term->slug ? 'is-active' : '', esc_url(add_query_arg('product_cat', $term->slug, get_post_type_archive_link('dms_product'))), esc_html($term->name)); ?></div>
</div>
<div class="container product-grid" data-stagger>
<?php if ($products->have_posts()) : while ($products->have_posts()) : $products->the_post(); ?>
<article class="product-card"><a class="product-card__media" href="<?php the_permalink(); ?>"><?php dms_image_or_placeholder(get_the_ID(), 'medium_large'); ?></a><div class="product-card__body"><span class="meta"><?php $pt = get_the_terms(get_the_ID(), 'dms_product_category'); echo esc_html($pt && !is_wp_error($pt) ? $pt[0]->name : 'Product'); ?></span><h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2><p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 15)); ?></p><a class="text-link" href="<?php the_permalink(); ?>">View Product <span>→</span></a></div></article>
<?php endwhile; else : ?><p>No products found.</p><?php endif; wp_reset_postdata(); ?>
</div>
<div class="container pagination"><?php echo wp_kses_post(paginate_links(['total' => $products->max_num_pages])); ?></div>
</section>
<?php get_footer(); ?>

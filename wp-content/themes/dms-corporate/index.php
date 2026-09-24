<?php get_header(); ?>
<section class="page-hero compact-hero"><div class="container"><h1><?php bloginfo('name'); ?></h1></div></section>
<section class="section"><div class="container news-grid"><?php if (have_posts()) : while (have_posts()) : the_post(); ?><article class="news-card"><h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2><p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 25)); ?></p></article><?php endwhile; endif; ?></div></section>
<?php get_footer(); ?>

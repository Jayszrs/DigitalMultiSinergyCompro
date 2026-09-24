<?php get_header(); while (have_posts()) : the_post(); ?>
<article class="article-single"><header class="article-single__header container" data-reveal><span class="eyebrow eyebrow--dark"><?php echo esc_html(get_the_date()); ?></span><h1><?php the_title(); ?></h1></header><div class="container article-single__media"><?php if (has_post_thumbnail()) the_post_thumbnail('full'); ?></div><div class="container prose prose--article"><?php the_content(); ?></div></article>
<?php endwhile; get_footer(); ?>

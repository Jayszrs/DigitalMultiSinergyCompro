<?php get_header(); while (have_posts()) : the_post(); ?>
<section class="page-hero compact-hero"><div class="container"><span class="eyebrow eyebrow--dark">Digital Multi Sinergy</span><h1><?php the_title(); ?></h1></div></section>
<section class="section section--flush-top"><div class="container prose prose--article"><?php the_content(); ?></div></section>
<?php endwhile; get_footer(); ?>

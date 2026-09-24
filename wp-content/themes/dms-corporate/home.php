<?php get_header(); ?>
<section class="page-hero compact-hero"><div class="container"><span class="eyebrow eyebrow--dark">News & Articles</span><h1>Insights from technology, connectivity and Digital Multi Sinergy.</h1></div></section>
<section class="section section--flush-top"><div class="container news-grid news-grid--archive" data-stagger>
<?php if (have_posts()) : while (have_posts()) : the_post(); ?><article class="news-card"><a class="news-card__media" href="<?php the_permalink(); ?>"><?php dms_image_or_placeholder(get_the_ID(), 'large'); ?></a><div class="news-card__body"><span class="meta"><?php echo esc_html(get_the_date()); ?></span><h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2><p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 24)); ?></p><a class="text-link" href="<?php the_permalink(); ?>">Read Article <span>→</span></a></div></article><?php endwhile; else : ?><p>No articles yet.</p><?php endif; ?>
</div><div class="container pagination"><?php the_posts_pagination(); ?></div></section>
<?php get_footer(); ?>

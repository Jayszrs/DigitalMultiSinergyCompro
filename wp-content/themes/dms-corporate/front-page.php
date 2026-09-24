<?php get_header(); ?>
<section class="hero section--dark">
    <div class="hero-orbit hero-orbit--one" data-parallax="0.14"></div>
    <div class="hero-orbit hero-orbit--two" data-parallax="0.24"></div>
    <div class="spark" data-parallax="0.36">✦</div>
    <div class="container hero__grid">
        <div class="hero__content" data-reveal>
            <span class="eyebrow">Digital Multi Sinergy</span>
            <h1><?php echo esc_html(get_theme_mod('dms_hero_title', 'Technology & Connectivity Solutions Built for Tomorrow.')); ?></h1>
            <p><?php echo esc_html(get_theme_mod('dms_hero_copy', 'Delivering reliable connectivity, telecommunications, IT and technology solutions through quality products and professional implementation.')); ?></p>
            <div class="button-row">
                <a class="button" href="<?php echo esc_url(home_url('/contact-us/')); ?>">Discuss a Project <span>↗</span></a>
                <a class="button button--ghost" href="<?php echo esc_url(get_post_type_archive_link('dms_product')); ?>">Explore Our Products <span>→</span></a>
            </div>
        </div>
        <div class="hero__visual" data-reveal data-parallax="0.08">
            <div class="hero-card">
                <img src="<?php echo esc_url(dms_logo_url()); ?>" alt="Digital Multi Sinergy symbol">
                <div class="hero-card__copy"><span>Connectivity</span><span>Infrastructure</span><span>IT & AI</span></div>
            </div>
        </div>
    </div>
    <a href="#who-we-are" class="scroll-cue">Scroll to explore <span>↓</span></a>
</section>

<section class="section" id="who-we-are">
    <div class="container split-intro">
        <div data-reveal>
            <span class="eyebrow eyebrow--dark">Who We Are</span>
            <h2>Technology that connects businesses to what comes next.</h2>
        </div>
        <div class="lead-copy" data-reveal>
            <p>Digital Multi Sinergy brings together connectivity products, telecommunications infrastructure, technical implementation and digital solutions for modern organizations.</p>
            <a class="text-link" href="<?php echo esc_url(home_url('/about-us/')); ?>">Discover Digital Multi Sinergy <span>→</span></a>
        </div>
    </div>
    <div class="container wide-media" data-reveal>
        <div class="abstract-network" data-parallax="0.08">
            <span></span><span></span><span></span><span></span><span></span>
            <p>Real implementation imagery can be placed here when client assets are ready.</p>
        </div>
    </div>
</section>

<section class="section section--soft">
    <div class="container section-heading" data-reveal>
        <span class="eyebrow eyebrow--dark">Our Products</span>
        <h2>Solutions for modern connectivity infrastructure.</h2>
    </div>
    <div class="container category-grid" data-stagger>
        <?php
        $cats = [
            ['01', 'Passive', 'Fiber components and passive network infrastructure.'],
            ['02', 'Active', 'Active networking devices for reliable connectivity.'],
            ['03', 'FTTx Tools', 'Tools and equipment for field deployment and testing.'],
            ['04', 'Software / IT & AI', 'Digital solutions that support modern operations.'],
        ];
        foreach ($cats as [$num, $name, $copy]) :
            $category_url = $name === 'Software / IT & AI'
                ? get_post_type_archive_link('dms_product')
                : add_query_arg('product_cat', sanitize_title($name), get_post_type_archive_link('dms_product')); ?>
            <a class="category-card" href="<?php echo esc_url($category_url); ?>">
                <span class="category-card__num"><?php echo esc_html($num); ?></span>
                <div><h3><?php echo esc_html($name); ?></h3><p><?php echo esc_html($copy); ?></p></div>
                <span class="category-card__arrow">↗</span>
            </a>
        <?php endforeach; ?>
    </div>
</section>

<section class="section capabilities">
    <div class="container capabilities__grid">
        <div class="capabilities__sticky" data-reveal>
            <span class="eyebrow eyebrow--dark">Capabilities</span>
            <h2>From infrastructure to intelligent digital solutions.</h2>
        </div>
        <div class="capabilities__list" data-stagger>
            <?php foreach (['Fiber Optic Infrastructure','Network & Connectivity','Telecommunications Products','FTTx Tools & Equipment','Software Development','IT Solutions','Artificial Intelligence Solutions'] as $item) : ?>
                <div class="capability-row"><span><?php echo esc_html($item); ?></span><span>↗</span></div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<section class="section section--dark why-dms">
    <div class="hero-orbit hero-orbit--three" data-parallax="0.12"></div>
    <div class="container section-heading" data-reveal>
        <span class="eyebrow">Why Digital Multi Sinergy</span>
        <h2>Built around reliability, expertise and implementation.</h2>
    </div>
    <div class="container pillars" data-stagger>
        <article><span>01</span><h3>Reliable Solutions</h3><p>Product and solution choices designed around real operational needs.</p></article>
        <article><span>02</span><h3>Technical Expertise</h3><p>Clear technical thinking across connectivity, infrastructure, software and IT.</p></article>
        <article><span>03</span><h3>Implementation Focus</h3><p>A practical approach that connects planning, products and field execution.</p></article>
    </div>
</section>

<section class="section">
    <div class="container section-heading section-heading--inline" data-reveal>
        <div><span class="eyebrow eyebrow--dark">Latest News</span><h2>Insights & Updates</h2></div>
        <a class="text-link" href="<?php echo esc_url(home_url('/news/')); ?>">View all articles <span>→</span></a>
    </div>
    <div class="container news-grid" data-stagger>
        <?php $news = new WP_Query(['post_type' => 'post', 'posts_per_page' => 3]);
        if ($news->have_posts()) : while ($news->have_posts()) : $news->the_post(); ?>
            <article class="news-card">
                <a class="news-card__media" href="<?php the_permalink(); ?>"><?php dms_image_or_placeholder(get_the_ID(), 'large'); ?></a>
                <div class="news-card__body"><span class="meta"><?php echo esc_html(get_the_date()); ?></span><h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3><p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 20)); ?></p><a class="text-link" href="<?php the_permalink(); ?>">Read Article <span>→</span></a></div>
            </article>
        <?php endwhile; wp_reset_postdata(); else : ?>
            <p>No articles yet. Add posts from WordPress Admin.</p>
        <?php endif; ?>
    </div>
</section>

<section class="section cta-section">
    <div class="container cta-panel" data-reveal>
        <div><span class="eyebrow">Start a Conversation</span><h2>Let’s build the right technology solution for your business.</h2><p>Talk with our team about your next connectivity, infrastructure, or digital project.</p></div>
        <a class="button button--light" href="<?php echo esc_url(home_url('/contact-us/')); ?>">Discuss Your Project <span>↗</span></a>
    </div>
</section>
<?php get_footer(); ?>

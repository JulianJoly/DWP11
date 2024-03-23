<?php get_header();

    /* get a random photo */
    $randomPhoto = get_posts( 
        array(
            'orderby'        => 'rand',
            'post_status'    => 'publish',
            'post_type'      => 'photo',
            'posts_per_page' => 1
        ) 
    );

    /* get 8 photos to display in front page */
    $args = array(
        'post_status'    => 'publish',
        'post_type'      => 'photo',
        'posts_per_page' => 8,
    );
?>

    <section class="hero">
        <?php echo get_the_post_thumbnail( $randomPhoto[0], 'full', [ 'class' => 'hero--img imgCover' ]); ?>
        <h1 class="hero--title capsLock noMargin">photographe event</h1>
    </section>
    <section class="photoList">
        <div class="photoBlock width100"><?php get_template_part( 'templates_part/photo', 'block', $args ); ?></div>
        <button class="photoList--button width100"
            data-nonce="<?php echo wp_create_nonce( 'motaphoto_request_photos' ); ?>"
            data-action="motaphoto_request_photos"
            data-ajaxurl="<?php echo admin_url( 'admin-ajax.php' ); ?>"
        >Charger plus</button>
    </section>

<?php get_footer(); ?>
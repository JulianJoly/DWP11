<?php get_header(); ?>

<?php
    /* get a random photo from post array */
    $randomPhoto = get_posts( 
        array(
            'orderby'        => 'rand',
            'post_type'      => 'photo',
            'posts_per_page' => 1
        ) 
    );
?>

    <section class="hero">
        <?php echo get_the_post_thumbnail( $randomPhoto[0], 'full', [ 'class' => 'hero--img imgCover' ]); ?>
        <h1 class="hero--title capsLock noMargin">photographe event</h1>
    </section>

<?php get_footer(); ?>
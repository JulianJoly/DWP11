<?php get_header(); ?>

<?php
    /* get a random photo */
    $randomPhoto = get_posts( 
        array(
            'orderby'        => 'rand',
            'post_type'      => 'photo',
            'posts_per_page' => 1
        ) 
    );

    /* get all photos to display in front page */
    $args = array(
        'orderby'        => 'rand',
        'post_type'      => 'photo',
        'posts_per_page' => 8
    );
?>

    <section class="hero">
        <?php echo get_the_post_thumbnail( $randomPhoto[0], 'full', [ 'class' => 'hero--img imgCover' ]); ?>
        <h1 class="hero--title capsLock noMargin">photographe event</h1>
    </section>
    <section class="photoList">
        <?php get_template_part('templates_part/photo', 'block');/* include 'templates_part/photo-block.php'; */ ?>
        <button class="photoList--button width100">Charger plus</button>
    </section>

<?php get_footer(); ?>
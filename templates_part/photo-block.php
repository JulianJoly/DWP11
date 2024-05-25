<?php

/* if browser support WEBP format */
if ( $GLOBALS[ 'modernBrowser' ] ) {
    /* use WEBP format */
    $buttonDetails = get_theme_file_uri() . '/assets/img/button-details.png.webp';
    $buttonLightbox = get_theme_file_uri() . '/assets/img/button-lightbox.png.webp';
} else {
    /* use PNG format */
    $buttonDetails = get_theme_file_uri() . '/assets/img/button-details.png';
    $buttonLightbox = get_theme_file_uri() . '/assets/img/button-lightbox.png';
}

/* if variable "args" exist */
if ( isset( $args )) {
    
    /* create query with args */
    $query = new WP_Query( $args );

    /* if query is empty and current page is single page */
    if ( !$query->have_posts() && is_singular( 'photo' )) {
        /* create query with 2 photos that is not the current photo and not previous/next photos */
        $query = new WP_Query( array( 'post_type' => 'photo', 'posts_per_page' => 2, 'post__not_in' => array( get_the_ID(), get_the_ID() -1, get_the_ID() +1 )));
    }

    /* if the query have posts inside */
    if ( $query->have_posts() ) {

        /* loop to display all posts */
        while ( $query->have_posts() ) {
            $query->the_post(); ?>
            <div class="photo">
            <?php the_post_thumbnail( 'large', ['class' => 'photo--img width100 height100 imgCover']); ?>
                <div class="photo__hover height100">
                    <a class="photo__hover--details" href="<?php echo the_permalink(); ?>">
                        <img src="<?php echo $buttonDetails; ?>">
                    </a>
                    <a class="photo__hover--lightbox">
                        <img src="<?php echo $buttonLightbox; ?>">
                    </a>
                    <p class="photo__hover--reference noMargin uppercase"><?php the_field( 'reference' ); ?></p>
                    <p class="photo__hover--category noMargin uppercase"><?php echo get_the_terms( $post, 'categorie' )[0]->name; ?></p>
                </div>
            </div> <?php
        }

        /* if variable "paged" exist inside "args" variable */
        if ( isset( $args[ 'paged' ])) {
            /* if this is the last page of posts to display */
            if ( $args[ 'paged' ] == $query->max_num_pages ) {
                /* notify JS */ ?>
                <span class="last-page"></span> <?php
            }
        }

    } else {
        /* display empty query error */ ?>
        <p>Aucune photo ne correspond aux filtres.</p> <?php
    }

    wp_reset_postdata();

} else {
    /* display an error */ ?>
    <p>Une erreur est survenue lors de l'affichage des photos.</p> <?php
}
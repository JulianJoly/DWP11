<?php
/* if the browser support WEBP format */
if ( $GLOBALS[ 'webpSupport' ]) {
    /* use WEBP format */
    $linkToSinglePage = get_theme_file_uri() . '/assets/img/button-details.png.webp';
    $lightboxButton = get_theme_file_uri() . '/assets/img/button-lightbox.png.webp';
} else {
    /* use PNG format */
    $linkToSinglePage = get_theme_file_uri() . '/assets/img/button-details.png';
    $lightboxButton = get_theme_file_uri() . '/assets/img/button-lightbox.png';
}

/* if variable "args" exist */
if ( isset( $args )) {
    
    /* create a query with the "args" */
    $query = new WP_Query( $args );

    /* if query is empty and current page is single page */
    if ( !$query->have_posts() && is_singular( 'photo' )) {
        /* create query with 2 photos that is NOT the current photo and NOT the previous or next photo */
        $query = new WP_Query( array( 'post_type' => 'photo', 'posts_per_page' => 2, 'post__not_in' => array( get_the_ID(), get_the_ID() -1, get_the_ID() +1 )));
    }

    /* if the query have posts inside */
    if ( $query->have_posts() ) {

        /* loop to display all posts */
        while ( $query->have_posts() ) {
            $query->the_post(); ?>
            <div class="photo-card">
            <?php the_post_thumbnail( 'large', ['class' => 'photo-card__img width-100 height-100']); ?>
                <div class="photo-card__hover-container height-100">
                    <a class="photo-card__link" href="<?php echo the_permalink(); ?>">
                        <img src="<?php echo $linkToSinglePage; ?>">
                    </a>
                    <button class="photo-card__lightbox-button pointer padding-0">
                        <img src="<?php echo $lightboxButton; ?>">
                    </button>
                    <p class="photo-card__text photo-card__text--reference margin-0 uppercase"><?php the_field( 'reference' ); ?></p>
                    <p class="photo-card__text photo-card__text--category margin-0 uppercase"><?php echo get_the_terms( $post, 'categorie' )[0]->name; ?></p>
                </div>
            </div> <?php
        }

        /* if the variable "paged" exist inside the "args" variable */
        if ( isset( $args[ 'paged' ])) {
            /* if this is the last page of posts to display */
            if ( $args[ 'paged' ] == $query->max_num_pages ) {
                /* notify JS to hide the "load more" button */ ?>
                <span class="last-page hidden"></span> <?php
            }
        }

    } else {
        /* display empty query error */ ?>
        <p>Aucune des photos ne correspond aux filtres.</p> <?php
    }

    wp_reset_postdata();

} else { ?>
    <p>Une erreur est survenue lors de l'affichage des photos.</p> <?php
}
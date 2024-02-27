<?php

    /* if browser support "webp" format */
    if ( $GLOBALS['modernBrowser'] ) {
        /* use "webp" format */
        $buttonDetails = get_theme_file_uri() . '/assets/img/button-details.png.webp';
        $buttonLightbox = get_theme_file_uri() . '/assets/img/button-lightbox.png.webp';
    } else {
        /* use "png" format */
        $buttonDetails = get_theme_file_uri() . '/assets/img/button-details.png';
        $buttonLightbox = get_theme_file_uri() . '/assets/img/button-lightbox.png';
    }

    echo '<div class="photoBlock width100">';

    /* if variable "args" exist */
    if ( $args ) {
        /* create query with "args" */
        $query = new WP_Query( $args );
    }

    /* if query is empty and current page is displaying a photo */
    if ( !$query->have_posts() && is_singular( 'photo' ) ) {
        /* create query with 2 photos that is not the current photo and not previous/next photos */
        $query = new WP_Query( array( 'post_type' => 'photo', 'posts_per_page' => 2, 'post__not_in' => array( get_the_ID(), $previousPost, $nextPost ) ));
    }

    /* if query has posts inside */
    if ( $query->have_posts() ) {

        /* display all posts inside the query */
        while ( $query->have_posts() ) {
            $query->the_post();
            echo '<div class="photo">';
                the_post_thumbnail( 'large', ['class' => 'photo--img width100 height100 imgCover']);
                echo '<div class="photo__hover height100">';
                    echo '<a class="photo__hover--details" href="'; echo the_permalink(); echo '"><img src="'; echo $buttonDetails; echo '"></a>';
                    echo '<a class="photo__hover--lightbox"><img src="'; echo $buttonLightbox; echo '"></a>';
                    echo '<p class="photo__hover--reference noMargin capsLock">';
                        the_field( 'reference' );
                    echo '</p>';
                    echo '<p class="photo__hover--category noMargin capsLock">';
                        echo get_the_terms( $post, 'categorie' )[0]->name;
                    echo '</p>';
                echo '</div>';
            echo '</div>';
        }

    /* else display error */
    } else {
        echo '<p>Une erreur est survenue lors de l\'affichage des photos.</p>';
    }

    echo '</div>';

    wp_reset_postdata();
<?php
    $buttonDetails = get_theme_file_uri() . '/assets/img/button-details.png';
    $buttonLightbox = get_theme_file_uri() . '/assets/img/button-lightbox.png';

    echo '<div class="photoBlock width100">';
    if ( !$query->have_posts() ) {
        $query = new WP_Query( array( 'post_type' => 'photo', 'posts_per_page' => 2, 'post__not_in' => array( get_the_ID(), $previousPost, $nextPost ) ));
    }
    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
            $query->the_post();
            echo '<div class="photo">';
                the_post_thumbnail( 'large', ['class' => 'photo--img width100 height100']);
                echo '<div class="photo__hover height100">';
                    echo '<a class="photo__hover--details" href="'; echo the_permalink(); echo '"><img src="'; echo $buttonDetails; echo '"></a>';
                    echo '<a class="photo__hover--lightbox"><img src="'; echo $buttonLightbox; echo '"></a>';
                    echo '<p class="photo__hover--reference noMargin caps">';
                        the_field( 'reference' );
                    echo '</p>';
                    echo '<p class="photo__hover--category noMargin caps">';
                        echo get_the_terms( $post, 'categorie' )[0]->name;
                    echo '</p>';
                echo '</div>';
            echo '</div>';
        }
    } else {
        echo '<p>Une erreur est survenue lors de l\'affichage des photos.</p>';
    }
    echo '</div>';
    wp_reset_postdata();
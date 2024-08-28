<?php
    get_header();

    /* get all informations to display on the single page */
    $thumbnail = get_the_post_thumbnail( $post, 'full', [ 'class' => 'single-photo__img width-100 height-100' ]);
    $reference = get_field( 'reference' );
    $category = get_the_terms( $post, 'categorie' )[0]->name;
    $format = get_the_terms( $post, 'format' )[0]->name;
    $type = get_field( 'type' );
    $date = substr( apply_filters( 'the_date', $post->post_date ), 0, 4);

    /* get the previous and next photo */
    $previousPost = get_the_ID() - 1;
    $nextPost = get_the_ID() + 1;

    /* create a variable to get 2 photos with the same category as the photo displayed that is not the previous, current or next photo */
    $args = array(
        'post_type'      => 'photo',
        'posts_per_page' => 2,
        'post__not_in'   => array( get_the_ID(), $previousPost, $nextPost ),
        'tax_query'      => array(
            array(
                'taxonomy' => 'categorie',
                'field'    => 'slug',
                'terms'    => $category
            )
        )
    );

    /* add navigation to the previous and next photo */
    function photo_nav_arrows( $previous, $next ) {
        if ( get_post( $previous ) != null && get_post_type( $previous ) == 'photo' ) {
            echo '<div class="single-interested__nav">';
            echo get_the_post_thumbnail( $previous , 'thumbnail', [ 'class' => 'single-interested__nav-thumbnail' ]);
            echo '<a class="single-interested__nav-link single-interested__nav-link--previous" href="' . get_post_permalink( $previous ) . '"><svg width="27" height="17" viewBox="0 0 27 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM26 9C26.5523 9 27 8.55228 27 8C27 7.44772 26.5523 7 26 7V9ZM1 9H26V7H1V9Z" fill="black"/></svg></a>';
            echo '</div>';
        }
        if ( get_post( $next ) != null && get_post_type( $next ) == 'photo' ) {
            echo '<div class="single-interested__nav">';
            echo get_the_post_thumbnail( $next , 'thumbnail', [ 'class' => 'single-interested__nav-thumbnail' ]);
            echo '<a class="single-interested__nav-link single-interested__nav-link--next" href="' . get_post_permalink( $next ) . '"><svg width="27" height="17" viewBox="0 0 27 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26.7071 7.29289C27.0976 7.68342 27.0976 8.31658 26.7071 8.70711L20.3431 15.0711C19.9526 15.4616 19.3195 15.4616 18.9289 15.0711C18.5384 14.6805 18.5384 14.0474 18.9289 13.6569L24.5858 8L18.9289 2.34315C18.5384 1.95262 18.5384 1.31946 18.9289 0.928932C19.3195 0.538408 19.9526 0.538408 20.3431 0.928932L26.7071 7.29289ZM1 9C0.447716 9 0 8.55228 0 8C0 7.44772 0.447716 7 1 7V9ZM26 9H1V7H26V9Z" fill="black"/></svg></a>';
            echo '</div>';
        }
    }
?>
            <section class="single-photo <?php if ( $format == 'Paysage' ) { echo 'large-photo'; } ?>">
                <?php echo $thumbnail; ?>
                <div class="single-photo__info">
                    <h2 class="single-photo__title margin-0 uppercase"><?php the_title(); ?></h2>
                    <p class="single-photo__text uppercase">Référence : <?php echo $reference ?></p>
                    <p class="single-photo__text uppercase">Catégorie : <?php echo $category; ?></p>
                    <p class="single-photo__text uppercase">Format : <?php echo $format; ?></p>
                    <p class="single-photo__text uppercase">Type : <?php echo $type; ?></p>
                    <p class="single-photo__text uppercase">Année : <?php echo $date; ?></p>
                </div>
            </section>
            <section class="single-interested width-100">
                <div class="single-interested__contact-container">
                    <p class="single-interested__contact-text">Cette photo vous intéresse ?</p>
                    <button class="single-interested__contact-button pointer" id="<?php echo $reference; ?>">Contact</button>
                </div>
                <div class="single-interested__nav-container">
                    <?php photo_nav_arrows( $previousPost ,$nextPost ); ?>
                </div>
            </section>
            <section class="single-more">
                <h3 class="single-more__title uppercase">Vous aimerez aussi</h3>
                <div class="photo-card-list width-100"><?php get_template_part( 'templates_part/photo', 'card', $args ); ?></div>
            </section>
<?php
    get_footer();
?>
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
    function create_photo_nav( $previous, $next ) {
        if ( get_post( $previous ) != null && get_post_type( $previous ) == 'photo' ) {
            echo '<a class="single-interested__nav-link single-interested__nav-link--previous" href="' . get_post_permalink( $previous ) . '"><svg width="25" height="8" viewBox="0 0 25 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.646447 3.64645C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM1 4.5H26V3.5H1V4.5Z" fill="black"/></svg></a>';
            echo get_the_post_thumbnail( $previous , 'thumbnail', [ 'class' => 'single-interested__nav-thumbnail single-interested__nav-thumbnail--previous' ]);
        }
        if ( get_post( $next ) != null && get_post_type( $next ) == 'photo' ) {
            echo '<a class="single-interested__nav-link single-interested__nav-link--next" href="' . get_post_permalink( $next ) . '"><svg width="25" height="8" viewBox="0 0 25 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.3536 3.64645C25.5488 3.84171 25.5488 4.15829 25.3536 4.35355L22.1716 7.53553C21.9763 7.7308 21.6597 7.7308 21.4645 7.53553C21.2692 7.34027 21.2692 7.02369 21.4645 6.82843L24.2929 4L21.4645 1.17157C21.2692 0.976311 21.2692 0.659728 21.4645 0.464466C21.6597 0.269204 21.9763 0.269204 22.1716 0.464466L25.3536 3.64645ZM25 4.5H0V3.5H25V4.5Z" fill="black"/></svg></a>';
            echo get_the_post_thumbnail( $next , 'thumbnail', [ 'class' => 'single-interested__nav-thumbnail single-interested__nav-thumbnail--next' ]);
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
                    <button class="single-interested__contact-button" id="<?php echo $reference; ?>">Contact</button>
                </div>
                <div class="single-interested__nav">
                    <?php create_photo_nav( $previousPost ,$nextPost ); ?>
                </div>
            </section>
            <section class="single-more">
                <h3 class="single-more__title uppercase">Vous aimerez aussi</h3>
                <div class="photo-card-list width-100"><?php get_template_part( 'templates_part/photo', 'card', $args ); ?></div>
            </section>
<?php
    get_footer();
?>
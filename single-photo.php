<?php
    get_header();

    /* set all variables to display in the current "single photo" page */
    $thumbnail = get_the_post_thumbnail( $post, 'full', [ 'class' => 'single--img width100 height100 imgCover' ]);
    $reference = get_field( 'reference' );
    $category = get_the_terms( $post, 'categorie' )[0]->name;
    $format = get_the_terms( $post, 'format' )[0]->name;
    $type = get_field( 'type' );
    $date = substr( apply_filters( 'the_date', $post->post_date ), 0, 4);

    /* set the variables to get the previous and next photo */
    $previousPost = get_the_ID() - 1;
    $nextPost = get_the_ID() + 1;

    /* create a variable "args" of 2 photos with the same category as the photo displayed that is not the previous or current or next photo */
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

    /* add a class to change the how the photo is displayed based on the format */
    function photo_class_format( $orientation ) {
        if ( $orientation == "Paysage" ) {
            echo "paysage";
        }
        if ( $orientation == "Portrait" ) {
            echo "portrait";
        }
    }

    /* add arrows to navigate between the previous and next photo */
    function photo_nav_arrows( $previous, $next ) {
        if ( get_post( $next ) != null && get_post_type( $next ) == 'photo' ) {
            echo '<a class="interested__nav--arrow" href="' . get_post_permalink( $next ) . '">→</a>';
        }
        if ( get_post( $previous ) != null && get_post_type( $previous ) == 'photo' ) {
            echo '<a class="interested__nav--arrow" href="' . get_post_permalink( $previous ) . '">←</a>';
        }
    }

    /* add thumbnails of the previous and next photo */
    function photo_nav_thumbnails( $previous, $next ) {
        if ( get_post( $next ) != null && get_post_type( $next ) == 'photo' ) {
            echo get_the_post_thumbnail( $next , 'thumbnail', [ 'class' => 'interested__nav--thumbnail' ]);
        }
        if ( get_post( $previous ) != null && get_post_type( $previous ) == 'photo' ) {
            echo get_the_post_thumbnail( $previous , 'thumbnail', [ 'class' => 'interested__nav--thumbnail' ]);
        }
    }
?>

            <section class="single <?php photo_class_format( $format ); ?>">
                <?php echo $thumbnail; ?>
                <div class="single__container">
                    <h2 class="single__container--title noMargin uppercase"><?php the_title(); ?></h2>
                    <p class="single__container--texts uppercase">Référence : <?php echo $reference ?></p>
                    <p class="single__container--texts uppercase">Catégorie : <?php echo $category; ?></p>
                    <p class="single__container--texts uppercase">Format : <?php echo $format; ?></p>
                    <p class="single__container--texts uppercase">Type : <?php echo $type; ?></p>
                    <p class="single__container--texts uppercase">Année : <?php echo $date; ?></p>
                </div>
            </section>
            <section class="interested width100">
                <div class="interested__container">
                    <p class="interested__container--text">Cette photo vous intéresse ?</p>
                    <button class="interested__container--button" id="<?php echo $reference; ?>">Contact</button>
                </div>
                <div class="interested__nav">
                    <div class="interested__nav--thumbnails">
                        <?php photo_nav_thumbnails( $previousPost ,$nextPost ); ?>
                    </div>
                    <div class="interested__nav--arrows noMargin">
                        <?php photo_nav_arrows( $previousPost ,$nextPost ); ?>
                    </div>
                </div>
            </section>
            <section class="more">
                <h3 class="more--title width100 uppercase">Vous aimerez aussi</h3>
                <div class="photoBlock width100"><?php get_template_part( 'templates_part/photo', 'block', $args ); ?></div>
            </section>

<?php
    get_template_part( 'templates_part/lightbox' );

    get_footer();
?>
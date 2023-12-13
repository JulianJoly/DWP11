<?php get_header(); ?>

<?php 
    $format = get_the_terms( $post, 'format' )[0]->name;
    $previousPost = get_the_ID() - 1;
    $nextPost = get_the_ID() + 1;

    function class_format( $formats ) {
        if ( $formats == "Paysage" ) {
            echo "paysage";
        }
        if ( $formats == "Portrait" ) {
            echo "portrait";
        }
    }

    function photo_nav_arrows( $previous, $next ) {
        if ( get_post( $next ) != null ) {
            echo '<a href="' . get_post_permalink( $next ) . '">→</a>';
        }
        if ( get_post( $previous ) != null ) {
            echo '<a href="' . get_post_permalink( $previous ) . '">←</a>';
        }
    }

    function photo_nav_thumbnail( $previous, $next ) {
        if ( get_post( $next ) != null ) {
            echo '<img src="' . get_the_post_thumbnail_url( $next, 'thumbnail' ) . '" alt="">';
        }
        if ( get_post( $previous ) != null ) {
            echo '<img src="' . get_the_post_thumbnail_url( $previous, 'thumbnail' ) . '" alt="">';
        }
    }
?>

    <section class="photo <?php class_format( $format ); ?>">
        <img class="photo--img" src="<?php echo get_the_post_thumbnail_url( get_the_ID(), 'full' ); ?>" alt="">
        <div class="photo__container">
            <h2 class="photo__container--title"><?php the_title(); ?></h2>
            <p class="photo__container--text">Référence : <?php the_field( 'reference' ); ?></p>
            <p class="photo__container--text">Catégorie : <?php echo get_the_terms( $post, 'categorie' )[0]->name; ?></p>
            <p class="photo__container--text">Format : <?php echo $format; ?></p>
            <p class="photo__container--text">Type : <?php the_field( 'type' ); ?></p>
            <p class="photo__container--text">Année : <?php echo substr(apply_filters( 'the_date', $post->post_date ), 0, 4); ?></p>
        </div>
    </section>
    <section class="interested">
        <div class="interested__container">
            <p class="interested__container--text">Cette photo vous intéresse ?</p>
            <button class="interested__container--button" href="header">Contact</button>
        </div>
        <div class="interested__nav">
            <div class="interested__nav--thumbnails">
                <?php photo_nav_thumbnail( $previousPost ,$nextPost ); ?>
            </div>
            <div class="interested__nav--arrows">
                <?php photo_nav_arrows( $previousPost ,$nextPost ); ?>
            </div>
        </div>
    </section>

<?php get_footer(); ?>
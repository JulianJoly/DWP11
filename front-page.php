<?php
    get_header();

    /* create an ajax request */
    $ajaxRequest = 'data-nonce="' . wp_create_nonce( "motaphoto_request_photos" ) . '" data-action="motaphoto_request_photos" data-ajaxurl="' . admin_url( "admin-ajax.php" ) . '"';

    /* get a random photo to display inside the hero */
    $randomPhoto = get_posts( 
        array(
            'orderby'        => 'rand',
            'post_status'    => 'publish',
            'post_type'      => 'photo',
            'posts_per_page' => 1, 
            'tax_query'      => array(
                array(
                    'taxonomy' => 'format',
                    'field'    => 'slug',
                    'terms'    => 'paysage',
                )
            )
        ) 
    );

    /* get 8 photo card to display in front page */
    $args = array(
        'post_status'    => 'publish',
        'post_type'      => 'photo',
        'posts_per_page' => 8,
    );

    /* display all taxonomies */
    function taxonomy_terms( $taxonomy ) {
        $taxonomies = new WP_Term_Query( array( 'taxonomy' => $taxonomy ));
        if ( !empty( $taxonomies )) {
            foreach ( $taxonomies->terms as $term ) { ?>
                <option value="<?php echo $term->slug; ?>"><?php echo $term->name; ?></option> <?php
            }
        }
    }
?>

            <section class="hero">
                <?php echo get_the_post_thumbnail( $randomPhoto[0], 'full', [ 'class' => 'hero--img imgCover' ]); ?>
                <h1 class="hero--title uppercase noMargin">photographe event</h1>
            </section>
            <section class="photoList">
                <div class="photoList__filters width100">
                    <div class="photoList__filters--container">
                        <select id="category" class="uppercase" <?php echo $ajaxRequest; ?>>
                            <option value="" selected>Catégories</option>
                            <?php taxonomy_terms( 'categorie' ); ?>
                        </select>
                        <select id="format" class="uppercase" <?php echo $ajaxRequest; ?>>
                            <option value="" selected>Formats</option>
                            <?php taxonomy_terms( 'format' ); ?>
                        </select>
                    </div>
                    <select id="dateOrder" class="uppercase" <?php echo $ajaxRequest; ?>>
                        <option value="" selected>Trier par</option>
                        <option value="DESC">À partir des plus récentes</option>
                        <option value="ASC">À partir des plus anciennes</option>
                    </select>
                </div>
                <div class="photoBlock width100">
                    <?php get_template_part( 'templates_part/photo', 'block', $args ); ?>
                </div>
                <button class="photoList--button width100" <?php echo $ajaxRequest; ?>>Charger plus</button>
            </section>

<?php
    get_template_part( 'templates_part/lightbox' );

    get_footer();
?>
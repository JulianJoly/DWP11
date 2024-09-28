<?php
    get_header();

    /* create an ajax request */
    $ajaxRequest = 'data-nonce="' . wp_create_nonce( "request_custom_post_type_photo" ) . '" data-action="request_custom_post_type_photo" data-ajaxurl="' . admin_url( "admin-ajax.php" ) . '"';

    /* get a random large photo to display inside the hero */
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

    /* get 8 photo cards to display on the front page */
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
            <section class="front-page-hero">
                <?php echo get_the_post_thumbnail( $randomPhoto[0], 'full', [ 'class' => 'front-page-hero__img' ]); ?>
                <h1 class="front-page-hero__title uppercase margin-0">photographe event</h1>
            </section>
            <section class="front-page-photo-catalog">
                <div class="front-page-photo-catalog__filter-container width-100">
                    <div class="front-page-photo-catalog__select-container">
                        <select id="categorySelect" class="uppercase" <?php echo $ajaxRequest; ?>>
                            <option value="" selected>Catégories</option>
                            <?php taxonomy_terms( 'categorie' ); ?>
                        </select>
                        <select id="formatSelect" class="uppercase" <?php echo $ajaxRequest; ?>>
                            <option value="" selected>Formats</option>
                            <?php taxonomy_terms( 'format' ); ?>
                        </select>
                    </div>
                    <select id="orderSelect" class="uppercase" <?php echo $ajaxRequest; ?>>
                        <option value="" selected>Trier par</option>
                        <option value="DESC">À partir des plus récentes</option>
                        <option value="ASC">À partir des plus anciennes</option>
                    </select>
                </div>
                <div class="photo-card-list width-100">
                    <?php get_template_part( 'templates_part/photo', 'card', $args ); ?>
                </div>
                <button class="front-page-photo-catalog__more-button width-100" <?php echo $ajaxRequest; ?>>Charger plus</button>
            </section>
<?php
    get_footer();
?>
<?php

/* if current browser support WEBP format */
if ( strpos( $_SERVER['HTTP_ACCEPT'], 'image/webp' )) {
    /* use WEBP format */
    $modernBrowser = true;
} else {
    /* use PNG format */
    $modernBrowser = false;
}

/* add a navigation menu to the theme */
function register_my_menu() {
    register_nav_menu( 'main-menu', __( 'Menu principal', 'text-domain' ) );
}
add_action( 'after_setup_theme', 'register_my_menu' );

/* load all css and scripts */
function theme_enqueue_scripts() {
    wp_enqueue_style( 'motaphoto-style', get_stylesheet_uri() );
    wp_enqueue_script( 'nav-menu', get_theme_file_uri() . '/assets/js/nav-menu.js', array(), '1.0', array( 'strategy' => 'defer', ), true );
    wp_enqueue_script( 'contact-form', get_theme_file_uri() . '/assets/js/contact-form.js', array(), '1.0', array( 'strategy' => 'defer', ), true );
    /* only using ajax on front page */
    if ( is_front_page() ) {
        wp_enqueue_script( 'custom-select', get_theme_file_uri() . '/assets/js/custom-select.js', array(), '1.0', array( 'strategy' => 'defer', ), true );
        wp_enqueue_script( 'custom-post-type', get_theme_file_uri() . '/assets/js/custom-post-type.js', array( 'jquery' ), '1.0', array( 'strategy' => 'defer', ), true );
        wp_localize_script( 'custom-post-type', 'customPostType_js', array( 'ajax_url' => admin_url( 'admin-ajax.php' )));
    }
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_scripts' );

/* fix an PHP error */
remove_action( 'shutdown', 'wp_ob_end_flush_all', 1 );
add_action( 'shutdown', function() {
   while ( @ob_end_flush() );
});

/* add a contact button to the nav menu */
function add_contact_button( $items, $args ) {
    $items .= '<li class="menu-item menu-item-type-custom menu-item-object-custom"><a class="contact--button">Contact</a></li>';
    return $items;
}
add_filter( 'wp_nav_menu_items', 'add_contact_button', 10, 2 );

/* handle ajax request for custom post type "photo" */
function motaphoto_request_photos() {
    if ( !isset( $_REQUEST['nonce'] ) || !wp_verify_nonce( $_REQUEST['nonce'], 'motaphoto_request_photos' )) {
    	wp_send_json_error( "Vous n’avez pas l’autorisation d’effectuer cette action.", 403 );
  	}

    if ( isset( $_POST[ 'paged' ])) {
    	$pageDisplayed = intval( $_POST[ 'paged' ]);
  	} else {
        wp_send_json_error( "Le numéro de la page à affiché est manquant.", 404 );
    }

    if ( isset( $_POST[ 'category' ])) {
    	$categorySelected = strval( $_POST[ 'category' ]);
        if ( !empty( $categorySelected )) {
            $category = array(
                'taxonomy' => 'categorie',
                'field'    => 'slug',
                'terms'    => $categorySelected,
            );
        }
  	}

    if ( isset( $_POST[ 'format' ])) {
    	$formatSelected = strval( $_POST[ 'format' ]);
        if ( !empty( $formatSelected )) {
            $format = array(
                'taxonomy' => 'format',
                'field'    => 'slug',
                'terms'    => $formatSelected,
            );
        }
  	}

    if ( isset( $_POST[ 'order' ])) {
        $orderSelected = strval( $_POST[ 'order' ]);
    }

    $args = array(
        'post_status'    => 'publish',
        'post_type'      => 'photo',
        'posts_per_page' => 8,
        'orderby'        => 'date',
        'order'          => $orderSelected,
        'paged'          => $pageDisplayed,
        'tax_query'      => array(
            $category,
            $format
        )
    );

    ob_start();
        get_template_part( 'templates_part/photo', 'block', $args );
        $posts = ob_get_contents();
    ob_end_clean();

    if ( $posts ) {
        wp_send_json_success( $posts );
    } else {
        wp_send_json_error( "Une erreur est survenue lors de l'affichage des photos.", 400 );
    }

}
add_action( 'wp_ajax_motaphoto_request_photos', 'motaphoto_request_photos' );
add_action( 'wp_ajax_nopriv_motaphoto_request_photos', 'motaphoto_request_photos' );
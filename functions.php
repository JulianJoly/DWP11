<?php
/* if current browser support WEBP images */
if ( strpos( $_SERVER['HTTP_ACCEPT'], 'image/webp' )) {
    /* use WEBP for img */
    $webpSupport = true;
} else {
    /* use PNG for img */
    $webpSupport = false;
}

/* load CSS and scripts in the head of the page after the DOM tree is fully loaded */
function head_enqueue_scripts() {
    wp_enqueue_style( 'motaphoto-style', get_stylesheet_uri() );
    wp_enqueue_script( 'mobile-nav-menu', get_theme_file_uri() . '/js/mobile-nav-menu.js', array(), '1.0', array( 'strategy' => 'defer' ));
}
add_action( 'wp_enqueue_scripts', 'head_enqueue_scripts' );

/* load CSS and scripts in the footer of the page after the DOM tree is fully loaded */
function footer_enqueue_scripts() {
    wp_enqueue_script( 'contact-form', get_theme_file_uri() . '/js/contact-form.js', array(), '1.0', array( 'strategy' => 'defer', 'in_footer' => true ));
    wp_enqueue_style( 'contact-form', get_theme_file_uri() . '/templates_style/contact-form.css' );
    if ( is_front_page() || is_single() ) {
        wp_enqueue_script( 'lightbox', get_theme_file_uri() . '/js/lightbox.js', array(), '1.0', array( 'strategy' => 'defer', 'in_footer' => true ));
        wp_enqueue_style( 'lightbox', get_theme_file_uri() . '/templates_style/lightbox.css' );
        wp_enqueue_style( 'photo-card', get_theme_file_uri() . '/templates_style/photo-card.css' );
    }
    if ( is_front_page() ) {
        wp_enqueue_script( 'custom-select', get_theme_file_uri() . '/js/custom-select.js', array(), '1.0', array( 'strategy' => 'defer', 'in_footer' => true ));
        wp_enqueue_script( 'custom-post-type', get_theme_file_uri() . '/js/custom-post-type.js', array(), '1.0', array( 'strategy' => 'defer', 'in_footer' => true ));
        wp_localize_script( 'custom-post-type', 'customPostType_js', array( 'ajax_url' => admin_url( 'admin-ajax.php' )));
    }
}
add_action( 'wp_enqueue_scripts', 'footer_enqueue_scripts', 999999 );

/* add a configurable navigation menu to the theme */
function register_motaphoto_menu() {
    register_nav_menu( 'main-menu', __( 'Menu principal', 'text-domain' ));
}
add_action( 'after_setup_theme', 'register_motaphoto_menu' );

/* add a custom "contact" button to the navigation menu */
function add_contact_button( $items, $args ) {
    $items .= '<li class="menu-item menu-item-type-custom menu-item-object-custom"><button class="header__contact-button pointer uppercase padding-0">Contact</button></li>';
    return $items;
}
add_filter( 'wp_nav_menu_items', 'add_contact_button', 10, 2 );

/* handle all ajax requests for the custom post type "photo" */
function request_custom_post_type_photo() {
    if ( !isset( $_REQUEST[ 'nonce' ] ) || !wp_verify_nonce( $_REQUEST[ 'nonce' ], 'request_custom_post_type_photo' )) {
    	wp_send_json_error( "Vous n’avez pas l’autorisation d’effectuer cette action.", 403 );
  	}

    if ( isset( $_POST[ 'paged' ])) {
    	$pageDisplayed = intval( $_POST[ 'paged' ]);
  	} else {
        wp_send_json_error( "Le numéro de la page à afficher est manquant.", 404 );
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
  	} else {
        wp_send_json_error( "La catégorie de photo à afficher est manquante.", 404 );
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
  	} else {
        wp_send_json_error( "Le format de photo à afficher est manquant.", 404 );
    }

    if ( isset( $_POST[ 'order' ])) {
        $orderSelected = strval( $_POST[ 'order' ]);
    } else {
        wp_send_json_error( "L'ordre d'affichage des photos est manquant.", 404 );
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
        get_template_part( 'templates_part/photo', 'card', $args );
        $posts = ob_get_contents();
    ob_end_clean();

    if ( $posts ) {
        wp_send_json_success( $posts );
    } else {
        wp_send_json_error( "Une erreur est survenue lors de l'affichage des photos.", 400 );
    }
}
add_action( 'wp_ajax_request_custom_post_type_photo', 'request_custom_post_type_photo' );
add_action( 'wp_ajax_nopriv_request_custom_post_type_photo', 'request_custom_post_type_photo' );

/* replace the WordPress 'wp_ob_end_flush_all' function to avoid any PHP notices */
remove_action( 'shutdown', 'wp_ob_end_flush_all', 1 );
add_action( 'shutdown', function() {
    while ( @ob_end_flush() );
});
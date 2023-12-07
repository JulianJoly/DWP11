<?php

/* adding nav menu to theme */
function register_my_menu() {
    register_nav_menu( 'main-menu', __( 'Menu principal', 'text-domain' ) );
}
add_action( 'after_setup_theme', 'register_my_menu' );

/* loading css and scripts */
function theme_enqueue_scripts() {
    wp_enqueue_style( 'motaphoto-style', get_stylesheet_uri() );
    wp_enqueue_script( 'nav-menu', get_theme_file_uri() . '/assets/js/nav-menu.js', array(), '1.0.0', array( 'strategy' => 'defer', ), true );
    wp_enqueue_script( 'contact-form', get_theme_file_uri() . '/assets/js/contact-form.js', array(), '1.0.0', array( 'strategy' => 'defer', ), true );
    wp_enqueue_script( 'custom-post-type', get_theme_file_uri() . '/assets/js/custom-post-type.js', array( 'jquery' ), '1.0.0', array( 'strategy' => 'defer', ), true );
    wp_localize_script( 'custom-post-type', 'customPostType_js', array( 'ajax_url' => admin_url( 'admin-ajax.php' )) );
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_scripts' );

/* PHP error fix */
remove_action( 'shutdown', 'wp_ob_end_flush_all', 1 );
add_action( 'shutdown', function() {
   while ( @ob_end_flush() );
} );

/* adding contact button to nav menu */
function add_contact_button( $items, $args ) {
    $items .= '<li class="menu-item menu-item-type-custom menu-item-object-custom"><a class="contact--button">Contact</a></li>';
    return $items;
}
add_filter( 'wp_nav_menu_items', 'add_contact_button', 10, 2 );

/* request custom type post "photo" */
function motaphoto_request_photos() {
    $query = new WP_Query([
        'post_type' => 'photo',
        'posts_per_page' => -1
    ]);

    if( $query -> have_posts()) {
        wp_send_json( $query );
    } else {
        wp_send_json( false );
    }

    wp_die();
}
add_action( 'wp_ajax_request_photos', 'motaphoto_request_photos' );
add_action( 'wp_ajax_nopriv_request_photos', 'motaphoto_request_photos' );
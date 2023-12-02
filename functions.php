<?php

/* On ajoute un menu WordPress */
function register_my_menu() {
    register_nav_menu( 'main-menu', __( 'Menu principal', 'text-domain' ) );
}
add_action( 'after_setup_theme', 'register_my_menu' );

/* On charge le css et les scripts */
function theme_enqueue_scripts() {
    wp_enqueue_style( 'motaphoto-style', get_stylesheet_uri() );
    wp_enqueue_script( 'nav-menu', get_theme_file_uri() . '/assets/js/nav-menu.js', array(), '1.0.0', array( 'strategy' => 'defer', ), true );
    wp_enqueue_script( 'contact-form', get_theme_file_uri() . '/assets/js/contact-form.js', array(), '1.0.0', array( 'strategy' => 'defer', ), true );
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_scripts' );

/* Correction d'une erreur PHP */
remove_action( 'shutdown', 'wp_ob_end_flush_all', 1 );
add_action( 'shutdown', function() {
   while ( @ob_end_flush() );
} );

/* On ajoute le bouton de contact dans le menu */
add_filter( 'wp_nav_menu_items', 'add_contact_button', 10, 2 );
function add_contact_button( $items, $args ) {
    $items .= '<li class="menu-item menu-item-type-custom menu-item-object-custom"><a class="contact--button">Contact</a></li>';
    return $items;
}
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
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_scripts' );

?>
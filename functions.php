<?php

/* On ajoute un menu WordPress */
function register_my_menu() {
    register_nav_menu( 'main-menu', __( 'Menu principal', 'text-domain' ) );
}
add_action( 'after_setup_theme', 'register_my_menu' );

/* On charge le css et les scripts */
function theme_enqueue_styles() {
    wp_enqueue_style( 'nmotastyle', get_theme_file_uri('/build/style.css') );
    /* wp_enqueue_style('main_styles', get_theme_file_uri('/style.css')); */
    /* wp_enqueue_script( 'nav-menu', get_theme_file_uri() . '/assets/js/nav-menu.js', array(), '1.0.0', array( 'strategy' => 'defer', ), true ); */
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );

/* function styleCSS_script() {
    wp_enqueue_style( 'style', get_stylesheet_uri() );
    
}
add_action( 'wp_enqueue_scripts', 'styleCSS_script' ); */

?>
<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Motaphoto</title>
<!--         <link rel="stylesheet" href="wp-content/themes/motaphoto/style.css">
        <script defer src="wp-content/themes/motaphoto/assets/js/nav-menu.js"></script> -->
    </head>
    <body>
        <header class="header">
            <img src="wp-content/themes/motaphoto/assets/img/logo.png" alt="Logo du site" class="header__logo">
            <nav role="navigation" aria-label="<?php _e('Menu principal', 'text-domain'); ?>" class="header__nav">
                <?php
                    wp_nav_menu([
                        'theme_location' => 'main-menu',
                        'container'      => false,
                        'menu_id'        => 'primary-menu',
                        'menu_class'     => 'header__nav--menu'
                    ]);
                ?>
                <button type="button" aria-expanded="false" aria-controls="primary-menu" class="header__nav--button">
                    <?php esc_html_e( 'Menu', 'text-domain' ); ?>
                </button>
            </nav>
        </header>
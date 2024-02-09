<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Motaphoto</title>
        <?php wp_head(); ?>
    </head>
    <body class="body">
        <header class="header width100">
            <img src="<?php echo get_theme_file_uri() . '/assets/img/logo.png' ?>" alt="Logo du site" class="header__logo">
            <nav role="navigation" aria-label="<?php _e('Menu principal', 'text-domain'); ?>" class="header__nav">
                <?php
                    wp_nav_menu([
                        'theme_location' => 'main-menu',
                        'container'      => false,
                        'menu_id'        => 'primary-menu',
                        'menu_class'     => 'header__nav--menu capsLock'
                    ]);
                ?>
                <button type="button" aria-expanded="false" aria-controls="primary-menu" class="header__nav--button">
                    <img src="<?php echo get_theme_file_uri() . '/assets/img/nav-menu-open.png' ?>" alt="Ouvrir le menu de navigation" class="header__nav--buttonImg">
                </button>
            </nav>
        </header>
        <main class="main">
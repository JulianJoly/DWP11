<?php

    /* if browser support WEBP format */
    if ( $GLOBALS[ 'modernBrowser' ] ) {
        /* use WEBP format */
        $logo = get_theme_file_uri() . '/assets/img/logo.png.webp';
        $buttonOpenNav = get_theme_file_uri() . '/assets/img/nav-menu-open.png.webp';
    } else {
        /* use PNG format */
        $logo = get_theme_file_uri() . '/assets/img/logo.png';
        $buttonOpenNav = get_theme_file_uri() . '/assets/img/nav-menu-open.png';
    }

    /* add JS variable to get current theme file path */
    function themeFilePath() {
        echo '<script type="text/javascript" defer>const themeFilePath = "' . get_theme_file_uri() . '";</script>';
    }
?>

<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Motaphoto</title>
        <?php wp_head(); ?>
        <?php themeFilePath(); ?>
    </head>
    <body class="body">
        <header class="header width100">
            <img src="<?php echo $logo; ?>" alt="Logo du site" class="header__logo">
            <nav role="navigation" aria-label="<?php _e( 'Menu principal', 'text-domain' ); ?>" class="header__nav">
                <?php
                    wp_nav_menu([
                        'theme_location' => 'main-menu',
                        'container'      => false,
                        'menu_id'        => 'primary-menu',
                        'menu_class'     => 'header__nav--menu capsLock'
                    ]);
                ?>
                <button type="button" aria-expanded="false" aria-controls="primary-menu" class="header__nav--button">
                    <img src="<?php echo $buttonOpenNav; ?>" alt="Ouvrir le menu de navigation" class="header__nav--buttonImg">
                </button>
            </nav>
        </header>
        <main class="main">
<?php
    /* if browser support WEBP images */
    if ( $GLOBALS[ 'webpSupport' ] ) {
        /* use WEBP for img */
        $logo = get_theme_file_uri() . '/assets/img/logo.png.webp';
        $openMenuButton = get_theme_file_uri() . '/assets/img/open-menu-button.png.webp';
        $closeMenuButton = get_theme_file_uri() . '/assets/img/close-menu-button.png.webp';
    } else {
        /* use PNG for img */
        $logo = get_theme_file_uri() . '/assets/img/logo.png';
        $openMenuButton = get_theme_file_uri() . '/assets/img/open-menu-button.png';
        $closeMenuButton = get_theme_file_uri() . '/assets/img/close-menu-button.png';
    }
?>
<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Motaphoto</title>
        <?php wp_head(); ?>
    </head>
    <body class="body margin-0">
        <header class="header width-100">
            <img src="<?php echo $logo; ?>" alt="Logo du site" class="header__logo">
            <nav role="navigation" aria-label="<?php _e( 'Menu principal', 'text-domain' ); ?>" class="header__nav">
                <?php
                    wp_nav_menu([
                        'theme_location' => 'main-menu',
                        'container'      => false,
                        'menu_id'        => 'primary-menu',
                        'menu_class'     => 'header__menu padding-0 uppercase hover-bold'
                    ]);
                ?>
            </nav>
            <button title="Ouvrir le menu de navigation" aria-expanded="false" aria-controls="primary-menu" class="header__nav-menu-button header__nav-menu-button--open padding-0">
                <img src="<?php echo $openMenuButton; ?>" alt="Ouvrir le menu de navigation" class="width-100 height-100">
            </button>
        </header>
        <main class="main">
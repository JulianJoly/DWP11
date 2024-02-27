'use_strict'

/* @type {HTMLElement} */
const siteHeader = document.querySelector( '.header' );

/* @type {HTMLElement} */
const siteMain = document.querySelector( '.main' );

/*
 * @param {HTMLElement} element
 * @param {string} attribute
 * @param {bool} value
 */
const setAttribute = ( element, attribute, value ) => element.setAttribute( attribute, value );

/* if site header and site main exists */
if ( siteHeader && siteMain ) {

    /* @type {HTMLElement} */
    const navButton = siteHeader.querySelector( '.header__nav--button' );

    /* @type {HTMLElement} */
    const navMenu = siteHeader.querySelector( '.header__nav--menu' );

    /* if nav button and nav menu exists */
    if ( navButton && navMenu ) {

        /* @type {HTMLElement} */
        const navButtonImage = siteHeader.querySelector( '.header__nav--buttonImg' );

        /* wait for click on nav button in header */
        navButton.onclick = function() {

            /* @type {URL} */
            let navButtonImagePath = themeFilePath + '/assets/img/';
            
            /* @type {bool} */
            const modernBrowser = navButtonImage.src.includes( '.webp' );

            /* if nav menu is open */
            if ( navButton.getAttribute( 'aria-expanded' ) === 'true' ) {

                /* if browser support webp format */
                if ( modernBrowser ) {
                    /* use webp format */
                    navButtonImagePath += 'nav-menu-open.png.webp';
                } else {
                    /* use png format */
                    navButtonImagePath += 'nav-menu-open.png';
                }

                /* set aria-expanded to false, change button icon + alt value */
                setAttribute( navButton, 'aria-expanded', 'false' );
                setAttribute( navButtonImage, 'src', navButtonImagePath );
                setAttribute( navButtonImage, 'alt', 'Ouvrir le menu de navigation' );

                /* toggle (stick) header, toggle (hide) nav menu, toggle (show) site main */
                siteHeader.classList.toggle( 'fixed' );
                navMenu.classList.toggle( 'toggled' );
                siteMain.classList.toggle( 'toggled' );

            /* else if nav menu is closed */
            } else if ( navButton.getAttribute( 'aria-expanded' ) === 'false' ) {

                /* check if webp images are supported */
                if ( modernBrowser ) {
                    /* use webp format */
                    navButtonImagePath += 'nav-menu-close.png.webp';
                } else {
                    /* use png format */
                    navButtonImagePath += 'nav-menu-close.png';
                }

                /* set aria-expanded to false, change button icon + alt value */
                setAttribute( navButton, 'aria-expanded', 'true' );
                setAttribute( navButtonImage, 'src', navButtonImagePath );
                setAttribute( navButtonImage, 'alt', 'Fermer le menu de navigation' );

                /* toggle (unstick) header, (show) nav menu, toggle (hide) site main */
                siteHeader.classList.toggle( 'fixed' );
                navMenu.classList.toggle( 'toggled' );
                siteMain.classList.toggle( 'toggled' );

            }
        }
    } else { console.log( 'ERROR: can\'t find navigation button and menu' ); }
} else { console.log( 'ERROR: can\'t find header and main' ); }
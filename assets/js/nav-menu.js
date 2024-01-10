'use_strict'

/* @type {HTMLElement} */
const siteNavigation = document.querySelector( '.header__nav' );

/* @type {HTMLElement} */
const siteHeader = document.querySelector( '.header' );

/*
 * @param {HTMLElement} element
 * @param {string} attribute
 * @param {bool} value
 */
const setAttribute = ( element, attribute, value ) => element.setAttribute( attribute, value );

if ( siteNavigation && siteHeader ) {
    /* @type {HTMLElement} */
    const mobileButton = siteNavigation.querySelector( '.header__nav--button' );

    /* @type {HTMLElement} */
    const mobileMenu = siteNavigation.querySelector( '.header__nav--menu' );

    if ( mobileButton && mobileMenu ) {
        /* @type {HTMLElement} */
        const mobileButtonImage = siteNavigation.querySelector( '.header__nav--buttonImg' );

        mobileButton.onclick = function() {
            /* @type {URL} */
            let sourceImage = window.location.origin  + '/motaphoto/wp-content/themes/motaphoto/assets/img/'; /* changer la valeur avant la mise en ligne */
            console.log(sourceImage);
            
            if ( mobileButton.getAttribute( 'aria-expanded' ) === 'true' ) {
                sourceImage += 'nav-menu-open.png'
                setAttribute( mobileButton, 'aria-expanded', 'false' );
                setAttribute( mobileButtonImage, 'src', sourceImage );
                setAttribute( mobileButtonImage, 'alt', 'Ouvrir le menu de navigation' );

                siteHeader.classList.toggle( 'fixed' );
                mobileMenu.classList.toggle( 'hide' );
                setTimeout( () => {
                    mobileMenu.classList.toggle( 'toggled' );
                    mobileMenu.classList.toggle( 'hide' );
                }, 500 );
            }
            
            else {
                sourceImage += 'nav-menu-close.png'
                setAttribute( mobileButton, 'aria-expanded', 'true' );
                setAttribute( mobileButtonImage, 'src', sourceImage );
                setAttribute( mobileButtonImage, 'alt', 'Fermer le menu de navigation' );

                siteHeader.classList.toggle( 'fixed' );
                mobileMenu.classList.toggle( 'toggled' );
            }
        }
    }
}
'use_strict'

/* @type {HTMLElement} */
const siteNavigation = document.querySelector('.header__nav');
/* console.log(siteNavigation); */

/*
 * @param {HTMLElement} element
 * @param {string} attribute
 * @param {bool} value
 */
const setAttribute = ( element, attribute, value ) => element.setAttribute( attribute, value );

if ( siteNavigation ) {
    /* @type {HTMLElement} */
    const mobileButton = siteNavigation.querySelector('.header__nav--button');
    /* console.log(mobileButton); */

    /* @type {HTMLElement} */
    const mobileMenu = siteNavigation.querySelector('.header__nav--menu');
    /* console.log(mobileMenu); */

    if ( mobileButton ) {
        /* @type {HTMLElement} */
        const mobileButtonImage = siteNavigation.querySelector('.header__nav--buttonImg');
        /* console.log(mobileButtonImage); */

        mobileButton.onclick = function() {
            /* @type {URL} */
            let sourceImage = window.location.origin + '/motaphoto/wp-content/themes/motaphoto/assets/img/'; /* changer la valeur avant la mise en ligne */
            
            if ( mobileButton.getAttribute( 'aria-expanded' ) === 'true' ) {
                sourceImage += 'nav-menu-open.png'
                /* console.log(sourceImage); */
                setAttribute( mobileButton, 'aria-expanded', 'false' );
                setAttribute( mobileButtonImage, 'src', sourceImage );
                setAttribute( mobileButtonImage, 'alt', 'Ouvrir le menu de navigation' );

                mobileMenu.classList.toggle( 'hide' );
                setTimeout( () => {
                    mobileMenu.classList.toggle( 'toggled' );
                    mobileMenu.classList.toggle( 'hide' );
                }, 500 );
            }
            
            else {
                sourceImage += 'nav-menu-close.png'
                /* console.log(sourceImage); */
                setAttribute( mobileButton, 'aria-expanded', 'true' );
                setAttribute( mobileButtonImage, 'src', sourceImage );
                setAttribute( mobileButtonImage, 'alt', 'Fermer le menu de navigation' );

                mobileMenu.classList.toggle( 'toggled' );
            }
        }
    }
}
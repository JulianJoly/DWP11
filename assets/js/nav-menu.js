'use_strict'

/* @type {HTMLElement} */
const siteNavigation = document.querySelector('.header__nav');
console.log(siteNavigation);

/*
 * @param {HTMLElement} element
 * @param {string} attribute
 * @param {bool} value
 */
const setAttribute = ( element, attribute, value ) => element.setAttribute( attribute, value );

if ( siteNavigation ) {
    /* @type {HTMLElement} */
    const mobileButton = siteNavigation.querySelector('.header__nav--button');
    console.log(mobileButton);

    if ( mobileButton ) {
        /* @type {HTMLElement} */
        const mobileButtonImage = siteNavigation.querySelector('.header__nav--buttonImg');
        console.log(mobileButtonImage);

        mobileButton.onclick = function() {
            siteNavigation.classList.toggle( 'toggled' );

            if ( mobileButton.getAttribute( 'aria-expanded' ) === 'true' ) {
                setAttribute( mobileButton, 'aria-expanded', 'false' );
                setAttribute( mobileButtonImage, 'src', 'wp-content/themes/motaphoto/assets/img/nav-menu-open.png' );
                setAttribute( mobileButtonImage, 'alt', 'Ouvrir le menu de navigation' );
            }
            
            else {
                setAttribute( mobileButton, 'aria-expanded', 'true' );
                setAttribute( mobileButtonImage, 'src', 'wp-content/themes/motaphoto/assets/img/nav-menu-close.png' );
                setAttribute( mobileButtonImage, 'alt', 'Fermer le menu de navigation' );
            }
        }
    }
}
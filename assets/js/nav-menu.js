'use_strict'

/* @type {HTMLElement} */
const siteNavigation = document.querySelector('.nav');
console.log(siteNavigation);

/*
 * @param {HTMLElement} element
 * @param {string} attribute
 * @param {bool} value
 */
const setAttribute = ( element, attribute, value ) => element.setAttribute( attribute, value );

if ( siteNavigation ) {
    /* @type {HTMLElement} */
    const mobileButton = siteNavigation.querySelector('.nav__button');
    console.log(mobileButton);

    if ( mobileButton ) {
        mobileButton.onclick = function() {
            siteNavigation.classList.toggle( 'toggled' );

            if ( mobileButton.getAttribute( 'aria-expanded' ) === 'true' ) {
                setAttribute( mobileButton, 'aria-expanded', 'false' );
            } else {
                setAttribute( mobileButton, 'aria-expanded', 'true' );
            }
        }
    }
}
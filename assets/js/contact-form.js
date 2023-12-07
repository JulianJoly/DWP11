'use-strict'

/* @type {HTMLElement} */
const contactPopup = document.querySelector('.contact')
/* console.log(contactPopup); */

/* @type {HTMLElement} */
const contactButton = document.querySelector('.contact--button')
/* console.log(contactButton); */

/* @type {HTMLElement} */
const contactBackground = document.querySelector('.contact--background')
/* console.log(contactBackground); */

if ( contactPopup && contactButton && contactBackground) {
    /* @type {HTMLElement} */
    const currentURL = window.location.href
    /* console.log(currentURL); */

    /* @param {HTMLElement} element */
    const toggle = ( element ) => element.classList.toggle( 'toggled' );

    /* @param {HTMLElement} element */
    const hide = ( element ) => element.classList.toggle( 'hide' );

    if ( currentURL.includes('/#wpcf7-f21-o1') ) {
        toggle( contactBackground );
        toggle( contactPopup );
    }

    contactButton.onclick = function() {
        toggle( contactBackground );
        toggle( contactPopup );
    }

    contactBackground.onclick = function() {
        hide ( contactBackground );
        hide ( contactPopup );
        setTimeout( () => {
            toggle( contactBackground );
            hide ( contactBackground );
            toggle( contactPopup );
            hide ( contactPopup );
        }, 500 );
        
        if ( currentURL.includes('/#wpcf7-f21-o1') ) {
            window.location.href = currentURL.replace( "/#wpcf7-f21-o1", "" );
        }
    }
}
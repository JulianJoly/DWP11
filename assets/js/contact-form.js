'use-strict'

/* @type {HTMLElement} */
const contactPopup = document.querySelector( '.contact' )
const contactBackground = document.querySelector( '.contact--background' )

/* if contact section and contact background exists */
if ( contactPopup && contactBackground ) {

    /* @type {URL} */
    const currentURL = window.location.href

    /* @type {HTMLElements} */
    const contactButtonHeader = document.querySelector( '.contact--button' )
    const contactButtonSingle = document.querySelector( '.interested__container--button' )

    /* if contact form was submitted */
    if ( currentURL.includes( '/#wpcf7-f21-o1' )) {
        /* toggle (hide) contact form and background */
        toggle( contactBackground );
        toggle( contactPopup );
    }

    /* if contact button in single page exist */
    if ( contactButtonSingle ) {

        /* @type {HTMLElement} element */
        const photoRef = document.getElementsByName( 'reference-photo' )[0];

        /* wait for click on contact button in single page */
        contactButtonSingle.onclick = function() {

            /* togle (show) contact form and background */
            toggle( contactBackground );
            toggle( contactPopup );

            /* if element named 'refence-photo' exist (input in contact form) */
            if ( photoRef ) {
                /* add the photo reference in the contact form input */
                photoRef.value = ( document.querySelector( '.interested__container--button' ).id );
            }
        }
    } /* no error to display if variable is missing */

    /* wait for click on contact button in header */
    contactButtonHeader.onclick = function() {
        /* togle (show/hide) contact form and background */
        contactBackground.classList.toggle( 'toggled' );
        contactPopup.classList.toggle( 'toggled' );
    }

    /* wait for click on contact background */
    contactBackground.onclick = function() {

        /* togle (hide) contact form and background */
        contactBackground.classList.toggle( 'toggled' );
        contactPopup.classList.toggle( 'toggled' );
        
        if ( currentURL.includes( '/#wpcf7-f21-o1' ) ) {
            window.location.href = currentURL.replace( "/#wpcf7-f21-o1", "" );
        }
    }
} else { console.log( 'ERROR: can\'t find contact section and contact background' ); }
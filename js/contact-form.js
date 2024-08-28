/* @type { HTML element } */
const contactSection = document.getElementsByClassName( 'contact' )[0];

if ( contactSection ) {
    
    /* @type { HTML element } */
    const contactSectionForm = document.getElementsByClassName( 'contact__form' )[0];

    if ( contactSectionForm ) {

        /* @type { HTML element } */
        const headerContactButton = document.getElementsByClassName( 'header__contact-button' )[0];
        const singlePageContactButton = document.getElementsByClassName( 'single-interested__contact-button' )[0];
        const photoReference = document.getElementsByName( 'reference-photo' )[0];
        const singlePage = document.getElementsByClassName( 'single-photo' )[0];
    
        /* when clicking on the contact button ( in the header ) : show the contact form */
        headerContactButton.addEventListener( 'click', function() {
            contactSection.classList.remove( 'hidden' );
        })
    
        if ( singlePageContactButton && photoReference && singlePage ) {
    
            /* when clicking on the contact button ( on the single page ) */
            singlePageContactButton.addEventListener( 'click', function() {
        
                /* show the contact form */
                contactSection.classList.remove( 'hidden' );
    
                /* add the photo reference to the contact form */
                photoReference.value = singlePageContactButton.id ;
    
            })
    
            /* when clicking outside of the contact form : hide the contact form */
            document.addEventListener( 'click', function( event ) {
                if ( !contactSectionForm.contains( event.target ) && !singlePageContactButton.contains( event.target ) && !headerContactButton.contains( event.target ) && !contactSection.classList.contains( 'hidden' )) {
                    contactSection.classList.add( 'hidden' );
                }
            })
    
        } else if ( !singlePageContactButton && singlePage ) {
            console.warn( 'contact-form.js : can\'t find the contact button on the single page' );
        } else if ( !photoReference && singlePage ) {
            console.warn( 'contact-form.js : can\'t find the reference of the photo' );
        } else if ( !singlePage ) {
            /* when clicking outside of the contact form : hide the contact form */
            document.addEventListener( 'click', function( event ) {
                if ( !contactSectionForm.contains( event.target ) && !headerContactButton.contains( event.target ) && !contactSection.classList.contains( 'hidden' )) {
                    contactSection.classList.add( 'hidden' );
                }
            })
        }

    } else {
        console.warn( 'contact-form.js : can\'t find the contact section form' );
    }

} else {
    console.warn( 'contact-form.js : can\'t find the contact section' );
}
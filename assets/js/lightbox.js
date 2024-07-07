/* 'use strict'; */

/* @type { HTML collection } */
/* const */ allPhotoCards = document.getElementsByClassName( 'photo' );

/* @type { HTML element } */
/* const */ lightboxSection = document.getElementsByClassName( 'lightbox' )[0];

if ( allPhotoCards && lightboxSection ) {

    /* @type { HTML element } */
    /* let photoCardButton = null;
    let photoCardReference = null;
    let photoCardCategory = null;
    let photoCardImg = null; */
    /* const */ lightboxCloseButton = lightboxSection.getElementsByClassName( 'lightbox__button--close' )[0];
    /* const */ lightboxPreviousButton = lightboxSection.getElementsByClassName( 'lightbox__button--previous' )[0];
    /* const */ lightboxContainer = lightboxSection.getElementsByClassName( 'lightbox__container' )[0];
    /* const */ lightboxInfo = lightboxSection.getElementsByClassName( 'lightbox__info' )[0];
    /* const */ lightboxNextButton = lightboxSection.getElementsByClassName( 'lightbox__button--next' )[0];

    function createLightboxFunction( photoCard ) {

        /* set variables to copy data from */
        photoCardReference = photoCard.getElementsByClassName( 'photo__hover--reference' )[0];
        photoCardCategory = photoCard.getElementsByClassName( 'photo__hover--category' )[0];
        photoCardImg = photoCard.getElementsByClassName( 'photo--img' )[0];

        if ( photoCardImg ) {

            /* remove any existing lightbox img */
            while ( lightboxSection.getElementsByClassName( 'lightbox__img' ).length >= 1 ) {
                lightboxSection.getElementsByClassName( 'lightbox__img' )[0].remove();
            }

            /* clone the photo card img element */
            lightboxImg = photoCardImg.cloneNode();

            if ( lightboxImg && lightboxImg.width >= lightboxImg.height ) {
                lightboxImg.classList.add( 'paysage' );
            } else if ( lightboxImg && lightboxImg.width < lightboxImg.height ) {
                lightboxImg.classList.add( 'portrait' );
            }

            lightboxImg.classList.replace( 'photo--img', 'lightbox__img' );
            lightboxImg.classList.remove( 'height100' );
            lightboxImg.classList.remove( 'width100' );
            lightboxImg.classList.remove( 'imgCover' );
            lightboxContainer.insertBefore( lightboxImg, lightboxInfo );

        } else {
            console.warn( 'lightbox.js : variable "photoCardImg" not set or null' );
        }

        if ( photoCardReference ) {

            /* remove any existing lightbox reference */
            while ( lightboxSection.getElementsByClassName( 'lightbox__text--reference' ).length >= 1 ) {
                lightboxSection.getElementsByClassName( 'lightbox__text--reference' )[0].remove();
            }

            /* clone the photo card reference element into the lightbox section */
            lightboxReference = photoCardReference.cloneNode( true );
            lightboxReference.classList.replace( 'photo__hover--reference', 'lightbox__text' );
            lightboxReference.classList.add( 'photo__hover--reference', 'lightbox__text--reference' );
            lightboxInfo.appendChild( lightboxReference )

        } else {
            console.warn( 'lightbox.js : variable "photoCardReference" not set or null' );
        }

        if ( photoCardCategory ) {

            /* remove any existing lightbox category */
            while ( lightboxSection.getElementsByClassName( 'lightbox__text--category' ).length >= 1 ) {
                lightboxSection.getElementsByClassName( 'lightbox__text--category' )[0].remove();
            }

            /* clone the photo card category element into the lightbox section */
            lightboxCategory = photoCardCategory.cloneNode( true );
            lightboxCategory.classList.replace( 'photo__hover--category', 'lightbox__text' );
            lightboxCategory.classList.add( 'photo__hover--category', 'lightbox__text--category' );
            lightboxInfo.appendChild( lightboxCategory );

        } else {
            console.warn( 'lightbox.js : variable "photoCardCategory" not set or null' );
        }

        /* if a previous photo card exist : show the previous button of the lightbox, else : hide the button */
        if ( photoCard.previousElementSibling ) {
            lightboxPreviousButton.classList.remove( 'hidden' );
        } else if ( !lightboxPreviousButton.classList.contains( 'hidden' )) {
            lightboxPreviousButton.classList.add( 'hidden' );
        }

        /* if a next photo card exist : show the next button of the lightbox, else : hide the button */
        if ( photoCard.nextElementSibling ) {
            lightboxNextButton.classList.remove( 'hidden' );
        } else if ( !lightboxNextButton.classList.contains( 'hidden' )) {
            lightboxNextButton.classList.add( 'hidden' );
        }

        /* show the lightbox */
        lightboxSection.classList.remove( 'hidden' );

    }

    function navBetweenPhotoFunction( direction ) {

        /* get the lightbox reference */
        lightboxReference = lightboxSection.getElementsByClassName( 'lightbox__text--reference' )[0].innerText;

        /* compare the photo reference inside the lightbox with every photo card reference */
        for ( let currentPhotoCard = 0; currentPhotoCard < allPhotoCards.length; currentPhotoCard++ ) {
            if ( allPhotoCards[ currentPhotoCard ].getElementsByClassName( 'photo__hover--reference' )[0].innerText == lightboxReference ) {

                /* if direction is set to previous : set the previous photo as the lightbox */
                if ( direction == 'previous' && currentPhotoCard - 1 >= 0 ) {
                    createLightboxFunction( allPhotoCards[ currentPhotoCard - 1 ] );
                }

                /* if direction is set to next : set the next photo as the lightbox */
                if ( direction == 'next' && currentPhotoCard + 1 < allPhotoCards.length ) {
                    createLightboxFunction( allPhotoCards[ currentPhotoCard + 1 ] );
                }

                break;
            }
        }
    }

    /* for each photo card */
    for ( let currentPhotoCard = 0; currentPhotoCard < allPhotoCards.length; currentPhotoCard++ ) {
        /* if the lightbox button on the photo card exist */
        if ( allPhotoCards[ currentPhotoCard ].getElementsByClassName( 'photo__hover--lightbox' )) {

            /* set the variable for the lightbox button on the photo card */
            photoCardButton = allPhotoCards[ currentPhotoCard ].getElementsByClassName( 'photo__hover--lightbox' )[0];

            /* create an event on click */
            photoCardButton.addEventListener( 'click', function() {
                /* set the current photo as the lightbox */
                createLightboxFunction( allPhotoCards[ currentPhotoCard ]);
            })

        } else {
            console.warn( 'lightbox.js : can\'t find any HTML element with the class "photo__hover--lightbox"' );
        }
    }
    
    if ( lightboxPreviousButton ) {
        /* when clicking on the "previous photo" button : set the previous photo as the lightbox */
        lightboxPreviousButton.addEventListener( 'click', function() {
            navBetweenPhotoFunction( 'previous' );
        })
    } else {
        console.warn( 'lightbox.js : can\'t find the lightbox previous button' );
    }
    
    if ( lightboxNextButton ) {
        /* when clicking on the "next photo" button : set the next photo as the lightbox */
        lightboxNextButton.addEventListener( 'click', function() {
            navBetweenPhotoFunction( 'next' );
        })
    } else {
        console.warn( 'lightbox.js : can\'t find the lightbox next button' );
    }

    if ( lightboxCloseButton ) {
        /* when clicking on the "close lightbox" button : hide the lightbox */
        lightboxCloseButton.addEventListener( 'click', function() {
            if ( !lightboxSection.classList.contains( 'hidden' )) {
                lightboxSection.classList.add( 'hidden' );
            }
        })
    } else {
        console.warn( 'lightbox.js : can\'t find the lightbox close button' );
    }

} else {
    console.warn( 'lightbox.js : can\'t find any HTML element with the class "photo" or "lightbox"' );
}
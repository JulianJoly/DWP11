/* @type { HTML collection } */
allPhotoCards = document.getElementsByClassName( 'photo-card' );
/* @type { HTML element } */
lightboxSection = document.getElementsByClassName( 'lightbox' )[0];
if ( allPhotoCards && lightboxSection ) {

    /* @type { HTML element } */
    lightboxContainer = lightboxSection.getElementsByClassName( 'lightbox__container' )[0];
    lightboxInfo = lightboxSection.getElementsByClassName( 'lightbox__info' )[0];
    if ( lightboxContainer && lightboxInfo ) {
        
        function createLightbox( element, delay ) {

            function clonePhotoCardElementToLightbox( element, isImg, oldClass, newClass, addClass ) {

                /* clone the photo card element */
                let lightboxElement = element.cloneNode( true );

                if ( isImg == true ) {

                    /* change the CSS based on the img size */
                    if ( lightboxElement && lightboxElement.width > lightboxElement.height ) {
                        lightboxElement.classList.add( addClass );
                    }

                    /* change the CSS of the cloned img */
                    lightboxElement.classList.remove( 'height-100', 'width-100' );

                } else if ( isImg == false ) {
                    lightboxElement.classList.add( addClass );
                }

                /* replace the class of the cloned element */
                lightboxElement.classList.replace( oldClass, newClass );
                lightboxElement.classList.add( 'hidden' );
                lightboxElement.classList.remove( 'photo-card__text' );

                setTimeout( function() {

                    if ( isImg == true ) {

                        /* remove any existing lightbox img */
                        while ( lightboxSection.getElementsByClassName( newClass ).length >= 1 ) {
                            lightboxSection.getElementsByClassName( newClass )[0].remove();
                        }

                        /* insert the cloned photo card img inside the lightbox container */
                        lightboxContainer.insertBefore( lightboxElement, lightboxInfo );

                        /* change the img max size to fit the screen */
                        resizeLightboxImg( lightboxElement ); /* img */

                    } else if ( isImg == false ) {

                        /* remove any existing lightbox category/reference */
                        while ( lightboxSection.getElementsByClassName( addClass ).length >= 1 ) {
                            lightboxSection.getElementsByClassName( addClass )[0].remove();
                        }

                        /* insert the cloned photo card category/reference inside the lightbox info box */
                        lightboxInfo.appendChild( lightboxElement );

                    }

                    setTimeout( function() {
                        /* allow fade animation to work */
                        lightboxElement.classList.remove( 'hidden' );
                    }, delay / 2 )

                }, delay)

            }

            /* @type { HTML element } */
            let photoCardImg = element.getElementsByClassName( 'photo-card__img' )[0];
            if ( photoCardImg ) {
                /* create the lightbox img */
                clonePhotoCardElementToLightbox( photoCardImg, true, 'photo-card__img', 'lightbox__img', 'lightbox__img--large' ); /* element, isImg, oldClass, newClass, addClass */
            } else {
                console.warn( 'lightbox.js : can\'t find the img of the photo card' );
            }

            /* @type { HTML element } */
            let photoCardReference = element.getElementsByClassName( 'photo-card__text--reference' )[0];
            if ( photoCardReference ) {
                /* create the lightbox reference */
                clonePhotoCardElementToLightbox( photoCardReference, false, 'photo-card__text--reference', 'lightbox__text', 'lightbox__text--reference' ); /* element, isImg, oldClass, newClass, addClass */
            } else {
                console.warn( 'lightbox.js : can\'t find the reference of the photo card' );
            }

            /* @type { HTML element } */
            let photoCardCategory = element.getElementsByClassName( 'photo-card__text--category' )[0];
            if ( photoCardCategory ) {
                /* create the lightbox category */
                clonePhotoCardElementToLightbox( photoCardCategory, false, 'photo-card__text--category', 'lightbox__text', 'lightbox__text--category' ); /* element, isImg, oldClass, newClass, addClass */
            } else {
                console.warn( 'lightbox.js : vcan\'t find the category of the photo card' );
            }

            /* if a previous photo card exist : show the previous button of the lightbox, else : hide the button */
            if ( element.previousElementSibling && element.previousElementSibling.classList.contains( 'photo-card' )) {
                lightboxPreviousButton.classList.remove( 'hidden' );
            } else if ( !lightboxPreviousButton.classList.contains( 'hidden' )) {
                lightboxPreviousButton.classList.add( 'hidden' );
            }

            /* if a next photo card exist : show the next button of the lightbox, else : hide the button */
            if ( element.nextElementSibling && element.nextElementSibling.classList.contains( 'photo-card' )) {
                lightboxNextButton.classList.remove( 'hidden' );
            } else if ( !lightboxNextButton.classList.contains( 'hidden' )) {
                lightboxNextButton.classList.add( 'hidden' );
            }

            /* show the lightbox */
            lightboxSection.classList.remove( 'hidden' );

        }

        function navBetweenPhoto( direction ) {

            /* get the lightbox reference */
            let lightboxReference = lightboxSection.getElementsByClassName( 'lightbox__text--reference' )[0].innerText;

            /* compare the photo reference inside the lightbox with every photo card reference */
            for ( let currentPhotoCard = 0; currentPhotoCard < allPhotoCards.length; currentPhotoCard++ ) {
                if ( allPhotoCards[ currentPhotoCard ].getElementsByClassName( 'photo-card__text--reference' )[0].innerText == lightboxReference ) {

                    /* hide the current lightbox img */
                    lightboxSection.getElementsByClassName( 'lightbox__img' )[0].classList.add( 'hidden' )

                    /* if the direction is set to previous : set the previous photo as the lightbox */
                    if ( direction == 'previous' && currentPhotoCard - 1 >= 0 ) {
                        createLightbox( allPhotoCards[ currentPhotoCard - 1 ], 100 ); /* element, delay */
                    }

                    /* if the direction is set to next : set the next photo as the lightbox */
                    if ( direction == 'next' && currentPhotoCard + 1 < allPhotoCards.length ) {
                        createLightbox( allPhotoCards[ currentPhotoCard + 1 ], 100 ); /* element, delay */
                    }

                    /* end the loop early if the condition is true */
                    break;
                }
            }
        }

        function resizeLightboxImg( img ) {
            if ( img.nodeName.toLowerCase() == 'img' ) {

                /* calculate the aspect-ratio of the img */
                let aspectRatio = img.getAttribute( 'width' ) / img.getAttribute( 'height' );

                if ( img.classList.contains( 'lightbox__img--large' )) {
                    /* if the browser width is below 1440px */
                    if ( window.screen.width < 1440 ) {
                        /* set the max width of the img */
                        img.style.maxWidth = ( 0.93 * window.screen.height - 21 ) * aspectRatio + 'px';
                    /* if the browser width is equal or above 1440px */
                    } else if ( window.screen.width >= 1440 ) {
                        /* set the max width of the img */
                        img.style.maxWidth = ( 0.93 * window.screen.height - 21 ) * aspectRatio - 282 + 'px';
                    }
                } else if ( !img.classList.contains( 'lightbox__img--large' )) {
                    /* if css is in mobile version */
                    if ( window.screen.width <= 830 ) {
                        /* set the max height of the img for mobile version */
                        img.style.maxHeight = ( 0.8 * window.screen.width ) / aspectRatio + 'px';
                    } else {
                        /* set the max height of the img for the desktop version */
                        img.style.maxHeight = ( 0.96 * window.screen.width - 282 ) / aspectRatio + 'px';
                    }
                }
            }
        }

        /* when the browser width or height changes */
        observer = new ResizeObserver( entries => {
            for ( entry of entries ) {
                if ( lightboxContainer.getElementsByClassName( 'lightbox__img' )[0] ) {
                    /* change the max size of the lightbox img */
                    resizeLightboxImg( lightboxContainer.getElementsByClassName( 'lightbox__img' )[0] ); /* img */
                }
            }
        })
        observer.observe( lightboxSection )

        /* for each photo card */
        for ( let currentPhotoCard = 0; currentPhotoCard < allPhotoCards.length; currentPhotoCard++ ) {
            /* if the lightbox button on the photo card exist */
            if ( allPhotoCards[ currentPhotoCard ].getElementsByClassName( 'photo-card__lightbox-button' )[0]) {

                /* @type { HTML element } */
                let photoCardButton = allPhotoCards[ currentPhotoCard ].getElementsByClassName( 'photo-card__lightbox-button' )[0];

                /* when clicking the lightbox button of the photo card */
                photoCardButton.addEventListener( 'click', function() {
                    /* set the clicked photo card as the lightbox photo */
                    createLightbox( allPhotoCards[ currentPhotoCard ], 0 ); /* element, delay */
                })

            } else {
                console.warn( 'lightbox.js : can\'t find any photo card with the lightbox button' );
            }
        }

    } else {
        console.warn( 'lightbox.js : can\'t find the lightbox container or the lightbox info' );
    }

    /* @type { HTML element } */
    lightboxPreviousButton = lightboxSection.getElementsByClassName( 'lightbox__button--previous' )[0];
    if ( lightboxPreviousButton ) {
        /* when clicking on the "previous photo" button : set the previous photo as the lightbox */
        lightboxPreviousButton.addEventListener( 'click', function() {
            navBetweenPhoto( 'previous' ); /* direction */
        })
    } else {
        console.warn( 'lightbox.js : can\'t find the lightbox previous button' );
    }

    /* @type { HTML element } */
    lightboxNextButton = lightboxSection.getElementsByClassName( 'lightbox__button--next' )[0];
    if ( lightboxNextButton ) {
        /* when clicking on the "next photo" button : set the next photo as the lightbox */
        lightboxNextButton.addEventListener( 'click', function() {
            navBetweenPhoto( 'next' ); /* direction */
        })
    } else {
        console.warn( 'lightbox.js : can\'t find the lightbox next button' );
    }

    /* @type { HTML element } */
    lightboxCloseButton = lightboxSection.getElementsByClassName( 'lightbox__button--close' )[0];
    if ( lightboxCloseButton ) {
        /* when clicking on the "close lightbox" button : hide the lightbox and remove created elements */
        lightboxCloseButton.addEventListener( 'click', function() {
            if ( !lightboxSection.classList.contains( 'hidden' )) {
                lightboxSection.classList.add( 'hidden' );
                setTimeout( function() {
                    lightboxSection.getElementsByClassName( 'lightbox__img' )[0].remove();
                    lightboxSection.getElementsByClassName( 'lightbox__text--reference' )[0].remove();
                    lightboxSection.getElementsByClassName( 'lightbox__text--category' )[0].remove();
                }, 300)
            }
        })
    } else {
        console.warn( 'lightbox.js : can\'t find the lightbox close button' );
    }

} else {
    console.warn( 'lightbox.js : can\'t find the lightbox section or any photo cards' );
}
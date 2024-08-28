/* @type { HTML element } */
const header = document.getElementsByClassName( 'header' )[0];
const body = document.getElementsByClassName( 'body' )[0];
if ( header && body ) {

    /* @type { HTML element } */
    const openNavMenuButton = document.getElementsByClassName( 'header__nav-menu-button--open' )[0];
    if ( openNavMenuButton ) {

        /* @type { int } */
        let nomberOfClonedHeader = 0;

        /* when clicking on the button to open the nav menu */
        openNavMenuButton.addEventListener( 'click', function() {
            /* prevent multiple header cloning */
            if ( nomberOfClonedHeader == 0 ) {

                /* create a background */
                const mobileHeaderBackground = document.createElement( 'div' );
                mobileHeaderBackground.classList.add( 'header__background', 'width-100', 'hidden' );

                /* clone the header */
                const mobileHeader = header.cloneNode( true );
                mobileHeader.classList.add( 'header--mobile', 'hidden' );

                /* place the cloned header and the background inside the body */
                body.append( mobileHeaderBackground, mobileHeader );

                /* change the CSS of the nav menu */
                mobileHeader.getElementsByClassName( 'header__menu' )[0].classList.add( 'width-100', 'margin-0' );

                /* @type { HTML element } */
                const closeNavMenuButton = mobileHeader.getElementsByClassName( 'header__nav-menu-button--open' )[0];
                if ( closeNavMenuButton ) {

                    /* change the "open nav menu button" to "close nav menu button" */
                    closeNavMenuButton.classList.replace( 'header__nav-menu-button--open', 'header__nav-menu-button--close' );
                    closeNavMenuButton.setAttribute( 'title', 'Fermer le menu de navigation' );

                    /* @type { HTML element } */
                    const closeNavMenuButtonImg = closeNavMenuButton.getElementsByTagName( 'img' )[0];
                    if ( closeNavMenuButtonImg ) {
                        /* change the img of the nav menu button */
                        closeNavMenuButtonImg.setAttribute( 'src', closeNavMenuButtonImg.getAttribute( 'src' ).replace( 'open', 'close' ));
                        closeNavMenuButtonImg.setAttribute( 'alt', 'Fermer le menu de navigation' );
                    } else {
                        console.warn( 'mobile-nav-menu.js : can\'t find the cloned button img inside the cloned header for the mobile version' );
                    }

                    function closeMobileNavMenu() {

                        /* "close" the nav menu */
                        openNavMenuButton.setAttribute( 'aria-expanded', 'false' );
                        closeNavMenuButton.setAttribute( 'aria-expanded', 'false' );

                        /* allow fade animation to work */
                        mobileHeaderBackground.classList.add( 'hidden' );
                        mobileHeader.classList.add( 'hidden' );

                        /* remove the cloned header and background */
                        setTimeout( function() {
                            mobileHeaderBackground.remove();
                            mobileHeader.remove();
                        }, 300 )

                        /* prevent multiple header cloning */
                        nomberOfClonedHeader--;

                    }

                    /* when clicking on the button to close the nav menu : close the mobile nav menu */
                    closeNavMenuButton.addEventListener( 'click', closeMobileNavMenu );

                    /* @type { HTML element } */
                    const mobileContactButton = mobileHeader.getElementsByClassName( 'header__contact-button' )[0];
                    if ( mobileContactButton ) {

                        /* @type { HTML element } */
                        const contactSection = document.getElementsByClassName( 'contact' )[0];
                        if ( mobileContactButton ) {
                            /* when clicking on the contact button inside the mobile nav menu */
                            mobileContactButton.addEventListener( 'click', function() {

                                /* close the mobile nav menu */
                                closeMobileNavMenu();

                                /* open the contact form */
                                setTimeout( function() {
                                    contactSection.classList.remove( 'hidden' );
                                }, 1 )

                            })
                        } else {
                            console.warn( 'mobile-nav-menu.js : can\'t find the contact section' );
                        }
                        
                    } else {
                        console.warn( 'mobile-nav-menu.js : can\'t find the contact button inside the mobile nav menu' );
                    }

                    /* "open" the nav menu */
                    openNavMenuButton.setAttribute( 'aria-expanded', 'true' );
                    closeNavMenuButton.setAttribute( 'aria-expanded', 'true' );

                    /* allow fade animation to work */
                    setTimeout( function() {
                        mobileHeaderBackground.classList.remove( 'hidden' );
                        mobileHeader.classList.remove( 'hidden' );
                    }, 1 )

                    /* prevent multiple header cloning */
                    nomberOfClonedHeader++;

                } else {
                    console.warn( 'mobile-nav-menu.js : can\'t find the cloned button inside the cloned header for the mobile version' );
                }

            }
        });

    } else {
        console.warn( 'mobile-nav-menu.js : can\'t find the button to open the mobile nav menu' );
    }

} else {
    console.warn( 'mobile-nav-menu.js : can\'t find the header or body' );
}
/* @type { HTML element } */
const category = document.getElementById( 'categorySelect' );
const format = document.getElementById( 'formatSelect' );
const order = document.getElementById( 'orderSelect' );
if ( category && format && order ) {

    /* @type { HTML element } */
    const photoBlock = document.getElementsByClassName( 'photo-card-list' )[0];
    if ( photoBlock ) {
    
        /* @type { int } */
        let pageDisplayed = 1;

        function ajaxRequest( insertAction ) {

            /* get data values to send */
            const ajaxURL = loadMoreButton.dataset.ajaxurl;
            let data = {
                action : loadMoreButton.dataset.action,
                nonce : loadMoreButton.dataset.nonce,
                category : category.selectedOptions[0].value,
                format : format.selectedOptions[0].value,
                order : order.selectedOptions[0].value,
                paged : pageDisplayed,
            }

            /* launch an ajax request with the data */
            fetch( ajaxURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache',
                },
                body: new URLSearchParams( data )
            })

            /* convert response received to JSON */
            .then( response => response.json() )

            /* handle response received */
            .then( response => {
                /* if the ajax request was sucessful */
                if ( response.success ) {

                    if ( insertAction == 'add' ) {
                        /* add the content of the response to the HTML */
                        photoBlock.insertAdjacentHTML( 'beforeend', response.data );
                    } else if ( insertAction == 'replace' ) {
                        /* replace the photo list with the content of the response */
                        photoBlock.innerHTML = response.data ;
                    }

                    /* reload the lightbox JS for the new photo cards */
                    if ( document.getElementById( 'lightbox-js' )) {
                        lightboxOld = document.getElementById( 'lightbox-js' );
                        lightboxNew = document.createElement( 'script' );
                        lightboxNew.src = lightboxOld.src;
                        lightboxNew.id = lightboxOld.id;
                        lightboxNew.type = lightboxOld.type;
                        lightboxOld.remove();
                        document.getElementsByTagName( 'footer' )[0].append( lightboxNew );
                    }

                    /* if this is the last page of content */
                    if ( response.data.includes( 'last-page' ) && !loadMoreButton.classList.contains( 'hidden' )) {
                        /* hide the "load more" button */
                        loadMoreButton.classList.add( 'hidden' );
                    /* if this is NOT the last page of content */
                    } else if ( !response.data.includes( 'last-page' )) {
                        /* show the "load more" button */
                        loadMoreButton.classList.remove( 'hidden' );
                    }

                } else {
                    /* display the response error message */
                    alert( response.data );
                }
            })

        }

        Array( category, format, order ).forEach( function( element ) {
            /* when changing the value of the select */
            element.addEventListener( 'change', function() {

                /* reset the "pageDisplayed" variable to 1 */
                pageDisplayed = 1;

                /* execute "ajaxRequest" function */
                ajaxRequest( 'replace' );
    
            })
        })

        /* @type { HTML element } */
        const loadMoreButton = document.getElementsByClassName( 'home-photo-catalog__more-button' )[0];
        if ( loadMoreButton ) {
            /* when cliking on the "load more" button */
            loadMoreButton.addEventListener( 'click', function() {

                /* increase the page of posts to display */
                pageDisplayed++;

                /* execute "ajaxRequest" function */
                ajaxRequest( 'add' );

            })
        } else {
            console.warn( 'custom-post-type.js : can\'t find the "load more" button' );
        }

    } else {
        console.warn( 'custom-post-type.js : can\'t find the element with class "photoBlock"' );
    }

} else {
    console.warn( 'custom-post-type.js : can\'t find all 3 "filter select" elements' );
}
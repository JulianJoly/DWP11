( function($) {

    /* @type {HTMLElement} */
    category = $( 'select[id="category"]' )[0];
    format = $( 'select[id="format"]' )[0];
    order = $( 'select[id="dateOrder"]' )[0];

    /* when the DOM is fully loaded */
    $( document ).ready( function() {

        /* @type {number} */
        let pageDisplayed = 1;

        /* when cliking on "load more" button */
        $( '.photoList--button' ).click( function() {

            /* load 1 more page of posts */
            pageDisplayed ++;

            /* @type {URL} */
            const ajaxURL = $(this).data( 'ajaxurl' );

            /* @type {array} */
            const data = {
                action:   $(this).data( 'action' ),
                nonce:    $(this).data( 'nonce' ),
                category: category.selectedOptions[0].value,
                format:   format.selectedOptions[0].value,
                order:    order.selectedOptions[0].value,
                paged:    pageDisplayed
            };

            /* launch an ajax request */
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

                    /* add the content of the ajax request to the HTML */
                    $( '.photoBlock' ).append( response.data );

                    /* if this is the last page of content */
                    if ( response.data.includes( 'last-page' )) {

                        /* hide the "load more" button */
                        $( '.photoList--button' ).hide();
                    }
                } else {

                    /* notify the user of the error */
                    alert( response.data );
                }
            });
        });

        $( Array( category, format, order )).on( 'change', function() {

            /* @type {URL} */
            const ajaxURL = $(this).data( 'ajaxurl' );

            /* @type {array} */
            const data = {
                action:   $(this).data( 'action' ),
                nonce:    $(this).data( 'nonce' ),
                category: category.selectedOptions[0].value,
                format:   format.selectedOptions[0].value,
                order:    order.selectedOptions[0].value,
                paged:    1
            };

            /* reset variable to 1 */
            pageDisplayed = 1;

            /* launch an ajax request */
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

                    /* add the content of the ajax request to the HTML */
                    $( '.photoBlock' )[0].innerHTML = response.data;

                    /* if this is the last page of content */
                    if ( response.data.includes( 'last-page' )) {

                        /* hide the "load more" button */
                        $( '.photoList--button' ).hide();
                    } else {

                        /* show the "load more" button */
                        $( '.photoList--button' ).show();
                    }
                } else {

                    /* notify the user of the error */
                    alert( response.data );
                }
            });
        });
    });
})( jQuery );
'use-strict'

document.addEventListener( 'DOMContentLoaded', function() {
    let formData = new FormData();
    formData.append( 'action', 'request_photos' );
    
    fetch( customPostType_js.ajax_url, {
        method: 'POST',
        body: formData,
    })

    .then( function( response ) {
        if ( !response.ok ) {
            throw new Error( 'Network response error.' );
        }
        return response.json();
    })

    .then( function( data ) {
        /* @type {URL} */
        const currentURL = window.location.href

        /* @type {HTMLElement} */
        const customPostContainer = document.querySelector( '.photo' );

        if ( customPostContainer ) {
            /* @type {HTMLElement} */
            const moreContainer = document.querySelector( '.more__container' );

            data.posts.forEach( function( post ) {
                if ( currentURL.includes( post.post_name ) ) {
                    console.log(post);
                }
            });
        }
    })

    .catch( function( error ) {
        console.error( 'There was a problem with the fetch operation: ', error );
    });
});
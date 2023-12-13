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
        console.log(currentURL);

        /* @type {HTMLElement} */
        const customPostContainer = document.querySelector( '.single' );

        if ( customPostContainer ) {
            /* @type {HTMLElement} */
            const infoContainer = document.querySelector( '.single__info' );

            data.posts.forEach( function( post ) {
                if ( currentURL.includes( post.post_name ) ) {
                    console.log(post);
                    /* infoContainer.insertAdjacentHTML( 'beforeend', '<h2 class="single__info--title">' + post.post_title + '</h2>' ); */
                    /* infoContainer.insertAdjacentHTML( 'beforeend', '<p class="single__info--text">' + post.thumbnail + '</p>' ); */
                    /* customPostContainer.insertAdjacentHTML( 'beforeend', '<img class="single--img" alt="" src="' + post.hero_image + '">' ); */
                }
            });
        }
    })

    .catch( function( error ) {
        console.error( 'There was a problem with the fetch operation: ', error );
    });
});
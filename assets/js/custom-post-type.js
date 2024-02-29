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
        console.log(data.posts);
        console.log(customPostType_js.ajax_url);
    })

    .catch( function( error ) {
        console.error( 'There was a problem with the fetch operation: ', error );
    });
});
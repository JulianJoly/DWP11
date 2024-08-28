/* @type { HTML element } */
const selectContainer = document.getElementsByClassName( 'home-photo-catalog__filter-container' )[0];
if ( selectContainer ) {

    /* @type { HTML collection } */
    const allSelectElements = selectContainer.getElementsByTagName( 'select' );
    if ( allSelectElements ) {

        /* for each select elements */
        for ( let selectNumber = 0; selectNumber < allSelectElements.length; selectNumber++ ) {

            /* @type { HTML element } */
            let currentSelect = allSelectElements[ selectNumber ];

            /* wrap the select inside a new div */
            let wrapper = document.createElement( 'div' );
            wrapper.setAttribute( 'class', 'custom-select ');
            currentSelect.parentNode.insertBefore( wrapper, currentSelect );
            wrapper.appendChild( currentSelect );

            /* create a new div for the selector */
            let customSelect = document.createElement( 'div' );
            customSelect.setAttribute( 'class', 'custom-select__selector pointer uppercase' );
            customSelect.setAttribute( 'aria-expanded', 'false' );
            customSelect.innerHTML = currentSelect.options[ currentSelect.selectedIndex ].innerHTML;
            wrapper.appendChild( customSelect );

            /* create a new div for the list of options */
            let optionList = document.createElement( 'div' );
            optionList.setAttribute( 'class', 'custom-select__option-list pointer hidden' );
            wrapper.appendChild( optionList );

            /* for each options of the select */
            for ( let optionNumber = 0; optionNumber < currentSelect.length; optionNumber++ ) {

                /* create a new div for the option */
                let currentOption = document.createElement( 'div' );
                currentOption.setAttribute( 'class', 'custom-select__option' );
                currentOption.innerHTML = currentSelect.options[ optionNumber ].innerHTML;

                /* if the option is the first : add a class to show selected state */
                if ( optionNumber == 0 ) {
                    currentOption.classList.add( 'custom-select__option--selected' );
                }

                /* if the option is the last : add a class for the bottom border radius */
                if ( optionNumber == currentSelect.length-1 ) {
                    currentOption.classList.add( 'custom-select__option--last' );
                }

                /* when clicking on the custom option */
                currentOption.addEventListener( 'click', function() {
                    /* set the clicked option as the selected option */
                    for ( let i = 0; i < currentSelect.length; i++ ) {
                        if ( currentOption.innerHTML == currentSelect.options[i].innerHTML ) {
                            currentSelect.selectedIndex = i;
                            customSelect.innerHTML = currentOption.innerHTML;
                            currentOption.classList.add( 'custom-select__option--selected' );
                            closeAllOptionLists( null, null ); /* exceptionOptionList, exceptionCustomSelect */
                            currentSelect.dispatchEvent( new Event( 'change' ));
                            break;
                        }
                    }
                })

                /* insert the custom option inside the custom option list */
                optionList.appendChild( currentOption );

            }

            /* when clicking on the custom select : close all options lists, show/hide the option list of the clicked custom select, change the arrow of the clicked custom select */
            customSelect.addEventListener( 'click', function() {
                closeAllOptionLists( optionList, customSelect ); /* exceptionOptionList, exceptionCustomSelect */
                if ( customSelect.getAttribute( 'aria-expanded' ) == 'true' ) {
                    customSelect.setAttribute( 'aria-expanded', 'false' );
                } else {
                    customSelect.setAttribute( 'aria-expanded', 'true' );
                }
                if ( optionList.classList.contains( 'hidden' )) {
                    optionList.classList.remove( 'hidden' );
                } else {
                    setTimeout( function() {
                        optionList.classList.add( 'hidden' );
                    }, 300 )
                }
            })

            /* hide the non-custom select */
            currentSelect.classList.add( 'hidden' );

        }

        function closeAllOptionLists( exceptionOptionList, exceptionCustomSelect ) {

            /* @type { HTML collection } */
            const allCustomSelects = selectContainer.getElementsByClassName( 'custom-select__selector' );
            /* for each custom select */
            for ( let currentCustomSelect = 0; currentCustomSelect < allCustomSelects.length; currentCustomSelect++ ) {

                /* if the custom select is expanded : close it */
                if ( allCustomSelects[ currentCustomSelect ].getAttribute( 'aria-expanded' ) == 'true' && allCustomSelects[ currentCustomSelect ] !== exceptionCustomSelect ) {
                    allCustomSelects[ currentCustomSelect ].setAttribute( 'aria-expanded', 'false' );
                }

                /* @type { HTML collection } */
                let allCustomOptionSelected = allCustomSelects[ currentCustomSelect ].parentNode.getElementsByClassName( 'custom-select__option--selected' );

                if ( allCustomOptionSelected ) {
                    /* for each selected custom option inside the custom select : if the selected custom option is not the actual selected option : remove the "selected" class */
                    for ( let currentCustomOptionSelected = 0; currentCustomOptionSelected < allCustomOptionSelected.length; currentCustomOptionSelected++ ) {
                        if ( allCustomOptionSelected[ currentCustomOptionSelected ].innerHTML != allCustomSelects[ currentCustomSelect ].innerHTML ) {
                            allCustomOptionSelected[ currentCustomOptionSelected ].classList.remove( 'custom-select__option--selected' );
                        }
                    }
                }
            }

            /* @type { HTML collection } */
            const allOptionLists = selectContainer.getElementsByClassName( 'custom-select__option-list' );
            /* for each options list : if the options list is not hidden : hide it */
            for ( let currentOptionList = 0; currentOptionList < allOptionLists.length; currentOptionList++ ) {
                if ( !allOptionLists[ currentOptionList ].classList.contains( 'hidden' ) && allOptionLists[ currentOptionList ] !== exceptionOptionList ) {
                    setTimeout( function() {
                        allOptionLists[ currentOptionList ].classList.add( 'hidden' );
                    }, 300 )
                }
            }
        }

        /* @type { HTML collection } */
        const allCustomSelectElements = selectContainer.getElementsByClassName( 'custom-select' );
        if ( allCustomSelectElements ) {
            /* when clicking outside any custom select : close all options lists */
            document.addEventListener( 'click', function( event ) {
                if ( !allCustomSelectElements[0].contains( event.target ) && !allCustomSelectElements[1].contains( event.target ) && !allCustomSelectElements[2].contains( event.target )) {
                    closeAllOptionLists();
                }
            })
        }

    } else {
        console.warn( 'JS error: can\'t find any select inside the container for the photo list filters' );
    }

} else {
    console.warn( 'JS error: can\'t find the container for the photo list filters' );
}
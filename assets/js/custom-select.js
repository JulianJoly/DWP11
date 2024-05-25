'use-strict'

/* @type { HTML element } */
const selectContainer = document.getElementsByClassName( 'photoList__filters' )[0];

if ( selectContainer ) {

    /* @type { HTML collection } */
    const allSelectElements = selectContainer.getElementsByTagName( 'select' );

    if ( allSelectElements ) {

        /* for each select HTML element */
        for ( let selectNumber = 0; selectNumber < allSelectElements.length; selectNumber++ ) {

            /* @type { HTML element } */
            let currentSelect = allSelectElements[ selectNumber ];

            /* wrap the select HTML element inside a new div HTML element */
            let wrapper = document.createElement( 'div' );
            wrapper.setAttribute( 'class', 'customSelect');
            currentSelect.parentNode.insertBefore( wrapper, currentSelect );
            wrapper.appendChild( currentSelect );

            /* create a new div HTML element for the custom select */
            let customSelect = document.createElement( 'div' );
            customSelect.setAttribute( 'class', 'customSelect__selecter pointer uppercase' );
            customSelect.innerHTML = currentSelect.options[ currentSelect.selectedIndex ].innerHTML;
            wrapper.appendChild( customSelect );

            /* create a new div HTML element for the list of option */
            let optionList = document.createElement( 'div' );
            optionList.setAttribute( 'class', 'customSelect__optionList pointer hidden' );
            wrapper.appendChild( optionList );

            /* for each option of the select */
            for ( let optionNumber = 0; optionNumber < currentSelect.length; optionNumber++ ) {

                /* create a new div HTML element */
                let currentOption = document.createElement( 'div' );
                currentOption.setAttribute( 'class', 'customOption' );
                currentOption.innerHTML = currentSelect.options[ optionNumber ].innerHTML;

                /* if the option is the first : add a class to show selected state */
                if ( optionNumber == 0 ) {
                    currentOption.classList.add( 'customOption--selected' );
                }

                /* if the option is the last : add a class for the bottom border radius */
                if ( optionNumber == currentSelect.length-1 ) {
                    currentOption.classList.add( 'customOption--last' );
                }

                /* create an event on click */
                currentOption.addEventListener( 'click', function() {

                    /* set the clicked option as the selected option */
                    for ( let i = 0; i < currentSelect.length; i++ ) {
                        if ( currentSelect.options[i].innerHTML == currentOption.innerHTML ) {
                            currentSelect.selectedIndex = i;
                            customSelect.innerHTML = currentOption.innerHTML;
                            currentOption.classList.add( 'customOption--selected' );
                            currentSelect.dispatchEvent( new Event( 'change' ));
                            break;
                        }
                    }
                })

                /* put the custom option inside the custom option list */
                optionList.appendChild( currentOption );
            }

            /* when clicking on the custom select : close all option list, show/hide the option list of the current custom select, change the arrow of the current custom select */
            customSelect.addEventListener( 'click', function( event ) {
                event.stopPropagation();
                closeAllOptionLists( optionList, customSelect );
                optionList.classList.toggle( 'hidden' );
                if ( customSelect.getAttribute( 'aria-expanded' ) == 'true' ) {
                    customSelect.setAttribute( 'aria-expanded', 'false' );
                } else {
                    customSelect.setAttribute( 'aria-expanded', 'true' );
                }
            })

            /* hide the base select HTML element */
            currentSelect.classList.add( 'hidden' );
        }

        /* function : close all option lists */
        function closeAllOptionLists( exceptionOptionList, exceptionCustomSelect ) {

            /* @type { HTML collection } */
            const allOptionLists = selectContainer.getElementsByClassName( 'customSelect__optionList' );
            const allCustomSelects = selectContainer.getElementsByClassName( 'customSelect__selecter' );

            /* for each option list : if the option list is not hidden : hide it */
            for ( let currentOptionList = 0; currentOptionList < allOptionLists.length; currentOptionList++ ) {
                if ( !allOptionLists[ currentOptionList ].classList.contains( 'hidden' ) && allOptionLists[ currentOptionList ] !== exceptionOptionList ) {
                    allOptionLists[ currentOptionList ].classList.add( 'hidden' );
                }
            }

            /* for each custom select */
            for ( let currentCustomSelect = 0; currentCustomSelect < allCustomSelects.length; currentCustomSelect++ ) {

                /* if the custom select is expanded : hide it */
                if ( allCustomSelects[ currentCustomSelect ].getAttribute( 'aria-expanded' ) == 'true' && allCustomSelects[ currentCustomSelect ] !== exceptionCustomSelect ) {
                    allCustomSelects[ currentCustomSelect ].setAttribute( 'aria-expanded', 'false' );
                }

                /* @type { HTML collection } */
                let allCustomOptionSelected = allCustomSelects[ currentCustomSelect ].parentNode.getElementsByClassName( 'customOption--selected' );

                if ( allCustomOptionSelected ) {
                    /* for each selected custom option inside the custom select : if the selected custom option is not the actual selected option : remove the "selected" class */
                    for ( let currentCustomOptionSelected = 0; currentCustomOptionSelected < allCustomOptionSelected.length; currentCustomOptionSelected++ ) {
                        if ( allCustomOptionSelected[ currentCustomOptionSelected ].innerHTML != allCustomSelects[ currentCustomSelect ].innerHTML ) {
                            allCustomOptionSelected[ currentCustomOptionSelected ].classList.remove( 'customOption--selected' );
                        }
                    }
                }
            }
        }

        /* when clicking anywhere outside any custom select : close all option list */
        document.addEventListener( 'click', closeAllOptionLists );
    }
    else {
        console.error( 'JS error: can\'t find any "select" HTML element' );
    }
}
else {
    console.error( 'JS error: can\'t find HTML element with class "photoList__filters"' );
}
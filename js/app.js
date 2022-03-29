/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

 document.addEventListener('DOMContentLoaded', function () {

  const sectionMenuList = document.querySelectorAll('section[data-parent=""]');
  const allSectionsOfDocument = document.querySelectorAll('main section');
  const menuReferenceContainer = document.querySelector('#navbar__list');
  const adjacentSections = document.querySelectorAll('section:not([data-parent=""])');
  const pageTitle = document.querySelectorAll('.main__hero h1')[0];
  pageTitle.textContent = 'Main menu';
  let map = new Map();

  let tempArray = [];

  console.log('the DOM is ready to be interacted with!');
  console.log(sectionMenuList);
  /** build amp where keys are Ids oftop menuelemts where as values are array objects for submenu elements  */
  for (const section of sectionMenuList) {
    tempArray = [];
    for (const adj of adjacentSections) {
      if (adj.dataset.parent === section.id)
        tempArray.push(adj.id);
    }
    map.set(section.id, tempArray);
  }
  /** generate menu */
  menuReferenceContainer.innerHTML = generateMenu(map);

  function activateRect(rect) {
    document.querySelector(`#${rect.getAttribute('id')}`).classList.add('your-active-class');
  }

  function deactivateRect(rect) {
    document.querySelector(`#${rect.getAttribute('id')}`).classList.remove('your-active-class');
  }
  // event listener to the dom itself so
  document.addEventListener('scroll', function () {
    console.log(allSectionsOfDocument);
    allSectionsOfDocument.forEach((el) => {
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
      // DOMRect object providing information about the size of an element and its position relative to the viewport.
      // viewport : A viewport represents a polygonal (normally rectangular) area in computer graphics that is currently being viewed.
      // https://gomakethings.com/how-to-get-the-width-and-height-of-the-viewport-with-vanilla-js/#:~:text=You%20can%20use%20the%20window,let%20viewportHeight%20%3D%20window.
      let viewportHeight = window.innerHeight;
      let viewportWidth = window.innerWidth;

      let rectInfos = el.getBoundingClientRect();
      if (rectInfos.top <= viewportHeight * 0.2 && rectInfos.bottom >= viewportHeight * 0.3) {
        activateRect(el);
      } else {
        deactivateRect(el);
      }

    });
  });

});
/**
 * Define Global Variables
 * 
 */


/**
 * End Global Variables
 * Start Helper Functions
 * 
 */
// function togenerate menu
function generateMenu(tempMap) {
  let ulMenuList = '';
  // iterate over the map
  tempMap.forEach((value, key, map) => {
    /** every anchor element will have an id formatted like {link-idTop-idSub} 
     * for top level elements and as there is no submenu yet slected we use 0 as submenu Id in this specificuse case.
     */
    ulMenuList = ulMenuList + `<li> <a class="menu__link" href="#${key}" id="link-${key}-0" >${key}</a>`;
    /** build adjacent menu */
    let adjDiv = '<div class="subnav"><div class="subnav-content">';
    for (const adj of value) {
      adjDiv += `<a class="menu__link" id="link-${key}-${adj}"+ href="#${adj}">${adj}</a>`;
    }
    adjDiv += '</div></div></li>'
    ulMenuList += adjDiv;
  });
  return ulMenuList;
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// clear the previous menu selction
function clearPreviousSelection() {
  const all__menu__links = document.querySelectorAll('a.menu__link');
  for (let link of all__menu__links) {
    link.classList.remove('clicked-class');
  }
}

// Add class 'clicked-class' to sectied anchor elemnts when  top or submenu are clicked

document.querySelector('#navbar__list').addEventListener('click', function (evt) {
  clearPreviousSelection();
  const partsId = evt.target.id.split('-', 3);
  // check if clicked item is an anchor element and is a parent anchor element was selected
  if (evt.target.nodeName === 'A' && partsId[2] == 0) { // check if we clicked top level link
    // add the clicked-class class to the to menu section

    document.querySelector(`#${evt.target.id}`).classList.add('clicked-class');
  }
  // check if clicked item is an anchor element and is a child anchor element was selected
  if (evt.target.nodeName === 'A' && partsId[2] != '0') { // check if we clicked top level link
    // add the active class to the section

    document.querySelector(`#${evt.target.id}`).classList.add('clicked-class');
    document.querySelector(`#link-${partsId[1]}-0`).classList.add('clicked-class');
  }
});
// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 

// Scroll to section on link click

// Set sections as active
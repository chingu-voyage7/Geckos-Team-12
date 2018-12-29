window.onload = function() {
  checkForBackground();
  toggleAddListLinks();
};

function setEventListeners() {
  document.getElementById('sample-card').addEventListener('click', (event) => { cardOptions.showOverlay(event); });
  document.getElementById('sample-pen').addEventListener('click', (event) => {
    event.stopPropagation();
    cardOptions.showCardOptions(event); });
}

setEventListeners();
// *************** SLIDEOUT MENU SCRIPT ***************
//Set background + background tile in menu to previous background setting
function checkForBackground() {
  if (localStorage.getItem('background') !== null) {
    let background = localStorage.getItem('background');
    menu.changeBackground(background);
    menu.changeBackgroundIcon(background);
  }
}

const headers = {
  'change-background': 'Change Background',
  'colors': 'Colors',
  'photos': 'Photos',
  'filter-cards': 'Filter Cards',
  'copy-board': 'Copy Board',
  'settings': 'Settings'
};

const backgroundImages = [
  'assets/eberhard-grossgasteiger-1036384-unsplash.jpg',
  'assets/ernest-porzi-19106-unsplash.jpg',
  'assets/frank-mckenna-140054-unsplash.jpg',
  'assets/hugues-de-buyer-mimeure-335733-unsplash.jpg'
];

let menu = {
  // Toggle menu from view (slide into or out of view)
  toggleMenuContainer: function() {
    document.getElementById('menu-container').classList.toggle("element-invisible");
    document.getElementById('show-menu-link').classList.toggle("element-invisible");
  },
  // Show or hide main menu
  toggleMainMenu: function() {
    //hide or show main menu
    document.getElementById('main-menu').classList.toggle("element-invisible");
    document.getElementById('main-menu-header').classList.toggle("element-invisible");
  },
  //hide all pages (before showing selected page)
  hideAllPages: function() {
    for (let key in headers) {
      if (document.getElementById(key).classList.contains('element-invisible') !== true) {
      document.getElementById(key).classList.toggle('element-invisible');
      }
    }
  },
  // Show or hide a specific page (page id passed as argument when function called from HTML)
  togglePage: function(id) {
    //hide main menu and all pages
    menu.toggleMainMenu();
    menu.hideAllPages();
    //hide or show header for current page
    document.getElementById('menu-header').classList.toggle("element-invisible");
    //set header text to match current page
    document.getElementById('page-header').innerHTML = headers[id];
    //show selected page
    document.getElementById(id).classList.toggle("element-invisible");
  },
  // Change background color
  changeBackground: function(background) {
    localStorage.setItem('background', background);
    if (background.startsWith('rgb')) {
      document.body.style.background = background;
    }
    else {
      document.body.style.background = "url("+ background +")";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
    }
    menu.changeBackgroundIcon(background);
  },
  changeBackgroundIcon: function(background) {
    let backgroundIcon = document.getElementById('background-menu-icon');
    if (background.startsWith('rgb')) {
      backgroundIcon.style.background = background;
    }
    else {
      backgroundIcon.style.background = "url("+ background +")";
    }
  }
};

// *************** ADD LISTS ***************

// add new list submit eventlistener
document.getElementById("add-list-form").addEventListener("submit", addList);

function addList(e) {
  e.preventDefault();
  const input = document.getElementById("list-name");
  const name = input.value;
  input.value = '';
  if ('' == name) {
    return;
  }

  const list = document.createElement('div');
  list.setAttribute('class', 'list');
  list.innerHTML =
    `<div class="list-heading" >
      <h3 contenteditable="true">` + name + `</h3>
    <div class= "ellipsis"><a href="#">&#8230;</a></div>
    </div>
      <div>
        <form class="add-item-form">
          <textarea placeholder="Enter a title for this card..."></textarea>
          <div>
          <input type="submit" value="Add Card">
          <input type="button" value="&#88;">
          <div class= "ellipsis"><a href="#">&#8230;</a></div>
          </div>
        </form>
      </div>`;

  document.getElementById("list-container").appendChild(list);
}

// add new item submit eventlistener
document.addEventListener('submit', function(e) {
  if (e.target.matches('.add-item-form')) {
    e.preventDefault();
    const textarea = e.target.getElementsByTagName('textarea')[0];
    const text = textarea.value;
    textarea.value = '';
    if ('' == text) {
      return;
    }
    //create card
    const cardItem = document.createElement('p');
    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    //create pen icon
    const pen = document.createElement('a');
    pen.innerHTML = '<i class="fas fa-pen"></i>';
    pen.addEventListener('click', function(){ cardOptions.showCardOptions(event);});
    cardItem.innerHTML = text;
    card.appendChild(cardItem)
    card.appendChild(pen);
    e.target.parentElement.prepend(card);
  }
});

let spans = document.getElementsByClassName("placeholder");
//toggle between 'add a list' and 'add another list' links
function toggleAddListLinks() {
   spans[1].style.display='none';
   document.forms[0].style.display='none';
};

let clicked = 0;
//toggle between links and 'add-list-form'
function toggleDiv(divId1, divId2){
  clicked++;
  if(document.getElementById( divId1 ).style.display == 'block'){
    document.getElementById( divId1 ).style.display = 'none';
    document.getElementById( divId2 ).style.display = 'block';
  }else{
    document.getElementById( divId2 ).style.display = 'none';
    document.getElementById( divId1 ).style.display = 'block'
  }if(clicked > 0) {
    spans[0].style.display='none';
    spans[1].style.display='block';
  }
}
//removes the inputField and buttons from the document and shows the 'addAnotherCardLink' after it has been clicked.
function removeCard(inputField) {
  var element = document.getElementById("inputField");
  element.parentNode.removeChild(element);
  document.getElementById("addAnotherCardLink").style.display = "block";
}

// *************** CARD OPTIONS (small + modal) ***************
// declare array for label colors (cardOptions.changeLabel())
let labelArr = [];

let cardOptions = {
  showOverlay: function() {
    document.getElementById('overlay-container').classList.toggle('element-invisible');
    document.body.classList.add('ovleray-opacity');
  },
  showCardOptions: function(event) {
    document.getElementById('card-options-container').classList.toggle('element-invisible');
  },
// *************** SHOW X OPTION ***************
  showLabels: function() {
    document.getElementById('labels-container').classList.toggle('element-invisible');
  },

// *************** ADD MEMBER OPTION ***************
// *************** ADD/CHANGE LABEL ***************
  changeLabel: function(labelColor) {
    // define a sample card until card ids have been create
    // next step: identify card that was clicked, and run function on that card
    let card = document.getElementById('sample-card');
      //check if color is already displayed (i.e. in the array)
      if (labelArr.includes(labelColor) === true) {
        card.removeChild(document.getElementById(labelColor));
        labelArr.splice(labelArr.indexOf(labelColor),1);
      }
      // if color not already displayed, dispaly it
      else {
        labelArr.push(labelColor);
        //create new HTML element to display color label
        let label = document.createElement('div');
        label.classList.add('card-label-tile');
        label.id = labelColor;
        label.style.backgroundColor = labelColor;
        // add new element (color label) to card
        card.appendChild(label);
      }
  },

// *************** ADD CHECKLIST OPTION ***************
  addChecklist: function() {

  },
// *************** ADD DUE DATE OPTION ***************
  addDueDate: function() {

  }
}

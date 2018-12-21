window.onload = function() {
  checkForBackground();
};
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
    // if (document.getElementById(headers.colors).classList.contains('element-invisible') === true || document.getElementById(headers.photos).classList.contains('element-invisible') === true) {
    // }
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

// *************** ADD LIST **************

// Creates a title textarea
function displayTitle() {
  var listTitle = document.getElementById("listTitle");

  var titleTextArea = document.createElement("textarea");
  var listTitleExist = true;
  if (titleTextArea === null) {
    titleTextArea = document.createElement("textarea");
    titleTextArea.id = "listTitleArea";
  // adds the newly created element to the DOM
    listTitleExist = false;
  }
  titleTextArea.setAttribute("type", "text");
  titleTextArea.setAttribute("id", "textAreaTitle2");
  titleTextArea.setAttribute("overflow", "break-word");
  titleTextArea.setAttribute("placeholder", "Enter list title...");
  listTitle.appendChild(titleTextArea);
  var titleTaker = document.getElementById("textAreaTitle").value;
  titleTextArea.innerHTML = titleTaker;
  document.getElementById("textAreaTitle").value = "";
  }

function displayListInputField() {
  //checks to see if there is a div#listTextArea in our DOM (null means we do not have div#inputField), and creates it if its not there
  var textAreaHolder = document.getElementById("listTextArea");
  var listTextAreaExist = true;
  if (textAreaHolder === null) {
    textAreaHolder = document.createElement("listTextArea");
    textAreaHolder.id = "listTextArea";
    listTextAreaExist = false;
  }

  // Creates a textarea for adding lists
  var textAreaElement = document.createElement("textarea");
  textAreaElement.setAttribute("type", "text");
  textAreaElement.setAttribute("id", "textAreaTitle");
  textAreaElement.setAttribute("overflow", "break-word");
  textAreaElement.setAttribute("placeholder", "Enter list title...");
  textAreaHolder.appendChild(textAreaElement);

  // Creates a "Add a List" button. It adds the textarea when clicked
  var button = document.createElement("button");
  button.innerHTML = "Add List";
  button.setAttribute("id", "createNewList");
  textAreaHolder.appendChild(button);

  button.addEventListener("click", function() {
    var titleTaker = document.getElementById("textAreaTitle").value;
    if(titleTaker == ""){
      titleTaker = false;
    }else{
      showTitleAndCardSection(); //Displays the List Container
      displayTitle(); // Adds a title
      hideButton('textAreaTitle');//hide Textarea
      hideButton('createNewList');//hide 'Add a List' button
      hideButton('createNewCloseBtn');//hide close 'x' button
      // createNewListTextArea();
      // duplicate();
    }
  });

  // Creates a delete "x" button and set attributes to it
  var closeButton = document.createElement("closeButton");
  closeButton.innerHTML = '<i class="fas fa-times"></i>';
  closeButton.setAttribute("id", "createNewCloseBtn");
  textAreaHolder.appendChild(closeButton);

  //Checks to see if a div#listTextArea exists and creates one if it does not exist and appends it to its parentNode
  if (!listTextAreaExist) {
    document.querySelector(".listTextAreaContainer").appendChild(textAreaHolder);
  }
  // adds an event listener which will call the removeList() function to delete the div#listTextAreaExist when clicked
  closeButton.addEventListener("click", function() {
    removeList();
  });
}

//Shows the Title and Add Cards sections
function showTitleAndCardSection(){
  var showCardSection = document.getElementsByClassName("listContainer");
  for (var i=0;i<showCardSection.length;i+=1){
    showCardSection [i].style.display = 'block';
  }
}

function removeList(listTextArea) {
  var element = document.getElementById("listTextArea");
  var emptyList = document.getElementById("textAreaTitle").value ==="";
  if (emptyList) {
    document.getElementById("addListLink").style.display = "block";
  }
  // else{
  //   document.getElementById("addAnotherListLink").style.display = "block";
  // }
  element.parentNode.removeChild(element);
}

function createNewListTextArea() {
  var listWrapper = document.getElementById("listWrapper");
    var newListContainerDiv = document.createElement("div");
    newListContainerDiv.setAttribute("id", "newListDiv");
    listWrapper.appendChild(newListContainerDiv);
}



// function duplicate() {
//   var i=0;
//   var original = document.getElementById("listTextArea");
//   var clone = original.cloneNode(true);
//   clone.id = "listTextArea" + ++i;
//   original.parentNode.appendChild(clone);
// }

// *************** ADD - DELETE - EDIT CARDS  **************

/*** Creates an inputField which contains a textarea, a 'Add a Card' button and a delete 'X' button.***/
function displayInputField() {
  //checks to see if there is a div#inputField in our DOM (null means we do not have div#inputField), and creates it if its not there
  var a = document.getElementById("inputField");
  var inputFieldExist = true;
  if (a === null) {
  a = document.createElement("inputField");
  a.id = "inputField";
  // adds the newly created element to the DOM
  inputFieldExist = false;
  }

  // Creates a textarea for input
  var b = document.createElement("textarea");
  b.setAttribute("type", "text");
  b.setAttribute("id", "userInput");
  b.setAttribute("overflow", "break-word");
  b.setAttribute("placeholder", "Enter a title for this card...");
  a.appendChild(b);

  // Creates a "Add a Card" button. It adds the textarea when clicked
  var button = document.createElement("button");
  button.innerHTML = "Add Card";
  button.setAttribute("id", "createNewCard");
  a.appendChild(button);

  //Call the CreateCard() function to create a new card when the 'Add a Card' button is clicked.
  button.addEventListener("click", function() {
    //Checks to see if the textarea is empty. If it is a card will not be created when the user clicks the 'Add a Card' button.
    if (document.getElementById("userInput").value ==="") {
      return false;
    }else{
      createACard();
    }
  });

  // Creates a delete "x" button and set attributes to it
  var closeButton = document.createElement("closeButton");
  closeButton.innerHTML = '<i class="fas fa-times"></i>';
  closeButton.setAttribute("id", "createNewCloseBtn");
  a.appendChild(closeButton);

  //Checks to see if a div#inputField exists and creates one if it does not exist and appends it to its parentNode
  if (!inputFieldExist) {
    document.querySelector(".cardContainer").appendChild(a);
  }
  // adds an event listener which will call the removeCard () function to delete the div#inputField when clicked
  closeButton.addEventListener("click", function() {
    removeCard();
  });
}

//Hides the 'Add a Card' and 'Add another card' links when they are clicked.
function hideButton(x) {
  document.getElementById(x).style.display = "none"; // hide the button
}

//Takes the input from div#inputField and creates a new 'titled' card
function createACard() {
  var createCardElem = document.getElementById("createCard");
  var createNewCard = document.createElement("div");
  createNewCard.setAttribute("id", "newCard");
  createCardElem.appendChild(createNewCard);
  var inputTaker = document.getElementById("userInput").value;
  //appending the user's input to the new card
  createNewCard.innerHTML = inputTaker;
  document.getElementById("userInput").value = ""; //empties the text-area after 'Add a Card' button is clicked.
}

//removes the inputField and buttons from the document and shows the 'addAnotherCardLink' after it has been clicked.
function removeCard(inputField) {
  var element = document.getElementById("inputField");
  element.parentNode.removeChild(element);
  document.getElementById("addAnotherCardLink").style.display = "block";
}

// *************** OVERLAY MODAL ***************
let overlayModal = {
// *************** ADD MEMBER OPTION ***************
  changeLabel: function(cardID) {
    
  }
}

// *************** ADD LABEL OPTION ***************


// *************** ADD CHECKLIST OPTION ***************

// *************** ADD DUE DATE OPTION ***************

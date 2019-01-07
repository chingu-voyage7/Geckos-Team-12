// *************** SLIDEOUT MENU SCRIPT ***************
const headers = {
  'change-background': 'Change Background',
  'filter-cards-page': 'Filter Cards',
  'settings-page': 'Settings'
};

const backgroundImages = [
  'assets/eberhard-grossgasteiger-1036384-unsplash.jpg',
  'assets/ernest-porzi-19106-unsplash.jpg',
  'assets/frank-mckenna-140054-unsplash.jpg',
  'assets/hugues-de-buyer-mimeure-335733-unsplash.jpg'
];

let menu = {
  // Toggles menu from view (slide into or out of view)
  toggleMenuContainer: function () {
    document.getElementById('menu-container').classList.toggle("element-invisible");
    document.getElementById('show-menu-link').classList.toggle("element-invisible");
  },
  // Shows or hides main menu
  toggleMainMenu: function (idToHide) {
    document.getElementById('main-menu').classList.toggle("element-invisible");
    document.getElementById(idToHide).classList.toggle("element-invisible");
    document.getElementById('main-menu-header').classList.toggle("element-invisible");
    document.getElementById('menu-header').classList.toggle("element-invisible");
  },
  // Shows or hides a specific page (page id added when function called from HTML)
  togglePage: function (id) {
    document.getElementById('main-menu-header').classList.toggle("element-invisible");
    document.getElementById('menu-header').classList.toggle("element-invisible");
    document.getElementById('page-header').innerHTML = headers[id];
    document.getElementById(id).classList.toggle("element-invisible");
    menu.toggleMainMenu();
  },
  // Changes background color
  changeBackground: function (color) {
    document.body.style.background = color;
  },
  // Changes background image
  changeBackgroundImage: function (imageURL) {
    document.body.style.backgroundImage = "url(" + imageURL + ")";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
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

  button.addEventListener("click", function () {
    var titleTaker = document.getElementById("textAreaTitle").value;
    if (titleTaker == "") {
      titleTaker = false;
    } else {
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
  closeButton.addEventListener("click", function () {
    removeList();
  });
}

//Shows the Title and Add Cards sections
function showTitleAndCardSection() {
  var showCardSection = document.getElementsByClassName("listContainer");
  for (var i = 0; i < showCardSection.length; i += 1) {
    showCardSection[i].style.display = 'block';
  }
}

function removeList(listTextArea) {
  var element = document.getElementById("listTextArea");
  var emptyList = document.getElementById("textAreaTitle").value === "";
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
  button.addEventListener("click", function () {
    //Checks to see if the textarea is empty. If it is a card will not be created when the user clicks the 'Add a Card' button.
    if (document.getElementById("userInput").value === "") {
      return false;
    } else {
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
  closeButton.addEventListener("click", function () {
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
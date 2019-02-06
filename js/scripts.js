window.onload = function() {
	checkForBackground();
	toggleAddListLinks();
};

function setEventListeners() {
	document.addEventListener('click', closeMenus);
}

function closeMenus(event) {
  let elements = [document.getElementById('labels-container'), document.getElementById('card-options-container')];
  for (let i=0; i<elements.length; i++) {
    if (!(elements[i].classList.contains('element-invisible'))) {
      elements[i].classList.toggle('element-invisible');
    }
  }
}

setEventListeners();

let eventCancel = function (e) {
    if (!e)
        if (window.event) e = window.event;
    else return;
    if (e.cancelBubble != null) e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    if (window.event) e.returnValue = false;
    if (e.cancel != null) e.cancel = true;
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
	colors: 'Colors',
	photos: 'Photos',
	'filter-cards': 'Filter Cards',
	'copy-board': 'Copy Board',
	settings: 'Settings'
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
		document.getElementById('menu-container').classList.toggle('element-invisible');
		document.getElementById('show-menu-link').classList.toggle('element-invisible');
	},
	// Show or hide main menu
	toggleMainMenu: function() {
		//hide or show main menu
		document.getElementById('main-menu').classList.toggle('element-invisible');
		document.getElementById('main-menu-header').classList.toggle('element-invisible');
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
		document.getElementById('menu-header').classList.toggle('element-invisible');
		//set header text to match current page
		document.getElementById('page-header').innerHTML = headers[id];
		//show selected page
		document.getElementById(id).classList.toggle('element-invisible');
	},
	// Change background color
	changeBackground: function(background) {
		localStorage.setItem('background', background);
		if (background.startsWith('rgb')) {
			document.body.style.background = background;
		} else {
      document.body.style.background = 'url(' + background + ')';
      document.body.style.backgroundAttachment = 'fixed';
			document.body.style.backgroundSize = 'cover';
			document.body.style.backgroundRepeat = 'no-repeat';
		}
		menu.changeBackgroundIcon(background);
	},
	changeBackgroundIcon: function(background) {
		let backgroundIcon = document.getElementById('background-menu-icon');
		if (background.startsWith('rgb')) {
			backgroundIcon.style.background = background;
		} else {
			backgroundIcon.style.background = 'url(' + background + ')';
		}
	}
};

// *************** ADD LISTS ***************

// add new list submit eventlistener
document.getElementById('add-list-form').addEventListener('submit', addList);

//Declaring index
let listIndex = 0;
let countCard = 0;
function addList(e) {
	e.preventDefault();
	const input = document.getElementById('list-name');
	const name = input.value;
	input.value = '';
	if ('' == name) {
		return;
	}

	// create list
	const list = document.createElement('div');
	list.setAttribute('class', 'list');
	list.innerHTML =
		`<div class="list-container">
    <div class="list-heading" >
      <h3 contenteditable="true">` +
		name +
		`</h3>
    <div class= "ellipsis"><a href="#">&#8230;</a></div>
    </div>
      <div>
        <form class="add-item-form">
          <textarea placeholder="Enter a title for this card..."></textarea>
          <div>
          <input type="submit" value="Add Card">
          <input type="button" value="&#88;" onclick="hideSHowForm(this,'add-item-form', 'show-card-form', ` +
		listIndex +
		`);">
          <div class= "ellipsis"><a href="#">&#8230;</a></div>
          </div>
        </form>
      </div>
      <div class="link-wrapper">
      <a href="#" class="show-card-form" onclick="hideSHowForm(this,'add-item-form', 'show-card-form', ` +
		listIndex +
		`);">
      <span class="placeholder"><i class="fas fa-plus"></i> Add a card</span>
      <span class="placeholder"><i class="fas fa-plus"></i> Add another card</span>
    </a>
    </div>
      </div>`;

	//Increasing index
	listIndex++;
	document.getElementById('list-wrapper').appendChild(list);
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
		pen.innerHTML = '<i class="fas fa-pen ignore-close"></i>';
		pen.addEventListener('click', function(event) {
			cardOptions.setCurrentCard(event);
			cardOptions.showCardOptions(event);
		});
		cardItem.innerHTML = text;
		card.appendChild(cardItem);
		card.appendChild(pen);
		e.target.parentElement.prepend(card);
		//Increasing countCard
		countCard++;
	}
});

let spans = document.getElementsByClassName('placeholder');
//toggle between 'add a list' and 'add another list' links
function toggleAddListLinks() {
	spans[1].style.display = 'none';
	document.forms[0].style.display = 'none';
}

let clicked = 0;
//toggle between links and 'add-list-form'
function toggleDiv(formId, linkId) {
	clicked++;
	if (document.getElementById(formId).style.display == 'block') {
		document.getElementById(formId).style.display = 'none';
		document.getElementById(linkId).style.display = 'block';
	} else {
		document.getElementById(linkId).style.display = 'none';
		document.getElementById(formId).style.display = 'block';
	}
	if (clicked > 0) {
		spans[0].style.display = 'none';
		spans[1].style.display = 'block';
	}
}

document.getElementsByClassName('');

//toggle between links and 'add-item-form'
function hideSHowForm(curr, form, link, id) {
	//show only one 'add-item-form' Form on screen and hide other form
	let allCard = document.querySelectorAll('.add-item-form');
	allCard.forEach((el) => (el.style.display = 'none'));
	document.querySelectorAll('.show-card-form').forEach((a) => (a.style.display = 'block'));
	curr.parentNode.parentNode.style.display = 'block';

	if (document.getElementsByClassName(form)[id].style.display == 'block') {
		document.getElementsByClassName(form)[id].style.display = 'none';
		document.getElementsByClassName(link)[id].style.display = 'block';
	} else {
		document.getElementsByClassName(link)[id].style.display = 'none';
		document.getElementsByClassName(form)[id].style.display = 'block';
	}
	if (countCard > 0) {
		spans[0].style.display = 'none';
		spans[1].style.display = 'block';
	}
}

// *************** CARD OPTIONS (small + modal) ***************
// declare array for label colors (cardOptions.changeLabel())
let labelArr = [];
let cardOptions = {
	currentCard: null,
	setCurrentCard: function(pen) {
    this.currentCard = this.getDiv(pen.target, 'card');
	},
	getDiv: function(elem, divClass) {
		for (; elem && elem !== document; elem = elem.parentNode) {
			if (elem.classList.contains(divClass)) {
				return elem;
			}
		}
		return null;
	},
	showOverlay: function() {
		document.getElementById('overlay-container').classList.toggle('element-invisible');
		document.body.classList.add('ovleray-opacity');
	},
	showCardOptions: function(event) {
    let target = event.target;
		// Get parent elements with 'list' and 'card' class names
		let list = cardOptions.getDiv(target, 'list');
		let card = cardOptions.getDiv(target, 'card');
		// Get position of list and card
		let listPosition = list.getBoundingClientRect();
		let cardPosition = card.getBoundingClientRect();
		let cardOptionsContainer = document.getElementById('card-options-container');
		cardOptionsContainer.classList.toggle('element-invisible');
		let labelsContainer = document.getElementById('labels-container');
		if (!labelsContainer.classList.contains('element-invisible')) {
			labelsContainer.classList.toggle('element-invisible');
		}
		// Set card options & labels containers to be flush with right edge of list
		cardOptionsContainer.style.left = listPosition.left + list.offsetWidth + 'px';
    labelsContainer.style.left = listPosition.left + list.offsetWidth + 'px';
		// Set card options & labels containers to be flush with top of card or list
		cardOptionsContainer.style.top = cardPosition.bottom - card.offsetHeight - 7 + 'px';
    labelsContainer.style.top = listPosition.top + 'px';
    return eventCancel(event);
	},
	// *************** SHOW X OPTION ***************
	showLabels: function(event) {
    let labelsContainer = document.getElementById('labels-container');
		labelsContainer.classList.toggle('element-invisible');
    return eventCancel(event);
	},

	// *************** ADD MEMBER OPTION ***************
	// *************** ADD/CHANGE LABEL ***************
	changeLabel: function(event, labelColor) {
		// NEXT STEP: Must access each unique card with a unique ID. Then, can set an individual labelArr for each card.
		let card = this.currentCard;
    console.log("Card: " + card);
		//check if color is already displayed (i.e. in the array)
		let currentLabels = card.getElementsByClassName('card-label-tile');
    console.log("currentLabels: " + currentLabels.item(0));
		if (labelColor in currentLabels) {
			card.removeChild(document.getElementById(labelColor));
			// labelArr.splice(this.card.labelArr.indexOf(labelColor),1);
		} else {
			// if color not already displayed, dispaly it
			//create new HTML element to display color label
			let label = document.createElement('div');
			label.classList.add('card-label-tile');
			label.id = labelColor;
			label.style.backgroundColor = labelColor;
			// add new element (color label) to card
			card.appendChild(label);
      console.log("label added. currentLabels now: " + currentLabels);
		}
	},

	// *************** ADD CHECKLIST OPTION ***************
	addChecklist: function() {},
	// *************** ADD DUE DATE OPTION ***************
	addDueDate: function() {}
};

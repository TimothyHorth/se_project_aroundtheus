//Initialize variables for modal window
const modal = document.querySelector(".modal");
const page = document.querySelector(".page");
const editButton = document.querySelector("#edit-button");
const closeButton = document.querySelector(".modal__close-button");
let profileName = document.querySelector(".profile__info-name-text");
let profileAbout = document.querySelector(".profile__info-bio");
let formName = document.querySelector("#name");
let formDescription = document.querySelector("#about-me");
const form = document.querySelector(".form");
// initialize and define variables for element template and elements div
const elementTemplate = document.querySelector("#element-template").content;
const elements = document.querySelector(".elements");

// Using template to create cards
// Create an array containing all six initialized objects
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

// Create a function for editing the element template to return a unique element card
function getCardElement(data) {
  let cardElement = elementTemplate.querySelector(".element").cloneNode(true);
  let cardElementTitle = cardElement.querySelector(".element__title");
  let cardElementImage = cardElement.querySelector(".element__image");
  cardElementTitle.textContent = data.name;
  cardElementImage.alt = data.name;
  cardElementImage.src = data.link;
  return cardElement;
}

// for loop that passes each object in initialCards tot he getCardElement function
// this for loop creates and adds cards from a template
for (let i = 0; i < initialCards.length; i++) {
  elements.append(getCardElement(initialCards[i]));
}

// **** MODAL WINDOW **** //
// functions for opening and closing modal window
function showEditProfile() {
  formName.value = profileName.textContent;
  formDescription.value = profileAbout.textContent;
  modal.classList.add("modal_opened");
}

function closeEditProfile() {
  modal.classList.remove("modal_opened");
}

function submitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileAbout.textContent = formDescription.value;
  closeEditProfile();
}

// EventListeners for buttons
editButton.addEventListener("click", showEditProfile);
closeButton.addEventListener("click", closeEditProfile);
form.addEventListener("submit", submitProfile);

//Initialize variables for modal window
let modal = document.querySelector(".modal__container");
let page = document.querySelector(".page");
let editButton = document.querySelector("#edit-button");
let closeButton = document.querySelector(".close-button");
let submitButton = document.querySelector("#save");
let profileName = document.querySelector(".profile__info-name-text");
let profileAbout = document.querySelector(".profile__info-bio");
let formName = document.querySelector("#name");
let formDescription = document.querySelector("#about-me");
let form = document.querySelector(".form");
// initialize and define variables for element template and elements div
let elementTemplate = document.querySelector("#element-template").content;
let elements = document.querySelector(".elements");

// Using template to create cards
// Initialize objects 1 - 6 for each of the six cards
let object_1 = {
  name: "Yosemite Valley",
  link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
};

let object_2 = {
  name: "Lake Louise",
  link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
};

let object_3 = {
  name: "Bald Mountains",
  link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
};

let object_4 = {
  name: "Latemar",
  link: "https://code.s3.yandex.net/web-code/latemar.jpg",
};

let object_5 = {
  name: "Vanoise National Park",
  link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
};

let object_6 = {
  name: "Lago di Braies",
  link: "https://code.s3.yandex.net/web-code/lago.jpg",
};

// Create an array containing all six initialized objects
initialCards = [object_1, object_2, object_3, object_4, object_5, object_6];

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
  modal.classList.add("modal__container_opened");
  page.classList.add("page__overlay");
}

function closeEditProfile() {
  modal.classList.remove("modal__container_opened");
  page.classList.remove("page__overlay");
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

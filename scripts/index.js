//Initialize variables for modal window
const modal = document.querySelector(".modal");
const newPlaceModal = document.querySelector(".form-modal");
const page = document.querySelector(".page");
const editButton = document.querySelector("#edit-button");
const closeButton = document.querySelector(".modal__close-button");
const newPlaceCloseButton = document.querySelector(".form-modal__close-button");
const addButton = document.querySelector(".profile__add-button");
let profileName = document.querySelector(".profile__info-name-text");
let profileAbout = document.querySelector(".profile__info-bio");
let formName = document.querySelector("#name");
let formDescription = document.querySelector("#about-me");
const form = document.querySelector(".form");
const formModalForm = document.querySelector(".form-modal__form");

let cardTitle = document.querySelector("#title");
let cardImageLink = document.querySelector("#image-link");

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
  let cardElementFavoriteButton = cardElement.querySelector(
    ".element__favorite-button"
  );
  cardElementTitle.textContent = data.name;
  cardElementImage.alt = data.name;
  cardElementImage.src = data.link;
  // Image modal function
  cardElementImage.addEventListener("click", function (evt) {
    imageModalImage.src = evt.target.src;
    imageModalTitle.textContent = cardElementTitle.textContent;
    openImageModal();
  });
  // Like Button
  cardElementFavoriteButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__favorite-button_active");
    console.log("worked");
  });
  // Trash Button
  let cardElementTrashButton = cardElement.querySelector(
    ".element__trash-button"
  );
  cardElementTrashButton.addEventListener("click", function (evt) {
    evt.target.parentElement.remove();
  });
  return cardElement;
}

// Creating a loop using forEach() that passes each object in initialCards to the getCardElement function
// this for loop creates and adds cards from a template
initialCards.forEach(function (card) {
  elements.append(getCardElement(card));
});

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

function openNewPlace() {
  cardTitle.value = "";
  cardImageLink.value = "";
  newPlaceModal.classList.add("form-modal_opened");
}

function closeNewPlace() {
  newPlaceModal.classList.remove("form-modal_opened");
}

function submitNewPlace(evt) {
  evt.preventDefault();
  let newCard = { name: cardTitle.value, link: cardImageLink.value };
  console.log(newCard);
  elements.prepend(getCardElement(newCard));
  closeNewPlace();
}

// EventListeners for buttons
editButton.addEventListener("click", showEditProfile);
closeButton.addEventListener("click", closeEditProfile);
form.addEventListener("submit", submitProfile);

// EventListeners for newPlace modal form
addButton.addEventListener("click", openNewPlace);
newPlaceCloseButton.addEventListener("click", closeNewPlace);
formModalForm.addEventListener("submit", submitNewPlace);

// Image modal
const imageModal = document.querySelector(".image-modal");
const imageModalImage = imageModal.querySelector(".image-modal__image");
const imageModalTitle = imageModal.querySelector(".image-modal__title");
const imageModalCloseButton = imageModal.querySelector("#image-close");

function openImageModal() {
  imageModal.classList.add("image-modal_opened");
}

function closeImageModal() {
  imageModal.classList.remove("image-modal_opened");
  console.log("worked");
}

imageModalCloseButton.addEventListener("click", closeImageModal);

//Initialize variables for modal window

// Profile Modal window
const profileModal = document.querySelector(".modal");
const editButton = document.querySelector("#edit-button");
const profileModalCloseButton = document.querySelector(".modal__close-button");
let profileName = document.querySelector(".profile__info-name-text");
let profileAbout = document.querySelector(".profile__info-bio");
let formName = document.querySelector("#name");
let formDescription = document.querySelector("#about-me");
const profileForm = document.querySelector(".modal__form");

// Card Modal window
const newCardModal = document.querySelector(".card-modal");
const newCardModalCloseButton = document.querySelector(
  ".card-modal__close-button"
);
const newCardModalForm = document.querySelector(".card-modal__form");
let cardTitle = document.querySelector("#title");
let cardImageLink = document.querySelector("#image-link");
const addButton = document.querySelector(".profile__add-button");

// Image Modal window
const imageModal = document.querySelector(".image-modal");
const imageModalImage = imageModal.querySelector(".image-modal__image");
const imageModalTitle = imageModal.querySelector(".image-modal__title");
const imageModalCloseButton = imageModal.querySelector("#image-close");

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
// Create new card element
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

  // Image modal function - create function to open image in modal window
  cardElementImage.addEventListener("click", function (evt) {
    imageModalImage.src = evt.target.src;
    imageModalTitle.textContent = cardElementTitle.textContent;
    openImageModal();
  });

  // Like Button - create function so that like button is filled in
  cardElementFavoriteButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__favorite-button_active");
    console.log("worked");
  });

  // Trash Button - create function so card is removed
  let cardElementTrashButton = cardElement.querySelector(
    ".element__trash-button"
  );
  cardElementTrashButton.addEventListener("click", function (evt) {
    evt.target.parentElement.remove();
  });

  // Return cardElement
  return cardElement;
}

// Creating a loop using forEach() that passes each object in initialCards to the getCardElement function
// this for loop creates and adds cards from a template
initialCards.forEach(function (card) {
  elements.append(getCardElement(card));
});

// **** MODAL WINDOWS **** //

// Profile Modal Window - functions

// Open profile modal window
function showEditProfile() {
  formName.value = profileName.textContent;
  formDescription.value = profileAbout.textContent;
  profileModal.classList.add("modal_opened");
}

// Close profile mdoal window
function closeEditProfile() {
  profileModal.classList.remove("modal_opened");
}

// Submit profile modal window to change name and bio values
function submitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileAbout.textContent = formDescription.value;
  closeEditProfile();
}

// Card modal window

// Open card modal window
function openNewPlace() {
  cardTitle.value = "";
  cardImageLink.value = "";
  newCardModal.classList.add("card-modal_opened");
}

// Close modal window
function closeNewPlace() {
  newCardModal.classList.remove("card-modal_opened");
}

// Submit new card into elements
function submitNewPlace(evt) {
  evt.preventDefault();
  let newCard = { name: cardTitle.value, link: cardImageLink.value };
  console.log(newCard);
  elements.prepend(getCardElement(newCard));
  closeNewPlace();
}

// Image modal window - functions

// Open image modal window
function openImageModal() {
  imageModal.classList.add("image-modal_opened");
}

// Close image modal window
function closeImageModal() {
  imageModal.classList.remove("image-modal_opened");
  console.log("worked");
}

// ****EVENTLISTENERS FOR BUTTONS****

// EventListeners for profile modal window
editButton.addEventListener("click", showEditProfile);
profileModalCloseButton.addEventListener("click", closeEditProfile);
profileForm.addEventListener("submit", submitProfile);

// EventListeners for newCard modal form
addButton.addEventListener("click", openNewPlace);
newCardModalCloseButton.addEventListener("click", closeNewPlace);
newCardModalForm.addEventListener("submit", submitNewPlace);

//EventListener for image modal
imageModalCloseButton.addEventListener("click", closeImageModal);

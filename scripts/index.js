// import necessary functions
import { Card } from "./Card.js";
import { openPopup, closePopup } from "./utils.js";
import { FormValidator } from "./FormValidator.js";

//Initialize variables for modal window

// Profile Modal window
const profileModal = document.querySelector(".modal_type_profile");
const profileEditButton = document.querySelector("#edit-button");
const profileModalCloseButton = document.querySelector(
  ".modal__close-button_type_profile"
);
const profileName = document.querySelector(".profile__info-name-text");
const profileAbout = document.querySelector(".profile__info-bio");
export const formName = document.querySelector("#name");
export const formDescription = document.querySelector("#about-me");
const profileForm = document.querySelector(".modal__form_type_profile");

// Card Modal window
const newCardModal = document.querySelector(".modal_type_card");
const newCardModalCloseButton = document.querySelector(
  ".modal__close-button_type_card"
);
const newCardModalForm = document.querySelector(".modal__form_type_card");
const cardTitle = document.querySelector("#title");
const cardImageLink = document.querySelector("#image-link");
const addCardButton = document.querySelector(".profile__add-button");
const cardsList = document.querySelector(".elements");

// Image Modal window
const imageModal = document.querySelector(".modal_type_image");
const imageModalImage = document.querySelector(".modal__image");
const imageModalTitle = document.querySelector(".modal__title_type_image");
const imageModalCloseButton = imageModal.querySelector("#image-close");

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

// **** MODAL WINDOWS **** //

//Functions

// function for filling in the profile form with current values
function fillProfileForm() {
  formName.value = profileName.textContent;
  formDescription.value = profileAbout.textContent;
}

// Submit profile modal window to change name and bio values & close window
function submitProfile(evt) {
  evt.preventDefault();
  updateProfile();
  closePopup(profileModal);
}

// Function for updating profile name and bio
function updateProfile() {
  profileName.textContent = formName.value;
  profileAbout.textContent = formDescription.value;
}

// Submit new card into elements
function submitNewCard(evt) {
  evt.preventDefault();
  const newCard = createCard({
    name: cardTitle.value,
    link: cardImageLink.value,
  });
  cardsList.prepend(newCard);
  closePopup(newCardModal);
  newCardModalForm.reset();
  newCardModalFormValidator.toggleButtonState();
  newCardModalFormValidator.resetValidation();
}

const handleCardClick = (name, link) => {
  imageModalTitle.textContent = name;
  imageModalImage.src = link;
  imageModalImage.alt = `Photo of ${name}`;
  openPopup(document.querySelector(".modal_type_image"));
};

// ****EVENTLISTENERS****

// EventListeners for profile modal window
profileEditButton.addEventListener("click", function () {
  fillProfileForm();
  formProfile.resetValidation();
  openPopup(profileModal);
});
profileModalCloseButton.addEventListener("click", function () {
  closePopup(profileModal);
});
profileForm.addEventListener("submit", submitProfile);

// EventListeners for newCard modal form

// Open new card modal when the plus button is clicked
addCardButton.addEventListener("click", function () {
  openPopup(newCardModal);
});

// Close new card modal when the close button is clicked
newCardModalCloseButton.addEventListener("click", function () {
  closePopup(newCardModal);
});

// Submit new card when the submit button is clicked
newCardModalForm.addEventListener("submit", submitNewCard);

//EventListener for image modal - open image modal when an image is clicked
imageModalCloseButton.addEventListener("click", function () {
  closePopup(imageModal);
});

// Create a function for creating a card
const createCard = (item) => {
  const card = new Card(item, "#element-template", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

// Creating a loop using forEach() that passes each object in initialCards to the getCardElement function
// this for loop creates and adds cards from a template
const renderElements = () => {
  const elements = document.querySelector(".elements");
  initialCards.forEach(function (item) {
    const cardElement = createCard(item);
    elements.append(cardElement);
  });
};

// INITIALIZING
// Initializing the configuration object for validation
const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_inactive",
  activeInputErrorClass: "form__input-error_active",
  inputErrorClass: "form__input_type_error",
  errorClassSingleLine: "form__input-error_type_single-line",
  errorClassDoubleLine: "form__input-error_type_double-line",
};

//Validators:

// Initialize validator for the profile form and enable validation
const formProfile = new FormValidator(validationConfig, profileForm);
formProfile.enableValidation();

// Initialize validator for the new card form and enable validation
const newCardModalFormValidator = new FormValidator(
  validationConfig,
  newCardModalForm
);
newCardModalFormValidator.enableValidation();

// Render the elements
renderElements();

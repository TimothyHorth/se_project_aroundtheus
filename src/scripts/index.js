// import the main css stylesheet
import "../pages/index.css";

// import necessary functions
import { Card } from "./Card.js";
import Popup from "./Popup.js";
import { FormValidator } from "./FormValidator.js";
import Section from "./Section.js";

//Initialize variables for modal window

import {
  profileModal,
  profileEditButton,
  profileModalCloseButton,
  profileName,
  profileAbout,
  formName,
  formDescription,
  profileForm,
  newCardModal,
  newCardModalCloseButton,
  newCardModalForm,
  cardTitle,
  cardImageLink,
  addCardButton,
  cardsList,
  imageModal,
  imageModalImage,
  imageModalTitle,
  imageModalCloseButton,
} from "./Constants.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo";

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

// Create popups
const modalProfile = new Popup(".modal_type_profile");
const modalCard = new Popup(".modal_type_card");
const modalImage = new Popup(".modal_type_image");

modalProfile.setEventListeners();
modalCard.setEventListeners();
modalImage.setEventListeners();

// Profile
const formProfilee = new PopupWithForm(".modal_type_profile", profileFunction);
formProfilee.setEventListeners();
// Start FUNCTION
function profileFunction() {
  const profileValues = formProfilee._getInputValues();
  const userInfo = new UserInfo(
    ".profile__info-name-text",
    ".profile__info-bio"
  );
  userInfo.setUserInfo(profileValues);
}

// Card
const formCard = new PopupWithForm(".modal_type_card", cardFunction);
formCard.setEventListeners();
// Start FUNCTION
function cardFunction() {
  const cardValues = formCard._getInputValues();
  const card = new Card(cardValues, "#element-template".handleCardClick);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

// **** MODAL WINDOWS **** //

//Functions

// function for filling in the profile form with current values
// function fillProfileForm() {
//   formName.value = profileName.textContent;
//   formDescription.value = profileAbout.textContent;
// }

// Submit profile modal window to change name and bio values & close window
function submitProfile(evt) {
  evt.preventDefault();
  updateProfile();
  modalProfile.close();
}

// // Function for updating profile name and bio
// function updateProfile() {
//   profileName.textContent = formName.value;
//   profileAbout.textContent = formDescription.value;
// }

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

// handleCardClick function to pass to Card
const handleCardClick = (name, link) => {
  imageModalTitle.textContent = name;
  imageModalImage.src = link;
  imageModalImage.alt = `Photo of ${name}`;
  openPopup(document.querySelector(".modal_type_image"));
  modalImage.open();
};

// ****EVENTLISTENERS****

// EventListeners for profile modal window
profileEditButton.addEventListener("click", function () {
  // fillProfileForm();
  formProfile.resetValidation();
  modalProfile.open();
  // openPopup(profileModal);
});

profileModalCloseButton.addEventListener("click", function () {
  modalProfile.close();
});

profileForm.addEventListener("submit", submitProfile);

// EventListeners for newCard modal form

// Open new card modal when the plus button is clicked
addCardButton.addEventListener("click", function () {
  modalCard.open();
});

// Close new card modal when the close button is clicked
newCardModalCloseButton.addEventListener("click", function () {
  modalCard.close();
});

// Submit new card when the submit button is clicked
newCardModalForm.addEventListener("submit", submitNewCard);

//EventListener for image modal - open image modal when an image is clicked
imageModalCloseButton.addEventListener("click", function () {
  closePopup(imageModal);
});

// // Create a function for creating a card
// const createCard = (item) => {
//   const card = new Card(item, "#element-template", handleCardClick);
//   const cardElement = card.generateCard();
//   return cardElement;
//};

// Creating a loop using forEach() that passes each object in initialCards to the getCardElement function
// // this for loop creates and adds cards from a template
// const renderElements = () => {
//   const elements = document.querySelector(".elements");
//   initialCards.forEach(function (item) {
//     const cardElement = createCard(item);
//     elements.append(cardElement);
//   });
// };

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

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#element-template", handleCardClick);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  ".elements"
);

// Render items
cardList.renderer();

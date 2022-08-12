// import the main css stylesheet
import "../pages/index.css";

// import
import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo";
import { FormValidator } from "./FormValidator.js";

// import constants
import {
  profileEditButton,
  formName,
  formDescription,
  profileForm,
  newCardModalForm,
  addCardButton,
} from "./Constants.js";

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

// Initialize cardList
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

// Initialize instances of the Popup classes for each modal window
export const modalProfile = new PopupWithForm(
  ".modal_type_profile",
  submitProfile
);
export const modalCard = new PopupWithForm(".modal_type_card", submitCard);
const modalImage = new PopupWithImage(".modal_type_image");

// Set Event Listeners
modalProfile.setEventListeners();
modalCard.setEventListeners();
modalImage.setEventListeners();

// Initialize an instance of the UserInfo class
const userInfo = new UserInfo({
  name: ".profile__info-name-text",
  bio: ".profile__info-bio",
});

// Callback function for modalProfile
function submitProfile() {
  userInfo.setUserInfo();
  modalProfile.close();
}

// Callback function for modalCard
export function submitCard() {
  const cardElement = modalCard.generateNewCardFromForm();
  cardList.addFirst(cardElement);

  modalCard.close();
  newCardModalFormValidator.toggleButtonState();
  newCardModalFormValidator.resetValidation();
}

// **** MODAL WINDOWS **** //

//Functions

// function for filling in the profile form with current values
function fillProfileForm(userValues) {
  formName.value = userValues.name;
  formDescription.value = userValues.bio;
}

// handleCardClick function to pass to Card for modalImage
export const handleCardClick = (name, link) => {
  modalImage.open(name, link);
};

// ****EVENTLISTENERS****

profileEditButton.addEventListener("click", function () {
  const userValues = userInfo.getUserInfo();
  fillProfileForm(userValues);
  formProfile.resetValidation();
  modalProfile.open();
});

// Open new card modal when the plus button is clicked
addCardButton.addEventListener("click", function () {
  modalCard.open();
});

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

// Render items
cardList.renderer();

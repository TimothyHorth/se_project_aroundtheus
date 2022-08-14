// import the main css stylesheet
import "./index.css";

// import
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo";
import { FormValidator } from "../scripts/components/FormValidator.js";

// import constants
import {
  profileEditButton,
  formName,
  formDescription,
  profileForm,
  newCardModalForm,
  addCardButton,
  initialCards,
} from "../scripts/utils/Constants.js";

//
function createCard(item) {
  const card = new Card(item, "#element-template", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

// Initialize cardList
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
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
  const profileValues = modalProfile._getInputValues();
  userInfo.setUserInfo(profileValues);
  modalProfile.close();
}

// Callback function for modalCard
export function submitCard() {
  const inputValues = this._getInputValues();
  console.log(inputValues);
  const cardElement = createCard(inputValues);
  cardList.addFirst(cardElement);

  modalCard.close();
}

// **** MODAL WINDOWS **** //

//Functions

// handleCardClick function to pass to Card for modalImage
export const handleCardClick = (name, link) => {
  modalImage.open(name, link);
};

// ****EVENTLISTENERS****

profileEditButton.addEventListener("click", function () {
  const userValues = userInfo.getUserInfo();
  modalProfile.setInputValues(userValues);
  formValidators["edit profile"].resetValidation();
  formValidators["edit profile"].toggleButtonState();
  modalProfile.open();
});

// Open new card modal when the plus button is clicked
addCardButton.addEventListener("click", function () {
  formValidators["edit card"].resetValidation();
  formValidators["edit card"].toggleButtonState();
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

// Initialize object for storing forms

const formValidators = {};

// enable validation
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

// Render items
cardList.renderer();

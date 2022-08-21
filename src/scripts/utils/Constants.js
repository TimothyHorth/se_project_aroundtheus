//Initialize variables for modal window

// Profile Modal window
const profileModal = document.querySelector(".modal_type_profile");
const profileEditButton = document.querySelector("#edit-button");
const profileModalCloseButton = document.querySelector(
  ".modal__close-button_type_profile"
);
const profileName = document.querySelector(".profile__info-name-text");
const profileAbout = document.querySelector(".profile__info-bio");
const formName = document.querySelector("#name");
const formDescription = document.querySelector("#about-me");
const profileForm = document.querySelector(".modal__form_type_profile");
const profileSubmitButton = profileForm.querySelector("#save-profile");

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
const cardSubmitButton = document.querySelector("#create");

// Image Modal window
const imageModal = document.querySelector(".modal_type_image");
const imageModalImage = document.querySelector(".modal__image");
const imageModalTitle = document.querySelector(".modal__title_type_image");
const imageModalCloseButton = imageModal.querySelector("#image-close");

// Profile image constants
const profileAvatar = document.querySelector(".profile__avatar");
const profileEditPencil = document.querySelector(".profile__edit-image");

// NEW
const profileImageOverlay = document.querySelector(".profile__overlay");
const profileEditImage = document.querySelector(".profile__edit-image");
const profileImageSubmitButton = document.querySelector("#save-profile-image");

// Create an array containing all six initialized objects

// const initialCards = [
//   {
//     name: "Yosemite Valley",
//     link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
//   },
//   {
//     name: "Lake Louise",
//     link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
//   },
//   {
//     name: "Bald Mountains",
//     link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
//   },
//   {
//     name: "Latemar",
//     link: "https://code.s3.yandex.net/web-code/latemar.jpg",
//   },
//   {
//     name: "Vanoise National Park",
//     link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://code.s3.yandex.net/web-code/lago.jpg",
//   },
// ];

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

export {
  profileModal,
  profileEditButton,
  profileModalCloseButton,
  profileName,
  profileAbout,
  profileAvatar,
  profileImageOverlay,
  profileEditImage,
  profileEditPencil,
  formName,
  formDescription,
  profileForm,
  profileSubmitButton,
  profileImageSubmitButton,
  cardSubmitButton,
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
  validationConfig,
};

// Adding and removing likes
fetch("https://around.nomoreparties.co/v1/group-12/cards/likes/cardId", {
  method: "PUT",
  headers: {
    authorization: "655a1e50-e6e9-4121-944b-aac1807b3df3",
    "Content-Type": "application/json",
  },
});

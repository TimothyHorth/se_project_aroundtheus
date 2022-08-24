//Initialize variables for modal window
// Sorry I had changes the file name...but it wasn't committing.

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
const editProfileForm = document.querySelector(".modal__form_type_profile");

// Card Modal window
const newCardModal = document.querySelector(".modal_type_card");
const newCardModalCloseButton = document.querySelector(
  ".modal__close-button_type_card"
);
const addCardForm = document.querySelector(".modal__form_type_card");
const cardTitle = document.querySelector("#title");
const cardImageLink = document.querySelector("#image-link");
const addCardButton = document.querySelector(".profile__add-button");
const cardsList = document.querySelector(".elements");

// Image Modal window
const imageModal = document.querySelector(".modal_type_image");
const imageModalImage = document.querySelector(".modal__image");
const imageModalTitle = document.querySelector(".modal__title_type_image");
const imageModalCloseButton = imageModal.querySelector("#image-close");

// Profile image constants
const profileAvatar = document.querySelector(".profile__avatar");
const profileEditPencil = document.querySelector(".profile__edit-image");
const avatarForm = document.querySelector(".modal__form_type_profile-image");
const profileImageOverlay = document.querySelector(".profile__overlay");
const profileEditImage = document.querySelector(".profile__edit-image");

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
  editProfileForm,
  newCardModal,
  newCardModalCloseButton,
  addCardForm,
  avatarForm,
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

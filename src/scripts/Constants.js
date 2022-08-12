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

export {
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
};

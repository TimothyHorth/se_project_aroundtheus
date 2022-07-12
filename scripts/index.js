// Import function
// import { resetFormValidation } from "./validate";

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

// Image Modal window
const imageModal = document.querySelector(".modal_type_image");
const imageModalImage = imageModal.querySelector(".modal__image");
const imageModalTitle = imageModal.querySelector(".modal__title_type_image");
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
  const cardElement = elementTemplate.querySelector(".element").cloneNode(true);
  const cardElementTitle = cardElement.querySelector(".element__title");
  const cardElementImage = cardElement.querySelector(".element__image");
  const cardElementFavoriteButton = cardElement.querySelector(
    ".element__favorite-button"
  );
  cardElementTitle.textContent = data.name;
  cardElementImage.alt = `Photo of ${data.name}`;
  cardElementImage.src = data.link;

  // Image modal function - create function to open image in modal window
  cardElementImage.addEventListener("click", function (evt) {
    imageModalImage.src = evt.target.src;
    imageModalImage.alt = evt.target.alt;
    imageModalTitle.textContent = cardElementTitle.textContent;
    openPopup(imageModal);
  });

  // Like Button - create function so that like button is filled in
  function favoriteButtonAction(evt) {
    evt.target.classList.toggle("element__favorite-button_active");
  }

  cardElementFavoriteButton.addEventListener("click", favoriteButtonAction);

  // Trash Button - create function so card is removed
  const cardElementTrashButton = cardElement.querySelector(
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

//Universal functions for opening and closing modal windows

function openPopup(popup) {
  popup.classList.add("modal_opened");
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  // call function for reseting form
}

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
  const newCard = { name: cardTitle.value, link: cardImageLink.value };
  elements.prepend(getCardElement(newCard));
  closePopup(newCardModal);
  newCardModalForm.reset();
}

// ****EVENTLISTENERS FOR BUTTONS****

// Close modal window by clicking on overlay
document.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("modal")) {
    console.log("close");
    closePopup(evt.target);
  }
});

// Close modal window by pressing the "Escape" button
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    modalList = document.querySelectorAll(".modal");
    modalList.forEach(function (modal) {
      closePopup(modal);
    });
  }
});

// EventListeners for profile modal window
profileEditButton.addEventListener("click", function () {
  fillProfileForm();
  openPopup(profileModal);
});
profileModalCloseButton.addEventListener("click", function () {
  closePopup(profileModal);
});
profileForm.addEventListener("submit", submitProfile);

// EventListeners for newCard modal form
addCardButton.addEventListener("click", function () {
  openPopup(newCardModal);
});
newCardModalCloseButton.addEventListener("click", function () {
  closePopup(newCardModal);
});
newCardModalForm.addEventListener("submit", submitNewCard);

//EventListener for image modal
imageModalCloseButton.addEventListener("click", function () {
  closePopup(imageModal);
});

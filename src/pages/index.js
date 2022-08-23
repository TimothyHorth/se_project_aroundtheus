///////////////////////////// Import ///////////////////////////////////

// import main css stylesheet
import "./index.css";

// import classes from respective JS files
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import Popup from "../scripts/components/Popup";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithFormClick from "../scripts/components/PopupWithFormClick.js";
import UserInfo from "../scripts/components/UserInfo";
import ProfileImageLink from "../scripts/components/ProfileImageLink.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Api from "../scripts/components/Api.js";

// import constants from utils/Constants.js
import {
  profileEditButton,
  profileImageOverlay,
  profileEditImage,
  profileSubmitButton,
  profileImageSubmitButton,
  cardSubmitButton,
  verifySubmitButton,
  addCardButton,
  validationConfig,
} from "../scripts/utils/Constants.js";

////////////////////////////////////////////////////////////////////////////

///////////////////////////// INITIALIZE ///////////////////////////////////

// const userID = "391b92fefbd8b073eecef090";

// initialize userID
//const userID = user._id;

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "655a1e50-e6e9-4121-944b-aac1807b3df3",
    "Content-Type": "application/json",
  },
});

// Initialize instances of the Popup classes for each modal window
const modalProfile = new PopupWithForm(".modal_type_profile", submitProfile);
const modalCard = new PopupWithForm(".modal_type_card", submitCard);
const modalImage = new PopupWithImage(".modal_type_image");
const modalVerify = new PopupWithFormClick(".modal_type_verify");
const modalProfileImage = new PopupWithForm(
  ".modal_type_profile-image",
  submitProfileImage
);

// Initialize an instance of the UserInfo class
const userInfo = new UserInfo({
  name: ".profile__info-name-text",
  bio: ".profile__info-bio",
});

api
  .getWebpageInfo()
  .then(([initialCards, userData]) => {
    //set user info
    userInfo.setUserInfo(userData);

    const cardList = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          return createCard(item, userData._id);
        },
      },
      ".elements"
    );

    // Render items
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

////////////////////////////// ORIGINAL CODE FROM BELOW WAS USED IN PROMISE ALL //////////////
// // Initialize user info
// const user = api
//   .getUserInfo()
//   .then((userData) => {
//     userInfo.setUserInfo(userData);
//     return userData;
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // Initialize cardList

// api
//   .getInitialCards()
//   .then((initialCards) => {
//     return new Section(
//       {
//         items: initialCards,
//         renderer: (item) => {
//           return createCard(item);
//         },
//       },
//       ".elements"
//     );
//   })
//   .then((cardList) => {
//     // Render items
//     cardList.renderItems();
//   });

// Initialize an instance of the profileImageLink class
const profileImageLink = new ProfileImageLink(".profile__avatar");

// Initialize object for storing forms
const formValidators = {};

////////////////////////////////////////////////////////////////////////////

///////////////////////////// FUNCTIONS ///////////////////////////////////

// function for creating a card tile for a new location
function createCard(item, userID) {
  const card = new Card(
    item,
    "#element-template",
    handleCardClick,
    handleLikeClick,
    handleDeleteIconClick,
    userID
  );
  const cardElement = card.generateCard();
  return cardElement;
}

// handleCardClick function to pass to Card for modalImage
const handleCardClick = (name, link) => {
  modalImage.open(name, link);
};

// callback function for modalProfile when form is submitted to submit user info
function submitProfile() {
  renderSaving(true, profileSubmitButton);
  const profileValues = modalProfile.getInputValues();
  // Updating profile user info
  api
    .editProfileInfo(profileValues)
    .then((userData) => {
      userInfo.setUserInfo(userData);
    })
    .then(() => {
      modalProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderSaving(false, profileSubmitButton);
    });
}

// callback function for modalCard when form is submitted
function submitCard() {
  renderSaving(true, cardSubmitButton);
  const cardValues = modalCard.getInputValues();
  // Adding a new card
  api
    .addNewCard(cardValues)
    .then((cardData) => {
      const cardList = new Section(
        {
          items: cardData,
          renderer: (item) => {
            return createCard(item, item.owner._id);
          },
        },
        ".elements"
      );
      cardList.addItem(cardData);
    })
    .then(() => {
      modalCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderSaving(false, profileSubmitButton);
    });
}

// callback function for submitting profile image through modalProfileImage
// callback function for modalProfileImage when form is submitted to edit profile image
function submitProfileImage() {
  renderSaving(true, profileImageSubmitButton);
  const inputValue = modalProfileImage.getInputValues();
  // Updating profile user info
  api.editProfileImage
    .then((imageLink) => {
      profileImageLink.setProfileImage(imageLink);
    })
    .then(() => {
      modalProfileImage.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderSaving(false, profileImageSubmitButton);
    });
}

// Function for opening modalProfileImage window to edit profile picture
function openProfileImageModal() {
  const imageLink = profileImageLink.getProfileImageLink();
  modalProfileImage.setInputValues(imageLink);
  formValidators["edit profile image"].resetValidation();
  formValidators["edit profile image"].toggleButtonState();
  modalProfileImage.open();
}

// function for enabling validation
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

// NEW FUNCTION FOR LOADING
function renderSaving(isSaving, modalSubmitButton) {
  if (isSaving) {
    modalSubmitButton.textContent = "Saving...";
  } else {
    modalSubmitButton.textContent = "Save";
  }
}

// NEW function for handle like
function handleLikeClick(card, like) {
  const res = api
    .changeLikeCardStatus(card._id, like)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
  return res;
}

// New function for delete card
// open verify modal for deleting a card
// delete card from API
// remove the card from HTML
// close verify modal window

// I AM STRUGGLING TO DELETE CARDS ///

function handleDeleteIconClick(card) {
  modalVerify.open();
  modalVerify.addSubmitAction(() => {
    api
      .deleteCard(card._id)
      .then((card) => {
        card.removeCard();
        verifyModal.close();
      })
      .catch((err) => {
        console.log(`Error: ${err.status}`);
      });
  });
  modalVerify.setEventListeners();
  console.log("reached");
}

////////////////////////////////////////////////////////////////////////////

///////////////////////////// EVENTLISTENERS ///////////////////////////////

// set eventlistener for opening the modalProfile window when the edit button is clicked
profileEditButton.addEventListener("click", function () {
  const userValues = userInfo.getUserInfo();
  modalProfile.setInputValues(userValues);
  formValidators["edit profile"].resetValidation();
  formValidators["edit profile"].toggleButtonState();
  modalProfile.open();
});

// set eventlistener for new modalCard window when the plus (add new card) button is clicked
addCardButton.addEventListener("click", function () {
  formValidators["edit card"].resetValidation();
  formValidators["edit card"].toggleButtonState();
  modalCard.open();
});

// add eventlistener to open profile image modal
profileImageOverlay.addEventListener("click", function () {
  openProfileImageModal();
});

// add eventlistener to open profile image modal
profileEditImage.addEventListener("click", function () {
  openProfileImageModal();
});

////////////////////////////////////////////////////////////////////////////

///////////////////////////// PROGRAM ///////////////////////////////////

// Run the 'setEventLIsteners' method for each modal window
modalProfile.setEventListeners();
modalCard.setEventListeners();
modalImage.setEventListeners();
// modalVerify.setEventListeners(verifySubmitButton);
modalProfileImage.setEventListeners();

// call the 'enableValidation' function so that forms can be validated
enableValidation(validationConfig);

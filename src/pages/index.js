///////////////////////////// Import ///////////////////////////////////

// THANK YOU VERY MUCH FOR ALL YOUR HELP! I APPRECIATE YOU ANSWERING MY QUESTION ON API.JS
// THIS HAS BEEN THE BEST REVIEW EXPERIENCE I'VE HAD SO FAR. YOU ARE VERY KOWLEDGABLE, AND I CAN'T
// THANK YOU ENOUGH FOR ALL THE INSIGHT! HAVE A GREAT DAY!

// import main css stylesheet
import "./index.css";

// import classes from respective JS files
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithFormClick from "../scripts/components/PopupWithFormClick.js";
import UserInfo from "../scripts/components/UserInfo";
import FormValidator from "../scripts/components/FormValidator.js";
import Api from "../scripts/components/Api.js";

// import constants from utils/constants.js
import {
  profileEditButton,
  profileImageOverlay,
  profileEditImage,
  addCardForm,
  editProfileForm,
  avatarForm,
  addCardButton,
  validationConfig,
} from "../scripts/utils/constants.js";

////////////////////////////////////////////////////////////////////////////

///////////////////////////// INITIALIZE ///////////////////////////////////

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "655a1e50-e6e9-4121-944b-aac1807b3df3",
    "Content-Type": "application/json",
  },
});

// Initialize instances of the Popup classes for each modal window
const modalProfile = new PopupWithForm(
  ".modal_type_profile",
  submitProfile,
  "Saving..."
);
const modalCard = new PopupWithForm(
  ".modal_type_card",
  submitCard,
  "Creating..."
);
const modalImage = new PopupWithImage(".modal_type_image");
const modalVerify = new PopupWithFormClick(".modal_type_verify", "Removing...");
const modalProfileImage = new PopupWithForm(
  ".modal_type_profile-image",
  submitProfileImage,
  "Saving..."
);

// Initialize an instance of the UserInfo class
const userInfo = new UserInfo({
  name: ".profile__info-name-text",
  about: ".profile__info-bio",
  avatar: ".profile__avatar",
});

let cardList;

api
  .getWebpageInfo()
  .then(([initialCards, userData]) => {
    //set user info
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData.avatar);

    cardList = new Section(
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
function submitProfile(profileValues) {
  modalProfile.showLoading();
  // Updating profile user info
  api
    .editProfileInfo(profileValues)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      modalProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      modalProfile.hideLoading();
    });
}

// callback function for modalCard when form is submitted
function submitCard(cardValues) {
  modalCard.showLoading();
  // Adding a new card
  api
    .addNewCard(cardValues)
    .then((cardData) => {
      cardList.addItem(cardData);
      modalCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      modalCard.hideLoading();
    });
}

// callback function for modalProfileImage when form is submitted to edit profile image
function submitProfileImage(imageLink) {
  modalProfileImage.showLoading();
  // Updating profile user info
  api
    .editProfileImage(imageLink.link)
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      modalProfileImage.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      modalProfileImage.hideLoading();
    });
}

// Function for opening modalProfileImage window to edit profile picture
function openProfileImageModal() {
  const imageLink = userInfo.getAvatar();
  modalProfileImage.setInputValues(imageLink);
  avatarFormValidator.resetValidation();
  avatarFormValidator.toggleButtonState();
  modalProfileImage.open();
}

// function for creating validators
const createValidator = (form) => {
  const validator = new FormValidator(validationConfig, form);
  validator.enableValidation();

  return validator;
};

// function to handle clicking of the favorite/like button
function handleLikeClick(card, like) {
  return api
    .changeLikeCardStatus(card._id, like)
    .then((res) => {
      card.updateLikes(res.likes);
    })
    .catch((err) => {
      console.log(err);
    });
}

// function for deleting/removing card
function handleDeleteIconClick(card) {
  modalVerify.open();
  modalVerify.addSubmitAction(() => {
    modalVerify.showLoading();
    api
      .deleteCard(card.getID())
      .then(() => {
        card.removeCard();
        modalVerify.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        modalVerify.hideLoading();
      });
  });
}

////////////////////////////////////////////////////////////////////////////

///////////////////////////// EVENTLISTENERS ///////////////////////////////

// set eventlistener for opening the modalProfile window when the edit button is clicked
profileEditButton.addEventListener("click", function () {
  const userValues = userInfo.getUserInfo();
  modalProfile.setInputValues(userValues);
  editProfileFormValidator.resetValidation();
  editProfileFormValidator.toggleButtonState();
  modalProfile.open();
});

// set eventlistener for new modalCard window when the plus (add new card) button is clicked
addCardButton.addEventListener("click", function () {
  addCardFormValidator.resetValidation();
  addCardFormValidator.toggleButtonState();
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
modalProfileImage.setEventListeners();
modalVerify.setEventListeners();

// Initialize validators
const addCardFormValidator = createValidator(addCardForm);
const editProfileFormValidator = createValidator(editProfileForm);
const avatarFormValidator = createValidator(avatarForm);

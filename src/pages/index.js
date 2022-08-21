///////////////////////////// Import ///////////////////////////////////

// import main css stylesheet
import "./index.css";

// import classes from respective JS files
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import Popup from "../scripts/components/Popup";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo";
import ProfileImageLink from "../scripts/components/ProfileImageLink.js";
import FormValidator from "../scripts/components/FormValidator.js";

// import constants from utils/Constants.js
import {
  profileEditButton,
  profileImageOverlay,
  profileEditImage,
  profileSubmitButton,
  profileImageSubmitButton,
  cardSubmitButton,
  addCardButton,
  validationConfig,
} from "../scripts/utils/Constants.js";

////////////////////////////////////////////////////////////////////////////

///////////////////////////// INITIALIZE ///////////////////////////////////

const userID = fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
  headers: {
    authorization: "655a1e50-e6e9-4121-944b-aac1807b3df3",
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      Promise.reject("Error: bad request");
    }
  })
  .then((user) => {
    return user["_id"];
  })
  .catch((err) => {
    console.log(err);
  });

// Initialize cardList

fetch("https://around.nomoreparties.co/v1/group-12/cards", {
  headers: {
    authorization: "655a1e50-e6e9-4121-944b-aac1807b3df3",
  },
})
  .then((res) => {
    return res.json();
  })
  .then((initialCards) => {
    return new Section(
      {
        items: initialCards,
        renderer: (item) => {
          return createCard(item);
        },
      },
      ".elements"
    );
  })
  .then((cardList) => {
    // Render items
    cardList.renderItems();
  });

// Initialize instances of the Popup classes for each modal window
const modalProfile = new PopupWithForm(".modal_type_profile", submitProfile);
const modalCard = new PopupWithForm(".modal_type_card", submitCard);
const modalImage = new PopupWithImage(".modal_type_image");
const modalVerify = new Popup(".modal_type_verify");
const modalProfileImage = new PopupWithForm(
  ".modal_type_profile-image",
  submitProfileImage
);

// Initialize an instance of the UserInfo class
const userInfo = new UserInfo({
  name: ".profile__info-name-text",
  bio: ".profile__info-bio",
});

// Initialize an instance of the profileImageLink class
const profileImageLink = new ProfileImageLink(".profile__avatar");

// Initialize object for storing forms
const formValidators = {};

////////////////////////////////////////////////////////////////////////////

///////////////////////////// FUNCTIONS ///////////////////////////////////

// function for creating a card tile for a new location
function createCard(item) {
  const card = new Card(
    item,
    "#element-template",
    handleCardClick,
    openVerifyModal,
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
  fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
    method: "PATCH",
    headers: {
      authorization: "655a1e50-e6e9-4121-944b-aac1807b3df3",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: profileValues.name,
      about: profileValues.about,
    }),
  })
    .then((res) => {
      return res.json();
    })
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
  fetch("https://around.nomoreparties.co/v1/group-12/cards", {
    method: "POST",
    headers: {
      authorization: "655a1e50-e6e9-4121-944b-aac1807b3df3",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardValues.name,
      link: cardValues.link,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((cardData) => {
      const cardList = new Section(
        {
          items: cardData,
          renderer: (item) => {
            return createCard(item);
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
  fetch("https://around.nomoreparties.co/v1/group-12/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "655a1e50-e6e9-4121-944b-aac1807b3df3",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: inputValue.link,
    }),
  })
    .then((res) => {
      return res.json();
    })
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

// callback function to open the verify modal window
// passed as a callback so that it can be applied to new cards when they are generated
function openVerifyModal() {
  modalVerify.open();
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

////////////////////////////////////////////////////////////////////////////

///////////////////////////// EVENTLISTENERS ///////////////////////////////

// Run the 'setEventLIsteners' method for each modal window
modalProfile.setEventListeners();
modalCard.setEventListeners();
modalImage.setEventListeners();
modalVerify.setEventListeners();
modalProfileImage.setEventListeners();

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

// Get initial user information
fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
  headers: {
    authorization: "655a1e50-e6e9-4121-944b-aac1807b3df3",
  },
})
  .then((res) => {
    return res.json();
  })
  .then((userData) => {
    userInfo.setUserInfo(userData);
  });

// call the 'enableValidation' function so that forms can be validated
enableValidation(validationConfig);

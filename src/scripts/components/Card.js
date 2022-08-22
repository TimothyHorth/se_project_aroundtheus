export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleLikeClick,
    openVerifyModal,
    userID
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner;
    this._owner_id = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._openVerifyModal = openVerifyModal;
    this._userID = userID;
  }

  _getTemplate() {
    //   const cardElement = document.querySelector("#element-template").content.querySelector(".element").cloneNode(true);
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    // Add event listener to image for opening ImageModal if clicked
    const imageElement = this._element.querySelector(".element__image");
    imageElement.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    // Add event listener to favorite button
    this._favoriteButton.addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__favorite-button_active");
      if (evt.target.classList.contains("element__favorite-button_active")) {
        fetch(
          `https://around.nomoreparties.co/v1/group-12/cards/likes/${this._id}`,
          {
            method: "PUT",
            headers: {
              authorization: "655a1e50-e6e9-4121-944b-aac1807b3df3",
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              Promise.reject("Error: bad request");
            }
          })
          .then((res) => {
            this._likesCounter.textContent = res.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        fetch(
          `https://around.nomoreparties.co/v1/group-12/cards/likes/${this._id}`,
          {
            method: "DELETE",
            headers: {
              authorization: "655a1e50-e6e9-4121-944b-aac1807b3df3",
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              Promise.reject("Error: bad request");
            }
          })
          .then((res) => {
            this._likesCounter.textContent = res.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    // Add event listener to trash button
    this._trashButton.addEventListener("click", this._openVerifyModal);
  }

  _checkIfTrashIconAllowed = () => {
    if (this._owner_id !== this._userID) {
      this._trashButton.classList.add("element__trash-button_hidden");
    }
  };

  _checkIfLiked = () => {
    const isFound = this._likes.some((user) => {
      if (user._id === this._userID) {
        return true;
      }
    });

    if (isFound) {
      this._favoriteButton.classList.add("element__favorite-button_active");
    }
  };

  // Create a function for editing the element template to return a unique element card
  // Create new card element
  generateCard() {
    this._element = this._getTemplate();
    this._favoriteButton = this._element.querySelector("#favorite-button");
    this._trashButton = this._element.querySelector(".element__trash-button");
    this._likesCounter = this._element.querySelector(".element__likes-counter");
    this._checkIfLiked();
    this._checkIfTrashIconAllowed();
    this._setEventListeners();

    this._element.querySelector(".element__title").textContent = this._name;
    this._likesCounter.textContent = this._likes.length;
    const imageElement = this._element.querySelector(".element__image");
    imageElement.alt = `Photo of ${this._name}`;
    imageElement.src = this._link;

    return this._element;
  }
}

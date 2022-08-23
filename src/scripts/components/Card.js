export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteIconClick,
    userID
  ) {
    this._card = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner;
    this._owner_id = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
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
        this._handleLikeClick(this._card, true).then((res) => {
          this._likesCounter.textContent = res.likes.length;
        });
      } else {
        const res = this._handleLikeClick(this._card, false).then((res) => {
          this._likesCounter.textContent = res.likes.length;
        });
      }
    });

    // Add event listener to trash button
    this._trashButton.addEventListener("click", () => {
      this._handleDeleteIconClick(this._card);
    });
  }

  removeCard = () => {
    this._element.remove();
    this._element = null;
  };

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

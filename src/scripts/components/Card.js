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
      this._handleLikeClick(this, this._checkIfLiked());
    });

    // Add event listener to trash button
    this._trashButton.addEventListener("click", () => {
      this._handleDeleteIconClick(this);
    });
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  getID() {
    return this._id;
  }

  _checkIfTrashIconAllowed = () => {
    if (this._owner_id !== this._userID) {
      this._trashButton.classList.add("element__trash-button_hidden");
    }
  };

  /////////////////////////////////////////////////////////////////////////////
  updateLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  _checkIfLiked() {
    return this._likes.some((user) => user._id === this._userID);
  }

  _renderLikes() {
    // set likes cunter content using this._likes.length
    if (this._checkIfLiked()) {
      // add active class to like button
      this._favoriteButton.classList.add("element__favorite-button_active");
    } else {
      // remove active class from like button
      this._favoriteButton.classList.remove("element__favorite-button_active");
    }
    this._likesCounter.textContent = this._likes.length;
  }

  // Create new card element
  generateCard() {
    this._element = this._getTemplate();
    this._favoriteButton = this._element.querySelector("#favorite-button");
    this._trashButton = this._element.querySelector(".element__trash-button");
    this._likesCounter = this._element.querySelector(".element__likes-counter");
    this._renderLikes();
    this._checkIfTrashIconAllowed();
    this._setEventListeners();

    this._elementTitle = this._element.querySelector(".element__title");
    this._elementTitle.textContent = this._name;
    const imageElement = this._element.querySelector(".element__image");
    imageElement.alt = `Photo of ${this._name}`;
    imageElement.src = this._link;

    return this._element;
  }
}

export default class Card {
  constructor(data, cardSelector, handleCardClick, openVerifyModal, userID) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._element
      .querySelector(".element__favorite-button")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("element__favorite-button_active");
        if (evt.target.classList.contains("element__favorite-button_active")) {
          this._likesCounter.textContent =
            parseInt(this._likesCounter.textContent) + 1;
        } else {
          this._likesCounter.textContent =
            parseInt(this._likesCounter.textContent) - 1;
        }
      });

    // Add event listener to trash button
    this._trashButton.addEventListener("click", this._openVerifyModal);
  }

  _remove = () => {
    this._element.remove();
    this._element = null;
  };

  _checkTrashCan = () => {
    if (this._id !== this._userID) {
      console.log(this._userID);
      console.log(this._id);
      this._trashButton.classList.add("element__trash-button_hidden");
    }
  };

  // Create a function for editing the element template to return a unique element card
  // Create new card element
  generateCard() {
    this._element = this._getTemplate();
    this._trashButton = this._element.querySelector(".element__trash-button");
    this._likesCounter = this._element.querySelector(".element__likes-counter");
    this._setEventListeners();

    this._element.querySelector(".element__title").textContent = this._name;
    this._likesCounter.textContent = this._likes.length;
    this._checkTrashCan();
    const imageElement = this._element.querySelector(".element__image");
    imageElement.alt = `Photo of ${this._name}`;
    imageElement.src = this._link;

    return this._element;
  }
}

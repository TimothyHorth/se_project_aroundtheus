export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
      });

    // Add event listener to trash button
    this._element
      .querySelector(".element__trash-button")
      .addEventListener("click", this._remove);
  }

  _remove = () => {
    this._element.remove();
    this._element = null;
  };

  // Create a function for editing the element template to return a unique element card
  // Create new card element
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__title").textContent = this._name;
    const imageElement = this._element.querySelector(".element__image");
    imageElement.alt = `Photo of ${this._name}`;
    imageElement.src = this._link;

    return this._element;
  }
}

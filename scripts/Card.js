export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    //   const cardElement = document.querySelector("#element-template").content.querySelector(".element").cloneNode(true);
    const cardElement = document
      .querySelector(this._cardSelector)
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    const cardElementTitle = this._element.querySelector(".element__title");
    const cardElementImage = this._element.querySelector(".element__image");
    const cardElementFavoriteButton = this._element.querySelector(
      ".element__favorite-button"
    );
    const cardElementTrashButton = this._element.querySelector(
      ".element__trash-button"
    );

    // Add event listener to image for opening ImageModal if clicked
    cardElementImage.addEventListener("click", openImageModal);

    // Add event listener to favorite button
    cardElementFavoriteButton.addEventListener("click", favoriteButtonAction);

    // Add event listener to trash button
    cardElementTrashButton.addEventListener("click", function (evt) {
      evt.target.closest(".element").remove();
    });
  }

  // Create a function for editing the element template to return a unique element card
  // Create new card element
  generateCard() {
    this._element = this._getTemplate();
    this._element._setEventListeners();

    this._element.querySelector(".element__title").textContet = this._name;
    this._element.querySelector(
      ".element_image"
    ).alt = `Photo of ${this._name}`;
    this._element.querySelector(".element__image").src = this._link;

    return this._element;
  }
}

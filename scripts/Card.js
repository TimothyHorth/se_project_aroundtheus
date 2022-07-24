import { openPopup } from "./utils.js";

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
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    // Add event listener to image for opening ImageModal if clicked
    this._element
      .querySelector(".element__image")
      .addEventListener("click", (evt) => {
        document.querySelector(".modal__image").src = evt.target.src;
        document.querySelector(".modal__image").alt = evt.target.alt;
        document.querySelector(".modal__title_type_image").textContent =
          this._element.querySelector(".element__title").textContent;
        openPopup(document.querySelector(".modal_type_image"));
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
      .addEventListener("click", (evt) => {
        evt.target.closest(".element").remove();
      });
  }

  // Create a function for editing the element template to return a unique element card
  // Create new card element
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__title").textContent = this._name;
    this._element.querySelector(
      ".element__image"
    ).alt = `Photo of ${this._name}`;
    this._element.querySelector(".element__image").src = this._link;

    return this._element;
  }
}

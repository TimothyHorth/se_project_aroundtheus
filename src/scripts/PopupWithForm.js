import Popup from "./Popup.js";
import {
  formName,
  formDescription,
  cardTitle,
  cardImageLink,
} from "./Constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._popupForm = this._popup.querySelector(".modal__form");
    this._closeButton = this._popup.querySelector(".modal__close-button");
    this._callback = callback;
  }

  _getInputValues() {
    const inputList = this._popup.querySelectorAll(".form__input");
    if (this._popupSelector === ".modal_type_profile") {
      return { name: formName.value, bio: formDescription.value };
    }
    if (this._popupSelector === ".modal_type_card") {
      return { title: cardTitle.value, link: cardImageLink.value };
    }
  }

  setEventListeners() {
    super._setEventListeners();
    this._popupForm.setEventListener("submit", this._callback);
    this._closeButton.setEventListener("click", close);
  }

  close() {
    super._close();
    this._popupForm.reset();
  }
}

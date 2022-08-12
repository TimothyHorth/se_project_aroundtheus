import Popup from "./Popup.js";
import {
  formName,
  formDescription,
  cardTitle,
  cardImageLink,
} from "./Constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._popupForm = this._popup.querySelector(".modal__form");
    this._callback = callback;
  }

  _getInputValues() {
    if (this._popupSelector == ".modal_type_profile") {
      return { name: formName.value, bio: formDescription.value };
    }
    if (this._popupSelector == ".modal_type_card") {
      return { title: cardTitle.value, link: cardImageLink.value };
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callback();
    });
  }

  close() {
    super.close();

    const delayInMilliseconds = 500;

    setTimeout(() => {
      this._popupForm.reset();
    }, delayInMilliseconds);
  }
}

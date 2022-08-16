import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".modal__form");
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".form__input")
    );
    this._callback = callback;
  }

  getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
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

    setTimeout(() => {
      this._popupForm.reset();
    }, 500);
  }
}

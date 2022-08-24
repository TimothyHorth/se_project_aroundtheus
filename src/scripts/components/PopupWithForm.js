import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback, loadingButtonText) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".modal__form");
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".form__input")
    );
    this._submitButton = this._popup.querySelector(".form__submit-button");
    this._buttonText = this._submitButton.textContent;
    this._loadingButtonText = loadingButtonText;
    this._callback = callback;
  }

  _getInputValues() {
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

  showLoading() {
    this._submitButton.textContent = this._loadingButtonText;
  }

  hideLoading() {
    this._submitButton.textContent = this._buttonText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callback(this._getInputValues());
    });
  }

  close() {
    super.close();

    setTimeout(() => {
      this._popupForm.reset();
    }, 500);
  }
}

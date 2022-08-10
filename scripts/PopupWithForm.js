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

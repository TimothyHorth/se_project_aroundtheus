import Popup from "./Popup.js";

export default class PopupWithFormClick extends Popup {
  constructor(popupSelector, loadingButtonText) {
    super();
    this._popup = document.querySelector(popupSelector);
    this._submitButton = this._popup.querySelector("#verify-save");
    this._buttonText = this._submitButton.textContent;
    this._loadingButtonText = loadingButtonText;
  }

  addSubmitAction(callback) {
    this._handleSubmitCallback = callback;
  }

  showLoading() {
    this._submitButton.textContent = this._loadingButtonText;
  }

  hideLoading() {
    this._submitButton.textContent = this._buttonText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
  }
}

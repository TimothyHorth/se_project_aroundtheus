import Popup from "./Popup.js";

export default class PopupWithFormClick extends Popup {
  addSubmitAction(callback) {
    this._handleSubmitCallback = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    document
      .querySelector(".modal__submit-button")
      .addEventListener("click", (evt) => {
        evt.preventDefault();
        this._handleSubmitCallback();
      });
  }
}

import Popup from "./Popup.js";

export default class PopupWithFormClick extends Popup {
  addSubmitAction(callback) {
    this._handleSubmitCallback = callback;
    this.setEventListeners();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector("#verify").addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
  }
}

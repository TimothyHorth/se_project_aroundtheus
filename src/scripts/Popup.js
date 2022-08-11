import { openPopup, closePopup } from "./utils";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  // Open popup function
  open() {
    openPopup(this._popup);
  }

  close() {
    closePopup(this._popup);
  }

  export _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup
      .querySelector(".modal__close-button")
      .addEventListener("click", close);
  }

  // Close modal window by clicking on overlay
  closePopupOnRemoteClick(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
}

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  // Open popup function
  open() {
    this._popup.classList.add("modal_opened");
    this._popup.addEventListener("mousedown", closePopupOnRemoteClick);
    document.addEventListener("keydown", _handleEscClose);
  }

  close() {
    this._popup.classList.remove("modal_opened");
    this._popup.removeEventListener("mousedown", closePopupOnRemoteClick);
    document.removeEventListener("keydown", _handleEscClose);
  }

  _handleEscClose(evt) {
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

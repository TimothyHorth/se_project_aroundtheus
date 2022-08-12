export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  // Close modal window by clicking on overlay
  closePopupOnRemoteClick(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // Open popup function
  open() {
    this._popup.classList.add("modal_opened");
    this._popup.addEventListener("mousedown", (evt) => {
      this.closePopupOnRemoteClick(evt);
    });
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }

  close() {
    this._popup.classList.remove("modal_opened");
    this._popup.removeEventListener("mousedown", (evt) => {
      this.closePopupOnRemoteClick(evt);
    });
    document.removeEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }

  setEventListeners() {
    this._popup
      .querySelector(".modal__close-button")
      .addEventListener("click", () => {
        this.close();
      });
  }
}

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  // Close modal window by clicking on overlay
  closePopupOnRemoteClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };

  // Method for closing popup by pressing Esc key
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  // Open popup
  open() {
    this._popup.classList.add("modal_opened");
    this._popup.addEventListener("mousedown", this.closePopupOnRemoteClick);
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Close popup
  close() {
    this._popup.classList.remove("modal_opened");
    this._popup.removeEventListener("mousedown", this.closePopupOnRemoteClick);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Set EventListeners
  setEventListeners() {
    this._popup
      .querySelector(".modal__close-button")
      .addEventListener("click", () => {
        this.close();
      });
  }
}

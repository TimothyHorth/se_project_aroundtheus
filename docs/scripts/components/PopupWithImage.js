import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageModalTitle = this._popup.querySelector(
      ".modal__title_type_image"
    );
    this._imageModalImage = this._popup.querySelector(".modal__image");
  }

  open(name, link) {
    super.open();
    //Add an image to the popup and the corresponding image src attribute along with a caption for the image
    this._imageModalImage.src = link;
    this._imageModalImage.alt = `Photo of ${name}`;
    this._imageModalTitle.textContent = name;
  }
}

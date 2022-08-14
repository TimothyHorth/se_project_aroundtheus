import Popup from "./Popup.js";
import { imageModalImage, imageModalTitle } from "../utils/Constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
  }

  open(name, link) {
    super.open();
    //Add an image to the popup and the corresponding image src attribute along with a caption for the image
    imageModalImage.src = link;
    imageModalImage.alt = `Photo of ${name}`;
    imageModalTitle.textContent = name;
  }
}

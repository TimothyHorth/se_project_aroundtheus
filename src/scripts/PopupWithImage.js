import Popup from "./Popup.js";
import { imageModalImage } from "./Constants.js";

export default class PopupWithImage extends Popup {
  constructor() {
    super(this._popup);
  }

  open(name, link) {
    super.open();
    //Add an image to the popup and the corresponding image src attribute along with a caption for the image
    imageModalImage.src = link;
    imageModalImage.alt = `Photo of ${name}`;
    this._popup.querySelector(".modal__title").textContent = name;
  }
}

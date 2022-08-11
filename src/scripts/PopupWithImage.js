export default class PopupWithImage extends Popup {
  constructor() {
    super(this._popup);
  }

  open(name, link) {
    super.open();
    //Add an image to the popup and the corresponding image src attribute along with a caption for the image
    const image = this._popup.querySelector(".modal__image");
    image.src = link;
    image.alt = `Photo of ${name}`;
    this._popup.querySelector(".modal__title").textContent = name;
  }
}

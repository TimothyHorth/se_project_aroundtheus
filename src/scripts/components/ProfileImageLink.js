export default class ProfileImageLink {
  constructor(imageSelector) {
    this._imageSelector = imageSelector;
    this._img = document.querySelector(this._imageSelector);
  }

  getProfileImageLink() {
    return {
      link: this._img.src,
    };
  }

  setProfileImage(data) {
    this._img.src = data.link;
  }
}

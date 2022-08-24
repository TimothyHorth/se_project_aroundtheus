export default class UserInfo {
  constructor(data) {
    this._profileName = document.querySelector(data.name);
    this._profileBio = document.querySelector(data.about);
    this._profileAvatar = document.querySelector(data.avatar);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileBio.textContent,
    };
  }

  getAvatar() {
    return {
      link: this._profileAvatar.src,
    };
  }

  setUserInfo(profileValues) {
    this._profileName.textContent = profileValues.name;
    this._profileBio.textContent = profileValues.about;
  }

  setAvatar(profileValue) {
    this._profileAvatar.src = profileValue;
  }
}

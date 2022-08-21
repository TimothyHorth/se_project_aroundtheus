export default class UserInfo {
  constructor(data) {
    this._profileName = document.querySelector(data.name);
    this._profileBio = document.querySelector(data.bio);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileBio.textContent,
    };
  }

  setUserInfo(profileValues) {
    this._profileName.textContent = profileValues.name;
    this._profileBio.textContent = profileValues.about;
  }
}

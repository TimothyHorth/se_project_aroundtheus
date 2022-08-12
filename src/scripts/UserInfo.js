import { modalProfile } from "./index.js";

export default class UserInfo {
  constructor(data) {
    this._nameSelector = data.name;
    this._bioSelector = data.bio;
    this._profileName = document.querySelector(this._nameSelector);
    this._profileBio = document.querySelector(this._bioSelector);
  }

  getUserInfo() {
    console.log(this._nameSelector);
    return {
      name: this._profileName.textContent,
      bio: this._profileBio.textContent,
    };
  }

  setUserInfo() {
    const profileValues = modalProfile._getInputValues();
    this._profileName.textContent = profileValues.name;
    this._profileBio.textContent = profileValues.bio;
  }
}

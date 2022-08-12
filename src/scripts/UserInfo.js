import { profileName, profileAbout } from "./Constants.js";

export default class UserInfo {
  constructor({ nameSelector, bioSelector }) {
    this._nameSelector = nameSelector;
    this._bioSelector = bioSelector;
  }

  getUserInfo() {
    const name = document.querySelector(nameSelector).textContent;
    const bio = document.querySelector(bioSelector).textContent;
    const currentUserInfo = { name: name, bio: bio };
    return currentUserInfo;
  }

  setUserInfo(newUserInfo) {
    profileName.textContent = newUserInfo.name;
    profileAbout.textContent = newUserInfo.bio;
  }
}

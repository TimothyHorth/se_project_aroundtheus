import { formName, formDescription } from "./index.js";

export default class UserInfo {
  constructor({ nameSelector, bioSelector }) {
    this._nameSelector = nameSelector;
    this._bioSelector = bioSelector;
  }

  getUserInfo() {
    const name = document.querySelector(nameSelector).textContent;
    const bio = document.querySelector(bioSelector).textContent;
    const userInfo = { name: name, bio: bio };
    return userInfo;
  }

  setUserInfo(userInfo) {
    formName.value = userInfo.name;
    formDescription.value = userInfo.bio;
  }
}

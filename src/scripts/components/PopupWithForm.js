import Popup from "./Popup.js";
// import Card from "./Card.js";
// import { handleCardClick } from "../../pages/index.js";
// import {
//   formName,
//   formDescription,
//   cardTitle,
//   cardImageLink,
// } from "../utils/Constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._popupForm = this._popup.querySelector(".modal__form");
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".form__input")
    );
    this._callback = callback;
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    console.log(this._formValues);
    return this._formValues;
  }

  setInputValues(data) {
    console.log(this._inputList);
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callback();
    });
  }

  close() {
    super.close();
    this._popupForm.reset();

    // I was only using setTimout because you can see the forms reset before the modals
    // are fully closed
    // const delayInMilliseconds = 500;
    // setTimeout(() => {
    //   this._popupForm.reset();
    // }, delayInMilliseconds);
  }
}

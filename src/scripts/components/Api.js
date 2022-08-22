export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _handleServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getWebpageInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._handleServerResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((res) => this._handleServerResponse(res));
  }

  editProfileInfo(profileValues) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: profileValues.name,
        about: profileValues.about,
      }),
    }).then((res) => this._handleServerResponse(res));
  }

  addNewCard(cardValues) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardValues.name,
        link: cardValues.link,
      }),
    }).then((res) => this._handleServerResponse(res));
  }

  editProfileImage(inputValue) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: inputValue.link,
      }),
    }).then((res) => this._handleServerResponse(res));
  }

  deleteCard() {
    fetch(`${this._url}/cards/${card_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._handleServerResponse(res));
  }

  changeLikeCardStatus(cardID, like) {
    return fetch(`${this._url}/cards/like/${cardID}`, {
      method: like ? "PUT" : "DELETE",
      headers: this._headers,
    }).then((res) => this._handleServerResponse(res));
  }
}

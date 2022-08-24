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
    }).then(this._handleServerResponse);
    // so the above liine will automatically send the response to the _handleServerResponse function?
    // similiar to sending evt to a eventlistener callback?
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

  editProfileImage(avatarLink) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then((res) => this._handleServerResponse(res));
  }

  deleteCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._handleServerResponse(res));
  }

  changeLikeCardStatus(cardID, like) {
    return fetch(`${this._url}/cards/likes/${cardID}`, {
      method: !like ? "PUT" : "DELETE",
      headers: this._headers,
    }).then((res) => this._handleServerResponse(res));
  }
}

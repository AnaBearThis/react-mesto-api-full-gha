class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            credentials: "include"
        })
        .then((res) => {
           return this._checkResponse(res)
        });
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            credentials: "include"
        })
        .then((res) => {
            return this._checkResponse(res)
        });
    }

    editProfile(me, job) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: `${me}`,
                about: `${job}`
              }),
            credentials: "include"
        })
        .then((res) => {
            return this._checkResponse(res);
         });
    }

    createCard(input) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: `${input.name}`,
                link: `${input.link}`
              }),
            credentials: "include"
        })
        .then((res) => {
            return this._checkResponse(res)
         });
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: "include"
        })
        .then((res) => {
            return this._checkResponse(res)
         });
    }

    changeLikeCardStatus(cardId, checkLike) {
        if (!checkLike) {
            return fetch(`${this._url}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: this._headers,
                credentials: "include"
            })
            .then((res) => {
                return this._checkResponse(res)
             });
        } else {
            return fetch(`${this._url}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: this._headers,
                credentials: "include"
            })
            .then((res) => {
                return this._checkResponse(res)
             });
        }
    }

    changeAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: `${avatar}`
              }),
            credentials: "include"  
        })
        .then((res) => {
            return this._checkResponse(res)
         });
    }

}

const api = new Api({
    url: 'http://localhost:3000',
    headers: {
        'content-type': 'application/json',
        authorization: '1c3d7c79-b03c-416f-89d5-3375c3a2efb8'
    }
})

export default api;
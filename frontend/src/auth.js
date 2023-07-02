export const BASE_URL = 'http://api.mesto-ana-bear.nomoreparties.sbs';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: email, 
        password: password
    })
  })
  .then((res) => {
    return checkResponse(res);
  })
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({
            email: email, 
            password: password
        })
    })
    .then((res) => {
      return checkResponse(res);
    })
    .then((data) => {
        if (data) {
            return data
        }
    })
}

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: "include"
  })
  .then((res) => {
    return checkResponse(res);
  })
  .then((data) => {
    console.log(data);
    return data
  })
}

export const getContent = () => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include"
    })
    .then((res) => {
      return checkResponse(res);
    })
    .then((data) => {
      return data
    })
  }
import {MOVIES_URL} from "../config/config"

const _checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const getBeatFilmMovies = ()=> {
    return fetch(`${MOVIES_URL}`, {
    })
    .then(_checkResponse)
  }
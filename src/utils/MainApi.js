export const BASE_URL = 'https://api.movies-explorer.gin.nomoredomains.club';

const _checkResponse = (res) => {
    return res.json().then((data)=>{
        if (res.ok) {
            return data
        }
        return Promise.reject(new Error(data.message));
    })
}


export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
        .then(_checkResponse)
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(_checkResponse)
};

export const getUserInfo = () => {
    return fetch(`${BASE_URL}/users/me`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
    })
        .then(_checkResponse)
}

export const updateUserInfo = (name, email) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({ name, email })
    })
        .then(_checkResponse)
}

export const getMyMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
    })
        .then(_checkResponse)
}


export const saveMovie = (data) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
            country: data.country || "название не указано",
            director: data.director || "название не указано",
            duration: data.duration,
            year: data.year || "год не указан",
            description: data.description || "описание не указано",
            image: "https://api.nomoreparties.co/" + data.image.url,
            trailerLink: data.trailerLink,
            nameRU: data.nameRU || "название не указано",
            nameEN: data.nameEN || "название не указано",
            thumbnail: "https://api.nomoreparties.co/" + data.image.formats.thumbnail.url,
            movieId: data.id
        })
    })
        .then(_checkResponse)
}

export const deleteMovie = (id) => {
    return fetch(`${BASE_URL}/movies/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
    })
        .then(_checkResponse)
}
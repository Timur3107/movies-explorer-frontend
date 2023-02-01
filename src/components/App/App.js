import './App.css';
import React, { useState, useEffect } from "react";
import Main from "../Main/Main";
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import Register from "../Register/Register"
import Profile from '../Profile/Profile';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import PageNotFound from '../PageNotFound/PageNotFound';
import * as mainApi from "../../utils/MainApi"
import * as moviesApi from "../../utils/MoviesApi"
import { currentUserContext } from "../../context/currentUserContext";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedRouteForAutorize from '../ProtectedRouteForAutorize/ProtectedRouteForAutorize';

import {
  DURATION_OF_SHORT_FILMS,
  NUMBER_OF_INITIAL_MOVIES_FOR_LARGE_SCREENS,
  NUMBER_OF_INITIAL_MOVIES_FOR_TABLETS,
  NUMBER_OF_INITIAL_MOVIES_FOR_MOBILE,
  NUMBER_OF_LOADED_MOVIES_FOR_LARGE_SCREENS,
  NUMBER_OF_LOADED_MOVIES_FOR_TABLETS,
  NUMBER_OF_LOADED_MOVIES_FOR_MOBILE,
} from "../../config/config"

function App() {
  document.documentElement.lang = "ru";
  const navigate = useNavigate()
  const [errorApi, setErrorApi] = useState("")

  const [loggedIn, setLoggedIn] = useState(true)
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState({ email: "", name: "" })

  const [savedMovie, setSavedMovie] = useState([])
  const [userSavedMovie, setUserSavedMovie] = useState([])
  const [userSavedMovieToRender, setUserSavedMovieToRender] = useState([])

  const [allBeatfilmMovies, setAllBeatfilmMovies] = useState([])
  const [beatfilmMovies, setBeatfilmMovies] = useState([])
  const [beatfilmMoviesToRender, setBeatfilmMoviesToRender] = useState([])
  const [isLoadMoreBthInactive, setIsLoadMoreBthInactive] = useState(false)

  // количество начальных фильмов для разных разрешений 
  const [numberOfInitialMovies, setNumberOfInitialMovies] = useState(0)
  // количество подгружаемых фильмов при нажатии на кнопку loadMore для разных разрешений
  const [numberOfLoadedMovies, setNumberOfLoadedMovies] = useState(0)

  const [isCheckedForSavedMovies, setIsCheckedForSavedMovies] = useState(false)
  const [filmRequestForSavedMovies, setFilmRequestForSavedMovies] = useState('')

  // добавляю слушатель, чтобы отслеживать ширину дисплея
  window.addEventListener("resize", () => {
    setTimeout(() => {
      setTimeout(widthDisplayCheck, 100);
    }, 1000)
  })

  // при загрузки страницы проверяю токен авторизации и ширину дисплея
  useEffect(() => {
    tokenCheck()
    widthDisplayCheck(numberOfInitialMovies, filmRequestForSavedMovies)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // при загрузки страницы проверяю искал ли уже пользователь фильмы и фильми с чекбоксом короткометражки, если да, то отрисовываю их
  useEffect(() => {
    const moviesIsChecked = JSON.parse(localStorage.getItem('filteredMovieIsChecked'))
    if (moviesIsChecked) {
      setBeatfilmMovies(moviesIsChecked)
    } else {
      const movies = JSON.parse(localStorage.getItem('filteredMovie'))
      if (movies) {
        setBeatfilmMovies(movies)
      }
    }
  }, [])

  // проверяю длину массива с карточками и в зависимости от этого скрываю или показываю кнопку ещё
  useEffect(() => {
    if (beatfilmMovies.length === 0 || beatfilmMovies.length <= numberOfInitialMovies) {
      setIsLoadMoreBthInactive(true)
    } else {
      setIsLoadMoreBthInactive(false)
    }
  }, [beatfilmMovies, numberOfInitialMovies])


  // отрисовываю количество начальных карточек (в зависимости от размера дисплея)
  useEffect(() => {
    setBeatfilmMoviesToRender(beatfilmMovies.slice(0, numberOfInitialMovies))
  }, [numberOfInitialMovies, beatfilmMovies])


  // получаю карточки со своего API
  const getMyMovies = () => {
    setIsLoading(true)
    mainApi.getMyMovies().then((data) => {
      setSavedMovie(data.data)
    })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // после изменений в сохраненных карточках выполняем функцию фильтрации
  useEffect(() => {
    filterUserSavedMovie()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMovie])

  // функция, которая фильтрует сохраненные карточки, чтобы найти карточки текущего пользователя
  const filterUserSavedMovie = () => {
    setUserSavedMovie(savedMovie.filter((item) => {
      return item.owner === currentUser.data._id
    }))
  }

  // после изменений в сохраненных карточках позьзователя выполняем функцию фильтрации
  useEffect(() => {
    filterUserSavedMovieForRequest(isCheckedForSavedMovies)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSavedMovie])

  // функция, которая фильтрует сохраненные карточки пользователя, чтобы найти карточки по запросу
  const filterUserSavedMovieForRequest = (isChecked, requestSavedMovies = false) => {
    if (requestSavedMovies) {
      const userSavedMovieFiltered = userSavedMovie.filter(item => {
        return item.nameRU.toLowerCase().includes(requestSavedMovies.toLowerCase())
      })

      if (isChecked) {
        const newMovies = userSavedMovieFiltered.filter(item => item.duration <= DURATION_OF_SHORT_FILMS)
        setUserSavedMovieToRender(newMovies)
      } else {
        setUserSavedMovieToRender(userSavedMovieFiltered)
      }

    } else {
      if (isChecked) {
        const newMovies = userSavedMovie.filter(item => item.duration <= DURATION_OF_SHORT_FILMS)
        setUserSavedMovieToRender(newMovies)
      } else {
        setUserSavedMovieToRender(userSavedMovie)
      }
    }
  }

  // проверка наличия токена авторизации
  const tokenCheck = () => {
    setIsLoading(true)
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      mainApi.getUserInfo().then((data) => {
        if (data) {
          setLoggedIn(true)
          setCurrentUser(data)
          getMyMovies()
          return true
        }
      })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      handleLogOut()
      return false
    }
  }

  // вход в аккаунт
  const handleLogin = (data) => {
    setIsLoading(true)
    mainApi.login(data.email, data.password).then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token)
        setLoggedIn(true)
        tokenCheck()
        navigate("/movies")
      }
    })
      .catch((error) => {
        console.log(error.message)
        setErrorApi(error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // регистрация нового пользователя
  const handleRegister = (data) => {
    setIsLoading(true)
    mainApi.register(data.name, data.email, data.password).then((res) => {
      if (res.data._id || res.data.email) {
        handleLogin(data)
      }
    })
      .catch((error) => {
        console.log(error.message)
        setErrorApi(error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // обновление данных пользователя
  const handleUpdateUser = (data) => {
    setIsLoading(true)
    mainApi.updateUserInfo(data.name, data.email).then((user) => {
      setCurrentUser(user)
    })
      .catch((error) => {
        console.log(error.message)
        setErrorApi(error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // выход из системы
  const handleLogOut = () => {
    localStorage.clear()
    setLoggedIn(false)
    setSavedMovie([])
    setUserSavedMovie([])
    setBeatfilmMovies([])
    setAllBeatfilmMovies([])
    setBeatfilmMoviesToRender([])
  }


  // обработчик на переключатель "короткометражки"
  const handleChangeCheckbox = (isChecked) => {
    localStorage.setItem('isChecked', isChecked)
    // console.log(localStorage.getItem('isChecked'))
    const oldMovies = JSON.parse(localStorage.getItem('filteredMovie'))
    if (oldMovies) {
      if (isChecked) {
        const newMovies = oldMovies.filter(item => item.duration <= DURATION_OF_SHORT_FILMS)
        setBeatfilmMovies(newMovies)
        localStorage.setItem("filteredMovieIsChecked", JSON.stringify(newMovies))
      }
      else {
        setBeatfilmMovies(oldMovies)
        localStorage.removeItem("filteredMovieIsChecked")
      }
    }
  }

  // внутренний обработчик обработчика поисковых запросов
  const internalHandleSearch = (allBeatfilmMovies, isChecked, film) => {
    const filteredMovie = allBeatfilmMovies.filter(item => {
      return item.nameRU.toLowerCase().includes(film.toLowerCase())
    })
    setBeatfilmMovies(filteredMovie)
    localStorage.setItem("filteredMovie", JSON.stringify(filteredMovie))
    localStorage.setItem("filteringRequest", JSON.stringify(film))

    if (isChecked) {
      handleChangeCheckbox(isChecked)
    }
  }

  // обработка поискового запроса
  const handleSearch = (film, isChecked) => {
    if (!allBeatfilmMovies.length) {
      setIsLoading(true)
      moviesApi.getBeatFilmMovies().then((data) => {
        setAllBeatfilmMovies(data)
        internalHandleSearch(data, isChecked, film)
      })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      internalHandleSearch(allBeatfilmMovies, isChecked, film)
    }
  }

  // обработка поискового запроса для сохраненных карточек
  const handleSearchForSavedMovies = (film, isChecked) => {
    setFilmRequestForSavedMovies(film)
    const filteredMovie = userSavedMovie.filter(item => {
      return item.nameRU.toLowerCase().includes(film.toLowerCase())
    })
    setUserSavedMovieToRender(filteredMovie)

    if (isChecked) {
      handleChangeCheckboxForSavedMovies(isChecked, film)
    }
  }

  // обработчик на переключатель "короткометражки" сохраненных карточек
  const handleChangeCheckboxForSavedMovies = (isChecked, film = false) => {
    const oldMovies = userSavedMovieToRender
    if (oldMovies) {
      if (film || filmRequestForSavedMovies) {
        filterUserSavedMovieForRequest(isChecked, film || filmRequestForSavedMovies)
      } else {
        filterUserSavedMovieForRequest(isChecked)
      }
    }
  }

  // проверка размера дисплея
  const widthDisplayCheck = (numberOfInitialMovies) => {
    if (window.innerWidth >= 1280) {
      if (numberOfInitialMovies === 0) {
        setNumberOfInitialMovies(NUMBER_OF_INITIAL_MOVIES_FOR_LARGE_SCREENS)
      }
      setNumberOfLoadedMovies(NUMBER_OF_LOADED_MOVIES_FOR_LARGE_SCREENS)
    } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      if (numberOfInitialMovies === 0) {
        setNumberOfInitialMovies(NUMBER_OF_INITIAL_MOVIES_FOR_TABLETS)
      }
      setNumberOfLoadedMovies(NUMBER_OF_LOADED_MOVIES_FOR_TABLETS)
    } else {
      if (numberOfInitialMovies === 0) {
        setNumberOfInitialMovies(NUMBER_OF_INITIAL_MOVIES_FOR_MOBILE)
      }
      setNumberOfLoadedMovies(NUMBER_OF_LOADED_MOVIES_FOR_MOBILE)
    }
  }

  // показать больше фильмов (кнопка "ещё")
  const handleLoadMoreMovies = () => {
    widthDisplayCheck(numberOfInitialMovies)
    // console.log(numberOfLoadedMovies, numberOfInitialMovies)
    const startSlice = beatfilmMoviesToRender.length
    const endSlice = startSlice + numberOfLoadedMovies
    setBeatfilmMoviesToRender([...beatfilmMoviesToRender, ...beatfilmMovies.slice(startSlice, endSlice)])
    if (endSlice >= beatfilmMovies.length) {
      setIsLoadMoreBthInactive(true)
    }
  }

  // сохранение фильма
  const handleSaveMovie = (movie) => {
    const isSaved = savedMovie.some(item => item.movieId === movie.id && item.owner === currentUser.data._id)
    if (isSaved) {
      handleDeleteMovie(movie)
    } else {
      mainApi.saveMovie(movie).then((data) => {
        setSavedMovie([...savedMovie, data.data])
      })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  // удаление сохраненного фильма
  const handleDeleteMovie = (movie) => {
    const newSavedMovie = savedMovie.find(item => (item.movieId === movie.id || item.movieId === movie.movieId) && item.owner === currentUser.data._id)

    mainApi.deleteMovie(newSavedMovie._id)
      .then(() => {
        setSavedMovie(savedMovie.filter((item) => {
          if (movie.id) {
            return item.movieId !== movie.id
          } else {
            return item.movieId !== movie.movieId
          }
        }))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // открытие бургер меню навигации на разрешениях планшетных и мобильных разрешениях экрана
  const handleBurgerMenuOpen = () => {
    setIsBurgerMenuOpen(true)
  }

  // закрытие бургер меню навигации на разрешениях планшетных и мобильных разрешениях экрана
  const handleBurgerMenuClose = () => {
    setIsBurgerMenuOpen(false)
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header loggedIn={loggedIn} handleBurgerMenuOpen={handleBurgerMenuOpen}></Header>
        <Routes>
          <Route path="/" element={<Main></Main>}></Route>

          {/* защищенные роуты */}
          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route path="/movies" element={<Movies isLoading={isLoading} handleChangeCheckbox={handleChangeCheckbox} userSavedMovie={userSavedMovie} isLoadMoreBthInactive={isLoadMoreBthInactive} handleLoadMoreMovies={handleLoadMoreMovies} movies={beatfilmMoviesToRender} handleSearch={handleSearch} handleSaveMovie={handleSaveMovie} handleDeleteMovie={handleDeleteMovie}></Movies>} />
            <Route path="/saved-movies" element={<SavedMovies searchText={filmRequestForSavedMovies} isCheckedForSavedMovies={isCheckedForSavedMovies} setIsCheckedForSavedMovies={setIsCheckedForSavedMovies} handleChangeCheckbox={handleChangeCheckboxForSavedMovies} isLoading={isLoading} movies={userSavedMovieToRender} userSavedMovie={userSavedMovie} handleSearch={handleSearchForSavedMovies} handleDeleteMovie={handleDeleteMovie} handleSaveMovie={handleSaveMovie}></SavedMovies>}></Route>
            <Route path="/profile" element={<Profile errorApi={errorApi} setErrorApi={setErrorApi} isLoading={isLoading} handleUpdateUser={handleUpdateUser} handleLogOut={handleLogOut}></Profile>}></Route>
          </Route>

          <Route element={<ProtectedRouteForAutorize loggedIn={loggedIn} />}>
            <Route path="/signin" element={<Login setErrorApi={setErrorApi} errorApi={errorApi} handleLogin={handleLogin}></Login>}></Route>
            <Route path="/signup" element={<Register setErrorApi={setErrorApi} errorApi={errorApi} handleRegister={handleRegister}></Register>}></Route>
          </Route>
          {/* страница "ничего не найдено" */}
          <Route path='/*' element={<PageNotFound></PageNotFound>}></Route>

        </Routes>
        <Footer></Footer>
        <BurgerMenu isBurgerMenuOpen={isBurgerMenuOpen} onClose={handleBurgerMenuClose}></BurgerMenu>
      </div>
    </currentUserContext.Provider>
  );
}

export default App;

import './App.css';
import React, { useState } from "react";
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

function App() {
  document.documentElement.lang = "ru";

  const [loggedIn, setLoggedIn] = useState(false)
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (data) => {
    console.log(data)
    setLoggedIn(true)
    navigate("/")
  }

  const handleRegister = (data) => {
    console.log(data)
    navigate("/signin")
  }

  const handleUpdateUser = (data) => {
    console.log(data)
  }

  const handleLogOut = () => {
    setLoggedIn(false)
    console.log("вы вышли из системы")
  }

  const handleSearch = (film) => {
    console.log(film)
  }

  const handleSaveMovie = (movie) => {
    console.log(movie)
  }

  const handleDeleteMovie = (movie) => {
    console.log("Вы удалили карточку")
    console.log(movie)
  }

  const handleBurgerMenuOpen = () => {
    setIsBurgerMenuOpen(true)
  }

  const handleBurgerMenuClose = () => {
    setIsBurgerMenuOpen(false)
  }

  return (
    <div className="app">
      <Header loggedIn={loggedIn} handleBurgerMenuOpen={handleBurgerMenuOpen}></Header>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/movies" element={<Movies handleSearch={handleSearch} handleSaveMovie={handleSaveMovie} handleDeleteMovie={handleDeleteMovie}></Movies>}></Route>
        <Route path="/saved-movies" element={<SavedMovies handleSearch={handleSearch} handleDeleteMovie={handleDeleteMovie} handleSaveMovie={handleSaveMovie}></SavedMovies>}></Route>

        <Route path="/profile" element={<Profile handleUpdateUser={handleUpdateUser} handleLogOut={handleLogOut}></Profile>}></Route>
        <Route path="/signin" element={<Login handleLogin={handleLogin}></Login>}></Route>
        <Route path="/signup" element={<Register handleRegister={handleRegister}></Register>}></Route>

        <Route path='/*' element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
      <Footer></Footer>
      <BurgerMenu isBurgerMenuOpen={isBurgerMenuOpen} onClose={handleBurgerMenuClose}></BurgerMenu>
    </div>
  );
}

export default App;

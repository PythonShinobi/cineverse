// client/src/App.js
import React, { memo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./home/Home"
import Register from './register/Register';
import Login from './login/Login';
import PopularMovies from './popular/Movie';
import NewestReleases from './newest-releases/Movie';
import TopRatedMovies from './top-rated/Movie';
import UpcomingMovies from './upcoming/Movies';
import PopularTVShows from './popular/Shows';

const MemoizedHome = memo(Home);
const MemoizedRegister = memo(Register);
const MemoizedLogin = memo(Login);
const MemoizedPopularMovies = memo(PopularMovies);
const MemoizedNewestReleases = memo(NewestReleases);
const MemoizedTopRatedMovies = memo(TopRatedMovies);
const MemoizedUpcomingMovies = memo(UpcomingMovies);
const MemoizedPopularTVShows = memo(PopularTVShows);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MemoizedHome />} />
        <Route path='/Register' element={<MemoizedRegister />} />
        <Route path='/login' element={<MemoizedLogin />} />
        <Route path='/movies/popular' element={<MemoizedPopularMovies />} />
        <Route path='/movies/newest-releases' element={<MemoizedNewestReleases />} />
        <Route path='/movies/top-rated' element={<MemoizedTopRatedMovies />} />
        <Route path='/movies/upcoming' element={<MemoizedUpcomingMovies />} />
        <Route path='/tv-shows/popular' element={<MemoizedPopularTVShows />} />
      </Routes>
    </BrowserRouter>
  );
};

export default memo(App);
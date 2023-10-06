import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import './styles/custom.css';
import LandingPage from './views/LandingPage';
import AboutGame from './views/AboutGamePage';
import Game from './views/Game';

const App = () => {


  return (

    <div className="relative">
      <div className="dark-bg absolute"></div>
      <div className="background-image absolute top-0 left-0"></div>


      <Routes>
        {/* Defining routes using the Routes component */}
        <Route path='/' element={<LandingPage />} /> {/* Route for the LandingPage view */}
        <Route path='/AboutGame' element={<AboutGame />} /> {/* Route for the GameDetails view */}
        <Route path='/Game' element={<Game />} /> {/* Route for the Game view */}
      </Routes></div>

  );
};

export default App;
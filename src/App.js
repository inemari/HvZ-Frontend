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
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import PrivateRoute from './helpers/PrivateRoute';

const App = () => {


  return (
    <ReactKeycloakProvider authClient={keycloak}>

      <BrowserRouter>
        <div className="relative">
          <div className="dark-bg absolute"></div>
          <div className="background-image absolute top-0 left-0"></div>


          <Routes>
            {/* Defining routes using the Routes component */}
            <Route path='/' element={<LandingPage />} /> {/* Route for the LandingPage view */}
            <Route path='/AboutGame' element={<AboutGame />} /> {/* Route for the GameDetails view */}
</Routes>
            <PrivateRoute path='/Game' element={<Game />} /> {/* Route for the Game view */}

          
        </div>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
};

export default App;
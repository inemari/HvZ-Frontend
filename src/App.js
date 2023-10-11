import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import './styles/custom.css';
import LandingPage from './views/LandingPage';
import AboutGame from './views/AboutGamePage';
import Game from './views/Game';
// import AuthenticatedRoute from './helpers/AuthenticatedRoute';
import { useKeycloak } from '@react-keycloak/web';  // Import useKeycloak
import NavBar from './components/common/NavBar';

const App = () => {
  const { keycloak, initialized } = useKeycloak();  // Use the hook to get keycloak instance
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    if (initialized && keycloak.authenticated !== undefined) {
      setIsAuthenticated(keycloak.authenticated);
    }
  }, [initialized, keycloak]);

  console.log("Authenticated: " + isAuthenticated);

  return (
    <BrowserRouter>
      <div className="relative">
        <div className="dark-bg absolute"></div>
        <div className="background-image absolute top-0 left-0 "></div>
        <NavBar/>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/AboutGame' element={<AboutGame />} />
          <Route path='/Game' element={<Game />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

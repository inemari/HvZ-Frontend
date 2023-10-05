import React from 'react';
import './styles/custom.css'; // Import your custom CSS
import LandingPage from './views/LandingPage';
// import { initialize } from './keycloak';

const App = () => {
  // const [authenticated, setAuthenticated] = useState(false);

  // useEffect(() => {
  //   // Initialize Keycloak when the component mounts
  //   initialize()
  //     .then((authenticated) => {
  //       setAuthenticated(authenticated);
  //     })
  //     .catch((error) => {
  //       console.error('Keycloak initialization error', error);
  //     });
  // }, []);

  return (
    <div className="relative">
      <div className="dark-bg absolute"></div>
      <div className="background-image absolute top-0 left-0"></div>
      <LandingPage />
    </div>
  );
};

export default App;
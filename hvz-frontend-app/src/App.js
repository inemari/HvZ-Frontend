import React from 'react';
import './styles/custom.css'; // Import your custom CSS
import LandingPage from './views/LandingPage';

const App = () => {
  return (
    <div className="relative">
    <div className="dark-bg absolute"></div>
    <div className="background-image absolute top-0 left-0"></div>
    <LandingPage />
  </div>
  );
};

export default App;
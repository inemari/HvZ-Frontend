import React from 'react';
import './styles/custom.css'; // Import your custom CSS
import LandingPage from './views/LandingPage';

const App = () => {
  return (
    <div className="App relative bg-black">
      <div className="background-image absolute top-0 left-0 w-full h-full "></div>
      <LandingPage />
    </div>
  );
};

export default App;

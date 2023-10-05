import React from 'react';
import Button from '../components/common/Button';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://t4.ftcdn.net/jpg/05/78/29/45/360_F_578294552_xgmJ6OSvxYZVwVx6gKl91D3aLaegANrn.jpg')" }}>
      <div className="absolute top-0 left-0 p-4 z-20">
        <h1 className="text-4xl font-bold text-white font-passionOne">Human vs Zombie</h1>
      </div>
      <div className="absolute top-0 right-0 p-4 space-x-2 z-20">
      <Button label="Register" />
        <Button label="Login" />
      </div>
      <div className="absolute top-10 left-0 w-full h-full flex items-center justify-center">
        <div className="w-11/12 h-4/5 bg-black bg-opacity-60 p-10 text-center">
          {/* Add your additional information content here */}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

//biteCodeService.js


import api from './api'


export async function turnHumanIntoZombie(code) {
  try {
    // Send a PUT request to update the player's status to zombie
    const response = await api.put(`/players/by-bitecode,${code}`);
    return response.data;
  } catch (error) {
    console.error('Error updating player status', error);
    throw error;
  }


  // return (
  //   <div>
  //     <h1>Bite Code Feature</h1>

  //     {userRole === 'human' && (
  //       <div>
  //         <h2>Your Bite Code:</h2>
  //         <p>{biteCode}</p>
  //       </div>
  //     )}

  //     {userRole === 'zombie' && <ZombieFeatures />}
  //   </div>
  // );
};


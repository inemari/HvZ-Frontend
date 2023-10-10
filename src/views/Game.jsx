import React from 'react';
import PlayerStatus from '../components/game/PlayerStatus';
import GameMap from '../components/game/GameMap';
import MissionList from '../components/game/MissionList';
import NotificationPanel from '../components/common/NotificationPanel';
import PlayerList from '../components/game/PlayerList';
import GameControls from '../components/game/GameControllers'; 


function Game() {
  // Sample data for demonstration purposes
  const playerStatusData = {
    playerName: 'John Doe',
    playerStatus: 'Alive',
    playerTeam: 'Human',
  };

  const missionData = [
    {
      id: 1,
      name: 'Mission 1',
      description: 'Complete mission 1 objectives.',
    },
    // Add more mission data here
  ];

  const notificationData = ['Notification 1', 'Notification 2', 'Notification 3'];

  const playerListData = [
    {
      id: 1,
      name: 'Player 1',
      avatar: 'player1-avatar.jpg',
      isZombie: false,
    },
    // Add more player data here
  ];

  const handleMissionComplete = () => {
    // Handle mission completion logic
  };

  const handleTeamChat = () => {
    // Handle team chat logic
  };

  return (
    <div className="flex flex-col md:flex-row justify-between space-x-4">
      <div className="md:w-1/3">
        <PlayerStatus {...playerStatusData} />
        <MissionList missions={missionData} />
        <NotificationPanel notifications={notificationData} />
        <PlayerList players={playerListData} />
      </div>
      <div className="md:w-2/3">
        <GameMap />
      </div>
      <div className="md:w-1/4">
        <GameControls
          onMissionComplete={handleMissionComplete}
          onTeamChat={handleTeamChat}
        />
      </div>
    </div>
  );
}

export default Game;

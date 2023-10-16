import { useNavigate } from "react-router-dom";
import GameIMG from "./GameIMG";


const GameCard = ({ game }) => {
    const { title, gameStateString, description } = game;
    const navigate = useNavigate();

    const handleGameClick = (game) => {
        // Save game information to localStorage when a game is clicked
        localStorage.setItem('selectedGame', JSON.stringify(game));

        // Navigate to the "/AboutGame" route
        navigate('/AboutGame');
    };

    return (
        <div className="flex flex-col md:flex-row justify-between bg-customLightBrown bg-opacity-70 shadow-md rounded-xl cursor-pointer w-full max-w-4xl p-3 space-x-3" onClick={() => handleGameClick(game)} >
            <div className="flex flex-row md:flex-col md:w-1/5">
                <GameIMG game={game} />
            </div>
            <div className="flex flex-col  w-full">
                <div className="flex flex-col md:flex-row w-full justify-between">
                    <h5 className="text-xl font-medium text-white ">
                        {title}
                    </h5>
                    <p className="bg-customGreen text-xs md:text-sm font-medium px-2.5 py-1 rounded-full self-start ">
                        {gameStateString}
                    </p>
                </div>
                <p className="text-base text-white">
                    {description}
                </p>
            </div>
        </div >
    );
};


export default GameCard;
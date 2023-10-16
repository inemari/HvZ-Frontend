import GameImage from "./GameImage";


const GameDetails = ({ game }) => {
    const { title, gameStateString, description } = game;

    return (
        <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-row md:flex-col md:w-1/6">
                <GameImage game={game} />
            </div>
            <div className="flex flex-col md:flex-col md:w-5/6">
                <div className="flex flex-col md:flex-row w-full justify-between">
                    <h5 className="text-xl font-medium text-white ">
                        {title}
                    </h5>
                    <p className="bg-blue-100 p-1 md:p-2 text-blue-800 text-xs font-medium px-2.5 rounded-full dark:bg-blue-900 dark:text-blue-300 self-start ">
                        {gameStateString}
                    </p>
                </div>
                <p className="text-base text-white">
                    {description}
                </p>
            </div>
        </div>
    );
};


export default GameDetails;

import '../../styles/custom.css';

const GameDetails = ({ game }) => {

    return (
        <div className="flex flex-col md:flex-row ">
            <div className="flex flex-row md:flex-col  p-6 pb-0 md:p-3">
                <img className="rounded  aspect-square md:max-h-36" src={game.pictureURL} alt={game.title} />
            </div>
            <div className="flex flex-col md:flex-col relative w-full p-6 md:p-3 pt-3">
                <div className="flex flex-row w-full justify-between">
                    <h5 className="text-xl font-medium text-white mb-2">
                        {game.title}
                    </h5>
                    <p className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 self-start">
                        {game.gameState}
                    </p>
                </div>
                <p className="text-base text-white">
                    {game.description}
                </p>

            </div>
        </div>

    );
};

export default GameDetails;
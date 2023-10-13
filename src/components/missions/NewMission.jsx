

const NewMission = ({ x, y, missionId }) => (
    <div
        className="absolute bg-red-500 text-white aspect-square text-center flex flex-col justify-center p-1 rounded-full cursor-pointer"
        style={{
            left: `${x}px`, // Use 'px' units for left
            top: `${y}px`, // Use 'px' units for top
        }}
    >
        M{missionId}
    </div>
);

export default NewMission;




// EKSEMPEL PÅ EN START AV IMPLEMENTASJON AV EDITGAME, MYE CHATGPT HER DA SÅ MÅ ORDNES


// import React, { useState, useEffect } from 'react';
// import CustomBtn from '../components/common/CustomButton';
// import { useNavigate, useParams } from 'react-router-dom';
// import GameImage from '../components/game/GameIMG';
// import ModalContainer from '../components/common/ModalContainer';
// import clearSessionStorageData from '../helpers/SessionStorageUtils';
// import Container from '../components/common/Container';
// import Map from '../components/map/Map';
// import arrow from '../assets/ui/arrow.png';
// import Carousel from '../components/common/Carousel';
// import CustomButton from '../components/common/CustomButton';
// import editIcon from '../assets/ui/edit.png';

// function EditGame() {
//     const { gameId } = useParams(); // You may need to define a route parameter for gameId
//     const [gameDetails, setGameDetails] = useState({}); // State for the game details
//     const [showModal, setShowModal] = useState(false);

//     const navigate = useNavigate();

//     const handleEditButtonClick = () => {
//         setShowModal(true);
//     };

//     const handleCloseModal = () => {
//         setShowModal(false);
//     };

//     useEffect(() => {
//         // Fetch the game details using the gameId
//         // You can make an API request to get the game details here
//         // Update the state with the fetched details
//         const fetchedGameDetails = getGameDetails(gameId); // Implement this function
//         setGameDetails(fetchedGameDetails);

//         clearSessionStorageData();
//     }, [gameId]);

//     const handleSaveChanges = () => {
//         // Implement the logic to save the edited game details
//         // You can make an API request to update the game details
//         // After saving, you can redirect to the "About Game" page or any other page
//     };

//     return (
//         <>
//             <Container>
//                 {/* Display game details and allow editing */}
//                 <div>
//                     <h1 className="text-3xl md:text-4xl font-bold mt-2 pr-3">{gameDetails.title}</h1>
//                     <p className="bg-customGreen text-xs mt-0 self-center font-medium px-2.5 py-2 rounded-full w-fit">
//                         {gameDetails.gameStateString}
//                     </p>
//                     {/* Render other game details here using gameDetails object */}
//                 </div>

//                 {/* Display the edit button */}
//                 <div className="z-20 bottom-0 right-0 absolute p-12 pb-24 py-2">
//                     <CustomButton label="Edit Game" icon={editIcon} iconPosition="after" onClick={handleEditButtonClick} />
//                 </div>
//             </Container>

//             <UserNameModal showModal={showModal} handleCloseModal={handleCloseModal} />
//         </>
//     );
// }

// export default EditGame;

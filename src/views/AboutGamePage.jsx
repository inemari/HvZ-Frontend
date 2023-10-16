import React, { useState } from 'react';
import CustomBtn from '../components/common/CustomButton';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import GameImage from '../components/game/GameIMG';
import UserNameModal from '../components/game/UserNameModal';
import ModalContainer from '../components/common/ModalContainer';
import Container from '../components/common/Container';
import Map from '../components/map/Map';
import Carousel from '../components/common/Carousel';

function AboutGame() {
    const navigate = useNavigate();
    const { keycloak } = useKeycloak();

    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const selectedGame = JSON.parse(localStorage.getItem('selectedGame'));

    return (
        <Container className="max-h-3/4">
            <h1 className="text-3xl md:text-4xl font-bold p-5 ">{selectedGame.title}</h1>
            <p className="bg-customGreen text-xs mb-4 mr-0 self-center font-medium px-2.5 py-1 rounded-full">{selectedGame.gameStateString}</p>

            <div className="grid grid-cols-5 gap-6">

                <Carousel className="">
                    <GameImage game={selectedGame} />
                    <Map className="aspect-square" />
                </Carousel>


                {selectedGame && (
                    <div className="bg-customLightBrown rounded text-lg md:text-xl w-full col-span-3 p-5">
                        <div>
                            <h2 className="font-bold">Description</h2>
                            <p className="text-base ">{selectedGame.description}</p>
                        </div>

                        {keycloak.authenticated && (
                            <div className=" mb-0">
                                <CustomBtn onClick={handleButtonClick} label="Join Game" className="w-fit" />
                            </div>
                        )}
                    </div>
                )}
            </div>

            {showModal && (
                <ModalContainer showModal={showModal} closeModal={handleCloseModal}>
                    <UserNameModal onClose={handleCloseModal} />
                </ModalContainer>
            )}
        </Container>
    );
}

export default AboutGame;

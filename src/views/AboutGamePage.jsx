// AboutGame.js

import React, { useState, useEffect } from 'react';
import CustomBtn from '../components/common/CustomButton';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import GameImage from '../components/game/GameIMG';
import UserNameModal from '../components/game/UserNameModal';
import ModalContainer from '../components/common/ModalContainer';
import clearSessionStorageData from '../helpers/SessionStorageUtils';
import Container from '../components/common/Container';
import Map from '../components/map/Map';
import arrow from '../assets/icons/arrow.png';
import Carousel from '../components/common/Carousel';
import { useFetchGameRules } from '../services/ruleService';

function AboutGame() {
    const { keycloak } = useKeycloak();
    const selectedGame = JSON.parse(localStorage.getItem('selectedGame'));
    const [showModal, setShowModal] = useState(false);
    const gameRules = useFetchGameRules(selectedGame?.ruleIds || []); // Using the custom hook

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        clearSessionStorageData();
    }, []);

    return (
        <Container>
            <div className='flex flex-row w-full justify-between '>
                <h1 className="text-3xl md:text-4xl font-bold col-span-4 ">{selectedGame?.title}</h1>
                <p className="bg-customGreen text-xs  self-center font-medium px-2.5 py-1 rounded-full ">{selectedGame?.gameStateString}</p>
            </div>

            <div className="lg:grid md:grid-cols-3 gap-5 w-full relative p-5">
                <Carousel className="lg:col-span-full ">
                    <GameImage game={selectedGame} />
                    <Map />
                </Carousel>

                {selectedGame && (
                    <div className="bg-customLightBrown rounded lg:col-span-2 ">
                        <div className='space-y-5  p-5 md:p-10'>
                            <div className='space-y-2'>
                                <h2 className="text-lg font-bold ">Description</h2>
                                <p className="text-base ">{selectedGame.description}</p>
                            </div>

                            {gameRules.map((rule, index) => (
                                <div className='space-y-2' key={index}>
                                    <h2 className="text-lg font-bold">Rules</h2>
                                    <ul className="list-disc list-inside pl-5">
                                        <p><b>{rule.title}</b></p>
                                        <li>
                                            {rule.description}
                                        </li>
                                    </ul>
                                </div>
                            ))}

                        </div>

                        {keycloak.authenticated && (
                            <div className="absolute bottom-0 right-0 w-full m-5">
                                <div dir="rtl" className="static mb-0 p-5 w-full">
                                    <CustomBtn onClick={handleButtonClick} label="Join Game" className="start-0 mb-0 static text-lg" icon={arrow} />
                                </div>
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

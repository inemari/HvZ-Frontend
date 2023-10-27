// DashBoard.js
import React, { useState } from 'react';
import Container from '../../components/common/Container';
import NewGameBtn from '../../components/admin/newGameBtn';
import CustomButton from '../../components/common/CustomButton';
import editIcon from "../../assets/ui/edit.png";
import ChooseGameModal from '../../components/admin/editGame/ChooseGameModal';
import CustomInput from '../../components/common/CustomInput';


function Dashboard() {
    const [isModalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <Container>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 w-full border-b pb-2 text-center">DashBoard</h1>
            <div className="mx-auto grid grid-cols-2 my-auto gap-5 h-fit">
                <div className='bg-red-500 space-y-3 px-3 text-center'>
                    <h2 className="text-1xl md:text-2xl font-bold mb-2 w-full p-2">Manage games</h2>
                    <NewGameBtn />
                    <CustomButton
                        label={"Edit game"}
                        icon={editIcon}
                        iconPosition={"after"}
                        onClick={openModal}
                        rounded={"3xl"}
                    />
                </div>
                <div className='bg-red-500 space-y-3 x-3 px-3 text-center '>
                    <h2 className="text-1xl md:text-2xl font-bold mb-2 w-full p-2">Manage players</h2>
                    <p>Edit player state</p>
                    <CustomInput></CustomInput>
                    <CustomButton label="gdrdgfdgd"></CustomButton>
                </div>
            </div>
            {isModalVisible && (
                <ChooseGameModal closeModal={closeModal} />
            )}
        </Container>
    );
}

export default Dashboard;

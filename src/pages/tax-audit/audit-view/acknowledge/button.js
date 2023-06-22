import React, { useState } from 'react';
import AcknModal from './acknmodal';


const NewAckButton = ({id}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={openModal}>
                New Acknowledgement
            </button>
            <AcknModal isOpen={isModalOpen} closeModal={closeModal} id={id} />
        </>
    );
};

export default NewAckButton;

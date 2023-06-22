import React, { useState } from 'react';
import AcknModal from './acknmodal';


const NewAckButton = ({JobID, Notifid}) => {
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
            <AcknModal isOpen={isModalOpen} closeModal={closeModal} Notifid={Notifid} JobID={JobID}/>
        </>
    );
};

export default NewAckButton;

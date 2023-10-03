import React, { useState } from 'react';
import CorresModal from './corresmodal';


const NewCorresButton = ({id, auditStartYr, auditEndYr}) => {
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
                New Correspondence
            </button>
            <CorresModal isOpen={isModalOpen} closeModal={closeModal} id={id} />
        </>
    );
};

export default NewCorresButton;

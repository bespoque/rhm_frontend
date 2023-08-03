import React, { useState } from 'react';
import AuditModal from './auditmodal';


const NewAuditReport = ({JobID}) => {
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
                New audit report
            </button>
            <AuditModal isOpen={isModalOpen} closeModal={closeModal} JobID={JobID} />
        </>
    );
};

export default NewAuditReport;

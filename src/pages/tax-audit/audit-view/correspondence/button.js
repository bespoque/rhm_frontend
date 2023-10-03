import React, { useState } from 'react';
import NotificationModal from './notificationmodal';


const NewNotificationButton = ({id, auditStartYr, auditEndYr}) => {
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
                New Notification
            </button>
            <NotificationModal isOpen={isModalOpen} closeModal={closeModal} id={id} auditStartYr={auditStartYr} auditEndYr={auditEndYr} />
        </>
    );
};

export default NewNotificationButton;

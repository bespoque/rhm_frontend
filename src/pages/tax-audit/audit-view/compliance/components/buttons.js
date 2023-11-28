import React, { useState } from 'react';
import { ComplianceModal, NonCompliance, NotificationModals, SpecialNonComp } from './complianceModals';
import { shallowEqual, useSelector } from 'react-redux';
import jwt from "jsonwebtoken";

const ComplianceButtons = ({ id, auditStartYr, auditEndYr }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenSpecial, setIsModalOpenSpecial] = useState(false);
    const [isModalOpenNon, setIsModalOpenNon] = useState(false);

    const { auth } = useSelector(
        (state) => ({
            auth: state.authentication.auth,
        }),
        shallowEqual
    );

    const decoded = jwt.decode(auth);
    const emailAdd = decoded.user

    const openModalNon = () => {
        setIsModalOpenNon(true);
    };
    const openModalSpecialNon = () => {
        setIsModalOpenSpecial(true);
    };
    const openModalComp = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const closeModalSpecial = () => {
        setIsModalOpenSpecial(false);
    };
    const closeModalNon = () => {
        setIsModalOpenNon(false);
    };

    return (
        <>
            <button
                className="btn text-dark btn-default btn-outlined bg-transparent rounded-md"
                type="submit"
                onClick={openModalNon}
            >
                CREATE NON-COMPLIANCE
            </button>
            <button
                className="btn btn-default text-dark btn-outlined bg-transparent rounded-md"
                type="submit"
                onClick={openModalSpecialNon}
            >
                CREATE SPECIAL NON-COMPLIANCE
            </button>
            <button
                className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                type="submit"
                onClick={openModalComp}
            >
                CREATE COMPLIANCE
            </button>

            <NonCompliance isOpen={isModalOpenNon} closeModal={closeModalNon} id={id}  />
            <SpecialNonComp isOpen={isModalOpenSpecial} closeModal={closeModalSpecial} id={id}  />
            <ComplianceModal isOpen={isModalOpen} closeModal={()=>closeModal()} id={id} />
        </>
    );
};

export default ComplianceButtons;

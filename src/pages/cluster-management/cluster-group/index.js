import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SectionTitle from '../../../components/section-title';
import Modal from 'react-modal';

const index = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [inputValue, setInputValue] = useState(null);
    const [emailValue, setEmailValue] = useState(null);
    const [atminputValue, setAtmInputValue] = useState('');
    const [atmemailValue, setAtmEmailValue] = useState('');
    const [clickATM, setClickATm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [jsonData, setJsonData] = useState(null);

    const router = useRouter()
    const { register, handleSubmit, errors } = useForm();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAtmInputChange = (event) => {
        setAtmInputValue(event.target.value);
    };

    const handleButtonClick = () => {
        setClickATm(false)
        if (inputValue === "") {
            alert("Please select a cluster head")
        } else {
            setShowModal(true);
            fetchData();

        }
    };

    const handleButtonATM = () => {
        setClickATm(true)
        if (atminputValue === "") {
            alert("Please select a cluster ATM")
        } else {
            setShowModal(true);
            fetchAtmData();
        }
    };
    
    const fetchData = () => {

        const requestBody = {
            param: inputValue
        };

        fetch('https://bespoque.dev/rhm/cluster/users-get.php', {
            method: 'POST',
            body: JSON.stringify(requestBody)
        })
            .then((response) => response.json())
            .then((data) => setJsonData(data.body))
            .catch((error) => console.log(error));
    };

    const fetchAtmData = () => {
        const requestBody = {
            param: atminputValue
        };

        fetch('https://bespoque.dev/rhm/cluster/users-get.php', {
            method: 'POST',
            body: JSON.stringify(requestBody)
        })
            .then((response) => response.json())
            .then((data) => setJsonData(data.body))
            .catch((error) => console.log(error));
    };

    const handleOptionClick = (option) => {
        if (clickATM) {
            setAtmInputValue(option.name);
            setAtmEmailValue(option.email);
            setShowModal(false);
        } else {
            setInputValue(option.name);
            setEmailValue(option.email);
            setShowModal(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };


    async function onSubmit(formData) {
        setIsSubmitting(true)
        try {
            const response = await fetch('https://bespoque.dev/rhm/cluster/cluster-new.php', {
                method: 'POST',
                body: JSON.stringify(formData)
            })

            const dataFetch = await response.json()
            toast.success(dataFetch.message);
            router.push('/cluster-management/cluster-group/list')
        } catch (error) {
            console.error('Server Error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <>
            <SectionTitle subtitle="Create cluster" />
            <ToastContainer />
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                contentLabel="Options Modal"
                className="bg-white rounded p-4 max-w-sm border mx-auto"
                overlayClassName="fixed inset-20 opacity-100"
            >
                {jsonData ? (
                    <ul>
                        {jsonData.map((option) => (
                            <li
                                key={option.id}
                                onClick={() => handleOptionClick(option)}
                                className="cursor-pointer p-2 hover:bg-gray-100"
                            >
                                {option.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading data...</p>
                )}
            </Modal>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:w-2/2 w-full max-w-md mx-auto  rounded-xl overflow-hidden md:max-w-2xl p-4">
                <div>
                    <div className="grid grid-cols-2 gap-2 my-3">
                        <div>
                            <label htmlFor="cluster_name" className="block mb-1">Cluster Name:</label>
                            <input
                                required
                                type="text"
                                id="cluster_name"
                                name="cluster_name"
                                className="border border-gray-300 p-2 w-full"
                                ref={register()}
                            />
                        </div>

                        <div>
                            <label htmlFor="cluster_status" className="block mb-1">Cluster Status:</label>
                            <select
                                required
                                id="cluster_status"
                                name="cluster_status"
                                className="border border-gray-300 w-full"
                                ref={register()}
                            >
                                <option value="">Select a status</option>
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="INACTIVE">INACTIVE</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block mb-1">Cluster Head:</label>
                            <input
                                required
                                type="text"
                                placeholder='enter email'
                                value={inputValue}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 w-full"
                            />
                            <input
                                required
                                readOnly
                                type="text"
                                id="cluster_head"
                                name="cluster_head"
                                value={emailValue}
                                className="border border-gray-300 p-2 mt-2 w-full"
                                ref={register()}
                            />

                            <span className="flex justify-center text-blue-600 font-bold py-2 px-4 
                            rounded focus:outline-none bg-blue-100 hover:bg-blue-200
                            focus:shadow-outline cursor-pointer mt-2" onClick={handleButtonClick}><p>Search Cluster Head</p></span>
                        </div>
                        <div>
                            <label className="block mb-1">Area Tax Manager:</label>
                            <input
                                required
                                type="text"
                                placeholder='enter email'
                                value={atminputValue}
                                onChange={handleAtmInputChange}
                                className="border border-gray-300 p-2 w-full"
                            />
                            <input
                                required
                                readOnly
                                type="text"
                                id="cluster_atm"
                                name="cluster_atm"
                                value={atmemailValue}
                                className="border border-gray-300 p-2 mt-2 w-full"
                                ref={register()}
                            />

                            <span className="flex justify-center text-blue-600 font-bold py-2 px-4 
                        rounded focus:outline-none bg-blue-100 hover:bg-blue-200
                        focus:shadow-outline cursor-pointer mt-2" onClick={handleButtonATM}><p>Search ATM</p></span>
                        </div>
                    </div>
                    <div class="mt-4 flex justify-center">
                        <button
                            className={`${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-400 hover:bg-blue-700'
                                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Create'}
                        </button>
                    </div>

                </div>
            </form>
        </>
    )
}
export default index
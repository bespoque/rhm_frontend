import React, { useEffect, useState } from 'react'
import SectionTitle from '../../../../components/section-title';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

const Index = () => {
    const [clusterData, setClusterData] = useState(() => []);
    const [inputValue, setInputValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [jsonData, setJsonData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {

        async function fetchPost() {
            try {
                const response = await fetch('https://bespoque.dev/rhm/cluster/clusters-batch.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "process": "okay",
                    })
                })

                const dataFetch = await response.json()
                setClusterData(dataFetch.body)
            } catch (error) {
                console.error('Server Error:', error)
            } finally {
            }
        }
        fetchPost();
    }, []);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = () => {
        if (inputValue === "") {
            alert("Please select a cluster head")
        } else {
            setShowModal(true);
            fetchData();

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

    const handleOptionClick = (option) => {
        setInputValue(option.name);
        setEmailValue(option.email);
        setShowModal(false);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    async function onSubmit(formData) {
        console.log("formData", formData);
        setIsSubmitting(true)

        try {
            const response = await fetch('https://bespoque.dev/rhm/cluster/cluster-users-new.php', {
                method: 'POST',
                body: JSON.stringify({
                    "cluster_id": formData.cluster_id,
                    "staffid": formData.staffid,
                    "status": formData.status,
                })
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
            <ToastContainer />
            <SectionTitle title="Add user to cluster" />

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
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
                <div className="grid grid-cols-3 gap-2">
                    <div>
                        <label className="block mb-1">Cluster</label>
                        <select
                            className="border border-gray-300 p-2 w-full"
                            required
                            name='cluster_id'
                            ref={register()}
                        >
                            <option value="">Select Cluster</option>
                            {clusterData.map((cluster) => <option key={cluster.id} value={cluster.id}>{cluster.cluster_name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Staff Email:</label>
                        <input
                            required
                            type="text"
                            placeholder='enter email'
                            className="border border-gray-300 p-2 w-full"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <input
                            required
                            type="text"
                            name="staffid"
                            className="border border-gray-300 p-2 mt-2 w-full"
                            value={emailValue}
                            ref={register()}
                        />

                        <span className="flex justify-center text-blue-600 font-bold py-2 px-4 
                        rounded focus:outline-none bg-blue-100 hover:bg-blue-200
                        focus:shadow-outline cursor-pointer mt-2" onClick={handleButtonClick}><p>Search user</p></span>
                    </div>
                    <div>
                        <label htmlFor="cluster_status" className="block mb-1">Status:</label>
                        <select
                            required
                            name="status"
                            className="border border-gray-300 p-2 w-full"
                            ref={register()}
                        >
                            <option value="">Select a status</option>
                            <option value="PENDING">Pending</option>
                            <option value="ACTIVE">Active</option>
                        </select>
                    </div>
                </div>
                <div class="mt-4 flex justify-center">
                    <button
                        className={`${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-400 hover:bg-blue-700'
                            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Add'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default Index
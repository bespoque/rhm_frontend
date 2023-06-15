import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProcessorSpinner } from '../../../components/spiner';
import setAuthToken from '../../../functions/setAuthToken';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import SectionTitle from '../../../components/section-title';
import { shallowEqual, useSelector } from 'react-redux';
import url from '../../../config/url'
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const CreateJob = () => {
    const [taxId, setTaxId] = useState('');
    const [validationResult, setValidationResult] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [jsonData, setJsonData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const { register, handleSubmit, errors } = useForm();
    const [tpDetail, setTpDetail] = useState({})
const router = useRouter()
    const { auth } = useSelector(
        (state) => ({
            auth: state.authentication.auth,
        }),
        shallowEqual
    );

    const decoded = jwt.decode(auth);
    const emailAdd = decoded.user

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleTaxIdChange = (e) => {
        const { value } = e.target;
        const onlyNumbers = value.replace(/[^0-9]/g, '');
        setTaxId(onlyNumbers);
    };
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const handleButtonClick = () => {
        if (inputValue === "") {
            alert("Please Job to a user")
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


    setAuthToken()
    const validateTP = async (taxId) => {
        setIsFetching(true)
        try {
            const response = await axios.post(`${url.BASE_URL}taxpayer/view-taxpayers`, {
                KGTIN: taxId
            });
            setIsFetching(false)
            setTpDetail(response.data.body)
            setValidationResult(response.data.body.tp_name);
        } catch (error) {
            setIsFetching(false)
            if (error.response) {
                setValidationResult(error.response.data.message);
            } else {
                console.error('Error occurred while validating Tax ID:', error);
            }
        }
    };

    useEffect(() => {
        if (taxId.length === 10) {
            validateTP(taxId);
        }
    }, [taxId]);


    async function onSubmit(jobdata) {
        jobdata.job_kgtin = tpDetail?.KGTIN
        jobdata.job_start_status = "Pending"
        jobdata.job_progress_status = "Pending"
        jobdata.job_initiator = emailAdd

        setIsFetching(true)
        try {
            const response = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-newjob.php', {
                method: 'POST',
                body: JSON.stringify(jobdata)
            })
            setIsFetching(false)
            const dataFetch = await response.json()
            toast.success(dataFetch.message);
            router.push("/tax-audit/all-jobs")
        } catch (error) {
            console.error('Server Error:', error)
            setIsFetching(false)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <ToastContainer />
            <SectionTitle title={"Create new Job"} />
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
            {isFetching && <ProcessorSpinner />}
            <div className="mx-auto mt-8">
                <form onSubmit={validateTP} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taxId">
                            Taxpayer ID:
                        </label>
                        <input
                            type="text"
                            id="taxId"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={taxId}
                            onChange={handleTaxIdChange}
                        />
                    </div>
                    {validationResult && (
                        <div>
                            <pre>{JSON.stringify(validationResult, null, 2)}</pre>
                        </div>
                    )}
                </form>

                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
                    <div className="grid grid-cols-2 mx-auto  max-w-md mb-4">
                        <div>
                            <label htRmlFor="cluster_status" className="block mb-1">Job Type:</label>
                            <select
                                required
                                id="job_job_type"
                                name="job_job_type"
                                className="border border-gray-300"
                                ref={register()}
                            >
                                <option value="">Select type</option>
                                <option value="TACC">TACC</option>
                                <option value="Tax audit only">Tax Audit Only</option>
                            </select>
                        </div>
                        {/* <div className="place-self-center">
                            <label className="block mb-1">Upload audit doc:</label>
                            <input type="file" onChange={handleFileChange} />
                        </div> */}
                        <div>
                            <label  className="block mb-1">Job start date:</label>
                            <input className="flex justify-center"
                                type="date"
                                name="job_startdate"
                                ref={register()}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                        <div>
                            <label className="block mb-1">Audit start date:</label>
                            <input
                                required
                                type="date"
                                id="job_auditdate_start"
                                name="job_auditdate_start"
                                className="border border-gray-300 w-full"
                                ref={register()}
                            />

                        </div>
                        <div>
                            <label className="block mb-1">Job Owner:</label>
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
                                type="text"
                                id="job_user"
                                name="job_user"
                                value={emailValue}
                                className="border border-gray-300 p-2 mt-2 w-full"
                                ref={register()}
                            />

                            <span className="flex justify-center text-blue-600 font-bold py-2 px-4 
                        rounded focus:outline-none bg-blue-100 hover:bg-blue-200
                        focus:shadow-outline cursor-pointer mt-2" onClick={handleButtonClick}><p>Search user</p></span>
                        </div>


                        <div>
                            <label className="block mb-1">Audit end date:</label>
                            <input
                                required
                                type="date"
                                id="job_auditdate_end"
                                name="job_auditdate_end"
                                className="border border-gray-300 p-2 w-full"
                                ref={register()}
                            />
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
                </form>
            </div>
        </>
    );
};

export default CreateJob;

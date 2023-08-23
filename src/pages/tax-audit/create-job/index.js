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
import { Select, Space } from "antd";

const CreateJob = () => {
    const [taxId, setTaxId] = useState('');
    const [validationResult, setValidationResult] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [jsonData, setJsonData] = useState(null);
    const [kgtinStatus, setKgtinStatus] = useState(true)
    const { register, handleSubmit } = useForm();
    const [tpDetail, setTpDetail] = useState({})
    const [rhmUsers, setRhmUsers] = useState([])
    const [selectedValues, setSelectedValues] = useState([]);
    const router = useRouter()
    const { auth } = useSelector(
        (state) => ({
            auth: state.authentication.auth,
        }),
        shallowEqual
    );

    const handleChange = (values) => {
        // setSelectedValues(values);
        console.log("Selected:", String(values));
    };


    const options = [];
    for (let i = 0; i < rhmUsers.length; i++) {
        options.push({
            value: rhmUsers[i].email,
            label: rhmUsers[i].name,
        });
    }


    const decoded = jwt.decode(auth);
    const emailAdd = decoded.user

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
            setKgtinStatus(false)
            setTpDetail(response.data.body)
            setValidationResult(response.data.body.tp_name);
        } catch (error) {
            setIsFetching(false)
            setKgtinStatus(true)
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
        const fetchPost = async () => {
            try {
                const response = await fetch("https://bespoque.dev/rhm/fix/getRHMUsers.php", {
                    method: 'POST',
                    body: JSON.stringify({
                        "param": "all"
                    })
                })
                const dataFetch = await response.json()
                setRhmUsers(dataFetch.body)
            } catch (error) {
                console.log("error");
                // if (error.response) {

                // } else {

                // }
            }
        }
        fetchPost()
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
                className="bg-white rounded p-4 max-w-sm border overflow-auto mx-auto"
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
                    <div className="grid grid-cols-2 gap-4 mx-auto  max-w-md mb-4">
                        <div>
                            <label className="block mb-1">Job Type:</label>
                            <select
                                required
                                id="job_job_type"
                                name="job_job_type"
                                className="border rounded-md border-gray-300 w-full"
                                ref={register()}
                            >
                                <option value="">Select type</option>
                                <option value="TACC">TACC</option>
                                <option value="Tax audit only">Tax Audit Only</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1">Job start date:</label>
                            <input className="border rounded-md border-gray-300 w-full"
                                type="date"
                                name="job_startdate"
                                ref={register()}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mx-auto gap-4 max-w-md mb-4">
                        <div>
                            <label className="block mb-1">Audit start date:</label>
                            <input
                                required
                                type="date"
                                id="job_auditdate_start"
                                name="job_auditdate_start"
                                className="border rounded-md border-gray-300 w-full"
                                ref={register()}
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Audit end date:</label>
                            <input
                                required
                                type="date"
                                id="job_auditdate_end"
                                name="job_auditdate_end"
                                className="border rounded-md border-gray-300 w-full"
                                ref={register()}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 mx-auto gap-4 max-w-md mb-4">
                        <div>
                            <label className="block mb-1">Action type:</label>
                            <select
                                required
                                name="actionType"
                                className="border rounded-md border-gray-300 w-full"
                                ref={register()}
                            >
                                <option value="">Select type</option>
                                <option value="Audit Visit">Audit Visit</option>
                                <option value="Demand Notice">Demand Notice</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1">Audit end date:</label>
                            <Space
                                direction="vertical"
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Select
                                    mode="multiple"
                                    size={'large'}
                                    placeholder="Please select"
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                    }}
                                    options={options}
                                />
                            </Space>
                        </div>
                    </div>
                    <div class="mt-4 flex justify-center">
                        <button
                            className={`${kgtinStatus ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-400 hover:bg-blue-700'
                                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                            type="submit"
                            disabled={kgtinStatus}
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateJob;

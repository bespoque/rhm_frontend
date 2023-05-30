// import React, { useState } from 'react';
// import Modal from 'react-modal';

// const index = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [jsonData, setJsonData] = useState(null);
// //   const jsonData = {
// //     body: [
// //       {
// //         id: "4",
// //         name: "Prince",
// //         email: "prince.u@bespoque.ng",
// //         phone: "123456789"
// //       },
// //       {
// //         id: "5",
// //         name: "testname",
// //         email: "amrolandbryce@gmail.com",
// //         phone: "0808564756"
// //       },
// //       {
// //         id: "4",
// //         name: "Prince",
// //         email: "prince.u@bespoque.ng",
// //         phone: "123456789"
// //       },
// //       {
// //         id: "5",
// //         name: "testname",
// //         email: "amrolandbryce@gmail.com",
// //         phone: "0808564756"
// //       },

// //     ]
// //   };

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//     const handleButtonClick = () => {
//         if (inputValue === "") {
//             alert("Please select a cluster head")
//         } else {
//             setShowModal(true);
//             fetchData();

//         }
//     };
//     const fetchData = () => {
//         const requestBody = {
//             param: inputValue
//         };

//         fetch('https://bespoque.dev/rhm/cluster/users-get.php', {
//             method: 'POST',
//             body: JSON.stringify(requestBody)
//         })
//             .then((response) => response.json())
//             .then((data) => setJsonData(data.body))
//             .catch((error) => console.log(error));
//     };

//   const handleOptionClick = (option) => {
//     setInputValue(option.name);
//     setShowModal(false);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//         className="border border-gray-300 rounded p-2 mb-2"
//       />
//       <button
//         onClick={handleButtonClick}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Populate Dropdown
//       </button>
//       <Modal
//         isOpen={showModal}
//         onRequestClose={closeModal}
//         contentLabel="Options Modal"
//         className="bg-white rounded p-4 max-w-sm mx-auto"
//         overlayClassName="fixed inset-20 opacity-100"
//       >
//     {jsonData ? (
//                     <ul>
//                         {jsonData.map((option) => (
//                             <li
//                                 key={option.id}
//                                 onClick={() => handleOptionClick(option)}
//                                 className="cursor-pointer p-2 hover:bg-gray-100"
//                             >
//                                 {option.name}
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>Loading data...</p>
//                 )}
//       </Modal>
//       <p>Input value: {inputValue}</p>
//     </div>
//   );
// };

// export default index;




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
    const [definiData, setDefiniData] = useState(() => []);
    const [isFetching, setIsFetching] = useState(() => false);
    const [inputValue, setInputValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [jsonData, setJsonData] = useState(null);

    const router = useRouter()
    const { register, handleSubmit, errors } = useForm();

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
        console.log("data", formData.app_id);
        setIsSubmitting(true)

        try {
            const response = await fetch('https://bespoque.dev/rhm/cluster/cluster-new.php', {
                method: 'POST',
                body: JSON.stringify({
                    "cluster_name": formData.cluster_name,
                    "cluster_head": formData.cluster_head,
                    "cluster_status": formData.cluster_status,
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
            {isFetching && (
                <div className="flex justify-center item mb-2">
                    <Loader
                        visible={isFetching}
                        type="BallTriangle"
                        color="#00FA9A"
                        height={19}
                        width={19}
                        timeout={0}
                        className="ml-2"
                    />
                    <p>Fetching data...</p>
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
                <div className="grid grid-cols-3 gap-2">
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
                            type="text"
                            id="cluster_head"
                            name="cluster_head"
                            value={emailValue}
                            className="border border-gray-300 p-2 mt-2 w-full"
                            ref={register()}
                        />

                        <span className="flex justify-center text-blue-600 font-bold py-2 px-4 
                        rounded focus:outline-none bg-blue-100 hover:bg-blue-200
                        focus:shadow-outline cursor-pointer mt-2" onClick={handleButtonClick}><p>Search user</p></span>
                    </div>

                    <div>
                        <label htmlFor="cluster_status" className="block mb-1">Cluster Status:</label>
                        <select
                            required
                            id="cluster_status"
                            name="cluster_status"
                            className="border border-gray-300 p-2 w-full"
                            ref={register()}
                        >
                            <option value="">Select a status</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
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
                        {isSubmitting ? 'Saving...' : 'Create'}
                    </button>
                </div>
            </form>
        </>
    )
}
export default index
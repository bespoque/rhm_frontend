import React, { useEffect, useState } from 'react';

const Visit = () => {
    const [formData, setFormData] = useState({
        actionType: '',
        visit_team: '',
        visit_date: '',
        visit_compliance: '',
        visit_status: '',
        visit_docs: null,
        visit_docsstatus: null,
        visit_log: null,
        reviewby: null,
        reviewdate: null,
        approveby: null,
        approvedate: null,
    });

    const [data, setData] = useState(null); // State to store the API response

    useEffect(() => {
        // Define the API endpoint
        const apiUrl = 'https://test.rhm.backend.bespoque.ng/taxaudit/taxaudit-notification-visits-single.php';

        // Define the payload
        const payload = {
            job_id: '14',
            notification_id: '16',
            visit_id: '7',
        };

        // Make the API request when the component mounts
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((responseData) => {
                setData(responseData); // Set the response data in the state
                setFormData(responseData.body[0]); // Initialize the form data with the API response
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []); // Empty dependency array ensures this runs once on component mount

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div>
            <p className="font-bold">Visit log</p>
            {/* Your component content here */}
            {/* {data && ( */}
                <div className="flex justify-center">
                    <form className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Action Type</label>
                            <input
                                type="text"
                                name="actionType"
                                value={formData.actionType}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Visit Team</label>
                            <input
                                type="text"
                                name="visit_team"
                                value={formData.visit_team}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Visit Date</label>
                            <input
                                type="text"
                                name="visit_date"
                                value={formData.visit_date}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Visit Compliance</label>
                            <input
                                type="text"
                                name="visit_compliance"
                                value={formData.visit_compliance}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Visit Status</label>
                            <input
                                type="text"
                                name="visit_status"
                                value={formData.visit_status}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Visit Docs</label>
                            <input
                                type="text"
                                name="visit_docs"
                                value={formData.visit_docs || ''}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Visit Docs Status</label>
                            <input
                                type="text"
                                name="visit_docsstatus"
                                value={formData.visit_docsstatus || ''}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Visit Log</label>
                            <input
                                type="text"
                                name="visit_log"
                                value={formData.visit_log || ''}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Review By</label>
                            <input
                                type="text"
                                name="reviewby"
                                value={formData.reviewby || ''}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Review Date</label>
                            <input
                                type="text"
                                name="reviewdate"
                                value={formData.reviewdate || ''}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Approve By</label>
                            <input
                                type="text"
                                name="approveby"
                                value={formData.approveby || ''}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </form>
                </div>
            {/* )} */}
        </div>
    )
}
export default Visit
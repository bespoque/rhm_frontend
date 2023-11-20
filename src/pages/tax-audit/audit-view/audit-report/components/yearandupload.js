import React, { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProcessorSpinner } from '../../../../../components/spiner';

const YearAndUpload = ({ years, selectedScope, checklistItem, checklistItemType, onUpload, JobID, checklistItemID }) => {
    const [selectedYear, setSelectedYear] = useState("");
    const [taxScheduleFiles, setTaxScheduleFiles] = useState(null);
    const [remittanceFiles, setRemittanceFiles] = useState(null);
    const [documentFiles, setDocumentFiles] = useState(null);
    const [amount, setAmount] = useState([]);
    const [isFetching, setIsFetching] = useState(() => false);
   
  

    const { auth } = useSelector(
        (state) => ({
            auth: state.authentication.auth,
        }),
        shallowEqual
    );

    const decoded = jwt.decode(auth);
    const emailAdd = decoded.user

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleTaxScheduleChange = (event) => {
        setTaxScheduleFiles(event.target.files[0]);
    };
    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleRemittanceChange = (event) => {
        setRemittanceFiles(event.target.files[0]);
    };
    const handleDocumenteChange = (event) => {
        setDocumentFiles(event.target.files[0]);
    };


    const handleUpload = async () => {

        const formData = new FormData();
        if (
            (checklistItemType === 'EXCEL' &&
                selectedYear &&
                amount &&
                taxScheduleFiles !== null &&
                remittanceFiles.name !== null) ||
            (checklistItemType === 'PDF' && selectedYear && documentFiles !== null)
        ) {
            if (checklistItemType === 'EXCEL' &&
                selectedYear &&
                amount &&
                taxScheduleFiles !== null &&
                remittanceFiles !== null) {
                formData.append("job_id", JobID)
                formData.append("schedule", taxScheduleFiles)
                formData.append("document", remittanceFiles)
                formData.append("year", selectedYear)
                formData.append("RemittedAmount", amount)
                formData.append("doneby", emailAdd)
                formData.append("CheckListID", checklistItemID)
                setIsFetching(true)
                try {
                    const res = await fetch('https://test.rhm.backend.bespoque.ng/taxaudit/taxaudit-report-new.php', {
                        method: 'POST',
                        body: formData
                    })

                    const dataFetch = await res.json()
                    setIsFetching(false)
                    if (dataFetch.status === "400") {
                        toast.error(dataFetch.message);
                    } else {
                        toast.success(dataFetch.message);
                        setSelectedYear("");
                        setTaxScheduleFiles([]);
                        setRemittanceFiles([]);
                        setDocumentFiles([]);
                        setAmount('');
                    }

                } catch (error) {
                    setIsFetching(false)
                    console.error('Server Error:', error)
                }
            } else {
                formData.append("job_id", JobID)
                formData.append("document", documentFiles)
                formData.append("schedule", " ")
                formData.append("year", selectedYear)
                formData.append("doneby", emailAdd)
                formData.append("CheckListID", checklistItemID)
                formData.append("RemittedAmount", " ")
                setIsFetching(true)
                try {
                    const res = await fetch('https://test.rhm.backend.bespoque.ng/taxaudit/taxaudit-report-new.php', {
                        method: 'POST',
                        body: formData
                    })
                    const dataFetch = await res.json()
                    setIsFetching(false)
                    if (dataFetch.status === "400") {
                        toast.error(dataFetch.message);
                    } else {
                        toast.success(dataFetch.message);
                        setSelectedYear("");
                        setTaxScheduleFiles([]);
                        setRemittanceFiles([]);
                        setDocumentFiles([]);
                        setAmount('');
                    }
                } catch (error) {
                    setIsFetching(false)
                    console.error('Server Error:', error)
                }
                console.log("Non remittance selected!");
            }

            onUpload(selectedYear, taxScheduleFiles, remittanceFiles, amount, documentFiles, checklistItem);
        } else {
            alert('Please fill in all required fields.');
        }
    };

    return (
        <>
            <ToastContainer />
            {isFetching && <ProcessorSpinner />}
            <div className="flex justify-center my-4">
                <div>
                    <label htmlFor="year" className="block text-gray-700 text-sm font-bold">
                        Select a year:
                    </label>
                    <select id="year" className="block py-2 rounded-md" onChange={handleYearChange}>
                        <option value="">Select</option>
                        {years?.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>

                </div>
            </div>
            {checklistItemType === "EXCEL" ?
                <div className="flex gap-2">
                    <div>
                        <label htmlFor="amount" className=" text-gray-700 text-sm font-bold">
                            Remitted amount:
                        </label>
                        <input type="text" id="amount" className="px-2 py-2 border rounded-md" onChange={handleAmountChange} />
                    </div>
                    <div>
                        <label htmlFor="taxSchedule" className="text-gray-700 text-sm font-bold">
                            Upload Tax Schedule (csv):
                        </label>
                        <input type="file" id="taxSchedule" className="px-2 py-2 border rounded-md" onChange={handleTaxScheduleChange} />
                    </div>

                    <div>
                        <label htmlFor="remittance" className="text-gray-700 text-sm font-bold">
                            Upload Remittance (all monthly remittance):
                        </label>
                        <input type="file" id="remittance" className="px-2 py-2 border rounded-md" onChange={handleRemittanceChange} />
                    </div>

                </div>
                :
                <div className="flex justify-center gap-2">
                    <div>
                        <label htmlFor="document" className="block text-gray-700 text-sm font-bold">
                            Upload document:
                        </label>
                        <input type="file" id="document" className="block px-4 py-2 border rounded-md" onChange={handleDocumenteChange} />

                    </div>
                </div>
            }
            <div className="flex justify-center">
                <button type="button" onClick={handleUpload} className="mt-4 bg-blue-500 text-white rounded-md px-2 py-2 hover:bg-blue-700">Upload</button>
            </div>
        </>
    );
};

export default YearAndUpload;

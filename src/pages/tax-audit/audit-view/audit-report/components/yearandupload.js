import React, { useState } from 'react';

const YearAndUpload = ({ years, selectedScope, checklistItem, checklistItemType, onUpload }) => {
    const [selectedYear, setSelectedYear] = useState("");
    const [taxScheduleFiles, setTaxScheduleFiles] = useState([]);
    const [remittanceFiles, setRemittanceFiles] = useState([]);
    const [documentFiles, setDocumentFiles] = useState([]);
    const [amount, setAmount] = useState([]);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleTaxScheduleChange = (event) => {
        setTaxScheduleFiles([...taxScheduleFiles, event.target.files[0]]);
    };
    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleRemittanceChange = (event) => {
        setRemittanceFiles([...remittanceFiles, event.target.files[0]]);
    };
    const handleDocumenteChange = (event) => {
        setDocumentFiles([...documentFiles, event.target.files[0]]);
    };

    const handleUpload = () => {
        // Pass the selected year, tax schedule files, remittance files, and checklist item to the parent component for processing
        onUpload(selectedYear, taxScheduleFiles, remittanceFiles);
        setSelectedYear(""); // Clear the selected year
        setTaxScheduleFiles([]); // Clear the tax schedule files
        setRemittanceFiles([]); // Clear the remittance files
    };

    return (
        <>
            {/* <p className="mt-4 font-bold text-center my-8">Selected Scope: {checklistItem}</p> */}
            <div className="flex gap-2 ">
                <div>
                    <label htmlFor="year" className="block text-gray-700 text-sm font-bold">
                        Select a year:
                    </label>
                    <select id="year" className="block py-2 border rounded-md" onChange={handleYearChange}>
                        <option value="">Select</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                {checklistItemType === "excel" ?
                    <div className="flex gap-1">
                        <div>
                            <label htmlFor="taxSchedule" className="block text-gray-700 text-sm font-bold">
                                Upload Tax Schedule (excel):
                            </label>
                            <input type="file" id="taxSchedule" className=" px-4 py-2 border rounded-md" onChange={handleTaxScheduleChange} />
                        </div>

                        <div>
                            <label htmlFor="amount" className=" text-gray-700 text-sm font-bold">
                                Remitted amount:
                            </label>
                            <input type="text" id="amount" className="px-4 py-2 w-32 border rounded-md" onChange={handleAmountChange} />
                        </div>
                        <div>
                            <label htmlFor="remittance" className=" text-gray-700 text-sm font-bold">
                                Upload Remittance (excel):
                            </label>
                            <input type="file" id="remittance" className=" px-4 py-2 border rounded-md" onChange={handleRemittanceChange} />

                        </div>

                    </div> :
                    <div>
                        <div>
                            <label htmlFor="remittance" className="block text-gray-700 text-sm font-bold">
                                Upload document:
                            </label>
                            <input type="file" id="remittance" className="block px-4 py-2 border rounded-md" onChange={handleDocumenteChange} />

                        </div>
                    </div>
                }


                <button onClick={handleUpload} className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-700">Upload</button>
            </div>


        </>
    );
};

export default YearAndUpload;

import React, { useState } from 'react';

const YearAndUpload = ({ years, selectedScope, checklistItem, onUpload }) => {
    const [selectedYear, setSelectedYear] = useState("");
    const [taxScheduleFiles, setTaxScheduleFiles] = useState([]);
    const [remittanceFiles, setRemittanceFiles] = useState([]);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleTaxScheduleChange = (event) => {
        setTaxScheduleFiles([...taxScheduleFiles, event.target.files[0]]);
    };

    const handleRemittanceChange = (event) => {
        setRemittanceFiles([...remittanceFiles, event.target.files[0]]);
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
                <p className="mt-4 font-bold text-center">Selected Scope: {checklistItem}</p>
            <div className="flex gap-2">
                <div>
                    <label htmlFor="year" className="block text-gray-700 text-sm font-bold mb-2">
                        Select a year:
                    </label>
                    <select id="year" className="block py-2 border rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-300" onChange={handleYearChange}>
                        <option value="">Select a year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                <div>

                    <label htmlFor="taxSchedule" className="block text-gray-700 text-sm font-bold mt-4 mb-2">
                        Upload Tax Schedule:
                    </label>
                    <input type="file" id="taxSchedule" className="block px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-300" onChange={handleTaxScheduleChange} />
                </div>

                <div>
                    <label htmlFor="remittance" className="block text-gray-700 text-sm font-bold mt-4 mb-2">
                        Upload Remittance:
                    </label>
                    <input type="file" id="remittance" className="block px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-300" onChange={handleRemittanceChange} />

                    <button onClick={handleUpload} className="mt-4 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700">Upload</button>
                </div>


            </div>

        </>
    );
};

export default YearAndUpload;

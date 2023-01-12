import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import dateformat from "dateformat";
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import AnnualUploadsList from './annualUploadsList';
import url from '../../config/url';
import axios from "axios";
import setAuthToken from '../../functions/setAuthToken';
import Loader from 'react-loader-spinner';


function index() {
    const [startDate, setStartDate] = useState(new Date());
    const [FilteredData, setFilteredData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [tableState, setTableState] = useState("hidden");
    const [yearReport, setYearReport] = useState([]);


    const selectedYear = dateformat(startDate, "yyyy")

    const SearchYear = () => {
        setAuthToken()
        console.log("selectedYear", selectedYear);
        setIsFetching(true)
        axios.get(`${url.BASE_URL}annual/view-annual-year?year=${selectedYear}`)
            .then(function (response) {
                axios.post(`${url.BASE_URL}annual/report`, { "year": selectedYear })
                    .then(function (responsedata) {
                        let report = responsedata.data.body.report[0]
                        setYearReport(report)
                        console.log("responsedata", report);
                    })
                let search = response.data.body;
                setFilteredData(search)
                console.log("FilteredData", FilteredData);
                setIsFetching(false)
                setTableState('')

            })
    }
    console.log("yearReport", yearReport);
    return (
        <>
            <div className="overflow-x-auto flex justify-around my-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
                <div>
                    <p className="font-bold mb-5">Select Year</p>
                    <div className="">
                        <ReactDatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            showYearPicker
                            dateFormat="yyyy"
                            className="form-control mb-3 rounded"
                        />
                    </div>
                    <div>
                        <button className="btn w-32 bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                            type="submit"
                            onClick={() => SearchYear()}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div>
                    <p className="flex justify-between"> <span className="mr-3">No. of Submitted</span> <span className="font-bold">{yearReport?.Submitted || 0}</span></p>
                    <p className="flex justify-between"> <span className="mr-3">No. of Verified</span> <span className="font-bold">{yearReport?.Verified || 0}</span></p>
                    <p className="flex justify-between"> <span className="mr-3">No. of Approved</span> <span className="font-bold">{yearReport?.Approved || 0}</span></p>
                    <p className="flex justify-between"> <span className="mr-3">No. of Declined</span> <span className="font-bold">{yearReport?.Declined || 0}</span></p>
                </div>
            </div>
            {isFetching ? (
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
                    <p className="font-bold">Processing...</p>
                </div>
            ) :
                <div className={`${tableState}`}>
                    <AnnualUploadsList FilteredData={FilteredData} />
                </div>
            }
        </>
    )
}

export default index
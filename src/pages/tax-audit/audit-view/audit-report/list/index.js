
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { ProcessorSpinner } from '../../../../../components/spiner';
import NewAuditReport from '../components/button'
import Widget from '../../../../../components/widget';
import ScopeDropdown from '../components/scopedropdown';
import YearAndUpload from '../components/yearandupload';

export default function AuditReportList() {
    const [isFetching, setIsFetching] = useState(() => true);
    const router = useRouter()
    const [job, setJob] = useState(() => []);
    const { JobID } = router?.query


    const startDate = job?.job_auditdate_start || "";
    const endDate = job?.job_auditdate_end || "";

    const dateStart = new Date(startDate);
    const dateEnd = new Date(endDate);

    const auditStartYr = dateStart.getFullYear()
    const auditEndYr = dateEnd.getFullYear()
    const usersArr = String(job.job_user).split(',')

    const scopeData = [
        { "checklist_id": "", "checklist_item": "Select audit scope" },
        { "checklist_id": "1", "checklist_item": "Pay as you Earn" },
        { "checklist_id": "2", "checklist_item": "Capital Gain Tax" },
        { "checklist_id": "3", "checklist_item": "Withholding Tax" },
        { "checklist_id": "4", "checklist_item": "Stamp Duty" },
        { "checklist_id": "5", "checklist_item": "Business Premises" },
        { "checklist_id": "6", "checklist_item": "Ground Rent" },
        { "checklist_id": "7", "checklist_item": "Development Levy" },
        { "checklist_id": "8", "checklist_item": "Haulage fee" }
    ];

    const years = ["2023", "2022", "2021", "2020"];

    const [selectedScope, setSelectedScope] = useState("");
    const [uploadData, setUploadData] = useState([]);

    const handleScopeChange = (selectedScope) => {
        setSelectedScope(selectedScope);
    };

    const handleUpload = (selectedYear, taxScheduleFiles, remittanceFiles) => {
        const newUpload = {
            selectedScope,
            selectedYear,
            taxScheduleFiles,
            remittanceFiles,
        };

        setUploadData([...uploadData, newUpload]);
    };



    useEffect(() => {

        async function fetchPost() {
            try {
                const response = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-fetch-singlejob.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "param1": "id",
                        "param2": JobID
                    })
                })

                const dataFetchJobDet = await response.json()
                setJob(dataFetchJobDet.body[0])

                setIsFetching(false)
            } catch (error) {
                setIsFetching(false)
                console.error('Server Error:', error)
            } finally {
                setIsFetching(false)
            }
        }
        fetchPost();
    }, [JobID]);

    return (

        <>
            {isFetching && <ProcessorSpinner />}
            <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-2">
                <div className="w-full lg:w-1/2 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-2">
                    <div className="p-2 max-w-xs">
                        <p className="font-semibold text-gray-500">Taxpayer Details</p>
                        <hr />
                        <div className="flex justify-between">
                            <p>Taxpayer: <p></p> </p>
                            <p>Tax Id <p className="font-semibold">{job?.job_kgtin}</p></p>
                        </div>
                        <p className="font-semibold text-gray-500">Job Details</p>
                        <hr />
                        <div className="flex justify-between my-2">
                            <p>Type: <p className="font-semibold">{job?.job_job_type}</p> </p>
                            <p>Start date <p className="font-semibold">{job?.job_startdate}</p></p>
                        </div>
                        <div>
                            <p>Audit Period</p>
                            <p className="font-semibold">Jan, {auditStartYr} - Dec, {auditEndYr}</p>
                        </div>
                        <div className="mt-2 mb-4">
                            <p>Status</p>
                            <p className="font-semibold">{job.job_progress_status}</p>
                        </div>
                        <hr />
                        <div className="flex justify-between gap-2">
                            <p>Auditor
                                {usersArr.map((user) => (
                                    <p className="font-semibold">{user}</p>
                                ))
                                }
                            </p>
                            <p>Initiator <p className="font-semibold">{job.job_initiator}</p></p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">

                    <div className="max-w-xs">
                        <p className="font-semibold text-gray-500">Menu</p>
                        <hr />
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-2">
                        <button className="btn block p-2 bg-blue-100 rounded-tr-lg m-2"
                            onClick={() => router.push(`/tax-audit/audit-view?id=${JobID}`)}
                        >
                            Home
                        </button>
                        <button className="btn block p-2 bg-blue-100 rounded-tr-lg m-2"
                            onClick={() => router.push(`/tax-audit/audit-view/notification/notifications?id=${JobID}`)}
                        >Notifications</button>
                        <button className="btn block p-2 bg-blue-100 rounded-tl-lg m-2"
                            onClick={() => router.push(`/tax-audit/audit-view/acknowledge/list/jobacklist?JobID=${JobID}`)}>
                            Job Acknowledgements
                        </button>
                        <button className="btn block p-2 bg-blue-100 rounded-tr-lg m-2"
                            onClick={() => router.push(`/tax-audit/audit-view/correspondence/correspondence?id=${JobID}`)}
                        >
                            Correspondence
                        </button>
                        <button className="btn block p-2 bg-blue-100 rounded-tr-lg m-2"
                            onClick={() => router.push(`/tax-audit/audit-view/visit?id=${JobID}`)}
                        >Visit log</button>
                        <button className="btn block p-2 bg-gray-100 rounded-tr-lg m-2"
                            onClick={() => router.push(`/tax-audit/audit-view/audit-report/list?JobID=${JobID}`)}
                        >
                            Audit Report
                        </button>
                        <button className="btn block p-2 bg-blue-100 rounded-tr-lg m-2">Compliance</button>
                        <button className="btn block p-2 bg-blue-100 rounded-tr-lg m-2">Assessment</button>
                        <button className="btn block p-2 bg-blue-100 rounded-tr-lg m-2">Demand Notice</button>
                        <button className="btn block p-2 bg-blue-100 rounded-tr-lg m-2">Objection</button>
                        <button className="btn block p-2 bg-blue-100 rounded-tr-lg m-2">Tarc</button>
                    </div>

                </div>
            </div>

            <div className="flex justify-end m-2">
                {/* <NewAuditReport JobID={JobID} /> */}
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    View Audit
                </button>
            </div>
            <Widget>
                <ScopeDropdown scopeData={scopeData} onSelectScope={handleScopeChange} />

                {selectedScope !== "" && (
                    <div className="mt-4">
                        <YearAndUpload years={years} selectedScope={selectedScope} checklistItem={scopeData.find(item => item.checklist_id === selectedScope).checklist_item} onUpload={handleUpload} />
                    </div>
                )}

                {uploadData.map((upload, index) => (
                    <div key={index} className="mt-4">
                        <h2 className="text-xl font-bold mb-2">Uploaded Data for Scope: {upload.selectedScope}</h2>
                        <p>Year: {upload.selectedYear}</p>
                        <p>Tax Schedule Files: {upload.taxScheduleFiles.map(file => file.name).join(', ')}</p>
                        <p>Remittance Files: {upload.remittanceFiles.map(file => file.name).join(', ')}</p>
                    </div>
                ))}

            </Widget>

        </>
    )
}


import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { ProcessorSpinner } from '../../../../../components/spiner';
import Widget from '../../../../../components/widget';
import ScopeDropdown from '../components/scopedropdown';
import YearAndUpload from '../components/yearandupload';



export default function AuditReportList() {
    const [isFetching, setIsFetching] = useState(() => true);
    const router = useRouter()
    const [job, setJob] = useState(() => []);
    const { JobID } = router?.query
    const [selectedScope, setSelectedScope] = useState("");
    const [uploadData, setUploadData] = useState([]);
    const [scopeData, setUploadCheck] = useState([]);
    const [uploadsArr, setUploadsArr] = useState([])
    const [showDocs, setShowDocs] = useState(false)

    function getYearsInRange(startYear, endYear) {
        const years = [];

        if (startYear <= endYear) {
            for (let year = startYear; year <= endYear; year++) {
                years.push(year);
            }
        }
        return years;
    }

    const documentValues = {};

    uploadsArr?.forEach(item => {
        // if (item.document.trim() !== "") {
            if (documentValues[item.checklistID]) {
                documentValues[item.checklistID].documents.push(item.document);
                documentValues[item.checklistID].years.push(item.year);
                documentValues[item.checklistID].documentname = item.documentname; // Add this line
            } else {
                documentValues[item.checklistID] = {
                    documents: [item.document],
                    years: [item.year],
                    documentname: item.documentname, // Add this line
                };
            }
    
            if (item.remittedamount.trim() !== "") {
                if (!documentValues[item.checklistID].remittedamount) {
                    documentValues[item.checklistID].remittedamount = [];
                }
                documentValues[item.checklistID].remittedamount.push(item.remittedamount);
            }
    
            if (item.monthlyschedules) {
                if (!documentValues[item.checklistID].monthlyschedules) {
                    documentValues[item.checklistID].monthlyschedules = [];
                }
                documentValues[item.checklistID].monthlyschedules.push(...item.monthlyschedules);
            }
        // }
    });
    


    console.log("uploadsArr", uploadsArr);
    console.log("documentValues", documentValues);
    console.log("scopeData", scopeData);


    const startDate = job?.job_auditdate_start || "";
    const endDate = job?.job_auditdate_end || "";

    const dateStart = new Date(startDate);
    const dateEnd = new Date(endDate);

    const auditStartYr = dateStart.getFullYear()
    const auditEndYr = dateEnd.getFullYear()
    const usersArr = String(job.job_user).split(',')

    const yearRange = getYearsInRange(auditStartYr, auditEndYr);


    const handleScopeChange = (selectedScope) => {
        setSelectedScope(selectedScope);
    };

    const handleUpload = (selectedYear, taxScheduleFiles, remittanceFiles, amount, documentFiles) => {
        const newUpload = {
            selectedScope,
            selectedYear,
            taxScheduleFiles,
            remittanceFiles,
            amount,
            documentFiles
        };

        setUploadData([newUpload]); // set uploaded data to show only current upload
        // setUploadData([...uploadData, newUpload]);
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


    useEffect(() => {

        async function fetchPost() {
            try {
                const response = await fetch('https://test.rhm.backend.bespoque.ng/taxaudit/taxaudit-report-batch.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "job_id": JobID
                    })
                })

                const dataFetchJobDet = await response.json()
                setUploadsArr(dataFetchJobDet.body)

            } catch (error) {
                console.error('Server Error:', error)
            }
        }
        fetchPost();
    }, [JobID]);

    useEffect(() => {
        async function fetchPostData() {
            try {
                const response = await fetch('https://test.rhm.backend.bespoque.ng/taxaudit/taxaudit-jobchecklist.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "job_id": JobID
                    })
                })
                const dataFetchJobDet = await response.json()
                const check = await dataFetchJobDet.checklists
                setUploadCheck(check)
            } catch (error) {
                console.error('Server Error:', error)
            }
        }
        fetchPostData();
    }, [JobID]);


    const renderChecklistCards = () => {
        const checklistIds = Object.keys(documentValues);
    
        return checklistIds.map(checklistID => {
          const { years, remittedamount, documents, documentname } = documentValues[checklistID];
    
          return (
            <div key={checklistID} className="bg-gray-200 p-4 m-2 rounded-lg">
              <h2 className="text-lg font-semibold">Checklist ID: {checklistID}</h2>
              <div className="my-2">
                <strong>Years:</strong> { remittedamount > "0" ? <a href="/" className="text-blue-300">{years.join(', ')} </a> : years.join(', ')}
              </div>
    
              {remittedamount && (
                <div className="my-2">
                  <strong>Remitted Amount:</strong> <br /> {(remittedamount.join(', '))}
                </div>
              )}
    
              {documents && documents.length > 0 && (
                <div className="my-2">
                  <strong>Documents:</strong>
                  <ul className="flex gap-2">
                    {documents.map((document, index) => (
                      <li key={index}>
                        <a href={document} className="underline text-green-400" target="_blank" rel="noopener noreferrer">
                          view
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        });
      };

    return (

        <>
            {isFetching && <ProcessorSpinner />}


            <Widget title="Upload Audit documents">
                <ScopeDropdown scopeData={scopeData} onSelectScope={handleScopeChange} />

                {selectedScope !== "" && (
                    <div className="mt-4">
                        <YearAndUpload
                            years={yearRange}
                            selectedScope={selectedScope}
                            checklistItem={scopeData?.find(item => item.checklist_item === selectedScope).checklist_item}
                            checklistItemType={scopeData?.find(item => item.checklist_item === selectedScope).checklist_type}
                            checklistItemID={scopeData?.find(item => item.checklist_item === selectedScope).checklist_id}
                            onUpload={handleUpload}
                            JobID={JobID}
                        />
                    </div>
                )}

                {uploadsArr && (
                    <>
                        <p className="text-center">Uploaded Documents</p>
                        <div className="container mx-auto">
                            <div className="flex flex-wrap justify-center">
                                {renderChecklistCards()}
                            </div>
                        </div>
                        {/* <div className="grid grid-cols-3 gap-2 mx-auto my-4">
                            {scopeData?.map(item => (
                                <div key={item.checklist_id} className="bg-gray-100 p-4 rounded-md">
                                    <p className="font-light text-center">{item.checklist_item}</p>
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="font-bold mb-1">Year</p>
                                            {yearRange?.map((year) => (
                                                <div>
                                                    <p>{year}</p>
                                                </div>

                                            ))}
                                        </div>
                                        <div>
                                            <p className="font-bold">Document</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div> */}

                    </>

                )}

                {/* {uploadData.map((upload, index) => (

                    <div key={index} className="mt-4 grid grid-cols-3">

                        {upload.taxScheduleFiles.length > 0 ?
                            <div>
                                <p className='font-bold'>Uploaded Data for: {upload.selectedScope}</p>
                                <p>Year: {upload.selectedYear}</p>
                                <p>Tax Schedule: {upload.taxScheduleFiles.map(file => file.name).join(', ')}</p>
                                <p> Remittance: {upload.remittanceFiles.map(file => file.name).join(', ')}</p>
                                <p>amount: {upload.amount}</p>
                            </div>
                            :
                            <div>
                                <p className='font-bold'>Uploaded Data for: {upload.selectedScope}</p>
                                <p>Year: {upload.selectedYear}</p>
                                <p>uploaded document Files: {upload.documentFiles.map(file => file.name).join(', ')}</p>
                            </div>

                        }

                    </div>
                ))} */}


            </Widget>

        </>
    )
}

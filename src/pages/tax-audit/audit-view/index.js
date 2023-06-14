import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ProcessorSpinner } from '../../../components/spiner';
import SectionTitle from '../../../components/section-title';
import { FiPlusCircle } from 'react-icons/fi';
// import MaterialTable from 'material-table';


const Index = () => {
    const [isFetching, setIsFetching] = useState(() => true);
    const [job, setJob] = useState(() => []);
    const router = useRouter()
    const { id } = router?.query
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {

        async function fetchPost() {

            try {
                const res = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-fetch-singlejob.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "param1": "id",
                        "param2": id,
                    })
                })
                const dataFetch = await res.json()
                setJob(dataFetch.body[0])
                setIsFetching(false)
            } catch (error) {
                console.error('Server Error:', error)
            } finally {
                setIsFetching(false)
            }
        }
        fetchPost();
    }, [router]);



    return (
        <>
            {isFetching && <ProcessorSpinner />}
            <SectionTitle title="Audit view" />
            <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
                <div className="w-full flex items-center lg:w-1/2 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
                    <article className="p-6">
                        <p className="font-bold"><span className="text-base">Tax Id</span> : <span>{job.job_kgtin}</span></p>
                        <p className="font-bold"><span className="text-base">Assigned to</span> : <span>{job.job_user}</span></p>
                        <p className="font-bold"> <span className="text-base">Type</span>: <span>{job.job_job_type}</span></p>
                        <p className="font-bold"><span className="text-base">Job start status</span> : <span>{job.job_start_status}</span></p>
                        <p className="font-bold"><span className="text-base">Job progress status</span> : <span>{job.job_progress_status}</span></p>
                        <p className="font-bold"><span className="text-base">Job start date</span> : <span>{job.job_startdate}</span></p>
                        <p className="font-bold"><span className="text-base">Job audit start</span> : <span>{job.job_auditdate_start}</span></p>
                        <p className="font-bold"><span className="text-base">Job audit end</span> : <span>{job.job_auditdate_end}</span></p>
                        <p className="font-bold"><span className="text-base">Job initiator</span> : <span>{job.job_initiator}</span></p>
                    </article>

                </div>
                <div className="w-full lg:w-1/2 w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
                    <div className="accordion border border-gray-300 mb-10">
                        <div
                            className={`accordion-header text-center bg-gray-100 p-4 cursor-pointer ${isOpen ? 'bg-gray-200' : ''
                                }`}
                            onClick={toggleAccordion}
                        >
                            <div className="flex justify-between">
                                <span>
                                    Job Menu
                                </span>
                                <span>
                                    <FiPlusCircle />
                                </span>

                            </div>
                        </div>
                        {isOpen && (
                            <div className="accordion-content p-4">
                                <button className="btn block p-4 bg-gray-100 w-full m-2">Acknowledgements</button>
                                <button className="btn block p-4 bg-gray-100 w-full m-2">Notes</button>
                                <button className="btn block p-4 bg-gray-100 w-full m-2">Compliance</button>
                                <button className="btn block p-4 bg-gray-100 w-full m-2">Objections</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}
export default Index
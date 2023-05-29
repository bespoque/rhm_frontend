import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SectionTitle from '../../../components/section-title';

const index = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [definiData, setDefiniData] = useState(() => []);
    const [isFetching, setIsFetching] = useState(() => false);
    const router = useRouter()
    const { register, handleSubmit, errors } = useForm();
    useEffect(() => {

        const fetchPost = async () => {
            try {
                const response = await fetch('https://bespoque.dev/rhm/cluster/cluster-definition-batch.php', {
                    method: "POST",
                    body: JSON.stringify({
                        "process": "okay"
                    }),
                })
                setIsFetching(false);
                const dataFetch = await response.json()
                setDefiniData(dataFetch.body)
            } catch (error) {
                console.log(error)
                setIsFetching(false);
            }
        };
        fetchPost();
    }, []);


    async function onSubmit(formData) {
        console.log("data", formData.app_id);
        setIsSubmitting(true)

        try {
            const response = await fetch('https://bespoque.dev/rhm/cluster/cluster-new.php', {
                method: 'POST',
                body: JSON.stringify({
                    "cluster_definition_id": formData.cluster_definition_id,
                    "cluster_name": formData.cluster_name,
                    // "cluster_goal": formData.cluster_goal,
                    // "cluster_deadline": formData.cluster_deadline,
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
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="cluster_status" className="block mb-1">Cluster Definition:</label>
                        <select
                            id="cluster_definition_id"
                            name="cluster_definition_id"
                            className="border border-gray-300 p-2 w-full"
                            ref={register()}
                        >
                            <option value="">Select Definition</option>
                            {definiData.map((def) => <option key={def.id} value={def.id}>{`${def.cluster_name}`}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="cluster_name" className="block mb-1">Cluster Name:</label>
                        <input
                            type="text"
                            id="cluster_name"
                            name="cluster_name"
                            className="border border-gray-300 p-2 w-full"
                            ref={register()}
                        />
                    </div>
                    {/* <div>
                        <label htmlFor="cluster_goal" className="block mb-1">Cluster Goal:</label>
                        <input
                            type="number"
                            id="cluster_goal"
                            name="cluster_goal"
                            className="border border-gray-300 p-2 w-full"
                            ref={register()}
                        />
                    </div> */}

                    <div>
                        <label htmlFor="cluster_name" className="block mb-1">Cluster Head:</label>
                        <input
                            type="email"
                            id="cluster_head"
                            name="cluster_head"
                            className="border border-gray-300 p-2 w-full"
                            ref={register()}
                        />
                    </div>

                    <div>
                        <label htmlFor="cluster_status" className="block mb-1">Cluster Status:</label>
                        <select
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
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {/* <div>
                        <label htmlFor="cluster_deadline" className="block mb-1">Cluster Deadline:</label>
                        <input
                            type="date"
                            id="cluster_deadline"
                            name="cluster_deadline"
                            className="border border-gray-300 p-2 w-full"
                            ref={register()}
                        />
                    </div> */}

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
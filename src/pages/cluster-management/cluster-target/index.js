import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import SectionTitle from '../../../components/section-title';

const index = () => {
    const [clusterData, setClusterData] = useState(() => []);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formattedNumber, setFormattedNumber] = useState('');
    const router = useRouter()
    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {

        async function fetchPost() {
            try {
                const response = await fetch('https://bespoque.dev/rhm/cluster/clusters-batch.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "process": "okay",
                    })
                })

                const dataFetch = await response.json()
                setClusterData(dataFetch.body)
            } catch (error) {
                console.error('Server Error:', error)
            } finally {
            }
        }
        fetchPost();
    }, []);



    async function onSubmit(formData) {
        formData.target_goal = (formData.target_goal.replace(/\D/g, ''));
        setIsSubmitting(true)

        try {
            const response = await fetch('https://bespoque.dev/rhm/cluster/target-new.php', {
                method: 'POST',
                body: JSON.stringify(
                    formData
                )
            })

            const dataFetch = await response.json()
            toast.success(dataFetch.message);
            router.push('/cluster-management/cluster-target/list')
        } catch (error) {
            console.error('Server Error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const formatNumber = (event) => {
        const { value } = event.target;

        // Remove all non-digit characters
        const cleanedValue = value.replace(/\D/g, '');

        // Format the number with commas
        const formattedValue = Number(cleanedValue).toLocaleString();

        // Set the formatted value
        setFormattedNumber(formattedValue);
    };

    return (
        <>
            <ToastContainer />
            <SectionTitle title="Create cluster target" />

            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
                <div className="grid grid-cols-3 gap-2">
                    <div>
                        <label className="block mb-1">Cluster</label>
                        <select
                            className="border border-gray-300 w-full"
                            required
                            name='cluster_id'
                            ref={register()}
                        >
                            <option value="">Select Cluster</option>
                            {clusterData.map((cluster) => <option key={cluster.id} value={cluster.id}>{cluster.cluster_name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Target Name:</label>
                        <input
                            required
                            type="text"
                            name='target_name'
                            className="border border-gray-300 w-full"
                            ref={register()}
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Target Goal:</label>
                        <input
                            required
                            type="text"
                            name='target_goal'
                            value={formattedNumber}
                            onChange={formatNumber}
                            className="border border-gray-300 w-full"
                            ref={register()}
                        />
                    </div>
                </div>
                <div className='flex justify-center gap-2 mt-3'>
                    <div>
                        <label className="block mb-1">Start date:</label>
                        <input
                            required
                            type="date"
                            name='target_startdate'
                            className="border border-gray-300 w-full"
                            ref={register()}
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Deadline:</label>
                        <input
                            required
                            type="date"
                            name='target_deadline'
                            className="border border-gray-300 w-full"
                            ref={register()}
                        />
                    </div>
                    <div>
                        <label htmlFor="cluster_status" className="block mb-1">Target Type:</label>
                        <select
                            required
                            name="target_type"
                            className="border border-gray-300 w-full"
                            ref={register()}
                        >
                            <option value="">Select a status</option>
                            <option value="Assessment">Assessment</option>
                            <option value="Taxpayers">Taxpayers</option>
                            <option value="Collection">Collection</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="cluster_status" className="block mb-1">Status:</label>
                        <select
                            required
                            name="target_status"
                            className="border border-gray-300 w-full"
                            ref={register()}
                        >
                            <option value="">Select a status</option>
                            <option value="PENDING">Pending</option>
                            <option value="ACTIVE">Active</option>
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
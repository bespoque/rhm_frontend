import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const index = () => {
    const [appName, setAppName] = useState('')
    const [appType, setAppType] = useState('')
    const [canSign, setCanSign] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    

    async function handleSubmit(event) {
        event.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch('https://bespoque.dev/rhm/new-appgroup.php', {
                method: 'POST',
                body: JSON.stringify({ "app_name": appName, "app_type": appType, "can_sign": canSign })
            })
            const data = await response.json()
            toast.success(data.message);
            router.push('/view/app-group/list')
        } catch (error) {
            console.error('Server Error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }
  
    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit} >
                <div class="flex flex-wrap justify-center items-center">
                    <div class="w-full sm:w-auto max-w-sm">
                        <label htmlFor="">Application name</label>
                        <input type="text" className="w-full py-2 px-4 rounded-md border border-gray-300"
                            required
                            id="appName"
                            onChange={(event) => setAppName(event.target.value)}
                        />
                    </div>
                    <div class="w-full sm:w-auto max-w-sm mt-4 sm:mt-0 ml-0 sm:ml-4">
                        <label htmlFor="">Application type</label>
                        <input type="text" class="w-full py-2 px-4 rounded-md border border-gray-300"
                            required
                            id="apptype"
                            onChange={(event) => setAppType(event.target.value)}
                        />
                    </div>
                    <div class="w-full sm:w-auto max-w-sm mt-4 sm:mt-0 ml-0 sm:ml-4">
                        <label className='flex justify-center'>Sign permission</label>
                        <select class="w-full rounded-md border border-gray-300"
                            onChange={(event) => setCanSign(event.target.value)}
                            required
                        >
                            <option value="">Please select</option>
                            <option value="Y">Y</option>
                            <option value="N">N</option>
                        </select>
                    </div>
                </div>
                <div class="my-4 flex justify-center">
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
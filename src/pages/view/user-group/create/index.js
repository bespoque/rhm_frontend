import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SectionTitle from '../../../../components/section-title';

const Index = () => {
    const [groupName, setGroupName] = useState('')
    const [role, setRole] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    async function handleSubmit(event) {
        event.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch('https://bespoque.dev/rhm/new-usergroups.php', {
                method: 'POST',
                body: JSON.stringify({ "groupname": groupName, "role": role })
            })

            const data = await response.json()
            console.log('Server Response:', data)
            // handle success
            toast.success("Created Successfully!");
            router.push('/view/user-group/list')
        } catch (error) {
            console.error('Server Error:', error)
            // handle error
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <>
        <SectionTitle subtitle={"Create usergroup"} />
            <ToastContainer />
            <form onSubmit={handleSubmit} >
                <div class="flex flex-wrap justify-center items-center">
                    <div class="w-full sm:w-auto max-w-sm">
                        <input type="text" className="w-full py-2 px-4 rounded-md border border-gray-300"
                            required
                            id="groupName"
                            placeholder="Enter group name"
                            value={groupName}
                            onChange={(event) => setGroupName(event.target.value)}
                        />
                    </div>
                    <div class="w-full sm:w-auto max-w-sm mt-4 sm:mt-0 ml-0 sm:ml-4">
                        <input type="text" class="w-full py-2 px-4 rounded-md border border-gray-300"
                            required
                            id="role"
                            placeholder="Enter role"
                            value={role}
                            onChange={(event) => setRole(event.target.value)}
                        />
                    </div>
                    <div class="mt-4 sm:mt-0 ml-4">
                        <button
                            className={`${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-400 hover:bg-blue-700'
                                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Submit'}
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}
export default Index
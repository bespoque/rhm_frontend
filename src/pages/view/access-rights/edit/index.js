import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SectionTitle from '../../../../components/section-title';

const index = () => {
    const [permissionName, setPermissionName] = useState('')
    const [usergroup, setUserGroup] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    const { id } = router.query;
    const [permissionData, setPermissionData] = useState([]);

    async function handleSubmit(event) {
        event.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch('https://bespoque.dev/rhm/update-permission-group.php', {
                method: 'POST',
                body: JSON.stringify({ "usergroup": usergroup, "permission": permissionName, "id": permissionData.id })
            })
            const data = await response.json()
            toast.success(data.message);
            router.push('/view/access-rights/list')
        } catch (error) {
            console.error('Server Error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        async function fetchPermissionsData() {
            try {
                const response = await fetch(`https://bespoque.dev/rhm/get-permissions-single.php`, {
                    method: 'POST',
                    body: JSON.stringify({ "param": "id", "value": id })
                });
                const data = await response.json();
                console.log("response", response);
                setPermissionData(data.body[0]);
                setPermissionName(data.body[0].permission);
                setUserGroup(data.body[0].usergroup);
            } catch (error) {
                console.error(error);
            }
        }

        if (id) {
            fetchPermissionsData();
        }
    }, [id]);

    return (
        <>
            <ToastContainer />
            <SectionTitle subtitle={"Update Permission"} />
            <form onSubmit={handleSubmit} >
                <div class="flex flex-wrap justify-center items-center">
                    <div class="w-full sm:w-auto max-w-sm">
                        <input type="text" className="w-full py-2 px-4 rounded-md border border-gray-300"
                            required
                            readOnly
                            id="groupName"
                            defaultValue={usergroup}
                            onChange={(event) => setUserGroup(event.target.value)}
                        />
                    </div>
                    <div class="w-full sm:w-auto max-w-sm mt-4 sm:mt-0 ml-0 sm:ml-4">
                        <input type="text" class="w-full py-2 px-4 rounded-md border border-gray-300"
                            required
                            id="permission"
                            defaultValue={permissionName}
                            onChange={(event) => setPermissionName(event.target.value)}
                        />
                    </div>
                    <div class="mt-4 sm:mt-0 ml-4">
                        <button
                            className={`${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-400 hover:bg-blue-700'
                                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Update'}
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}
export default index
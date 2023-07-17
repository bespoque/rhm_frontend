import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
    const [groupName, setGroupName] = useState('')
    const [permission, setPermission] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [userGrpData, setUserGrpData] = useState(() => []);
    const [isFetching, setIsFetching] = useState(() => false);
    const router = useRouter()
    useEffect(() => {

        const fetchPost = async () => {
            try {
                const response = await fetch('https://bespoque.dev/rhm/get-usergroups-batch.php')
                setIsFetching(false);
                const data = await response.json()
                console.log("data", data.body)
                setUserGrpData(data.body)
            } catch (error) {
                console.log(error)
                setIsFetching(false);
            }
        };
        fetchPost();
    }, []);

    console.log("userGrpData", userGrpData);

    async function handleSubmit(event) {
        event.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch('https://bespoque.dev/rhm/new-permission-group.php', {
                method: 'POST',
                body: JSON.stringify({ "usergroup": groupName, "permission": permission })
            })

            const data = await response.json()
            console.log('Server Response:', data)
            // handle success
            toast.success(response.message);
            router.push('/view/access-rights/list/')
        } catch (error) {
            console.error('Server Error:', error)
            // handle error
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <>

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
            <form onSubmit={handleSubmit} >
                <div className="flex flex-wrap justify-center items-center">
                    <div className="w-full sm:w-auto max-w-sm">
                        <select className="w-full py-2 px-4 rounded-md border border-gray-300"
                            required
                            value={groupName}
                            onChange={(event) => setGroupName(event.target.value)}
                        >
                            <option value="">Select usergroup</option>
                            {userGrpData.map((group) => <option key={group.id} value={group.id}>{`${group.groupname + " - " + group.role}`}</option>)}
                        </select>
                    </div>
                    <div className="w-full sm:w-auto max-w-sm mt-4 sm:mt-0 ml-0 sm:ml-4">
                        <textarea type="text" class="w-full py-2 px-4 rounded-md border border-gray-300"
                            required
                            id="permission"
                            placeholder="eg. Ability to Decline verified Assessment"
                            value={permission}
                            onChange={(event) => setPermission(event.target.value)}
                        > </textarea>
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
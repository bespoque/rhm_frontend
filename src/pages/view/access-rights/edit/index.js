import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SectionTitle from '../../../../components/section-title';
import Loader from 'react-loader-spinner';
import { useForm } from 'react-hook-form';

const index = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isFetching, setIsFetching] = useState(() => true);
    const router = useRouter()
    const [userGrpData, setUserGrpData] = useState(() => []);
    const [appGrpData, setAPPGrpData] = useState(() => []);
    const [currentPerm, setCurrentPerm] = useState(()=> []);
    const { register, handleSubmit, errors } = useForm();
    const { id } = router.query;
    useEffect(() => {
        console.log("id", id);
        const fetchPost = async () => {
            try {
                const response = await fetch('https://bespoque.dev/rhm/get-usergroups-batch.php')
                const appgrpres = await fetch('https://bespoque.dev/rhm/get-appgroups-batch.php')
                const permData = await fetch('https://bespoque.dev/rhm/get-permissions-single.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "param": "id",
                        "value": id

                    })
                })
                setIsFetching(false);
                const data = await response.json()
                const appGroups = await appgrpres.json()
                const permObj = await permData.json()
                console.log("data", data.body)
                console.log("appGroups", appGroups.body)
                console.log("permObj", permObj.body)
                setUserGrpData(data.body)
                setAPPGrpData(appGroups.body)
                setCurrentPerm(permObj.body[0])
            } catch (error) {
                console.log(error)
                setIsFetching(false);
            }
        };
        fetchPost();
    }, [router]);

    async function onSubmit(formData) {
        console.log("data", formData);
        setIsSubmitting(true)

        try {
            const response = await fetch('https://bespoque.dev/rhm/update-permission-group.php', {
                method: 'POST',
                body: JSON.stringify({
                    "app_id": formData.app_id,
                    "group_id": formData.group_id,
                    "view": formData.view,
                    "edit": formData.edit,
                    "approve": formData.approve,
                    "delete": formData.delete,
                    "verify": formData.verify,
                    "sign": formData.sign,
                })
            })

            const data = await response.json()
            toast.success(response.message);
            router.push('/view/access-rights/list/')
        } catch (error) {
            console.error('Server Error:', error)
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
            <SectionTitle subtitle={"Update Permission"} />
            
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="flex flex-wrap justify-center items-center">
                        <div className="w-full sm:w-auto max-w-sm">
                            <p>Application</p>
                            <select className="w-full rounded-md border border-gray-300"
                                required
                                name='app_id'
                                ref={register}
                            >
                                <option value={currentPerm.app_id}>{currentPerm.appName}</option>
                                {appGrpData.map((app) => <option key={app.id} value={app.id}>{`${app.app_name + " - " + app.app_type}`}</option>)}
                            </select>
                        </div>
                        <div className="w-full sm:w-auto max-w-sm mt-4 sm:mt-0 ml-0 sm:ml-4">
                            <p>Usergroup</p>
                            <select className="w-full rounded-md border border-gray-300"
                                required
                                name='group_id'
                                ref={register}
                            >
                                <option value={currentPerm.group_id}>{currentPerm.groupName}</option>
                                {userGrpData.map((group) => <option key={group.id} value={group.id}>{`${group.groupname + " - " + group.role}`}</option>)}
                            </select>
                        </div>
                    </div>
                    <p className='flex justify-center my-3 font-bold'>Apply Permissions</p>
                    <div className="flex flex-wrap justify-center items-center">
                        <div className="w-full sm:w-auto max-w-sm">
                            <p>View</p>
                            <select className="w-full rounded-md border border-gray-300"
                                required
                                name='view'
                                ref={register}
                            >
                                <option value={currentPerm.view}>{currentPerm.view}</option>
                                <option value="Y">Y</option>
                                <option value="N">N</option>
                            </select>
                        </div>
                        <div className="w-full sm:w-auto max-w-sm mt-4 sm:mt-0 ml-0 sm:ml-4">
                            <p>Edit</p>
                            <select className="w-full rounded-md border border-gray-300"
                                required
                                name='edit'
                                ref={register}
                            >
                                <option value={currentPerm.edit}>{currentPerm.edit}</option>
                                <option value="Y">Y</option>
                                <option value="N">N</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center items-center">
                        <div className="w-full sm:w-auto max-w-sm">
                            <p>Approve</p>
                            <select className="w-full rounded-md border border-gray-300"
                                required
                                name='approve'
                                ref={register}
                            >
                                <option value={currentPerm.approve}>{currentPerm.approve}</option>
                                <option value="Y">Y</option>
                                <option value="N">N</option>
                            </select>
                        </div>
                        <div className="w-full sm:w-auto max-w-sm mt-4 sm:mt-0 ml-0 sm:ml-4">
                            <p>Delete</p>
                            <select className="w-full rounded-md border border-gray-300"
                                required
                                name='delete'
                                ref={register}
                            >
                                <option value={currentPerm.delete}>{currentPerm.delete}</option>
                                <option value="Y">Y</option>
                                <option value="N">N</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center items-center">
                        <div className="w-full sm:w-auto max-w-sm">
                            <p>Verify</p>
                            <select className="w-full rounded-md border border-gray-300"
                                required
                                name='verify'
                                ref={register}
                            >
                                <option value={currentPerm.verify}>{currentPerm.verify}</option>
                                <option value="Y">Y</option>
                                <option value="N">N</option>
                            </select>
                        </div>
                        <div className="w-full sm:w-auto max-w-sm mt-4 sm:mt-0 ml-0 sm:ml-4">
                            <p>Sign</p>
                            <select className="w-full rounded-md border border-gray-300"
                                required
                                name='sign'
                                ref={register}
                            >
                                <option value={currentPerm.sign}>{currentPerm.sign}</option>
                                <option value="Y">Y</option>
                                <option value="N">N</option>
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
                            {isSubmitting ? 'Saving...' : 'Update'}
                        </button>
                    </div>
                </form>
           
        </>
    )
}
export default index
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
  const [clustDetail, setClustDetail] = useState(() => []);
  const { register, handleSubmit, errors } = useForm();
  const { id } = router.query;
  useEffect(() => {
    console.log("id", id);
    const fetchPost = async () => {
      try {
        const clustDet = await fetch('https://bespoque.dev/rhm/cluster/cluster-details.php', {
          method: 'POST',
          body: JSON.stringify({
            "id": id
          })
        })
        setIsFetching(false);
        const clusterInfo = await clustDet.json()
        setClustDetail(clusterInfo.body[0])
      } catch (error) {
        console.log(error)
        setIsFetching(false);
      }
    };
    fetchPost();
  }, [router]);

  async function onSubmit(formData) {
    setIsSubmitting(true)

    try {
      const response = await fetch('https://bespoque.dev/rhm/cluster/cluster-update.php', {
        method: 'POST',
        body: JSON.stringify({
          "id": clustDetail.id,
          "cluster_name": formData.cluster_name,
          "cluster_head": formData.cluster_head,
          "cluster_status": formData.cluster_status,
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
      <SectionTitle subtitle="Update Cluster" />

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="cluster_name" className="block mb-1">Cluster Name:</label>
            <input
              type="text"
              id="cluster_name"
              name="cluster_name"
              className="border border-gray-300 p-2 w-full"
              defaultValue={clustDetail.cluster_name}
              ref={register()}
            />
          </div>
          <div>
            <label htmlFor="cluster_name" className="block mb-1">Cluster Head:</label>
            <input
              type="email"
              id="cluster_head"
              name="cluster_head"
              defaultValue={clustDetail.cluster_head}
              className="border border-gray-300 p-2 w-full"
              ref={register()}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="cluster_status" className="block mb-1">Cluster Status:</label>
            <select
              id="cluster_status"
              name="cluster_status"
              className="border border-gray-300 p-2 w-full"
              ref={register()}
            >
              <option value={clustDetail.cluster_status}>{clustDetail.cluster_status}</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="ACTIVE">ACTIVE</option>
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
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SectionTitle from '../../../../components/section-title';
import Loader from 'react-loader-spinner';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';

const index = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFetching, setIsFetching] = useState(() => true);
  const [clustDetail, setClustDetail] = useState(() => []);
  const [inputValue, setInputValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const router = useRouter()

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
        setInputValue(clusterInfo.body[0].cluster_head)
      } catch (error) {
        console.log(error)
        setIsFetching(false);
      }
    };
    fetchPost();
  }, [router]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    if (inputValue === "") {
      alert("Please select a cluster head")
    } else {
      setShowModal(true);
      fetchData();

    }
  };
  const fetchData = () => {
    const requestBody = {
      param: inputValue
    };

    fetch('https://bespoque.dev/rhm/cluster/users-get.php', {
      method: 'POST',
      body: JSON.stringify(requestBody)
    })
      .then((response) => response.json())
      .then((data) => setJsonData(data.body))
      .catch((error) => console.log(error));
  };


  const handleOptionClick = (option) => {
    setInputValue(option.name);
    setEmailValue(option.email);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };


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
      toast.success(data.message);
      router.push('/cluster-management/cluster-group/list')
    } catch (error) {
      console.error('Server Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <>
      <ToastContainer />
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Options Modal"
        className="bg-white rounded p-4 max-w-sm border mx-auto"
        overlayClassName="fixed inset-20 opacity-100"
      >
        {jsonData ? (
          <ul>
            {jsonData.map((option) => (
              <li
                key={option.id}
                onClick={() => handleOptionClick(option)}
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                {option.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading data...</p>
        )}
      </Modal>
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

      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label htmlFor="cluster_name" className="block mb-1">Cluster Name:</label>
            <input
              required
              type="text"
              id="cluster_name"
              name="cluster_name"
              className="border border-gray-300 p-2 w-full"
              defaultValue={clustDetail.cluster_name}
              ref={register()}
            />
          </div>
          <div>
            <label className="block mb-1">Cluster Head:</label>
            <input
              required
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full"
            />
            <input
              required
              type="text"
              id="cluster_head"
              name="cluster_head"
              value={emailValue}
              className="border border-gray-300 p-2 mt-2 w-full"
              ref={register()}
            />

            <span className="flex justify-center text-blue-600 font-bold py-2 px-4 
                        rounded focus:outline-none bg-blue-100 hover:bg-blue-200
                        focus:shadow-outline cursor-pointer mt-2" onClick={handleButtonClick}>
              <p>Search user</p>
            </span>
          </div>
          <div>
            <label htmlFor="cluster_status" className="block mb-1">Cluster Status:</label>
            <select
              required
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
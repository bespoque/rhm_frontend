import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Section from '../../../components/dashboard/section'
import url from '../../../config/url';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import setAuthToken from "../../../functions/setAuthToken";
import Loader from 'react-loader-spinner';

export default function Create() {
  const { register, handleSubmit, watch } = useForm();
  const [CreateError, setError] = useState([])
  const [isFetching, setIsFetching] = useState(() => false);


  setAuthToken();

  const CreateBuinessType = (data) => {

    setIsFetching(true)

    axios.post(`${url.BASE_URL}forma/business-type`, data)
      .then(function (response) {
        setIsFetching(false)
        toast.success("Created Successfully!");
      })
      .catch(function (error) {
        setIsFetching(false)
        if (error.response) {
          setError(() => error.response.data.message);
          toast.error(CreateError)
        } else {
          toast.error("Failed to create Business Type!");
        }
      });

  }

  return (
    <div>
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
          <p className="font-bold">Processing...</p>
        </div>
      )}

      <ToastContainer />
      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full ">
          <form onSubmit={handleSubmit(CreateBuinessType)}>
            <Section
              description={<span>Add Business Type</span>}
            >
              <div className="flex flex-row justify-evenly">
                <div>
                  <input ref={register()} type="text" placeholder="Enter business type" name="business_type" />
                </div>
                <div>
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Create
                  </button>
                </div>
              </div>
            </Section>
          </form>
        </div>

      </div>
    </div>
  )
}

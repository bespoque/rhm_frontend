import { useRouter } from 'next/router';
import React from 'react'
import axios from "axios";
import { useState } from 'react';
import url from "../../../../config/url";
import { useForm } from 'react-hook-form';
import setAuthToken from '../../../../functions/setAuthToken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner';

const Registeragent = () => {
    const [createError, setError] = useState("")
    const [isFetching, setIsFetching] = useState(() => false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()

    setAuthToken();
    const onSubmit = (data) => {

        setIsFetching(true)
        
        axios.post(`${url.BASE_URL}market/admin/agent/signup`, data)
            .then(function (response) {
                setIsFetching(false)
                toast.success("Created Successfully!");
                router.push("/dashboard")
            })
            .catch(function (error) {
                setIsFetching(false)
                if (error.response) {
                    setError(() => error.response.data.message);
                } else {
                    toast.error("Failed to create user!");
                }
            })


    };

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
                    <p className="font-bold">Processing...</p>
                </div>
            )}
            <div className="flex border mb-3 block p-3 rounded-lg bg-white w-full">
                <form className="" onSubmit={handleSubmit(onSubmit)}>

                    <h5 className="flex mb-5 justify-center">Agent Registration</h5>
                    <small className="flex mb-5 justify-center text-red-600">{createError}</small>
                    <div className="mb-6 grid grid-cols-3 gap-2">
                        <label>Name:</label>
                        <div>
                            <input name="name" ref={register()} required type="text" className="form-control w-full rounded" />
                        </div>
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-2">
                        <label>Email:</label>
                        <div>
                            <input name="user" type="email" ref={register()} required className="form-control w-full rounded"
                            />
                        </div>
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-2">
                        <label>Phone:</label>
                        <input name="phone" type="text" ref={register()} required className="form-control w-full rounded" />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-2">
                        <label>Password:</label>
                        <div>
                            <input name="password" ref={register()} required type="text" className="form-control w-full rounded" />
                        </div>
                    </div>

                    <div className="mb-6 flex justify-center">
                        <button
                            style={{ backgroundColor: "#84abeb" }}
                            className="btn btn-default text-white btn-outlined bg-transparent rounded-md"
                            type="submit"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Registeragent
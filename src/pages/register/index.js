import React, { useEffect, useState } from 'react'
import axios from "axios";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { Controller, useForm } from 'react-hook-form';
import { MultiSelect } from "react-multi-select-component";
import { useRouter } from 'next/router';
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { shallowEqual, useSelector } from 'react-redux';
import jwt from "jsonwebtoken";
import Select from 'react-select'

export default function Index() {
    const [taxStation, setTaxStation] = useState([])
    const [uploadErrors, setUploadErrors] = useState(() => []);
    const [department, setDepartment] = useState([])
    const [rhmGroups, setRhmGroups] = useState([])
    const [isFetching, setIsFetching] = useState(() => false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()

    const { config, palettes, auth } = useSelector(
        (state) => ({
            config: state.config,
            palettes: state.palettes,
            auth: state.authentication.auth,
        }),
        shallowEqual
    );

    const Approval = [2, 3, 12, 1]
    const decoded = jwt.decode(auth);
    const creator = decoded.user


    useEffect(() => {

        setAuthToken();
        const fetchPost = async () => {
            try {
                let res = await axios.get(`${url.BASE_URL}user/items`);
                let itemsBody = res.data.body
                let taxOffice = itemsBody.taxOffice
                let depart = itemsBody.department
                let rhmGroups = itemsBody.rhmGroups
                setTaxStation(taxOffice)
                setDepartment(depart)
                setRhmGroups(rhmGroups)

            } catch (e) {
                // setIsFetching(false);
            }
        };
        fetchPost();

    }, []);

    const options = rhmGroups.map(item => {
        return {
            label: item.role + " || " + item.department,
            value: item.id
        }
    })

    setAuthToken();
    const onSubmit = (data) => {
        data.userGroup = data.userGroup.toString()
        if (data.userGroup === "") {
            alert("please select usergroup")
        } else {
            setIsFetching(true)
            axios.post(`${url.BASE_URL}user/signup`, data)
                .then(function (response) {
                    setIsFetching(false)
                    toast.success("Created Successfully!");
                    router.push("/dashboard")
                })
                .catch(function (error) {
                    setIsFetching(false)
                    if (error.response) {
                        setUploadErrors(() => error.response.data.message);
                        toast.error(uploadErrors)
                    } else {
                        toast.error("Failed to create user!");
                    }
                })

        }
    };


    return (

        <div>

            <ToastContainer />

            <div className="block p-6 rounded-lg bg-white w-full">
                <div className="flex justify-center mb-4">
                    <h6 className="p-2">Register User</h6>
                </div>
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group ">
                            <p>Full name</p>
                            <input type="text" name="name" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                placeholder="Enter Full name" ref={register({ required: "Name is required" })}
                            />
                            {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                        </div>

                        <div className="form-group">
                            <p>Password</p>
                            <input name="password" type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                ref={register({ required: "Password is required", minLength: { value: 8, message: "password must be at least 8 characters in length" }, maxLength: { value: 12, message: "password must not be more than 12 charachers in length" } })}
                            />
                            {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                        </div>

                        <div className="form-group ">
                            <p>Department</p>
                            <select name="dept" ref={register({ valueAsNumber: true })} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                {department.map((dept) => <option key={dept.id} value={dept.id}>{dept.name}</option>)}
                            </select>
                        </div>

                        <div className="form-group ">
                            <p>Tax Station</p>
                            <select ref={register()} name="station" className="form-control mb-4 SlectBox w-full rounded font-light text-gray-500" id="taxStation">
                                {taxStation.map((office) => <option key={office.idstation} value={office.station_code}>{office.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <p>User group</p>

                            <Controller

                                control={control}
                                defaultValue={options.map(c => c.value)}
                                name="userGroup"
                                rules={{ required: true }}
                                render={({ onChange, value, ref }) => (
                                    // render={({ field: { onChange, value, ref } }) => (
                                    <MultiSelect
                                        inputRef={ref}
                                        options={options}
                                        value={((options.filter(c => value.includes(c.value))))}
                                        onChange={val => onChange(val.map(c => c.value))}
                                        labelledBy="Select group"
                                    />
            
                                )}

                            />
                            {errors.userGroup && <p className="text-red-600">{errors.userGroup.message}</p>}
                        </div>

                        <div className="form-group ">
                            <p>Email</p>
                            <input name="email" ref={register({ required: "Email is required" })} type="email" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                        </div>
                        <div className="form-group ">
                            <p>Phone Number</p>
                            <input name="phone" ref={register({ required: "Phone is required" })} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                            {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}
                        </div>
                        <div className="form-group ">
                            <p>Active</p>

                            <select ref={register()} name="active" class="form-control mb-4 SlectBox  w-full rounded font-light text-gray-500">
                                <option value="Y">Yes</option>
                                <option value="N">No</option>
                            </select>
                        </div>
                        <div className="form-group hidden">
                            <p>Created By</p>
                            <input name="createdBy" value={creator} ref={register({ required: "Created by is required" })} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                            {errors.createdBy && <p className="text-red-600">{errors.createdBy.message}</p>}
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
        </div>
    )
}

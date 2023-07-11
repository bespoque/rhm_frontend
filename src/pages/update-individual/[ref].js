import React, { useEffect, useState } from 'react'
import { SubmitButton } from '../../components/CustomButton/CustomButton'
import axios from "axios";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { useRouter } from 'next/router';


export default function Index() {
    const [department, setDepartment] = useState([])
    const [taxOffice, setTaxOffice] = useState([])
    const [sector, setSector] = useState([])
    const [incomeSource, setIncomSource] = useState([])
    const [state, setState] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [lga, setLga] = useState([])
    const [indvRecord, setindividualRec] = useState([])
    const [userBVN, setUserBvn] = useState('')


    const {
        register,
        handleSubmit,
        control,
        formState: { errors }, } = useForm()

    let IndividualBVN

    indvRecord.forEach((ind, i) => {
        IndividualBVN = ind.bvn
    })

    console.log(IndividualBVN);
    // setUserBvn(IndividualBVN)

    const router = useRouter();
    useEffect(() => {
        if (router && router.query) {
            let indvkgtin = router.query.ref;
            let kgtin = {
                "KGTIN": `${indvkgtin}`
            }
            console.log(indvkgtin)
            setAuthToken();
            const fetchPost = async () => {
                setIsFetching(true);
                try {
                    let res = await axios.post(
                        `${url.BASE_URL}taxpayer/view-individual`, kgtin
                    );
                    res = res.data.body;
                    setindividualRec(res)
                    setIsFetching(false);
                } catch (e) {
                    setIsFetching(false);
                }
            };
            fetchPost();
        }
    }, [router]);

    const onSubmit = (data) => {
        setIsFetching(true)
        if (data.bvn === IndividualBVN || data.bvn === "") {
            delete data.bvn
            axios.put(`${url.BASE_URL}taxpayer/update-individual`, data)
                .then(function (response) {
                    setIsFetching(false)
                    toast.success("Updated Successfully!");
                })
                .catch(function (error) {
                    console.log(error);
                    setIsFetching(false)
                    toast.error("Failed to update Taxpayer!");
                })
        }
        else {
            axios.put(`${url.BASE_URL}taxpayer/update-individual`, data)
                .then(function (response) {
                    setIsFetching(false)
                    toast.success("Updated Successfully!");
                })
                .catch(function (error) {
                    console.log(error);
                    setIsFetching(false)
                    toast.error("Failed to update Taxpayer!");
                })
        }


    };

    console.log(indvRecord);


    return (
        <div>
            <ToastContainer />
            <div className="block p-6 rounded-lg bg-white w-full">

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
                        <p className="font-bold">Updating Taxpayer...</p>
                    </div>
                )}
                <div className="flex justify-center mb-4">
                    <h6 className="p-2 font-bold">Update Individual Taxpayer</h6>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {indvRecord.map((ind, i) => (
                        <div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="form-group hidden">
                                    <p>Id</p>
                                    <input defaultValue={ind.id} name="id" readOnly ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>

                                <div className="form-group ">
                                    <p>Title</p>
                                    <input defaultValue={ind.indv_title} name="indv_title" readOnly ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>

                                <div className="form-group">
                                    <p>Surname</p>
                                    <input readOnly defaultValue={ind.surname} name="surname" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>

                                <div className="form-group ">
                                    <p>First Name</p>
                                    <input readOnly defaultValue={ind.first_name} name="first_name" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>

                                <div className="form-group ">
                                    <p>Middle name</p>
                                    <input readOnly defaultValue={ind.middle_name} name="middle_name" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>

                                <div className="form-group ">
                                    <p>Date of Birth</p>
                                    <input readOnly defaultValue={ind.birth_date} name="birth_date" ref={register()} type="date" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>


                                <div className="form-group ">
                                    <p>Phone Number</p>
                                    <input defaultValue={ind.phone_number} name="phone_number" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>

                                <div className="form-group ">
                                    <p>Gender</p>
                                    <input readOnly defaultValue={ind.gender} name="gender" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>

                                <div className="form-group ">
                                    <p>Marital Status</p>
                                    <input readOnly defaultValue={ind.marital_status} name="marital_status" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>

                                <div className="form-group ">
                                    <p>State of residence</p>
                                    <input readOnly defaultValue={ind.stateOfResidence} name="state_of_residence" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>

                                <div className="form-group ">
                                    <p>LGA</p>
                                    <input readOnly defaultValue={ind.lga} name="lga" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>
                                <div className="form-group ">
                                    <p>BVN</p>
                                    <input readOnly defaultValue={ind.bvn} name="bvn" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>
                                <div className="form-group ">
                                    <p>Tax Office</p>
                                    <input readOnly defaultValue={ind.tax_office} name="tax_office" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>
                            </div>
                            <div className="m-4">
                                <hr />
                                <h6 className="m-3 font-bold">Additional Information</h6>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="form-group">
                                    <p>Email</p>
                                    <input readOnly defaultValue={ind.email} name="email" ref={register()} type="email" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>

                                {/* <div className="form-group ">
                            <p>NIN</p>
                            <input name="nin" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div> */}

                                <div className="form-group ">
                                    <p>Birth Place</p>
                                    <input readOnly defaultValue={ind.birth_place} name="birth_place" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>
                                <div className="form-group ">
                                    <p>Occupation</p>
                                    <input readOnly defaultValue={ind.occupation} name="occupation" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>
                                <div className="form-group ">
                                    <p>Mother's Name</p>
                                    <input readOnly defaultValue={ind.mother_name} name="mother_name" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>

                                <div className="form-group ">
                                    <p>House no</p>
                                    <input defaultValue={ind.house_no} name="house_no" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>
                                <div className="form-group ">
                                    <p>Street</p>
                                    <input defaultValue={ind.street} name="street" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>
                                <div className="form-group ">
                                    <p>Ward</p>
                                    <input readOnly defaultValue={ind.ward} name="ward" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>
                                <div className="form-group ">
                                    <p>City</p>
                                    <input defaultValue={ind.city} name="city" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>
                                <div className="form-group ">
                                    <p>Nationality</p>
                                    <input readOnly defaultValue={ind.nationality} name="nationality" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>

                                <div className="form-group ">
                                    <p>State of Origin</p>
                                    <input readOnly defaultValue={ind.stateOfOrigin} name="state_of_origin" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>
                                <div className="form-group ">
                                    <p>Sector</p>
                                    <input readOnly defaultValue={ind.sector} name="sector" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>
                                <div className="form-group ">
                                    <p>Category</p>
                                    <input readOnly defaultValue={ind.category} name="category" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>

                                <div className="form-group ">
                                    <p>Income Source</p>
                                    <input readOnly defaultValue={ind.income_source} name="income_source" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>
                                <div className="form-group ">
                                    <p>Tax Authority</p>
                                    <input readOnly defaultValue={ind.tax_authority} name="tax_authority" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                    />
                                </div>
                                <div className="form-group ">
                                    <p>Employer TIN</p>
                                    <input readOnly defaultValue={ind.employer_tin} name="employer_tin" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500" />
                                </div>
                                <div className="form-group ">
                                    <p>Employer's Name</p>
                                    <input readOnly defaultValue={ind.employer_name} name="employer_name" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500" />
                                </div>

                            </div>

                            <div className="mb-6 flex justify-center">
                                <button
                                    style={{ backgroundColor: "#84abeb" }}
                                    className="btn btn-default text-white btn-outlined bg-transparent rounded-md"
                                    type="submit"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    ))}
                </form>
            </div>
        </div>
    )
}

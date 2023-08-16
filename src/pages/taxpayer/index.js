import React, { useEffect, useState } from 'react'
import axios from "axios";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { useRouter } from 'next/router';


export default function Index() {
    const [taxOffice, setTaxOffice] = useState([])
    const [sector, setSector] = useState([])
    const [incomeSource, setIncomSource] = useState([])
    const [state, setState] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [lga, setLga] = useState([])
    const [createError, setCreateError] = useState("")
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const kogiLga = lga.filter(item => item.jtb_states === 22);
 

    useEffect(() => {

        setAuthToken();
        const fetchPost = async () => {
            try {
                let res = await axios.get(`${url.BASE_URL}user/items`);
                console.log(res);
                let itemsBody = res.data.body
                let taxOffice = itemsBody.taxOffice
                let sector = itemsBody.sector
                let incSource = itemsBody.incomeSource
                let stat = itemsBody.state
                let lg = itemsBody.lga
                setIncomSource(incSource)
                setTaxOffice(taxOffice)
                setSector(sector)
                setState(stat)
                setLga(lg)
            } catch (e) {
                console.log(e);
            }
        };
        fetchPost();

    }, []);

    const onSubmit = (data) => {
        console.log(data);
        setIsFetching(true)
        axios.post(`${url.BASE_URL}taxpayer/new-individual`, data)
            .then(function (response) {
                setIsFetching(false)
                toast.success("Created Successfully!");
                router.push('/reports-individual')
            })
            .catch(function (error) {
                setIsFetching(false)
                if (error.response) {
                    setCreateError(() => error.response.data.message);
                    toast.error(createError)
                } else {
                    toast.error("Failed to create Taxpayer!");
                }

            })
    };



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
                        <p className="font-bold">Creating Taxpayer...</p>
                    </div>
                )}
                <div className="flex justify-center mb-4">
                    <h6 className="p-2 font-bold">Register Individual Taxpayer</h6>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="form-group ">
                            <p>Title</p>
                            <select name="indv_title" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Mrss">Miss</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <p>Surname</p>
                            <input name="surname" type="text" className="form-control mb-4 w-full rounded font-light text-gray-500" ref={register({ required: "Surname is required" })}
                            />
                            {errors.surname && <small className="text-red-600">{errors.surname.message}</small>}
                        </div>

                        <div className="form-group ">
                            <p>First Name</p>
                            <input name="first_name" ref={register({ required: "First name is required" })} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                            {errors.first_name && <small className="text-red-600">{errors.first_name.message}</small>}
                        </div>

                        <div className="form-group ">
                            <p>Middle name</p>
                            <input name="middle_name" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>Date of Birth</p>
                            <input name="birth_date" ref={register({ required: "Birthdate is required" })} type="date" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                            {errors.birth_date && <small className="text-red-600">{errors.birth_date.message}</small>}
                        </div>


                        <div className="form-group ">
                            <p>Phone Number</p>
                            <input name="phone_number" ref={register({ required: "Phone number is Required" })} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                            {errors.phone_number && <small className="text-red-600">{errors.phone_number.message}</small>}
                        </div>

                        <div className="form-group ">
                            <p>Gender</p>
                            <select name="gender" ref={register({ required: "Gender is Required" })} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </select>
                            {errors.gender && <small className="text-red-600">{errors.gender.message}</small>}
                        </div>

                        <div className="form-group ">
                            <p>Marital Status</p>
                            <select name="marital_status" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                            </select>
                        </div>

                        <div className="form-group ">
                            <p>State of residence</p>
                            <input readOnly name="state_of_residence" value="Kogi" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>LGA</p>
                            <select name="lga" ref={register({ required: "LGA is Required" })} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                {kogiLga.map((lg) => <option key={lg.idlga} value={lg.name}>{lg.name}</option>)}
                            </select>
                            {errors.lga && <small className="text-red-600">{errors.lga.message}</small>}
                        </div>
                        <div className="form-group ">
                            <p>BVN</p>
                            <input name="bvn" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>
                        <div className="form-group ">
                            <p>Tax Office</p>
                            <select name="tax_office" ref={register({ required: "Tax office is Required" })} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                {taxOffice.map((office) => <option key={office.idstation} value={office.station_code}>{office.name}</option>)}
                            </select>
                            {errors.tax_office && <small className="text-red-600">{errors.tax_office.message}</small>}
                        </div>
                    </div>
                    <div className="m-4">
                        <hr />
                        <h6 className="m-3 font-bold">Additional Information</h6>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="form-group">
                            <p>Email</p>
                            <input name="email" ref={register()} type="email" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>
                        <div className="form-group">
                            <p>Alternate phone number</p>
                            <input name="mobile_number" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        {/* <div className="form-group ">
                            <p>NIN</p>
                            <input name="nin" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div> */}

                        <div className="form-group ">
                            <p>Birth Place</p>
                            <input name="birth_place" ref={register({ required: "Birth Place is Required" })} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                            {errors.birth_place && <small className="text-red-600">{errors.birth_place.message}</small>}
                        </div>
                        <div className="form-group ">
                            <p>Occupation</p>
                            <input name="occupation" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>
                        <div className="form-group ">
                            <p>Mother's Name</p>
                            <input name="mother_name" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>House no</p>
                            <input name="house_no" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>
                        <div className="form-group ">
                            <p>Street</p>
                            <input name="street" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>
                        <div className="form-group ">
                            <p>Ward</p>
                            <input name="ward" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>
                        <div className="form-group ">
                            <p>City</p>
                            <input name="city" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>
                        <div className="form-group ">
                            <p>Nationality</p>
                            <input name="nationality" ref={register()} readOnly value={'Nigerian'} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>State of Origin</p>
                            <select name="state_of_origin" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                {state.map((st) => <option key={st.jtb_idstates} value={st.jtb_idstates}>{st.state}</option>)}
                            </select>
                        </div>
                        {/* <div className="form-group ">
                            <p>Sector</p>
                            <select name="sector" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                {sector.map((sect) => <option key={sect.id} value={sect.sector_name}>{sect.sector_name}</option>)}
                            </select>
                        </div> */}
                        <div className="form-group ">
                            <p>Category</p>
                            <select name="category" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                <option value="Agric">Agric</option>
                                <option value="Fishery">Fishery</option>
                            </select>
                        </div>

                        <div className="form-group ">
                            <p>Income Source</p>
                            <select name="income_source" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                {incomeSource.map((src) => <option key={src.id} value={src.source}>{src.source}</option>)}
                            </select>
                        </div>
                        <div className="form-group ">
                            <p>Tax Authority</p>
                            <input readOnly name="tax_authority" value="KGIRS" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500" />
                        </div>
                        {/* <div className="form-group ">
                            <p>Employer TIN</p>
                            <input name="employer_tin" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500" />
                        </div>
                        <div className="form-group ">
                            <p>Employer's Name</p>
                            <input name="employer_name" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500" />
                        </div> */}

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

import React, { useEffect, useState } from 'react'
import { SubmitButton } from '../../components/CustomButton/CustomButton'
import axios from "axios";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

export default function Index() {
    const [department, setDepartment] = useState([])
    const [taxOffice, setTaxOffice] = useState([])
    const [sector, setSector] = useState([])
    const [incomeSource, setIncomSource] = useState([])
    const [state, setState] = useState([])
    const [lga, setLga] = useState([])
    const [typOfOrg, setTypeOfOrg] = useState([])
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }, } = useForm()

    useEffect(() => {

        setAuthToken();
        const fetchPost = async () => {
            try {
                let res = await axios.get(`${url.BASE_URL}user/items`);
                let itemsBody = res.data.body
                let taxOffice = itemsBody.taxOffice
                let sector = itemsBody.sector
                let incSource = itemsBody.incomeSource
                let stat = itemsBody.state
                let lg = itemsBody.lga
                let orgType = itemsBody.orgType
                setState(stat)
                setSector(sector)
                setTypeOfOrg(orgType)
                setIncomSource(incSource)
                setTaxOffice(taxOffice)
                setLga(lg)
            } catch (e) {

            }
        };
        fetchPost();

    }, []);

    const onSubmit = (data) => {
        setIsFetching(true)
        axios.post(`${url.BASE_URL}user/signup`, data)
            .then(function (response) {
                setIsFetching(false)
                toast.success("Created Successfully!");
            })
            .catch(function (error) {
                console.log(error);
                setIsFetching(false)
                toast.error("Failed to create user!");
            })
    };



    return (
        <div>
            <div className="block p-6 rounded-lg bg-white w-full">
                <div className="flex justify-center mb-4">
                    <h6 className="p-2 font-bold">Non-Individual Taxpayer</h6>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="form-group">
                            <p>Company Name</p>
                            <input name="firstname" type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                ref={register()}
                            />
                        </div>

                        <div className="form-group ">
                            <p>Registered Name</p>
                            <input ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>Type of Organization</p>
                            <select name="title" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                {typOfOrg.map((org) => <option key={org.id} value={org.org_type_name}>{org.org_type_name}</option>)}
                            </select>
                        </div>


                        <div className="form-group ">
                            <p>RC No.</p>
                            <input name="Surname" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>Enterprise Reg Number</p>
                            <input name="dob" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>


                        <div className="form-group ">
                            <p>Line of Business</p>
                            <input name="number" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>Date of Commencement</p>
                            <input name="number" ref={register()} type="date" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>Sector</p>
                            <select name="sector" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                {sector.map((sect) => <option key={sect.id} value={sect.sector_name}>{sect.sector_name}</option>)}
                            </select>
                        </div>

                        <div className="form-group ">
                            <p>Phone Number</p>
                            <input name="number" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>Email</p>
                            <input name="number" ref={register()} type="email" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>House No</p>
                            <input name="number" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>Street</p>
                            <input name="number" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>City</p>
                            <input name="number" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>State</p>
                            <input name="state" value="Kogi" disabled ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                            {/* <select name="state" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                {state.map((st) => <option key={st.jtb_idstates} value={st.jtb_idstates}>{st.state}</option>)}
                            </select> */}
                        </div>

                        <div className="form-group ">
                            <p>LGA</p>
                            <select name="lga" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                {lga.map((lg) => <option key={lg.idlga} value={lg.name}>{lg.name}</option>)}
                            </select>
                        </div>
                        <div className="form-group ">
                            <p>Tax Authority</p>
                            <input disabled name="bvn" value="Kogi State Board of Internal Revenue" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>
                        <div className="form-group ">
                            <p>Tax Office</p>
                            <select name="office" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                {taxOffice.map((office) => <option key={office.idstation} value={office.station_code}>{office.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="m-4">
                        <hr />
                        <h6 className="m-3 font-bold">Additional Information</h6>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="form-group">
                            <p>Company TIN</p>
                            <input name="email" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>Date of Incoperation</p>
                            <input name="nin" ref={register()} type="date" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>Ward</p>
                            <input name="birthplace" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>
                        <div className="form-group ">
                            <p>Issuance Place</p>
                            <input name="occupation" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>
                        <div className="form-group ">
                            <p>Mobile No</p>
                            <input name="mothername" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>
                        <div className="form-group ">
                            <p>Updated by</p>
                            <input name="mothername" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>
                        <div className="form-group ">
                            <p>Update Time</p>
                            <input name="mothername" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
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

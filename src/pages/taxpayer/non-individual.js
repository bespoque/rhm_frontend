import React, { useEffect, useState } from 'react'
import axios from "axios";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Loader from 'react-loader-spinner';

export default function NonInd() {
    const [taxOffice, setTaxOffice] = useState([])
    const [sector, setSector] = useState([])
    const [lga, setLga] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [typOfOrg, setTypeOfOrg] = useState([])
    const {
        register,
        handleSubmit,
    } = useForm()


    const kogiLga = lga.filter(item => item.jtb_states === 22);

    useEffect(() => {

        setAuthToken();
        const fetchPost = async () => {
            try {
                let res = await axios.get(`${url.BASE_URL}user/items`);
                let itemsBody = res.data.body
                let taxOffice = itemsBody.taxOffice
                let sector = itemsBody.sector
                let lg = itemsBody.lga
                let orgType = itemsBody.orgType
                setSector(sector)
                setTypeOfOrg(orgType)
                setTaxOffice(taxOffice)
                setLga(lg)
            } catch (e) {

            }
        };
        fetchPost();

    }, []);

    const onSubmit = (data) => {
        setIsFetching(true)
        axios.post(`${url.BASE_URL}taxpayer/new-non-individual`, data)
            // axios.post(`${url.BASE_URL}user/signup`, data)
            .then(function (response) {
                setIsFetching(false)
                toast.success("Created Successfully!");
            })
            .catch(function (error) {
                setIsFetching(false)
                toast.error("Failed to create Taxpayer!");
            })
    };



    return (
        <div>
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
                    <p className="font-bold">Creating Taxpayer...</p>
                </div>
            )}
            <div className="block p-6 rounded-lg bg-white w-full">
                <div className="flex justify-center mb-4">
                    <h6 className="p-2 font-bold">Non-Individual Taxpayer</h6>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="form-group">
                            <p>Company Name <span className="text-red-400">*</span></p>
                            <input name="coy_name" required type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                ref={register()}
                            />
                        </div>

                        <div className="form-group">
                            <p>Registered Name <span className="text-red-400">*</span></p>
                            <input ref={register()} required name="regist_name" type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group">
                            <p>Type of Organization <span className="text-red-400">*</span></p>
                            <select name="type_of_organisation" required ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                <option value="">Please select</option>
                                {typOfOrg.map((org) => <option key={org.id} value={org.org_type_name}>{org.org_type_name}</option>)}
                            </select>
                        </div>


                        <div className="form-group ">
                            <p>RC No.</p>
                            <input name="rcno" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>Enterprise Reg Number</p>
                            <input required name="enterprise_reg_no" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>


                        <div className="form-group ">
                            <p>Line of Business <span className="text-red-400">*</span></p>
                            <input required name="line_of_business" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>Date of Commencement <span className="text-red-400">*</span></p>
                            <input required name="date_of_commencement" ref={register()} type="date" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>
                        <div className="form-group ">
                            <p>Date of Incoperation <span className="text-red-400">*</span></p>
                            <input required name="date_of_incorporation" ref={register()} type="date" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>Sector <span className="text-red-400">*</span></p>
                            <select name="sector" required ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                {sector.map((sect) => <option key={sect.id} value={sect.sector_name}>{sect.sector_name}</option>)}
                            </select>
                        </div>

                        <div className="form-group ">
                            <p>Phone Number <span className="text-red-400">*</span></p>
                            <input required name="phone_no" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>Email</p>
                            <input name="e_mail" ref={register()} type="email" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>House No <span className="text-red-400">*</span></p>
                            <input required name="house_no" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>Street <span className="text-red-400">*</span></p>
                            <input required name="street" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>City</p>
                            <input name="city" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>State</p>
                            <input name="state" required value="Kogi" readOnly ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>LGA <span className="text-red-400">*</span></p>
                            <select name="lga" ref={register()} required className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                <option value="">Please Select</option>
                                {kogiLga.map((lg) => <option key={lg.idlga} value={lg.name}>{lg.name}</option>)}
                            </select>
                        </div>

                        <div className="form-group ">
                            <p>Tax Office <span className="text-red-400">*</span></p>
                            <select name="tax_office" required ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                <option value="">Please Select</option>
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
                            <input name="companytin" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>



                        <div className="form-group ">
                            <p>Ward</p>
                            <input name="ward" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>
                        <div className="form-group ">
                            <p>Alternate Phone</p>
                            <input name="mobile_no" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
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

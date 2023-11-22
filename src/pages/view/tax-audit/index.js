import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FormatMoneyComponentReport } from '../../../components/FormInput/formInputs'
import { useRouter } from 'next/router';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ProcessorSpinner } from '../../../components/spiner';
import axios from "axios";
import url from '../../../config/url';
import setAuthToken from '../../../functions/setAuthToken';

export default function AuditCert() {
    const [fixedValues, Amount] = useState({ amount: 0 });
    const router = useRouter()
    const [userInfo, setUserInfo] = useState(() => { });
    const [isFetchingUserInfo, setIsFetchingUserInfo] = useState(false);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
    })


    const taxIdFetcher = async (e) => {
        setAuthToken()
        let id = e.target.value;
        if (id.length === 10 && !errors.hasOwnProperty("kgtin")) {
            setIsFetchingUserInfo(true);
            try {
                let result = await axios.post(`${url.BASE_URL}taxpayer/taxpayer-profile`, {
                    kgtin: id,
                });
                setUserInfo(() => result.data.body.taxpayer);
                setIsFetchingUserInfo(false);
            } catch (e) {
                setIsFetchingUserInfo(false);
                setUserInfo({});
                if (e && e?.response?.data?.message) {
                    setTimeout(() => {
                        alert("User not Found");
                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("There was an error...Please try again");
                    }, 100);
                }
            }
        }
    };

    const submitForm = (data) => {
        let formFields = (data)
        if (formFields?.revItem?.length === 0) {
            alert("Please select Revenue Item")
        } else {

            router.push({
                pathname: '/view/tax-audit/cert-design',
                query: { formData: JSON.stringify(data) },
            });
        }
    }
    return (
        <div className="flex justify-center">
            {isFetchingUserInfo && <ProcessorSpinner />}
            <form onSubmit={handleSubmit(submitForm)} >
                <h5 className="text-center mb-4">Generate Tax Audit Certificate</h5>
                <div className="grid grid-cols-2 gap-2">
                    <div className="form-group">
                        <p>TAX Id</p>
                        <input
                            required
                            onChange={(e) => taxIdFetcher(e)}
                            type="text"
                            name="kgtin"
                            maxLength="10"
                            className="form-control mb-4 w-full rounded font-light"
                            ref={register({
                                minLength: 10,
                                maxLength: 11,
                                pattern: {
                                    value: /^[0-9]*[.]?[0-9]*$/,
                                    message: "Tax Id must be a number",
                                },
                            })}
                        />
                        {errors.kgtin && errors.kgtin.type === "minLength" && (
                            <p className="text-red-600">
                                Tax Id must be at least 10 digits
                            </p>
                        )}
                        {errors.kgtin && errors.kgtin.type === "maxLength" && (
                            <p className="text-red-600">
                                Tax Id must be not be more than 10 digits
                            </p>
                        )}

                        {errors.kgtin && (
                            <p className="text-red-600 bg-white">
                                {errors.kgtin.message}
                            </p>
                        )}
                    </div>

                    <div className="form-group ">
                        <p>Full name</p>
                        <input type="text" required className="form-control mb-4 w-full rounded font-light text-gray-500"
                            value={userInfo?.tp_name || ""} name="fullname" ref={register()}
                        />
                    </div>

                    <div className="form-group">
                        <p>Amount</p>
                        <FormatMoneyComponentReport
                            ref={register()}
                            name="amount"
                            control={control}
                            // defaultValue={""}
                            onValueChange={(v) => Amount({ amount: v })}
                            placeholder="₦"
                            required={true}
                        />
                    </div>

                    <div className="form-group" >
                        <p>Subject</p>
                        <select ref={register()} name="subject" required className="form-control mb-4 SlectBox w-full rounded font-light text-gray-500" id="taxStation">
                            <option value="TAX AUDIT CLEARANCE CERTIFICATE">
                                TAX AUDIT CLEARANCE CERTIFICATE
                            </option>
                            <option value="WHT INVESTIGATION CLEARANCE CERTIFICATE">
                                WHT INVESTIGATION CLEARANCE CERTIFICATE
                            </option>
                            <option value="PAYE INVESTIGATION CLEARANCE CERTIFICATE">
                                PAYE INVESTIGATION CLEARANCE CERTIFICATE
                            </option>
                            <option value="PAYE AND WHT INVESTIGATION CLEARANCE CERTIFICATE">
                                PAYE AND INVESTIGATION CLEARANCE CERTIFICATE
                            </option>
                        </select>

                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="revItem"
                                        value="PAYE"
                                        ref={register()}
                                        className="form-checkbox"
                                    />
                                    <label htmlFor="PAYE">PAYE</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="revItem"
                                        value="Withholding"
                                        ref={register()}
                                        className="form-checkbox"
                                    />
                                    <label htmlFor="Withholding Tax">Withholding Tax</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="revItem"
                                        value="Business Premises"
                                        ref={register()}
                                        className="form-checkbox"
                                    />
                                    <label htmlFor="Business Premises">Business Premises</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="revItem"
                                        value="Development Levies"
                                        ref={register()}
                                        className="form-checkbox"
                                    />
                                    <label htmlFor="Development Levies">Development Levies</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="revItem"
                                        value="Social Service"
                                        ref={register()}
                                        className="form-checkbox"
                                    />
                                    <label htmlFor="Social Service">Social Service</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="revItem"
                                        value="Stamp Duty"
                                        ref={register()}
                                        className="form-checkbox"
                                    />
                                    <label htmlFor="Stamp Duty">Stamp Duty</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="revItem"
                                        value="Fire Service Fee"
                                        ref={register()}
                                        className="form-checkbox"
                                    />
                                    <label htmlFor="Fire Service Fee">Fire Service Fee</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="revItem"
                                        value="Signage Fee"
                                        ref={register()}
                                        className="form-checkbox"
                                    />
                                    <label htmlFor="Signage Fee">Signage Fee</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="revItem"
                                        value="Ground Rent"
                                        ref={register()}
                                        className="form-checkbox"
                                    />
                                    <label htmlFor="Ground Rent">Ground Rent</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="revItem"
                                        value="Capital Gain"
                                        ref={register()}
                                        className="form-checkbox"
                                    />
                                    <label htmlFor="Capital Gain">Capital Gain Tax</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="revItem"
                                        value=" Haulage Fee"
                                        ref={register()}
                                        className="form-checkbox"
                                    />
                                    <label htmlFor=" Haulage Fee"> Haulage Fee</label>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className=" gap-1">
                        <div className="form-group ">
                            <p>Audit start date</p>
                            <Controller
                                name="sdate"
                                control={control}
                                render={({ onChange, value }) => {
                                    return (
                                        <DatePicker
                                            className="form-control w-full rounded"
                                            onChange={onChange}
                                            selected={value}
                                            showYearPicker
                                            dateFormat="yyyy"
                                            yearItemNumber={8}
                                            placeholderText="Select Year"
                                            required={true}
                                        />
                                    );
                                }}
                            />
                        </div>

                        <div className="form-group ">
                            <p>Audit end date</p>
                            <Controller
                                name="edate"
                                control={control}
                                render={({ onChange, value }) => {
                                    return (
                                        <DatePicker
                                            className="form-control w-full rounded"
                                            onChange={onChange}
                                            selected={value}
                                            showYearPicker
                                            dateFormat="yyyy"
                                            yearItemNumber={8}
                                            placeholderText="Select Year"
                                        />
                                    );
                                }}
                            />
                        </div>
                        <div className="justify-self-end">
                            <p>Address</p>
                            <textarea
                                name="address"
                                required
                                ref={register()}
                                className="form-control mb-4 w-full rounded font-light text-gray-500"
                                cols="30" rows="2"
                                defaultValue={userInfo?.address || ""}
                            >
                            </textarea>
                        </div>
                    </div>

                </div>

                <div className="mb-6 flex justify-center">
                    <button
                        style={{ backgroundColor: "#84abeb" }}
                        className="btn btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                    >
                        Get Cert
                    </button>
                </div>
            </form>
        </div>
    )
}

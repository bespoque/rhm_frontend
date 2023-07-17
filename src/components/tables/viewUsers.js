import Widget from "../widget";
import Link from 'next/link';
import { shallowEqual, useSelector } from 'react-redux';
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import setAuthToken from "../../functions/setAuthToken";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "react-loader-spinner";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import url from "../../config/url";

const fields = [
  {
    name: "SN",
    key: "serialNo",
  },
  {
    name: "Name",
    key: "name",
  },
  {
    name: "Email",
    key: "email",
  },
  {
    name: "Station",
    key: "station",
  },
  {
    name: "Phone",
    key: "phone",
  },
  {
    name: "Active",
    key: "active",
  },
  {
    name: "Created at",
    key: "createdAt",
  },
];

export const ViewUsersTable = ({ remittance }) => {
  let items = remittance;

  const { config, palettes, auth } = useSelector(
    (state) => ({
      config: state.config,
      palettes: state.palettes,
      auth: state.authentication.auth,
    }),
    shallowEqual
  );

  const admin = [1]
  const decoded = jwt.decode(auth);
  const userGroup = decoded.groups

  console.log("Items", items);
  return (
    <>
      <Widget>
        <table className="table divide-y">
          <thead>
            <tr className="">
              {fields.map((field, i) => (
                <th key={i} className="">
                  {field.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((remittance, i) => (
              <tr key={i} className="">
                {fields.map((field, j) => (
                  <td key={j} className="">
                    {/* {remittance[field.key]} */}


                    {userGroup.some(r => admin.includes(r)) ?
                      <Link legacyBehavior href={`/view/users/${remittance.email}`}>
                        <a className="hover:text-blue-500">
                          {remittance[field.key]}
                        </a>
                      </Link>

                      :
                      <p>
                        {remittance[field.key]}
                      </p>
                    }

                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

      </Widget>
    </>
  );
};


export default function UpdateUser({ user, groups }) {

  const [taxStation, setTaxStation] = useState([])
  const [uploadErrors, setUploadErrors] = useState(() => []);
  const [department, setDepartment] = useState([])
  const [rhmGroups, setRhmGroups] = useState([])
  const [isFetching, setIsFetching] = useState(() => false);
  const [isFetching2, setIsFetching2] = useState(() => false);
  const [isFetching4, setIsFetching4] = useState(() => false);
  const [passwordCheck, setPasswordCheck] = useState("")
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

  let passwordCompare


  user.forEach((el) => (
    passwordCompare = el.password
  ))

  let userGrp = groups.map((el) => {
    return el.group
  })

  const stringUserGrp = String(userGrp)
console.log(stringUserGrp);
  setAuthToken();
  const onSubmit = (data) => {
    data.userGroup = data.userGroup.toString()
    if (passwordCompare === data.password) {
      setIsFetching4(true)
      delete data.password
      console.log(data);
      axios.put(`${url.BASE_URL}user/update-user`, data)
        .then(function (response) {
          setIsFetching4(false)
          toast.success("Updated Successfully!");
          // router.push("/dashboard")
        })
        .catch(function (error) {
          setIsFetching4(false)
          if (error.response) {
            setUploadErrors(() => error.response.data.message);
            toast.error(uploadErrors)
          } else {
            toast.error("Failed to Updated user!");
          }
        })
    } else {
      setIsFetching4(true)
      console.log(data);
      axios.put(`${url.BASE_URL}user/update-user`, data)
        .then(function (response) {
          setIsFetching4(false)
          toast.success("Updated Successfully!");
          router.push("/dashboard")
        })
        .catch(function (error) {
          setIsFetching4(false)
          if (error.response) {
            setUploadErrors(() => error.response.data.message);
            toast.error(uploadErrors)
          } else {
            toast.error("Failed to Updated user!");
          }
        })
    }
  };


  return (

    <div>

      <ToastContainer />

      {isFetching ? (
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
      ) :
        <div className="block p-6 rounded-lg bg-white w-full">

          {isFetching4 && (
            <div className="flex justify-center item mb-2">
              <Loader
                visible={isFetching4}
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

          <div className="flex justify-center mb-4">
            <h6 className="p-2">Update User</h6>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group ">
                <p>Full name</p>
                {user.map((el, i) => (
                  <input type="text" name="name" className="form-control mb-4 w-full rounded font-light text-gray-500"
                    placeholder="Enter Full name" defaultValue={el.name} ref={register({ required: "Name is required" })}
                  />
                ))}
                {errors.name && <p className="text-red-600">{errors.name.message}</p>}
              </div>

              <div className="form-group">
                <p>Password</p>
                {user.map((el, i) => (
                  <input name="password" type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                    defaultValue={el.password} ref={register({ required: "Password is required", minLength: { value: 8, message: "password must be at least 8 charachers in length" } })}
                  />
                ))}
                {errors.password && <p className="text-red-600">{errors.password.message}</p>}
              </div>

              <div className="form-group ">
                <p>Department</p>
                <select name="dept" ref={register({ valueAsNumber: true })} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                  {user.map((def, i) => <option selected defaultValue={def.dept} key={def.id}>{def.department}</option>)}
                  {department.map((dept) => <option value={dept.id} key={dept.id}>{dept.name}</option>)}
                </select>
              </div>

              <div className="form-group ">
                <p>Tax Station</p>
                <select ref={register()} name="station" class="form-control mb-4 SlectBox w-full rounded font-light text-gray-500" id="taxStation">
                  {user.map((stat, i) => <option selected value={stat.station} key={stat.id}>{stat.station}</option>)}
                  {taxStation.map((office) => <option value={office.station_code} key={office.idstation}>{office.name}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <p>User group</p>

                <Controller
                  control={control}
                  // defaultValue={options.map(c => c.value).toString()}
                  defaultValue={stringUserGrp}
                  name="userGroup"
                  rules={{ required: "please select user group" }}
                  render={({ onChange, value, ref }) => (
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
                {user.map((el, i) => (
                  <input readOnly name="email" defaultValue={el.email} ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                  />
                ))}
              </div>

              <div className="form-group ">
                <p>Phone Number</p>
                {user.map((el, i) => (
                  <input name="phone" defaultValue={el.phone} ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                  />
                ))}
              </div>

              <div className="form-group ">
                <p>Active</p>
                {user.map((el, i) => (
                  <select ref={register()} defaultValue={el.active} name="active" class="form-control mb-4 SlectBox  w-full rounded font-light text-gray-500">
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                  </select>

                ))}
              </div>
              <div className="form-group hidden">
                <p>Created By</p>
                {user.map((el, i) => (
                  <input name="createdBy" defaultValue={el.createdBy} ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                  />
                ))}
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
          </form>
        </div>

      }


    </div>
  )
}
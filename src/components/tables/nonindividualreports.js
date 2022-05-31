import dateformat from "dateformat";
import { shallowEqual, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useRef, useState } from "react";
import Loader from "react-loader-spinner";
import url from '../../config/url';
import axios from "axios";
import { addDays, subDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useRouter } from "next/router";
import Reportstable from "../../pages/reports/reportstable";
import IndividualReportstable from "../../pages/reports-individual/individualreportstable";
import { useForm } from "react-hook-form";
import NonIndividualReportstable from "../../pages/reports-non-individual/nonindividualreportstable";

export const StartNonIndividualReportView = () => {
  const [fixedValues, SetFixValuesStart] = useState({ amount: 0 });
  const [fixedValuesend, SetFixValuesEnd] = useState({ amount: 0 });
  const [revenueItem, setRevenueItem] = useState([]);
  const [station, setStation] = useState([]);
  const [FilteredData, setFilteredData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [tableState, setTableState] = useState("hidden");


  const router = useRouter();

  const [state, setState] = useState([
    {
      startDate: null,
      // endDate: null,
      endDate: new Date(""),
      key: 'selection'
    }
  ]);

  const { config, palettes, auth } = useSelector(
    (state) => ({
      config: state.config,
      palettes: state.palettes,
      auth: state.authentication.auth,
    }),
    shallowEqual
  );


  const reportRange = [39]
  const decoded = jwt.decode(auth);
  const userGroup = decoded.groups

  let startDate
  let endDate

  if (state[0].startDate === null) {

    startDate = ""

  } else {
    startDate = dateformat(state[0].startDate, "yyyy-mm-dd")
  }

// * using == to compare endDate value
  if (state[0].endDate === null || state[0].endDate === "" || state[0].endDate === undefined || state[0].endDate == "Invalid Date") {

    endDate = ""

  } else {
    endDate = dateformat(state[0].endDate, "yyyy-mm-dd")
  }

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm()


  useEffect(() => {

    setAuthToken();
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}user/items`);
        let itemsBody = res.data.body
        let office = itemsBody.taxOffice
        setStation(office)

      } catch (e) {
        // setIsFetching(false);
        console.log(e);
      }
    };
    fetchPost();

  }, []);


  const AdvancedSearch = (data) => {
    setIsFetching(true)
    data.createdStart = startDate
    data.createdEnd = endDate

    axios.post(`${url.BASE_URL}taxpayer/list-non-individual`, data)
      .then(function (response) {
        let search = response.data.body;
        setFilteredData(search)
        console.log("FilteredData", FilteredData);
        setIsFetching(false)
        setTableState('')
      })
      .catch(function (error) {
        setTableState('')
        setIsFetching(false)

      })
  }

  return (
    <>
      <div className="border mb-3 block p-6 rounded-lg bg-white w-full">
        <form onSubmit={handleSubmit(AdvancedSearch)}>


          <div className="grid grid-cols-4 gap-4 place-content-center">

            <div className="form-group mb-6">
              <label htmlFor="kgtin"> Taxpayer ID</label>
              <input type="text" ref={register()} name="kgtin" className="form-control w-full rounded font-light text-gray-500" />
            </div>

            <div className="form-group mb-6">
              <label> Company Name</label>
              <input type="text" ref={register()} name="coy_name" className="form-control w-full rounded font-light text-gray-500"
              />
            </div>

            <div className="form-group mb-6">
              <label className="" htmlFor="kgtin"> Tax Station</label>
              <select ref={register()} name="tax_office" className="form-control w-full rounded font-light text-gray-500">
                <option value="">All</option>
                {station.map((office) => <option key={office.idstation} value={office.station_code}>{office.name}</option>)}
              </select>
            </div>

            <div className="form-group mb-6">
              <label> Phone </label>
              <input type="text" ref={register()} name="phone" className="form-control w-full rounded font-light text-gray-500"
              />
            </div>

          </div>
        
          <div className="flex justify-center mb-7">
            <div>
              <p className="font-bold text-center mb-5">Created Date Range</p>
              <DateRangePicker
                onChange={item => setState([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={1}
                ranges={state}
                direction="horizontal"

              />
            </div>
          </div>

          <div className="flex justify-end my-4">
            <div className="grid grid-cols-2 gap-4 justify-self-center">
              <div className="form-group">
                <button className="btn w-32 bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

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
        <div className={`${tableState}`}>
          <NonIndividualReportstable FilteredData={FilteredData} />
        </div>
      }
    </>
  );
};
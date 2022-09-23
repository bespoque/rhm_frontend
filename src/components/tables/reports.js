import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import Widget1 from "../dashboard/widget-1";
import dateformat from "dateformat";
import Link from 'next/link';
import CustomButton from "../CustomButton/CustomButton";
import MaterialTable, { MTableToolbar } from "material-table";
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Add from '@material-ui/icons/Add'
import Check from '@material-ui/icons/Check'
import FilterList from '@material-ui/icons/FilterList'
import Remove from '@material-ui/icons/Remove'
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Clear from "@material-ui/icons/Clear";
import { shallowEqual, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useRef, useState } from "react";
import Loader from "react-loader-spinner";
import url from '../../config/url';
import axios from "axios";
import ReactToPrint from "react-to-print";
import { CoatOfArms, KgirsLogo, KogiGov, TccbgImage } from "../Images/Images";
import QRCode from "react-qr-code";
import { addDays, subDays } from 'date-fns';
import { Calendar } from 'react-date-range';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Controller, useForm } from "react-hook-form";
import { FormatMoneyComponentBOJ, FormatMoneyComponentReport } from "../FormInput/formInputs";
import { useRouter } from "next/router";
import Reportstable from "../../pages/reports/reportstable";


export const StartReportView = () => {
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


  let startFigure = watch("amountStart", "0").replace(/,/g, '')
  let endFigure = watch("amountEnd", "0").replace(/,/g, '');


  useEffect(() => {

    setAuthToken();
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}user/items`);
        let itemsBody = res.data.body
        let revItems = itemsBody.revItem
        let office = itemsBody.taxOffice
        setStation(office)
        setRevenueItem(revItems)

      } catch (e) {
        // setIsFetching(false);
        console.log(e);
      }
    };
    fetchPost();

  }, []);


  const AdvancedSearch = (data) => {
    setIsFetching(true)
    data.trandateStart = startDate
    data.trandateEnd = endDate
    data.amountStart = startFigure
    data.amountEnd = endFigure

    axios.post(`${url.BASE_URL}collection/view-collection-report`, data)
      .then(function (response) {
        let search = response.data.body;
        console.log("search", search);
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
      <div className="">
        <form onSubmit={handleSubmit(AdvancedSearch)} className="mb-3">

          <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
            <div className="w-full lg:w-1/3 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">

              <div className="mb-2">
                <p className="font-bold text-center my-2">Search by IDs</p>
                <label className="" htmlFor="kgtin"> Taxpayer ID</label>
                <input type="text" ref={register()} name="t_payer" className="form-control w-full rounded font-light text-gray-500" />
              </div>
              <div className="mb-2">
                <label className="" htmlFor="kgtin"> Assessment ID</label>
                <input type="text" ref={register()} name="assessment_id" className="form-control w-full rounded font-light text-gray-500"
                />
              </div>
              <div className="mb-2">
                <label className="" htmlFor="kgtin"> Reference ID</label>
                <input type="text" ref={register()} name="ref" className="form-control w-full rounded font-light text-gray-500"
                />
              </div>

              <div className="">
                <hr />
              </div>

              <p className="font-bold text-center my-4">Search by others</p>
              <div className="grid grid-cols-2 gap-3">

                <div className="">
                  <select ref={register()} name="station" className="form-control w-full rounded font-light text-gray-500">
                    <option value="">Station</option>
                    {station.map((office) => <option key={office.idstation} value={office.station_code}>{office.name}</option>)}
                  </select>
                </div>
                <div className="">
                  <select ref={register()} name="rev_sub" className="form-control w-full rounded font-light text-gray-500">
                    <option value="">Revenue Item</option>
                    {revenueItem.map((item) => <option key={item.serial} value={item.rev_code}>{item.item}</option>)}
                  </select>
                </div>


              </div>
              <p className="text-center mt-3">Amount</p>
              <div className="flex gap-3">
                <div className="">
                  <FormatMoneyComponentReport
                    ref={register()}
                    name="amountStart"
                    control={control}
                    defaultValue={""}
                    onValueChange={(v) => SetFixValuesStart({ amount: v })}
                    placeholder="₦ start amount"
                  />
                </div>
                <div className="">
                  <FormatMoneyComponentReport
                    ref={register()}
                    name="amountEnd"
                    control={control}
                    defaultValue={""}
                    onValueChange={(v) => SetFixValuesEnd({ amount: v })}
                    placeholder="₦ end amount"
                  />
                </div>

              </div>

              <div className="form-group mt-2">
                <p className="text-center">Payment Channel</p>
                <select name="channel_id" id="" ref={register()} className="form-control w-full rounded font-light text-gray-500">
                  <option value="">Payment Channel</option>
                  <option value="Bank">Bank</option>
                  <option value="eTransact">eTransact</option>
                  <option value="PayDirect">PayDirect</option>
                  <option value="Paystack">Paystack</option>
                  <option value="Remita">Remita</option>
                  <option value="WebPay">WebPay</option>
                  <option value="Paytax">Paytax</option>
                  
                </select>
                {/* <input type="text" ref={register()} name="channel_id" className="form-control w-full rounded font-light text-gray-500"
                  /> */}
              </div>
            </div>


            <div className="w-full lg:w-2/3">
              <div className="overflow-x-auto max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
                <p className="font-bold text-center mb-5">Assessment Period (start - end)</p>
                <DateRangePicker
                  onChange={item => setState([item.selection])}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={1}
                  ranges={state}
                  direction="vertical"
                />
                <div className="my-4">
                  <button className="btn w-32 bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>


        </form>

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
            <Reportstable FilteredData={FilteredData} />
          </div>
        }
      </div>


    </>
  );
};
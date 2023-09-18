
import setAuthToken from "../../functions/setAuthToken";
import {useState } from "react";
import Loader from "react-loader-spinner";
import url from '../../config/url';
import axios from "axios";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useForm } from "react-hook-form";
import ReportstableManifest from "../../pages/reports-manifest/reportstablemanifest";


export const StartReportManifest = () => {
  const [FilteredData, setFilteredData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [tableState, setTableState] = useState("hidden");


  const filteredRecords = FilteredData.filter(
    (record) =>
      record.channel_id !== 'Remita'
  );


  const {
    register,
    handleSubmit,

  } = useForm()


  setAuthToken();
  const AdvancedSearch = (data) => {
    setIsFetching(true)
    axios.post(`${url.BASE_URL}collection/view-collections`, data)
      .then(function (response) {
        let search = response.data.body;
        setFilteredData(search)
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
      <div className="flex justify-center">
        <div className="overflow-x-auto mb-3 max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
          <form onSubmit={handleSubmit(AdvancedSearch)}>
            <label>Date</label> <br />
            <div className="flex gap-2">
              <input ref={register()} required type="date" name="tranDate" className="form-control rounded font-light text-gray-500" />
              <button className="btn w-32 bg-blue-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
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
          <ReportstableManifest FilteredData={filteredRecords} />
        </div>
      }
    </>
  );
};
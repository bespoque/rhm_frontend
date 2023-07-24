import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatNumber } from "../../functions/numbers";
import dateformat from "dateformat";
import Loader from "react-loader-spinner";
import { ViewApprovedTccTable } from "../tables/viewAllPayeTccTable";

const ApprovedPayeTccList = () => {
  const [tccdata, setTccData] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);

  useEffect(() => {
    setAuthToken();
    let num = 1
    const fetchPost = async () => {
      let records = [];
      let res = await axios.get(`${url.BASE_URL}paye/list-tcc?status=Approved`)
        .then(function (response) {
          let fetchedData = response.data.body;
          for (let i = 0; i < fetchedData.length; i++) {
            let rec = fetchedData[i];
            rec.serialNo = num + i
            rec.prc_fee = formatNumber(rec.prc_fee)
            rec.crt_time = dateformat(rec.crt_time, "dd mmm yyyy")
            records.push(rec);
          }
          records.map(()=>  { 
            if (records.find(v => v.status === "Approved")) {
              records.find(v => v.status === "Approved").status = "Pending E.C Signature";
              
            }
  
          })
          setIsFetching(false);
          setTccData(() => records);

        })
        .catch(function (error) {
          setIsFetching(false);
        })
    }
    fetchPost();

  }, []);


  console.log(tccdata);



  return (
    <>

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
          <p>Fetching data...</p>
        </div>
      )}
      <ViewApprovedTccTable tccdata={tccdata} />
    </>
  );
};

export default ApprovedPayeTccList;

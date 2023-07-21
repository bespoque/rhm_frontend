import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatNumber } from "../../functions/numbers";
import dateformat from "dateformat";
import Loader from "react-loader-spinner";
import { ViewVerifiedTccTable } from "../tables/viewAllPayeTccTable";
import { useRouter } from "next/router";

const VerifiedPayeTccList = () => {
  const [tccdata, setTccData] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);
  const router = useRouter()

  useEffect(() => {
    console.log("top");
    setAuthToken();
    let num = 1
    const fetchPost = async () => {
      let records = [];
      let res = await axios.get(`${url.BASE_URL}paye/list-tcc?status=Verified`)
        .then(function (response) {
          let fetchedData = response.data.body;
          for (let i = 0; i < fetchedData.length; i++) {
            let rec = fetchedData[i];
            console.log("records", rec);
            rec.serialNo = num + i
            rec.prc_fee = formatNumber(rec.prc_fee)
            rec.crt_time = dateformat(rec.crt_time, "dd mmm yyyy")
            records.push(rec);
          }
          setTccData(() => records);
          setIsFetching(false);
        })
        .catch(function (error) {
          setIsFetching(false);
        })
    }
    fetchPost();

  }, [router]);

  // console.log("tccdata", tccdata);

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
      <ViewVerifiedTccTable tccdata={tccdata} />
    </>
  );
};

export default VerifiedPayeTccList;

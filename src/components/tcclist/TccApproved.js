import SectionTitle from "../section-title";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatNumber } from "../../functions/numbers";
import dateformat from "dateformat";
import Loader from "react-loader-spinner";
import { ViewApprovedTccTable } from "../tables/viewApprovedTccTable";

const ApprovedTCCList = () => {
  const [tccdata, setTccData] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);
 
  const tccStatus = {
    ref: "",
    file_ref: "",
    tp_id: "",
    tax_office: "",
    status: "Approved",
    createdStart: "",
    createdEnd: ""
  }
  useEffect(() => {
    setAuthToken();
    let num = 1
    const fetchPost = async () => {
      try {
        let res = await axios.post(`${url.BASE_URL}forma/tcc-report`, tccStatus);
        res = res.data.body.tccReport;
        let records = [];
        for (let i = 0; i < res.length; i++) {
          let rec = res[i];
          rec.serialNo = num + i
          rec.prc_fee = formatNumber(rec.prc_fee)
          rec.crt_time = dateformat(rec.crt_time, "dd mmm yyyy")
          records.push(rec);
        }
        records.map(()=>{
          if (records.find(v => v.status === "Approved")) {
            records.find(v => v.status === "Approved").status = "Pending E.C Signature";
          }

        })
        setIsFetching(false);
        setTccData(() => records);
      } catch (e) {
        setIsFetching(false);
      }
    };
    fetchPost();
  }, []);


console.log(tccdata);
 


  return (
    <>
      <SectionTitle subtitle="Approved Tcc List " />

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

export default ApprovedTCCList;

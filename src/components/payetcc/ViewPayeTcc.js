import SectionTitle from "../section-title";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import Loader from "react-loader-spinner";
import { ViewSinglePayeTcc } from "../tables/viewAllPayeTccTable";


const SinglePayeTcc = () => {
  const [isFetching, setIsFetching] = useState(() => true);
  const [tccdata, setTccData] = useState(() => []);
  const [tccID, setTccID] = useState(() => []);
  const [statusTCC, setTccStatus] = useState("");
  const [yrOnePaySl, setYrOnePaySl] = useState(() => []);
  const [yrTwoPaySl, setYrTwoPaySl] = useState(() => []);
  const [yrThreePaySl, setYrThreePaySl] = useState(() => []);
  const [uploads, setTccUploads] = useState(() => []);
  const [slipYear1, setSlipYear1] = useState(() => []);
  const [slipYear2, setSlipYear2] = useState(() => []);
  const [slipYear3, setSlipYear3] = useState(() => []);

  const router = useRouter();
  useEffect(() => {
    if (router && router.query) {
      let tCCId = router.query.ref;
      setTccID(tCCId)
      let id = {
        id: tCCId
      }
      setAuthToken();
      const fetchPost = async () => {
        setIsFetching(true);
        axios.post(`${url.BASE_URL}paye/view-tcc`, id)
          .then(function (response) {
            setIsFetching(false);
            let TccUpload = response.data.body.tccUploads;
            setTccUploads(TccUpload)
            setTccStatus(response.data.body.tcc[0].status)
            setTccData(response.data.body.tcc[0])
            setYrOnePaySl(response.data.body.payslipY1[0])
            setYrTwoPaySl(response.data.body.payslipY2[0])
            setYrThreePaySl(response.data.body.payslipY3[0])
            let uploadYear1 = response.data.body.payslipY1Upload
            let uploadYear2 = response.data.body.payslipY2Upload
            let uploadYear3 = response.data.body.payslipY3Upload
            setSlipYear1(uploadYear1)
            setSlipYear2(uploadYear2)
            setSlipYear3(uploadYear3)
            
          })
          .catch(function (error) {
            setIsFetching(false);
            console.log(error);

          })

      };
      fetchPost();
    }
  }, [router]);


  return (
    <>
      <SectionTitle subtitle="View Tcc" />



        <>
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
              <p>Fetching data...</p>
            </div>
          ) :
            <ViewSinglePayeTcc
              tccID={tccID}
              payerDetails={tccdata}
              statusTCC={statusTCC}
              yrOnePaySl={yrOnePaySl}
              yrTwoPaySl={yrTwoPaySl}
              yrThreePaySl={yrThreePaySl}
              uploads={uploads}
              slipYear1={slipYear1}
              slipYear2={slipYear2}
              slipYear3={slipYear3}
            />
          }
        </>
  
    </>
  );
};

export default SinglePayeTcc;

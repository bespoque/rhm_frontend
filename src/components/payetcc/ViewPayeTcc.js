import SectionTitle from "../section-title";
import Widget from "../widget";
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
            let fetctTcc = response.data.body.tcc[0];
            let status = response.data.body.tcc[0].status
            let payslipY1 = response.data.body.payslipY1[0];
            let payslipY2 = response.data.body.payslipY2[0];
            let payslipY3 = response.data.body.payslipY3[0];
            let TccUpload = response.data.body.tccUploads;
            setTccUploads(TccUpload)
            setTccStatus(status)
            setTccData(fetctTcc)
            setYrOnePaySl(payslipY1)
            setYrTwoPaySl(payslipY2)
            setYrThreePaySl(payslipY3)

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

      <Widget>

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
            />
          }
        </>
      </Widget>
    </>
  );
};

export default SinglePayeTcc;

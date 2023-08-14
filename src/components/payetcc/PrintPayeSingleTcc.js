import SectionTitle from "../section-title";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import Loader from "react-loader-spinner";
import { ViewSinglePayeTccPrintTable } from "../tables/viewPayeTccTablePrint";


const PrintSingleTccPaye = () => {
  const [PayeTccData, setPayeTccData] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);
  const [yrOnePaySl, setYrOnePaySl] = useState(() => []);
  const [yrTwoPaySl, setYrTwoPaySl] = useState(() => []);
  const [yrThreePaySl, setYrThreePaySl] = useState(() => []);
  const [passport, setPassport] = useState(() => []);
  const [signature, setSignature] = useState(() => []);
  const [oldPass, setOldPass] = useState("");
  const [oldSign, setOldSig] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router && router.query) {
      let tCCId = router.query.ref;
      let id = {
        id: tCCId
      }
      setAuthToken();
      const fetchPost = () => {

        axios.post(`${url.BASE_URL}paye/view-tcc`, id)
          .then(function (response) {
            setOldPass(response.data.body.tcc[0].passport)
            setOldSig(response.data.body.tcc[0].signature)
            let payslipY2 = response.data.body?.payslipY2 ?? [];
            let payslipY3 = response.data.body?.payslipY3 ?? [];
            let uploads = response.data.body.tccUploads
            setYrOnePaySl(response.data.body.payslipY1[0])
            setYrTwoPaySl(payslipY2)
            setYrThreePaySl(payslipY3)
            setPayeTccData(response.data.body.tcc[0])
            setIsFetching(false);
            let uploadsSign = uploads.find(v => v.doc_title === "scanned signature").doc_name
            setSignature(uploadsSign)
            let uploadsPassport = uploads.find(v => v.doc_title === "passport photo").doc_name
            setPassport(uploadsPassport)

          })
          .catch(function (error) {
            console.log(error);
            setIsFetching(false);
          })

      };
      fetchPost();
    }
  }, [router]);



  return (
    <>
      <SectionTitle subtitle="Print PAYE TCC" />


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
        <ViewSinglePayeTccPrintTable
          PayeTccData={PayeTccData}
          yrOnePaySl={yrOnePaySl}
          yrTwoPaySl={yrTwoPaySl}
          yrThreePaySl={yrThreePaySl}
          passport={passport}
          signature={signature}
          oldPass={oldPass}
          oldSign={oldSign}
        />
      }
    </>
  );
};

export default PrintSingleTccPaye;

import Widget from '../widget'
import SectionTitle from '../section-title';
import { StartSingleIndividualAssessment } from '../assessment/viewAssessment';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import Loader from 'react-loader-spinner';
import { ViewSingleCompletedTable } from '../tables/viewCompletedDirect';
import setAuthToken from '../../functions/setAuthToken';
import url from '../../config/url';
import { afterComma, repVa } from '../../functions/numbers';
import { ComponentToPrint, ViewSingleApprovedTable } from '../tables/viewApprovedAss';
import ReactToPrint, { useReactToPrint } from 'react-to-print';

const ViewSingleApproved = () => {
  const router = useRouter();
  const [payerprop, setpayerprop] = useState({});
  const [isFetching, setIsFetching] = useState(() => true);
  const [globalAssId, setGlobalAssId] = useState("")
  const [makeArray, setmakeArray] = useState([])
  const [makeObj, setmakeObj] = useState({})
  const [taxcalDa, setTaxCalDa] = useState({})
  const [childObj, setchildObj] = useState({})
  const [resAddObj, setresAddObj] = useState({})
  const [spouseObj, setSpouse] = useState({})
  const [domesticStaff, setDomesticStaff] = useState({})
  const [vehicles, setVehicles] = useState({})
  const [land, setLand] = useState({})
  const [employed, setEmployed] = useState({})
  const [additionalAsse, setAdditionalAssessment] = useState([])

  const componentRef = useRef();

  useEffect(() => {
    if (router && router.query) {
      let routerData = String(router.query.ref);
      let kgtin = routerData.split(',').pop()
      let assessmentId = routerData.split(',').shift()
      let sendData = {
        KGTIN: `${kgtin}`,
        assessment_id: `${assessmentId}`
      }
      setGlobalAssId(assessmentId)
      setAuthToken()
      const fetchPost = async () => {
        try {
          let res = await axios.post(`${url.BASE_URL}forma/view-assessment`, sendData);
          let IndData = res.data.body
          let arrda = res.data.body.taxpayerAll
          let makeObjdata = IndData.assessment[0]
          let taxCalData = IndData.taxCal
          let chidDa = IndData.children
          let resAdd = IndData.residentialAddr
          let spouse = IndData.spouse
          let domestic = IndData.domestic
          let vechicles = IndData.vechicles
          let landObj = IndData.land
          let employed = IndData.employed
          let additionalAssess = IndData.addAssessment
          console.log(IndData);
          setEmployed(employed)
          setLand(landObj)
          setVehicles(vechicles)
          setDomesticStaff(domestic)
          setSpouse(spouse)
          setresAddObj(resAdd)
          setchildObj(chidDa)
          setmakeArray(arrda)
          setmakeObj(makeObjdata)
          setTaxCalDa(taxCalData)
          setpayerprop(IndData)
          setAdditionalAssessment(additionalAssess)
          setIsFetching(false);
        } catch (err) {
          console.log(err);
          setIsFetching(false);
        }
      };
      fetchPost();
    }
  }, [router]);

  console.log("makeArray", makeArray);
  

  let ChangePrint = async (e) => {
    e.preventDefault()
    // setIsFetching3(true)
    let statusObj = {
      assessment_id: globalAssId,
      status: "Printed",
    }
    try {
      let res = await axios.put(`${url.BASE_URL}forma/set-status`, statusObj);
      // setIsFetching3(false)
      console.log("successful!");
      // router.push('/view/listverifiedboj')
    } catch (error) {
      // toast.error("Failed!");
      console.log(error);
      // setIsFetching3(false)
    }
  }

  return (
    <>
      <div className="flex justify-end">
        <SectionTitle title="Print Approved Assessment" />
        <div onClick={ChangePrint}>
          <ReactToPrint
            // pageStyle='@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 40px !important; } }'
            pageStyle="@page { size: 7.5in 13in  }"
            trigger={() => <button className="btn w-32 bg-green-600 btn-default text-white
                btn-outlined bg-transparent rounded-md"
              type="submit"
            >
              Print
            </button>}
            content={() => componentRef.current}
          />
        </div>
      </div>

      <Widget>
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
        ) : <ViewSingleApprovedTable ref={componentRef} payerprop={payerprop} assId={globalAssId}
          payerAyy={makeArray} additionalAsse={additionalAsse} assobj={makeObj} taxcal={taxcalDa}
          childObj={childObj} resAddObj={resAddObj} employed={employed} spouseObj={spouseObj}
          domesticStaff={domesticStaff} vehicles={vehicles} land={land} />}

      </Widget>
    </>
  );
}
export default ViewSingleApproved 
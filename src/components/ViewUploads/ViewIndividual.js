import SectionTitle from "../section-title";
import Widget from "../widget";
import { ViewIndividualTable } from "../tables/viewIndividual"
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";


const ViewIndividual = () => {
  const [individualData, setIndividualData] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);
  useEffect(() => {
    setAuthToken();
    let num = 1
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}taxpayer/individual`);
        res = res.data.body;
        let records = [];
        console.log(res);
        for (let i = 0; i < res.length; i++) {
          let rec = res[i];
          rec.serialNo = num + i
          records.push(rec);
        }
        setIsFetching(false);
        setIndividualData(() => records);
      } catch (e) {
        setIsFetching(false);
      }
    };
    fetchPost();
  }, []);




  return (
    <>
      <SectionTitle title="View Taxpayers" subtitle="Individual Taxpayers" />

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

      <Widget>
        <>
          <ViewIndividualTable individualData={individualData} />

        </>
      </Widget>

    </>
  );
};

export default ViewIndividual;

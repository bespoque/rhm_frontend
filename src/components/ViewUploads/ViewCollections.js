import SectionTitle from "../section-title";
import Widget from "../widget";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatNumber } from "../../functions/numbers";
import Loader from "react-loader-spinner";
import { ViewCollectionsTable } from "../tables/viewCollections";

const ViewCollections = () => {
  const [datatos, setData] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);

  useEffect(() => {
    let num = 1
    setAuthToken();
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}collection/list-collections`);
        res = res.data.body;
        console.log(res);
        let records = [];
        for (let i = 0; i < res.length; i++) {
          let rec = res[i];
          rec.amount = formatNumber(rec.amount)
          rec.serialNo = num + i
          records.push(rec);
        }
        setIsFetching(false);
        setData(() => records);
      } catch (e) {
        setIsFetching(false);
      }
    };
    fetchPost();
  }, []);





  return (
    <>
      <SectionTitle title="Collections" subtitle="View Collections" />

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
        <ViewCollectionsTable remittance={datatos} />
      </Widget>
    </>
  );
};

export default ViewCollections;

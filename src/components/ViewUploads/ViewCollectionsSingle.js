import SectionTitle from "../section-title";
import Widget from "../widget";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { formatNumber } from "../../functions/numbers";
import Loader from "react-loader-spinner";
import { ViewCollectionsSingleTable } from "../tables/viewCollections";


const ViewCollectionsSingle = () => {
  const [collections, setCollections] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);
  const router = useRouter();
  useEffect(() => {
    if (router && router.query) {
      let paymentID = router.query.ref;
      let paymentPayload = {
        "idpymt": paymentID
      }
      console.log(paymentID);
      setAuthToken();
      const fetchPost = async () => {
        try {
          let res = await axios.post(`${url.BASE_URL}collection/view-collections`, paymentPayload);
          res = res.data.body;
          let records = [];
          for (let i = 0; i < res.length; i++) {
            let rec = res[i];
            rec.amount = formatNumber(rec.amount)
            records.push(rec);
          }
          setCollections(records)
          setIsFetching(false);
        } catch (e) {
          setIsFetching(false);
        }
      };
      fetchPost();
    }
  }, [router]);



  return (
    <>
      <SectionTitle subtitle="View Collection" />

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
            <ViewCollectionsSingleTable collections={collections} />
          }
        </>
      </Widget>
    </>
  );
};

export default ViewCollectionsSingle;

import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useState } from "react";
import dateformat from "dateformat";
import Loader from "react-loader-spinner";
import { ViewSubmittedObjectionTable } from "../tables/viewSubmittedObjection";
import { formatNumber } from "../../functions/numbers";




const ViewSubmittedObjection = () => {
  const [post, setPost] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);
  const newUrl = 'https://bespoque.dev/rhm-live/'
  useEffect(() => {
    let num = 1
    setAuthToken();
    const fetchPost = async () => {
      try {
        let records = [];
        const response = await fetch(`${newUrl}get-objection-batch.php?status=Submitted`, {
          method: 'GET',
        });
        const objectData = await response.json();
        let res = objectData.body;
        for (let i = 0; i < res.length; i++) {
          let rec = res[i];
          rec.serialNo = num + i
          rec.income = formatNumber(rec.income)
          rec.tp_tax = formatNumber(rec.tp_tax)
          rec.createtime = dateformat(rec.createtime, "dd mmm yyyy")
          records.push(rec);
        }

        setIsFetching(false);
        setPost(() => records);
      } catch (e) {
        setIsFetching(false);
        console.log(e.response);
      }
    };
    fetchPost();
  }, []);



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

      <ViewSubmittedObjectionTable submittedData={post} />
    </>
  );
};

export default ViewSubmittedObjection;

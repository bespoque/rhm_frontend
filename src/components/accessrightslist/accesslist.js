import SectionTitle from "../section-title";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { RightsTable } from "../tables/viewAccessRightsTable";

const AccessList = () => {
  const [rightsData, setRightsData] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);

  useEffect(() => {

    const fetchPost = async () => {

      try {
        const response = await fetch('https://bespoque.dev/rhm/get-permissions-batch.php')
        setIsFetching(false);
        const data = await response.json()
        console.log("data", data.body)
        // for (let i = 0; i < res.length; i++) {
        //   let rec = data.body[i]

        // }
        setRightsData(data.body)
      } catch (error) {
        console.log(error.message)
        setIsFetching(false);
      }
    };
    fetchPost();
  }, []);






  return (
    <>
      <SectionTitle subtitle="Permissions list" />

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
      <RightsTable rightsData={rightsData} />
    </>
  );
};

export default AccessList;

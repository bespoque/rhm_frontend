import Widget from '../widget'
import SectionTitle from '../section-title';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { ViewApprovedObjectionSingle } from '../tables/viewApprovedObjection';


const ViewSingleApprovedObjection = () => {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(() => true);
  const [globalAssId, setGlobalAssId] = useState("")


  const [apprObjData, setApprObjData] = useState({})

  const newUrl = 'https://bespoque.dev/rhm-live/'
  useEffect(() => {
    if (router && router.query) {
      let routerData = String(router.query.ref);
      let kgtin = routerData.split('_').pop()
      let assessmentId = routerData.split('_').shift()
      setGlobalAssId(assessmentId)
      let payLoad = { assessment_id: assessmentId }
      const fetchPost = async () => {
        try {
          const response = await fetch(`${newUrl}get-objection-single.php`, {
            method: 'POST',
            body: JSON.stringify(payLoad)
          });
          const objectData = await response.json();
          setApprObjData(objectData.body[0])
          setIsFetching(false);
        } catch (err) {
          setIsFetching(false);
          console.log(err);
        }
      };
      fetchPost();
    }
  }, [router]);

  return (

    <>

      <SectionTitle title="Objection notice" />

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
        ) :
          <ViewApprovedObjectionSingle
            apprObjData={apprObjData}
          />
        }
      </Widget>
    </>
  );
}
export default ViewSingleApprovedObjection 
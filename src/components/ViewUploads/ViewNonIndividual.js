import SectionTitle from "../section-title";
import Widget from "../widget";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useState } from "react";
import axios from "axios";
import dateformat from "dateformat";
import Loader from "react-loader-spinner";
import { ViewNonIndividualTable } from "../tables/viewNonIndividual";

const ViewNonIndividual = () => {
  const [post, setPost] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);
  useEffect(() => {
    setAuthToken();
    let num = 1
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}taxpayer/non-individual`);
        res = res.data.body;
        let records = [];
        for (let i = 0; i < res.length; i++) {
          let rec = res[i];
          rec.createtime = dateformat(rec.createtime, "dd mmm yyyy")
          rec.serialNo = num + i
          records.push(rec);
        }
        setIsFetching(false);
        setPost(() => records);
      } catch (e) {
        setIsFetching(false);
      }
    };
    fetchPost();
  }, []);

  console.log("post", post);

  // // Get current post
  // const indexOfLastPost = currentPage * postPerPage;
  // const indexOfFirstPost = indexOfLastPost - postPerPage;
  // const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // const next = (currentPage) => setCurrentPage(() => currentPage + 1);
  // const previous = (currentPage) => setCurrentPage(() => currentPage - 1);

  // const searchHandler = (e) => {
  //   setQuery(() => e.target.value);
  // };

  // let res = [];
  // const search = (rows) => {
  //   let data = [];
  //   data = rows.filter((rows) => rows.KGTIN.toLowerCase().indexOf(query) > -1);
  //   res.push(data);
  //   return data;
  // };

  // const searchedPost = search(post).slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <SectionTitle title="View Taxpayers" subtitle="Non-Individual Taxpayers" />

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
        {/* <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4">
          <div className="w-full lg:w-2/12">
            <NewFormInput
              label="Search by kgtin"
              required
              onChange={searchHandler}
            />
          </div>
        </div>

        <div className="mt-4">
          {query !== "" ? (
            <>
              <ViewNonIndividualTable remittance={searchedPost} />
              <CustomPagination
                paginate={paginate}
                totalPosts={res[0].length}
                postPerPage={postPerPage}
                currentPage={currentPage}
                next={next}
                previous={previous}
              />
            </>
          ) : (
            <>
              <CustomPagination
                paginate={paginate}
                totalPosts={post.length}
                postPerPage={postPerPage}
                currentPage={currentPage}
                next={next}
                previous={previous}
              />
            </>
          )}
        </div> */}
        <ViewNonIndividualTable nonIndData={post} />
      </Widget>
    </>
  );
};

export default ViewNonIndividual;

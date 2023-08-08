
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { ViewBusinessTypeTable } from "../tables/viewBusinessType";

const ListBusinessTypes = () => {
    const [post, setPost] = useState(() => []);
    const [isFetching, setIsFetching] = useState(() => true);
    useEffect(() => {
        let num = 1
        setAuthToken();
        const fetchPost = async () => {
            try {
                let res = await axios.get(`${url.BASE_URL}forma/business-type`);
                res = res.data.body;
                console.log("res", res)
                let records = [];
                for (let i = 0; i < res.length; i++) {
                    let rec = res[i];
                    rec.serialNo = num + i
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

            <ViewBusinessTypeTable BusinessTypeData={post} setPost={setPost}/>
        </>
    );
};

export default ListBusinessTypes;

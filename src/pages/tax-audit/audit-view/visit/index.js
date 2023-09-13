import axios from 'axios';
import React, { useEffect } from 'react'

function Index() {
    useEffect(() => {
        let data = {
            "job_id": "14",
            "notification_id": "38",
            "visit_id": "1"
        }
        async function fetchPost() {
            try {
                const res = await axios.post('https://test.rhm.backend.bespoque.ng/taxaudit/taxaudit-notification-visits-single.php', data)
                // const dataFetch = await res.json()
                console.log("dataFetch", res);


            } catch (error) {
                console.error('Server Error:', error)

            }
        }
        fetchPost();
    }, []);
    return (
        <div>index</div>
    )
}

export default Index
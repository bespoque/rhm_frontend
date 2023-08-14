import { formatNumber } from 'accounting';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Index() {
    const [isFetching, setIsLoading] = useState(false);
    const router = useRouter()
    const { JobID } = router?.query

    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-auditreports-single.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "TaxYear": year,
                        "KGTIN": kgtin,
                    })
                })
                const dataFetch = await res.json()
                setData(dataFetch.Data)
                setIsFetching(false)
            } catch (error) {
                console.log('Server Error:', error)
            } finally {
                setIsFetching(false)
            }
        }
        fetchPost();
    }, [kgtin, year]);

    const calculateSum = () => {
        const employed = parseFloat(taxData.AssessmentEmployed) || 0;
        const selfEmployed = parseFloat(taxData.AssessmentSelfEmployed) || 0;
        const otherIncome = parseFloat(taxData.AssessmentOtherIncome) || 0;
        return formatNumber(employed + selfEmployed + otherIncome);
    };

    return (
        <div>
            <ToastContainer />
            <div>

                <div className="container mx-auto mt-8 px-4">
                    <p className="text-2xl font-semibold mb-6">Assessment Information</p>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p><strong>Assessment Year:</strong> {taxData?.AssessmentYear}</p>
                        <p><strong>Taxpayer ID:</strong> {taxData?.TaxpayerId}</p>
                        <p><strong>Taxpayer Name:</strong> {taxData?.TaxpayerName}</p>
                        <p><strong>Assessment ID:</strong> {taxData?.AssessmentId}</p>
                        <p><strong>Address:</strong> {taxData?.Address}</p>
                        <p><strong>Tax:</strong> {formatNumber(taxData?.AssessmentAmount)}</p>
                        <p><strong>Gross Income:</strong> {calculateSum()}</p>
                    </div>
                </div>
                : <p>No Assessment data found</p>
            </div>
        </div>
    )
}

export default Index
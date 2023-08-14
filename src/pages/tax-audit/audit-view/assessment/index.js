import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ProcessorSpinner } from '../../../../components/spiner';
import { formatNumber } from 'accounting';


function AuditAssessment() {
  const router = useRouter()
  const { year, kgtin } = router?.query
  const [isFetching, setIsFetching] = useState(true);
  const [taxData, setData] = useState({});

  useEffect(() => {
    async function fetchPost() {

      try {
        const res = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-fetchTaxYear.php', {
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
    <>
      {isFetching && <ProcessorSpinner />}
      <div>
        {taxData ?
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
        }
      </div>
    </>
  )
}

export default AuditAssessment
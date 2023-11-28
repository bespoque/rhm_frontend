import { formatNumber } from 'accounting'
import React from 'react'
import Widget from '../../../../components/widget'


function Index() {

  const checkLists = [
    {
      checklist_id: '73',
      checklist_item: "payment voucher",
      expected: 3,
      available: 1,
      percentage: 33.3333
    },
    {
      checklist_id: '77',
      checklist_item: "payment voucher",
      expected: 3,
      available: 3,
      percentage: 100
    }
  ]
  return (

    <Widget>
      <p className="bg-gray-100 h-7 rounded text-center text-base mb-5">Compliance rating</p>
      <div className='flex gap-4 justify-center'>
        <button
          className="btn text-dark btn-default btn-outlined bg-transparent rounded-md"
          type="submit"
        >
          CREATE NON-COMPLIANCE
        </button>
        <button
          className="btn btn-default text-dark btn-outlined bg-transparent rounded-md"
          type="submit"
        >
          CREATE SPECIAL NON-COMPLIANCE
        </button>
        <button
          className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
          type="submit"
        >
          CREATE COMPLIANCE
        </button>
      </div>
      {checkLists.map((item) => (
        <div className='my-5 px-4'>
          <div className='grid grid-cols-3 text-base' key={item.checklist_id}>
            <p>{item.checklist_item}</p>
            <p>{`Expected Documents: ${item.available} of ${item.expected}`}</p>
            {formatNumber(item.percentage) === "100" ?
              <p> Percentage: <span className='text-green-400'>{`${formatNumber(item.percentage)}%`}</span></p>
              : <p>{`Percentage: ${formatNumber(item.percentage)}%`}</p>
            }
          </div>
          <hr />
        </div>
      ))}
    </Widget>
  )
}

export default Index
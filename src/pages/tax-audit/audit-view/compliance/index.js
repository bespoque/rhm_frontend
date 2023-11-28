import { formatNumber } from 'accounting'
import React, { useEffect, useState } from 'react'
import Widget from '../../../../components/widget'
import MaterialTable from 'material-table'
import Search from '@material-ui/icons/Search'
import * as Icons from '../../../../components/Icons/index'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Check from '@material-ui/icons/Check'
import Remove from '@material-ui/icons/Remove'
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Clear from "@material-ui/icons/Clear";
import { useRouter } from 'next/router'
import ComplianceButtons from './components/buttons'

function Index() {
  const router = useRouter()
  const { JobID } = router?.query
  const [isFetching, setIsFetching] = useState(() => true);

  const fields = [
    {
      title: "Notice date",
      field: "activity",
    },
    {
      title: "Status",
      field: "createby",
    },
    {
      title: "type",
      field: "createby",
    },
    {
      title: "Created by",
      field: "createtime",
    },
    {
      title: "Created time",
      field: "createtime",
    },

  ];

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch('https://rhmapi2.irs.kg.gov.ng/taxaudit/taxaudit-compliance-stats.php', {
          method: 'POST',
          body: JSON.stringify({
            "param1": "id",
            "param2": JobID
          })
        })

        const dataFetchJobDet = await response.json()
        console.log("dataFetchJobDet", dataFetchJobDet);

        setIsFetching(false)
      } catch (error) {
        setIsFetching(false)
        console.error('Server Error:', error)
      } finally {
        setIsFetching(false)
      }
    }
    fetchPost();
  }, [JobID]);

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
  const historyData = []
  return (
    <>
      <Widget>
        <p className="bg-gray-100 h-7 rounded text-center text-base mb-5">Compliance Rating</p>
        <div className='flex gap-4 justify-center mb-10'>
          <ComplianceButtons JobID={JobID} />
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

      <MaterialTable title="Compliance log"
        data={historyData}
        columns={fields}
        actions={
          [

          ]
        }
        options={{
          search: true,
          paging: true,
          filtering: true,
          actionsColumnIndex: -1
        }}
        icons={{
          Check: Check,
          DetailPanel: ChevronRight,
          Export: SaveAlt,
          Filter: () => <Icons.Filter />,
          FirstPage: FirstPage,
          LastPage: LastPage,
          NextPage: ChevronRight,
          PreviousPage: ChevronLeft,
          Search: Search,
          ThirdStateCheck: Remove,
          Clear: Clear,
          SortArrow: ArrowDownward
        }}

      />
    </>
  )
}

export default Index
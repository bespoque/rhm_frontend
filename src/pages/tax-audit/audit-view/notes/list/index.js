import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import Search from '@material-ui/icons/Search'
import * as Icons from '../../../../../components/Icons/index'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Check from '@material-ui/icons/Check'
import Remove from '@material-ui/icons/Remove'
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Clear from "@material-ui/icons/Clear";
import { useRouter } from 'next/router';
import { ProcessorSpinner } from '../../../../../components/spiner';
import NewNoteButton from '../components/button';
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';


export default function Notifiacklist() {
    const [isFetching, setIsFetching] = useState(() => true);
    const [notifAck, setNotifAck] = useState([]);
    const router = useRouter()
    const { JobID } = router?.query
    const [selectedRow, setSelectedRow] = useState(null);
    const fields = [
        {
            title: "Headline",
            field: "note_headline",
        },
        {
            title: "Created time",
            field: "createtime",
        },
        {
            title: "Note Details",
            field: "note_details",
            render: rowData => rowData.note_details.substring(0, 20),
        },
        {
            title: "Action Type",
            field: "actionType"
        }
    ];


    const handleRowClick = (event, rowData) => {
        setSelectedRow(rowData);
    };

    const handleClosePopup = () => {
        setSelectedRow(null);
    };

    useEffect(() => {

        async function fetchPost() {

            try {
                const res = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-notes-batch.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "job_id": JobID,
                    })
                })
                const dataFetch = await res.json()
                setNotifAck(dataFetch.body)
                setIsFetching(false)
            } catch (error) {
                console.error('Server Error:', error)
            } finally {
                setIsFetching(false)
            }
        }
        fetchPost();
    }, [JobID]);

    return (
        <>
            {isFetching && <ProcessorSpinner />}

            <div className="w-full lg:w-1/2 w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
                <div className="accordion border border-gray-300">
                    <div
                        className=' accordion-header text-center bg-gray-100 p-4 cursor-pointer bg-gray-200 '
                    >
                        <div className="flex justify-between">
                            <span>
                                Job Menu
                            </span>
                        </div>
                    </div>

                    <div className="accordion-content p-4">
                        <button className="btn block p-2 bg-gray-100 w-full m-2"
                            onClick={() => router.push(`/tax-audit/audit-view?id=${JobID}`)}
                        >Notification letter</button>
                        <button className="btn block p-2 bg-gray-100 w-full m-2"
                            onClick={() => router.push(`/tax-audit/audit-view/acknowledge/list/jobacklist?JobID=${JobID}`)}>
                            Acknowledgements
                        </button>
                        <button className="btn block p-2 bg-gray-100 w-full m-2"
                            onClick={() => router.push(`/tax-audit/audit-view/audit-report/list?JobID=${JobID}`)}
                        >
                            Audit Reoprt
                        </button>
                        <button className="btn block p-2 bg-blue-100 w-full m-2"
                            onClick={() => router.push(`/tax-audit/audit-view/notes/list?JobID=${JobID}`)}
                        >Notes</button>
                        <button className="btn block p-2 bg-gray-100 w-full m-2">Compliance</button>
                        <button className="btn block p-2 bg-gray-100 w-full m-2">Objections</button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end m-2">
                <NewNoteButton JobID={JobID} />
            </div>
            <MaterialTable title="All Notes"
                data={notifAck}
                columns={fields}
                onRowClick={handleRowClick}
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
            <Dialog open={selectedRow !== null} onClose={handleClosePopup}>
                <DialogTitle>Note</DialogTitle>
                <DialogContent>
                    <Typography>Headline: {selectedRow?.note_headline}</Typography>
                    <Typography>Details: {selectedRow?.note_details}</Typography>
                </DialogContent>
            </Dialog>

        </>
    )
}

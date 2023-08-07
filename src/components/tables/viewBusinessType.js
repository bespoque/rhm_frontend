import * as Icons from '../Icons/index';
import React from "react";
import Search from '@material-ui/icons/Search'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Check from '@material-ui/icons/Check'
import Remove from '@material-ui/icons/Remove'
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Clear from "@material-ui/icons/Clear";
import MaterialTable from "material-table";
import { Delete } from "@material-ui/icons";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fields = [
    {
        title: "SN",
        field: "serialNo",
        filtering: false,
        width: "10%",
        editable: 'never'
    },
    {
        title: "Business Type",
        field: "business_type",
        editable: 'onUpdate'
    },

];

export const ViewBusinessTypeTable = ({ BusinessTypeData }) => {
    let items = BusinessTypeData;
 
    return (
        <>
            <ToastContainer />

            <MaterialTable title="View Business Types"
                data={items}
                columns={fields}

                options={{
                    search: true,
                    paging: true,
                    filtering: true,
                    rowStyle: (rowData) => {
                        if (rowData.printstatus === "Yes") {
                            return {
                                color: "#5f9f45"
                            }
                        } else {
                            return {};
                        }
                    },
                    exportButton: {
                        csv: true,
                        pdf: false
                    },
                    exportAllData: true,

                }}
                icons={{
                    Check: Check,
                    DetailPanel: ChevronRight,
                    Export: SaveAlt,
                    Filter: () => <Icons.Filter />,
                    Delete: () => Delete,
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
    );
};


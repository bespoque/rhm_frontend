import React, { useEffect, useState } from 'react'
import url from "../../../config/url";
import setAuthToken from '../../../functions/setAuthToken';
import * as Icons from '../../../components/Icons/index';
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
import Loader from "react-loader-spinner";
import axios from "axios";
import { formatNumber } from 'accounting';
import dateformat from "dateformat";
import { useRouter } from 'next/router';
import MaterialTable from 'material-table';

export default function ViewAgent() {
    const [agentDetails, setDetailsAgent] = useState(() => []);
    const [agentTransactions, setAgentTransactions] = useState([]);
    const [markets, setmarkets] = useState([]);
    const [isFetching, setIsFetching] = useState(() => true);
    const router = useRouter();

    const transactionsCol = [
        {
            title: "Transaction ID",
            field: "transactionId",
        },
        {
            title: "Type",
            field: "type",
        },
        {
            title: "Amount",
            field: "amount",
            type: "numeric",
            render: (expense) => formatNumber(expense.amount)
        },
        {
            title: "Transaction Date",
            field: "createdAt",
            type: "date"
        },
    ];
    const marketsCol = [
        {
            title: "Tax office",
            field: "taxOffice",
        },
        {
            title: "Market",
            field: "market",
        },
        {
            title: "LGA",
            field: "lga",
        },
    ];

    setAuthToken();
    useEffect(() => {
        setIsFetching(true);
        if (router && router.query) {
            const agentEmail = router.query.ref;
            const fetchPost = () => {
                axios.get(`${url.BASE_URL}market/admin/agent/profile?id=${agentEmail}`)
                    .then(function (response) {
                        setIsFetching(false);
                        const responseAll = response.data.body
                        const transactions = responseAll.transactions
                        const useDet = responseAll.userDetails
                        const agentMarket = responseAll.marketGroup
                        setmarkets(agentMarket)
                        setAgentTransactions(transactions)
                        setDetailsAgent(useDet)
                    })
                    .catch(function (error) {
                        setIsFetching(false);
                    })
            };
            fetchPost();
        }
    }, [router]);

   
    return (
        <div>
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
            <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
                <div className="lg:w-1/3 max-w-md  bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
                    <div>
                        <div className="flex justify-center">
                            <img src="/images/avater.png" alt="" sizes="" className="rounded-full w-20 h-20 ring-2 ring-gray-300 dark:ring-gray-500" />
                        </div>
                        <div>
                            {agentDetails === null || agentDetails === undefined ? "" :
                                <div className="mt-4">
                                    <div className="text-center">
                                        <p className="text-lg text-blue-400">{formatNumber(agentDetails.balance)}</p>
                                    </div>
                                    <div className="">
                                        <p>Name</p>
                                        <p className="font-bold  my-2">{agentDetails.name} </p>
                                    </div>
                                    <div>
                                        <p>email</p>
                                        <p className="font-bold  my-2">{agentDetails.user} </p>
                                    </div>
                                    <div>
                                        <p>Phone</p>
                                        <p className="font-bold  my-2">{agentDetails.phone} </p>
                                    </div>
                                    <div>
                                        <p>Active</p>
                                        <p className="font-bold my-2">{agentDetails.active} </p>
                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                </div>

                <div className="lg:w-2/3">
                    <div>
                        <MaterialTable title="Transactions"
                            data={agentTransactions}
                            columns={transactionsCol}
                            renderSummaryRow={({ column, data }) =>
                            column.field === "amount"
                              ? {
                                  value: data.reduce((agg, row) => agg + row.age, 0),
                                  style: { background: "red" },
                                }
                              : undefined
                          }
                            options={{
                                search: true,
                                filtering: true,
                                paging: true,
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
                    </div>
                    <div className="mt-3">
                        <MaterialTable title="Market Group"
                            data={markets}
                            columns={marketsCol}
                            options={{
                                search: false,
                                filtering: false,
                                paging: false,
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
                    </div>
                </div>
            </div>
        </div>
    )
}

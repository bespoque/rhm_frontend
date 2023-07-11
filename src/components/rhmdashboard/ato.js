import React, { useEffect, useState } from "react";
import Section from "../../components/dashboard/section";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { formatNumber } from "accounting";
import Widget1 from "../../components/dashboard/widget-1";
import { PendingRemittance, RevenueItems, TaxReceipt, TotalRemittance, Unassessed } from "../../components/Icons";
import setAuthToken from "../../functions/setAuthToken";
import axios from "axios";
import url from "../../config/url";
import dateformat from "dateformat";
import Loader from "react-loader-spinner";
import { shallowEqual, useSelector } from "react-redux";
import jwt from "jsonwebtoken";

let atoApprCount
let atoSubCount


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;




export const AmountAssessed = ({ atoAssessedAmt }) => {

  let amountAssessed
  let amountCollected
  let unassessedCollection
  let outstandingAmount


  atoAssessedAmt.forEach((ind, i) => {
    amountAssessed = Number(ind.assessedAmount)
  })

  atoAssessedAmt.forEach((ind, i) => {
    amountCollected = Number(ind.amountCollected)
  })


  atoAssessedAmt.forEach((ind, i) => {
    unassessedCollection = Number(ind.unassessedAmountCollected)
  })




  outstandingAmount = (Number(amountAssessed) - Number(amountCollected))


  const dataAssesedAmount = [
    { name: "Amount Assessed ", value: amountAssessed },
    { name: "Amount Collected ", value: amountCollected },
    { name: "Unassessed Collection", value: unassessedCollection },
    { name: "Outstanding Amount", value: outstandingAmount },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index

  }) => {

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="blue"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
      </text>
    );
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart width={500} height={300}>
          <Legend verticalAlign="top" align="center" />
          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
          <Pie
            data={dataAssesedAmount}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {dataAssesedAmount.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export const AtoCount = ({ atoAssCount }) => {


  const atoApproved = atoAssCount.filter(data => data.status === "Approved");
  const atoSubmitted = atoAssCount.filter(data => data.status === "Submitted");


  atoApproved.forEach((ind, i) => {
    atoApprCount = Number(ind.count)
  })

  atoSubmitted.forEach((ind, i) => {
    atoSubCount = Number(ind.count)
  })



  const dataATOCount = [
    { name: "Pending assessment", value: atoSubCount },
    { name: "Approved assessment", value: atoApprCount },
  ];

  const renderCustomizedLabel2 = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index

  }) => {

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="blue"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
      </text>
    );
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart width={500} height={300}>
          <Legend verticalAlign="top" align="center" />
          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
          <Pie
            data={dataATOCount}
            label={renderCustomizedLabel2}
            outerRadius={80}
            fill="#8884d8"
            labelLine={false}
            dataKey="value"
          >
            {dataATOCount.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export const Lines = ({ atoTrend }) => {

  let janApprAss
  let janAmtPaid
  let janUnassessedPay

  let febApprAss
  let febAmtPaid
  let febUnassessedPay

  let marchApprAss
  let marchAmtPaid
  let marchUnassessedPay

  let aprilApprAss
  let aprilAmtPaid
  let aprilUnassessedPay

  let mayApprAss
  let mayAmtPaid
  let mayUnassessedPay

  let juneApprAss
  let juneAmtPaid
  let juneUnassessedPay

  let julyApprAss
  let julyAmtPaid
  let julyUnassessedPay

  let augApprAss
  let augAmtPaid
  let augUnassessedPay

  let septApprAss
  let septAmtPaid
  let septUnassessedPay

  let octApprAss
  let octAmtPaid
  let octUnassessedPay

  let novApprAss
  let novAmtPaid
  let novUnassessedPay

  let decApprAss
  let decAmtPaid
  let decUnassessedPay

  const janPerfTrend = atoTrend.filter(data => data.month === "January");
  const febPerfTrend = atoTrend.filter(data => data.month === "February");
  const marchPerfTrend = atoTrend.filter(data => data.month === "March");
  const aprilPerfTrend = atoTrend.filter(data => data.month === "April");
  const mayPerfTrend = atoTrend.filter(data => data.month === "May");
  const junePerfTrend = atoTrend.filter(data => data.month === "June");
  const julyPerfTrend = atoTrend.filter(data => data.month === "July");
  const augPerfTrend = atoTrend.filter(data => data.month === "August");
  const septPerfTrend = atoTrend.filter(data => data.month === "September");
  const octPerfTrend = atoTrend.filter(data => data.month === "October");
  const novPerfTrend = atoTrend.filter(data => data.month === "November");
  const decPerfTrend = atoTrend.filter(data => data.month === "DeDecember");

  janPerfTrend.forEach((ind, i) => {
    janApprAss = Number(ind.assessedAmount)
    janAmtPaid = Number(ind.amountCollected)
    janUnassessedPay = Number(ind.unassessedAmountCollected)
  })

  febPerfTrend.forEach((ind, i) => {
    febApprAss = Number(ind.assessedAmount)
    febAmtPaid = Number(ind.amountCollected)
    febUnassessedPay = Number(ind.unassessedAmountCollected)
  })

  marchPerfTrend.forEach((ind, i) => {
    marchApprAss = Number(ind.assessedAmount)
    marchAmtPaid = Number(ind.amountCollected)
    marchUnassessedPay = Number(ind.unassessedAmountCollected)
  })

  aprilPerfTrend.forEach((ind, i) => {
    aprilApprAss = Number(ind.assessedAmount)
    aprilAmtPaid = Number(ind.amountCollected)
    aprilUnassessedPay = Number(ind.unassessedAmountCollected)
  })

  mayPerfTrend.forEach((ind, i) => {
    mayApprAss = Number(ind.assessedAmount)
    mayAmtPaid = Number(ind.amountCollected)
    mayUnassessedPay = Number(ind.unassessedAmountCollected)
  })

  junePerfTrend.forEach((ind, i) => {
    juneApprAss = Number(ind.assessedAmount)
    juneAmtPaid = Number(ind.amountCollected)
    juneUnassessedPay = Number(ind.unassessedAmountCollected)
  })

  julyPerfTrend.forEach((ind, i) => {
    julyApprAss = Number(ind.assessedAmount)
    julyAmtPaid = Number(ind.amountCollected)
    julyUnassessedPay = Number(ind.unassessedAmountCollected)
  })
  augPerfTrend.forEach((ind, i) => {
    augApprAss = Number(ind.assessedAmount)
    augAmtPaid = Number(ind.amountCollected)
    augUnassessedPay = Number(ind.unassessedAmountCollected)
  })
  septPerfTrend.forEach((ind, i) => {
    septApprAss = Number(ind.assessedAmount)
    septAmtPaid = Number(ind.amountCollected)
    septUnassessedPay = Number(ind.unassessedAmountCollected)
  })
  octPerfTrend.forEach((ind, i) => {
    octApprAss = Number(ind.assessedAmount)
    octAmtPaid = Number(ind.amountCollected)
    octUnassessedPay = Number(ind.unassessedAmountCollected)
  })
  novPerfTrend.forEach((ind, i) => {
    novApprAss = Number(ind.assessedAmount)
    novAmtPaid = Number(ind.amountCollected)
    novUnassessedPay = Number(ind.unassessedAmountCollected)
  })
  decPerfTrend.forEach((ind, i) => {
    decApprAss = Number(ind.assessedAmount)
    decAmtPaid = Number(ind.amountCollected)
    decUnassessedPay = Number(ind.unassessedAmountCollected)
  })



  const Trend = [
    {
      name: "Jan",
      approvedassessment: janApprAss,
      amountpaid: janAmtPaid,
      unassessedpayment: janUnassessedPay,
    },
    {
      name: "Feb",
      approvedassessment: febApprAss,
      amountpaid: febAmtPaid,
      unassessedpayment: febUnassessedPay,
    },
    {
      name: "March",
      approvedassessment: marchApprAss,
      amountpaid: marchAmtPaid,
      unassessedpayment: marchUnassessedPay,
    },
    {
      name: "April",
      approvedassessment: aprilApprAss,
      amountpaid: aprilAmtPaid,
      unassessedpayment: aprilUnassessedPay,
    },
    {
      name: "May",
      approvedassessment: mayApprAss,
      amountpaid: mayAmtPaid,
      unassessedpayment: mayUnassessedPay,
    },
    {
      name: "June",
      approvedassessment: juneApprAss,
      amountpaid: juneAmtPaid,
      unassessedpayment: juneUnassessedPay,
    },
    {
      name: "July",
      approvedassessment: julyApprAss,
      amountpaid: julyAmtPaid,
      unassessedpayment: julyUnassessedPay,
    },
    {
      name: "August",
      approvedassessment: augApprAss,
      amountpaid: augAmtPaid,
      unassessedpayment: augUnassessedPay,
    },
    {
      name: "Sep",
      approvedassessment: septApprAss,
      amountpaid: septAmtPaid,
      unassessedpayment: septUnassessedPay,
    },
    {
      name: "Oct",
      approvedassessment: octApprAss,
      amountpaid: octAmtPaid,
      unassessedpayment: octUnassessedPay,
    },
    {
      name: "Nov",
      approvedassessment: novApprAss,
      amountpaid: novAmtPaid,
      unassessedpayment: novUnassessedPay,
    },
    {
      name: "Dec",
      approvedassessment: decApprAss,
      amountpaid: decAmtPaid,
      unassessedpayment: decUnassessedPay,
    }
  ];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={Trend}
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
          <Legend />
          <Line type="monotone" name="Approved Assessment" dataKey="approvedassessment" stroke="#82ca9d" />
          <Line type="monotone" name="Amount Paid" dataKey="amountpaid" stroke="#fcc287" />
          <Line type="monotone" name="Unassessed Payment" dataKey="unassessedpayment" stroke="#fe0037" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export const ATOPie = ({ atoAssessedAmt, atoAssCount, atoTrend, atoOverview, recentAssess, topAssess }) => {
  const [items, setPost] = useState(() => []);
  const [topAss, setTopAss] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => false);
  const [recentTotal, setRecentTotal] = useState(() => []);
  const [topTotal, setTopTotal] = useState(() => []);

  const { config, palettes, auth } = useSelector(
    (state) => ({
      config: state.config,
      palettes: state.palettes,
      auth: state.authentication.auth,
    }),
    shallowEqual
  );

  let OutstandingPaymt

  atoOverview.forEach((data, i) => {
    OutstandingPaymt = Number(data.amountAssessed) - Number(data.amountCollected)
    return OutstandingPaymt
  })



  const decoded = jwt.decode(auth);
  const taxOff = decoded.station

  const fields = [
    {
      name: "SN",
      key: "serialNo",
    },
    {
      name: "KGTIN",
      key: "kgtin",
    },
    {
      name: "Assessment ID",
      key: "assessment_id",
    },
    {
      name: "Taxpayer Name",
      key: "tp_name",
    },
    {
      name: "Assessed Amount",
      key: "taxFormated",
    },
    {
      name: "Paid Amount",
      key: "taxPaidFormated",
    },
    {
      name: "Balance",
      key: "balance",
    },
    {
      name: "Created Time",
      key: "createtime",
    },
  ];

  useEffect(() => {
    let num = 1


    if (recentAssess || topAssess) {

      let records = [];
      let recordsTop = [];

      let topAssSum = {};
      let sum = {};


      let topassessedAmountSum = [];
      let toppaidAmountSum = []
      let topbalanceSum = [];

      let assessedAmountSum = [];
      let paidAmountSum = []
      let balanceSum = [];


      for (let i = 0; i < recentAssess.length; i++) {
        let rec = recentAssess[i];
        rec.serialNo = num + i

        rec.tax = Number(rec.tax)
        rec.taxPaid = Number(rec.taxPaid)
        rec.balance = (Number(rec.tax) - Number(rec.taxPaid))


        assessedAmountSum.push(rec.tax)
        paidAmountSum.push(rec.taxPaid)
        balanceSum.push(rec.balance)


        rec.balance = formatNumber(Number(rec.tax) - Number(rec.taxPaid))
        rec.taxFormated = formatNumber(rec.tax);
        rec.taxPaidFormated = formatNumber(rec.taxPaid);
        rec.createtime = dateformat(rec.createtime, "dd mmm yyyy")
        records.push(rec);
      }
      setPost(() => records);
      setRecentTotal(() => sum);

      const recentAssAmountSum = assessedAmountSum.reduce(
        (preVal, curVal) => preVal + curVal,
        0
      );
      const recentpaidAmountSum = paidAmountSum.reduce(
        (preVal, curVal) => preVal + curVal,
        0
      );
      const recentbalanceSum = balanceSum.reduce(
        (preVal, curVal) => preVal + curVal,
        0
      );

      sum.recentAssAmountSum = recentAssAmountSum;
      sum.recentpaidAmountSum = recentpaidAmountSum;
      sum.recentbalanceSum = recentbalanceSum;


      for (let i = 0; i < topAssess.length; i++) {
        let rec = topAssess[i];
        rec.serialNo = num + i

        rec.tax = Number(rec.tax)
        rec.taxPaid = Number(rec.taxPaid)
        rec.balance = (Number(rec.tax) - Number(rec.taxPaid))


        topassessedAmountSum.push(rec.tax)
        toppaidAmountSum.push(rec.taxPaid)
        topbalanceSum.push(rec.balance)


        rec.balance = formatNumber(Number(rec.tax) - Number(rec.taxPaid))
        rec.taxFormated = formatNumber(rec.tax);
        rec.taxPaidFormated = formatNumber(rec.taxPaid);
        rec.createtime = dateformat(rec.createtime, "dd mmm yyyy")
        recordsTop.push(rec);
      }
      setTopAss(() => recordsTop);

      const totaltopAssAmountSum = topassessedAmountSum.reduce(
        (preVal, curVal) => preVal + curVal,
        0
      );
      const totaltoppaidAmountSum = toppaidAmountSum.reduce(
        (preVal, curVal) => preVal + curVal,
        0
      );
      const totaltopbalanceSum = topbalanceSum.reduce(
        (preVal, curVal) => preVal + curVal,
        0
      );
      topAssSum.totaltopAssAmountSum = totaltopAssAmountSum;
      topAssSum.totaltoppaidAmountSum = totaltoppaidAmountSum;
      topAssSum.totaltopbalanceSum = totaltopbalanceSum;
      setTopTotal(() => topAssSum);

    }

  }, []);


  return (
    <>
      <div>

        <div>
          {taxOff === "Okehi/Adavi" ?
            <p className="font-bold flex justify-center uppercase text-lg">Adavi/Okehi</p> :
            <p className="font-bold flex justify-center uppercase text-lg">{taxOff}</p>
          }
        </div>
        {atoOverview.map((ind, i) => (
          <div className="flex my-10 flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
            <div className="w-full lg:w-1/5">
              <Widget1
                color="blue"
                title="No. Approved Assessments"
                description={formatNumber(ind.approvedCount)}
                right={<TotalRemittance />}
              />
            </div>


            <div className="w-full lg:w-1/5">
              <Widget1
                color="purple"
                title="Total Approved Amount"
                description={formatNumber(ind.amountAssessed)}
                right={<PendingRemittance />}
              />
            </div>

            <div className="w-full lg:w-1/5">
              {taxOff === "Anyigba" ?
                <Widget1
                  color="green"
                  title="Assessed Amount Collected"
                  description={formatNumber("93500")}
                  right={<RevenueItems />}
                />
                :
                <Widget1
                  color="green"
                  title="Assessed Amount Collected"
                  description={formatNumber(ind.amountCollected)}
                  right={<RevenueItems />}
                />
              }
            </div>

            <div className="w-full lg:w-1/5">
              {
                taxOff === "Anyigba" ?
                  <Widget1
                    color="red"
                    title="Outstanding Assessed Amount"
                    description={formatNumber(Number(ind.amountAssessed) - Number("93500"))}
                    right={<TaxReceipt />}
                  />
                  :
                  <Widget1
                    color="red"
                    title="Outstanding Assessed Amount"
                    description={formatNumber(OutstandingPaymt)}
                    right={<TaxReceipt />}
                  />
              }
            </div>

            <div className="w-full lg:w-1/5">
              {
                taxOff === "Anyigba" ?
                  <Widget1
                    color="red"
                    title="Unassessed Amount Collected"
                    description={formatNumber("78500")}
                    right={<Unassessed />}
                  />
                  :
                  <Widget1
                    color="red"
                    title="Unassessed Amount Collected"
                    description={formatNumber(ind.unassessedAmountCollected)}
                    right={<Unassessed />}
                  />
              }
            </div>



          </div>

        ))}

      </div>

      <div className="flex mt-10 flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-1/2">

          <Section
            description={<span>ASSESSMENT COUNT</span>}
          >
            <div className="flex flex-row w-full">
              <AtoCount atoAssCount={atoAssCount} />

            </div>
          </Section>
        </div>
        <div className="w-full lg:w-1/2">
          <Section
            description={<span>ASSESSED AMOUNT</span>}
          >
            <div className="flex flex-row w-full">
              <AmountAssessed atoAssessedAmt={atoAssessedAmt} />
            </div>
          </Section>
        </div>
      </div>

      <div className="flex mt-10 flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-2/2">
          <Section
            description={<span>PERFORMANCE TREND</span>}
          >
            <div className="flex flex-row w-full">
              <Lines atoTrend={atoTrend} />
            </div>
          </Section>
        </div>

      </div>

      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-2/2">
          <Section >
            <p className="text-sm my-3 font-bold text-center">RECENT ASSESSMENTS</p>
            <div className="flex justify-center">
              <div className="overflow-x-auto">
                <table className="table table-auto divide-y striped">
                  <thead>
                    <tr className="">
                      {fields.map((field, i) => (
                        <th key={i} className="">
                          {field.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {items.map((ind, i) => (
                      <tr key={i} className="">
                        {fields.map((field, j) => (
                          <td key={j} className="">
                            {ind[field.key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {items.length > 0 && (
                      <tr className="font-semibold">
                        <td>Total</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{formatNumber(recentTotal.recentAssAmountSum)}</td>
                        <td>{formatNumber(recentTotal.recentpaidAmountSum)}</td>
                        <td>{formatNumber(recentTotal.recentbalanceSum)}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Section>
        </div>

      </div>

      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-2/2">
          <Section >
            <p className="text-sm my-3 font-bold text-center">TOP ASSESSMENTS</p>
            <div className="flex justify-center">
              <div className="overflow-x-auto">
                <table className="table table-auto divide-y striped">
                  <thead>
                    <tr className="">
                      {fields.map((field, i) => (
                        <th key={i} className="">
                          {field.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {topAss.map((ind, i) => (
                      <tr key={i} className="">
                        {fields.map((field, j) => (
                          <td key={j} className="">
                            {ind[field.key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {topAss.length > 0 && (
                      <tr className="font-semibold">
                        <td>Total</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{formatNumber(topTotal.totaltopAssAmountSum)}</td>
                        <td>{formatNumber(topTotal.totaltoppaidAmountSum)}</td>
                        <td>{formatNumber(topTotal.totaltopbalanceSum)}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Section>
        </div>
      </div>

    </>
  );
}

import SectionTitle from '../../components/dashboard/section-title';
import Widget from '../../components/widget';
import { IconTabs } from "../../components/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";
import { AssesmentCount } from '../../components/rhmdashboard/headoffice';
import { ATOPie } from '../../components/rhmdashboard/ato';
import { memo, useEffect, useState } from 'react';
import UseFetcher from '../../components/fetcher/useFetcher';
import url from "../../config/url";



const Index = () => {

  const [assessData, setAssessData] = useState([])
  const [cummulativeAssess, setCummAssess] = useState([])
  const [assessOverviewVariable, setAssessOverView] = useState([])
  const [cumPerformanceVariable, setCumPerformance] = useState([])
  const [perfTrend, setPerfTrend] = useState([])
  const [colPerformance, setColPerformance] = useState([])
  const [summaryItems, setSummaryItems] = useState([])
  const [atoAssessedAmt, setatoAssessAmount] = useState([])
  const [atoAssCount, setAtoAssCunt] = useState([])
  const [atoTrend, setAtoTrend] = useState([])
  const [atoOverview, setAtoOverview] = useState([])
  const [recentAssess, setRecentAssess] = useState([])
  const [topAssess, setTopAssess] = useState([])

  const { data, isLoading, isError } = UseFetcher(
    `${url.BASE_URL}forma/dashboard`
  );
  console.log("data", data);

  useEffect(() => {
    if (data) {
      const assessmentCount = data.assessmentCount
      const assessmentOverview = data.assessmentOverview
      const assessmentCumm = data.cummulativeAssessment
      const cummPerf = data.cummulativePerfomance
      const perfTrendData = data.perfomanceTrend
      const collectPerf = data.collectionPerfomance
      const summaryData = data.summary
      const atoAssdAmount = data.atoCollectionPerfomance
      const atoCount = data.atoAssessmentCount
      const atoPerfTrend = data.atoPerfomanceTrend
      const atoView = data.atoAssessmentOverview
      const atoRecent = data.atoRecentAssessment
      const atoTopAssessment = data.atoTopAssessment
      setAssessData(assessmentCount)
      setAssessOverView(assessmentOverview)
      setCummAssess(assessmentCumm)
      setCumPerformance(cummPerf)
      setPerfTrend(perfTrendData)
      setColPerformance(collectPerf)
      setSummaryItems(summaryData)
      setatoAssessAmount(atoAssdAmount)
      setAtoAssCunt(atoCount)
      setAtoTrend(atoPerfTrend)
      setAtoOverview(atoView)
      setRecentAssess(atoRecent)
      setTopAssess(atoTopAssessment)

    }
  }, [data]);

  console.log("atoAssessedAmt", atoAssessedAmt);

  const tabsWithIcons = [
    {
      index: 0,
      title: (
        <>
          <p>All Tax Offices </p>
        </>
      ),
      content: (
        <>
          <div>
            <AssesmentCount assessCountData={assessData}
              assessOverviewData={assessOverviewVariable}
              cummulativeAssess={cummulativeAssess}
              cumPerformance={cumPerformanceVariable}
              perfTrend={perfTrend}
              colPerformance={colPerformance}
              summaryItems={summaryItems}
              isLoading={isLoading}
            />
          </div>
        </>
      ),
    },
    {
      index: 1,
      title: (
        <>
          <p>My Tax Office</p>
        </>
      ),
      content: (
        <>
          <ATOPie
            atoAssessedAmt={atoAssessedAmt}
            atoAssCount={atoAssCount}
            atoTrend={atoTrend}
            atoOverview={atoOverview}
            recentAssess={recentAssess}
            topAssess={topAssess}
          />
        </>
      ),
    },
  ];


  return (
    <>
      <SectionTitle subtitle="Dashboard" />
      <Widget>
        <div className="flex justify-center">
          <div className="w-full">
            <IconTabs tabs={tabsWithIcons} />
          </div>
        </div>
      </Widget>
    </>
  );
};
export default Index;

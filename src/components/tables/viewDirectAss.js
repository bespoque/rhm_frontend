import * as Icons from '../Icons/index';
import Link from 'next/link';
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import setAuthToken from "../../functions/setAuthToken";
import url from '../../config/url';
import axios from "axios";
import { useForm } from 'react-hook-form';
import { FiTriangle } from "react-icons/fi";
import { useRouter } from "next/router";
import MaterialTable from "material-table";
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
import { shallowEqual, useSelector } from "react-redux";
import jwt from "jsonwebtoken";

const columns = [
  {
    title: "SN",
    field: "serialNo",
    filtering: false,
    width: "10%"
  },
  {
    title: "KGTIN",
    field: "kgtin",
  },
  {
    title: "Assesment Id",
    field: "assessment_id",
  },
  {
    title: "Taxpayer Name",
    field: "tp_name",
  },
  {
    title: "Year",
    field: "year",
  },
  {
    title: "Tax Office",
    field: "tax_office",
  },
  {
    title: "Status",
    field: "status",
  },
  {
    title: "Type",
    field: "assessment_type",
  },
  // {
  //   title: "Comment",
  //   filed: "comment",
  // },
  {
    title: "Created Time",
    field: "createtime",
  },

];

export const ViewPendingTable = ({ draftData }) => {
  let data = draftData;

  const { config, palettes, auth } = useSelector(
    (state) => ({
      config: state.config,
      palettes: state.palettes,
      auth: state.authentication.auth,
    }),
    shallowEqual
  );

  const reportRange = [39, 9, 20]
  const decoded = jwt.decode(auth);
  const userGroup = decoded.groups

  return (
    <>
      <MaterialTable title="Draft Assessment List"
        columns={columns}
        data={data}

        options={{
          search: true,
          paging: true,
          filtering: true,
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
          FirstPage: FirstPage,
          LastPage: LastPage,
          NextPage: ChevronRight,
          PreviousPage: ChevronLeft,
          Search: Search,
          ThirdStateCheck: Remove,
          Clear: Clear,
          SortArrow: ArrowDownward
        }}

        // onRowClick={(event, rowData) => {

        //   if (userGroup.some(r => reportRange.includes(r))) {
        //    ''
            
        //   }

        //   else{
        //     rowData.assessment_type === "BOJ" ?

        //       window.open(`/view/boj/${rowData.assessment_id}_${rowData.year}_${rowData.kgtin}`, "_self")
        //       :

        //       window.open(`/view/pendingdirect/${rowData.assessment_id}_${rowData.year}_${rowData.kgtin}`, "_self")

        //   }

        //   event.stopPropagation();
        // }}
      />
    </>
  );
};

export const ViewSinglePendingTable = ({ indvData, pensDeduct,
  routerAssId, changed, changedPensDed, changedEmploy, employment,
  changedSelfEmployed, selfEmployment, changedExpenses, expenses, lifeass, changedLap, nhis, changedNhis,
  partner, changedPartner, rentIncome, changedRentIncome, bankInterest, changedBankInterest, dividends,
  changedBankDividends, changedPension, pension, residentialAddr, asset, changedAsset, outsideSource,
  changedOutsideSource, changedVehicles, vehicles, changedLand, land, farm, changedFarm, changedSpouse, spouse,
  changedChildren, children, domestic, changedDomestic, assessment, kgtinVal, assmentYear

}) => {
  const [toggleel, setToggle] = useState('hidden')
  const [togglee2, setToggle2] = useState('hidden')
  const [togglee3, setToggle3] = useState('hidden')
  const [togglee4, setToggle4] = useState('hidden')
  const [togglee5, setToggle5] = useState('hidden')
  const [togglee6, setToggle6] = useState('hidden')
  const [togglee7, setToggle7] = useState('hidden')
  const [togglee8, setToggle8] = useState('hidden')
  const [togglee9, setToggle9] = useState('hidden')
  const [togglee10, setToggle10] = useState('hidden')
  const [togglee11, setToggle11] = useState('hidden')
  const [togglee12, setToggle12] = useState('hidden')
  const [togglee13, setToggle13] = useState('hidden')
  const [togglee14, setToggle14] = useState('hidden')
  const [togglee15, setToggle15] = useState('hidden')
  const [resiToggle, setresToggle] = useState('hidden')
  const [marriedToggle, setmarriedToggle] = useState('hidden')
  const [childrenToggle, setchildrenToggle] = useState('hidden')
  const [servantsToggle, setservantsToggle] = useState('hidden')
  const [isFetching, setIsFetching] = useState(() => false);
  const router = useRouter();
  let assessment_id = routerAssId

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }, } = useForm()


  const [residentialAddress, setResidentialAddress] = useState(
    {
      assessment_id: "", house_no: "", street: "", town: "", lga: "", residence_type: "",
      residence_owner: "", annual_rent: "", owner_name: "", owner_phone: ""
    }
  )

  // let res_no = indvData.map(function (x) {
  //   let houseNumb = x.house_no
  //   return houseNumb
  // })

  // residentialAddress.house_no = String(res_no)

  // let streetVal = indvData.map(function (x) {
  //   let street = x.street
  //   return street
  // })

  // residentialAddress.street = String(streetVal)


  // let lgaVal = indvData.map(function (x) {
  //   let lga = x.lga
  //   return lga
  // })

  // residentialAddress.lga = String(lgaVal)


  function handleResidentialChange(evt) {
    const value = evt.target.value;
    setResidentialAddress({
      ...residentialAddress,
      [evt.target.name]: value
    });
    console.log(residentialAddress);
  }



  setAuthToken();
  let submitDataResAddr = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let resAddObj = {
      assessment_id: `${assessment_id}`,
      house_no: `${residentialAddress.house_no}`,
      street: `${residentialAddress.street}`,
      town: `${residentialAddress.town}`,
      lga: `${residentialAddress.lga}`,
      residence_type: `${residentialAddress.residence_type}`,
      residence_owner: `${residentialAddress.residence_owner}`,
      annual_rent: `${residentialAddress.annual_rent}`,
      owner_name: `${residentialAddress.owner_name}`,
      owner_phone: `${residentialAddress.owner_phone}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/residence-addr`, resAddObj);
      setIsFetching(false)
      toast.success("Saved Successfully!");
    } catch (error) {
      toast.error("error, Please try again!");
      setIsFetching(false)
    }

  }



  const [spouseIns, setSpouseIns] = useState(
    [{
      assessment_id: `${assessment_id}`, name: "", employer: "",
      dob: "", occupation: "", employer_addr: ""
    }]
  )



  let addSpouseFields = () => {
    setSpouseIns([...spouseIns, {
      assessment_id: `${assessment_id}`,
      name: "", employer: "", dob: "", occupation: "", employer_addr: ""
    }])
  }

  let removeSpouseFields = (i) => {
    let newSpouseValues = [...spouseIns];
    newSpouseValues.splice(i, 1);
    setSpouseIns(newSpouseValues)
  }

  let handleSpouseChangeIns = (i, e) => {
    let newSpouseValues = [...spouseIns];
    newSpouseValues[i][e.target.name] = e.target.value;
    setSpouseIns(newSpouseValues);
  }

  let handleSpouseSubmit = (event) => {
    setIsFetching(true)
    event.preventDefault();
    let formVal = (spouseIns)
    for (let index = 0; index < formVal.length; index++) {
      const element = formVal[index];
      axios.post(`${url.BASE_URL}forma/spouse`, element)
        .then(function (response) {
          toast.success("Saved Successfully!");
          setIsFetching(false)
        })
        .catch(function (error) {
          toast.error("Failed! please try again");
          setIsFetching(false)
        });
    }
  }

  const [domesticStaff, setDomesticStaff] = useState(
    [{
      assessment_id: `${assessment_id}`, title: "", name: "", house_no: "", street: "",
      town: "", lga: "", state: "", amount_paid: "", payer: ""
    }]
  )

  let handleDomesticStaffChange = (i, e) => {
    let newStaffValues = [...domesticStaff];
    newStaffValues[i][e.target.name] = e.target.value;
    setDomesticStaff(newStaffValues);
    console.log(newStaffValues);
  }

  let addStaffFields = () => {
    setDomesticStaff([...domesticStaff, {
      assessment_id: `${assessment_id}`, title: "", name: "", house_no: "", street: "",
      town: "", lga: "", state: "", amount_paid: "", payer: ""
    }])
  }

  let removeStaffFields = (i) => {
    let newStaffValues = [...domesticStaff];
    newStaffValues.splice(i, 1);
    setDomesticStaff(newStaffValues)
  }

  let handleStaffSubmit = (event) => {
    event.preventDefault();
    setIsFetching(true)
    let formVal = (domesticStaff)
    for (let index = 0; index < formVal.length; index++) {
      const element = formVal[index];
      axios.post(`${url.BASE_URL}forma/domestic-staff`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Saved Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }
  }

  const [childrenIns, setChildrenIns] = useState(
    [{
      assessment_id: `${assessment_id}`, name: "", dob: "", school_name: "",
      school_addr: "", school_fees: "", child_income: ""
    }]
  )

  let handleChildrenChange = (i, e) => {
    let newChildValues = [...childrenIns];
    newChildValues[i][e.target.name] = e.target.value;
    setChildrenIns(newChildValues);
    console.log(newChildValues);
  }

  let addChildFields = () => {
    setChildrenIns([...childrenIns, {
      assessment_id: `${assessment_id}`, name: "", dob: "",
      school_name: "", school_addr: "", school_fees: "", child_income: ""
    }])
  }

  let removeChildFields = (i) => {
    let newChildValues = [...childrenIns];
    newChildValues.splice(i, 1);
    setChildrenIns(newChildValues)
  }

  let handleChildSubmit = (event) => {
    event.preventDefault();
    setIsFetching(true)
    let formVal = (childrenIns)
    for (let index = 0; index < formVal.length; index++) {
      const element = formVal[index];
      axios.post(`${url.BASE_URL}forma/children`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Saved Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }
  }

  const [selfEmployedIns, setSelfEmployedIns] = useState(
    {
      assessment_id: "", business_type: "", business_name: "", business_addr: "", business_start_date: "", income_earned: "",
      other_income: "", cash_inc_expense: "", figures_estimated: ""
    }
  )

  let incEarnedIns = Number(selfEmployedIns.income_earned)
  let otherIncIns = Number(selfEmployedIns.other_income)
  const totalBusIncIns = incEarnedIns + otherIncIns

  function handleSelfEmployedChange(evt) {
    const value = evt.target.value;
    setSelfEmployedIns({
      ...selfEmployedIns,
      [evt.target.name]: value
    });
  }

  let submitDataselfEmp = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let selfEmpObj = {
      assessment_id: `${assessment_id}`,
      business_type: `${selfEmployedIns.business_type}`,
      business_name: `${selfEmployedIns.business_name}`,
      business_addr: `${selfEmployedIns.business_addr}`,
      business_start_date: `${selfEmployedIns.business_start_date}`,
      income_earned: `${selfEmployedIns.income_earned}`,
      other_income: `${selfEmployedIns.other_income}`,
      cash_inc_expense: `${selfEmployedIns.cash_inc_expense}`,
      // expense: `${selfEmployedIns.expense}`,
      figures_estimated: `${selfEmployedIns.figures_estimated}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/self-employed`, selfEmpObj);
      setIsFetching(false)
      toast.success("Saved Successfully!");
    } catch (error) {
      console.log(error);
      toast.error("error, Please try again!");
      setIsFetching(false)
    }

  }

  const [expensesData, setExpenses] = useState(
    {
      assessment_id: "", item: "", amount: ""
    }
  )

  let expenseAmountIns = Number(expensesData.amount)
  const netProfitIns = totalBusIncIns - expenseAmountIns

  function handleExpenseChange(evt) {
    const value = evt.target.value;
    setExpenses({
      ...expensesData,
      [evt.target.name]: value
    });
  }

  let submitDataExpense = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let expenseDataObj = {
      assessment_id: `${assessment_id}`,
      item: `${expensesData.item}`,
      amount: `${expensesData.amount}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/expenses`, expenseDataObj);
      setIsFetching(false)
      toast.success("Saved Successfully!");
    } catch (error) {
      toast.error("error, Please try again!");
      console.log(error);
      setIsFetching(false)
    }
  }

  let submitEmploymentInsert = (data) => {
    setIsFetching(true)
    console.log(data);
    axios.post(`${url.BASE_URL}forma/employed`, data)
      .then(function (response) {
        setIsFetching(false)
        toast.success("Saved Successfully!");
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        toast.error("error, Please try again!");
        setIsFetching(false)
        // handle error
        console.log(error);
      })
    // try {
    //   let res = axios.post(`${url.BASE_URL}forma/employed`, data);
    //   setIsFetching(false)
    //   toast.success("Saved Successfully!");
    // } catch (error) {
    //   toast.error("error, Please try again!");
    //   console.log(error);
    //   setIsFetching(false)
    // }
  }


  const [lifeInsData, setLifeInsData] = useState(
    {
      assessment_id: "", company: "", addr: "", rsa_no: "", amount: "", comments: ""
    }
  )

  function handleLifeInsChange(evt) {
    const value = evt.target.value;
    setLifeInsData({
      ...lifeInsData,
      [evt.target.name]: value
    });
  }

  let submitDataLifIns = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let lifeInsDataObj = {
      assessment_id: `${assessment_id}`,
      company: `${lifeInsData.company}`,
      addr: `${lifeInsData.addr}`,
      rsa_no: `${lifeInsData.rsa_no}`,
      amount: `${lifeInsData.amount}`,
      comments: `${lifeInsData.comments}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/lap`, lifeInsDataObj);
      setIsFetching(false)
      toast.success("Saved Successfully!");
    } catch (error) {
      toast.error("error, Please try again!");
      setIsFetching(false)
    }

  }

  const [pensionDeduct, setPensionDeduct] = useState(
    { assessment_id: "", pfa: "", pfa_addr: "", rsa_no: "", amount: "", comments: "" }
  )

  function handlePenDeductChange(evt) {
    const value = evt.target.value;
    setPensionDeduct({
      ...pensionDeduct,
      [evt.target.name]: value
    });
  }

  let submitDataPenDeduct = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let pendedObj = {
      assessment_id: `${assessment_id}`,
      pfa: `${pensionDeduct.pfa}`,
      pfa_addr: `${pensionDeduct.pfa_addr}`,
      rsa_no: `${pensionDeduct.rsa_no}`,
      amount: `${pensionDeduct.amount}`,
      comments: `${pensionDeduct.comments}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/pension-ded`, pendedObj);
      setIsFetching(false)
      toast.success("Saved Successfully!");
    } catch (error) {
      toast.error("error, Please try again!");
      setIsFetching(false)
    }

  }

  const [nhisData, setNhis] = useState(
    {
      assessment_id: "", company: "", addr: "", insurance_no: "", amount: "", comments: ""
    }
  )

  function handleNHISChange(evt) {
    const value = evt.target.value;
    setNhis({
      ...nhisData,
      [evt.target.name]: value
    });
  }

  let submitDataNhisIns = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let nhisDataObj = {
      assessment_id: `${assessment_id}`,
      company: `${nhisData.company}`,
      addr: `${nhisData.addr}`,
      insurance_no: `${nhisData.insurance_no}`,
      amount: `${nhisData.amount}`,
      comments: `${nhisData.comments}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/nhis`, nhisDataObj);
      setIsFetching(false)
      toast.success("Saved Successfully!");
    } catch (error) {
      toast.error("error, Please try again!");
      console.log(error);
      setIsFetching(false)
    }

  }

  const [partnerData, setPartnerData] = useState(
    {
      assessment_id: "", name: "", addr: "", phone: "", percentage: "",
      comments: ""
    }
  )

  function handlePartnershipChange(evt) {
    const value = evt.target.value;
    setPartnerData({
      ...partnerData,
      [evt.target.name]: value
    });
  }

  let submitDataPartnerIns = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let partnerDataObj = {
      assessment_id: `${assessment_id}`,
      name: `${partnerData.name}`,
      addr: `${partnerData.addr}`,
      phone: `${partnerData.phone}`,
      percentage: `${partnerData.percentage}`,
      comments: `${partnerData.comments}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/partner`, partnerDataObj);
      setIsFetching(false)
      toast.success("Saved Successfully!");
    } catch (error) {
      toast.error("error, Please try again!");
      console.log(error);
      setIsFetching(false)
    }
  }

  const [rentIncomeIns, setRentIncomeIns] = useState(
    {
      assessment_id: "", prop_type: "", prop_address: "",
      rental_type: "", rental_amount: "",
      renter_phone: "", renter_name: "", comments: ""
    }
  )

  function handleRentIncomeChange(evt) {
    const value = evt.target.value;
    setRentIncomeIns({
      ...rentIncomeIns,
      [evt.target.name]: value
    });

  }

  let submitDataRentInc = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let rentIncomeDataObj = {
      assessment_id: `${assessment_id}`,
      prop_type: `${rentIncomeIns.prop_type}`,
      prop_address: `${rentIncomeIns.prop_address}`,
      rental_type: `${rentIncomeIns.rental_type}`,
      rental_amount: `${rentIncomeIns.rental_amount}`,
      renter_name: `${rentIncomeIns.renter_name}`,
      renter_phone: `${rentIncomeIns.renter_phone}`,
      comments: `${rentIncomeIns.comments}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/rent-income`, rentIncomeDataObj);
      setIsFetching(false)
      toast.success("Saved Successfully!");
    } catch (error) {
      toast.error("error, Please try again!");
      console.log(error);
      setIsFetching(false)
    }
  }

  const [bankInterestIns, setBankInterestIns] = useState(
    {
      assessment_id: "", name: "", account: "", bvn: "", gross_amount: "", comments: ""
    }
  )

  function handleBankInterestChange(evt) {
    const value = evt.target.value;
    setBankInterestIns({
      ...bankInterestIns,
      [evt.target.name]: value
    });
  }

  let submitDataBankInt = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let bankInterestDataObj = {
      assessment_id: `${assessment_id}`,
      name: `${bankInterestIns.name}`,
      account: `${bankInterestIns.account}`,
      bvn: `${bankInterestIns.bvn}`,
      gross_amount: `${bankInterestIns.gross_amount}`,
      comments: `${bankInterestIns.comments}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/bank-interest`, bankInterestDataObj);
      setIsFetching(false)
      toast.success("Saved Successfully!");
    } catch (error) {
      toast.error("error, Please try again!");
      console.log(error);
      setIsFetching(false)
    }
  }

  const [dividendsIns, setDividendsIns] = useState(
    {
      assessment_id: "", name: "", addr: "", amount: "", comments: "",
    }
  )

  function handleDividendsChange(evt) {
    const value = evt.target.value;
    setDividendsIns({
      ...dividendsIns,
      [evt.target.name]: value
    });
  }

  let submitDataDividends = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let dividendsDataObj = {
      assessment_id: `${assessment_id}`,
      name: `${dividendsIns.name}`,
      addr: `${dividendsIns.addr}`,
      amount: `${dividendsIns.amount}`,
      comments: `${dividendsIns.comments}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/dividends`, dividendsDataObj);
      setIsFetching(false)
      toast.success("Saved Successfully!");
    } catch (error) {
      toast.error("error, Please try again!");
      console.log(error);
      setIsFetching(false)
    }
  }

  const [pensionIns, setPensionIns] = useState(
    {
      assessment_id: "", pfa: "", pfa_addr: "", gross_amount: "", comments: "",
    }
  )

  function handlePensionChange(evt) {
    const value = evt.target.value;
    setPensionIns({
      ...pensionIns,
      [evt.target.name]: value
    });
  }

  let submitDataPensionIns = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let pensionDataObj = {
      assessment_id: `${assessment_id}`,
      pfa: `${pensionIns.pfa}`,
      pfa_addr: `${pensionIns.pfa_addr}`,
      gross_amount: `${pensionIns.gross_amount}`,
      comments: `${pensionIns.comments}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/pension`, pensionDataObj);
      setIsFetching(false)
      toast.success("Saved Successfully!");
    } catch (error) {
      toast.error("error, Please try again!");
      console.log(error);
      setIsFetching(false)
    }
  }

  const [assetIns, setAssetIns] = useState(
    {
      assessment_id: "", asset_type: "", asset_addr: "", buyer_name: "",
      buyer_addr: "", buyer_phone: "", amount: "", comments: ""
    }
  )

  function handleAssetChange(evt) {
    const value = evt.target.value;
    setAssetIns({
      ...assetIns,
      [evt.target.name]: value
    });
  }

  let submitDataAssetIns = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let assetDataObj = {
      assessment_id: `${assessment_id}`,
      asset_type: `${assetIns.asset_type}`,
      asset_addr: `${assetIns.asset_addr}`,
      buyer_name: `${assetIns.buyer_name}`,
      buyer_addr: `${assetIns.buyer_addr}`,
      buyer_phone: `${assetIns.buyer_phone}`,
      amount: `${assetIns.amount}`,
      comments: `${assetIns.comments}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/assets`, assetDataObj);
      setIsFetching(false)
      toast.success("Saved Successfully!");
    } catch (error) {
      toast.error("error, Please try again!");
      console.log(error);
      setIsFetching(false)
    }
  }

  const [outsideSourceIns, SetOutsideSourceIns] = useState(
    {
      assessment_id: "", source: "", gross_amount: "", comments: ""
    }
  )
  function handleOutsideSourceChange(evt) {
    const value = evt.target.value;
    SetOutsideSourceIns({
      ...outsideSourceIns,
      [evt.target.name]: value
    });
  }

  let submitDataOutsideSource = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let outsideSourceDataObj = {
      assessment_id: `${assessment_id}`,
      source: `${outsideSourceIns.source}`,
      gross_amount: `${outsideSourceIns.gross_amount}`,
      comments: `${outsideSourceIns.comments}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/outside-source`, outsideSourceDataObj);
      setIsFetching(false)
      toast.success("Saved Successfully!");
    } catch (error) {
      toast.error("error, Please try again!");
      console.log(error);
      setIsFetching(false)
    }
  }

  let lapAmount
  let NhisAmount
  let penDeductAmount
  let employmentGross
  let incomeEarned
  let otherIncome
  let expenseAmout
  let totalBusInc
  let netProfit

  lifeass.forEach((el, i) => (
    lapAmount = el.amount
  ))

  nhis.forEach((el, i) => (
    NhisAmount = el.amount
  ))

  pensDeduct.forEach((el, i) => (
    penDeductAmount = el.amount
  ))

  selfEmployment.forEach((el, i) => (
    incomeEarned = el.income_earned
  ))

  selfEmployment.forEach((el, i) => (
    otherIncome = el.other_income
  ))

  employment.forEach((el, i) => (
    employmentGross = el.gross_pay
  ))

  expenses.forEach((el, i) => (
    expenseAmout = el.amount
  ))

  if (incomeEarned == null || incomeEarned == undefined || incomeEarned == "") {
    incomeEarned = 0
  } else {
    incomeEarned = incomeEarned
  }

  if (otherIncome == null || otherIncome == undefined || otherIncome == "") {
    otherIncome = 0
  } else {
    otherIncome = otherIncome
  }

  if (expenseAmout == null || expenseAmout == undefined || expenseAmout == "") {
    expenseAmout = 0
  } else {
    expenseAmout = expenseAmout
  }

  let earnedInc = Number(incomeEarned)
  let otherInc = Number(otherIncome)
  let expAmt = Number(expenseAmout)

  totalBusInc = earnedInc + otherInc

  netProfit = totalBusInc - expAmt

  setAuthToken();
  let submitForm = (e) => {
    e.preventDefault()
    let assessFormObj = {
      assessment_id: `${assessment_id}`,
      employed: `${employmentGross}`,
      selfEmployed: `${netProfit}`,
      nhis: `${NhisAmount}`,
      lap: `${lapAmount}`,
      pension: `${penDeductAmount}`,
      year: assmentYear,
      kgtin: kgtinVal
    }
    axios.put(`${url.BASE_URL}forma/tax-cal`, assessFormObj)
      .then(function (response) {
        setIsFetching(false)
        toast.success("Updated Successfully!");
        router.push('/view/pendingdirect')
      })
      .catch(function (error) {
        setIsFetching(false)
        toast.error("Failed! please try again");
      });

  }




  setAuthToken();

  let submitDataResAdd = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    try {
      let res = await axios.put(`${url.BASE_URL}forma/residence-addr`, residentialAddr[0]);
      setIsFetching(false)
      toast.success("Updated Successfully!");

    } catch (error) {
      toast.error("error, Please try again!");
      setIsFetching(false)
    }

  }

  setAuthToken();
  let submitDataPensDed = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)

    let formVal = (pensDeduct)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/pension-ded`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataEmployment = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    const formData = new FormData();
    let formVal = (employment)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/employed`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataSelfEmployment = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    const formData = new FormData();
    let formVal = (selfEmployment)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/self-employed`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataExpenses = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (expenses)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/expenses`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataLap = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (lifeass)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/lap`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataNhis = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (nhis)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/nhis`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataPartner = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (partner)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/partner`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataRentIncome = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (rentIncome)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/rent-income`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataBankInterest = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (bankInterest)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/bank-interest`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataBankDividends = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (dividends)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/dividends`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataPension = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (pension)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/pension`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataAsset = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (asset)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/assets`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataOutside = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (outsideSource)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/outside-source`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }

  const [vehicle, setVehicle] = useState(
    {
      assessment_id: "", purchase_date: "", cost: "", brand: "", model: "", year: ""
    }
  )

  function handleVehicleChange(evt) {
    const value = evt.target.value;
    setVehicle({
      ...vehicle,
      [evt.target.name]: value
    });
    console.log(vehicle);
  }

  let submitDataVehicleIns = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let vehicleDataObj = {
      assessment_id: `${assessment_id}`,
      purchase_date: `${vehicle.purchase_date}`,
      cost: `${vehicle.cost}`,
      brand: `${vehicle.brand}`,
      model: `${vehicle.model}`,
      year: `${vehicle.year}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/vechicles`, vehicleDataObj);
      setIsFetching(false)
      toast.success("Saved Successfully!");
    } catch (error) {
      toast.error("error, Please try again!");
      console.log(error);
      setIsFetching(false)
    }
  }

  const [landIns, setLandIns] = useState(
    {
      assessment_id: "", addr: "", prop_type: "", date_completion: "",
      construction_cost: "",
    }
  )
  function handleLandChange(evt) {
    const value = evt.target.value;
    setLandIns({
      ...landIns,
      [evt.target.name]: value
    });
  }

  let submitDataLandIns = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let landDataObj = {
      assessment_id: `${assessment_id}`,
      addr: `${landIns.addr}`,
      prop_type: `${landIns.prop_type}`,
      date_completion: `${landIns.date_completion}`,
      construction_cost: `${landIns.construction_cost}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/land`, landDataObj);
      setIsFetching(false)
      toast.success("Saved Successfully!");
    } catch (error) {
      toast.error("error, Please try again!");
      console.log(error);
      setIsFetching(false)
    }
  }

  const [farmland, setFarmland] = useState(
    {
      assessment_id: "", addr: "", acq_date: "", land_cost: "", produce_cost: "",
    }
  )

  function handlefarmChange(evt) {
    const value = evt.target.value;
    setFarmland({
      ...farmland,
      [evt.target.name]: value
    });
  }

  let submitDataFarmIns = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let farmDataObj = {
      assessment_id: `${assessment_id}`,
      addr: `${farmland.addr}`,
      acq_date: `${farmland.acq_date}`,
      land_cost: `${farmland.land_cost}`,
      produce_cost: `${farmland.produce_cost}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/farm`, farmDataObj);
      setIsFetching(false)
      toast.success("Saved Successfully!");
    } catch (error) {
      toast.error("error, Please try again!");
      console.log(error);
      setIsFetching(false)
    }
  }

  setAuthToken();
  let submitDataVehicles = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (vehicles)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/vechicles`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataLand = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (land)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/land`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataFarm = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (farm)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/farm`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataSpouse = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (spouse)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/spouse`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataChildren = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (children)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/spouse`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataDomestic = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (domestic)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/domestic-staff`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }

  const onChange = e => {
    let toggleval = ''
    setToggle(toggleval)
  };

  const onChange2 = e => {
    // e.preventDefault()
    let toggleval = 'hidden'
    setToggle(toggleval)
  };

  const onChange3 = e => {
    let toggleval = ''
    setToggle2(toggleval)

  };
  const onChange4 = e => {
    // e.preventDefault()
    let toggleval = 'hidden'
    setToggle2(toggleval)

  };
  const onChange5 = e => {
    let toggleval = ''
    setToggle3(toggleval)
  };

  const onChange6 = e => {
    let toggleval = 'hidden'
    setToggle3(toggleval)
  };
  const onChange7 = e => {
    let toggleval = ''
    setToggle4(toggleval)

  };
  const onChange8 = e => {
    let toggleval = 'hidden'
    setToggle4(toggleval)

  };
  const onChange9 = e => {
    let toggleval = ''
    setToggle5(toggleval)
  };

  const onChange10 = e => {
    let toggleval = 'hidden'
    setToggle5(toggleval)
  };
  const onChange11 = e => {
    let toggleval = ''
    setToggle6(toggleval)

  };
  const onChange12 = e => {
    let toggleval = 'hidden'
    setToggle6(toggleval)

  };
  const onChange13 = e => {
    let toggleval = ''
    setToggle7(toggleval)
  };

  const onChange14 = e => {
    let toggleval = 'hidden'
    setToggle7(toggleval)
  };
  const onChange15 = e => {
    let toggleval = ''
    setToggle8(toggleval)

  };
  const onChange16 = e => {
    let toggleval = 'hidden'
    setToggle8(toggleval)

  };
  const onChange17 = e => {
    let toggleval = ''
    setToggle9(toggleval)
  };

  const onChange18 = e => {
    let toggleval = 'hidden'
    setToggle9(toggleval)
  };
  const onChange19 = e => {
    let toggleval = ''
    setToggle10(toggleval)

  };
  const onChange20 = e => {
    let toggleval = 'hidden'
    setToggle10(toggleval)

  };
  const onChange21 = e => {
    let toggleval = ''
    setToggle11(toggleval)
  };

  const onChange22 = e => {
    let toggleval = 'hidden'
    setToggle11(toggleval)
  };
  const onChange23 = e => {
    let toggleval = ''
    setToggle12(toggleval)

  };
  const onChange24 = e => {
    let toggleval = 'hidden'
    setToggle12(toggleval)

  };
  const onChange25 = e => {
    let toggleval = ''
    setToggle13(toggleval)

  };
  const onChange26 = e => {
    let toggleval = 'hidden'
    setToggle13(toggleval)

  };
  const onChange27 = e => {
    let toggleval = ''
    setToggle14(toggleval)

  };
  const onChange28 = e => {
    let toggleval = 'hidden'
    setToggle14(toggleval)

  };
  const onChange29 = e => {
    let toggleval = ''
    setToggle15(toggleval)

  };
  const onChange30 = e => {
    let toggleval = 'hidden'
    setToggle15(toggleval)

  };

  const onresidenceToggleYes = e => {
    let toggleval = 'hidden'
    setresToggle(toggleval)

  };

  const MarriedYes = e => {
    let toggleval = ''
    setmarriedToggle(toggleval)

  };
  const MarriedNo = e => {
    let toggleval = 'hidden'
    setmarriedToggle(toggleval)

  };
  const childrenYes = e => {
    let toggleval = ''
    setchildrenToggle(toggleval)

  };
  const childrenNo = e => {
    let toggleval = 'hidden'
    setchildrenToggle(toggleval)

  };
  const servantsYes = e => {
    let toggleval = ''
    setservantsToggle(toggleval)

  };
  const servantsNo = e => {
    let toggleval = 'hidden'
    setservantsToggle(toggleval)

  };

  const onresidenceToggleNo = e => {
    let toggleval = ''
    setresToggle(toggleval)

  };

  const formTog1 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle(toggleval)

  };
  const formTog2 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle2(toggleval)

  };
  const formTog3 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle3(toggleval)

  };
  const formTog4 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle4(toggleval)

  };
  const formTog5 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle5(toggleval)

  };
  const formTog6 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle6(toggleval)

  };
  const formTog7 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle7(toggleval)

  };
  const formTog8 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle8(toggleval)

  };
  const formTog9 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle9(toggleval)

  };
  const formTog10 = e => {
    e.preventDefault()
    let toggleva = 'hidden'
    setToggle10(toggleva)

  };
  const formTog11 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle11(toggleval)

  };
  const formTog12 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle12(toggleval)

  };
  const formTog13 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle13(toggleval)

  };

  const formTog14 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle14(toggleval)

  };
  const formTog15 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle15(toggleval)

  };

  return (
    <>
      <ToastContainer />

      {isFetching && (
        <div>

          <div className="flex  justify-center item mb-2">
            <Loader
              visible={isFetching}
              type="BallTriangle"
              color="#00FA9A"
              height={19}
              width={19}
              timeout={0}
              className="ml-2"
            />
            <p className="font-bold">Updating...</p>
          </div>
        </div>
      )}

      <div className="block p-6 rounded-lg bg-white w-full">
        <div className="flex justify-around mb-8">
          <h6 className="p-2">Taxpayer Information <small className="text-blue-600"><Link legacyBehavior href={`/update-individual/${kgtinVal}`}>Edit</Link></small></h6>
          <div className="border p-4">
            <div >
              <div>
                <p className="font-bold">
                  Comment
                </p>
                {assessment.map((com, i) => (
                  <p key={i}>{com.comment}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="mb-3 font-bold"></p>
        {indvData.map((data, i) => (
          <form>
            <div className="grid grid-cols-3 gap-4">
              <div className="">
                <p>Name</p>

                <input type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={data.tp_name} disabled />

              </div>

              <div className="form-group mb-6">
                <p>KGTIN</p>

                <input type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={data.KGTIN} disabled />

              </div>

              <div className="form-group mb-6">
                <p>Email</p>
                <input type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={data.email} disabled />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="form-group mb-6">
                <p>Phone</p>
                <input type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={data.phone_number} disabled />
              </div>

              <div className="form-group mb-6">
                <p>Tax Office</p>
                <input type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={data.tax_office} disabled />
              </div>
              <div className="form-group mb-6">
                <p>Taxpayer Type</p>
                <input type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={data.tp_type} disabled />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group mb-6">
                <p>Address</p>
                <input type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={data.address} disabled />
              </div>
            </div>
          </form>

        ))}

      </div>

      <div className="block p-6 rounded-lg bg-white w-full">
        <div className="flex">
          <h6 className="p-2">Current Residential address</h6>
        </div>

        <div>
          {residentialAddr == null || residentialAddr == "" ?
            <form onSubmit={submitDataResAddr}>
              <div className="grid grid-cols-3 gap-4">
                <div className="mb-6">
                  <p>House No</p>
                  <input onChange={handleResidentialChange} type="text" className="form-control w-full rounded font-light text-gray-500"
                    name="house_no" value={residentialAddress.house_no} />
                </div>

                <div className="form-group mb-6">
                  <p>Street</p>
                  <input onChange={handleResidentialChange} type="text" className="form-control w-full rounded font-light text-gray-500"
                    name="street" value={residentialAddress.street} />
                </div>
                <div className="form-group mb-6">
                  <p>LGA</p>
                  <input onChange={handleResidentialChange} type="text" className="form-control w-full rounded font-light text-gray-500"
                    name="lga" value={residentialAddress.lga} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="form-group mb-6">
                  <p>Town</p>
                  <input onChange={handleResidentialChange} type="text" className="form-control w-full rounded font-light text-gray-500"
                    name="town" value={residentialAddress.town} />

                </div>

                <div className="form-check form-check-inline">
                  <p>Type of Residence</p>
                  <select onChange={handleResidentialChange} className="form-select w-full" name="residence_type" value={residentialAddress.residence_type}>
                    <option value="select">Select</option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Mansion">Mansion</option>
                    <option value="Apartment or Flat">Apartment or Flat</option>
                    <option value="Terraced house">Terraced house</option>
                    <option value="Duplex">Duplex</option>
                    <option value="Traditional house">Traditional house</option>
                  </select>
                </div>

                <div className="form-check form-check-inline ml-5 self-center">
                  <p>Do you own your place of residence?</p>
                  <div className="flex">
                    <div className="form-check form-check-inline">
                      <input onClick={onresidenceToggleYes} onChange={handleResidentialChange} name="residence_owner" value="Owner" checked={residentialAddress.residence_owner === "Owner"} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio1" />
                      <label className="form-check-label inline-block text-gray-800" htmlFor="inlineRadio10">Owner</label>
                    </div>

                    <div className="form-check form-check-inline ml-5">
                      <input onClick={onresidenceToggleNo} onChange={handleResidentialChange} name="residence_owner" value="Rented" checked={residentialAddress.residence_owner === "Rented"} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio2" />
                      <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">Rented</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`grid grid-cols-3 gap-4 ${resiToggle}`}>
                <div className="form-group mb-6">
                  <input onChange={handleResidentialChange} type="text" name="annual_rent" value={residentialAddress.annual_rent} className="form-control w-full rounded"
                    placeholder="Annual rent" />
                </div>

                <div className="form-group mb-6">
                  <input onChange={handleResidentialChange} type="text" name="owner_name" value={residentialAddress.owner_name} className="form-control w-full rounded"
                    placeholder="Name of owner" />
                </div>
                <div className="form-group mb-6">
                  <input onChange={handleResidentialChange} type="text" name="owner_phone" value={residentialAddress.owner_phone} className="form-control w-full rounded"
                    placeholder="Phone number" />
                </div>
              </div>
              <div>
                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form> :
            <div>
              <form onSubmit={submitDataResAdd}>
                {residentialAddr.map((ind, i) => (
                  <div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="mb-6">
                        <p>House No</p>

                        <input onChange={(e) => changed(e, i, "house_no")} name="house_no" type="text" className="form-control w-full rounded font-light text-gray-500"
                          value={ind.house_no} />

                      </div>
                      <div className="form-group mb-6">
                        <p>Street</p>

                        <input onChange={(e) => changed(e, i, "street")} name="street" type="text" className="form-control w-full rounded font-light text-gray-500"
                          value={ind.street} />

                      </div>
                      <div className="form-group mb-6">
                        <p>LGA</p>

                        <input onChange={(e) => changed(e, i, "lga")} name="lga" type="text" className="form-control w-full rounded font-light text-gray-500"
                          value={ind.lga} />

                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="form-group mb-6">
                        <p>Town</p>

                        <input onChange={(e) => changed(e, i, "town")} name="town" type="text" className="form-control w-full rounded font-light text-gray-500"
                          value={ind.town} />

                      </div>

                      <div className="form-check form-check-inline">
                        <p>Type of Residence</p>
                        <select value={ind.residence_type} onChange={(e) => changed(e, i, "residence_type")} className="form-select w-full" name="residence_type" >
                          <option value="select">Select</option>
                          <option value="Bungalow">Bungalow</option>
                          <option value="Penthouse">Penthouse</option>
                          <option value="Mansion">Mansion</option>
                          <option value="Apartment or Flat">Apartment or Flat</option>
                          <option value="Terraced house">Terraced house</option>
                          <option value="Duplex">Duplex</option>
                          <option value="Traditional house">Traditional house</option>
                        </select>


                      </div>

                      <div className="form-check form-check-inline ml-5 self-center">
                        <p>Do you own your place of residence?</p>
                        <div className="flex">
                          <div className="form-check form-check-inline">
                            <input onClick={onresidenceToggleYes} onChange={(e) => changed(e, i, "residence_owner")} name="residence_owner" value={ind.residence_owner} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio1" />
                            <label className="form-check-label inline-block text-gray-800" htmlFor="inlineRadio10">Owner</label>
                          </div>

                          <div className="form-check form-check-inline ml-5">
                            <input onClick={onresidenceToggleNo} onChange={(e) => changed(e, i, "residence_owner")} name="residence_owner" value={ind.residence_owner} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio2" />
                            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">Rented</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`grid grid-cols-3 gap-4 ${resiToggle}`}>
                      <div className="form-group mb-6">
                        <p>Annual rent</p>

                        <input onChange={(e) => changed(e, i, "annual_rent")} name="annual_rent" type="text" className="form-control w-full rounded font-light text-gray-500"
                          value={ind.annual_rent} />

                      </div>

                      <div className="form-group mb-6">
                        <p>Owner name</p>

                        <input onChange={(e) => changed(e, i, "owner_name")} name="owner_name" type="text" className="form-control w-full rounded font-light text-gray-500"
                          value={ind.owner_name} />

                      </div>
                      <div className="form-group mb-6">
                        <p>Owner Phone</p>

                        <input onChange={(e) => changed(e, i, "owner_phone")} name="owner_phone" type="text" className="form-control w-full rounded font-light text-gray-500"
                          value={ind.owner_phone} />

                      </div>
                    </div>
                    <div>
                      <button
                        style={{ backgroundColor: "#84abeb" }}
                        className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ))}
              </form>

            </div>
          }


        </div>

      </div>



      <div className="block p-6 rounded-lg bg-white w-full">

        <div className="grid grid-cols-3 gap-4">
          <div className="form-group mb-6">
            <p>Spouse</p>
          </div>
          <div className="flex">
            <div className="form-check form-check-inline">
              <input onClick={MarriedYes} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
              <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
            </div>

            <div className="form-check form-check-inline ml-5">
              <input onClick={MarriedNo} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
              <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
            </div>
          </div>
        </div>

        <div className={`${marriedToggle}`}>

          {spouse == null || spouse == "" ?
            <div>
              <form className="border p-3" onSubmit={handleSpouseSubmit}>
                {spouseIns.map((element, index) => (
                  <div className="grid border-b-2 m-3 p-3 grid-cols-3 gap-4" key={index}>
                    <div className="form-group mb-6">
                      <p>Name of spouse</p>
                      <input required name="name" value={element.name || ""} onChange={e => handleSpouseChangeIns(index, e)} type="text" className="form-control w-full rounded"
                        placeholder="Name of spouse" />
                    </div>

                    <div className="form-group mb-6">
                      <p>Date of Birth</p>
                      <input required name="dob" value={element.dob || ""} onChange={e => handleSpouseChangeIns(index, e)} type="date" className="form-control w-full rounded"
                        placeholder="Date of birth" />
                    </div>
                    <div className="form-group mb-6">
                      <p>Occupation</p>
                      <input name="occupation" value={element.occupation || ""} onChange={e => handleSpouseChangeIns(index, e)} type="text" className="form-control w-full rounded"
                        placeholder="Occupation" />
                    </div>
                    <div className="form-group mb-6">
                      <p>Business/Employer</p>
                      <input name="employer" value={element.employer || ""} onChange={e => handleSpouseChangeIns(index, e)} type="text" className="form-control w-full rounded"
                        placeholder="Employer/Business of spouse" />
                    </div>
                    <div className="form-group mb-6">
                      <p>Office/Business Address</p>
                      <input name="employer_addr" value={element.employer_addr || ""} onChange={e => handleSpouseChangeIns(index, e)} type="text" className="form-control w-full rounded"
                        placeholder="Employer's/business address of spouse" />
                    </div>
                    {
                      index ?
                        <div className="form-group place-self-center">
                          <button onClick={removeSpouseFields}

                            className="btn btn-default bg-red-600 text-white btn-outlined bg-transparent rounded-md"
                            type="button"
                          >
                            Remove
                          </button>
                        </div>
                        : null
                    }

                  </div>
                ))}
                <div className="flex justify-between p-3">
                  <button onClick={addSpouseFields}
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="button"
                  >
                    Add Spouse
                  </button>
                  <button
                    // style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 bg-green-600 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
            :
            <div>
              <form onSubmit={submitDataSpouse} className="border p-3">
                <div>
                  {spouse.map((ind, i) => (

                    <div>
                      <div className="grid border-b-2 m-3 p-3 grid-cols-3 gap-4">
                        <div className="form-group mb-6">
                          <p>Name of spouse</p>
                          <input value={ind.name} onChange={(e) => changedSpouse(e, i, "name")} required name="name" type="text" className="form-control w-full rounded" />
                        </div>

                        <div className="form-group mb-6">
                          <p>Date of Birth</p>
                          <input required name="dob" type="date" className="form-control w-full rounded"
                            value={ind.dob} onChange={(e) => changedSpouse(e, i, "dob")} />
                        </div>
                        <div className="form-group mb-6">
                          <p>Occupation</p>
                          <input name="occupation" type="text" className="form-control w-full rounded"
                            value={ind.occupation} onChange={(e) => changedSpouse(e, i, "occupation")} />
                        </div>
                        <div className="form-group mb-6">
                          <p>Business/Employer</p>
                          <input name="employer" type="text" className="form-control w-full rounded"
                            value={ind.employer} onChange={(e) => changedSpouse(e, i, "employer")} />
                        </div>
                        <div className="form-group mb-6">
                          <p>Office/Business Address</p>
                          <textarea name="employer_addr" type="text" className="form-control w-full rounded"
                            value={ind.employer_addr} onChange={(e) => changedSpouse(e, i, "employer_addr")} />
                        </div>
                      </div>

                    </div>
                  ))}
                  <div className="flex justify-between p-3">

                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Update
                    </button>

                  </div>
                </div>
              </form>
            </div>

          }
        </div>


      </div>



      <div className="block p-6 rounded-lg bg-white w-full">

        <div className="grid grid-cols-3 gap-4">
          <div className="form-group mb-6">
            <p>Children</p>
          </div>
          <div className="flex">
            <div className="form-check form-check-inline">
              <input onClick={childrenYes} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
              <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
            </div>

            <div className="form-check form-check-inline ml-5">
              <input onClick={childrenNo} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
              <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
            </div>
          </div>
        </div>

        <div className={`${childrenToggle} border`}>
          {children == null || children == "" ?
            <div >
              <form onSubmit={handleChildSubmit} >
                {childrenIns.map((element, index) => (
                  <div key={index} className={`grid m-3 p-3 border-b-2 grid-cols-3 gap-4`}>
                    <div className="form-group mb-6">
                      <p>Name of Child</p>
                      <input name="name" value={element.name || ""} onChange={e => handleChildrenChange(index, e)} type="text" className="form-control w-full rounded"
                        placeholder="Name of child in full" />
                    </div>
                    <div className="form-group mb-6">
                      <p>Date of Birth</p>
                      <input required name="dob" value={element.dob || ""} onChange={e => handleChildrenChange(index, e)} type="date" className="form-control w-full rounded"
                        placeholder="Date of birth" />
                    </div>
                    <div className="form-group mb-6">
                      Child School Name
                      <input name="school_name" value={element.school_name || ""} onChange={e => handleChildrenChange(index, e)} type="text" className="form-control w-full rounded"
                        placeholder="Name of child's school" />
                    </div>
                    <div className="form-group ">
                      School Address
                      <input name="school_addr" value={element.school_addr || ""} onChange={e => handleChildrenChange(index, e)} type="text" className="form-control w-full rounded"
                        placeholder="Address of child's school" />
                    </div>
                    <div className="form-group">
                      <p>School Fees</p>
                      <input name="school_fees" value={element.school_fees || ""} onChange={e => handleChildrenChange(index, e)} type="text" className="form-control w-full rounded"
                        placeholder="Child's school fees per session" />
                    </div>
                    <div className="form-group">
                      <p>Child's Income</p>
                      <input name="child_income" value={element.child_income || ""} onChange={e => handleChildrenChange(index, e)} type="text" className="form-control w-full rounded"
                        placeholder="Child's income in own right" />
                    </div>
                    <div></div>
                    <div className="justify-self-center">
                      {
                        index ? <button onClick={removeChildFields}
                          // style={{ backgroundColor: "#84abeb" }}
                          className="btn bg-red-600 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                          type="button"
                        >
                          Remove
                        </button> : null
                      }

                    </div>
                    <div></div>
                  </div>
                ))}
                <div className="flex justify-between p-3">
                  <button onClick={addChildFields}
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="button"
                  >
                    Add Child
                  </button>
                  <button
                    // style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 bg-green-600 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>

                </div>
              </form>
            </div> :
            <div>
              <form onSubmit={submitDataChildren}>
                <div>
                  {children.map((ind, i) => (
                    <div>
                      <div className={`grid m-3 p-3 border-b-2 grid-cols-3 gap-4`}>
                        <div className="form-group mb-6">
                          <p>Name of Child</p>
                          <input name="name" type="text" className="form-control w-full rounded"
                            value={ind.name} onChange={(e) => changedChildren(e, i, "name")} />
                        </div>
                        <div className="form-group mb-6">
                          <p>Date of Birth</p>
                          <input required name="dob" type="date" className="form-control w-full rounded"
                            value={ind.dob} onChange={(e) => changedChildren(e, i, "dob")} />
                        </div>
                        <div className="form-group mb-6">
                          Child School Name
                          <input name="school_name" type="text" className="form-control w-full rounded"
                            value={ind.school_name} onChange={(e) => changedChildren(e, i, "school_name")} />
                        </div>
                        <div className="form-group ">
                          School Address
                          <input name="school_addr" type="text" className="form-control w-full rounded"
                            value={ind.school_addr} onChange={(e) => changedChildren(e, i, "school_addr")} />
                        </div>
                        <div className="form-group">
                          <p>School Fees</p>
                          <input name="school_fees" type="text" className="form-control w-full rounded"
                            value={ind.school_fees} onChange={(e) => changedChildren(e, i, "school_fees")} />
                        </div>
                        <div className="form-group">
                          <p>Child's Income</p>
                          <input name="child_income" type="text" className="form-control w-full rounded"
                            value={ind.child_income} onChange={(e) => changedChildren(e, i, "child_income")} />
                        </div>
                        <div></div>

                        <div></div>
                      </div>

                    </div>
                  ))}
                  <div className="flex justify-between p-3">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Update
                    </button>

                  </div>
                </div>
              </form>
            </div>
          }
        </div>
      </div>

      <div className="block p-6 rounded-lg bg-white w-full">
        <div className="grid grid-cols-3 gap-4">
          <div className="form-group mb-6">
            <p>Domestic Staff</p>
          </div>
          <div className="flex">
            <div className="form-check form-check-inline">
              <input onClick={servantsYes} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
              <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
            </div>

            <div className="form-check form-check-inline ml-5">
              <input onClick={servantsNo} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
              <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
            </div>
          </div>
        </div>

        <div className={`${servantsToggle} border rounded`}>
          {domestic == null || domestic == "" ?
            <div>
              <form onSubmit={handleStaffSubmit}>
                {domesticStaff.map((element, index) => (
                  <div className={`grid grid-cols-3 m-3 p-3 border-b-2 gap-4`}>
                    <div className="form-group mb-6">
                      <p>Title</p>
                      <select value={element.title || ""} onChange={e => handleDomesticStaffChange(index, e)} name="title" className="form-select w-full" >
                        <option value="Mrs">Mrs</option>
                        <option value="Mr">Mr</option>
                        <option value="Miss">Miss</option>
                      </select>
                    </div>

                    <div className="form-group mb-6">
                      <p>Name</p>
                      <input name="name" onChange={e => handleDomesticStaffChange(index, e)} value={element.name || ""} type="text" className="form-control w-full rounded"
                        placeholder="Full name" />
                    </div>

                    <div className="form-group mb-6">
                      <p>House Number</p>
                      <input name="house_no" onChange={e => handleDomesticStaffChange(index, e)} value={element.house_no || ""} type="text" className="form-control w-full rounded"
                        placeholder="House/plot no" />
                    </div>
                    <div className="form-group mb-6">
                      <p>Street</p>
                      <input onChange={e => handleDomesticStaffChange(index, e)} name="street" value={element.street || ""} type="text" className="form-control w-full rounded"
                        placeholder="Street" />
                    </div>
                    <div className="form-group mb-6">
                      <p>Town</p>
                      <input onChange={e => handleDomesticStaffChange(index, e)} type="text" name="town" value={element.town || ""} className="form-control w-full rounded"
                        placeholder="Town/Area" />
                    </div>
                    <div className="form-group mb-6">
                      <p>LGA</p>
                      <input onChange={e => handleDomesticStaffChange(index, e)} type="text" name="lga" value={element.lga || ""} className="form-control w-full rounded"
                        placeholder="LGA" />
                    </div>
                    <div className="form-group mb-6">
                      <p>State</p>
                      <select onChange={e => handleDomesticStaffChange(index, e)} value={element.state || ""} className="form-select w-full" name="state">
                        <option value="ABUJA FCT">ABUJA FCT</option>
                        <option value="ABIA">ABIA</option>
                        <option value="ADAMAWA">ADAMAWA</option>
                        <option value="AKWA IBOM">AKWA IBOM</option>
                        <option value="ANAMBRA">ANAMBRA</option>
                        <option value="BAUCHI">BAUCHI</option>
                        <option value="BAYELSA">BAYELSA</option>
                        <option value="BENUE">BENUE</option>
                        <option value="BORNO">BORNO</option>
                        <option value="CROSS RIVER">CROSS RIVER</option>
                        <option value="DELTA">DELTA</option>
                        <option value="EBONYI">EBONYI</option>
                        <option value="EDO">EDO</option>
                        <option value="EKITI">EKITI</option>
                        <option value="ENUGU">ENUGU</option>
                        <option value="GOMBE">GOMBE</option>
                        <option value="IMO">IMO</option>
                        <option value="JIGAWA">JIGAWA</option>
                        <option value="KADUNA">KADUNA</option>
                        <option value="KANO">KANO</option>
                        <option value="KATSINA">KATSINA</option>
                        <option value="KEBBI">KEBBI</option>
                        <option value="KOGI">KOGI</option>
                        <option value="KWARA">KWARA</option>
                        <option value="LAGOS">LAGOS</option>
                        <option value="NASSARAWA">NASSARAWA</option>
                        <option value="NIGER">NIGER</option>
                        <option value="OGUN">OGUN</option>
                        <option value="ONDO" >ONDO</option>
                        <option value="OSUN">OSUN</option>
                        <option value="OYO">OYO</option>
                        <option value="PLATEAU">PLATEAU</option>
                        <option value="RIVERS">RIVERS</option>
                        <option value="SOKOTO">SOKOTO</option>
                        <option value="TARABA">TARABA</option>
                        <option value="YOBE">YOBE</option>
                        <option value="ZAMFARA">ZAMFARA</option>
                      </select>
                    </div>
                    <div className="form-group mb-6">
                      <p>Annual Pay</p>
                      <input required onChange={e => handleDomesticStaffChange(index, e)} name="amount_paid" type="text" className="form-control w-full rounded"
                        placeholder="Amount paid (Annual)" />
                    </div>

                    <div className="form-group mb-6">
                      <p>Payer</p>
                      <select onChange={e => handleDomesticStaffChange(index, e)} value={element.payer || ""} name="payer" className="form-select w-full" >
                        <option>Paid by Employer</option>
                        <option>Paid by self</option>
                      </select>
                    </div>

                    <div></div>
                    <div className="justify-self-center">
                      {
                        index ? <button onClick={removeStaffFields}
                          // style={{ backgroundColor: "#84abeb" }}
                          className="btn bg-red-600 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                          type="button"
                        >
                          Remove
                        </button> : null
                      }

                    </div>
                    <div></div>
                  </div>
                ))}
                <div className="flex justify-between p-3">
                  <button onClick={addStaffFields}
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="button"
                  >
                    Add Staff
                  </button>
                  <button
                    // style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 bg-green-600 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>

                </div>
              </form>
            </div> :
            <div>
              <form onSubmit={submitDataDomestic}>
                {domestic.map((ind, i) => (
                  <div>
                    <div className={`grid grid-cols-3 m-3 p-3 border-b-2 gap-4`}>
                      <div className="form-group mb-6">
                        <p>Title</p>
                        <select onChange={(e) => changedDomestic(e, i, "title")} value={ind.title} name="title" className="form-select w-full" >
                          <option value="Mrs">Mrs</option>
                          <option value="Mr">Mr</option>
                          <option value="Miss">Miss</option>
                        </select>
                      </div>

                      <div className="form-group mb-6">
                        <p>Name</p>
                        <input name="name" type="text" className="form-control w-full rounded"
                          value={ind.name} onChange={(e) => changedDomestic(e, i, "name")} />
                      </div>

                      <div className="form-group mb-6">
                        <p>House Number</p>
                        <input name="house_no" type="text" className="form-control w-full rounded"
                          value={ind.house_no} onChange={(e) => changedDomestic(e, i, "house_no")} />
                      </div>
                      <div className="form-group mb-6">
                        <p>Street</p>
                        <input name="street" type="text" className="form-control w-full rounded"
                          value={ind.street} onChange={(e) => changedDomestic(e, i, "street")} />
                      </div>
                      <div className="form-group mb-6">
                        <p>Town</p>
                        <input type="text" name="town" className="form-control w-full rounded"
                          value={ind.town} onChange={(e) => changedDomestic(e, i, "town")} />
                      </div>
                      <div className="form-group mb-6">
                        <p>LGA</p>
                        <input type="text" name="lga" className="form-control w-full rounded"
                          value={ind.lga} onChange={(e) => changedDomestic(e, i, "lga")} />
                      </div>
                      <div className="form-group mb-6">
                        <p>State</p>
                        <select value={ind.state} onChange={(e) => changedDomestic(e, i, "state")} className="form-select w-full" name="state">
                          <option value="ABUJA FCT">ABUJA FCT</option>
                          <option value="ABIA">ABIA</option>
                          <option value="ADAMAWA">ADAMAWA</option>
                          <option value="AKWA IBOM">AKWA IBOM</option>
                          <option value="ANAMBRA">ANAMBRA</option>
                          <option value="BAUCHI">BAUCHI</option>
                          <option value="BAYELSA">BAYELSA</option>
                          <option value="BENUE">BENUE</option>
                          <option value="BORNO">BORNO</option>
                          <option value="CROSS RIVER">CROSS RIVER</option>
                          <option value="DELTA">DELTA</option>
                          <option value="EBONYI">EBONYI</option>
                          <option value="EDO">EDO</option>
                          <option value="EKITI">EKITI</option>
                          <option value="ENUGU">ENUGU</option>
                          <option value="GOMBE">GOMBE</option>
                          <option value="IMO">IMO</option>
                          <option value="JIGAWA">JIGAWA</option>
                          <option value="KADUNA">KADUNA</option>
                          <option value="KANO">KANO</option>
                          <option value="KATSINA">KATSINA</option>
                          <option value="KEBBI">KEBBI</option>
                          <option value="KOGI">KOGI</option>
                          <option value="KWARA">KWARA</option>
                          <option value="LAGOS">LAGOS</option>
                          <option value="NASSARAWA">NASSARAWA</option>
                          <option value="NIGER">NIGER</option>
                          <option value="OGUN">OGUN</option>
                          <option value="ONDO" >ONDO</option>
                          <option value="OSUN">OSUN</option>
                          <option value="OYO">OYO</option>
                          <option value="PLATEAU">PLATEAU</option>
                          <option value="RIVERS">RIVERS</option>
                          <option value="SOKOTO">SOKOTO</option>
                          <option value="TARABA">TARABA</option>
                          <option value="YOBE">YOBE</option>
                          <option value="ZAMFARA">ZAMFARA</option>
                        </select>
                      </div>
                      <div className="form-group mb-6">
                        <p>Annual Pay</p>
                        <input name="amount_paid" type="text" className="form-control w-full rounded"
                          value={ind.amount_paid} onChange={(e) => changedDomestic(e, i, "amount_paid")} />
                      </div>

                      <div className="form-group mb-6">
                        <p>Payer</p>
                        <select value={ind.payer} onChange={(e) => changedDomestic(e, i, "payer")} name="payer" className="form-select w-full" >
                          <option>Paid by Employer</option>
                          <option>Paid by self</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between p-3">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Update
                  </button>

                </div>
              </form>
            </div>
          }
        </div>
      </div>





      <div className="flex justify-between mb-5 ">
        <p>Employment</p>
        <div className="flex">
          <div className="form-check form-check-inline">
            <input onClick={onChange} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onClick={onChange2} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>
        </div>
      </div>



      <div className={`flex justify-center border mb-3 p-6 rounded-lg bg-white w-full ${toggleel}`}>
        <div >
          {employment == null || employment == "" ?
            <form onSubmit={handleSubmit(submitEmploymentInsert)}>
              <div>
                <div className="hidden">
                  <input ref={register()} defaultValue={assessment_id} required type="text" name="assessment_id" className="form-control w-full rounded" />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Employer Name:</label>
                  <input ref={register()} required type="text" name="emp_name" className="form-control w-full rounded" />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Employer Address:</label>
                  <input ref={register()} required type="text" name="emp_addr" className="form-control w-full rounded" />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Your start date:</label>
                  <input ref={register()} required type="date" name="start_date" className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Gross pay:</label>
                  <input ref={register()} required placeholder="₦" type="text" name="gross_pay" className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Tax deducted:</label>
                  <input ref={register()} placeholder="₦" type="text" name="tax_deducted" className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Upload Pay slip or schedule:</label>
                  <input type="file" name="pay_slip" className="w-full"
                  />
                </div>
                <div className='pb-5'>
                  <hr />
                </div>
              </div>

              <div className="mb-6 flex justify-around">
                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                >
                  Save
                </button>
                <button onClick={formTog1} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a >
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </form>
            :
            <form onSubmit={submitDataEmployment}>
              {employment.map((ind, i) => (
                <div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Employer Name:</label>
                    <input value={ind.emp_name} onChange={(e) => changedEmploy(e, i, "emp_name")} key={i} required type="text" name="emp_name" className="form-control w-full rounded" />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Employer Address:</label>
                    <input value={ind.emp_addr} onChange={(e) => changedEmploy(e, i, "emp_addr")} key={i} required type="text" name="emp_addr" className="form-control w-full rounded" />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Your start date:</label>
                    <input value={ind.start_date} onChange={(e) => changedEmploy(e, i, "start_date")} key={i} type="date" name="start_date" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Gross pay:</label>
                    <input required value={ind.gross_pay} onChange={(e) => changedEmploy(e, i, "gross_pay")} key={i} placeholder="₦" type="text" name="gross_pay" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Tax deducted:</label>
                    <input value={ind.tax_deducted} onChange={(e) => changedEmploy(e, i, "tax_deducted")} key={i} placeholder="₦" type="text" name="tax_deducted" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Upload Pay slip or schedule:</label>
                    <input type="file" onChange={(e) => changedEmploy(e, i, "pay_slip")} key={i} name="pay_slip" className="w-full"
                    />
                  </div>
                  <div className='pb-5'>
                    <hr />
                  </div>
                </div>
              ))}

              <div className="mb-6 flex justify-around">
                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                >
                  Update
                </button>
                <button onClick={formTog1} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a >
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </form>
          }
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-5">
          <p>self employed </p>

          <div className="flex">

            <div className="form-check form-check-inline">
              <input onClick={onChange3} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions2" id="inlineRadio1" value="option1" />
              <label required className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
            </div>

            <div className="form-check form-check-inline ml-5">
              <input required onClick={onChange4} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions2" id="inlineRadio2" value="option2" />
              <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
            </div>
          </div>
        </div>
      </div>

      <div className={`flex justify-center border mb-3 p-6 rounded-lg bg-white w-fulll ${togglee2}`}>
        <div>
          <div>
            {selfEmployment == null || selfEmployment == "" ?
              <div>
                <form onSubmit={submitDataselfEmp}>
                  <div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="typeofbusiness">Type of business:</label>
                      <select onChange={handleSelfEmployedChange} className="form-select" name="business_type" value={selfEmployedIns.business_type} >
                        <option value="select">Select Business </option>
                        <option value="Agro Allied Products">Agro Allied Products</option>
                        <option value="Aircondition Repairer">Aircondition Repairer</option>
                        <option value="Aluminum Doors & Windows">Aluminum Doors & Windows</option>
                        <option value="Animal Feed Maker">Animal Feed Maker</option>
                        <option value="Architechtural Design">Architechtural Design</option>
                        <option value="Architect">Architect</option>
                        <option value="Artist And Song-Writer">Artist And Song-Writer</option>
                        <option value="Baby Wear">Baby Wear</option>
                        <option value="Boutique">Boutique</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Building Material">Building Material Dealer</option>
                        <option value="Cosmetics">Cosmetics</option>
                        <option value="Curtain & Interior Decoration">Curtain & Interior Decoration</option>
                        <option value="Cyber Cafe Operator">Cyber Cafe Operator</option>
                        <option value="Dealers In Mattress/Foams">Dealers In Mattress/Foams</option>
                        <option value="Djs Entertainment">Djs Entertainment</option>
                        <option value="Doors Seller">Doors Seller</option>
                        <option value="Drama Group">Drama Group</option>
                        <option value="Electrical Parts & Fitting">Electrical Parts & Fitting</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Electronics Dealer">Electronics Dealer</option>
                        <option value="Engine Oil/ Kerosene Seller">Engine Oil/ Kerosene Seller</option>
                        <option value="Estate Managers/ Agent">Estate Managers/ Agent</option>
                        <option value="Event Centre">Event Centre</option>
                        <option value="Event Planner">Event Planner</option>
                        <option value="Fashion Designer">Fashion Designer</option>
                        <option value="Films & Cinemas Center">Films & Cinemas Center</option>
                        <option value="Fish Seller">Fish Seller</option>
                        <option value="Fowl Seller">Fowl Seller</option>
                        <option value="Foam"> foam/Matras</option>
                        <option value="Fruit Seller">Fruit Seller</option>
                        <option value="Furnishing Materials Seller">Furnishing Materials Seller</option>
                        <option value="Furniture / Furnishing Materials Seller">Furniture / Furnishing Materials Seller</option>
                        <option value="Furniture Maker">Furniture Maker</option>
                        <option value="Gas Refilling Seller">Gas Refilling Seller</option>
                        <option value="Generator Mechanic">Generator Mechanic</option>
                        <option value="Gift Shop">Gift Shop</option>
                        <option value="Graphic Arts & Design">Graphic Arts & Design</option>
                        <option value="Grinding Mill">Grinding Mill</option>
                        <option value="Guest House">Guest House</option>
                        <option value="Hairdressers And Barber">Hairdressers And Barber</option>
                        <option value="Higher Institutions Private">Higher Institutions Private</option>
                        <option value="Horticulture / Florist">Horticulture / Florist</option>
                        <option value="Hotel Proprietor">Hotel Proprietor</option>
                        <option value="Ict/ Computer Accessories">Ict/ Computer Accessories</option>
                        <option value="Interior Decorator">Interior Decorator</option>
                        <option value="Iron Bender">Iron Bender</option>
                        <option value="Jewelry Seller">Jewelry Seller</option>
                        <option value="Kerorine Retail Seller">Kerorine Retail Seller</option>
                        <option value="Kiddies Shop And Botique">Kiddies Shop And Botique</option>
                        <option value="Laundry (Dry Cleaner)">Laundry (Dry Cleaner)</option>
                        <option value="Law Firm3">Law Firm</option>
                        <option value="Leather Carpets (Linoleum)">Leather Carpets (Linoleum)</option>
                        <option value="Liquor|Beer Palour">Liquor|Beer Palour</option>
                        <option value="Mai Shai (Tea Maker)">Mai Shai (Tea Maker)</option>
                        <option value="Mason">Mason</option>
                        <option value="Maternity Home">Maternity Home</option>
                        <option value="Maternity Private Proprietor">Maternity Private Proprietor</option>
                        <option value="Meat Seller">Meat Seller</option>
                        <option value="Medical Laboratory">Medical Laboratory</option>
                        <option value="Mini Supermarket|Supermarket">Mini Supermarket|Supermarket</option>
                        <option value="Mobile Phone Dealer">Mobile Phone Dealer</option>
                        <option value="Mobile Phone Repairer">Mobile Phone Repairer</option>
                        <option value="Mobile Phone Seller">Mobile Phone Seller</option>
                        <option value="Money Lender">Money Lender</option>
                        <option value="Motor Cycle Dealer">Motor Cycle Dealer</option>
                        <option value="Motor Cycle Mechanic">Motor Cycle Mechanic</option>
                        <option value="Motor Cycle Spare Part Dealer">Motor Cycle Spare Part Dealer</option>
                        <option value="Motor Dealer/Seller">Motor Dealer/Seller</option>
                        <option value="Motor Spare Part Dealer">Motor Spare Part Dealer</option>
                        <option value="Motor Vehicle Mechanic">Motor Vehicle Mechanic</option>
                        <option value="Musician">Musician</option>
                        <option value="Newspaper/Magazine Vendor">Newspaper/Magazine Vendor</option>
                        <option value="Optician">Optician</option>
                        <option value="Other Businesses And Trade">Other Businesses And Trade</option>
                        <option value="Painter And Decorator">Painter And Decorator</option>
                        <option value="Paints Dealer">Paints Dealer</option>
                        <option value="Palm Oil Miller">Palm Oil Miller</option>
                        <option value="Panel Beaters & Sprayer">Panel Beaters & Sprayer</option>
                        <option value="Patent/Propriety Medicine Vendor">Patent/Propriety Medicine Vendor</option>
                        <option value="Petrol Filling Station">Petrol Filling Station</option>
                        <option value="Pharmaceutical Shop">Pharmaceutical Shop</option>
                        <option value="Phone Accessories"> Phone Accessories</option>
                        <option value="Photo Color Laboratorie">Photo Color Laboratorie</option>
                        <option value="Photographers / Photo Developer">Photographers / Photo Developer</option>
                        <option value="Photographic Materials Shop">Photographic Materials Shop</option>
                        <option value="Plastic Dealer">Plastic Dealer</option>
                        <option value="Plastic/Rubber Seller">Plastic/Rubber Seller</option>
                        <option value="Plumber">Plumber</option>
                        <option value="Plumbing Material With Water Tanks & Access.">Plumbing Material With Water Tanks & Access.</option>
                        <option value="Plumbing Materials Only">Plumbing Materials Only</option>
                        <option value="Pool Agent">Pool Agent</option>
                        <option value="Pool Promoter">Pool Promoter</option>
                        <option value="Pos Operator (Mobile Money)">Pos Operator (Mobile Money)</option>
                        <option value="Potter">Potter</option>
                        <option value="Poultry Farmer">Poultry Farmer</option>
                        <option value="Poultry Feed">Poultry Feed</option>
                        <option value="Printer">Printer</option>
                        <option value="Private Medical Practioner">Private Medical Practioner</option>
                        <option value="Private N/P School">Private N/P School</option>
                        <option value="Private Secondary School">Private Secondary School</option>
                        <option value="Produce Buyer">Produce Buyer</option>
                        <option value="Provision Store">Provision Store</option>
                        <option value="Pure/Bottle Water Producer">Pure/Bottle Water Producer</option>
                        <option value="Pure/Bottle Water Seller">Pure/Bottle Water Seller</option>
                        <option value="Raw Food Seller">Raw Food Seller</option>
                        <option value="Recharge Card Dealer">Recharge Card Dealer</option>
                        <option value="Rental">Rental</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Restaurant (Buka)">Restaurant (Buka)</option>
                        <option value="Re-Wire & Battery Charger opt">Re-Wire & Battery Charger opt</option>
                        <option value="Road Side Petty Trader">Road Side Petty Trader</option>
                        <option value="Rugs & Carpet">Rugs & Carpet</option>
                        <option value="Sack Bags Seller">Sack Bags Seller</option>
                        <option value="Saw Mill">Saw Mill</option>
                        <option value="School Proprietor">School Proprietor</option>
                        <option value="Shoe Maker">Shoe Maker</option>
                        <option value="Shoe Seller">Shoe Seller</option>
                        <option value="Shops/Stall">Shops/Stall</option>
                        <option value="Solar Panel">Solar Panel</option>
                        <option value="Stylist">Stylist</option>
                        <option value="Super Market">Super Market</option>
                        <option value="Tailors/Fashion Designer">Tailors/Fashion Designer</option>
                        <option value="Thrift Collector">Thrift Collector</option>
                        <option value="Tiler">Tiler</option>
                        <option value="Timber Wood Seller">Timber Wood Seller</option>
                        <option value="Tomatoes Seller">Tomatoes Seller</option>
                        <option value="Tuber Dealer">Tuber Dealer</option>
                        <option value="Tyre Dealer">Tyre Dealer</option>
                        <option value="Video Club">Video Club</option>
                        <option value="Viewing Centre">Viewing Centre</option>
                        <option value="Vulcanizer">Vulcanizer</option>
                        <option value="Weaver">Weaver</option>
                        <option value="Weaver">Welder</option>
                        <option value="Wheel Barrow Quiosk">Wheel Barrow Quiosk</option>
                        <option value="Wine And Beer License Operator">Wine And Beer License Operator</option>
                        <option value="Yam Seller">Yam Seller</option>
                        <option value="Yoghurt Seller">Yoghurt Seller</option>
                      </select>
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="businessname">Business Name:</label>
                      <input onChange={handleSelfEmployedChange} name="business_name" value={selfEmployedIns.business_name} type="text" id="businessname" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="businessaddress">Business Address:</label>
                      <input onChange={handleSelfEmployedChange} name="business_addr" value={selfEmployedIns.business_addr} type="text" id="businessaddress" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="employername">Business Start date:</label>
                      <input required onChange={handleSelfEmployedChange} name="business_start_date" value={selfEmployedIns.business_start_date} type="date" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="turnover">Turnover-takings, fees, sales or money earned by your business:</label>
                      <input required onChange={handleSelfEmployedChange} placeholder="₦" name="income_earned" value={selfEmployedIns.income_earned} type="text" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="turnover">Any other business income not included above:</label>
                      <input placeholder="₦" onChange={handleSelfEmployedChange} name="other_income" value={selfEmployedIns.other_income} type="text" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="cashbases">Do you use cash basis, money actually received and paid out, to calculate your income expense ?</label>
                      <div className="flex">
                        <div className="form-check form-check-inline">
                          <select required name="cash_inc_expense" onChange={handleSelfEmployedChange} value={selfEmployedIns.cash_inc_expense} id="" className="w-64">
                            <option value="yes">Yes </option>
                            <option value="no">No</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label className="font-bold">Total Business Income:</label>
                      <p className="font-bold">NGN {totalBusIncIns}</p>
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="expenses">Are figures provided provisional or estimated?</label>

                      <div className="flex">
                        <div className="form-check form-check-inline">
                          <select name="figures_estimated" onChange={handleSelfEmployedChange} value={selfEmployedIns.figures_estimated} className="w-64">
                            <option value="estimated">Estimated</option>
                            <option value="provisional">Provisional</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className='pb-5'>
                      <hr />
                    </div>
                  </div>

                  <div className="mb-6 flex justify-between">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Save
                    </button>

                    <button onClick={formTog2} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                      <a >
                        <FiTriangle
                          size={15}
                          className="stroke-current text-green-500"
                        />
                      </a>
                    </button>
                  </div>
                </form>
              </div> :

              <form onSubmit={submitDataSelfEmployment}>
                <div>
                  {selfEmployment.map((ind, i) => (
                    <div>
                      <div className="mb-6 grid grid-cols-3 gap-4">
                        <label htmlFor="typeofbusiness">Type of business:</label>
                        <select onChange={(e) => changedSelfEmployed(e, i, "business_type")} key={i} value={ind.business_type} className="form-select" name="business_type" >
                          <option value="select">Select Business </option>
                          <option value="Agro Allied Products">Agro Allied Products</option>
                          <option value="Aircondition Repairer">Aircondition Repairer</option>
                          <option value="Aluminum Doors & Windows">Aluminum Doors & Windows</option>
                          <option value="Animal Feed Maker">Animal Feed Maker</option>
                          <option value="Architechtural Design">Architechtural Design</option>
                          <option value="Architect">Architect</option>
                          <option value="Artist And Song-Writer">Artist And Song-Writer</option>
                          <option value="Baby Wear">Baby Wear</option>
                          <option value="Curtain & Interior Decoration">Curtain & Interior Decoration</option>
                          <option value="Cyber Cafe Operator">Cyber Cafe Operator</option>
                          <option value="Dealers In Mattress/Foams">Dealers In Mattress/Foams</option>
                          <option value="Djs Entertainment">Djs Entertainment</option>
                          <option value="Doors Seller">Doors Seller</option>
                          <option value="Drama Group">Drama Group</option>
                          <option value="Electrical Parts & Fitting">Electrical Parts & Fitting</option>
                          <option value="Electrician">Electrician</option>
                          <option value="Electronics Dealer">Electronics Dealer</option>
                          <option value="Engine Oil/ Kerosene Seller">Engine Oil/ Kerosene Seller</option>
                          <option value="Estate Managers/ Agent">Estate Managers/ Agent</option>
                          <option value="Event Centre">Event Centre</option>
                          <option value="Event Planner">Event Planner</option>
                          <option value="Fashion Designer">Fashion Designer</option>
                          <option value="Films & Cinemas Center">Films & Cinemas Center</option>
                          <option value="Fish Seller">Fish Seller</option>
                          <option value="Fowl Seller">Fowl Seller</option>
                          <option value="Fruit Seller">Fruit Seller</option>
                          <option value="Furnishing Materials Seller">Furnishing Materials Seller</option>
                          <option value="Furniture / Furnishing Materials Seller">Furniture / Furnishing Materials Seller</option>
                          <option value="Furniture Maker">Furniture Maker</option>
                          <option value="Gas Refilling Seller">Gas Refilling Seller</option>
                          <option value="Generator Mechanic">Generator Mechanic</option>
                          <option value="Gift Shop">Gift Shop</option>
                          <option value="Graphic Arts & Design">Graphic Arts & Design</option>
                          <option value="Grinding Mill">Grinding Mill</option>
                          <option value="Guest House">Guest House</option>
                          <option value="Hairdressers And Barber">Hairdressers And Barber</option>
                          <option value="Higher Institutions Private">Higher Institutions Private</option>
                          <option value="Horticulture / Florist">Horticulture / Florist</option>
                          <option value="Hotel Proprietor">Hotel Proprietor</option>
                          <option value="Ict/ Computer Accessories">Ict/ Computer Accessories</option>
                          <option value="Interior Decorator">Interior Decorator</option>
                          <option value="Iron Bender">Iron Bender</option>
                          <option value="Jewelry Seller">Jewelry Seller</option>
                          <option value="Kerorine Retail Seller">Kerorine Retail Seller</option>
                          <option value="Kiddies Shop And Botique">Kiddies Shop And Botique</option>
                          <option value="Laundry (Dry Cleaner)">Laundry (Dry Cleaner)</option>
                          <option value="Law Firm3">Law Firm</option>
                          <option value="Leather Carpets (Linoleum)">Leather Carpets (Linoleum)</option>
                          <option value="Liquor|Beer Palour">Liquor|Beer Palour</option>
                          <option value="Mai Shai (Tea Maker)">Mai Shai (Tea Maker)</option>
                          <option value="Mason">Mason</option>
                          <option value="Maternity Home">Maternity Home</option>
                          <option value="Maternity Private Proprietor">Maternity Private Proprietor</option>
                          <option value="Meat Seller">Meat Seller</option>
                          <option value="Medical Laboratory">Medical Laboratory</option>
                          <option value="Mini Supermarket|Supermarket">Mini Supermarket|Supermarket</option>
                          <option value="Mobile Phone Dealer">Mobile Phone Dealer</option>
                          <option value="Mobile Phone Repairer">Mobile Phone Repairer</option>
                          <option value="Mobile Phone Seller">Mobile Phone Seller</option>
                          <option value="Money Lender">Money Lender</option>
                          <option value="Motor Cycle Dealer">Motor Cycle Dealer</option>
                          <option value="Motor Cycle Mechanic">Motor Cycle Mechanic</option>
                          <option value="Motor Cycle Spare Part Dealer">Motor Cycle Spare Part Dealer</option>
                          <option value="Motor Dealer/Seller">Motor Dealer/Seller</option>
                          <option value="Motor Spare Part Dealer">Motor Spare Part Dealer</option>
                          <option value="Motor Vehicle Mechanic">Motor Vehicle Mechanic</option>
                          <option value="Musician">Musician</option>
                          <option value="Newspaper/Magazine Vendor">Newspaper/Magazine Vendor</option>
                          <option value="Optician">Optician</option>
                          <option value="Other Businesses And Trade">Other Businesses And Trade</option>
                          <option value="Painter And Decorator">Painter And Decorator</option>
                          <option value="Paints Dealer">Paints Dealer</option>
                          <option value="Palm Oil Miller">Palm Oil Miller</option>
                          <option value="Panel Beaters & Sprayer">Panel Beaters & Sprayer</option>
                          <option value="Patent/Propriety Medicine Vendor">Patent/Propriety Medicine Vendor</option>
                          <option value="Petrol Filling Station">Petrol Filling Station</option>
                          <option value="Pharmaceutical Shop">Pharmaceutical Shop</option>
                          <option value="Phone Accessories"> Phone Accessories</option>
                          <option value="Photo Color Laboratorie">Photo Color Laboratorie</option>
                          <option value="Photographers / Photo Developer">Photographers / Photo Developer</option>
                          <option value="Photographic Materials Shop">Photographic Materials Shop</option>
                          <option value="Plastic Dealer">Plastic Dealer</option>
                          <option value="Plastic/Rubber Seller">Plastic/Rubber Seller</option>
                          <option value="Plumber">Plumber</option>
                          <option value="Plumbing Material With Water Tanks & Access.">Plumbing Material With Water Tanks & Access.</option>
                          <option value="Plumbing Materials Only">Plumbing Materials Only</option>
                          <option value="Pool Agent">Pool Agent</option>
                          <option value="Pool Promoter">Pool Promoter</option>
                          <option value="Pos Operator (Mobile Money)">Pos Operator (Mobile Money)</option>
                          <option value="Potter">Potter</option>
                          <option value="Poultry Farmer">Poultry Farmer</option>
                          <option value="Poultry Feed">Poultry Feed</option>
                          <option value="Printer">Printer</option>
                          <option value="Private Medical Practioner">Private Medical Practioner</option>
                          <option value="Private N/P School">Private N/P School</option>
                          <option value="Private Secondary School">Private Secondary School</option>
                          <option value="Produce Buyer">Produce Buyer</option>
                          <option value="Provision Store">Provision Store</option>
                          <option value="Pure/Bottle Water Producer">Pure/Bottle Water Producer</option>
                          <option value="Pure/Bottle Water Seller">Pure/Bottle Water Seller</option>
                          <option value="Raw Food Seller">Raw Food Seller</option>
                          <option value="Recharge Card Dealer">Recharge Card Dealer</option>
                          <option value="Rental">Rental</option>
                          <option value="Restaurant">Restaurant</option>
                          <option value="Restaurant (Buka)">Restaurant (Buka)</option>
                          <option value="Re-Wire & Battery Charger opt">Re-Wire & Battery Charger opt</option>
                          <option value="Road Side Petty Trader">Road Side Petty Trader</option>
                          <option value="Rugs & Carpet">Rugs & Carpet</option>
                          <option value="Sack Bags Seller">Sack Bags Seller</option>
                          <option value="Saw Mill">Saw Mill</option>
                          <option value="School Proprietor">School Proprietor</option>
                          <option value="Shoe Maker">Shoe Maker</option>
                          <option value="Shoe Seller">Shoe Seller</option>
                          <option value="Shops/Stall">Shops/Stall</option>
                          <option value="Solar Panel">Solar Panel</option>
                          <option value="Stylist">Stylist</option>
                          <option value="Super Market">Super Market</option>
                          <option value="Tailors/Fashion Designer">Tailors/Fashion Designer</option>
                          <option value="Thrift Collector">Thrift Collector</option>
                          <option value="Tiler">Tiler</option>
                          <option value="Timber Wood Seller">Timber Wood Seller</option>
                          <option value="Tomatoes Seller">Tomatoes Seller</option>
                          <option value="Tuber Dealer">Tuber Dealer</option>
                          <option value="Tyre Dealer">Tyre Dealer</option>
                          <option value="Video Club">Video Club</option>
                          <option value="Viewing Centre">Viewing Centre</option>
                          <option value="Vulcanizer">Vulcanizer</option>
                          <option value="Weaver">Weaver</option>
                          <option value="Weaver">Welder</option>
                          <option value="Wheel Barrow Quiosk">Wheel Barrow Quiosk</option>
                          <option value="Wine And Beer License Operator">Wine And Beer License Operator</option>
                          <option value="Yam Seller">Yam Seller</option>
                          <option value="Yoghurt Seller">Yoghurt Seller</option>
                        </select>
                      </div>

                      <div className="mb-6 grid grid-cols-3 gap-4">
                        <label >Business Name:</label>
                        <input onChange={(e) => changedSelfEmployed(e, i, "business_name")} key={i} value={ind.business_name} name="business_name" type="text" className="form-control w-full rounded"
                        />
                      </div>

                      <div className="mb-6 grid grid-cols-3 gap-4">
                        <label>Business Address:</label>
                        <input value={ind.business_addr} onChange={(e) => changedSelfEmployed(e, i, "business_addr")} key={i} name="business_addr" type="text" id="businessaddress" className="form-control w-full rounded"
                        />
                      </div>

                      <div className="mb-6 grid grid-cols-3 gap-4">
                        <label>Business Start date:</label>
                        <input value={ind.business_start_date} onChange={(e) => changedSelfEmployed(e, i, "business_start_date")} name="business_start_date" type="date" className="form-control w-full rounded"
                        />
                      </div>

                      <div className="mb-6 grid grid-cols-3 gap-4">
                        <label htmlFor="turnover">Turnover-takings, fees, sales or money earned by your business:</label>
                        <input value={ind.income_earned} onChange={(e) => changedSelfEmployed(e, i, "income_earned")} required placeholder="₦" name="income_earned" type="text" className="form-control w-full rounded"
                        />
                      </div>

                      <div className="mb-6 grid grid-cols-3 gap-4">
                        <label htmlFor="turnover">Any other business income not included above:</label>
                        <input value={ind.other_income} onChange={(e) => changedSelfEmployed(e, i, "other_income")} placeholder="₦" name="other_income" type="text" className="form-control w-full rounded"
                        />
                      </div>

                      <div className="mb-6 grid grid-cols-3 gap-4">
                        <label>Do you use cash basis, money actually received and paid out, to calculate your income expense ?</label>
                        <div className="flex">
                          <div className="form-check form-check-inline">
                            <select name="cash_inc_expense" onChange={(e) => changedSelfEmployed(e, i, "cash_inc_expense")} value={ind.cash_inc_expense} className="w-64">
                              <option value="no">No</option>
                              <option value="yes">Yes</option>
                            </select>

                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="mb-6 grid grid-cols-3 gap-4">
                          <label htmlFor="expenses">How would you like to record your expenses?</label>
                          <div className="flex">
                            <div className="form-check form-check-inline">
                              <select name="expense" onChange={(e) => changedSelfEmployed(e, i, "expense")} value={ind.expense} className="w-64">
                                <option value="break down">Break Down</option>
                                <option value="total">Total</option>
                              </select>

                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-6 grid grid-cols-3 gap-4">
                        <label htmlFor="expenses">Are figures provided provisional or estimated?</label>
                        <div className="flex">
                          <div className="form-check form-check-inline">
                            <select name="figures_estimated" onChange={(e) => changedSelfEmployed(e, i, "figures_estimated")} value={ind.figures_estimated} className="w-64">
                              <option value="estimated">Estimated</option>
                              <option value="provisional">Provisional</option>
                            </select>

                          </div>
                        </div>
                      </div>
                      <div className='pb-5'>
                        <hr />
                      </div>
                    </div>
                  ))}
                  <div className="mb-6 flex justify-between">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Update
                    </button>

                    <button onClick={formTog2} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                      <a >
                        <FiTriangle
                          size={15}
                          className="stroke-current text-green-500"
                        />
                      </a>
                    </button>
                  </div>
                </div>
              </form>
            }

          </div>

          <div>
            {expenses == null || expenses == "" ?
              <form onSubmit={submitDataExpense}>
                <p className="font-bold">Expenses</p>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <input required onChange={handleExpenseChange} name="item" value={expensesData.item} type="text" className="form-control w-full rounded"
                    placeholder="Item"
                  />
                  <input required onChange={handleExpenseChange} name="amount" value={expensesData.amount} type="text" className="form-control w-full rounded"
                    placeholder="Amount"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label className="font-bold">Net Profit/ Loss:</label>
                  <p className="font-bold"> NGN {netProfitIns}</p>
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save Expenses
                  </button>

                </div>
              </form> :
              <form onSubmit={submitDataExpenses}>
                <div>
                  {expenses.map((ind, i) => (
                    <div>
                      <p className="font-bold">Expenses</p>
                      <div className="mb-6 grid grid-cols-3 gap-4">
                        <input required name="item" key={i} type="text" className="form-control w-full rounded"
                          value={ind.item} placeholder="Item" onChange={(e) => changedExpenses(e, i, "item")}
                        />
                        <input required name="amount" type="text" className="form-control w-full rounded"
                          value={ind.amount} placeholder="Value" key={i} onChange={(e) => changedExpenses(e, i, "amount")}
                        />
                      </div>
                    </div>

                  ))}
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Update Expenses
                    </button>
                  </div>
                </div>
              </form>
            }
          </div>

        </div>
      </div>
      <div className="flex justify-between mb-5">
        <p>Life Assurance </p>
        <div className="flex">

          <div className="form-check form-check-inline flex ustify-evenly">
            <input onChange={onChange21} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions11" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onChange={onChange22} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions11" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>
        </div>
      </div>


      <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee11}`}>

        <div>
          {lifeass == null || lifeass == "" ?
            <form onSubmit={submitDataLifIns}>
              <div className="">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Insurance Company:</label>
                  <input onChange={handleLifeInsChange} name="company" value={lifeInsData.company} type="text" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Address:</label>
                  <input onChange={handleLifeInsChange} name="addr" value={lifeInsData.addr} type="text" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">RSA No:</label>
                  <input onChange={handleLifeInsChange} name="rsa_no" value={lifeInsData.rsa_no} type="text" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Amount:</label>
                  <input required onChange={handleLifeInsChange} placeholder="₦" name="amount" value={lifeInsData.amount} type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="comments">Optional Comments:</label>
                  <textarea onChange={handleLifeInsChange} name="comments" value={lifeInsData.comments} cols="40" rows="2" className="rounded"></textarea>
                </div>
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                  <button onClick={formTog11} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a >
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>

              </div>
            </form> :
            <form onSubmit={submitDataLap}>
              <div>
                {lifeass.map((ind, i) => (

                  <div div className="">
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="employername">Insurance Company:</label>
                      <input value={ind.company} key={i} onChange={(e) => changedLap(e, i, "company")} name="company" type="text" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="employername">Address:</label>
                      <input value={ind.addr} key={i} onChange={(e) => changedLap(e, i, "addr")} name="addr" type="text" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="employername">RSA No:</label>
                      <input value={ind.rsa_no} onChange={(e) => changedLap(e, i, "rsa_no")} name="rsa_no" type="text" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="employername">Amount:</label>
                      <input value={ind.amount} onChange={(e) => changedLap(e, i, "amount")} required placeholder="₦" name="amount" type="text" id="employername" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="comments">Optional Comments:</label>
                      <textarea value={ind.comments} onChange={(e) => changedLap(e, i, "comments")} name="comments" cols="40" rows="2" className="rounded"></textarea>
                    </div>
                  </div>
                ))}
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Update Lap
                  </button>
                  <button onClick={formTog11} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a >
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>
            </form>
          }
        </div>
      </div >


      <div className="flex justify-between mb-5">
        <p>Pension deduction </p>
        <div className="flex">

          <div className="form-check form-check-inline flex ustify-evenly">
            <input onClick={onChange19} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions10" id="inlineRadio1" value="option1" />
            <label onClick="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onChange={onChange20} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions10" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>
        </div>
      </div>

      <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee10}`}>
        <div>
          {pensDeduct == null || pensDeduct == "" ?
            <form onSubmit={submitDataPenDeduct}>
              <div className="">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">PFA:</label>
                  <input onChange={handlePenDeductChange} name="pfa" value={pensionDeduct.pfa} type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">PFA Address:</label>
                  <input onChange={handlePenDeductChange} name="pfa_addr" value={pensionDeduct.pfa_addr} type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">RSA No:</label>
                  <input onChange={handlePenDeductChange} name="rsa_no" value={pensionDeduct.rsa_no} type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Amount:</label>
                  <input required onChange={handlePenDeductChange} placeholder="₦" name="amount" value={pensionDeduct.amount} type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="comments">Optional Comments:</label>
                  <textarea onChange={handlePenDeductChange} name="comments" value={pensionDeduct.comments} id="comments" cols="40" rows="2" className="rounded"></textarea>
                </div>
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                  <button onClick={formTog10} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a >
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>
            </form> :
            <form onSubmit={submitDataPensDed}>
              <div className="">
                {pensDeduct.map((ind, i) => (
                  <div className="border-b-2 mb-3">
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="employername">PFA:</label>
                      <input value={ind.pfa} name="pfa" type="text" onChange={(e) => changedPensDed(e, i, "pfa")} key={i} className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="employername">PFA Address:</label>
                      <input value={ind.pfa_addr} name="pfa_addr" type="text" onChange={(e) => changedPensDed(e, i, "pfa_addr")} key={i} className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="employername">RSA No:</label>
                      <input value={ind.rsa_no} name="rsa_no" type="text" onChange={(e) => changedPensDed(e, i, "rsa_no")} key={i} className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="employername">Amount:</label>
                      <input value={ind.amount} required placeholder="₦" name="amount" type="text" onChange={(e) => changedPensDed(e, i, "amount")} key={i} className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="comments">Optional Comments:</label>
                      <textarea value={ind.comments} name="comments" onChange={(e) => changedPensDed(e, i, "comments")} key={i} cols="40" rows="2" className="rounded"></textarea>
                    </div>

                  </div>
                ))}

                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Update
                  </button>
                  <button onClick={formTog10} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a >
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>
            </form>
          }
        </div>
      </div >

      <div className="flex justify-between mb-5">
        <p>NHIS</p>
        <div className="flex">

          <div className="form-check form-check-inline flex ustify-evenly">
            <input onClick={onChange23} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions12" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onClick={onChange24} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions12" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>
        </div>
      </div>



      <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee12}`}>

        <div>
          {nhis == null || nhis == "" ?
            <form onSubmit={submitDataNhisIns}>

              <div className="">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Company:</label>
                  <input onChange={handleNHISChange} name="company" value={nhisData.company} type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Address:</label>
                  <input onChange={handleNHISChange} name="addr" value={nhisData.addr} type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Insurance No:</label>
                  <input onChange={handleNHISChange} required name="insurance_no" value={nhisData.insurance_no} type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Amount:</label>
                  <input onChange={handleNHISChange} required name="amount" value={nhisData.amount} type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="comments">Optional Comments:</label>
                  <textarea onChange={handleNHISChange} name="comments" value={nhisData.comments} cols="40" rows="2" className="rounded"></textarea>
                </div>
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                  <button onClick={formTog12} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a >
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>
            </form> :
            <form onSubmit={submitDataNhis}>
              <div className="">
                {nhis.map((ind, i) => (
                  <div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Company:</label>
                      <input value={ind.company} onChange={(e) => changedNhis(e, i, "company")} name="company" type="text" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Address:</label>
                      <input value={ind.addr} onChange={(e) => changedNhis(e, i, "addr")} name="addr" type="text" id="employername" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Insurance No:</label>
                      <input value={ind.insurance_no} onChange={(e) => changedNhis(e, i, "insurance_no")} required name="insurance_no" type="text" id="employername" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Amount:</label>
                      <input value={ind.amount} onChange={(e) => changedNhis(e, i, "amount")} required name="amount" type="text" id="employername" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Optional Comments:</label>
                      <textarea value={ind.comments} onChange={(e) => changedNhis(e, i, "comments")} name="comments" cols="40" rows="2" className="rounded"></textarea>
                    </div>

                  </div>
                ))}
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"

                  >
                    Update
                  </button>
                  <button onClick={formTog12} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a >
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>
            </form>
          }
        </div>
      </div>

      <div className="flex justify-between mb-5">

        <p>Partnership</p>


        <div className="flex">

          <div className="form-check form-check-inline">
            <input onClick={onChange5} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions3" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onClick={onChange6} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions3" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>

        </div>
      </div>

      <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee3}`}>
        <div>
          {partner == null || partner == "" ?
            <form onSubmit={submitDataPartnerIns}>
              <div className="">
                <p className="font-bold flex justify-center mb-4"></p>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label >Partner Name:</label>
                  <input required onChange={handlePartnershipChange} name="name" value={partnerData.name} type="text" className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Partner Address:</label>
                  <input onChange={handlePartnershipChange} name="addr" value={partnerData.addr} type="text" className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Partner Phone:</label>
                  <input onChange={handlePartnershipChange} name="phone" type="text" value={partnerData.phone} className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Partner Percentage:</label>
                  <input onChange={handlePartnershipChange} name="percentage" value={partnerData.percentage} type="text" className="form-control w-full rounded"
                  />
                </div>
                <div className='pb-5'>
                  <hr />
                </div>
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label htmlFor="comments">Optional Comments:</label>
                <textarea onChange={handlePartnershipChange} name="comments" value={partnerData.comments} cols="40" rows="2" className="rounded"></textarea>
              </div>
              <div className="mb-6 flex justify-between">
                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                >
                  Save
                </button>
                <button onClick={formTog3} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a >
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </form> :
            <form onSubmit={submitDataPartner}>
              <div>
                {partner.map((ind, i) => (
                  <div>
                    <div className="">
                      <p className="font-bold flex justify-center mb-4"></p>
                      <div className="mb-6 grid grid-cols-3 gap-4">
                        <label >Partner Name:</label>
                        <input value={ind.name} onChange={(e) => changedPartner(e, i, "name")} required name="name" type="text" className="form-control w-full rounded"
                        />
                      </div>
                      <div className="mb-6 grid grid-cols-3 gap-4">
                        <label>Partner Address:</label>
                        <input value={ind.addr} onChange={(e) => changedPartner(e, i, "addr")} name="addr" type="text" className="form-control w-full rounded"
                        />
                      </div>
                      <div className="mb-6 grid grid-cols-3 gap-4">
                        <label htmlFor="employername">Partner Phone:</label>
                        <input value={ind.phone} onChange={(e) => changedPartner(e, i, "phone")} name="phone" type="text" className="form-control w-full rounded"
                        />
                      </div>
                      <div className="mb-6 grid grid-cols-3 gap-4">
                        <label htmlFor="employername">Partner Percentage:</label>
                        <input value={ind.percentage} onChange={(e) => changedPartner(e, i, "percentage")} name="percentage" type="text" className="form-control w-full rounded"
                        />
                      </div>
                      <div className="mb-6 grid grid-cols-3 gap-4">
                        <label htmlFor="comments">Optional Comments:</label>
                        <textarea value={ind.comments} onChange={(e) => changedPartner(e, i, "comments")} name="comments" cols="40" rows="2" className="rounded"></textarea>
                      </div>
                      <div className='pb-5'>
                        <hr />
                      </div>
                    </div>

                  </div>
                ))}
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Update
                  </button>
                  <button onClick={formTog3} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a>
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>
            </form>

          }
        </div>
      </div>

      <div className="flex justify-between mb-5">

        <p>Rent Income </p>

        <div className="flex">

          <div className="form-check form-check-inline">
            <input onClick={onChange7} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions4" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onClick={onChange8} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions4" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>

        </div>

      </div>

      <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee4}`}>

        <div>
          {rentIncome == null || rentIncome == "" ?
            <form onSubmit={submitDataRentInc}>
              <div className="">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Property Type:</label>
                  <select onChange={handleRentIncomeChange} name="prop_type" value={rentIncomeIns.prop_type}>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Mansion">Mansion</option>
                    <option value="Apartment or Flat">Apartment or Flat</option>
                    <option value="Terraced house">Terraced house</option>
                    <option value="Duplex">Duplex</option>
                    <option value="Traditional house">Traditional house</option>
                  </select>
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Property Address:</label>
                  <input onChange={handleRentIncomeChange} type="text" name="prop_address" value={rentIncomeIns.prop_address} className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Rental Type:</label>
                  <select onChange={handleRentIncomeChange} className="form-select" name="rental_type" value={rentIncomeIns.rental_type}>
                    <option value="Lease">Lease</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Rental Amount(Annual):</label>
                  <input onChange={handleRentIncomeChange} type="text" placeholder="₦" name="rental_amount" value={rentIncomeIns.rental_amount} className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Renter Name:</label>
                  <input onChange={handleRentIncomeChange} type="text" name="renter_name" value={rentIncomeIns.renter_name} className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <labe>Renter Phone number:</labe>
                  <input onChange={handleRentIncomeChange} type="text" name="renter_phone" value={rentIncomeIns.phone_number} className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Optional Comments:</label>
                  <textarea onChange={handleRentIncomeChange} name="comments" value={rentIncomeIns.comments} cols="40" rows="2" className="rounded"></textarea>
                </div>
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                  <button onClick={formTog4} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a>
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>
            </form> :

            <form onSubmit={submitDataRentIncome}>
              <div>
                {rentIncome.map((ind, i) => (
                  <div className="">
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Property Type:</label>
                      <select value={ind.prop_type} onChange={(e) => changedRentIncome(e, i, "prop_type")} name="prop_type">
                        <option value="Bungalow">Bungalow</option>
                        <option value="Penthouse">Penthouse</option>
                        <option value="Mansion">Mansion</option>
                        <option value="Apartment or Flat">Apartment or Flat</option>
                        <option value="Terraced house">Terraced house</option>
                        <option value="Duplex">Duplex</option>
                        <option value="Traditional house">Traditional house</option>
                      </select>
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Property Address:</label>
                      <textarea onChange={(e) => changedRentIncome(e, i, "prop_address")} value={ind.prop_address} name="prop_address" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Rental Type:</label>
                      <select value={ind.rental_type} onChange={(e) => changedRentIncome(e, i, "rental_type")} className="form-select" name="rental_type">
                        <option value="Lease">Lease</option>
                        <option value="Rent">Rent</option>
                      </select>
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Rental Amount(Annual):</label>
                      <input value={ind.rental_amount} onChange={(e) => changedRentIncome(e, i, "rental_amount")} type="text" placeholder="₦" name="rental_amount" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Renter Name:</label>
                      <input value={ind.renter_name} onChange={(e) => changedRentIncome(e, i, "renter_name")} type="text" name="renter_name" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <labe>Renter Phone number:</labe>
                      <input value={ind.renter_phone} onChange={(e) => changedRentIncome(e, i, "renter_phone")} type="text" name="renter_phone" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Optional Comments:</label>
                      <textarea value={ind.comments} onChange={(e) => changedRentIncome(e, i, "comments")} name="comments" cols="40" rows="2" className="rounded"></textarea>
                    </div>
                  </div>
                ))}
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Update
                  </button>
                  <button onClick={formTog4} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a>
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>
            </form>

          }
        </div>

      </div>


      <div className="flex justify-between mb-5">

        <p>Bank interest </p>


        <div className="flex">

          <div className="form-check form-check-inline">
            <input onClick={onChange9} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions5" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onClick={onChange10} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions5" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>

        </div>

      </div>

      <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee5}`}>

        <div>
          {bankInterest == null || bankInterest == "" ?
            <div>
              <form onSubmit={submitDataBankInt}>
                <div className="">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Bank Name:</label>
                    <input onChange={handleBankInterestChange} name="name" value={bankInterestIns.name} type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Bank Account:</label>
                    <input onChange={handleBankInterestChange} name="account" value={bankInterestIns.account} type="text" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Bank Verification Number (BVN):</label>
                    <input onChange={handleBankInterestChange} name="bvn" value={bankInterestIns.bvn} type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label >Gross Amount:</label>
                    <input required onChange={handleBankInterestChange} name="gross_amount" placeholder="₦" value={bankInterestIns.gross_amount} type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Optional Comments:</label>
                    <textarea onChange={handleBankInterestChange} name="comments" value={bankInterestIns.comments} cols="40" rows="2" className="rounded"></textarea>
                  </div>
                  <div className="mb-6 flex justify-between">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Save
                    </button>
                    <button onClick={formTog5} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                      <a>
                        <FiTriangle
                          size={15}
                          className="stroke-current text-green-500"
                        />
                      </a>
                    </button>
                  </div>
                </div>
              </form>
            </div> :
            <form onSubmit={submitDataBankInterest}>
              <div>
                {bankInterest.map((ind, i) => (
                  <div className="">
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Bank Name:</label>
                      <input value={ind.name} onChange={(e) => changedBankInterest(e, i, "name")} name="name" type="text" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Bank Account:</label>
                      <input value={ind.account} onChange={(e) => changedBankInterest(e, i, "account")} name="account" type="text" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Bank Verification Number (BVN):</label>
                      <input value={ind.bvn} onChange={(e) => changedBankInterest(e, i, "bvn")} name="bvn" type="text" id="employername" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label >Gross Amount:</label>
                      <input value={ind.gross_amount} onChange={(e) => changedBankInterest(e, i, "gross_amount")} required name="gross_amount" placeholder="₦" type="text" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Optional Comments:</label>
                      <textarea value={ind.comments} onChange={(e) => changedBankInterest(e, i, "comments")} name="comments" cols="40" rows="2" className="rounded"></textarea>
                    </div>
                  </div>
                ))}
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Update
                  </button>
                  <button onClick={formTog5} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a>
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>

            </form>

          }
        </div>
      </div>

      <div className="flex justify-between mb-5">

        <p>Bank dividends </p>

        <div className="flex">

          <div className="form-check form-check-inline">
            <input onClick={onChange11} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions6" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onClick={onChange12} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions6" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>

        </div>
      </div>
      <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee6}`}>
        <div>
          {dividends == null || dividends == "" ?
            <form onSubmit={submitDataDividends}>
              <div className="">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Company Name:</label>
                  <input onChange={handleDividendsChange} name="name" value={dividendsIns.name} type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Company address:</label>
                  <input onChange={handleDividendsChange} name="addr" value={dividendsIns.addr} type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Gross Amount:</label>
                  <input required onChange={handleDividendsChange} name="amount" value={dividendsIns.amount} type="text" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Optional Comments:</label>
                  <textarea onChange={handleDividendsChange} name="comments" value={dividendsIns.comments} id="comments" cols="40" rows="2" className="rounded"></textarea>
                </div>
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                  <button onClick={formTog6} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a>
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>
            </form> :
            <form onSubmit={submitDataBankDividends}>
              <div>
                {dividends.map((ind, i) => (
                  <div className="">
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Company Name:</label>
                      <input value={ind.name} onChange={(e) => changedBankDividends(e, i, "name")} name="name" type="text" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Company address:</label>
                      <textarea value={ind.addr} onChange={(e) => changedBankDividends(e, i, "addr")} name="addr" type="text" id="employername" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Gross Amount:</label>
                      <input value={ind.amount} onChange={(e) => changedBankDividends(e, i, "amount")} required name="amount" type="text" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Optional Comments:</label>
                      <textarea value={ind.comments} onChange={(e) => changedBankDividends(e, i, "comments")} name="comments" id="comments" cols="40" rows="2" className="rounded"></textarea>
                    </div>

                  </div>
                ))}
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Update
                  </button>
                  <button onClick={formTog6} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a>
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>
            </form>
          }
        </div>
      </div>

      <div className="flex justify-between mb-5">

        <p>Pension </p>

        <div className="flex">
          <div className="form-check form-check-inline">
            <input onClick={onChange13} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions7" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onClick={onChange14} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions7" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>
        </div>
      </div>
      <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee7}`}>
        <div>
          {pension == null || pension == "" ?
            <form onSubmit={submitDataPensionIns}>
              <div className="">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label >PFA:</label>
                  <input onChange={handlePensionChange} name="pfa" value={pensionIns.pfa} type="text" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>PFA address:</label>
                  <input onChange={handlePensionChange} name="pfa_addr" value={pensionIns.pfa_addr} type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label> Gross Amount:</label>
                  <input required onChange={handlePensionChange} name="gross_amount" placeholder="₦" value={pensionIns.gross_amount} type="text" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Optional Comments:</label>
                  <textarea onChange={handlePensionChange} name="comments" value={pensionIns.comments} cols="40" rows="2" className="rounded"></textarea>
                </div>
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                  <button onClick={formTog7} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a>
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>
            </form> :
            <form onSubmit={submitDataPension}>
              <div>
                {pension.map((ind, i) => (

                  <div className="">
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label >PFA:</label>
                      <input value={ind.pfa} onChange={(e) => changedPension(e, i, "pfa")} name="pfa" type="text" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>PFA address:</label>
                      <textarea value={ind.pfa_addr} onChange={(e) => changedPension(e, i, "pfa_addr")} name="pfa_addr" id="employername" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label> Gross Amount:</label>
                      <input value={ind.gross_amount} onChange={(e) => changedPension(e, i, "gross_amount")} required name="gross_amount" placeholder="₦" type="text" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Optional Comments:</label>
                      <textarea value={ind.comments} onChange={(e) => changedPension(e, i, "comments")} name="comments" cols="40" rows="2" className="rounded"></textarea>
                    </div>
                  </div>
                ))}
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Update
                  </button>
                  <button onClick={formTog7} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a>
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>
            </form>
          }
        </div>
      </div>
      <div className="flex justify-between mb-5">

        <p>Sale of Asset </p>

        <div className="flex">

          <div className="form-check form-check-inline">
            <input onClick={onChange15} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions8" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div onClick={onChange16} className="form-check form-check-inline ml-5">
            <input className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions8" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>

        </div>
      </div>

      <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee8}`}>
        <div>
          {asset == null || asset == "" ?
            <form onSubmit={submitDataAssetIns}>
              <div className="">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label >Asset Type:</label>
                  <select onChange={handleAssetChange} className="form-select" name="asset_type" value={assetIns.asset_type}>
                    <option value="landed property">Landed Property</option>
                    <option value="house">House</option>
                    <option value="farm land">Farm Land</option>
                  </select>
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label >Asset Address:</label>
                  <input onChange={handleAssetChange} name="asset_addr" value={assetIns.asset_addr} type="text" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Buyer:</label>
                  <input onChange={handleAssetChange} name="buyer_name" value={assetIns.buyer_name} type="text" className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Buyer address:</label>
                  <input onChange={handleAssetChange} name="buyer_addr" value={assetIns.buyer_addr} type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Buyer Phone number:</label>
                  <input onChange={handleAssetChange} name="buyer_phone" value={assetIns.buyer_phone} type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Sale amount:</label>
                  <input required onChange={handleAssetChange} name="amount" placeholder="₦" value={assetIns.amount} type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Optional Comments:</label>
                  <textarea onChange={handleAssetChange} name="comments" value={assetIns.comments} cols="40" rows="2" className="rounded"></textarea>
                </div>
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                  <button onClick={formTog8} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a>
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>
            </form> :
            <form onSubmit={submitDataAsset}>
              <div>
                {asset.map((ind, i) => (
                  <div className="">
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label >Asset Type:</label>
                      <select value={ind.asset_type} onChange={(e) => changedAsset(e, i, "asset_type")} className="form-select" name="asset_type">
                        <option value="landed property">Landed Property</option>
                        <option value="house">House</option>
                        <option value="farm land">Farm Land</option>
                      </select>
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label >Asset Address:</label>
                      <textarea value={ind.asset_addr} onChange={(e) => changedAsset(e, i, "asset_addr")} name="asset_addr" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Buyer:</label>
                      <input value={ind.buyer_name} onChange={(e) => changedAsset(e, i, "buyer_name")} name="buyer_name" type="text" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Buyer address:</label>
                      <textarea value={ind.buyer_addr} onChange={(e) => changedAsset(e, i, "buyer_addr")} name="buyer_addr" type="text" id="employername" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Buyer Phone number:</label>
                      <input value={ind.buyer_phone} onChange={(e) => changedAsset(e, i, "buyer_phone")} name="buyer_phone" type="text" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Sale amount:</label>
                      <input value={ind.amount} onChange={(e) => changedAsset(e, i, "amount")} required name="amount" placeholder="₦" type="text" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Optional Comments:</label>
                      <textarea value={ind.comments} onChange={(e) => changedAsset(e, i, "comments")} name="comments" cols="40" rows="2" className="rounded"></textarea>
                    </div>
                    <div className="mb-6 flex justify-between">
                      <button
                        style={{ backgroundColor: "#84abeb" }}
                        className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        Update
                      </button>
                      <button onClick={formTog8} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                        <a>
                          <FiTriangle
                            size={15}
                            className="stroke-current text-green-500"
                          />
                        </a>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </form>

          }
        </div>
      </div>

      <div className="flex justify-between mb-5">

        <p>Outside Source </p>

        <div className="flex">

          <div className="form-check form-check-inline flex ustify-evenly">
            <input onClick={onChange17} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions9" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onClick={onChange18} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions9" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>

        </div>
      </div>

      <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee9}`}>
        <div>
          {outsideSource == null || outsideSource == "" ?
            <form onSubmit={submitDataOutsideSource}>
              <div className="">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Source:</label>
                  <input onChange={handleOutsideSourceChange} name="source" value={outsideSourceIns.source} type="text" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Gross Amount:</label>
                  <input required onChange={handleOutsideSourceChange} placeholder="₦" name="gross_amount" value={outsideSourceIns.gross_amount} type="text" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Optional Comments:</label>
                  <textarea onChange={handleOutsideSourceChange} name="comments" value={outsideSourceIns.comments} cols="40" rows="2" className="rounded"></textarea>
                </div>
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                  <button onClick={formTog9} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a>
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>
            </form> :
            <form onSubmit={submitDataOutside}>
              <div>
                {outsideSource.map((ind, i) => (
                  <div className="">
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Source:</label>
                      <input value={ind.source} onChange={(e) => changedOutsideSource(e, i, "source")} name="source" type="text" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Gross Amount:</label>
                      <input value={ind.gross_amount} onChange={(e) => changedOutsideSource(e, i, "gross_amount")} required placeholder="₦" name="gross_amount" type="text" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Optional Comments:</label>
                      <textarea value={ind.comments} onChange={(e) => changedOutsideSource(e, i, "comments")} name="comments" cols="40" rows="2" className="rounded"></textarea>
                    </div>
                    <div className="mb-6 flex justify-between">
                      <button
                        style={{ backgroundColor: "#84abeb" }}
                        className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        Update
                      </button>
                      <button onClick={formTog9} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                        <a>
                          <FiTriangle
                            size={15}
                            className="stroke-current text-green-500"
                          />
                        </a>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </form>

          }
        </div>
      </div>

      <div className="flex justify-between mb-5">

        <p>Vehicle </p>


        <div className="flex">
          <div className="form-check form-check-inline flex ustify-evenly">
            <input onClick={onChange25} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions13" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onClick={onChange26} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions13" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>
        </div>
      </div>

      <div className={`flex justify-start border mb-3 block p-6 rounded-lg bg-white w-full ${togglee13}`}>

        <div>
          {vehicles == null || vehicles == "" ?
            <form onSubmit={submitDataVehicleIns}>
              <div className="">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Date of purchase:</label>
                  <input required onChange={handleVehicleChange} name="purchase_date" value={vehicle.purchase_date} type="date" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Cost:</label>
                  <input required onChange={handleVehicleChange} name="cost" value={vehicle.cost} type="text" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Brand:</label>
                  <input onChange={handleVehicleChange} type="text" name="brand" value={vehicle.brand}></input>
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <labe>Model:</labe>
                  <input onChange={handleVehicleChange} name="model" value={vehicle.model} type="text" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Year:</label>
                  <input required onChange={handleVehicleChange} name="year" value={vehicle.year} type="number" placeholder="YYYY" min="1990" max="2100" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                  <button onClick={formTog13} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a>
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>
            </form> :
            <form onSubmit={submitDataVehicles}>
              <div>
                {vehicles.map((ind, i) => (
                  <div className="">
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Date of purchase:</label>
                      <input value={ind.purchase_date} onChange={(e) => changedVehicles(e, i, "purchase_date")} required name="purchase_date" type="date" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Cost:</label>
                      <input value={ind.cost} onChange={(e) => changedVehicles(e, i, "cost")} required name="cost" type="text" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Brand:</label>
                      <input value={ind.brand} onChange={(e) => changedVehicles(e, i, "brand")} type="text" name="brand"></input>
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <labe>Model:</labe>
                      <input value={ind.model} onChange={(e) => changedVehicles(e, i, "model")} name="model" type="text" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Year:</label>
                      <input value={ind.year} onChange={(e) => changedVehicles(e, i, "year")} type="number" placeholder="YYYY" min="1990" max="2100"></input>


                    </div>
                    <div className="m-3">

                      <hr />
                    </div>
                  </div>
                ))}
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Update
                  </button>
                  <button onClick={formTog13} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a>
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>
            </form>
          }
        </div>
      </div>

      <div className="flex justify-between mb-5">

        <p>Landed Property </p>


        <div className="flex">
          <div className="form-check form-check-inline flex ustify-evenly">
            <input onClick={onChange27} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions14" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio1">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onClick={onChange28} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions14" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio2">No</label>
          </div>
        </div>
      </div>
      <div className={`flex justify-start border mb-3 block p-6 rounded-lg bg-white w-full ${togglee14}`}>
        <div>
          {land == null || land == "" ?
            <form onSubmit={submitDataLandIns}>
              <div className="">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Address:</label>
                  <textarea onChange={handleLandChange} name="addr" value={landIns.addr} cols="40" rows="2" className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Type of property:</label>
                  <select onChange={handleLandChange} name="prop_type" value={landIns.prop_type} className="form-select w-full">
                    <option value="Bungalow">Bungalow</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Mansion">Mansion</option>
                    <option value="Apartment or Flat">Apartment or Flat</option>
                    <option value="Terraced house">Terraced house</option>
                    <option value="Duplex">Duplex</option>
                    <option value="Traditional house">Traditional house</option>
                  </select>
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Date of completion/acquisition:</label>
                  <input required onChange={handleLandChange} name="date_completion" value={landIns.date_completion} type="date" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Cost of construction/acquisition:</label>
                  <input required onChange={handleLandChange} name="construction_cost" value={landIns.construction_cost} type="text" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                  <button onClick={formTog14} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a>
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>
            </form> :
            <form onSubmit={submitDataLand}>
              <div>
                {land.map((ind, i) => (
                  <div className="" key={i}>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Address:</label>
                      <textarea value={ind.addr} onChange={(e) => changedLand(e, i, "addr")} name="addr" cols="40" rows="2" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Type of property:</label>
                      <select value={ind.prop_type} onChange={(e) => changedLand(e, i, "prop_type")} name="prop_type" className="form-select w-full">
                        <option value="Bungalow">Bungalow</option>
                        <option value="Penthouse">Penthouse</option>
                        <option value="Mansion">Mansion</option>
                        <option value="Apartment or Flat">Apartment or Flat</option>
                        <option value="Terraced house">Terraced house</option>
                        <option value="Duplex">Duplex</option>
                        <option value="Traditional house">Traditional house</option>
                      </select>
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Date of completion/acquisition:</label>
                      <input value={ind.date_completion} onChange={(e) => changedLand(e, i, "date_completion")} required name="date_completion" type="date" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Cost of construction/acquisition:</label>
                      <input value={ind.construction_cost} onChange={(e) => changedLand(e, i, "construction_cost")} required name="construction_cost" type="text" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="m-3">
                      <hr />
                    </div>
                  </div>
                ))}
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Update
                  </button>
                  <button onClick={formTog14} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a>
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>

            </form>

          }
        </div>
      </div>
      <div className="flex justify-between mb-5">

        <p>Farmland </p>


        <div className="flex">
          <div className="form-check form-check-inline flex ustify-evenly">
            <input onClick={onChange29} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions15" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onClick={onChange30} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions15" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>
        </div>
      </div>

      <div className={`flex justify-start border mb-3 block p-6 rounded-lg bg-white w-full ${togglee15}`}>
        <div>
          {farm == null || farm == "" ?
            <form onSubmit={submitDataFarmIns}>
              <div className="">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Address:</label>
                  <input onChange={handlefarmChange} name="addr" value={farmland.addr} type="text" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Date of acquisition:</label>
                  <input required onChange={handlefarmChange} name="acq_date" value={farmland.acq_date} type="date" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Cost of Land:</label>
                  <input required onChange={handlefarmChange} placeholder="₦" name="land_cost" value={farmland.land_cost} type="text" className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Cost of Produce:</label>
                  <input required onChange={handlefarmChange} name="produce_cost" value={farmland.produce_cost} type="text" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                  <button onClick={formTog15} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a>
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>
            </form> :
            <form onSubmit={submitDataFarm}>
              <div>
                {farm.map((ind, i) => (

                  <div className="">
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <abel>Address:</abel>
                      <textarea value={ind.addr} onChange={(e) => changedFarm(e, i, "addr")} name="addr" type="text" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Date of acquisition:</label>
                      <input value={ind.acq_date} onChange={(e) => changedFarm(e, i, "acq_date")} required name="acq_date" type="date" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Cost of Land:</label>
                      <input value={ind.land_cost} onChange={(e) => changedFarm(e, i, "land_cost")} required placeholder="₦" name="land_cost" type="text" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Cost of Produce:</label>
                      <input value={ind.produce_cost} onChange={(e) => changedFarm(e, i, "produce_cost")} required name="produce_cost" type="text" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="m-3">
                      <hr />
                    </div>
                  </div>
                ))}
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Update
                  </button>
                  <button onClick={formTog15} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a>
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>

            </form>

          }
        </div>
      </div>
      <form onSubmit={submitForm}>

        <div className="mb-6 flex justify-center">
          <button
            style={{ backgroundColor: "#84abeb" }}
            className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
            type="submit"
          >
            Submit form
          </button>
        </div>
      </form>
    </>
  );
};
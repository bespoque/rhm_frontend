import axios from "axios";
import authActionTypes from "./auth.types";
import url from "../../config/url";

export const login = (data) => async (dispatch) => {
  dispatch({ type: authActionTypes.SET_LOGIN_SUBMITTING });
  try {
    let vetData = {
      Username: data.email,
      Password: data.password
    }
    console.log("vetData", vetData);
    const login = await axios.post(`${url.BASE_URL}user/login`, data);
    const auth = login.data.accessToken;
    const vetToken = await axios.post(`https://bespoque.dev/rhm-live/utils/startAuth.php`, vetData,{
      headers:{
        Authorization: `Bearer ${auth}`
      }
    });
    console.log("vetToken", vetToken);
    const userGroup = login.data.userGroups
    
    dispatch({ type: authActionTypes.SET_LOGIN_SUBMITTING });
    dispatch({ type: authActionTypes.LOGIN, payload: auth, userAccess: userGroup});
  } catch (e) {
    dispatch({ type: authActionTypes.SET_LOGIN_SUBMITTING });
    if (e.response) {
      const errors = e.response.data.message;
      dispatch({
        type: authActionTypes.SET_LOGIN_ERRORS,
        payload: errors,
        // payload: "Invalid login credentials",
      });
      setTimeout(() => {
        dispatch({ type: authActionTypes.SET_LOGIN_ERRORS, payload: null });
      }, 6000);
    } else if (e.request) {
      alert("Cannot carry out this request at this time. Please try again");
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: authActionTypes.LOGOUT });
  } catch (e) { }
};

export const disableSubmitting = () => async (dispatch) => {
  try {
    dispatch({ type: authActionTypes.SET_LOGIN_SUBMITTING_FALSE });
  } catch (e) { }
};

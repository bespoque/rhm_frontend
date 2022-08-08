import Link from "next/link";
import CenteredForm from "../../layouts/centered-form";
import NewFormInput from "../FormInput/formInputs";
import { PasswordIcon, PasswordIcon2 } from "../Icons";
import { useForm } from "react-hook-form";
import CustomButton from "../CustomButton/CustomButton";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import url from "../../config/url";
import Loader from "react-loader-spinner";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import setAuthToken from "../../functions/setAuthToken";
import { logout } from "../../redux/authentication/auth.actions";

const PasswordResetForm = () => {
  const { register, handleSubmit, errors, watch } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [id, setId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const password = useRef({});
  password.current = watch("password", "");
  const router = useRouter();
  // useEffect(() => {
  //   if (router && router.query) {
  //     let query = router.query.r;
  //     setId(query);
  //   }
  // }, [router]);

  const dispatch = useDispatch();
  const { auth } = useSelector(
    (state) => ({
      auth: state.authentication.auth,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!auth) {
      LogoutUser();
    }
  }, [auth]);

  const LogoutUser = () => {
    router.reload();
    dispatch(logout());
  };

  //submit
  setAuthToken()
  const SubmitHandler = async (data) => {
    setSubmitting(true);
    try {
      const res = await axios.put(
        `${url.BASE_URL}user/update-password`, data
        // { password: data.password },
        // {
        //   headers: {
        //     Authorization: `Bearer ${id}`,
        //   },
        // }
      );
      setSubmitting(false);
      setSuccessMsg(res.data.message);
      setTimeout(() => {
        LogoutUser()
        setSuccessMsg(null);
        // router.push("/");
      }, 10000);
    } catch (e) {
      setSubmitting(false);
      // if (e.response) {
      //   if (e.response.data.message === "jwt expired") {
      //     setErrorMsg("This password reset link has expired");
      //   } else {
      //     setErrorMsg(e.response.data.message.failed);
      //   }
      // }
      console.log(e);
      setTimeout(() => {
        setErrorMsg(null);
      }, 10000);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96">
        <CenteredForm
          title="Update password"
          subtitle="Please enter your new password to reset your password"
        >
          {successMsg !== null && (
            <>
              <p className="p-2 shadow-md border-l-2 text-green-700 border-green-500">
                {successMsg}
              </p>
            </>
          )}
          {errorMsg !== null && (
            <>
              <p className="p-2 shadow-md border-l-2 text-red-700 border-red-500">
                {errorMsg}
              </p>
            </>
          )}
          <div className="w-full mt-2">
            <form onSubmit={handleSubmit(SubmitHandler)} autoComplete="off">
              <div className="">
                <NewFormInput
                  name={"password"}
                  label={<PasswordIcon />}
                  autoComplete="off"
                  required
                  placeholder="Enter Password"
                  usePasswordIcon
                  ref={register({
                    required: "Please enter a Password",
                    minLength: {
                      value: 8,
                      message: "Must be 8 characters or more",
                    },
                    maxLength: {
                      value: 12,
                      message: "Must not be more than 12 characters",
                    },
                    // validate: (value) => {
                    //   return (
                    //     [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every(
                    //       (pattern) => pattern.test(value)
                    //     ) ||
                    //     "Must include lower, upper, number, and special characters"
                    //   );
                    // },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}

                {/* <NewFormInput
                  name={"confPassword"}
                  label={<PasswordIcon2 />}
                  autoComplete="off"
                  required
                  placeholder="Enter Password again"
                  usePasswordIcon
                  ref={register({
                    validate: (value) =>
                      value === password.current || "The passwords do not match",
                  })}
                />
                {errors.confPassword && (
                  <p className="text-red-500">{errors.confPassword.message}</p>
                )} */}
              </div>
              <div className="mt-10 flex justify-between items-center">
                <div className="">
                  <CustomButton disable={submitting}>
                    Submit
                    <Loader
                      visible={submitting}
                      type="TailSpin"
                      color="#00FA9A"
                      height={18}
                      width={18}
                      timeout={0}
                      className="ml-2"
                    />
                  </CustomButton>
                </div>
              
              </div>
            </form>
          </div>
        </CenteredForm>
     
      </div>
    </div>
  );
};

export default PasswordResetForm;

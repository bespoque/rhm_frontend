import Link from 'next/link';
import { useState } from 'react';
import CenteredForm from '../../layouts/centered-form';
import NewFormInput from '../FormInput/formInputs';
import { KgtinIcon } from '../Icons';
import { useForm } from 'react-hook-form';
import CustomButton from '../CustomButton/CustomButton';
import axios from 'axios';
import url from '../../config/url';
import Loader from 'react-loader-spinner';
import { useRouter } from 'next/router';

const ForgotPasswordForm = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  //submit
  const SubmitHandler = async (data) => {
    setSubmitting(true);
    try {
      const res = await axios.put(`${url.BASE_URL}user/reset-password`, data);
      setSubmitting(false);
      setSuccessMessage(res.data.message);
      setTimeout(() => {
        setSuccessMessage(null);
        router.push('/');
      }, 10000);
    } catch (e) {
      setSubmitting(false);
      if (e.response) setErrorMessage(e.response.data.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 10000);
    }
  };
  return (
    <div className=" w-96">
      <CenteredForm
        title="Password Reset"
        subtitle="Please enter your email address"
      >
        {successMessage !== null && (
          <>
            <p className="p-2 shadow-md border-l-2 text-green-700 border-green-500">
              {successMessage}
            </p>
          </>
        )}
        {errorMessage !== null && (
          <>
            <p className="p-2 shadow-md border-l-2 text-red-700 border-red-500">
              {errorMessage}
            </p>
          </>
        )}
        <div className="w-full mt-2">
          <form onSubmit={handleSubmit(SubmitHandler)} autoComplete="off">
            <div className="">
              <NewFormInput
                name="email"
                label={<KgtinIcon />}
                ref={register({
                  // minLength: 10,
                  // maxLength: 10,
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  },
                })}
                autoComplete="off"
                type="text"
                required
                placeholder="email"
              />

              {errors.email && (
                <p className="text-red-600 bg-white">Enter a valid email</p>
              )}
            </div>

            <div className="mt-4">
              <CustomButton disabled={submitting}>
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

            {/* <div className="flex flex-row w-full mt-3">
              <span className="mr-1">New user?</span>
              <span>
                <Link href="/signup">
                  <a className="link">Sign up here</a>
                </Link>
              </span>
            </div>
            <div className="flex flex-row w-full">
              <span className="mr-1">Already have an account?</span>
              <span>
                <Link href="/">
                  <a className="link">Login here</a>
                </Link>
              </span>
            </div> */}
            <div className="flex justify-end">
              <span>
                <Link legacyBehavior href="/">
                  <a className="link">Back to Login</a>
                </Link>
              </span>
            </div>
          </form>
        </div>
      </CenteredForm>
    </div>
  );
};

export default ForgotPasswordForm;

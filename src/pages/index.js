import LoginForm from '../components/Form/LoginForm.js';
const Login = () => {
  return (
    <div className="w-full">
      <div className="h-full flex justify-center w-full">
        <div className="flex justify-center  w-full lg:px-8 md:px-2 ">
    
          <div className="w-full flex items-center justify-center lg:w-1/2 md:w-full pb-14">
            <div className="px-2 w-96">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

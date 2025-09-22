import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import SubmitTemplate from "../components/SubmitTemplate/SubmitTemplate";
import FormInput from "../components/FormInput/FormInput";
import Button from "../../../Components/DesignSystem/Button";
import LockOutlineRoundedIcon from "@mui/icons-material/LockOutlineRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import type {
  I_AuthInfos,
  I_errorMessagesContext,
} from "../../../Types/interface";
import { errorMessagesContext } from "../../../App";
import {
  passwordValidator,
  userNameValidator,
} from "../../../Founctions/Validation";
import { useNavigate } from "react-router";
import type {
  T_AlertIsShow,
  T_FormValues,
  T_InputEvent,
  T_setAlertShow,
  T_setFormValues,
} from "../../../Types/type";
import useAlertShow from "../../../Hooks/useAlertShow";
import { useSelector } from "react-redux";
import Alert from "../../../Components/Alert/Alert";

function Login() {
  const [inputValues, setInputValues] = useState<T_FormValues>({
    username: "",
    password: "",
  });

  const { username, password } = inputValues;

  const [isSubmit, setIsSubmit] = useState(false);

  const { errorMessages, setErrorMessages } =
    useContext<I_errorMessagesContext>(errorMessagesContext);

  const authInfos = useSelector(
    (state: { authInfos: { values: I_AuthInfos } }) => state.authInfos.values
  );

  const [successAlertIsShow, setSuccessAlertIsShow] = useAlertShow();
  const [errorAlertIsShow, setErrorAlertIsShow] = useAlertShow();

  const navigate = useNavigate();

  // Functions
  const sendDataHandler = async () => {
    try {
      const response = await fetch("http://localhost:4000/v1/auth/login", {
        method: "POST",
        body: JSON.stringify({
          identifier: username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);

      const result = await response.json();

      if (response.ok) {
        console.log(result);
        {
          localStorage.setItem(
            "user",
            JSON.stringify({ token: result.accessToken })
          );
        }
        authInfos.userInfos
          ? (setSuccessAlertIsShow as T_setAlertShow)(authInfos.userInfos?.name)
          : (setSuccessAlertIsShow as T_setAlertShow)("کاربر");
        setTimeout(() => {
          navigate("/verify-code");
        }, 5000);
      } else {
        (setErrorAlertIsShow as T_setAlertShow)();
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
    if (
      !(errorMessages as T_FormValues).username &&
      !(errorMessages as T_FormValues).password
    ) {
      sendDataHandler();
      setInputValues({
        username: "",
        password: "",
      });
      setIsSubmit(false);
    }
  };

  useEffect(() => {
    // username validation
    {
      (setErrorMessages as T_setFormValues)((prev: T_FormValues) => ({
        ...prev,
        username: userNameValidator(username as string),
      }));
    }
    // password validation
    {
      (setErrorMessages as T_setFormValues)((prev: T_FormValues) => ({
        ...prev,
        password: passwordValidator(password as string),
      }));
    }
  }, [inputValues]);

  return (
    <>
      {(successAlertIsShow as T_AlertIsShow).isShow && (
        <Alert
          message={`${
            (successAlertIsShow as T_AlertIsShow).userFullName
          } عزیز شما با موفقیت وارد حساب کاربری خود شدید`}
        />
      )}
      {(errorAlertIsShow as T_AlertIsShow).isShow && (
        <Alert
          message="نام کاربری یا رمزعبور معتبر نمیباشد. لطفا دوباره تلاش کنید"
          alertThem="bg-error"
        />
      )}
      <SubmitTemplate
        title="ورود با نام کاربری"
        question="حساب کاربری ندارید؟"
        link="/register"
        linkTitle="ثبت نام کنید"
      >
        <>
          <form onSubmit={submitHandler} className="py-6">
            <FormInput
              value={username}
              setValue={(e: T_InputEvent) =>
                setInputValues({ ...inputValues, username: e.target.value })
              }
              errorMessage={(errorMessages as T_FormValues).username}
              isSubmited={isSubmit}
              placeholder="نام کاربری"
              icon={<PersonOutlineRoundedIcon />}
            />
            <FormInput
              value={password}
              setValue={(e: T_InputEvent) =>
                setInputValues({ ...inputValues, password: e.target.value })
              }
              errorMessage={(errorMessages as T_FormValues).password}
              isSubmited={isSubmit}
              placeholder="رمزعبور"
              icon={<LockOutlineRoundedIcon />}
              type="password"
            />
            <Button styles="!w-full !py-3 !mt-6">ادامه</Button>
          </form>
          <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm">
            <Link to={"/login-by-email"}>ورود با ایمیل</Link>
            <Link to={"/forget-password"} className="underline">
              فراموشی رمز عبور
            </Link>
          </div>
        </>
      </SubmitTemplate>
    </>
  );
}

export default Login;

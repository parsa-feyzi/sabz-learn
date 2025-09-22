import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import SubmitTemplate from "../components/SubmitTemplate/SubmitTemplate";
import FormInput from "../components/FormInput/FormInput";
import Button from "../../../Components/DesignSystem/Button";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LockOutlineRoundedIcon from "@mui/icons-material/LockOutlineRounded";
import type {
  T_AlertIsShow,
  T_FormValues,
  T_InputEvent,
  T_setAlertShow,
  T_setFormValues,
} from "../../../Types/type";
import type {
  I_AuthInfos,
  I_errorMessagesContext,
} from "../../../Types/interface";

import {
  emailValidator,
  passwordValidator,
} from "../../../Founctions/Validation";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import useAlertShow from "../../../Hooks/useAlertShow";
import Alert from "../../../Components/Alert/Alert";
import { errorMessagesContext } from "../../../context/AppContext";

function LoginByMail() {
  const [inputValues, setInputValues] = useState<T_FormValues>({
    email: "",
    password: "",
  });

  const { email, password } = inputValues;

  const { errorMessages, setErrorMessages } =
    useContext<I_errorMessagesContext>(errorMessagesContext);

  const [isSubmit, setIsSubmit] = useState(false);

  const authInfos = useSelector(
    (state: { authInfos: { values: I_AuthInfos } }) => state.authInfos.values
  );

  const [successAlertIsShow, setSuccessAlertIsShow] = useAlertShow();
  const [errorAlertIsShow, setErrorAlertIsShow] = useAlertShow();

  const navigate = useNavigate();

  const sendDataHandler = async () => {
    try {
      const response = await fetch("http://localhost:4000/v1/auth/login", {
        method: "POST",
        body: JSON.stringify({
          identifier: email,
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
        authInfos.userInfos ? (setSuccessAlertIsShow as T_setAlertShow)(authInfos.userInfos?.name) : (setSuccessAlertIsShow as T_setAlertShow)("کاربر")
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
      !(errorMessages as T_FormValues).email &&
      !(errorMessages as T_FormValues).password
    ) {
      sendDataHandler();
      setInputValues({ email: "", password: "" });
      setIsSubmit(false);
    }
  };

  useEffect(() => {
    // email validation
    {
      (setErrorMessages as T_setFormValues)((prev: T_FormValues) => ({
        ...prev,
        email: emailValidator(email as string),
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
          message="آدرس ایمیل یا رمزعبور معتبر نمیباشد. لطفا دوباره تلاش کنید"
          alertThem="bg-error"
        />
      )}
      <SubmitTemplate
        title="ورود با ایمیل"
        question="حساب کاربری ندارید؟"
        link="/register"
        linkTitle="ثبت نام کنید"
      >
        <>
          <form onSubmit={submitHandler} className="py-6">
            <FormInput
              value={email}
              setValue={(e: T_InputEvent) =>
                setInputValues({ ...inputValues, email: e.target.value })
              }
              errorMessage={(errorMessages as T_FormValues).email}
              isSubmited={isSubmit}
              placeholder="آدرس ایمیل"
              icon={<MailOutlineRoundedIcon />}
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
            <Link to={"/login"}>ورود با نام کاربری</Link>
            <Link to={"/forget-password"} className="underline">
              فراموشی رمز عبور
            </Link>
          </div>
        </>
      </SubmitTemplate>
    </>
  );
}

export default LoginByMail;

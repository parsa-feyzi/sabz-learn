import { useContext, useEffect, useState } from "react";
import type {
  T_AlertIsShow,
  T_FormValues,
  T_setAlertShow,
  T_setFormValues,
} from "../../Types/type";
import SubmitTemplate from "../Submit/components/SubmitTemplate/SubmitTemplate";
import FormInput from "../Submit/components/FormInput/FormInput";
import Button from "../../Components/DesignSystem/Button";
import { Link, useNavigate } from "react-router";
import type {
  I_AuthInfos,
  I_errorMessagesContext,
} from "../../Types/interface";
import { errorMessagesContext } from "../../App";
import SwitchAccountOutlinedIcon from "@mui/icons-material/SwitchAccountOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import {
  emailValidator,
  fullNameValidator,
  messageValidator,
  telValidator,
} from "../../Founctions/Validation";
import useAlertShow from "../../Hooks/useAlertShow";
import Alert from "../../Components/Alert/Alert";
import FormTextarea from "../Submit/components/FormTextarea/FormTextarea";
import { useSelector } from "react-redux";

function Contact() {
  const authInfos = useSelector(
    (state: { authInfos: { values: I_AuthInfos } }) => state.authInfos.values
  );

  const [inputValues, setInputValues] = useState<T_FormValues>({
    name: "",
    email: "",
    tel: "",
    message: "",
  });
  const { name, email, tel, message } = inputValues;

  const [isSubmit, setIsSubmit] = useState(false);

  const { errorMessages, setErrorMessages } =
    useContext<I_errorMessagesContext>(errorMessagesContext);

  const [successAlertIsShow, setSuccessAlertIsShow] = useAlertShow();
  const [errorAlertIsShow, setErrorAlertIsShow] = useAlertShow();

  const navigate = useNavigate();

  //  Functions
  const sendDataHandler = async () => {
    try {
      const response = await fetch("http://localhost:4000/v1/contact", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone: tel,
          body: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      if (response.ok) {
        console.log(result);

        (setSuccessAlertIsShow as T_setAlertShow)(name);
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else {
        (setErrorAlertIsShow as T_setAlertShow)();
      }
    } catch (error) {
      (setErrorAlertIsShow as T_setAlertShow)();
      throw new Error(`${error}`);
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
    if (
      !(errorMessages as T_FormValues).name &&
      !(errorMessages as T_FormValues).email &&
      !(errorMessages as T_FormValues).tel &&
      !(errorMessages as T_FormValues).message
    ) {
      sendDataHandler();
      setInputValues({
        name: "",
        email: "",
        tel: "",
        message: "",
      });
      setIsSubmit(false);
    }
  };

  useEffect(() => {
    // name validation
    {
      (setErrorMessages as T_setFormValues)((prev: T_FormValues) => ({
        ...prev,
        name: fullNameValidator(name as string),
      }));
    }
    // email validation
    {
      (setErrorMessages as T_setFormValues)((prev: T_FormValues) => ({
        ...prev,
        email: emailValidator(email as string),
      }));
    }
    // tel validation
    {
      (setErrorMessages as T_setFormValues)((prev: T_FormValues) => ({
        ...prev,
        tel: telValidator(tel as string),
      }));
    }
    // message validation
    {
      (setErrorMessages as T_setFormValues)((prev: T_FormValues) => ({
        ...prev,
        message: messageValidator(message as string),
      }));
    }
  }, [inputValues]);

  useEffect(() => {
    if (authInfos.isLogin) {
      setInputValues({
        ...inputValues,
        name: authInfos.userInfos?.name,
        email: authInfos.userInfos?.email,
      });
    }
  }, []);

  return (
    <>
      {(successAlertIsShow as T_AlertIsShow).isShow && (
        <Alert
          message={`${
            (successAlertIsShow as T_AlertIsShow).userFullName
          } عزیز پیغام شما با موفقیت ارسال شد`}
        />
      )}
      {(errorAlertIsShow as T_AlertIsShow).isShow && (
        <Alert
          message="برقراری ارتباط ناموفق بود! لطفا دوباره امتحان کنید"
          alertThem="bg-error"
        />
      )}
      <SubmitTemplate
        isContactForm
        title="ارتباط با ما"
        question="نظر یا انتقادت رو با ما درمیون بزار :)"
      >
        <>
          <form onSubmit={submitHandler} className="py-6">
            <FormInput
              value={name}
              setValue={(e) =>
                setInputValues({ ...inputValues, name: e.target.value })
              }
              errorMessage={(errorMessages as T_FormValues).name}
              isSubmited={isSubmit}
              placeholder="نام و نام‌خانوادگی"
              icon={<SwitchAccountOutlinedIcon />}
              isContactInput
            />
            <FormInput
              value={email}
              setValue={(e) =>
                setInputValues({ ...inputValues, email: e.target.value })
              }
              errorMessage={(errorMessages as T_FormValues).email}
              isSubmited={isSubmit}
              placeholder="آدرس ایمیل"
              icon={<MailOutlineRoundedIcon />}
              isContactInput
            />
            <FormInput
              value={tel}
              setValue={(e) =>
                setInputValues({ ...inputValues, tel: e.target.value })
              }
              errorMessage={(errorMessages as T_FormValues).tel}
              isSubmited={isSubmit}
              placeholder="شماره مبایل"
              icon={<LocalPhoneOutlinedIcon />}
              type="tel"
              isContactInput
            />
            <FormTextarea
              value={message}
              setValue={(e) =>
                setInputValues({ ...inputValues, message: e.target.value })
              }
              errorMessage={(errorMessages as T_FormValues).message}
              isSubmited={isSubmit}
              placeholder="پیغام خود را وارد کنید"
            />
            <Button styles="!w-full !py-3 !mt-6">ارسال</Button>
          </form>
          <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm">
            {authInfos.isLogin ? (
              <Link to={"/"} className="hover:underline">
                صفحه‌اصلی
              </Link>
            ) : (
              <Link to={"/login"} className="hover:underline">
                ورود/ثبت‌نام
              </Link>
            )}
            <Link to={"/terms-condition"} className="underline">
              حریم خصوصی
            </Link>
          </div>
        </>
      </SubmitTemplate>
    </>
  );
}

export default Contact;

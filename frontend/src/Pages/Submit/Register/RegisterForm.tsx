import { useEffect, useState, useContext } from "react";
import Button from "../../../Components/DesignSystem/Button";
import FormInput from "../components/FormInput/FormInput";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LockOutlineRoundedIcon from "@mui/icons-material/LockOutlineRounded";
import SwitchAccountOutlinedIcon from "@mui/icons-material/SwitchAccountOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { errorMessagesContext } from "../../../App";
import type {
  I_AuthInfos,
  I_errorMessagesContext,
} from "../../../Types/interface";
import Alert from "../../../Components/Alert/Alert";
import useAlertShow from "../../../Hooks/useAlertShow";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../Redux/slices/authInfosSlice";
import { useNavigate } from "react-router";
import type {
  T_AlertIsShow,
  T_FormValues,
  T_InputEvent,
  T_setAlertShow,
  T_setFormValues,
} from "../../../Types/type";
import {
  passwordValidator,
  emailValidator,
  userNameValidator,
  fullNameValidator,
  telValidator,
} from "../../../Founctions/Validation";

function RegisterForm({ isAdminRegister }: { isAdminRegister?: boolean }) {
  const authInfos = useSelector((state: { authInfos: { values: I_AuthInfos } }) => state.authInfos.values);

  const [inputValues, setInputValues] = useState<T_FormValues>({
    name: "",
    username: "",
    tel: "",
    email: "",
    password: "",
  });
  const { name, username, tel, email, password } = inputValues;

  const [isSubmit, setIsSubmit] = useState(false);

  const [successAlertIsShow, setSuccessAlertIsShow] = useAlertShow();
  const [warningAlertIsShow, setWarningAlertIsShow] = useAlertShow();
  const [errorAlertIsShow, setErrorAlertIsShow] = useAlertShow();

  const navigate = useNavigate();

  const { errorMessages, setErrorMessages } = useContext<I_errorMessagesContext>(errorMessagesContext);

  const dispatch = useDispatch();

  // functions
  const sendDataHandler = async () => {
    const requistBody = {
      ...inputValues,
      phone: tel,
      confirmPassword: password,
    };
    try {
      const response = await fetch("http://localhost:4000/v1/auth/register", {
        method: "POST",
        body: JSON.stringify(requistBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resulve = await response.json();
      console.log(response);
      if (response.ok) {
        if (!isAdminRegister) {
          (setSuccessAlertIsShow as T_setAlertShow)(name);
          dispatch(
            register({ token: resulve.accessToken, user: resulve.user })
          );
          setTimeout(() => {
            navigate("/verify-code");
          }, 5000);
        }
      } else if (response.status === 403) {
        (setWarningAlertIsShow as T_setAlertShow)();
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
      !(errorMessages as T_FormValues).username &&
      !(errorMessages as T_FormValues).name &&
      !(errorMessages as T_FormValues).tel &&
      !(errorMessages as T_FormValues).password &&
      !(errorMessages as T_FormValues).email
    ) {
      sendDataHandler();
      setInputValues({
        name: "",
        username: "",
        tel: "",
        email: "",
        password: "",
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
    // username validation
    {
      (setErrorMessages as T_setFormValues)((prev: T_FormValues) => ({
        ...prev,
        username: userNameValidator(username as string),
      }));
    }
    // tel validation
    {
      (setErrorMessages as T_setFormValues)((prev: T_FormValues) => ({
        ...prev,
        tel: telValidator(tel as string),
      }));
    }
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

  useEffect(() => {
    if (authInfos.isLogin && !isAdminRegister) {
      setInputValues({
        ...inputValues,
        name: authInfos.userInfos?.name,
        email: authInfos.userInfos?.email,
        username: authInfos.userInfos?.username,
      });
    }
  }, []);

  return (
    <>
      {(successAlertIsShow as T_AlertIsShow).isShow && !isAdminRegister && (
        <Alert
          message={`${
            (successAlertIsShow as T_AlertIsShow).userFullName
          } عزیز ثبت نام شما با موفقیت انجام شد`}
        />
      )}
      {(warningAlertIsShow as T_AlertIsShow).isShow && (
        <Alert
          message={"این شماره مسدود شده و صلاحیت ثبت نام در سبزلرن را ندارد!"}
          alertThem="bg-warn"
        />
      )}
      {(errorAlertIsShow as T_AlertIsShow).isShow && (
        <Alert
          message={
            isAdminRegister
              ? "ثبت نام کاربر ناموفق بود لطفا دوباره تلاش کنید."
              : "ثبت نام شما ناموفق بود لطفا دوباره تلاش کنید."
          }
          alertThem="bg-error"
        />
      )}
      <form
        onSubmit={submitHandler}
        className={isAdminRegister ? "grid sm:grid-cols-2 gap-x-6" : "pt-6"}
      >
        <FormInput
          isAdminRegister={isAdminRegister}
          value={name}
          setValue={(e: T_InputEvent) =>
            setInputValues({ ...inputValues, name: e.target.value })
          }
          errorMessage={(errorMessages as T_FormValues).name}
          isSubmited={isSubmit}
          placeholder="نام و نام‌خانوادگی"
          icon={<SwitchAccountOutlinedIcon />}
        />
        <FormInput
          isAdminRegister={isAdminRegister}
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
          isAdminRegister={isAdminRegister}
          value={tel}
          setValue={(e: T_InputEvent) =>
            setInputValues({ ...inputValues, tel: e.target.value })
          }
          errorMessage={(errorMessages as T_FormValues).tel}
          isSubmited={isSubmit}
          placeholder="شماره مبایل"
          icon={<LocalPhoneOutlinedIcon />}
          type="tel"
        />
        <FormInput
          isAdminRegister={isAdminRegister}
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
          isAdminRegister={isAdminRegister}
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
        <div className="">
          <Button
            styles={`${
              isAdminRegister
                ? "!bg-prim !mt-1 !py-3 sm:!w-1/3 !w-full"
                : "!py-3 !w-full !mt-6"
            }`}
          >
            {isAdminRegister ? "ثبت" : "ادامه"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default RegisterForm;

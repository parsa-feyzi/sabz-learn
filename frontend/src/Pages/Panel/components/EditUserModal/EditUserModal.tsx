import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useEffect, useState } from "react";
import FormInput from "../../../Submit/components/FormInput/FormInput";
import { useSelector } from "react-redux";
import type { I_AuthInfos } from "../../../../Types/interface";
import type { T_InputEvent } from "../../../../Types/type";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import SwitchAccountOutlinedIcon from "@mui/icons-material/SwitchAccountOutlined";
import Button from "../../../../Components/DesignSystem/Button";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import LockOutlineRoundedIcon from "@mui/icons-material/LockOutlineRounded";
import emailTest from "../../../../RegEx/emailTest";

type T_inputVals = {
  name: string;
  username: string;
  tel?: string;
  email: string;
  password: string;
};

function EditUserModal({ closeAlert }: { closeAlert: () => void }) {
  const authInfos = useSelector(
    (state: { authInfos: { values: I_AuthInfos } }) => state.authInfos.values
  );

  const [isShowPasswordPage, setIsShowPasswordPage] = useState(false);

  const [inputValues, setInputValues] = useState<T_inputVals>({
    name: "",
    username: "",
    tel: "",
    email: "",
    password: "",
  });
  const { name, username, tel, email, password } = inputValues;

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [isChenged, setIsChenged] = useState(false);

  const updateUserHandler = async () => {
    try {
      const res = await (
        await fetch("http://localhost:4000/v1/users", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authInfos.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            name,
            email,
            password,
            phone: tel,
          }),
        })
      ).json();
      closeAlert()
      console.log(res);
    } catch (error) {

    }
  };

  const accountChangeSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.entries(errorMessages).every((error) => error[1] === "")) {
      updateUserHandler();
    }
  };

  useEffect(() => {
    if (!name) {
      setErrorMessages((prev) => ({ ...prev, name: "error!" }));
    } else {
      setErrorMessages((prev) => ({ ...prev, name: "" }));
    }

    if (!username) {
      setErrorMessages((prev) => ({ ...prev, username: "error!" }));
    } else {
      setErrorMessages((prev) => ({ ...prev, username: "" }));
    }

    if (!email || !emailTest(email)) {
      setErrorMessages((prev) => ({ ...prev, email: "error!" }));
    } else {
      setErrorMessages((prev) => ({ ...prev, email: "" }));
    }

    if (!password) {
      setErrorMessages((prev) => ({ ...prev, password: "error!" }));
    } else {
      setErrorMessages((prev) => ({ ...prev, password: "" }));
    }

    if (
      name === authInfos.userInfos?.name &&
      username === authInfos.userInfos?.username &&
      email === authInfos.userInfos?.email
    ) {
      setIsChenged(false);
    } else {
      setIsChenged(true);
    }
  }, [name, username, email, password]);

  useEffect(() => {
    authInfos.userInfos &&
      setInputValues({
        name: authInfos.userInfos.name,
        username: authInfos.userInfos.username,
        tel: authInfos.userInfos.phone ? authInfos.userInfos.phone : undefined,
        email: authInfos.userInfos.email,
        password: "",
      });
  }, [closeAlert]);

  return (
    <div className="sidebarP z-50 px-5 py-6 rounded-lg bg-neut-prim-panel dark:bg-d-neut-prim-panel w-[90vw] max-h-[90vh] overflow-y-auto max-w-[26rem] fixed bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2">
      <div>
        <div className="flex mb-14 justify-between items-center">
          <div className="text-xl font-[dana-b]">ویرایش حساب کاربری</div>
          <div onClick={closeAlert} className="cursor-pointer">
            <CloseRoundedIcon />
          </div>
        </div>
        <div className="grid grid-cols-2 mb-8">
          <div
            onClick={() => setIsShowPasswordPage(false)}
            className={`${
              isShowPasswordPage ? "" : "text-prim !border-prim"
            } font-[dana-xl] text-center cursor-pointer pb-3 border-b-2 border-neutral-300 dark:border-neutral-600`}
          >
            حساب کاربری
          </div>
          <div
            onClick={() => setIsShowPasswordPage(true)}
            className={`${
              isShowPasswordPage ? "text-prim !border-prim" : ""
            } font-[dana-xl] text-center cursor-pointer pb-3 border-b-2 border-neutral-300 dark:border-neutral-600`}
          >
            رمز عبور
          </div>
        </div>
      </div>
      <div>
        {!isShowPasswordPage ? (
          <form>
            <div>
              <div className="text-xs font-[dana-b] ps-2 pb-2">نام کامل</div>
              <FormInput
                isAdminRegister
                value={name}
                setValue={(e: T_InputEvent) =>
                  setInputValues({ ...inputValues, name: e.target.value })
                }
                errorMessage={errorMessages.name}
                isSubmited={false}
                placeholder="نام و نام‌خانوادگی"
                icon={<SwitchAccountOutlinedIcon />}
              />
            </div>
            <div>
              <div className="text-xs font-[dana-b] ps-2 pb-2">نام کاربری</div>
              <FormInput
                isAdminRegister
                value={username}
                setValue={(e: T_InputEvent) =>
                  setInputValues({ ...inputValues, username: e.target.value })
                }
                errorMessage={errorMessages.username}
                isSubmited={false}
                placeholder="نام کاربری"
                icon={<PersonOutlineRoundedIcon />}
              />
            </div>
            <div>
              <div className="text-xs font-[dana-b] ps-2 pb-2">ایمیل</div>
              <FormInput
                isAdminRegister
                value={email}
                setValue={(e: T_InputEvent) =>
                  setInputValues({ ...inputValues, email: e.target.value })
                }
                errorMessage={errorMessages.email}
                isSubmited={false}
                placeholder="آدرس ایمیل"
                icon={<MailOutlineRoundedIcon />}
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button
                onClick={() => setIsShowPasswordPage(true)}
                disable={
                  Boolean(errorMessages.email) ||
                  Boolean(errorMessages.name) ||
                  Boolean(errorMessages.username) ||
                  !isChenged
                }
                styles="!text-sm !flex !items-center !px-4 !py-2.5 !bg-neutral-600 !text-white/90 dark:!bg-neutral-400 dark:!text-black/90"
              >
                <div className="font-[dana-b]">بعدی</div>
                <KeyboardBackspaceRoundedIcon
                  className="mt-0.5"
                  sx={{ fontSize: 18 }}
                />
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={accountChangeSubmitHandler} className="text-bl">
            <div>
              <div className="text-xs font-[dana-b] ps-2 pb-2">رمزعبور</div>
              <FormInput
                isAdminRegister
                value={password}
                setValue={(e: T_InputEvent) =>
                  setInputValues({ ...inputValues, password: e.target.value })
                }
                errorMessage={errorMessages.password}
                isSubmited={false}
                placeholder="رمزعبور را وارد کنید"
                icon={<LockOutlineRoundedIcon />}
                type="password"
              />
            </div>
            <div className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
              لطفا برای ذخیره تغییرات رمزعبور خود را وارد کنید. و در صورت تمایل
              به تغییر آن رمزعبور جدید را وارد نمایید
            </div>
            <div className="flex pt-4 justify-end">
              <Button
                disable={
                  Object.entries(errorMessages).some(
                    (error) => error[1] !== ""
                  ) || password.length < 8
                }
                styles="!text-sm !flex !items-center !px-4 !py-2.5 !bg-neutral-600 !text-white/90 dark:!bg-neutral-400 dark:!text-black/90"
              >
                ذخیره تغییرات
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditUserModal;

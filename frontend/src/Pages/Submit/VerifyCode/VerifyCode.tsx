import { Link } from "react-router";
import SubmitTemplate from "../components/SubmitTemplate/SubmitTemplate";
import Button from "../../../Components/DesignSystem/Button";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import { useEffect, useState, useRef } from "react";
import VerifyCodeInput from "../components/VerifyCodeInput/VerifyCodeInput";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { I_AuthInfos } from "../../../Types/interface";

function VerifyCode() {
  const [isSubmited, setIsSubmited] = useState(false);

  const [count, setCount] = useState(59);

  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [code4, setCode4] = useState("");
  const [code5, setCode5] = useState("");

  const authInfos = useSelector(
    (state: { authInfos: { values: I_AuthInfos } }) => state.authInfos.values
  );

  const inputTarget1 = useRef<HTMLInputElement>(null);
  const inputTarget2 = useRef<HTMLInputElement>(null);
  const inputTarget3 = useRef<HTMLInputElement>(null);
  const inputTarget4 = useRef<HTMLInputElement>(null);
  const inputTarget5 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    !code1 &&
      !code2 &&
      !code3 &&
      !code4 &&
      !code5 &&
      (inputTarget1.current as HTMLInputElement).focus();
    code1 &&
      !code2 &&
      !code3 &&
      !code4 &&
      (inputTarget2.current as HTMLInputElement).focus();
    code1 &&
      code2 &&
      !code3 &&
      !code4 &&
      (inputTarget3.current as HTMLInputElement).focus();
    code1 &&
      code2 &&
      code3 &&
      !code4 &&
      (inputTarget4.current as HTMLInputElement).focus();
    code1 &&
      code2 &&
      code3 &&
      code4 &&
      (inputTarget5.current as HTMLInputElement).focus();
  }, [code1, code2, code3, code4]);

  useEffect(() => {
    let increaseCount = setInterval(() => {
      count >= 0 && setCount((prevCount) => prevCount - 1);
    }, 1000);
    return () => clearInterval(increaseCount);
  }, [count]);

  const empityHandler = () => {
    setCode1("");
    setCode2("");
    setCode3("");
    setCode4("");
    setCode5("");
  }

  const agineSendHandler = () => {
    setIsSubmited(false);
    empityHandler()
    count < 0 && setCount(59);
  };

  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmited(true);
    if (code1 && code2 && code3 && code4 && code5) {
      setIsSubmited(false);
      empityHandler()
      navigate("/");
    }
  };

  return (
    <SubmitTemplate
      title={
        <div className="flex justify-between items-center content-center">
          <div>کد تایید</div>
          <div className="opacity-25">
            <Link to={"/login"}>
              <div className="hover:-translate-x-0.5">
                <ArrowCircleLeftRoundedIcon />
              </div>
            </Link>
          </div>
        </div>
      }
      question={
        <div className="text-gray-900/75 dark:text-gray-100/75">
          کد تایید برای{" "}
          <span>{authInfos.userInfos?.email}</span> ارسال شد.
        </div>
      }
    >
      <>
        <form onSubmit={submitHandler} className="py-6">
          <div className="flex gap-1 justify-between flex-row-reverse">
            <VerifyCodeInput
              ref={inputTarget1}
              value={code1}
              setValue={setCode1}
              isSubmited={isSubmited}
            />
            <VerifyCodeInput
              ref={inputTarget2}
              value={code2}
              setValue={setCode2}
              isSubmited={isSubmited}
            />
            <VerifyCodeInput
              ref={inputTarget3}
              value={code3}
              setValue={setCode3}
              isSubmited={isSubmited}
            />
            <VerifyCodeInput
              ref={inputTarget4}
              value={code4}
              setValue={setCode4}
              isSubmited={isSubmited}
            />
            <VerifyCodeInput
              ref={inputTarget5}
              value={code5}
              setValue={setCode5}
              isSubmited={isSubmited}
            />
          </div>
          <Button styles="!w-full !py-3 !mt-6">تایید</Button>
        </form>
        <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm">
          <Link to={"/terms-condition"} className="underline">
            حریم خصوصی
          </Link>
          <div onClick={agineSendHandler} className="cursor-pointer">
            ارسال دوباره{" "}
            {count >= 0 && (
              <span className="font-[irsans]">
                (00:{count > 9 ? count : `0${count}`})
              </span>
            )}
          </div>
        </div>
      </>
    </SubmitTemplate>
  );
}

export default VerifyCode;

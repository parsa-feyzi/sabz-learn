import { useContext, useEffect, useState } from "react";
import SubmitTemplate from "../components/SubmitTemplate/SubmitTemplate";
import FormInput from "../components/FormInput/FormInput";
import Button from "../../../Components/DesignSystem/Button";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import type {
  T_FormValues,
  T_InputEvent,
  T_setFormValues,
} from "../../../Types/type";
import type { I_errorMessagesContext } from "../../../Types/interface";

import { telValidator } from "../../../Founctions/Validation";
import { useNavigate } from "react-router";
import { errorMessagesContext } from "../../../context/AppContext";

function ForgetPass() {
  const [inputValues, setInputValues] = useState<T_FormValues>({ tel: "" });

  const { tel } = inputValues;

  const { errorMessages, setErrorMessages } =
    useContext<I_errorMessagesContext>(errorMessagesContext);

  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!(errorMessages as T_FormValues).tel) {
      setInputValues({
        tel: "",
      });
      setIsSubmit(false);
      navigate("/");
    }
  };

  useEffect(() => {
    // tel validation
    {
      (setErrorMessages as T_setFormValues)((prev: T_FormValues) => ({
        ...prev,
        tel: telValidator(tel as string),
      }));
    }
  }, [inputValues]);

  return (
    <SubmitTemplate title="بازیابی رمز عبور" question="" link="" linkTitle="">
      <form onSubmit={submitHandler} className="py-6">
        <FormInput
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
        <Button styles="!w-full !py-3 !mt-6">ادامه</Button>
      </form>
    </SubmitTemplate>
  );
}

export default ForgetPass;

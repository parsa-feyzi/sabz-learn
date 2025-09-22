import SubmitTemplate from "../components/SubmitTemplate/SubmitTemplate";
import RegisterForm from "./RegisterForm";

function Register() {
  return (
    <>
      <SubmitTemplate
        title="عضویت"
        question="قبلا ثبت نام کرده اید؟"
        link="/login"
        linkTitle="وارد شوید"
      >
        <RegisterForm />
      </SubmitTemplate> 
    </>
  );
}

export default Register;

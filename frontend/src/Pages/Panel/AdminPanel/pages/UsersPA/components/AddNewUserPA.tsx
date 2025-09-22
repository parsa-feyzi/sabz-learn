import RegisterForm from "../../../../../Submit/Register/RegisterForm";
import DataCotainerBox from "../../../../components/DataCotainerBox/DataCotainerBox";

function AddNewUserPA() {
  return (
    <DataCotainerBox title="ثبت‌نام کاربر جدید">
      <div>
        <RegisterForm isAdminRegister />
      </div>
    </DataCotainerBox>
  );
}

export default AddNewUserPA;

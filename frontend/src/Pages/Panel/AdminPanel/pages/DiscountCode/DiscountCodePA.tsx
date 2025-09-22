import { useEffect, useState } from "react";
import DataCotainerBox from "../../../components/DataCotainerBox/DataCotainerBox";
import type {
  T_AlertIsShow,
  T_CoursesData,
  T_InputEvent,
  T_code,
  T_setAlertShow,
} from "../../../../../Types/type";
import WrapperLoader from "../../../../../Components/DesignSystem/WrapperLoader/WrapperLoader";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import CoverPageP from "../../../components/CoverPageP/CoverPageP";
import DeleteAlertPA from "../../../components/AlertP/DeleteAlertPA";
import FormInput from "../../../../Submit/components/FormInput/FormInput";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import Button from "../../../../../Components/DesignSystem/Button";
import React from "react";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import AllCodesListItemPA from "./components/AllCodesListItemPA";
import SearchByP from "../../../components/SearchByP/SearchByP";
import NotSearchRes from "../../../components/NotSearchRes/NotSearchRes";
import FormSelect from "../../../../Submit/components/FormSelect/FormSelect";
import { Link } from "react-router";
import Alert from "../../../../../Components/Alert/Alert";
import useAlertShow from "../../../../../Hooks/useAlertShow";

type inputValuesType = {
  code: string;
  max: "" | number;
  percent: "" | number;
  courseID: string;
};

function DiscountCodePA() {
  const [discounts, setDiscounts] = useState<T_code[] | null>(null);
  const [orderedDiscounts, setOrderedDiscounts] = useState<T_code[] | null>(
    null
  );

  const [courses, setCourses] = useState<T_CoursesData[] | null>(null);

  const [isSubmited, setIsSubmited] = useState(false);

  const [isReverse, setIsReverse] = useState(false);

  const [targetDiscount, setTargetDiscount] = useState<T_code | null>(null);

  const [isShowAlert, setIsShowAlert] = useState({ delete: false });

  const [discountOfAll, setDiscountOfAll] = useState("");

  const [inputValues, setInputValues] = useState<inputValuesType>({
    code: "",
    max: "",
    percent: "",
    courseID: "",
  });
  const { code, max, courseID, percent } = inputValues;

  const [errorMessages, setErrorMessages] = useState({
    code: "",
    max: "",
    percent: "",
    courseID: "",
  });

  const [successAlertDiscountOfAll, setSuccessAlertDiscountOfAll] = useAlertShow();

  const [successAlertDiscountCode, setSuccessAlertDiscountCode] = useAlertShow();

  const userDatas = JSON.parse(localStorage.getItem("user") as string);

  // Functions
  const closeAlerts = () => setIsShowAlert({ delete: false });

  const getAllCourses = async () => {
    try {
      const allCourses = await (
        await fetch(`http://localhost:4000/v1/courses`, {
          headers: {
            Authorization: `Bearer ${userDatas.token}`,
          },
        })
      ).json();
      setCourses(allCourses);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const getAllCodes = async () => {
    try {
      const discounts = await (
        await fetch(`http://localhost:4000/v1/offs`, {
          headers: {
            Authorization: `Bearer ${userDatas.token}`,
          },
        })
      ).json();
      setDiscounts(discounts);
      isReverse
        ? setOrderedDiscounts(discounts)
        : setOrderedDiscounts(discounts.reverse());
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  // create new discount of all
  const createNewDiscountOFAll = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/v1/offs/all`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userDatas.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ discount: discountOfAll }),
      }); 
      if(res.ok){
        (setSuccessAlertDiscountOfAll as T_setAlertShow)();   
        setDiscountOfAll("")
      }
    } 
    catch (error) {
      throw new Error(`${error}`);
    }
  };

  // add new code
  const addNewCode = async () => {
    try {
      const res = await fetch(`http://localhost:4000/v1/offs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userDatas.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          percent: percent.toString(),
          course: courseID,
          max: max.toString(),
        }),
      });
      res.ok && (setSuccessAlertDiscountCode as T_setAlertShow)()
      getAllCodes();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmited(true);
    if (!errorMessages.code && !errorMessages.max && !errorMessages.percent) {
      addNewCode();
      setIsSubmited(false);
      setInputValues(() => ({
        code: "",
        percent: "",
        max: "",
        courseID: "",
      }));
    }
  };

  // delete code
  const deleteCodeHandler = async () => {
    try {
      await fetch(`http://localhost:4000/v1/offs/${targetDiscount?._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userDatas.token}`,
        },
      });
      getAllCodes();
      closeAlerts();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const deleteCode = (code: T_code) => {
    setTargetDiscount(code);
    setIsShowAlert((prev) => ({ ...prev, delete: true }));
  };

  useEffect(() => {
    if (!code) {
      setErrorMessages((prevError) => ({
        ...prevError,
        code: "لطفا کد تخفیف را وارد نمایید",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, code: "" }));
    }

    if (!percent) {
      setErrorMessages((prevError) => ({
        ...prevError,
        percent: "لطفا درصد تخفیف را وارد نمایید",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, percent: "" }));
    }

    if (!max) {
      setErrorMessages((prevError) => ({
        ...prevError,
        max: "لطفا سقف استفاده را وارد نمایید",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, max: "" }));
    }

    if (!courseID) {
      setErrorMessages((prevError) => ({
        ...prevError,
        courseID: "error!",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, courseID: "" }));
    }
  }, [code, max, percent, courseID]);

  useEffect(() => {
    getAllCourses();
    getAllCodes();
  }, []);

  return (
    <>
      {(successAlertDiscountOfAll as T_AlertIsShow).isShow && (
        <Alert
          isPanelAlert
          message={`تخفیف همگانی با موفقیت بر روی دوره ها اعمال شد`}
        />
      )}
      {(successAlertDiscountCode as T_AlertIsShow).isShow && (
        <Alert
          isPanelAlert
          message={`کد تخفیف با موفقیت ساخته شد`}
        />
      )}
      <div>
        <DataCotainerBox title={"برگزاری تخفیف همگانی"}>
          <form onSubmit={(e) => discountOfAll && createNewDiscountOFAll(e)}>
            <div>
              <FormInput
                isAdminRegister
                value={discountOfAll}
                setValue={(e: T_InputEvent) =>
                  (parseInt(e.target.value) <= 100 || !e.target.value.length) &&
                  parseInt(e.target.value) / 1 === parseInt(e.target.value)
                    ? setDiscountOfAll(parseInt(e.target.value).toString())
                    : setDiscountOfAll("")
                }
                errorMessage={""}
                isSubmited={false}
                placeholder="در صد تخفیف را وارد نمایید"
                icon={<LocalOfferOutlinedIcon />}
                type="tel"
              />
            </div>
            <div className="flex sm:justify-between justify-center flex-wrap gap-4 items-center ps-2">
              <div className="sm:text-sm text-[13px] text-neutral-700 dark:text-neutral-300 sm:doot">
                این تخفیف تمامی دوره های{" "}
                <Link className="text-prim font-[dana-b]" to={"/"}>
                  سبزلرن
                </Link>{" "}
                رو شامل میشه!
              </div>
              <Button
                disable={!discountOfAll}
                styles="md:!w-48 !w-full !py-[10px]"
              >
                ایجاد
              </Button>
            </div>
          </form>
        </DataCotainerBox>
        <DataCotainerBox title="ایجاد کد تخفیف جدید">
          <div>
            <form onSubmit={submitHandler} className="">
              <div className="grid sm:grid-cols-2 gap-x-4">
                <FormInput
                  isAdminRegister
                  value={code}
                  setValue={(e: T_InputEvent) =>
                    setInputValues({ ...inputValues, code: e.target.value })
                  }
                  errorMessage={errorMessages.code}
                  isSubmited={isSubmited}
                  placeholder="کد تخفیف را وارد نمایید"
                  icon={<CodeOutlinedIcon />}
                />
                <FormInput
                  isAdminRegister
                  value={percent as string}
                  setValue={(e: T_InputEvent) =>
                    (parseInt(e.target.value) <= 100 ||
                      !e.target.value.length) &&
                    setInputValues({
                      ...inputValues,
                      percent:
                        parseInt(e.target.value) / 1 ===
                        parseInt(e.target.value)
                          ? parseInt(e.target.value)
                          : "",
                    })
                  }
                  errorMessage={errorMessages.percent}
                  isSubmited={isSubmited}
                  placeholder=" درصد تخفیف را وارد نمایید"
                  icon={<LocalOfferOutlinedIcon />}
                  type="tel"
                />
                <FormInput
                  isAdminRegister
                  value={max as string}
                  setValue={(e: T_InputEvent) =>
                    setInputValues({
                      ...inputValues,
                      max:
                        parseInt(e.target.value) / 1 ===
                        parseInt(e.target.value)
                          ? parseInt(e.target.value)
                          : "",
                    })
                  }
                  errorMessage={errorMessages.max}
                  isSubmited={isSubmited}
                  placeholder="سقف استفاده را وارد نمایید"
                  icon={<RemoveCircleOutlineOutlinedIcon />}
                  type="tel"
                />
                <FormSelect
                  onChange={(id: string) =>
                    setInputValues({
                      ...inputValues,
                      courseID: id,
                    })
                  }
                  options={courses}
                  value={courseID}
                  placeholder={"-- دوره مد نظر را انتخاب کنید --"}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  disable={Object.entries(errorMessages).some(
                    (error) => error[1] !== ""
                  )}
                  styles="md:!w-48 !w-full !py-[10px]"
                >
                  ایجاد
                </Button>
              </div>
            </form>
          </div>
        </DataCotainerBox>
        <DataCotainerBox
          title="لیست کدهای تخفیف"
          action={
            <div className="flex sm:gap-4 gap-2">
              <SearchByP
                searchFields={[
                  { title: "کد", value: "code" },
                  { title: "درصد تخفیف", value: "percent" },
                ]}
                list={discounts}
                setList={setOrderedDiscounts}
                placeholder="کدها"
              />
              <div
                onClick={() => {
                  setOrderedDiscounts(
                    [...(orderedDiscounts as T_code[])]?.reverse()
                  );
                  setIsReverse(!isReverse);
                }}
                className="btn btn-sm btn-neut"
              >
                <FilterListRoundedIcon
                  fontSize="small"
                  className={isReverse ? "rotate-180" : ""}
                />
              </div>
            </div>
          }
        >
          <div className="panel_table overflow-x-auto h-[72vh] lg:max-w-[calc(100vw-26.5rem)] md:max-w-[calc(100vw-18.5rem)]">
            {orderedDiscounts && (
              <>
                {orderedDiscounts.length !== 0 ? (
                  <div className="min-w-max sm:min-w-[900px] relative">
                    <div className="admin_Panel_Hs_Table flex text-sm items-center sm:grid grid-cols-20 sm:grid-cols-12 *:shrink-0">
                      <div className="w-auto col-span-1 text-center">
                        <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                          شناسه
                        </span>
                      </div>
                      <div className="w-auto col-span-2 text-center">
                        <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                          کد
                        </span>
                      </div>
                      <div className="w-auto col-span-2 text-center">
                        <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                          درصد تخفیف
                        </span>
                      </div>
                      <div className="w-auto col-span-3 text-center">
                        <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                          دوره
                        </span>
                      </div>
                      <div className="w-auto col-span-2 text-center">
                        <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                          میزان استفاده
                        </span>
                      </div>
                      <div className="w-auto col-span-2 text-center">
                        <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body"></span>
                      </div>
                    </div>
                    <div className="*:odd:bg-d-neut-seco-panel">
                      {courses && orderedDiscounts?.length !== 0 ? (
                        orderedDiscounts?.map((code, index) => (
                          <AllCodesListItemPA
                            code={{ ...code }}
                            id={
                              isReverse
                                ? index
                                : orderedDiscounts.length - index - 1
                            }
                            index={index}
                            deleteCode={deleteCode}
                            courses={courses}
                            key={code._id}
                          />
                        ))
                      ) : (
                        <div className="h-36 pt-6 grid sm:place-content-center sm:ps-0 ps-[40vw]">
                          <WrapperLoader />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <NotSearchRes />
                )}
              </>
            )}
          </div>
        </DataCotainerBox>
      </div>
      {isShowAlert.delete && (
        <DeleteAlertPA
          deleteHandler={deleteCodeHandler}
          closeAlerts={closeAlerts}
          name={` کد ${targetDiscount?.code}`}
        />
      )}
      {isShowAlert.delete && <CoverPageP z="z-40" onClick={closeAlerts} />}
    </>
  );
}

export default DiscountCodePA;

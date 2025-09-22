import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import type { I_AuthInfos } from "../../Types/interface";
import CartContainerBox from "./components/CartContainerBox";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import { Link } from "react-router";
import Button from "../../Components/DesignSystem/Button";
import { useEffect, useMemo, useState } from "react";
import type {
  T_AlertIsShow,
  T_CoursesData,
  T_SingleCourseData,
  T_code,
  T_setAlertShow,
} from "../../Types/type";
import {
  removeAllCartItems,
  removeCartItem,
} from "../../Redux/slices/cartItemsSlice";
import PaymentDetailsBox from "./components/PaymentDetailsBox";
import CartItem from "./components/CartItem";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import CourseBox from "../../Components/CourseBox/CourseBox";
import SwiperBox from "../../Components/SwiperBox/SwiperBox";
import { SwiperSlide } from "swiper/react";
import EmpityCartImg from "./components/EmpityCartImg";
import CartSuccessAlert from "./components/CartAlerts/CartAlert";
import CoverPage from "../../Components/CoverPage/CoverPage";
import Alert from "../../Components/Alert/Alert";
import useAlertShow from "../../Hooks/useAlertShow";
import FormSelect from "../Submit/components/FormSelect/FormSelect";

function Cart() {
  const [price, setPrice] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  const [discount, setDiscount] = useState(0);

  const [targetCourseId, setTargetCourseId] = useState<string>("");

  const [isTermsCondition, setIsTermsCondition] = useState(false);

  const [isShowCodeInputToggle, setIsShowCodeInputToggle] = useState(false);

  const [discountCodVal, setDiscountCodVal] = useState("");

  const [courses, setCourses] = useState<T_CoursesData[] | null>(null);

  const [isShowSuccessAlert, setIsShowSuccessAlert] = useState(false);
  const [isShowErrorAlert, setIsShowErrorAlert] = useState(false);

  const cartItems = useSelector(
    (state: {
      cartItems: { value: { cartItems: null | T_SingleCourseData[] } };
    }) => state.cartItems.value.cartItems
  );

  const authInfos = useSelector(
    (state: { authInfos: { values: I_AuthInfos } }) => state.authInfos.values
  );

  const [successAlertIsShow, setSuccessAlertIsShow] = useAlertShow();
  const [errorAlertIsShow, setErrorAlertIsShow] = useAlertShow();

  const dispatch = useDispatch();

  const sendDiscountCodeHandler = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/v1/offs/${discountCodVal.trim()}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authInfos.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            course: targetCourseId,
          }),
        }
      );

      const discountCodeDatas: T_code = await res.json();

      switch (res.status) {
        case 404:
          (setErrorAlertIsShow as T_setAlertShow)(
            "کد تخفیف وارد شده معتبر نمیباشد!"
          );
          break;
        case 409:
          (setErrorAlertIsShow as T_setAlertShow)(
            "اعتبار کد تخفیف وارد شده به اتمام رسیده است."
          );
          break;
        case 200:
          setDiscountCodVal("");
          (setSuccessAlertIsShow as T_setAlertShow)();
          console.log(discountCodeDatas);
          setDiscount(parseInt(discountCodeDatas.percent));
          const targetCoursePrice = (
            cartItems?.find(
              (course) => course._id === targetCourseId
            ) as T_SingleCourseData
          ).price;
          setTotalPrice(
            totalPrice -
              targetCoursePrice +
              (targetCoursePrice -
                (targetCoursePrice * parseInt(discountCodeDatas.percent)) / 100)
          );

          break;
        default:
          console.log("erorr!");
          break;
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const sendDiscountCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (discountCodVal.trim()) {
      sendDiscountCodeHandler();
    }
  };

  const getCoursesHandler = async () => {
    try {
      const courses = await (
        await fetch(`http://localhost:4000/v1/courses`)
      ).json();
      setCourses(courses);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const removeCartItemHandler = (course: T_SingleCourseData) => {
    dispatch(removeCartItem(course));
  };

  const rejisterToCoursesHandler = () => {
    let isOkArray: boolean[] = [];
    cartItems?.forEach(async (course) => {
      try {
        const res = await fetch(
          `http://localhost:4000/v1/courses/${course._id}/register`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${authInfos.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              price:
                course._id === targetCourseId
                  ? (course.price - (price - totalPrice))
                  : course.price
            }),
          }
        );
        isOkArray.push(res.ok);
      } catch (error) {
        throw new Error(`${error}`);
      }
    });
    const allStatus = isOkArray.every((ok) => ok);
    if (allStatus) {
      dispatch(removeAllCartItems());
      setIsShowSuccessAlert(true);
    } else {
      setIsShowErrorAlert(true);
    }
  };

  const closeAlertsHandler = () => {
    setIsShowSuccessAlert(false);
    setIsShowErrorAlert(false);
  };

  useEffect(() => {
    if (cartItems && cartItems.length) {
      let initTotal = 0;
      let total = 0;
      if (cartItems.length > 1) {
          for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].discount) {
              initTotal += cartItems[i].price - (cartItems[i].discount / 100) * cartItems[i].price;
            } else {
              initTotal += cartItems[i].price;
            }
          }
          for (let i = 0; i < cartItems.length; i++) {
            total += cartItems[i].price;
          }
      } else {
        total = cartItems[0].price;
        cartItems[0].price && cartItems[0].discount && (initTotal += cartItems[0].price - (cartItems[0].discount / 100) * cartItems[0].price);
      }
      setTotalPrice(initTotal);
      setPrice(total);
    }
  }, [cartItems]);

  useEffect(() => {
    getCoursesHandler();
    {
      cartItems && cartItems.length && setTargetCourseId(cartItems[0]._id);
    }
  }, []);

  const SwiperSlidesList = useMemo(
    () =>
      courses &&
      courses.slice(0, 12).map((course, index) => (
        <SwiperSlide key={index}>
          <CourseBox courseDatas={course} noneDescription isSecoThem />
        </SwiperSlide>
      )),
    [courses]
  );

  return (
    <>
      {(successAlertIsShow as T_AlertIsShow).isShow && (
        <Alert message={`کد تخفیف با موفقیت اعمال شد`} />
      )}
      {(errorAlertIsShow as T_AlertIsShow).isShow && (
        <Alert
          message={(errorAlertIsShow as T_AlertIsShow).userFullName}
          alertThem="bg-error"
        />
      )}
      <Topbar />
      <div id="cart">
        <Navbar />
        {cartItems && cartItems.length ? (
          <div className="container_ pt-10">
            <div className="grid md:grid-cols-3 grid-cols-1 md:gap-6">
              <div className="md:col-span-2">
                <CartContainerBox
                  title="سبد خرید"
                  icon={<LocalMallOutlinedIcon fontSize="large" />}
                >
                  {cartItems?.map((course, index) => (
                    <CartItem
                      course={course}
                      cartItems={cartItems}
                      removeCartItemHandler={removeCartItemHandler}
                      index={index}
                      key={course._id}
                    />
                  ))}
                </CartContainerBox>
              </div>
              <div className="md:col-span-1">
                <CartContainerBox
                  title="اطلاعات پرداخت"
                  icon={<LocalAtmOutlinedIcon fontSize="large" />}
                >
                  <div className="flex flex-col gap-4">
                    <PaymentDetailsBox
                      title="مبلغ کل"
                      price={price ? price : "رایگان!"}
                    />
                    {discount !== 0 ||
                      (cartItems.find(
                        (item) => item.discount && item.price
                      ) && (
                        <div className="!text-red-600">
                          <PaymentDetailsBox
                            title="تخفیف"
                            price={price - totalPrice}
                            precent={((price - totalPrice) / price) * 100}
                          />
                        </div>
                      ))}
                    <PaymentDetailsBox title="موجودی کیف پول" price={0} />
                  </div>
                  <div className="pt-3">
                    <div className="items-end mb-4 pt-4 lbt">
                      <PaymentDetailsBox
                        isLarge
                        title="مجموع:"
                        price={totalPrice}
                      />
                    </div>
                    <div>
                      {authInfos.isLogin ? (
                        <div>
                          <div className="flex items-center gap-2 cursor-pointer pb-4">
                            <div
                              onClick={() =>
                                setIsTermsCondition(!isTermsCondition)
                              }
                              className={`${
                                isTermsCondition
                                  ? "bg-notf"
                                  : "bg-gray-300 dark:bg-d-neut-ther"
                              } size-[14px] rounded-sm`}
                            ></div>
                            <div className="text-sm pt-0.5 text-gray-600 dark:text-gray-400">
                              <span
                                onClick={() =>
                                  setIsTermsCondition(!isTermsCondition)
                                }
                                className="font-[dana-xl]"
                              >
                                قوانین را مطالعه نموده ام.
                              </span>{" "}
                              <Link
                                className="text-notf"
                                to={"/terms-condition"}
                              >
                                (مشاهده)
                              </Link>
                            </div>
                          </div>
                          <Button
                            onClick={rejisterToCoursesHandler}
                            disable={!isTermsCondition}
                            styles="!w-full !py-3"
                          >
                            تکمیل خرید
                          </Button>
                        </div>
                      ) : (
                        <Link to={"/login"}>
                          <Button styles="!w-full !py-3">ورود و ادامه</Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </CartContainerBox>
                <div className="mb-8">
                  <div className="bg-neut-prim dark:bg-d-neut-prim p-5 rounded-lg mt-6">
                    <div
                      onClick={() =>
                        setIsShowCodeInputToggle((prevToggle) => !prevToggle)
                      }
                      className="flex cursor-pointer text-gray-600 dark:text-gray-400 justify-between gap-2 items-center content-center"
                    >
                      <div className="font-[dana-xl]">کد تخفیف دارید؟</div>
                      <div>
                        <div
                          className={
                            isShowCodeInputToggle ? "rotate-90" : "-rotate-90"
                          }
                        >
                          <ArrowBackIosRoundedIcon fontSize="small" />
                        </div>
                      </div>
                    </div>
                    {isShowCodeInputToggle && (
                      <div className="pt-5 mt-5 border-t-2 border-gray-500/25">
                        {authInfos.isLogin ? (
                          <>
                            {cartItems.length > 1 && (
                              <div>
                                <div className="text-sm mb-1 opacity-80">
                                  کد تخفیف برای کدام دوره اعمال شود؟
                                </div>
                                <FormSelect
                                  onChange={(id: string) =>
                                    setTargetCourseId(id)
                                  }
                                  options={cartItems}
                                  value={targetCourseId}
                                  placeholder=""
                                  isNotPanelSelect
                                />
                              </div>
                            )}
                            <form
                              onSubmit={sendDiscountCode}
                              className="bg-neut-seco dark:bg-d-neut-ther rounded-xl overflow-hidden p-2 flex"
                            >
                              <input
                                onChange={(e) =>
                                  setDiscountCodVal(e.target.value)
                                }
                                value={discountCodVal}
                                type="text"
                                className="bg-neut-seco text-[13px] px-2 outline-none dark:bg-d-neut-ther w-full"
                                placeholder="کد تخفیف را وارد کنید"
                              />
                              <Button styles="!bg-notf !opacity-100 !shadow-none !text-sm !font-[dana-l] !px-2">
                                اعمال
                              </Button>
                            </form>
                          </>
                        ) : (
                          <div>برای وارد کردن کد تخفیف اول وارد شدید</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <CartContainerBox
                title="دوره های مخصوص شما"
                icon={<RocketLaunchOutlinedIcon fontSize="large" />}
              >
                <div className="rounded-lg overflow-hidden">
                  <SwiperBox delay={4000} spaceBetween={44}>
                    <>{SwiperSlidesList}</>
                  </SwiperBox>
                </div>
              </CartContainerBox>
            </div>
          </div>
        ) : (
          <div className="container_ pt-10">
            <div className="w-full bg-neut-prim dark:bg-d-neut-prim px-6 py-24 grid place-content-center rounded-xl">
              <div className="flex justify-center">
                <EmpityCartImg />
              </div>
              <div className="py-8 text-center text-lg font-[dana-xl]">
                سبد خرید شما خالی است برای مشاهده لیست دوره ها کلیک کنید
              </div>
              <div className="flex justify-center">
                <Link to={"/category-courses/courses"}>
                  <Button styles="w-72 !py-3">لیست دوره‌ها</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
      {isShowSuccessAlert && (
        <CartSuccessAlert setIsShow={setIsShowSuccessAlert} status="succes" />
      )}
      {isShowErrorAlert && (
        <CartSuccessAlert setIsShow={setIsShowErrorAlert} status="error" />
      )}
      {(isShowSuccessAlert || isShowErrorAlert) && (
        <CoverPage closeHandler={closeAlertsHandler} />
      )}
    </>
  );
}

export default Cart;

import { Link } from "react-router";
import { useEffect, useState } from "react";
import type {
  T_AlertIsShow,
  T_CoursesData,
  T_SingleCourseData,
  T_setAlertShow,
} from "../../Types/type";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { numberSeparator } from "../../Founctions/NumberSeparator";
import OutButton from "../DesignSystem/OutButton";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../Redux/slices/cartItemsSlice";
import useAlertShow from "../../Hooks/useAlertShow";
import Alert from "../Alert/Alert";

function CourseBox({
  courseDatas,
  isSecoThem,
  noneDescription
}: {
  courseDatas: T_CoursesData;
  isSecoThem?: boolean;
  noneDescription?: boolean
}) {
  const {
    shortName,
    name,
    cover,
    creator,
    description,
    registers,
    price,
    discount,
    courseAverageScore,
  } = courseDatas;

  const [initPrice, setInitPrice] = useState<number>(price);

  const cartItems = useSelector(
    (state: {
      cartItems: { value: { cartItems: null | T_SingleCourseData[] } };
    }) => state.cartItems.value.cartItems
  );

  const [warningAlertIsShow, setWarningAlertIsShow] = useAlertShow();

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    {
      dispatch(addCartItem(courseDatas as unknown as T_SingleCourseData));
    }
    if (
      cartItems?.find(
        (course: T_SingleCourseData) => course._id === courseDatas?._id
      )
    ) {
      (setWarningAlertIsShow as T_setAlertShow)(courseDatas?.name);
    }
  };

  useEffect(() => {
    if (discount) {
      const discountPrice: number = (discount * price) / 100;
      setInitPrice((prevPrice) =>
        prevPrice === price ? prevPrice - discountPrice : prevPrice
      );
    }
  }, []);

  return (
    <>
      {(warningAlertIsShow as T_AlertIsShow).isShow && (
        <Alert
          message={`دوره ${
            (warningAlertIsShow as T_AlertIsShow).userFullName
          } در سبد خرید شما وجود دارد`}
          alertThem="bg-warn"
        />
      )}
      <div className="bg-seco rounded-xl overflow-hidden duration-300 h-full  hover:opacity-95 bg-neut-prim dark:bg-d-neut-prim">
        <div className={isSecoThem ? "h-36" : "h-40"}>
          <Link className="block size-full" to={`/course-info/${shortName}`}>
            <img
              className="rounded-xl size-full object-cover"
              src={`http://localhost:4000/courses/covers/${cover}`}
            />
          </Link>
        </div>
        <div
          className={`${
            isSecoThem ? "h-[calc(100%-11.6rem)]" : "h-[calc(100%-10rem)]"
          } p-4 flex flex-col justify-between gap-3`}
        >
          <div>
            <Link to={`/course-info/${shortName}`}>
              <div className="line-clamp-2 font-[dana-b] pb-2">{name}</div>
            </Link>
            {noneDescription || (
              <div className="line-clamp-2 mb-0 text-sm text-gray-500 dark:text-gray-400">
                {description}
              </div>
            )}
          </div>
          <div>
            <div
              className={`${
                isSecoThem ? "pb-1 mb-2" : "lbb pb-3 mb-4"
              } flex justify-between`}
            >
              <div className="flex gap-1 items-center content-center">
                {isSecoThem || (
                  <div>
                    <PersonOutlineRoundedIcon />
                  </div>
                )}
                <div
                  className={`${
                    isSecoThem
                      ? "text-xs text-gray-700 dark:text-gray-300 font-[dana-xl]"
                      : "text-sm"
                  }`}
                >
                  {creator}
                </div>
              </div>
              <div className="flex gap-1 text-amber-500 dark:text-amber-400 items-center content-center">
                <div className="font-[irsans] font-bold text-sm mt-0.5">
                  {courseAverageScore.toString().length === 1
                    ? `${courseAverageScore}.0`
                    : courseAverageScore}
                </div>
                <div>
                  <StarRoundedIcon />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex gap-1 text-gray-500 dark:text-gray-400 items-center content-center">
                <div>
                  <PeopleAltOutlinedIcon fontSize="small" />
                </div>
                <div className="font-[irsans] text-sm">{registers}</div>
              </div>
              <div className="flex gap-2 p-0 items-center">
                {discount !== 0 && price !== 0 && (
                  <div className="font-[irsans] size-8 rounded-md grid place-content-center bg-prim dark:bg-prim/80 text-neut-prim text-sm font-bold">
                    {discount}%
                  </div>
                )}
                <div>
                  {discount != 0 && price !== 0 && (
                    <div className="font-[irsans] text-sm text-gray-500 dark:text-gray-400 line-through">
                      {price && price.toLocaleString()}
                    </div>
                  )}
                  {discount !== 100 && initPrice ? (
                    <div className="flex gap-1 text-prim font-bold items-end">
                      <div className="font-[irsans] font-bold text-lg">
                        {initPrice && initPrice.toLocaleString()}
                      </div>
                      <div className="text-sm">تومان</div>
                    </div>
                  ) : (
                    <div className="!font-[dana-b] text-lg text-prim">
                      رایگان!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {isSecoThem && <a href="#cart">
          <OutButton onClick={addToCartHandler} styles="!w-full !text-sm">افزودن به سبد خرید</OutButton>
        </a>}
      </div>
    </>
  );
}

export default CourseBox;

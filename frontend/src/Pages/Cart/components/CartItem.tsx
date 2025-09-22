import { Link } from "react-router";
import type { T_SingleCourseData } from "../../../Types/type";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";

type T_CartItem = {
  course: T_SingleCourseData;
  cartItems: T_SingleCourseData[];
  removeCartItemHandler: (course: T_SingleCourseData) => void;
  index: number;
};

function CartItem({ course, cartItems, removeCartItemHandler, index }: T_CartItem) {

  const discountHandler = (course: T_SingleCourseData) => {
    let InitPrice: number;
    if (course.discount) {
      const discountPrice: number = (course.discount * course.price) / 100;
      InitPrice = course.price - discountPrice;
    } else {
      InitPrice = course.price;
    }
    return InitPrice;
  };

  return (
    <div
      className={`${
        index + 1 === cartItems.length ? "" : "pb-4 lbb mb-4"
      } flex gap-12 justify-between items-center`}
    >
      <Link
        to={`/course-info/${course.shortName}`}
        className="sm:flex w-full justify-between relative items-center gap-6"
      >
        <div className="sm:flex items-center gap-4">
          <div className="sm:w-[9.5rem] sm:min-w-[9.5rem] lg:block md:hidden w-full sm:mb-0 mb-4">
            <img
              className="size-full rounded-lg"
              src={`http://localhost:4000/courses/covers/${course?.cover}`}
              alt=""
            />
          </div>
          <div className="">
            <div className="font-[dana-xl] sm:pb-2 pb-6 line-clamp-2 sm:text-right text-center">
              {course.name}
            </div>
            <div className="flex justify-between items-center">
              <div className="text-zinc-700 dark:text-zinc-300 text-sm">
                {course.creator.name
                  ? course.creator.name
                  : (course.creator as any)}
              </div>
              <div className="text-prim sm:hidden block">
                {course.price ? (
                  <div>
                    {course.discount && <div className="text-sm font-[irsans] font-bold line-through text-neutral-500 dark:text-neutral-400">{course.price.toLocaleString()}</div>}
                    <div className="flex gap-1 items-end">
                      <div className="font-[irsans] text-xl font-bold">
                        {discountHandler(course).toLocaleString()}
                      </div>
                      <div className="text-sm font-[dana-xl]">تومان</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-lg font-[dana-b]">رایگان!</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="text-prim sm:block hidden">
          {course.price ? (
            <div>
              {course.discount !== 0 && <div className="text-sm font-[irsans] font-bold line-through text-neutral-500 dark:text-neutral-400">{course.price.toLocaleString()}</div>}
              <div className="flex gap-1 items-end">
                <div className="font-[irsans] text-xl font-bold">
                  {discountHandler(course).toLocaleString()}
                </div>
                <div className="text-sm font-[dana-xl]">تومان</div>
              </div>
            </div>
          ) : (
            <div className="text-lg font-[dana-b]">رایگان!</div>
          )}
        </div>
        <div
          onClick={() => removeCartItemHandler(course)}
          className="sm:hidden block absolute top-2 right-2 text-red-300/80"
        >
          <DisabledByDefaultRoundedIcon />
        </div>
      </Link>
      <div
        onClick={() => removeCartItemHandler(course)}
        className="text-zinc-600 dark:text-zinc-400 sm:block hidden cursor-pointer hover:!text-red-600 active:scale-90"
      >
        <DeleteOutlineIcon fontSize="small" />
      </div>
    </div>
  );
}

export default CartItem;

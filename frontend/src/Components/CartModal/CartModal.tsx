import { useEffect, useState } from "react";
import type { T_SingleCourseData } from "../../Types/type";
import Button from "../DesignSystem/Button";
import { Link } from "react-router";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "react-redux";
import { removeCartItem } from "../../Redux/slices/cartItemsSlice";
import { showCartModalTagle } from "../../Redux/slices/isShowCartModalSlice";

type T_CartModal = { cartItems: T_SingleCourseData[] | null };

function CartModal({ cartItems }: T_CartModal) {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (cartItems && cartItems.length) {
      let total = 0;
      if (cartItems.length > 1) {
        for (let i = 0; i < cartItems.length; i++) {
          total += discountHandler(cartItems[i]);
        }
      } else {
        total = discountHandler(cartItems[0]);
      }

      setTotalPrice(total);
    }
  }, [cartItems]);

  const removeCartItemHandler = (course: T_SingleCourseData) => {
    dispatch(removeCartItem(course));
  };

  const discountHandler = (course: T_SingleCourseData) => {
    let InitPrice: number
    if (course.discount) {
      const discountPrice: number = (course.discount * course.price) / 100;
      InitPrice =  course.price - discountPrice 
    }
    else {
      InitPrice = course.price
    }
    return InitPrice
  }

  return (
    <div className="absolute text-d-neut-seco dark:!text-white z-[5] top-14 sm:-left-2 left-2 bg-neut-prim dark:bg-d-neut-prim overflow-hidden rounded-lg sm:w-[362px] w-80">
      <div className="bg-sky-700/10 dark:bg-sky-600/10 flex justify-between px-5 py-4">
        <div className="text-notf font-[dana-b]">سبد خرید من</div>
        <div className="font-[dana-b] text-gray-500">
          <span className="font-[irsans] font-bold">
            {cartItems ? cartItems?.length : 0}
          </span>{" "}
          دوره
        </div>
      </div>
      {cartItems?.length ? (
        <div className="pt-3">
          <div
            className={`${
              cartItems.length > 1 ? "pt-2" : ""
            } modal_cart_row px-5 pb-0 max-h-60 overflow-y-auto`}
          >
            {cartItems.map((course, index) => (
              <div
                className={`${
                  cartItems.length === index + 1 ? "py-2" : "pb-4"
                } flex gap-4 justify-between items-center`}
              >
                <Link
                  onClick={() => dispatch(showCartModalTagle())}
                  to={`/course-info/${course.shortName}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-[6.5rem] min-w-[6.5rem]">
                      <img
                        className="size-full rounded-lg"
                        src={`http://localhost:4000/courses/covers/${course?.cover}`}
                        alt=""
                      />
                    </div>
                    <div className="">
                      <div className="text-sm font-[dana-xl] mb-0.5 line-clamp-2">
                        {course.name}
                      </div>
                      <div className="text-zinc-700 dark:text-zinc-300 text-sm">
                        {course.price ? (
                          <div className="flex items-end gap-0.5">
                            <div className="flex gap-2 items-center">
                              <div className={`${course.discount ? "line-through opacity-60" : ""} font-[irsans]`}>
                                {course.price.toLocaleString()}
                            
                              </div>
                              {course.discount !== 0 && (
                                <div className="font-[irsans]">
                                  {discountHandler(course).toLocaleString()}
                                </div>
                              )}
                            </div>
                            <span className="text-xs">تومان</span>
                          </div>
                        ) : (
                          <div>رایگان!</div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
                <div
                  onClick={() => removeCartItemHandler(course)}
                  className="text-zinc-600 dark:text-zinc-400 cursor-pointer hover:!text-red-600 active:scale-90"
                >
                  <DeleteOutlineIcon fontSize="small" />
                </div>
              </div>
            ))}
          </div>
          <div className="p-5 pt-3">
            <div className="flex justify-between items-end mb-5 pt-4 lbt">
              <div>مبلغ قابل پرداخت:</div>
              {totalPrice ? (
                <div className="flex items-end gap-1">
                  <div className="text-xl font-[irsans]">
                    {totalPrice.toLocaleString()}
                  </div>
                  <div className="text-sm font-[dana-l]">تومان</div>
                </div>
              ) : (
                <div className="font-[dana-b] text-lg">رایگان!</div>
              )}
            </div>
            <div>
              <Link onClick={() => dispatch(showCartModalTagle())} to={"/cart"}>
                <Button styles="!w-full !py-3">مشاهده سبد خرید</Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5 text-center text-gray-500">
          سبد خرید شما خالیست :(
        </div>
      )}
    </div>
  );
}

export default CartModal;

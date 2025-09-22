import { Link } from "react-router";
import OutButton from "../../../../Components/DesignSystem/OutButton";
import type { T_setBoolean } from "../../../../Types/type";
import CartErrorIcon from "./CartErrorIcon";
import CartSuccessIcon from "./CartSuccessIcon";

type T_CartSuccessAlert = {
  status: "succes" | "error";
  setIsShow: T_setBoolean;
};

function CartAlert({ status, setIsShow }: T_CartSuccessAlert) {

  return (
    <div className="fixed bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2 z-10 sm:w-[400px] rounded-xl  w-72 p-6 bg-neut-prim dark:bg-d-neut-prim">
      <div className="flex justify-center mb-6">
        {status === "succes" && <CartSuccessIcon />}
        {status === "error" && <CartErrorIcon />}
      </div>
      <div
        className={`${
          status === "succes"
            ? "text-prim"
            : status === "error"
            ? "text-red-600"
            : ""
        } font-[dana-b] leading-7 text-center mb-6 text-prim`}
      >
        {status === "succes" &&
          "با موفقیت فرایند ثبت‌ نامت انجام شد. دیگه میتونی شروعش کنی!"}
        {status === "error" && "ثبت نام ناموفق بود."}
      </div>
      <div>
        {status === "succes" && (
          <Link to={`/my-panel/courses`}>
            <OutButton
              onClick={() => setIsShow(false)}
              styles="!w-full"
            >
              مشاهده دوره‌های من
            </OutButton>
          </Link>
        )}
        {status === "error" && (
          <OutButton
            onClick={() => setIsShow(false)}
            styles="!w-full text-red-600 border-red-600 hover:bg-red-600/10"
          >
            بازگشت
          </OutButton>
        )}
      </div>
    </div>
  );
}

export default CartAlert;

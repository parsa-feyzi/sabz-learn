import { Link } from "react-router";
import NotFoundIcon from "../../Components/Icons/NotFoundIcon";
import Button from "../../Components/DesignSystem/Button";
import "../../circle-decoration.css";

function NotFound() {
  return (
    <>
      <div className="z-10 fixed top-0 left-0 w-screen overflow-y-auto bg-neut-seco dark:bg-d-neut-seco min-h-screen flex flex-col md:gap-6 gap-4 items-center px-[3vw] justify-center">
        <div className="lg:w-6/12 mx-auto">
          <NotFoundIcon />
        </div>
        <div className="sm:text-3xl text-lg font-[dana-b, dana] text-center">
          متاسفانه صفحه مورد نظر شما پیدا نشد.
        </div>
        <Link to={"/"}>
          <Button>
            <div className="translate-y-0.5 sm:text-lg text-sm">بازگشت به صفحه اصلی</div>
          </Button>
        </Link>
      </div>
    </>
  );
}

export default NotFound;

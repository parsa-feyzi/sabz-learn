import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import ThemSwitcher from "../ThemSwitcher/ThemSwitcher";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { useDispatch, useSelector } from "react-redux";
import { showCartModalTagle } from "../../Redux/slices/isShowCartModalSlice";
import CartModal from "../CartModal/CartModal";
import CoverPage from "../CoverPage/CoverPage";
import ProfileModal from "../ProfileModal/ProfileModal";
import { showProfileModalTagle } from "../../Redux/slices/isShowProfileModalSlice";
import NavbarSearchBox from "./NavbarSearchBox";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { showSearchModalTagle } from "../../Redux/slices/isShowSearchModalSlice";
import { Link } from "react-router";
import Button from "../DesignSystem/Button";
import type { I_AuthInfos } from "../../Types/interface";
import type { T_SingleCourseData } from "../../Types/type";

type T_NavbarRightSection = { isNavhome?: boolean; isNavCourse?: boolean }

function NavbarRightSection({ isNavhome, isNavCourse }: T_NavbarRightSection) {
  const authInfos = useSelector(
    (state: { authInfos: { values: I_AuthInfos } }) => state.authInfos.values
  );

  const cartItems = useSelector(
    (state: {
      cartItems: { value: { cartItems: null | T_SingleCourseData[] } };
    }) => state.cartItems.value.cartItems
  );

  const isShowCartModal = useSelector(
    (state: { isShowCartModal: { isShow: boolean } }) =>
      state.isShowCartModal.isShow
  );

  const isShowProfileModal = useSelector(
    (state: { isShowProfileModal: { isShow: boolean } }) =>
      state.isShowProfileModal.isShow
  );

  const isShowSearchModal = useSelector(
    (state: { isShowSearchModal: { isShow: boolean } }) =>
      state.isShowSearchModal.isShow
  );

  const dispatch = useDispatch();

  return (
    <div
      className={`${
        isNavhome
          ? "gap-8"
          : "lg:gap-5 gap-2 md:text-gray-500 md:dark:text-neut-seco"
      } md:flex md:px-2 md:items-center md:content-center`}
    >
      {isNavhome || isNavCourse || (
        <div>
          <NavbarSearchBox display="xl:flex hidden" />
          <div className={`${isShowSearchModal ? "z-10" : ""} relative`}>
            <div
              onClick={() => dispatch(showSearchModalTagle())}
              className="size-[3.25rem] bg-neut-seco dark:bg-d-neut-ther xl:hidden md:grid hidden place-content-center rounded-full cursor-pointer"
            >
              <SearchRoundedIcon />
            </div>
            {isShowSearchModal && <NavbarSearchBox isModal />}
          </div>
        </div>
      )}
      <ThemSwitcher
        darkStyle={
          <div
            className={`${
              isNavhome
                ? ""
                : "size-[3.25rem] bg-neut-seco dark:bg-d-neut-ther grid place-content-center rounded-full"
            } cursor-pointer md:block hidden`}
          >
            <WbSunnyOutlinedIcon />
          </div>
        }
        lightStyle={
          <div
            className={`${
              isNavhome
                ? ""
                : "size-[3.25rem] bg-neut-seco dark:bg-d-neut-ther grid place-content-center rounded-full"
            } cursor-pointer md:block hidden`}
          >
            <DarkModeOutlinedIcon />
          </div>
        }
      />
      <div className={`${isShowCartModal ? "z-10" : ""} relative`}>
        <div
          onClick={() => dispatch(showCartModalTagle())}
          className={`${
            isNavhome
              ? ""
              : "size-[3.25rem] bg-neut-seco dark:bg-d-neut-ther grid place-content-center rounded-full"
          } cursor-pointer relative`}
        >
          <LocalMallOutlinedIcon />
          {cartItems && cartItems.length > 0 && (
            <div
              className={`${
                !isNavhome &&
                (isShowCartModal
                  ? "border-neut-seco dark:border-d-neut-ther"
                  : "border-neut-prim dark:border-d-neut-prim")
              }
              ${isNavhome ? "size-2 bg-green-600 -top-1 -right-1" : "border-2 size-5 -top-1 -right-1 dark:bg-prim bg-green-600"}
              text-[10px] text-center rounded-full grid place-content-center absolute text-white`}
            >
              <div className="font-[irsans] translate-y-[1px]">
                {isNavhome || cartItems.length}
              </div>
            </div>
          )}
        </div>
        {isShowCartModal && <CartModal cartItems={cartItems} />}
      </div>
      {authInfos.isLogin ? (
        <div
          className={`${
            isShowProfileModal ? "z-10" : ""
          } relative pt-0.5 md:block hidden`}
        >
          <div
            onClick={() => dispatch(showProfileModalTagle())}
            className={`${
              isNavhome
                ? ""
                : "size-[3.25rem] bg-neut-seco dark:bg-d-neut-ther grid place-content-center rounded-full"
            } cursor-pointer`}
          >
            <PersonOutlineRoundedIcon />
          </div>
          {isShowProfileModal && <ProfileModal />}
        </div>
      ) : (
        <Link to={"/login"} className=" md:block hidden">
          <Button
            styles={`${
              isNavhome ? "" : "!bg-notf hover:opacity-80"
            } md:!py-3 !px-5 !flex lg:!text-base !text-xs`}
          >
            <div className="lg:block hidden">
              <PersonOutlineRoundedIcon />
            </div>
            <div>ورود|عضویت</div>
          </Button>
        </Link>
      )}
      {isShowCartModal && (
        <CoverPage closeHandler={() => dispatch(showCartModalTagle())} />
      )}
      {isShowProfileModal && (
        <CoverPage closeHandler={() => dispatch(showProfileModalTagle())} />
      )}
      {isShowSearchModal && (
        <CoverPage closeHandler={() => dispatch(showSearchModalTagle())} />
      )}
    </div>
  );
}

export default NavbarRightSection;

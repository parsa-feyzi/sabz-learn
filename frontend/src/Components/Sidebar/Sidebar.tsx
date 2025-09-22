import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import LinkArrow from "./LinkArrow";
import LinkCategory from "./LinkCategory";
import ThemSwitcher from "../ThemSwitcher/ThemSwitcher";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { useDispatch, useSelector } from "react-redux";
import type { T_isShowSidebarSlice } from "../../Types/type";
import CoverPage from "../CoverPage/CoverPage";
import { showSidebarTagle } from "../../Redux/slices/isShowSidebarSlice";
import { Link } from "react-router";
import type { I_AuthInfos } from "../../Types/interface";
import useGetMenuDatas from "../../Hooks/useGetMenuDatas";

function Sidebar() {
  const menuDatas = useGetMenuDatas();

  const authInfos = useSelector(
    (state: { authInfos: { values: I_AuthInfos } }) => state.authInfos.values
  );

  const isShowSidebar = useSelector(
    (state: T_isShowSidebarSlice) => state.isShowSidebar.isShow
  );

  const dispatch = useDispatch();

  return (
    <>
      {isShowSidebar && (
        <CoverPage closeHandler={() => dispatch(showSidebarTagle())} />
      )}
      <div
        className={`${
          isShowSidebar ? "translate-x-0" : "translate-x-64"
        } duration-[400ms] sidebar_container md:hidden block w-64 fixed right-0 top-0 text-d-neut-seco dark:text-neut-prim h-screen overflow-y-auto z-20`}
      >
        {authInfos.isLogin ? (
          <Link
            to={"/my-panel/"}
            className="flex w-full gap-2 px-4 py-4 bg-neut-seco dark:bg-d-neut-ther"
          >
            <div>
              <img
                className="w-14 h-14 rounded-full"
                src={
                  authInfos.userInfos?.profile
                    ? authInfos.userInfos?.profile
                    : "/img/user.png"
                }
                alt=""
              />
            </div>
            <div className="flex gap-6 items-center">
              <div className="flex flex-col gap-1">
                <div className="line-clamp-1">
                  {authInfos.userInfos?.username}
                </div>
                <div className="text-xs font-[irsans] font-bold text-gray-500">
                  {authInfos.userInfos?.phone}
                </div>
              </div>
              <div>
                <KeyboardArrowLeftRoundedIcon />
              </div>
            </div>
          </Link>
        ) : (
          <div className="w-full gap-2 px-4 py-4 text-center text-notf-seco dark:text-notf bg-neut-seco dark:bg-d-neut-ther">
            <Link onClick={() => dispatch(showSidebarTagle())} className="font-[dana-xl]" to={'login'}>ورود | ثبت نام</Link>
          </div>
        )}
        <div className="bg-neut-prim min-h-full dark:bg-d-neut-prim py-1 px-5">
          <div className="border-b-2 border-neut-seco py-3 dark:border-d-neut-prim">
            <div className="text-prim text-sm pb-2 pt-1.5 ps-1">
              دسترسی سریع
            </div>
            <div>
              <LinkArrow label="دوره های من" href="/my-courses" hasArrow />
              <LinkArrow label="تیکت های من" href="/my-ticket" hasArrow />
            </div>
          </div>
          <div className="border-b-2 border-neut-seco py-3 dark:border-d-neut-prim">
            <div className="text-prim text-sm pb-2 pt-1.5 ps-1">
              دسته بندی ها
            </div>
            <div>
              {menuDatas &&
                menuDatas.map((link) => (
                  <LinkCategory {...link} key={link._id} />
                ))}
              <LinkArrow label="همه دوره ها" href="/category-courses/courses" />
              <LinkArrow label="مقالات" href="/category-articles/articles" />
              <LinkArrow label="صفحه اصلی" href="/" />
            </div>
          </div>
          <div className="py-4">
            <ThemSwitcher
              darkStyle={
                <div className="flex gap-3 text-sm items-center content-center">
                  <div>
                    <WbSunnyOutlinedIcon />
                  </div>
                  <div>تم روشن</div>
                </div>
              }
              lightStyle={
                <div className="flex gap-3 text-sm items-center content-center">
                  <div>
                    <DarkModeOutlinedIcon />
                  </div>
                  <div>تم تیره</div>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

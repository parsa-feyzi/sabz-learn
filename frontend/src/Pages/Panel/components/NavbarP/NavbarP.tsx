import SearchIcon from "@mui/icons-material/Search";
import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";
import ThemSwitcher from "../../../../Components/ThemSwitcher/ThemSwitcher";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import StartRoundedIcon from "@mui/icons-material/StartRounded";
import { Link } from "react-router";
import type {
  T_SidebarP_Links,
  T_setBoolean,
  T_userInfos,
} from "../../../../Types/type";
import { Badge } from "@mui/material";
import NotifModalP from "../NotifModal/NotifModalP";
import { useEffect, useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CoverPageP from "../CoverPageP/CoverPageP";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

type T_NavbarP = {
  userInfos: T_userInfos | null;
  setIsShowSidebar: T_setBoolean;
  links: T_SidebarP_Links[];
  isUserPanel?: boolean;
};

function NavbarP({
  userInfos,
  setIsShowSidebar,
  links,
  isUserPanel,
}: T_NavbarP) {
  const [isShowNotifModal, setIsShowNotifModal] = useState(false);

  const [globalSearchVal, setGlobalSearchVal] = useState("");

  const [isShowSearchRes, setIsShowSearchRes] = useState(false);

  const [orderLinks, setOrderLinks] = useState(links);

  const globalSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalSearchVal(e.target.value);
    if (e.target.value) {
      setIsShowSearchRes(true);
    } else {
      setIsShowSearchRes(false);
    }
  };

  const closeGlobalSearchHandler = () => {
    setGlobalSearchVal("");
    setIsShowSearchRes(false);
  };

  useEffect(() => {
    const mainLinks = links.filter(
      (link) => link.href && link.title.includes(globalSearchVal)
    );
    setOrderLinks(mainLinks);
  }, [globalSearchVal]);

  return (
    <>
      <div className="lg:rounded-lg w-full lg:border lg:border-gray-500/5 dark:lg:border-gray-500/25">
        <div className="flex justify-between lg:rounded-lg items-center bg-neut-prim-panel dark:bg-d-neut-prim-panel sm:px-7 px-5 h-20 lg:border-none border-b border-neutral-300 dark:border-neutral-700">
          <div className="">
            <div
              className={`${
                isShowSearchRes ? "z-40" : ""
              } md:flex hidden relative w-72 xl:w-[22rem] py-1 px-4 h-12 items-center rounded-lg gap-4 bg-neut-ther-panel dark:bg-d-neut-ther-panel`}
            >
              <input
                value={globalSearchVal}
                onChange={globalSearchHandler}
                autoComplete="off"
                id="searchBox"
                className="bg-inherit border-none outline-none text-sm size-full text-neutral-700 dark:text-neutral-300 placeholder:text-gray-400 placeholder:dark:text-neutral-300"
                type="text"
                placeholder="جستجو..."
              />
              <label htmlFor="searchBox">
                <Link to={"/panel-admin/"} onClick={closeGlobalSearchHandler}>
                  <SearchIcon className="cursor-pointer text-gray-400 dark:text-neutral-300" />
                </Link>
              </label>
              {isShowSearchRes && (
                <div className="search_resulte w-full flex flex-col absolute top-14 left-0 py-4 px-8 rounded-lg bg-neut-prim-panel dark:bg-d-neut-prim-panel">
                  {orderLinks.length ? (
                    orderLinks.map((link) => (
                      <Link
                        onClick={closeGlobalSearchHandler}
                        to={link.href as string}
                        className="flex justify-between py-2 hover:text-prim items-center"
                      >
                        <div>{link.title}</div>
                        <div>
                          <NavigateBeforeRoundedIcon />
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center">نتیحه‌ای یافت نشد!</div>
                  )}
                </div>
              )}
            </div>
            <div
              onClick={() => setIsShowSidebar(true)}
              className="md:hidden block"
            >
              <MenuRoundedIcon className="cursor-pointer active:scale-90" />
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex sm:gap-6 gap-5">
              <ThemSwitcher
                darkStyle={
                  <div className="cursor-pointer">
                    <WbSunnyOutlinedIcon />
                  </div>
                }
                lightStyle={
                  <div className="cursor-pointer">
                    <DarkModeOutlinedIcon />
                  </div>
                }
              />
              {isUserPanel && (
                <Link to={"/cart"}>
                  <ShoppingCartOutlinedIcon className="cursor-pointer active:scale-90" />
                </Link>
              )}
              <Badge
                badgeContent={userInfos?.notifications?.length}
                color="success"
                className={`${
                  isShowNotifModal && userInfos?.notifications?.length
                    ? "z-50"
                    : ""
                } relative`}
              >
                <div onClick={() => setIsShowNotifModal(!isShowNotifModal)}>
                  <NotificationImportantOutlinedIcon className="cursor-pointer active:scale-90" />
                </div>
                {isShowNotifModal && userInfos?.notifications?.length !== 0 && (
                  <NotifModalP notifs={userInfos?.notifications} />
                )}
              </Badge>
            </div>
            <Link
              to={"/"}
              className="text-x lg:block hidden text-neutral-500 py-1 border-neutral-500/40 ps-6 border-s ms-6"
            >
              <StartRoundedIcon className="rotate-180 hover:-translate-x-0.5 hover:transition-all hover:duration-300 hover:text-neutral-800 dark:hover:text-neutral-200" />
            </Link>
          </div>
        </div>
      </div>
      {((isShowNotifModal && userInfos?.notifications?.length !== 0) ||
        isShowSearchRes) && (
        <CoverPageP
          z="z-30"
          onClick={() => {
            setIsShowNotifModal(false);
          }}
        />
      )}
    </>
  );
}

export default NavbarP;

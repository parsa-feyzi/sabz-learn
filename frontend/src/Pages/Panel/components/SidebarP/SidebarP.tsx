import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import type {
  T_SidebarP_Links,
  T_setBoolean,
  T_userInfos,
} from "../../../../Types/type";
import { useDispatch } from "react-redux";
import { logout } from "../../../../Redux/slices/authInfosSlice";
import CoverPageP from "../CoverPageP/CoverPageP";
import AlertP from "../AlertP/AlertP";
import Button from "../../../../Components/DesignSystem/Button";
import EditUserModal from "../EditUserModal/EditUserModal";

type T_SidebarP = {
  links: T_SidebarP_Links[];
  userInfos: T_userInfos | null;
  isShowSidebar: boolean;
  setIsShowSidebar: T_setBoolean;
};

function SidebarP({
  links,
  userInfos,
  isShowSidebar,
  setIsShowSidebar,
}: T_SidebarP) {
  const [mainLink, setMainLink] = useState<string | null>("");

  const [isShowAlert, setIsShowAlert] = useState({
    logout: false,
    editUserModal: false,
  });

  const navigate = useNavigate();

  const closeAlert = () =>
    setIsShowAlert({ logout: false, editUserModal: false });

  useEffect(() => {
    setMainLink(localStorage.getItem("panelLink"));
  }, []);

  const dispatch = useDispatch();

  return (
    <>
      <div
        className={`${
          isShowSidebar ? "right-0" : "-right-[18rem]"
        } sidebarP md:sticky md:top-0 fixed lg:h-[calc(100vh-64px)] h-screen z-20 top-0 overflow-y-auto w-64 sm:w-[17rem] md:w-64 lg:w-[17rem] AAA lg:border lg:border-gray-500/5 overflow-hidden dark:lg:border-gray-500/25 bg-neut-prim-panel dark:bg-d-neut-prim-panel lg:rounded-lg`}
      >
        <div
          className={`h-full lg:rounded-lg max-md:transition-all max-md:duration-300 lg:border-none md:border-e-2 border-e-0 border-neutral-200 dark:border-neutral-900 `}
        >
          <div className="px-7 py-5 !pt-0 w-full lg:rounded-lg pb-14">
            <div className="flex bg-neut-prim-panel dark:bg-d-neut-prim-panel z-10 pt-5 top-0 left-0 justify-between gap-8 pb-4 mb-4 lbb">
              <div className="flex items-center gap-2 w-1/2">
                <div>
                  <img
                    className="size-11 min-w-11 object-cover rounded-full"
                    src={
                      userInfos?.profile ? userInfos?.profile : "/img/user.png"
                    }
                  />
                </div>
                <div className="flex flex-col gap-0.5 justify-around">
                  <div className="font-[dana-xl] text-[13px] sm:text-sm md:text-[13px] lg:text-sm text-neutral-800 dark:text-neutral-200">
                    {userInfos?.username}
                  </div>
                  <div className="font-[irsans] font-bold text-xs text-neutral-600 dark:text-neutral-400">
                    {userInfos?.phone}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-300">
                <div
                  onClick={() =>
                    setIsShowAlert((prev) => ({ ...prev, editUserModal: true }))
                  }
                >
                  <SettingsOutlinedIcon
                    fontSize="small"
                    className="cursor-pointer hover:rotate-180 hover:transition-all hover:duration-700 active:scale-90 active:duration-0"
                  />
                </div>
                <div
                  onClick={() =>
                    setIsShowAlert((prev) => ({ ...prev, logout: true }))
                  }
                >
                  <LogoutRoundedIcon
                    fontSize="small"
                    className="cursor-pointer -rotate-180 hover:text-red-600 active:scale-90"
                  />
                </div>
              </div>
            </div>
            <div className="">
              {links.map((link) =>
                link.href ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => {
                      localStorage.setItem("panelLink", link.href as string);
                      setMainLink(localStorage.getItem("panelLink"));
                      setIsShowSidebar(false);
                    }}
                    className={`${
                      link.href === mainLink ? "text-prim" : ""
                    } relative lg:hover:text-prim`}
                  >
                    {link.href === mainLink && (
                      <div className="absolute top-1/2 -translate-y-1/2 w-0.5 rounded-full h-5 bg-prim"></div>
                    )}
                    <div
                      className={`${
                        link.href === mainLink ? "-translate-x-1" : ""
                      } flex items-center gap-2 px-3 py-[7px]`}
                    >
                      <div
                        className={`${
                          link.href === mainLink
                            ? ""
                            : "opacity-70 dark:opacity-50"
                        }`}
                      >
                        {link.icon}
                      </div>
                      <div className="!font-[dana-xl] text-[15px]">
                        {link.title}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div
                    key={link.href}
                    className="text-[15px] font-[dana-xl] pt-3 translate-y-0.5 text-gray-600 dark:text-gray-400"
                  >
                    {link.title}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        {isShowAlert.logout && (
          <AlertP title="آیا از خارج شدن از حساب کاربری خود اطمینان دارید؟">
            <div className="flex justify-center gap-3 pt-4">
              <Button
                onClick={closeAlert}
                styles="!bg-neutral-500 dark:!bg-neutral-700 !py-1.5 sm:!w-auto sm:!px-10 !w-full"
              >
                خیر
              </Button>
              <Button
                onClick={() => {
                  navigate("/");
                  dispatch(logout());
                }}
                styles="!py-1.5 sm:!w-auto sm:!px-10 !w-full"
              >
                بله
              </Button>
            </div>
          </AlertP>
        )}
        {isShowAlert.editUserModal && <EditUserModal closeAlert={closeAlert} />}
        {(isShowAlert.logout || isShowAlert.editUserModal) && (
          <CoverPageP z="z-40" onClick={closeAlert} />
        )}
      </div>
    </>
  );
}

export default SidebarP;

import { Outlet } from "react-router";
import SidebarP from "../components/SidebarP/SidebarP";
import NavbarP from "../components/NavbarP/NavbarP";
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { I_AuthInfos } from "../../../Types/interface";
import CoverPageP from "../components/CoverPageP/CoverPageP";
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
function UserPanel() {
  const [links] = useState([
    {title: ""},
    {
      title: "پیشخوان",
      href: "/my-panel/",
      icon: <AccountBalanceRoundedIcon fontSize="small" />,
    },
    {title: ""},
    {
      title: "دوره‌های من",
      href: "/my-panel/courses",
      icon: <FolderCopyOutlinedIcon fontSize="small" />,
    },
    {title: ""},
    {
      title: "تیکت ها",
      href: "/my-panel/tickets",
      icon: <DraftsOutlinedIcon fontSize="small" />,
    },
    {title: ""},
    {
      title: "تراکنش‌ ها",
      href: "/my-panel/transactions",
      icon: <ReceiptLongRoundedIcon fontSize="small" />,
    },
  ]);

  const [isShowSidebar, setIsShowSidebar] = useState(false);

  const authInfos = useSelector(
    (state: { authInfos: { values: I_AuthInfos } }) => state.authInfos.values
  );

  return (
    <>
      <div className="lg:bg-neut-seco-panel lg:dark:bg-d-neut-seco-panel bg-neut-prim-panel dark:bg-d-neut-prim-panel text-neutral-800 dark:text-neutral-300 min-h-screen max-w-screen">
        <div className="relative flex lg:items-start lg:gap-x-8 lg:p-8 lg:px-12 max-w-[1440px] mx-auto w-full">
          <div className="sticky top-8 z-20">
            <SidebarP
              links={links}
              userInfos={authInfos.userInfos}
              isShowSidebar={isShowSidebar}
              setIsShowSidebar={setIsShowSidebar}
            />
          </div>
          <div className="w-full">
            <div>
              <NavbarP
                links={links}
                userInfos={authInfos.userInfos}
                setIsShowSidebar={setIsShowSidebar}
                isUserPanel
              />
            </div>
            <div className="lg:mt-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      {isShowSidebar && (
        <CoverPageP
          z="z-10"
          onClick={() => {
            setIsShowSidebar(false);
          }}
        />
      )}
    </>
  );
}

export default UserPanel;

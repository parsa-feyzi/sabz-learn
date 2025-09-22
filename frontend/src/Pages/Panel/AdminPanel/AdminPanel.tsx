import { Outlet } from "react-router";
import SidebarP from "../components/SidebarP/SidebarP";
import NavbarP from "../components/NavbarP/NavbarP";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SwitchAccountOutlinedIcon from "@mui/icons-material/SwitchAccountOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { I_AuthInfos } from "../../../Types/interface";
import CoverPageP from "../components/CoverPageP/CoverPageP";
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";

function AdminPanel() {
  const [links] = useState([
    {
      title: "خانه",
      href: "/panel-admin/",
      icon: <HomeOutlinedIcon fontSize="small" />,
    },
    { title: "دوره‌ها" },
    {
      title: "دوره‌ ها",
      href: "/panel-admin/courses",
      icon: <FolderCopyOutlinedIcon fontSize="small" />,
    },
    {
      title: "جلسات",
      href: "/panel-admin/sessions",
      icon: <VideoLibraryOutlinedIcon fontSize="small" />,
    },
    {
      title: "دسته بندی ها",
      href: "/panel-admin/categories",
      icon: <LayersOutlinedIcon fontSize="small" />,
    },
    {
      title: "منو ها",
      href: "/panel-admin/menu",
      icon: <CollectionsBookmarkOutlinedIcon fontSize="small" />,
    },
    {
      title: "تخفیف ها",
      href: "/panel-admin/discount-code",
      icon: <DiscountOutlinedIcon fontSize="small" />,
    },
    { title: "کاربرها" },
    {
      title: "کاربر ها",
      href: "/panel-admin/users",
      icon: <SwitchAccountOutlinedIcon fontSize="small" />,
    },
    {
      title: "تیکت ها",
      href: "/panel-admin/tickets",
      icon: <DraftsOutlinedIcon fontSize="small" />,
    },
    {
      title: "نظرات",
      href: "/panel-admin/comments",
      icon: <CommentRoundedIcon fontSize="small" />,
    },
    {
      title: "پیغام ها",
      href: "/panel-admin/contact",
      icon: <ForumOutlinedIcon fontSize="small" />,
    },
    { title: "مقالات" },
    {
      title: "مقالات",
      href: "/panel-admin/articles",
      icon: <LibraryBooksOutlinedIcon fontSize="small" />,
    },
  ]);

  const [isShowSidebar, setIsShowSidebar] = useState(false);

  const authInfos = useSelector(
    (state: { authInfos: { values: I_AuthInfos } }) => state.authInfos.values
  );

  return (
    <>
      <div className="lg:bg-neut-seco-panel lg:dark:bg-d-neut-seco-panel bg-neut-prim-panel dark:bg-d-neut-prim-panel text-neutral-800 dark:text-neutral-300 min-h-screen max-w-screen">
        <div className="relative flex lg:items-start lg:gap-x-8 lg:p-8 lg:px-[4vw] max-w-[1440px] mx-auto w-full">
          <div className="sticky top-8 z-20">
            <SidebarP
              links={links}
              userInfos={authInfos.userInfos}
              isShowSidebar={isShowSidebar}
              setIsShowSidebar={setIsShowSidebar}
            />
          </div>
          <div className="lg:w-[calc(100%-19rem)] md:w-[calc(100%-16rem)] w-full">
            <div>
              <NavbarP
                links={links}
                userInfos={authInfos.userInfos}
                setIsShowSidebar={setIsShowSidebar}
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

export default AdminPanel;

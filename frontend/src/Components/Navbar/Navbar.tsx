// import { useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Icons/Logo";
import NavbarRightSection from "./NavbarRightSection";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { showSidebarTagle } from "../../Redux/slices/isShowSidebarSlice";
import CategoriesLinks from "../CategoriesLinks/CategoriesLinks";

function Navbar({ isNavhome, isNavCourse }: { isNavhome?: boolean, isNavCourse?: boolean }) {
  // const [isShowCategoriesLink, setIsShowCategoriesLink] = useState(false);

  const dispatch = useDispatch();

  return (
    <div
      className={`${
        isNavhome
          ? "bg-none text-neut-prim"
          : "bg-neut-prim dark:bg-d-neut-prim"
      }`}
    >
      <div
        className={`${
          isNavhome
            ? "lg:px-[7vw] px-[5vw]"
            : "lg:px-[3vw] px-[4vw]"
        } w-full flex justify-between items-center content-center md:py-6 py-4 max-w-[1500px] mx-auto`}
      >
        <div
          onClick={() => dispatch(showSidebarTagle())}
          className={`${
            isNavhome
              ? ""
              : "size-[3.25rem] bg-neut-seco dark:bg-d-neut-ther grid place-content-center rounded-full"
          } cursor-pointer md:hidden block`}
        >
          <MenuRoundedIcon />
        </div>
        <div className="flex lg:gap-12 gap-8 items-center content-center">
          <Link to={"/"} className="md:static w-16 shrink-0">
            <Logo />
          </Link>
          <div className="md:flex hidden lg:text-[17px] text-sm lg:gap-8 gap-[15px] items-center content-center">
            <Link to={"/"} className="hover:text-prim !font-[dana-xl]">صفحه‌اصلی</Link>
            <div className="category_opener cursor-pointer relative">
              <div className="hover:text-prim !font-[dana-xl]">دوره‌های آموزشی</div>
              <CategoriesLinks />
            </div>
            <NavLink to={"/category-courses/courses"} className={({ isActive }) => isActive ? "text-prim hover:text-prim !font-[dana-xl]" : "hover:text-prim !font-[dana-xl]"}>همه دوره‌ها</NavLink>
            <NavLink to={"/category-articles/articles"} className={({ isActive }) => isActive ? "text-prim hover:text-prim !font-[dana-xl]" : "hover:text-prim !font-[dana-xl]"}>مقالات</NavLink>
          </div>
        </div>
        <div>
          <NavbarRightSection isNavhome={isNavhome} isNavCourse={isNavCourse} />
        </div>
      </div>
      <Sidebar />
    </div>
  );
}

export default Navbar;

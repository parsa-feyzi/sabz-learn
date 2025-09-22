import { useState } from "react";
import { useDispatch } from 'react-redux'
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import { Link } from "react-router";
import type { T_menu } from "../../Types/type";
import { showSidebarTagle } from "../../Redux/slices/isShowSidebarSlice";

function LinkCategory({ title, href, submenus }: T_menu) {
  const [isShowSubLink, setIsShowSubLink] = useState(false);

  const dispatch = useDispatch()

  return (
    <div className="">
      <div className={`${isShowSubLink && "text-prim"} flex py-1.5 justify-between text-sm w-full`}>
        <Link 
        onClick={() => dispatch(showSidebarTagle())}
        to={`/category-courses/${href}`}>
          <div>{title}</div>
        </Link>
        <div
          onClick={() => setIsShowSubLink((prevShow) => !prevShow)}
          className=" w-5/12 text-left"
        >
          <KeyboardArrowLeftRoundedIcon
            className={`${isShowSubLink && "-rotate-90"}`}
          />
        </div>
      </div>
      {isShowSubLink && (
        <div onClick={() => dispatch(showSidebarTagle())} className="flex text-xs flex-col gap-4 p-3 mb-2 rounded-lg bg-neut-seco text-d-neut-seco dark:bg-d-neut-ther dark:text-neut-prim">
          {submenus.length ? submenus.map((link) => (
            <Link className="line-clamp-1" to={link.href} key={link._id}>
              {link.title}
            </Link>
          )) : (
            <Link to={href}>{title}</Link>
          )}
        </div>
      )}
    </div>
  );
}

export default LinkCategory;

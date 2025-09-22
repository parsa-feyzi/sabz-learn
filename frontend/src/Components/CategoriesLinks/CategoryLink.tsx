import { Link } from "react-router";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import type { T_menu } from "../../Types/type";
import { useDispatch } from "react-redux";
import { setCategorySubLinks } from "../../Redux/slices/categorySubLinksSlice";

function CategoryLink(props: T_menu) {

  const dispatch = useDispatch()

  return (
    <div onMouseMove={() => dispatch(setCategorySubLinks(props.submenus.length ? props.submenus : props))} className="flex cursor-pointer hover:bg-notf/10 dark:hover:bg-notf/5 hover:text-notf-seco dark:hover:text-notf border-l-[3px] border-neut-prim dark:border-d-neut-prim hover:border-notf-seco dark:hover:border-notf justify-between items-center content-center p-[10px]">
      <Link className="text-sm font-[dana-xl]" to={`/category-courses/${props.href}`}>
        {props.title}
      </Link>
      <div>
        <KeyboardArrowLeftRoundedIcon fontSize="small" />
      </div>
    </div>
  );
}

export default CategoryLink;

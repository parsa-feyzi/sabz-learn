import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router";
import { showSidebarTagle } from "../../Redux/slices/isShowSidebarSlice";

type T_LinkArrow = {
  label: string;
  href: string;
  hasArrow?: boolean;
};

function LinkArrow({ label, href, hasArrow }: T_LinkArrow) {
  const dispatch = useDispatch();

  return (
    <NavLink
      onClick={() => dispatch(showSidebarTagle())}
      to={href}
      className={({ isActive }) => (isActive ? "text-prim" : "")}
    >
      <div className="flex py-1.5 justify-between text-sm w-full">
        <div>{label}</div>
        {hasArrow && (
          <div>
            <KeyboardArrowLeftRoundedIcon />
          </div>
        )}
      </div>
    </NavLink>
  );
}

export default LinkArrow;

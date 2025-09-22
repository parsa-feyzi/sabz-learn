import type { JSX } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { showProfileModalTagle } from "../../Redux/slices/isShowProfileModalSlice";

type T_ProfileModalLink = { href: string ,label: string, icon: JSX.Element, isErro?: boolean }

function ProfileModalLink({ href, label, icon, isErro }: T_ProfileModalLink) {
  const dispatch = useDispatch()

  return (
    <Link
    onClick={() => {
      dispatch(showProfileModalTagle())
      localStorage.setItem("panelLink", (href))
    }}
      to={href}
      className={`${isErro ? "hover:bg-red-700" : "hover:bg-prim"} w-full py-3 px-2 flex items-center content-center gap-2 rounded-xl hover:text-neut-prim`}
    >
      <div>{icon}</div>
      <div>{label}</div>
    </Link>
  );
}

export default  ProfileModalLink
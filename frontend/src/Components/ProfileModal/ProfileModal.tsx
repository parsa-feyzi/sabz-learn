import { Link } from "react-router";
import ProfileModalLink from "./ProfileModalLink";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import { useDispatch, useSelector } from "react-redux";
import type { I_AuthInfos } from "../../Types/interface";
import { logout } from "../../Redux/slices/authInfosSlice";
import { showProfileModalTagle } from "../../Redux/slices/isShowProfileModalSlice";

function ProfileModal() {
  const authInfos = useSelector((state: { authInfos: { values: I_AuthInfos } }) => state.authInfos.values);

  const dispatch = useDispatch();

  return (
    <div className="absolute duration-150 z-[5] top-14 -left-2 bg-neut-prim dark:bg-d-neut-prim text-d-neut-seco dark:text-neut-prim overflow-hidden rounded-lg w-[278px] px-6 py-2">
      <Link
        to={"/my-panel/"}
        className="flex w-full gap-2 py-4 border-b-2 border-gray-300 dark:border-d-neut-ther"
        onClick={() => {
          localStorage.setItem("panelLink", "/my-panel/" as string);
          setTimeout(() => {
            dispatch(showProfileModalTagle());
          }, 500);
        }}
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
          <div className="flex flex-col gap-1.5 pt-1">
            <div className="text-lg font-[dana-b]">
              {authInfos.userInfos?.name}
            </div>
            <div className="text-prim text-sm">
              موجودی : <span className="font-[irsans]">0</span> تومان
            </div>
          </div>
        </div>
      </Link>
      <div className="py-2 border-b-2 border-gray-300 dark:border-d-neut-ther">
        {authInfos.userInfos?.role === "ADMIN" && (
          <ProfileModalLink href="/panel-admin/" label="پنل ادمینی" icon={<BarChartRoundedIcon />} />
        )}
        <ProfileModalLink
          href="/my-panel/"
          label="پیشخوان"
          icon={<HomeOutlinedIcon />}
        />
        <ProfileModalLink
          href="/my-panel/courses"
          label="دوره های من"
          icon={<FolderCopyOutlinedIcon />}
        />
        <ProfileModalLink
          href="/my-panel/tickets"
          label="تیکت های من"
          icon={<QuestionAnswerOutlinedIcon />}
        />
      </div>
      <div onClick={() => dispatch(logout())} className="py-2">
        <ProfileModalLink
          href="/"
          label="خروج"
          icon={<PowerSettingsNewRoundedIcon />}
          isErro
        />
      </div>
    </div>
  );
}

export default ProfileModal;

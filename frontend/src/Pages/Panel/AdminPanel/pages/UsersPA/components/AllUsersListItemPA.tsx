import type { T_userInfos } from "../../../../../../Types/type";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import "../../../../../../Button.css";

type T_AllUsersListItem = {
  user: T_userInfos;
  index: number;
  id: number;
  deleteUser: (user: T_userInfos) => void;
  banUser: (user: T_userInfos) => void;
  changeRoleUser: (user: T_userInfos) => void;
};

function AllUsersListItem({ user, index, deleteUser, banUser, changeRoleUser, id }: T_AllUsersListItem) {
  return (
    <div
      className={`${
        index % 2
          ? ""
          : "rounded-lg bg-neut-seco-panel dark:bg-d-neut-seco-panel"
      } flex items-center sm:grid sm:grid-cols-12 me-2 py-4 rounded-md *:shrink-0`}
    >
      <div className="w-16 sm:w-auto md:text-base text-sm sm:col-span-1 text-center">
        <span className="font-[irsans] font-bold opacity-50 text-label xs:text-caption">
          {id + 1}
        </span>
      </div>
      <div className="w-24 sm:w-auto md:text-base text-sm sm:col-span-2 text-center flex items-center justify-center gap-x-1.5">
        <span className="text-label xs:text-caption">{user.name}</span>
      </div>
      <div className="w-28 sm:w-auto md:text-base text-sm sm:col-span-2 text-center">
        <span className="text-label xs:text-caption">{user.username}</span>
      </div>
      <div className="w-36 sm:w-auto md:text-base text-sm sm:col-span-3 text-center">
        <span className="text-label xs:text-caption">{user.email}</span>
      </div>
      <div className="w-60 sm:w-auto md:text-base text-sm sm:col-span-4 text-center">
        <div className="w-auto text-label text-center px-2 py-0.5 mx-auto bg-brand-90/10 text-brand-darker rounded-md">
          <div className="flex sm:gap-3 gap-2 justify-center">
            <div onClick={() => changeRoleUser(user)} className={`${user.role === "USER" ? "!text-teal-500" : "!text-orange-500"} btn btn-sm btn-neut`}>
              <AccessibilityNewRoundedIcon fontSize="small" />
            </div>
            <div
              onClick={() => deleteUser(user)}
              className="btn btn-sm btn-neut !text-rose-500"
            >
              <DeleteOutlineRoundedIcon fontSize="small" />
            </div>
            <div
              onClick={() => banUser(user)}
              className="btn btn-sm btn-neut !text-rose-800 dark:!text-rose-600"
            >
              <BlockRoundedIcon fontSize="small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllUsersListItem;

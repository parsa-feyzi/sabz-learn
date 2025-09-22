import type { T_SessionData } from "../../../../../../Types/type";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import "../../../../../../Button.css";

type T_AllUsersListItem = {
  session: T_SessionData;
  index: number;
  id: number;
  deleteSession: (session: T_SessionData) => void;
};

function AllSessionsListItemPA({ session, index, deleteSession, id }: T_AllUsersListItem) {
  return (
    <div
      className={`${
        index % 2
          ? ""
          : "rounded-lg bg-neut-seco-panel dark:bg-d-neut-seco-panel"
      } flex items-center sm:grid sm:grid-cols-12 py-4 me-2 rounded-md *:shrink-0`}
    >
      <div className="w-16 sm:w-auto md:text-base text-sm sm:col-span-1 text-center">
        <span className="font-[irsans] font-bold opacity-50 text-label xs:text-caption">
          {id + 1}
        </span>
      </div>
      <div className="w-24 sm:w-auto md:text-base text-sm sm:col-span-3 text-center flex items-center justify-center gap-x-1.5">
        <span className="text-label xs:text-caption">{session.title}</span>
      </div>
      <div className="w-28 sm:w-auto md:text-base text-sm sm:col-span-2 text-center">
        <span className="text-label font-[irsans] font-bold xs:text-caption">
          {session.time.includes(":") ? session.time : `${session.time}:00`}
        </span>
      </div>
      <div className="w-36 sm:w-auto md:text-base text-sm sm:col-span-3 text-center">
        <span className="text-label xs:text-caption">
          {session.course?.name}
        </span>
      </div>
      <div className="w-60 sm:w-auto md:text-base text-sm sm:col-span-3 text-center">
        <div className="w-auto text-label text-center px-2 py-0.5 mx-auto bg-brand-90/10 text-brand-darker rounded-md">
          <div className="flex sm:gap-3 gap-2 justify-center">
            <div
              onClick={() => deleteSession(session)}
              className="btn btn-sm btn-neut !text-rose-500"
            >
              <DeleteOutlineRoundedIcon fontSize="small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllSessionsListItemPA;

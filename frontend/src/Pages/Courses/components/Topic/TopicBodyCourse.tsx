import { Link } from "react-router";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import LockOutlineIcon from '@mui/icons-material/LockOutline';

type T_TopicBodyCourse = {
  title: string;
  number: number;
  href: string;
  time: string;
  isFree: 0 | 1
};

function TopicBodyCourse({ title, number, href, time, isFree }: T_TopicBodyCourse) {
  return (
    <div className="TopicBodyCourse_container flex justify-between px-4 py-6 border-t-2 border-gray-500/25 hover:text-prim">
      <div className="flex items-center content-center gap-3">
        <div className="TopicBodyCourse_numberBox flex-center md:w-8 w-7 h-6 md:h-7 font-[irsans] bg-black/10 dark:bg-white/10 font-bold rounded grid place-content-center">
          {number}
        </div>
        {isFree ? <Link to={href} className="line-clamp-1">{title}</Link> : <div className="cursor-default line-clamp-1">{title}</div>}
      </div>
      <div className="flex items-center content-center gap-3">
        <div dir="ltr" className="font-[irsans] font-bold">
          {time}
        </div>
        <div>
          {isFree ? <PlayCircleOutlineRoundedIcon /> : <LockOutlineIcon />}
        </div>
      </div>
    </div>
  );
}

export default TopicBodyCourse;

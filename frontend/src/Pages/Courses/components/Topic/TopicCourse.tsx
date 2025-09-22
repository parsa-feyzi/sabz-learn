import { useState } from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import TopicBodyCourse from "./TopicBodyCourse";
import type { T_sessions } from "../../../../Types/type";

type T_TopicCourse = {
  title: string;
  sessions: T_sessions[];
  isUserRegisteredToThisCourse: boolean;
  shortName: string
};

function TopicCourse({ title, sessions, isUserRegisteredToThisCourse, shortName }: T_TopicCourse) {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="bg-neut-seco dark:bg-d-neut-ther overflow-hidden rounded-lg mb-4">
      <div
        onClick={() => setToggle((prevToggle) => !prevToggle)}
        className={`${
          toggle
            ? "bg-d-neut-ther/80 dark:bg-prim text-neut-prim"
            : "bg-inherit"
        } flex justify-between items-center content-center cursor-pointer p-4`}
      >
        <div className="sm:text-lg font-[dana-b]">{title}</div>
        <div className="flex items-center content-center gap-2">
          <div
            dir="ltr"
            className={`${
              toggle ? "text-gray-300" : "text-gray-500"
            } translate-y-0.5 dark:text-neut-seco`}
          >
            {sessions ? sessions.length : 0} lesson . 4h 16m
          </div>
          <div>
            <div className={toggle ? "rotate-90" : "-rotate-90"}>
              <ArrowBackIosNewRoundedIcon />
            </div>
          </div>
        </div>
      </div>
      <div>
        {toggle &&
          sessions.map((session, index) => (
            <TopicBodyCourse
              href={`/${shortName}/${session._id}`}
              number={index + 1}
              time={session.time.includes(':') ? session.time : `${session.time}:00`}
              title={session.title}
              isFree={(isUserRegisteredToThisCourse) ? 1 : session.free}
              key={session._id}
            />
          ))}
      </div>
    </div>
  );
}

export default TopicCourse;

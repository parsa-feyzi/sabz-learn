import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { Link } from "react-router";

type T_CourseBoxP = {
  cover: string;
  price: number;
  name: string;
  creator: string;
  href: string;
  videoLink?: string;
  isUserPanel?: boolean;
};

function CourseBoxP({
  cover,
  price,
  name,
  creator,
  href,
  videoLink,
  isUserPanel,
}: T_CourseBoxP) {
  return (
    <div className="flex courseBoxP flex-col justify-between">
      <div>
        <div>
          <Link
            to={`/course-info/${href}`}
            className="relative rounded-md block overflow-hidden"
          >
            <img
              className="courseBoxP_Img"
              src={`http://localhost:4000/courses/covers/${cover}`}
              alt=""
            />
            {videoLink && (
              <div className="absolute inset-0 size-full flex items-center justify-center rounded-md bg-black/30 text-neut-seco-panel/85">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi size-12 opacity-85 bi-collection-play-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zm6.258-6.437a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437" />
                  </svg>
              </div>
            )}
          </Link>
          <Link
            to={`/course-info/${href}`}
            className={`${
              isUserPanel ? "my-3" : "pt-2"
            } line-clamp-2 px-2 font-[dana-xl]`}
          >
            {name}
          </Link>
        </div>
        {isUserPanel || (
          <div className="flex text-[13px] gap-1 px-2 items-center pt-2 text-gray-600 dark:text-gray-400">
            <div>
              <PersonOutlineRoundedIcon fontSize="small" />
            </div>
            <div>{creator}</div>
          </div>
        )}
      </div>
      {isUserPanel ? (
        <Link
          to={`/course-info/${href}`}
          className="mt-3 hover:bg-prim/5 active:scale-95 flex items-center gap-1 justify-center p-2 text-center text-prim bg-prim/10 rounded"
        >
          <div className="text-sm font-[dana-xl]">ادامه یادگیری</div>
          <div>
            <EastRoundedIcon fontSize="small" className="rotate-180" />
          </div>
        </Link>
      ) : (
        <div className="mt-3 p-2 text-center text-prim bg-prim/10 rounded">
          {price ? (
            <span className="font-[irsans] font-bold">
              {price.toLocaleString()}
              <span className="text-xs font-[dana-xl] ps-0.5">تومان</span>
            </span>
          ) : (
            <span className="font-[dana-xl]">رایگان</span>
          )}
        </div>
      )}
    </div>
  );
}

export default CourseBoxP;

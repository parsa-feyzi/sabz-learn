import type { T_CoursesData, T_code } from "../../../../../../Types/type";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import "../../../../../../Button.css";
import { useEffect, useState } from "react";

type T_AllUsersListItem = {
  code: T_code;
  index: number;
  id: number;
  deleteCode: (code: T_code) => void;
  courses: T_CoursesData[] | null
};

function AllCodesListItemPA({ code, index, deleteCode, courses, id }: T_AllUsersListItem) {
    const [mainCourse, setMainCourse] = useState<T_CoursesData | undefined>()

    console.log(mainCourse);

    useEffect(() => {
        const course = courses?.find(course => course._id === code.course)
        setMainCourse((course as T_CoursesData))
    }, [])

  return (
    <div
      className={`${
        index % 2
          ? ""
          : "rounded-lg bg-neut-seco-panel dark:bg-d-neut-seco-panel"
      } flex items-center sm:grid sm:grid-cols-12 py-4 me-2 rounded-md *:shrink-0`}
    >
      <div className="w-auto md:text-base text-sm sm:col-span-1 text-center">
        <span className="font-[irsans] font-bold opacity-50 text-label xs:text-caption">
          {id + 1}
        </span>
      </div>
      <div className="panel_table w-auto md:text-base text-sm sm:col-span-2 overflow-x-auto text-center">
        <span className="text-sm text-label xs:text-caption">
          {code.code}
        </span>
      </div>
      <div className="w-auto md:text-base text-sm sm:col-span-2 text-center">
        <span className="text-label font-[irsans] font-bold xs:text-caption">
          {code.percent}%
        </span>
      </div>
      <div className="w-auto md:text-base text-sm sm:col-span-3 text-center">
        <span className="text-sm text-label xs:text-caption">
          {mainCourse?.name}
        </span>
      </div>
      <div className="w-auto md:text-base text-sm sm:col-span-2 text-center">
        <span className="font-[irsans] font-bold text-label xs:text-caption">
          {code.max}/{code.uses}
        </span>
      </div>
      <div className="w-auto md:text-base text-sm sm:col-span-2 text-center">
        <div className="w-auto text-label text-center px-2 py-0.5 mx-auto bg-brand-90/10 text-brand-darker rounded-md">
          <div className="flex sm:gap-3 gap-2 justify-center">
            <div
              onClick={() => deleteCode(code)}
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

export default AllCodesListItemPA
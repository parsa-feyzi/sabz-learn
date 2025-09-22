import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import type { T_CoursesData } from "../../../../../../Types/type";

type T_AllCoursesListItemPA = {
  course: T_CoursesData;
  index: number;
  id: number;
  deleteCourse: (course: T_CoursesData) => void;
};

function AllCoursesListItemPA({ course, index, deleteCourse, id }: T_AllCoursesListItemPA) {
  return (
    <div
      className={`${
        index % 2
          ? ""
          : "rounded-lg bg-neut-seco-panel dark:bg-d-neut-seco-panel"
      } items-center grid grid-cols-12 py-4 rounded-md me-2 *:shrink-0`}
    >
      <div className="w-auto md:text-base text-sm col-span-1 text-center">
        <span className="font-[irsans] font-bold opacity-50 text-label xs:text-caption">
          {id + 1}
        </span>
      </div>
      <div className="w-auto text-sm col-span-3 text-center flex items-center justify-center gap-x-1.5">
        <span className="text-label xs:text-caption">{course.name}</span>
      </div>
      <div className="w-auto text-sm col-span-1 text-center">
        <span
          className={`${
            course.price ? "font-[irsans] font-bold" : "font-[dana-xl]"
          } text-label xs:text-caption`}
        >
          {course.price ? course.price.toLocaleString() : "رایگان"}
        </span>
      </div>
      <div className="w-auto text-sm col-span-2 text-center">
        <span className="text-label xs:text-caption">{course.creator}</span>
      </div>
      <div className="w-auto text-sm col-span-1 text-center">
        <span className="text-label xs:text-caption">
          {course.categoryID.title.replace("برنامه نویسی ", "")}
        </span>
      </div>
      <div className="w-auto text-sm col-span-2 text-center">
        <span className="text-label xs:text-caption">
          {course.status === "presell" ? (
            <span className="warn-btn !text-[13px] !px-2 !rounded">پیش فروش</span>
          ) : (
            <span className="suc-btn !text-[13px] !px-2 !rounded">درحال برگزاری</span>
          )}
        </span>
      </div>
      <div className="w-auto text-sm col-span-2 text-center me-10">
        <div className="w-auto text-label text-center px-2 py-0.5 mx-auto bg-brand-90/10 text-brand-darker rounded-md">
          <div className="flex sm:gap-4 gap-3 justify-center">
            <div
              onClick={() => deleteCourse(course)}
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

export default AllCoursesListItemPA;

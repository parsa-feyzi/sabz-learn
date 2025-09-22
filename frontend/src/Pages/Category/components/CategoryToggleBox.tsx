import { useState, type JSX } from "react";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";

function CategoryToggleBox({ children }: { children: JSX.Element }) {
  const [isShowCourseCategories, setIsShowCourseCategories] = useState(true);

  return (
    <div className="md:p-5 p-4 sm:p-3 sm:bg-neut-prim sm:dark:bg-d-neut-prim bg-neut-seco dark:bg-d-neut-ther rounded-lg">
      <div
        onClick={() => setIsShowCourseCategories((prevShow) => !prevShow)}
        className={`${
          isShowCourseCategories ? " md:pb-5 pb-4" : ""
        } flex justify-between cursor-pointer`}
      >
        <div className="flex md:text-lg text-base items-center content-center gap-3">
          <div>
            <FolderCopyOutlinedIcon />
          </div>
          <div>دسته بندی دوره ها</div>
        </div>
        <div>
          <div className={isShowCourseCategories ? "rotate-90" : "-rotate-90"}>
            <KeyboardArrowLeftRoundedIcon />
          </div>
        </div>
      </div>
      {isShowCourseCategories && (
        <div className="md:pt-5 pt-4 flex flex-col gap-5 border-t-2 border-gray-500/50">
          {children}
        </div>
      )}
    </div>
  );
}

export default CategoryToggleBox;

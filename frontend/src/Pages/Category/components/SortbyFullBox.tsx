import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import type { T_categoryList, T_setString } from "../../../Types/type";

type T_SortbyFullBox = {
  categoryList: T_categoryList[];
  categoryStatus: string;
  setCategoryStatus: T_setString;
};

function SortbyFullBox({ categoryList, categoryStatus, setCategoryStatus }: T_SortbyFullBox) {
  return (
    <div className="sm:flex hidden items-center content-center gap-6 px-5 mb-6 rounded-lg bg-neut-prim dark:bg-d-neut-prim">
      <div className="flex gap-2 items-center content-center">
        <div>
          <SwapVertRoundedIcon fontSize="large" />
        </div>
        <div className="!font-[dana-xl] line-clamp-1">مرتب سازی بر اساس :</div>
      </div>
      <div className="flex xl:gap-8 gap-6 text-sm">
        {categoryList.map((sort) => (
          <div
            onClick={() => setCategoryStatus(sort.key)}
            key={sort.id}
            className={`${
              sort.key === categoryStatus
                ? "border-notf text-notf"
                : " border-neut-prim dark:border-d-neut-prim"
            } !font-[dana-xl] md:py-6 py-5 border-y-2 cursor-pointer line-clamp-1`}
          >
            {sort.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SortbyFullBox;

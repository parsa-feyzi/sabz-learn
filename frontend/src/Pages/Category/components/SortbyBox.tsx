import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import type {
  T_categoryList,
  T_setBoolean,
  T_setString,
} from "../../../Types/type";

type T_SortbyBox = {
  categoryList: T_categoryList[];
  isShow: boolean;
  setIsShow: T_setBoolean;
  categoryStatus: string;
  setCategoryStatus: T_setString;
};

function SortbyBox({ categoryList, isShow, setIsShow, categoryStatus, setCategoryStatus }: T_SortbyBox) {
  return (
    <div
      className={`${
        isShow ? "translate-y-0" : "translate-y-full"
      } fixed bottom-0 left-0 w-full z-30 overflow-hidden rounded-t-2xl sm:hidden block`}
    >
      <div className="flex justify-between p-[4vw] py-5 text-lg bg-neut-seco dark:bg-d-neut-ther">
        <div>مرتب سازی بر اساس</div>
        <div onClick={() => setIsShow(false)}>
          <CloseRoundedIcon />
        </div>
      </div>
      <div className="p-[4vw] bg-neut-prim dark:bg-d-neut-prim">
        {categoryList.map((sort) => (
          <div
            key={sort.id}
            onClick={() => {
              setCategoryStatus(sort.key)
              setIsShow(false)
            }}
            className={`${
              sort.key === categoryStatus ? "text-prim" : ""
            } flex justify-between items-center content-center py-5 cursor-pointer`}
          >
            <div className="font-[dana-xl]">{sort.title}</div>
            {sort.key === categoryStatus && (
              <div>
                <DoneOutlineRoundedIcon fontSize="small" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SortbyBox;

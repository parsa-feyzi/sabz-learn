import CloseRounded from "@mui/icons-material/CloseRounded";
import ToggleBox from "./ToggleBox";
import type { T_setBoolean } from "../../../Types/type";
import CategoryToggleBox from "./CategoryToggleBox";
import useGetMenuDatas from "../../../Hooks/useGetMenuDatas";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

type T_FilteringBox = {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  presellSortToggle: boolean;
  setPresellSortToggle: T_setBoolean;
  startSortToggle: boolean;
  setStartSortToggle: T_setBoolean;
};

function FilteringBox({
  isShow,
  setIsShow,
  presellSortToggle,
  setPresellSortToggle,
  startSortToggle,
  setStartSortToggle,
}: T_FilteringBox) {
  const [mainCategoryToggle, setMainCategoryToggle] = useState<
    string | undefined
  >("");

  const { categoryName } = useParams();

  const menuDatas = useGetMenuDatas();

  const navigate = useNavigate();

  const actionToFilltering = () => {
    setIsShow(false);
    navigate(`/category-courses/${mainCategoryToggle}`);
  };

  const cancelFilltering = () => {
    setMainCategoryToggle(categoryName);
    setIsShow(false);
    setPresellSortToggle(false);
    setStartSortToggle(false);
  };

  useEffect(() => {
    setMainCategoryToggle(categoryName);
  }, [categoryName]);

  return (
    <div
      className={`${
        isShow ? "translate-y-0" : "translate-y-full"
      } fixed bottom-0 left-0 w-full z-30 sm:hidden block overflow-y-auto h-screen bg-neut-prim dark:bg-d-neut-prim`}
    >
      <div className="flex justify-between items-center content-center px-[5vw] py-5 bg-neut-seco dark:bg-d-neut-ther">
        <div className="flex gap-2">
          <div onClick={() => setIsShow(false)}>
            <CloseRounded fontSize="small" />
          </div>
          <div className="text-lg">فیلترها</div>
        </div>
        <div
          onClick={cancelFilltering}
          className="text-sm text-red-600 dark:text-red-500"
        >
          حذف فیلترها
        </div>
      </div>
      <div className="filltering px-[5vw] py-6 overflow-y-auto max-h-[74vh]">
        <ToggleBox
          title="در حال پیش فروش"
          toggle={presellSortToggle}
          setToggle={() => {
            startSortToggle && setStartSortToggle(false);
            setPresellSortToggle((prev) => !prev);
          }}
        />
        <ToggleBox
          title="در حال برگزاری"
          toggle={startSortToggle}
          setToggle={() => {
            presellSortToggle && setPresellSortToggle(false);
            setStartSortToggle((prev) => !prev);
          }}
        />
        <CategoryToggleBox>
          <>
            {menuDatas &&
              menuDatas.map((menu) => (
                <div
                  onClick={() => {
                    mainCategoryToggle === menu.href
                      ? setMainCategoryToggle("courses")
                      : setMainCategoryToggle(menu.href);
                  }}
                  className="flex gap-2 text-sm cursor-pointer"
                >
                  <div>
                    <div
                      className={`${
                        menu.href === mainCategoryToggle
                          ? "bg-notf"
                          : "bg-gray-200 dark:bg-d-neut-prim"
                      } size-4 rounded-sm`}
                    ></div>
                  </div>
                  <div>{menu.title}</div>
                </div>
              ))}
          </>
        </CategoryToggleBox>
      </div>
      <div className="fixed w-full px-[5vw] bottom-5 left-0">
        <button
          onClick={actionToFilltering}
          className="w-full text-sm bg-prim rounded-md pb-3 text-neut-prim pt-4 hover:opacity-80 active:opacity-60"
        >
          اعمال فیلتر
        </button>
      </div>
    </div>
  );
}

export default FilteringBox;

import SearchRounded from "@mui/icons-material/SearchRounded";
import type { T_InputEvent } from "../../../Types/type";

type T_CategorySearchBox = {
  value: string;
  searchHandler: (e:T_InputEvent) => void;
  lable: "دوره ها" | "مقالات";
};

function CategorySearchBox({ value, searchHandler, lable }: T_CategorySearchBox) {
  return (
    <div className="md:p-[18px] p-4 sm:mb-6 mb-4 flex sm:text-base text-sm bg-neut-prim dark:bg-d-neut-prim font-[dana-xl] rounded-lg overflow-hidden">
      <input
        onChange={(e) => searchHandler(e)}
        value={value}
        type="text"
        className="bg-inherit outline-none border-none w-full placeholder:text-gray-500"
        placeholder={`جستجو بین ${lable}`}
      />
      <div className="text-gray-500/60 dark:text-neut-prim/50">
        <SearchRounded fontSize="large" />
      </div>
    </div>
  );
}

export default CategorySearchBox;

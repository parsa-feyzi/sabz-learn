import { useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CoverPageP from "../CoverPageP/CoverPageP";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";

type T_Field = { title: string; value: string };

type T_SearchByP = {
  searchFields: T_Field[];
  list: any[] | null;
  setList: React.Dispatch<React.SetStateAction<any[] | null>>;
  placeholder: string
};

function SearchByP({ searchFields, list, setList, placeholder}: T_SearchByP) {
  const [searchValue, setSearchValue] = useState("");

  const [isShowChoseFieldBox, setIsShowChoseFieldBox] = useState(false);

  const [isShowSearchBox, setIsShowSearchBox] = useState(false);

  const [searchBy, setSearchBy] = useState(searchFields[0].value);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    let searchRes;
    console.log("<= run searchHandler =>");
    switch (searchBy) {
      case "title":
        searchRes = list?.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase()))
        break
      case "fullName":
        searchRes = list?.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
        break
      case "userName":
        searchRes = list?.filter(item => item.username.toLowerCase().includes(e.target.value.toLowerCase()))
        break
      case "email":
        searchRes = list?.filter(item => item.email.toLowerCase().includes(e.target.value.toLowerCase()))
        break
      case "code":
        searchRes = list?.filter(item => item.code.toLowerCase().includes(e.target.value.toLowerCase()))
        break
      case "percent":
        searchRes = list?.filter(item => item.percent.toLowerCase().includes(e.target.value.toLowerCase()))
        break
      case "creatorName":
        searchRes = list?.filter(item => item.creator?.name.toLowerCase().includes(e.target.value.toLowerCase()))
        break
      case "creator":
        searchRes = list?.filter(item => item.creator.toLowerCase().includes(e.target.value.toLowerCase()))
        break
      case "courseName":
        searchRes = list?.filter(item => item.course?.name.toLowerCase().includes(e.target.value.toLowerCase()))
        break
      case "category":
        searchRes = list?.filter(item => item.categoryID.title.toLowerCase().includes(e.target.value.toLowerCase()))
        break
      case "department":
        searchRes = list?.filter(item => item.departmentID.toLowerCase().includes(e.target.value.toLowerCase()))
        break
      case "departmentSub":
        searchRes = list?.filter(item => item.departmentSubID.toLowerCase().includes(e.target.value.toLowerCase()))
        break
      default:
        console.log("مقدار نامعتبر است");
        break
    }
    e.target.value !== "" ? setList(searchRes as any[]) : setList(list)
  };

  return (
    <>
      <div className="flex relative">
        <input
          onChange={searchHandler}
          value={searchValue}
          placeholder={`جستجو بین ${placeholder}...`}
          className={`${
            isShowSearchBox ? "px-2" : "size-0 hidden"
          } sm:text-sm text-xs sm:w-52 w-[30vw] shadow !rounded-e-none -translate-x-[5px] rounded-s-lg outline-none border-none bg-neut-ther-panel dark:bg-d-neut-ther-panel`}
          type="text"
        />
        <div
          onClick={() => {
            if (isShowChoseFieldBox) {
              setIsShowChoseFieldBox(false);
            } else {
              isShowSearchBox || setIsShowChoseFieldBox(true);
              setIsShowSearchBox(!isShowSearchBox);
              setSearchValue("")
              setList(list)
            }
          }}
          className={`${isShowSearchBox ? "!opacity-100" : ""}
          ${isShowChoseFieldBox ? "z-40" : ""} btn btn-sm btn-neut`}
        >
          <SearchRoundedIcon fontSize="small" />
        </div>
        {isShowChoseFieldBox && (
          <div className="z-40 absolute -left-20 top-14 bg-neut-ther-panel dark:bg-d-neut-ther-panel w-56 rounded-lg overflow-hidden">
            <div className="flex gap-2 text-sm justify-between items-center px-4 py-3 bg-neut-seco-panel dark:bg-d-neut-prim-panel text-neutral-700 dark:text-neutral-400">
              <div className="font-[dana-xl]">جستجو بر اساس</div>
              <div>
                <ManageSearchRoundedIcon />
              </div>
            </div>
            <div className="p-1.5">
              {searchFields.map((field) => (
                <div
                  onClick={() => {
                    setSearchBy(field.value);
                    setTimeout(() => {
                      setIsShowChoseFieldBox(false);
                    }, 200);
                  }}
                  className={`${
                    field.value === searchBy ? "bg-prim/15 text-prim" : "hover:bg-prim/5"
                  }  text-center px-2 py-3 font-[dana-xl] text-sm cursor-pointer rounded-lg`}
                >
                  جستجو بر اساس {field.title}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {isShowChoseFieldBox && (
        <CoverPageP z="z-30" onClick={() => setIsShowChoseFieldBox(false)} />
      )}
    </>
  );
}

export default SearchByP;

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { globalSearchHandler } from "../../Redux/slices/globalSearchSlice";
import type { T_searchResulve, T_searchValueSlice } from "../../Types/type";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useEffect, useState } from "react";
import WrapperLoader from "./WrapperLoader/WrapperLoader";
import { useNavigate } from "react-router";

function SearchBoxHome() {
  const [searchResulve, setSearchResulve] = useState<T_searchResulve | null>(
    null
  );

  const searchValue = useSelector(
    (state: T_searchValueSlice) => state.globalSearch.infos.value
  );

  const navigate = useNavigate();

  const getSearchResulveHandler = async () => {
    if (searchValue.trim()) {
      try {
        const resulve = await (
          await fetch(`http://localhost:4000/v1/search/${searchValue}`)
        ).json();
        setSearchResulve(resulve);
      } catch (error) {
        throw new Error(`${error}`);
      }
    }
  };

  useEffect(() => {
    getSearchResulveHandler();
  }, [searchValue]);

  const dispatch = useDispatch();

  return (
    <div className="relative !text-[15px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/category-courses/courses");
        }}
        className="bg-neut-prim text-d-neut-seco rounded-full md:p-2.5 sm:p-2 p-1.5 flex gap-2 overflow-hidden mx-auto"
      >
        <input
          onChange={(e) => dispatch(globalSearchHandler(e))}
          value={searchValue}
          type="text"
          className="bg-neut-prim border-none font-[dana-xl] outline-none sm:text-base w-full px-4"
          placeholder="جستوجو در بین دوره‌ ها ..."
        />
        <Link to={"/category-courses/courses"}>
          <button className="bg-prim text-neut-prim rounded-full grid place-content-center sm:w-14 w-[3.25rem] aspect-square">
            <SearchRoundedIcon fontSize="medium" />
          </button>
        </Link>
      </form>
      {searchValue.trim() && (
        <div className="search_resulve_box absolute max-h-80 overflow-y-auto z-[3] top-24 left-0 right-0 bg-neut-prim text-d-neut-seco rounded-xl overflow-hidden">
          {searchValue.length > 2 ? (
            <div className="p-3">
              {(searchResulve as T_searchResulve) ? (
                <>
                  {(searchResulve as T_searchResulve).allResultCourses
                    .length ? (
                    (searchResulve as T_searchResulve).allResultCourses.map(
                      (course) => (
                        <Link
                          to={`/course-info/${course.shortName}`}
                          className="flex gap-6 sm:p-3 p-2 justify-between items-center content-center hover:text-notf-seco"
                        >
                          <div className="font-[dana-xl]">{course.name}</div>
                          <div>
                            <ArrowBackIosRoundedIcon fontSize="small" />
                          </div>
                        </Link>
                      )
                    )
                  ) : (
                    <div className="sm:p-3 text-yellow-600 p-2 text-center sm:text-lg text-base">
                      متاسفانه نتیجه ای با مشخصات مورد نظر شما پیدا نشد!
                    </div>
                  )}
                </>
              ) : (
                <div className="sm:p-3 p-2 flex justify-center">
                  <WrapperLoader />
                </div>
              )}
            </div>
          ) : (
            <div className="text-center sm:text-lg text-base sm:p-5 p-3">
              برای نمایش نتایج، حداقل <span className="font-[irsans]">3</span>{" "}
              حرف وارد کنید
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBoxHome;

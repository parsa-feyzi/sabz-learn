import { useNavigate, useParams } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";
import CategoryContent from "./components/CategoryContent";
import { useEffect, useState } from "react";
  
import Footer from "../../Components/Footer/Footer";
import Topbar from "../../Components/Topbar/Topbar";
import type {
  T_CoursesData,
  T_InputEvent,
  T_searchValueSlice,
} from "../../Types/type";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import SortbyBox from "./components/SortbyBox";
import CoverPage from "../../Components/CoverPage/CoverPage";
import FilteringBox from "./components/FilteringBox";
import ToggleBox from "./components/ToggleBox";
import SortbyFullBox from "./components/SortbyFullBox";
import CategoryMainItems from "./components/CategoryMainItems";
import CategorySearchBox from "./components/CategorySearchBox";
import { useSelector } from "react-redux";
import CategoryToggleBox from "./components/CategoryToggleBox";
import ToggleCourseCategory from "./components/ToggleCourseCategory";
import useGetMenuDatas from "../../Hooks/useGetMenuDatas";
import Loading from "../../Components/Loading/Loading";

function Category() {
  const [categoryList] = useState([
    { id: 1, title: "همه دوره ها", key: "ALL" },
    { id: 2, title: "ارزان ترین", key: "CHEAPEST" },
    { id: 3, title: "گران ترین", key: "EXPENSIVE" },
    { id: 4, title: "دوره‌های رایگان", key: "FREE" },
  ]);

  const [categoryStatus, setCategoryStatus] = useState("ALL");

  const [coursesDatas, setCoursesDatas] = useState<T_CoursesData[] | null>(
    null
  );

  const [orderedCoursesDatas, setOrderedCoursesDatas] = useState<
    T_CoursesData[] | null
  >(null);

  const [searchValue, setSearchValue] = useState("");

  const [isShowSortbyBox, setIsShowSortbyBox] = useState(false);
  const [isShowFilteringBox, setIsShowFilteringBox] = useState(false);

  const [presellSortToggle, setPresellSortToggle] = useState(false);
  const [startSortToggle, setStartSortToggle] = useState(false);

  const [flage, setFlage] = useState(false);

  const globalSearchValue = useSelector(
    (state: T_searchValueSlice) => state.globalSearch.infos.value
  );

  const menuDatas = useGetMenuDatas();

  const { categoryName } = useParams();

  const getCoursesHandler = async () => {
    const coursesApi =
      categoryName === "courses"
        ? categoryName
        : `courses/category/${categoryName}`;

    let courses;
    try {
        courses = await (
          await fetch(`http://localhost:4000/v1/${coursesApi}`)
        ).json();

      const presellCourses = courses.filter(
        (course: T_CoursesData) => course.status === "presell"
      );
      const startCourses = courses.filter(
        (course: T_CoursesData) => course.status === "start"
      );

      categoryName == "courses"
        ? setSearchValue(globalSearchValue)
        : setSearchValue("");

      if (presellSortToggle) {
        setCoursesDatas(presellCourses);
      } else if (startSortToggle) {
        setCoursesDatas(startCourses);
      } else {
        setCoursesDatas(courses);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    getCoursesHandler();
  }, [categoryName, presellSortToggle, startSortToggle]);

  useEffect(() => {
    let orderedCourses: T_CoursesData[];

    if (coursesDatas) {
      switch (categoryStatus) {
        case "CHEAPEST": {
          orderedCourses = coursesDatas
            .filter((course) => course.price !== 0)
            .sort((a, b) => a.price - b.price);
          setSearchValue("");
          break;
        }
        case "EXPENSIVE": {
          orderedCourses = coursesDatas
            .filter((course) => course.price !== 0)
            .sort((a, b) => b.price - a.price);
          setSearchValue("");
          break;
        }
        case "FREE": {
          orderedCourses = coursesDatas.filter((course) => course.price === 0);
          setSearchValue("");
          break;
        }
        default: {
          if (
            globalSearchValue &&
            globalSearchValue === searchValue &&
            categoryName == "courses"
          ) {
            orderedCourses = coursesDatas?.filter((course) =>
              course.name
                .toLowerCase()
                ?.includes(globalSearchValue.toLowerCase())
            );
          } else {
            orderedCourses = coursesDatas.sort(
              (a, b) =>
                parseInt(b.createdAt.slice(0, 10).replaceAll("-", "")) -
                parseInt(a.createdAt.slice(0, 10).replaceAll("-", ""))
            );
          }
        }
      }
      setOrderedCoursesDatas(orderedCourses);
      setFlage(!flage);
    }
  }, [categoryStatus, coursesDatas]);

  const searchHandler = (e: T_InputEvent) => {
    setCategoryStatus("ALL");
    setSearchValue(e.target.value);
    if (coursesDatas) {
      const searchResulve = coursesDatas?.filter((course) =>
        course.name.toLowerCase()?.includes(e.target.value.trim().toLowerCase())
      );
      setOrderedCoursesDatas(searchResulve);
    }
  };

  return (
    <>
      {coursesDatas ? (
        <>
          <Topbar />
          <div>
            <Navbar isNavCourse />
            <div className="container_">
              <CategoryContent
                titlePage="دوره ها"
                labelPage="عنوان آموزشی"
                itemsCount={
                  // presellSortToggle && categoryName !== "courses"
                  //   ? orderedCoursesDatas?.filter(
                  //       (course) => course.categoryID?.name === categoryName
                  //     ).length
                  //   :
                  orderedCoursesDatas?.length
                }
              >
                <>
                  <div className="flex relative lg:flex-row flex-col gap-8 py-4">
                    <div className="xl:w-3/12 lg:w-4/12 w-full">
                      <CategorySearchBox
                        value={searchValue}
                        searchHandler={searchHandler}
                        lable="دوره ها"
                      />
                      <div className="sm:hidden flex gap-4">
                        <div
                          onClick={() => setIsShowFilteringBox(true)}
                          className="flex gap-1 justify-center p-3 items-center content-center w-full bg-neut-prim dark:bg-d-neut-prim rounded-lg cursor-pointer"
                        >
                          <div>
                            <FilterListRoundedIcon />
                          </div>
                          <div className="text-sm">فیلتر</div>
                        </div>
                        <div
                          onClick={() => setIsShowSortbyBox(true)}
                          className="flex gap-1 p-3 justify-center items-center content-center w-full bg-neut-prim dark:bg-d-neut-prim rounded-lg cursor-pointer"
                        >
                          <div>
                            <SwapVertRoundedIcon />
                          </div>
                          <div className="text-sm font-[dana-xl]">
                            {categoryList.map((category) => {
                              if (category.key === categoryStatus) {
                                return category.title;
                              }
                            })}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="sm:block hidden">
                          <div>
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
                                presellSortToggle &&
                                  setPresellSortToggle(false);
                                setStartSortToggle((prev) => !prev);
                              }}
                            />
                          </div>
                          <CategoryToggleBox>
                            <>
                              {menuDatas &&
                                menuDatas.map((menu) => (
                                    <ToggleCourseCategory
                                      title={menu.title}
                                      href={menu.href}
                                      key={menu._id}
                                    />
                                ))}
                            </>
                          </CategoryToggleBox>
                        </div>
                      </div>
                    </div>
                    <div className="xl:w-9/12 lg:w-8/12 w-full">
                      <SortbyFullBox
                        categoryList={categoryList}
                        categoryStatus={categoryStatus}
                        setCategoryStatus={setCategoryStatus}
                      />
                      <CategoryMainItems
                        items={orderedCoursesDatas as T_CoursesData[]}
                      />
                    </div>
                  </div>
                  {isShowSortbyBox && (
                    <CoverPage closeHandler={() => setIsShowSortbyBox(false)} />
                  )}
                  <SortbyBox
                    categoryList={categoryList}
                    isShow={isShowSortbyBox}
                    setIsShow={setIsShowSortbyBox}
                    categoryStatus={categoryStatus}
                    setCategoryStatus={setCategoryStatus}
                  />
                  <FilteringBox
                    isShow={isShowFilteringBox}
                    setIsShow={setIsShowFilteringBox}
                    presellSortToggle={presellSortToggle}
                    setPresellSortToggle={setPresellSortToggle}
                    startSortToggle={startSortToggle}
                    setStartSortToggle={setStartSortToggle}
                  />
                </>
              </CategoryContent>
            </div>
          </div>
          <Footer />
           
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Category;

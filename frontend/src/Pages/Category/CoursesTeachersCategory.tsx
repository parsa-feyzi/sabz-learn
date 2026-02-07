import { useNavigate, useParams } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";
import CategoryContent from "./components/CategoryContent";
import { useEffect, useState } from "react";
  
import Footer from "../../Components/Footer/Footer";
import Topbar from "../../Components/Topbar/Topbar";
import type { T_CoursesData } from "../../Types/type";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import SortbyBox from "./components/SortbyBox";
import CoverPage from "../../Components/CoverPage/CoverPage";
import SortbyFullBox from "./components/SortbyFullBox";
import CategoryMainItems from "./components/CategoryMainItems";
import Loading from "../../Components/Loading/Loading";

function CoursesTeachersCategory() {
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

  const [isShowSortbyBox, setIsShowSortbyBox] = useState(false);

  const [flage, setFlage] = useState(false);

  const { teacherName } = useParams();

  const navigate = useNavigate();

  const getCoursesHandler = async () => {
    try {
      const courses = await (
        await fetch(`http://localhost:4000/v1/courses`)
      ).json();

      const mainCourses = courses.filter(
        (course: T_CoursesData) => course.creator === teacherName
      );

      setCategoryStatus("ALL")
      mainCourses ? setCoursesDatas(mainCourses) : navigate("/");
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    getCoursesHandler();
  }, [teacherName]);

  useEffect(() => {
    let orderedCourses: T_CoursesData[];

    if (coursesDatas) {
      switch (categoryStatus) {
        case "CHEAPEST": {
          orderedCourses = coursesDatas
            .filter((course) => course.price !== 0)
            .sort((a, b) => a.price - b.price);
          break;
        }
        case "EXPENSIVE": {
          orderedCourses = coursesDatas
            .filter((course) => course.price !== 0)
            .sort((a, b) => b.price - a.price);
          break;
        }
        case "FREE": {
          orderedCourses = coursesDatas.filter((course) => course.price === 0);
          break;
        }
        default: {
          orderedCourses = coursesDatas.sort(
            (a, b) =>
              parseInt(b.createdAt.slice(0, 10).replaceAll("-", "")) -
              parseInt(a.createdAt.slice(0, 10).replaceAll("-", ""))
          );
        }
      }
      setOrderedCoursesDatas(orderedCourses);
      setFlage(!flage);
    }
  }, [categoryStatus, coursesDatas]);

  return (
    <>
      {coursesDatas ? (
        <>
          <Topbar />
          <div>
            <Navbar isNavCourse />
            <div className="container_">
              <CategoryContent
              pb="sm:pb-6 pb-4"
                titlePage={
                  <span className="text-xl font-[dana-b]">
                    دوره‌های آموزشی {teacherName}
                  </span>
                }
                labelPage="عنوان آموزشی"
                itemsCount={orderedCoursesDatas?.length}
              >
                <>
                  <div className="flex flex-col gap-8 py-4">
                    <div className="w-full">
                      <div className="sm:hidden flex gap-4">
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
                    </div>
                    <div className="w-full">
                      <SortbyFullBox
                        categoryList={categoryList}
                        categoryStatus={categoryStatus}
                        setCategoryStatus={setCategoryStatus}
                      />
                      <CategoryMainItems
                        isFullWidth
                        items={orderedCoursesDatas}
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

export default CoursesTeachersCategory;

import { useState } from "react";
import ArticleBox from "../../../Components/ArticleBox/ArticleBox";
import CourseBox from "../../../Components/CourseBox/CourseBox";
import OutButton from "../../../Components/DesignSystem/OutButton";
import WrapperLoader from "../../../Components/DesignSystem/WrapperLoader/WrapperLoader";
import NotFoundContentIcon from "../../../Components/Icons/NotFoundContentIcon";
import type { T_ArticlesData, T_CoursesData } from "../../../Types/type";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type T_CategoryMainItems = { items: T_CoursesData[] | T_ArticlesData[] | null | undefined; isFullWidth?: boolean };


function CategoryMainItems({ items, isFullWidth }: T_CategoryMainItems) {
  const [courseShowCount, setCourseShowCount] = useState(12)

  return (
    <>
      {items ? (
        <>
          {items.length ? (
            <div className={`${isFullWidth ? "xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1" : "xl:grid-cols-3 sm:grid-cols-2 grid-cols-1"} grid gap-6 relative pb-20`}>
              {(items[0] as T_CoursesData).status ? (
                <>
                  {items.slice(0, courseShowCount).map((course) => (
                    <CourseBox courseDatas={(course as T_CoursesData)} key={course._id} />
                  ))}
                </>
              ) : (
                <>
                  {items.map((article) => (
                    <ArticleBox {...(article as T_ArticlesData)} key={article._id} />
                  ))}
                </>
              )}
              {items.length > 12 && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                  <OutButton onClick={() => {
                    if(courseShowCount < items.length) {
                      setCourseShowCount(prevCount => prevCount + 12)
                    } else {
                      setCourseShowCount(12)
                    }
                  }} styles="!flex !text-sm">
                    <div>{courseShowCount < items.length ? "مشاهده بیشتر" : "مشاهده کمتر"}</div>
                    <div>
                      <KeyboardArrowDownIcon className={courseShowCount < items.length ? "" : "rotate-180"} />
                    </div>
                  </OutButton>
                </div>
              )}
            </div>
          ) : (
            <div className="opacity-50 w-full md:py-20 py-8 px-8 grid place-content-center rounded-xl md:border-2 border border-d-neut-prim/60 dark:border-neut-prim/60 border-dashed">
              <div className="flex justify-center sm:mb-11 mb-8">
                <NotFoundContentIcon />
              </div>
              <div className="md:text-xl text-lg font-[dana-b] text-center">
                متاسفانه نتیجه‌ای مطابق با جستجوی شما پیدا نشد
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full flex justify-center sm:p-12 py-6 sm:text-right text-center sm:text-xl text-base">
          <WrapperLoader />
        </div>
      )}
    </>
  );
}

export default CategoryMainItems;

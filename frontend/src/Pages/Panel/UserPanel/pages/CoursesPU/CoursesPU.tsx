import { useEffect, useState } from "react";
import DataCotainerBox from "../../../components/DataCotainerBox/DataCotainerBox";
import type { T_Transaction } from "../../../../../Types/type";
import CourseBoxP from "../../../components/CourseBoxP/CourseBoxP";
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import { Link } from "react-router";
import EmptyPU from "../../../components/EmptyPU/EmptyPU";

function CoursesPU() {
  const [myCourses, setMyCourses] = useState<T_Transaction[] | null>(null);

  const userDatas = JSON.parse(localStorage.getItem("user") as string);

  const getAllMyCourses = async () => {
    try {
      const allMyCourses = await (
        await fetch(`http://localhost:4000/v1/users/courses`, {
          headers: {
            Authorization: `Bearer ${userDatas.token}`,
          },
        })
      ).json();
      console.log(allMyCourses);
      setMyCourses(allMyCourses.reverse());
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    getAllMyCourses();
  }, []);

  return (
    <DataCotainerBox
      title="دوره‌ های من"
      action={
        <>
          <div className="flex items-end gap-1 pe-2 text-neutral-600/70 dark:text-neutral-400/70">
            {myCourses?.length ? (
              <>
                <div className="font-[irsans] font-bold text-xl">
                  {myCourses.length}
                </div>
                <div className="font-[dana-b]">دوره</div>
              </>
            ) : (
              <div className="sm:block hidden text-sm font-[dana-xl]">
                هنوز دوره‌ای خریداری نکردید!
              </div>
            )}
          </div>
        </>
      }
    >
      <div className="min-h-[70vh]">
        {myCourses && (
          <div>
            {myCourses.length ? (
              <div
                className={`${
                  myCourses.length >= 4
                    ? "panel_item_box_container"
                    : "lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
                } px-2 grid gap-x-6 gap-y-8 pb-6`}
              >
                {myCourses.map(
                  (course) =>
                    course.course && (
                      <CourseBoxP
                        cover={course.course.cover}
                        price={course.price}
                        name={course.course.name}
                        creator={course.course.creator}
                        href={course.course.shortName}
                        key={course._id}
                        isUserPanel
                      />
                    )
                )}
              </div>
            ) : (
              <div>
              <EmptyPU title="هنوز تو هیچ دوره‌ای شرکت نکردی!" text="یه نگاهی به دوره‌ها بنداز، شاید چیزی نظرتو جلب کنه، شاید دقیقاً همون چیزی باشه که مدت‌ها دنبالش بودی." img="courses-empty.png" >
                  <Link to={"/category-courses/courses"} className="flex gap-2 items-center text-prim">
                  <div className="font-[dana-xl]">بزن بریم سراغ دوره‌ها</div>
                  <WestRoundedIcon fontSize="small" />
                  </Link>
              </EmptyPU>
              </div>
            )}
          </div>
        )}
      </div>
    </DataCotainerBox>
  );
}

export default CoursesPU;

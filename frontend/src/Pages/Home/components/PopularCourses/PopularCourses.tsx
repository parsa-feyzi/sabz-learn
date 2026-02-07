import HeaderSection from "../../../../Components/HeaderSection/HeaderSection";
import { SwiperSlide } from "swiper/react";
import { memo, useEffect, useState } from "react";
import type { T_CoursesData } from "../../../../Types/type";
import CourseBox from "../../../../Components/CourseBox/CourseBox";
import SwiperBox from "../../../../Components/SwiperBox/SwiperBox";

const PopularCourses = memo(() => {
  const [courses, setCourses] = useState<T_CoursesData[] | null>(null);

  const getCoursesHandler = async () => {
    try {
      const courses = await (
        await fetch(`http://localhost:4000/v1/courses/popular`)
      ).json();
      setCourses(courses);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    getCoursesHandler();
  }, []);

  return (
    <div className="relative pt-24 sm:pt-40">
      <HeaderSection
        subject="پرطرفدار ترین دوره ها"
        title="دوره های محبوب و پروژه محور بــی‌لـرن"
      />
      <div className="rounded-lg overflow-hidden">
        <SwiperBox>
          <>
            {courses &&
              courses.slice(0, 12).map((course) => (
                <SwiperSlide>
                  <CourseBox courseDatas={course} />
                </SwiperSlide>
              ))}
          </>
        </SwiperBox>
      </div>
    </div>
  );
})

export default PopularCourses;

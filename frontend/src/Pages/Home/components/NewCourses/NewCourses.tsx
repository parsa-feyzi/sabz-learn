import { useState, useEffect, memo } from "react"
import HeaderSection from "../../../../Components/HeaderSection/HeaderSection"
import type { T_CoursesData } from "../../../../Types/type";
import SwiperBox from "../../../../Components/SwiperBox/SwiperBox";
// import { SwiperSlide } from "swiper/vue";
import CourseBox from "../../../../Components/CourseBox/CourseBox";
import { SwiperSlide } from "swiper/react";

const NewCourses = memo(() => {
  const [courses, setCourses] = useState<T_CoursesData[] | null>(null);

  const getCoursesHandler = async () => {
    try {
      const courses = await (
        await fetch(`http://localhost:4000/v1/courses`)
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
    <div className="pt-24 sm:pt-40">
        <HeaderSection subject="جدیدتریــن ها" title="دوره‌های جدید، فرصت‌های نو">
            <div></div>
        </HeaderSection>
        <div className="rounded-lg overflow-hidden">
        <SwiperBox>
          <>
            {courses &&
              courses.slice(0, 12).map((course) => (
                <SwiperSlide key={course._id}>
                  <CourseBox courseDatas={course} />
                </SwiperSlide>
              ))}
          </>
        </SwiperBox>
      </div>
    </div>
  )
})

export default NewCourses
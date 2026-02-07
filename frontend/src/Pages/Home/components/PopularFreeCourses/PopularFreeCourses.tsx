import { useEffect, useState } from "react";
import HeaderSectionLink from "../../../../Components/DesignSystem/HeaderSectionLink";
import HeaderSection from "../../../../Components/HeaderSection/HeaderSection";
import type { T_CoursesData } from "../../../../Types/type";
import CourseBox from "../../../../Components/CourseBox/CourseBox";

function PopularFreeCourses() {
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
      <HeaderSection
        subject="محبوب ترین دوره ها"
        title="پرمخاطب ترین دوره های رایگان بــی‌لـرن"
      >
        <HeaderSectionLink label="همه دوره ها" link="/category-courses/courses" />
      </HeaderSection>
      <div style={{gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))"}} className="grid lg:gap-7 gap-6">
        {courses &&
          courses.slice(0, 8).map((course: T_CoursesData) => (
            <CourseBox courseDatas={course} noneDescription key={course._id} />
          ))}
      </div>
    </div>
  );
}

export default PopularFreeCourses;

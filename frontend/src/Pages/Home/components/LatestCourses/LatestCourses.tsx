import { useState, useEffect } from "react";
import CourseBox from "../../../../Components/CourseBox/CourseBox";
import HeaderSectionLink from "../../../../Components/DesignSystem/HeaderSectionLink";
import HeaderSection from "../../../../Components/HeaderSection/HeaderSection";
import type { T_CoursesData } from "../../../../Types/type";

function LatestCourses() {
  const [courses, setCourses] = useState<T_CoursesData[] | null>(null);

  const getCoursesHandler = async () => {
    try {
      const courses = await (
        await fetch(`http://localhost:4000/v1/courses`)
      ).json();
      
      setCourses(courses)
    } 
    catch (error) {
      throw new Error(`${error}`)
    }
  }

  useEffect(() => {
    getCoursesHandler()
  }, [])

  return (
    <div>
      <HeaderSection
        subject="آخـــرین دوره های ما"
        title="سکوی پرتاپ شما به سمت موفقیت"
      >
        <HeaderSectionLink label="همه دوره ها" link="/category-courses/courses" />
      </HeaderSection>
      <div style={{gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))"}} className="grid lg:gap-6 gap-5">
        {courses && courses.slice(0, 12).map((course: T_CoursesData) => <CourseBox courseDatas={course} key={course._id} />)}
      </div>
    </div>
  );
}

export default LatestCourses;

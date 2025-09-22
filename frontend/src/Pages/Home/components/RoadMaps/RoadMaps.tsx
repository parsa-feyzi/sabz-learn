import { useEffect, useState } from "react";
import HeaderSection from "../../../../Components/HeaderSection/HeaderSection";
import FrontendIcon from "../../../../Components/Icons/FrontendIcon";
import PazzelIcon from "../../../../Components/Icons/PazzelIcon";
import PythonIcon from "../../../../Components/Icons/PythonIcon";
import SecureIcon from "../../../../Components/Icons/SecureIcon";
import type { T_CoursesData } from "../../../../Types/type";
import RoadMapsBox from "./RoadMapsBox";

function RoadMaps() {
  const [courses, setCourses] = useState<T_CoursesData[] | null>(null);
  // const [courses, setCourses] = useState<T_CoursesData[] | null>(null);
  // const [courses, setCourses] = useState<T_CoursesData[] | null>(null);
  // const [courses, setCourses] = useState<T_CoursesData[] | null>(null);

  const handleCategoryLenght = (categoryName: string) => (
    courses?.filter((course) => course.categoryID.name === categoryName)?.length
  )

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
        subject="نقشــه راه ها"
        title="نقشه های راه برای شروع اصولی یادگیری"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        <RoadMapsBox
          bg="from-[#FFB535] to-[#F2295B]"
          coursesNumber={handleCategoryLenght("frontend")}
          href="/category-courses/frontend"
          icon={<FrontendIcon />}
          title="فرانت اند"
        />
        <RoadMapsBox
          bg="from-[#10A5C4] to-[#18D54D]"
          coursesNumber={handleCategoryLenght("security")}
          href="/category-courses/security"
          icon={<SecureIcon />}
          title="امنیت"
        />
        <RoadMapsBox
          bg="from-[#2E9EFF] to-[#9C33F7]"
          coursesNumber={handleCategoryLenght("python")}
          href="/category-courses/python"
          icon={<PythonIcon />}
          title="پایتون"
        />
        <RoadMapsBox
          bg="from-[#FF3571] to-[#880175]"
          coursesNumber={handleCategoryLenght("softskills")}
          href="/category-courses/softskills"
          icon={<PazzelIcon />}
          title="مهارت های نرم"
        />
      </div>
    </div>
  );
}

export default RoadMaps;

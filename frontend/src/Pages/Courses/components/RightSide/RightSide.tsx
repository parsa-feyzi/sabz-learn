import { useEffect, useState } from "react";
import ContainerContentBox from "../../../../Components/ContainerContentBox/ContainerContentBox";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CommentBox from "../../../../Components/CommentBox/CommentBox";
import TopicCourse from "../../components/Topic/TopicCourse";
import type {
  T_CoursesData,
  T_comment,
  T_sessions,
} from "../../../../Types/type";
import CoursesOfferBox from "../CourseOfferBox/CourseOfferBox";

type T_RightSide = {
  id: string;
  cover: string;
  description: string;
  sessions: T_sessions[];
  comments: T_comment[];
  isUserRegisteredToThisCourse: boolean;
  courseShortName: string;
  getDataHandler: () => Promise<void>
};

function RightSide({ id, cover, description, sessions, comments, isUserRegisteredToThisCourse, courseShortName, getDataHandler }: T_RightSide) {
  const [relatedCourses, setRelatedCourses] = useState<T_CoursesData[] | null>(null);

  const getRelatedCourses = async () => {
    try {
      const courses = await (
        await fetch(`http://localhost:4000/v1/courses/related/${courseShortName}`)
      ).json();
      setRelatedCourses(courses);
    } 
    catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    getRelatedCourses();
  }, [id]);

  return (
    <div>
      <ContainerContentBox
        title="توضیحات"
        color="#f59e0b"
        icon={<DescriptionRoundedIcon fontSize="large" />}
      >
        <div className="pt-9">
          <div className="mb-6">
            <img
              className="w-full object-cover object-center rounded-lg"
              src={cover}
            />
          </div>
          <div className="text-lg pb-4">{description}</div>
        </div>
      </ContainerContentBox>
      <ContainerContentBox
        title="سرفصل ها"
        color="#0ea5e9"
        icon={<SchoolRoundedIcon fontSize="large" />}
      >
        <div className="">
          <TopicCourse
            title={"جلسات دوره"}
            sessions={sessions}
            isUserRegisteredToThisCourse={isUserRegisteredToThisCourse}
            shortName={courseShortName}
          />
        </div>
      </ContainerContentBox>
      <div className="sm:block hidden">
        {relatedCourses?.length !== 0 && (
          <ContainerContentBox
            title="دوره های مرتبط"
            color="#eab308"
            icon={<AutoAwesomeRoundedIcon fontSize="large" />}
          >
            <div className="">
              {relatedCourses?.map((course) => (
                <CoursesOfferBox
                  name={course.name}
                  href={course.shortName}
                  cover={course.cover}
                  key={course._id}
                />
              ))}
            </div>
          </ContainerContentBox>
        )}
      </div>
      <CommentBox
        comments={comments}
        label="دوره"
        courseShortName={courseShortName}
        getDataHandler={getDataHandler}
      />
    </div>
  );
}

export default RightSide;

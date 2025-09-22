import InfoIcon from "../../../../Components/Icons/InfoIcon";
import ClockIcon from "../../../../Components/Icons/ClockIcon";
import WeekIcon from "../../../../Components/Icons/WeekIcon";
import PeopleIcon from "../../../../Components/Icons/PeopleIcon";
import BriefcaseIcon from "../../../../Components/Icons/BriefcaseIcon";
import VideoIcon from "../../../../Components/Icons/VideoIcon";
import CourseBoxInfo from "./DetailsBox";

function DetailsBoxes({ status, updated, support, time }: { status: 0 | 1, updated: string, support: string; time: string }) {
  return (
    <div className="grid sm:grid-cols-3 grid-cols-2 gap-6 w-full">
      <CourseBoxInfo title="وضعیت دوره" info={status ? 'تکمیل شده' : 'درحال برگزاری'}>
        <InfoIcon />
      </CourseBoxInfo>
      <CourseBoxInfo title="مدت زمان دوره" info={`${time} ساعت`}>
        <ClockIcon />
      </CourseBoxInfo>
      <CourseBoxInfo title="آخرین بروزرسانی" info={updated?.slice(0, 10)}>
        <WeekIcon />
      </CourseBoxInfo>
      <CourseBoxInfo title="روش پشتیبانی" info={support}>
        <PeopleIcon />
      </CourseBoxInfo>
      <CourseBoxInfo title="پیش نیاز" info={"ندارد"}>
        <BriefcaseIcon />
      </CourseBoxInfo>
      <CourseBoxInfo title="نوع مشاهده" info={"آنلاین"}>
        <VideoIcon />
      </CourseBoxInfo>
    </div>
  );
}

export default DetailsBoxes;

import CourseBoxInfo from "../../components/DetailsBoxes/DetailsBox";
import PeopleFillIcon from "../../../../Components/Icons/PeopleFillIcon";
import StarFillIcon from "../../../../Components/Icons/StarFillIcon";
import TeacherProfileBox from "../../../../Components/TeacherProfileBox/TeacherProfileBox";

type T_LeftSide = {
  teacher: string;
  profilTicher?: string;
  students: number;
  score: string;
  completionValue: number;
};

function LeftSide({ teacher, profilTicher, students, score, completionValue }: T_LeftSide) {
  return (
    <div className="lg:w-4/12 w-full relative">
      <div className="sticky top-6">
        <div className="w-full mb-6 bg-neut-prim dark:bg-d-neut-prim p-5 rounded-lg flex flex-col justify-between gap-4">
          <div className="grid grid-cols-2 gap-4">
            <CourseBoxInfo info="دانشجو" title={students} seco={true}>
              <PeopleFillIcon />
            </CourseBoxInfo>
            <CourseBoxInfo info="رضایت" title={score} seco={true}>
              <StarFillIcon />
            </CourseBoxInfo>
          </div>
          <div>
            <div className="flex justify-between mb-3">
              <div className="font-[dana-b] text-[17px]">درصد تکمیل دوره</div>
              <div className="font-[irsans] font-bold">{completionValue}%</div>
            </div>
            <div className="w-full h-[10px] bg-prim/10 rounded-full relative">
              <span
                style={{ width: `${completionValue}%` }}
                className="h-full bg-prim rounded-full absolute left-0"
              ></span>
            </div>
          </div>
        </div>
        <TeacherProfileBox image={profilTicher} name={teacher} />
      </div>
    </div>
  );
}

export default LeftSide;

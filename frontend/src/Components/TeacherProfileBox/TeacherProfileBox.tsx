import OutButton from "../DesignSystem/OutButton";
import { Link } from "react-router";

function TeacherProfile({ image, name }: { image?:string, name:string }) {
  return (
    <div className="w-full bg-neut-prim dark:bg-d-neut-prim p-5 rounded-lg flex flex-col items-center gap-4">
      <div>
        <img
          className="size-[5.5rem] rounded-full object-cover"
          src={image}
        />
      </div>
      <div>
        <div className="text-lg text-center pb-1">{name} | مدرس دوره</div>
      </div>
      <div>
        <OutButton styles="!text-sm">
          <Link to={`/teacher-courses/${name}`}>مشاهده پروفایل من</Link>
        </OutButton>
      </div>
    </div>
  );
}

export default TeacherProfile;

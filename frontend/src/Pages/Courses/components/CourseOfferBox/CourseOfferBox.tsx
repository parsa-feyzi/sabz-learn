import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import { Link } from "react-router";

type T_CourseOfferBox = { name: string; href: string; cover: string };

function CourseOfferBox({ name, href, cover }: T_CourseOfferBox) {
  return (
    <div className="flex mb-5 justify-between items-center sm:p-2 rounded-lg bg-neut-seco dark:bg-d-neut-ther">
      <Link to={`/course-info/${href}`} className="flex sm:gap-4 gap-2 items-center">
        <img className="rounded-lg h-16 object-cover" src={`http://localhost:4000/courses/covers/${cover}`} />
        <div className="line-clamp-1 font-[dana-xl]">{name}</div>
      </Link>
      <Link
        to={`/course-info/${href}`}
        className="flex gap-2 items-center text-notf me-4"
      >
        <div className="font-[dana-xl] text-sm">مشاهده</div>
        <div>
          <ArrowCircleLeftRoundedIcon fontSize="small" />
        </div>
      </Link>
    </div>
  );
}

export default CourseOfferBox;

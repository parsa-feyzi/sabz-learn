import { Link } from "react-router";
import { useParams } from "react-router";

type T_ToggleCourseCategory = { title: string; href: string };

function ToggleCourseCategory({ title, href }: T_ToggleCourseCategory) {
  const { categoryName } = useParams();

  return (
    <>
      <Link
        to={
          categoryName === href
            ? `/category-courses/courses`
            : `/category-courses/${href}`
        }
      >
        <div className="flex gap-2 text-sm cursor-pointer">
          <div>
            <div
              className={`${
                categoryName === href
                  ? "bg-notf"
                  : "bg-gray-200 dark:bg-d-neut-ther"
              } size-4 rounded-sm`}
            ></div>
          </div>
          <div>{title}</div>
        </div>
      </Link>
    </>
  );
}

export default ToggleCourseCategory;

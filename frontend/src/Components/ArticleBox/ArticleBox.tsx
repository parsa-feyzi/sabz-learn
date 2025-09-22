import { Link } from "react-router";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import type { T_ArticlesData } from "../../Types/type";

function ArticleBox({ shortName, cover, title, description, creator, createdAt }: T_ArticlesData) {
  return (
    <Link
      to={`/article-info/${shortName}`}
      className="ArticleBox_container  rounded-xl overflow-hidden gap-1 duration-300  hover:opacity-95 hover:shadow-xl dark:hover:shadow-[#3e48491e] bg-neut-prim dark:bg-d-neut-prim"
    >
      <div className="h-[11.5rem]">
        <img
          className="rounded-xl object-cover size-full"
          src={`http://localhost:4000/courses/covers/${cover}`}
        />
      </div>
      <div className="p-4 flex flex-col justify-between gap-6 h-[calc(100%-11.5rem)]">
        <div>
          <div className="line-clamp-2 font-[dana-b] pb-1">{title}</div>
          <div className="line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </div>
        </div>
        <div>
          <div className="flex justify-between pb-3 mb-4 border-b-2 border-gray-500 text-gray-500 dark:text-gray-400 border-opacity-15">
            <div className="line-clamp-1 font-[dana-xl] text-sm">{creator.name}</div>
            <div className="line-clamp-1 font-[irsans] font-bold text-sm mt-0.5">
              {createdAt.slice(0,10)}
            </div>
          </div>
          <div className="ArticleBox_arrowLink flex justify-center items-center gap-1 pb-1">
            <div className="font-[dana-xl]">مطالعه مقاله</div>
            <div>
              <ArrowCircleLeftRoundedIcon fontSize="small" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ArticleBox;

import { Link } from "react-router";
import type { T_ArticlesData } from "../../../../Types/type";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";

function ArticleOfferBox({ title, shortName, createdAt, cover }: T_ArticlesData) {
  return (
    <Link
      to={`/article-info/${shortName}`}
      className="flex sm:gap-4 gap-3 sm:p-3 p-2 rounded-lg bg-neut-seco dark:bg-d-neut-ther"
    >
      <img
        className="h-20 object-cover rounded-xl"
        src={`http://localhost:4000/courses/covers/${cover}`}
      />

      <div className="flex flex-col sm:py-1 py-2 justify-between">
        <div className="line-clamp-1 font-[dana-xl]">
          {title}
        </div>
        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
          <div>
            <DateRangeOutlinedIcon fontSize="small" />
          </div>
          <div className="font-[irsans] text-sm">{createdAt.slice(0, 10)}</div>
        </div>
      </div>
    </Link>
  );
}

export default ArticleOfferBox;

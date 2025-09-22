import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import { Link } from "react-router";

type T_ArticleBoxP = {
  cover: string;
  title: string;
  creator: string;
  publish: 0 | 1;
  href: string
};

function ArticleBoxP({ cover, title, creator, publish, href }: T_ArticleBoxP) {
  return (
    <div className="flex flex-col justify-between">
      <div>
        <div>
          <Link to={publish ? `/article-info/${href}` : `/panel-admin`} className="rounded-md block overflow-hidden">
            <img src={`http://localhost:4000/courses/covers/${cover}`} alt="" />
          </Link>
          <Link to={publish ? `/article-info/${href}` : `/panel-admin`} className="line-clamp-2 px-2 font-[dana-xl] pt-2">{title}</Link>
        </div>
        <div className="flex text-[13px] gap-1 items-center px-2 pt-4 text-gray-600 dark:text-gray-400">
          <div>
            <PersonOutlineRoundedIcon fontSize="small" />
          </div>
          <div>{creator}</div>
        </div>
      </div>
      {publish ? (
        <div className="mt-3 p-2 text-center text-prim bg-prim/10 rounded">
          <span className="font-[dana-xl]">منتشر شده</span>
        </div>
      ) : (
        <div className="mt-3 p-1 text-center text-amber-600 bg-amber-600/10 rounded">
          <span className="font-[dana-xl]">پیش نویس</span>
        </div>
      )}
    </div>
  );
}

export default ArticleBoxP;

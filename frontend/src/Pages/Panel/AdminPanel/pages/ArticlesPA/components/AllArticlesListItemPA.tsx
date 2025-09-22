import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import type { T_ArticlesData } from "../../../../../../Types/type";
import { Link } from "react-router";

type T_AllCategoriesListItemPA = {
  article: T_ArticlesData;
  index: number;
  id: number;
  editArticles: (article: T_ArticlesData) => void;
  deleteArticles: (article: T_ArticlesData) => void;
};

function AllArticlesListItemPA({ article, index, editArticles, deleteArticles, id }: T_AllCategoriesListItemPA) {
  return (
    <div
      className={`${
        index % 2
          ? ""
          : "rounded-lg bg-neut-seco-panel dark:bg-d-neut-seco-panel"
      } items-center grid grid-cols-12 py-4 me-2 rounded-md *:shrink-0`}
    >
      <div className="w-auto md:text-base col-span-1 text-center">
        <span className="font-[irsans] font-bold text-sm opacity-50 text-label xs:text-caption">
          {id + 1}
        </span>
      </div>
      <div className="w-auto sm:text-base col-span-3 text-center flex items-center justify-center gap-x-1.5">
        <span className="text-label xs:text-caption text-sm font-[dana-b]">
          {article.title}
        </span>
      </div>
      <div className="w-auto sm:text-base col-span-3 text-center flex items-center justify-center gap-x-1.5">
        <span className="text-label xs:text-caption text-sm">
          {article.creator.name}
        </span>
      </div>
      <div className="w-auto sm:text-base col-span-2 text-center flex items-center justify-center gap-x-1.5">
        <span className="text-label xs:text-caption text-sm">
          {article.shortName}
        </span>
      </div>
      <div className="w-auto col-span-3 text-center">
        <div className="w-auto text-label text-center px-2 py-0.5 mx-auto bg-brand-90/10 text-brand-darker rounded-md">
          <div className="flex sm:gap-4 gap-3 justify-center">
            {article.publish ? (
              <div
                className="btn btn-sm !shadow-none !opacity-0 !cursor-default"
              >
              </div>
            ) : (
              <Link
                to={`draft/${article.shortName}`}
                className="btn btn-sm btn-neut !text-amber-500"
              >
                <DriveFileRenameOutlineOutlinedIcon fontSize="small" />
              </Link>
            )}
            <div
              onClick={() => deleteArticles(article)}
              className="btn btn-sm btn-neut !text-rose-500"
            >
              <DeleteOutlineRoundedIcon fontSize="small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllArticlesListItemPA;

import type { T_comment } from "../../../../../../Types/type";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import "../../../../../../Button.css";

type T_AllCommentsListItem = {
  comment: T_comment;
  index: number;
  id: number
  deleteComment: (comment: T_comment) => void;
  banUser: (comment: T_comment) => void;
  answerToComment: (comment: T_comment) => void;
  seeMessageHandler: (comment: T_comment) => void;
};

function AllCommentListItemPA({ comment, index, deleteComment, banUser, answerToComment, seeMessageHandler, id }: T_AllCommentsListItem) {
  return (
    <div
      className={`${
        index % 2
          ? ""
          : "rounded-lg bg-neut-seco-panel dark:bg-d-neut-seco-panel"
      } relative overflow-hidden flex items-center sm:grid sm:grid-cols-12 py-4 me-2 rounded-md *:shrink-0`}
    >
      <div className="w-16 sm:w-auto md:text-base text-sm sm:col-span-1 text-center">
        <span className="font-[irsans] font-bold opacity-50 text-label xs:text-caption">
          {id + 1}
        </span>
      </div>
      <div className="w-24 sm:w-auto md:text-base text-sm sm:col-span-2 text-center flex items-center justify-center gap-x-1.5">
        <span className="text-label xs:text-caption">
          {comment.creator.name}
        </span>
      </div>
      <div className="w-28 px-6 sm:w-auto md:text-base text-sm sm:col-span-4 text-center">
        <span className="text-label xs:text-caption">{comment.course}</span>
      </div>
      <div className="w-36 sm:w-auto md:text-base text-sm sm:col-span-2 text-center">
        <span className="text-label xs:text-caption">
          <span
            onClick={() => seeMessageHandler(comment)}
            className="cursor-pointer active:scale-90 py-2 px-2 flex gap-2 w-fit items-center text-sm rounded bg-notf-seco/10 dark:bg-notf/5 dark:text-notf/60 text-notf-seco/70"
          >
            <div className="font-[dana-xl]">مشاهده نظر</div>
            <VisibilityOutlinedIcon fontSize="small" />
          </span>
        </span>
      </div>
      <div className="w-60 sm:w-auto md:text-base text-sm sm:col-span-3 text-center">
        <div className="w-auto text-label text-center px-2 py-0.5 mx-auto bg-brand-90/10 text-brand-darker rounded-md">
          <div className="flex sm:gap-3 gap-2 justify-center">
            <div
              onClick={() => answerToComment(comment)}
              className="btn btn-sm btn-neut !text-prim"
            >
              {comment.answerContent ? (
                <ForwardToInboxRoundedIcon className="opacity-60 dark:opacity-50" />
              ) : (
                <ForwardToInboxRoundedIcon />
              )}
            </div>
            <div
              onClick={() => deleteComment(comment)}
              className="btn btn-sm btn-neut !text-rose-500"
            >
              <DeleteOutlineRoundedIcon fontSize="small" />
            </div>
            <div
              onClick={() => banUser(comment)}
              className="btn btn-sm btn-neut !text-rose-800 dark:!text-rose-600"
            >
              <BlockRoundedIcon fontSize="small" />
            </div>
          </div>
        </div>
      </div>
      <div className={`${comment.answer ? "" : "bg-red-600/15 dark:bg-red-400/15"} absolute h-full w-6`}></div>
    </div>
  );
}

export default AllCommentListItemPA;

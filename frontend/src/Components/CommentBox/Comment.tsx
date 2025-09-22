import type { T_comment } from "../../Types/type";
import ReplyAllRoundedIcon from "@mui/icons-material/ReplyAllRounded";
import CommentProfile from "./CommentProfile";
import { useSelector } from "react-redux";
import type { I_AuthInfos } from "../../Types/interface";

type T_Comment = T_comment & {
  answerToComment: (commentId: string) => void;
};

function Comment({ _id, creator, createdAt, body, answerContent, answerToComment }: T_Comment) {
  const authInfos = useSelector(
    (state: { authInfos: { values: I_AuthInfos } }) => state.authInfos.values
  );

  return (
    <div className="my-4 rounded-lg p-4 bg-neut-seco dark:bg-d-neut-ther">
      <div className="flex justify-between items-center content-center pb-4 mb-4 lbb">
        <CommentProfile
          name={creator.name}
          role={creator.role}
          createdAt={createdAt}
          profile={creator.profile}
        />
        {authInfos.userInfos?.role === "ADMIN" && !answerContent && (
          <a
            onClick={() => answerToComment(_id)}
            href="#comment_box"
            className="text-notf size-10 border-2 border-notf rounded-full grid place-content-center cursor-pointer hover:bg-notf/10"
          >
            <div className="-translate-y-[1px]">
              <ReplyAllRoundedIcon />
            </div>
          </a>
        )}
      </div>
      <div
        className={`${
          answerContent ? "pb-4" : "pb-2"
        } sm:ps-2 ps-1 font-[dana-l]`}
      >
        {body}
      </div>
      {answerContent && (
        <div className="p-4 bg-neut-prim dark:bg-d-neut-prim rounded-lg">
          <div className="flex justify-between items-center content-center pb-4 mb-4 lbb">
            <CommentProfile
              name={answerContent.creator.name}
              role={"ADMIN"}
              createdAt={answerContent.createdAt}
              profile={answerContent.creator.profile}
            />
          </div>
          <div className="pb-2 sm:ps-2 ps-1 font-[dana-l]">
            {answerContent.body}
          </div>
        </div>
      )}
    </div>
  );
}

export default Comment;

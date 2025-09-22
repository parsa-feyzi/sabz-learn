import { useEffect, useRef, useState } from "react";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import MapsUgcRoundedIcon from "@mui/icons-material/MapsUgcRounded";
import ContainerContentBox from "../ContainerContentBox/ContainerContentBox";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import Button from "../DesignSystem/Button";
import EmpityIcon from "../Icons/EmpityIcon";
import OutButton from "../DesignSystem/OutButton";
import type { I_AuthInfos } from "../../Types/interface";
import { useSelector } from "react-redux";
import useAlertShow from "../../Hooks/useAlertShow";
import type {
  T_AlertIsShow,
  T_comment,
  T_setAlertShow,
} from "../../Types/type";
import Alert from "../Alert/Alert";
import { useNavigate } from "react-router";
import Comment from "./Comment";

type T_CommentBox = {
  comments: T_comment[];
  label: "مقاله" | "دوره";
  courseShortName: string;
  getDataHandler: () => Promise<void>;
};

function CommentBox({
  comments,
  label,
  courseShortName,
  getDataHandler,
}: T_CommentBox) {
  const [orderedComments, setOrderedComments] = useState<T_comment[] | null>(
    null
  );

  const [commentVal, setCommentVal] = useState("");

  const [targetComment, setTargetComment] = useState("");

  const [isShowCommentBox, setIsShowCommentBox] = useState(false);

  const commentTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [warningAlertIsShow, setWarningAlertIsShow] = useAlertShow();
  const [successAlertIsShow, setSuccessAlertIsShow] = useAlertShow();

  const authInfos = useSelector(
    (state: { authInfos: { values: I_AuthInfos } }) => state.authInfos.values
  );

  const navigate = useNavigate();

  const sendCommentHandler = async () => {
    const requistBody = {
      body: commentVal,
      courseShortName: courseShortName,
      score: "5",
    };
    try {
      await fetch(`http://localhost:4000/v1/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user") as string).token
          }`,
        },
        body: JSON.stringify(requistBody),
      });
      (setSuccessAlertIsShow as T_setAlertShow)();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const sendAnswerHandler = async () => {
    try {
      await fetch(`http://localhost:4000/v1/comments/answer/${targetComment}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authInfos.token}`,
        },
        body: JSON.stringify({
          body: commentVal,
        }),
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const sendHandler = () => {
    if (commentVal) {
      if (targetComment) {
        sendAnswerHandler();
        getDataHandler();
      } else {
        sendCommentHandler();
      }
      setIsShowCommentBox(false);
      setCommentVal("");
    }
  };

  const cancelCommentHandler = () => {
    setIsShowCommentBox(false);
    setCommentVal("");
  };

  const accessCreateNewCommentHandler = () => {
    if (authInfos.isLogin) {
      setIsShowCommentBox(true);
    } else {
      (setWarningAlertIsShow as T_setAlertShow)();
      setTimeout(() => {
        navigate("/login");
      }, 5100);
    }
  };

  const answerToComment = (commentId: string) => {
    setTargetComment(commentId);
    accessCreateNewCommentHandler();
  };

  const createNewComment = () => {
    setTargetComment("");
    accessCreateNewCommentHandler();
  };

  useEffect(() => {
    commentTextareaRef.current?.focus();
  }, [isShowCommentBox]);

  useEffect(() => {
    const orderedComments = comments.sort(
      (a, b) =>
        parseInt(b.createdAt.slice(0, 10).replaceAll("-", "")) -
        parseInt(a.createdAt.slice(0, 10).replaceAll("-", ""))
    );
    setOrderedComments(orderedComments);
  }, []);

  return (
    <div id="comment_box">
      {(warningAlertIsShow as T_AlertIsShow).isShow && (
        <Alert
          message={`برای ثبت نظر جدید لطفا ابتدا وارد شوید`}
          alertThem="bg-warn"
        />
      )}
      {(successAlertIsShow as T_AlertIsShow).isShow && (
        <Alert
          message={`نظر شما با موفقیت ثبت شد و بعد از تایید مدیر نمایش داده خواهد شد`}
          alertThem="bg-prim"
        />
      )}
      <ContainerContentBox
        title="نظرات"
        color="#dc2626"
        icon={<ForumRoundedIcon fontSize="large" />}
        leftBox={
          <div onClick={createNewComment}>
            <Button styles="!flex text-sm">
              <div>ایجاد نظر جدید</div>
              <div>
                <MapsUgcRoundedIcon fontSize="small" />
              </div>
            </Button>
          </div>
        }
      >
        <div>
          {isShowCommentBox && (
            <div>
              <div className="flex sm:mb-5 mb-4 items-center content-center gap-3">
                <div className="sm:p-1.5 p-1 border border-neut-seco dark:border-d-neut-ther rounded-full">
                  <div className="sm:size-12 size-11 bg-neut-seco dark:bg-d-neut-ther grid place-content-center rounded-full">
                    <div className="opacity-30">
                      <PersonRoundedIcon />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-around">
                  <div className="text-lg">{authInfos.userInfos?.username}</div>
                  <div className="text-sm dark:text-gray-400 text-gray-600">
                    ثبت نظر جدید
                  </div>
                </div>
              </div>
              <div className="sm:mb-4 mb-3">
                <textarea
                  onChange={(e) => setCommentVal(e.target.value)}
                  value={commentVal}
                  ref={commentTextareaRef}
                  className="md:p-5 p-4 max-h-[150vh] rounded-lg outline-none border-none placeholder:text-d-neut-seco/25 dark:placeholder:text-neut-prim/25 text-sm bg-neut-seco dark:bg-d-neut-ther w-full"
                  rows={6}
                  placeholder="نظر خود را بنویسید..."
                ></textarea>
              </div>
              <div className="flex justify-end sm:mb-5 mb-4 items-center content-center gap-3">
                <div onClick={cancelCommentHandler}>
                  <OutButton styles="sm:!w-36 sm:!py-[10px] sm:text-base text-sm">
                    لغو
                  </OutButton>
                </div>
                <div onClick={sendHandler}>
                  <Button styles="sm:!w-36 sm:!py-[10px] sm:text-base text-sm">
                    ارسال
                  </Button>
                </div>
              </div>
            </div>
          )}
          {orderedComments && orderedComments.length ? (
            <div>
              {orderedComments.map((comment) => {
                return (
                  <Comment
                    {...comment}
                    answerToComment={answerToComment}
                    key={comment._id}
                  />
                );
              })}
            </div>
          ) : (
            <div className="bg-neut-seco dark:bg-d-neut-ther py-5 rounded-lg flex flex-col items-center content-center gap-y-3">
              <div className="opacity-85">
                <EmpityIcon />
              </div>
              <div className="dark:text-gray-400 text-gray-600">
                نظری برای این {label} ثبت نشده است
              </div>
            </div>
          )}
        </div>
      </ContainerContentBox>
    </div>
  );
}

export default CommentBox;

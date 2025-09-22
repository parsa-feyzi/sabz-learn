import { useEffect, useState } from "react";
import DataCotainerBox from "../../../components/DataCotainerBox/DataCotainerBox";
import type { T_comment } from "../../../../../Types/type";
import WrapperLoader from "../../../../../Components/DesignSystem/WrapperLoader/WrapperLoader";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import CoverPageP from "../../../components/CoverPageP/CoverPageP";
import DeleteAlertPA from "../../../components/AlertP/DeleteAlertPA";
import AlertP from "../../../components/AlertP/AlertP";
import Button from "../../../../../Components/DesignSystem/Button";
import FormTextarea from "../../../../Submit/components/FormTextarea/FormTextarea";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import { CircularProgress } from "@mui/material";
import AllCommentListItemPA from "./components/AllCommentListItemPA";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

function CommentsPA() {
  const [allComments, setAllComments] = useState<T_comment[] | null>(null);

  const [isReverse, setIsReverse] = useState(false);

  const [targetComment, setTargetComment] = useState<T_comment | null>(null);

  const [isShowAlert, setIsShowAlert] = useState({
    delete: false,
    ban: false,
    answer: false,
    message: false,
  });

  const [answerValue, setAnswerValue] = useState("");

  const [sendAnswrIsPending, setSendAnswrIsPending] = useState(false);

  const userDatas = JSON.parse(localStorage.getItem("user") as string);

  // Functions
  const closeAlerts = () =>
    setIsShowAlert({
      delete: false,
      ban: false,
      answer: false,
      message: false,
    });

  const getAllComments = async () => {
    try {
      const allComments = await (
        await fetch(`http://localhost:4000/v1/comments`)
      ).json();
      console.log(allComments);
      isReverse
        ? setAllComments(allComments)
        : setAllComments(allComments.reverse());
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  // delete comment
  const deleteCommentHandler = async () => {
    try {
      await fetch(`http://localhost:4000/v1/comments/${targetComment?._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userDatas.token}`,
        },
      });
      getAllComments();
      closeAlerts();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const deleteComment = (comment: T_comment) => {
    setTargetComment(comment);
    setIsShowAlert((prev) => ({ ...prev, delete: true }));
  };

  // delete user
  const deleteUserHandler = async () => {
    try {
      await fetch(
        `http://localhost:4000/v1/users/${targetComment?.creator._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userDatas.token}`,
          },
        }
      );
      getAllComments();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  // delete ban user comments
  const deleteBanUserCommentsHandler = (banUserId?: string) => {
    allComments?.forEach(async (comment) => {
      if (comment.creator._id === banUserId) {
        try {
          await fetch(`http://localhost:4000/v1/comments/${comment._id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${userDatas.token}`,
            },
          });
        } catch (error) {
          throw new Error(`${error}`);
        }
      }
    });
  };

  // ban user
  const banUserHandler = async () => {
    try {
      await fetch(
        `http://localhost:4000/v1/users/ban/${targetComment?.creator._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${userDatas.token}`,
          },
        }
      );
      deleteBanUserCommentsHandler(targetComment?.creator._id);
      deleteUserHandler();
      closeAlerts();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const banUser = (comment: T_comment) => {
    setTargetComment(comment);
    setIsShowAlert((prev) => ({ ...prev, ban: true }));
  };

  // answer to comment
  const answerToCommentHandler = async () => {
    try {
      await fetch(
        `http://localhost:4000/v1/comments/answer/${targetComment?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userDatas.token}`,
          },
          body: JSON.stringify({
            body: answerValue,
          }),
        }
      );
      setSendAnswrIsPending(false);
      setAnswerValue("");
      getAllComments();
      closeAlerts();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const answerToComment = (comment: T_comment) => {
    setTargetComment(comment);
    setIsShowAlert((prev) => ({ ...prev, answer: true }));
  };

  // see message
  const seeMessageHandler = (comment: T_comment) => {
    setTargetComment(comment);
    setIsShowAlert((prev) => ({ ...prev, message: true }));
  };

  // acceptComment
  const acceptCommentHandler = async () => {
    try {
      await fetch(
        `http://localhost:4000/v1/comments/accept/${targetComment?._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${userDatas.token}`,
          },
        }
      );
      getAllComments()
      closeAlerts();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  // acceptComment
  const rejectCommentHandler = async () => {
    try {
      await fetch(
        `http://localhost:4000/v1/comments/reject/${targetComment?._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${userDatas.token}`,
          },
        }
      );
      getAllComments()
      closeAlerts();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <>
      <div>
        <DataCotainerBox
          title="لیست نظرات"
          action={
            <div
              onClick={() => {
                setAllComments([...(allComments as T_comment[])]?.reverse());
                setIsReverse(!isReverse);
              }}
              className="btn btn-sm btn-neut"
            >
              <FilterListRoundedIcon
                fontSize="small"
                className={isReverse ? "rotate-180" : ""}
              />
            </div>
          }
        >
          <div className="panel_table overflow-x-auto h-[72vh] lg:max-w-[calc(100vw-26.5rem)] md:max-w-[calc(100vw-18.5rem)]">
            <div className="min-w-max sm:min-w-[900px] relative">
              <div className="admin_Panel_Hs_Table flex text-sm items-center sm:grid grid-cols-20 sm:grid-cols-12 *:shrink-0">
                <div className="w-16 sm:w-auto sm:col-span-1 text-center">
                  <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                    شناسه
                  </span>
                </div>
                <div className="w-24 sm:w-auto sm:col-span-2 text-center">
                  <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                    نام کامل
                  </span>
                </div>
                <div className="w-28 sm:w-auto sm:col-span-4 text-center">
                  <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                    دوره
                  </span>
                </div>
              </div>
              <div className="*:odd:bg-d-neut-seco-panel">
                {allComments?.length !== 0 ? (
                  allComments?.map((comment, index) => (
                    <AllCommentListItemPA
                      comment={{ ...comment }}
                      id={isReverse ? index : allComments.length - index - 1}
                      index={index}
                      deleteComment={deleteComment}
                      banUser={banUser}
                      answerToComment={answerToComment}
                      seeMessageHandler={seeMessageHandler}
                      key={comment._id}
                    />
                  ))
                ) : (
                  <div className="h-36 pt-6 grid sm:ps-0 sm:place-content-center ps-[40vw]">
                    <WrapperLoader />
                  </div>
                )}
              </div>
            </div>
          </div>
        </DataCotainerBox>
      </div>
      {isShowAlert.delete && (
        <DeleteAlertPA
          deleteHandler={deleteCommentHandler}
          closeAlerts={closeAlerts}
          name={`نظر ${targetComment?.creator.name}`}
        />
      )}
      {isShowAlert.ban && (
        <DeleteAlertPA
          isBan
          deleteHandler={banUserHandler}
          closeAlerts={closeAlerts}
          name={targetComment?.creator.name}
        />
      )}
      {isShowAlert.answer && (
        <AlertP>
          <div>
            <div className="sm:w-[30vw]">
              <FormTextarea
                value={answerValue}
                setValue={(e) => setAnswerValue(e.target.value)}
                isAdminRegister
                placeholder="پاسخ خود را وارد کنید"
                errorMessage=""
                isSubmited={false}
              />
            </div>
            <div className="flex justify-center gap-3 pt-4">
              <Button
                onClick={closeAlerts}
                styles="!bg-neutral-500 dark:!bg-neutral-700 !py-2 sm:!px-10 !w-full"
              >
                لغو
              </Button>
              <Button
                onClick={() => {
                  if (answerValue) {
                    answerToCommentHandler();
                    setSendAnswrIsPending(true);
                  }
                }}
                styles="!py-2 sm:!px-10 !w-full"
              >
                {sendAnswrIsPending ? (
                  <CircularProgress color="inherit" size={"20px"} />
                ) : (
                  "ارسال"
                )}
              </Button>
            </div>
          </div>
        </AlertP>
      )}
      {isShowAlert.message && (
        <AlertP styles="md:!p-6">
          <div>
            <div className="flex gap-4 justify-between">
              <div>
                <div>
                  <div className="font-[dana-b] text-sm text-neutral-600 dark:text-neutral-400">
                    {targetComment?.creator.name}
                  </div>
                  <div className="text-sm ps-1 pt-0.5 text-neutral-500">
                    {targetComment?.creator.email}
                  </div>
                </div>
                <div className="leading-8 font-[dana-xl] px-2 pt-2">
                  {targetComment?.body}
                </div>
              </div>
              <div
                onClick={() => {
                  setIsShowAlert((prev) => ({
                    ...prev,
                    message: false,
                    answer: true,
                  }));
                }}
                className="text-prim hover:text-prim/70 pt-1 cursor-pointer active:scale-90"
              >
                <ForwardToInboxRoundedIcon />
              </div>
            </div>
            <div className="flex pt-4 justify-end">
                {targetComment?.answer ? (
                  <button onClick={rejectCommentHandler} className="py-2 flex gap-2 px-4 rounded font-[dana-b] text-sm cursor-pointer active:scale-90 bg-red-500/10 dark:bg-red-500/5 text-red-800 dark:text-red-300">
                    <span className="translate-y-[1px]">رد نظر</span>
                    <ThumbDownOutlinedIcon fontSize="small" />
                  </button>
                ) : (
                  <button onClick={acceptCommentHandler} className="py-2 flex gap-2 px-4 rounded font-[dana-b] text-sm cursor-pointer active:scale-90 bg-green-500/10 dark:bg-green-500/5 dark:text-green-300 text-green-800">
                    <span className="translate-y-[1px]">تایید نظر</span>
                    <ThumbUpOutlinedIcon fontSize="small" />
                  </button>
                )}
              </div>
          </div>
        </AlertP>
      )}
      {(isShowAlert.delete ||
        isShowAlert.ban ||
        isShowAlert.answer ||
        isShowAlert.message) && <CoverPageP z="z-40" onClick={closeAlerts} />}
    </>
  );
}

export default CommentsPA;

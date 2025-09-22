import { useEffect, useState } from "react";
import DataCotainerBox from "../../../components/DataCotainerBox/DataCotainerBox";
import type {
  T_AlertIsShow,
  T_CoursesData,
  T_InputEvent,
  T_SessionData,
  T_setAlertShow,
} from "../../../../../Types/type";
import WrapperLoader from "../../../../../Components/DesignSystem/WrapperLoader/WrapperLoader";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import CoverPageP from "../../../components/CoverPageP/CoverPageP";
import DeleteAlertPA from "../../../components/AlertP/DeleteAlertPA";
import AllSessionsListItemPA from "./components/AllSessionsListItemPA";
import FormInput from "../../../../Submit/components/FormInput/FormInput";
import NotesIcon from "@mui/icons-material/Notes";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import Button from "../../../../../Components/DesignSystem/Button";
import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import SearchByP from "../../../components/SearchByP/SearchByP";
import NotSearchRes from "../../../components/NotSearchRes/NotSearchRes";
import FormSelect from "../../../../Submit/components/FormSelect/FormSelect";
import { useSelector } from "react-redux";
import type { I_AuthInfos } from "../../../../../Types/interface";
import Alert from "../../../../../Components/Alert/Alert";
import useAlertShow from "../../../../../Hooks/useAlertShow";

type T_inputValues = {
  title: string;
  video: File | "";
  time: number | "";
  courseID: string;
  isFree: boolean;
};

function SessionsPA() {
  const [sessions, setSessions] = useState<T_SessionData[] | null>(null);

  const [orderedSessions, setOrderedSessions] = useState<
    T_SessionData[] | null
  >(null);

  const [courses, setCourses] = useState<T_CoursesData[] | null>(null);

  const [isSubmited, setIsSubmited] = useState(false);

  const [isReverse, setIsReverse] = useState(false);

  const [targetSession, setTargetSession] = useState<T_SessionData | null>(
    null
  );

  const [isShowAlert, setIsShowAlert] = useState({ delete: false });

  const [inputValues, setInputValues] = useState<T_inputValues>({
    title: "",
    video: "",
    time: "",
    courseID: "",
    isFree: false,
  });
  const { title, video, time, courseID, isFree } = inputValues;

  const [errorMessages, setErrorMessages] = useState({
    title: "",
    description: "",
    video: "",
    time: "",
    courseID: "",
  });

  const [successAlertSession, setSuccessAlertSession] = useAlertShow();

  const authInfos = useSelector((state: { authInfos: { values: I_AuthInfos } }) => state.authInfos.values);

  // Functions
  const closeAlerts = () => setIsShowAlert({ delete: false });

  const getAllCourses = async () => {
    try {
      const allCourses = await (
        await fetch(`http://localhost:4000/v1/courses`, {
          headers: {
            Authorization: `Bearer ${authInfos.token}`,
          },
        })
      ).json();
      setCourses(allCourses.filter((course: T_CoursesData) => course.creator === authInfos.userInfos?.name));
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const getAllSessions = async () => {
    try {
      const sessions = await (
        await fetch(`http://localhost:4000/v1/courses/sessions`, {
          headers: {
            Authorization: `Bearer ${authInfos.token}`,
          },
        })
      ).json();
      setSessions(sessions);
      isReverse
        ? setOrderedSessions(sessions)
        : setOrderedSessions(sessions.reverse());
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  // add new session
  const addNewSession = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("time", time as string);
    formData.append("video", video);
    formData.append("free", Number(isFree).toString());

    console.log(formData);

    try {
      const res =
        await fetch(`http://localhost:4000/v1/courses/${courseID}/sessions`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authInfos.token}`,
          },
          body: formData,
        })
      res.ok && (setSuccessAlertSession as T_setAlertShow)()
      getAllSessions();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmited(true);
    if (!errorMessages.title && !errorMessages.time && !errorMessages.video) {
      addNewSession();
      setIsSubmited(false);
      setInputValues(() => ({
        title: "",
        video: "",
        time: "",
        courseID: "",
        isFree: false,
      }));
    }
  };

  // delete session
  const deleteSessionHandler = async () => {
    console.log(targetSession?._id);
    try {
      await fetch(
        `http://localhost:4000/v1/courses/sessions/${targetSession?._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authInfos.token}`,
          },
        }
      );
      getAllSessions();
      closeAlerts();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const deleteSession = (user: T_SessionData) => {
    setTargetSession(user);
    setIsShowAlert((prev) => ({ ...prev, delete: true }));
  };

  useEffect(() => {
    if (!title) {
      setErrorMessages((prevError) => ({
        ...prevError,
        title: "error!",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, title: "" }));
    }

    if (!time) {
      setErrorMessages((prevError) => ({
        ...prevError,
        time: "error!",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, time: "" }));
    }

    if (!video) {
      setErrorMessages((prevError) => ({
        ...prevError,
        video: "error!",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, video: "" }));
    }

    if (!courseID) {
      setErrorMessages((prevError) => ({
        ...prevError,
        courseID: "error!",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, courseID: "" }));
    }
  }, [title, time, video, courseID]);

  useEffect(() => {
    getAllCourses();
    getAllSessions();
  }, []);

  return (
    <>
    {(successAlertSession as T_AlertIsShow).isShow && (
        <Alert
          isPanelAlert
          message={`جلسه با موفقیت آپلود شد`}
        />
      )}
      <div>
        {courses?.length !== 0 && <DataCotainerBox title="ایجاد جلسه جدید">
          <div>
            <form onSubmit={submitHandler} className="">
              <div className="grid sm:grid-cols-2 gap-x-4">
                <FormInput
                  isAdminRegister
                  value={title}
                  setValue={(e: T_InputEvent) =>
                    setInputValues({ ...inputValues, title: e.target.value })
                  }
                  errorMessage={errorMessages.title}
                  isSubmited={isSubmited}
                  placeholder="عنوان جلسه را وارد نمایید"
                  icon={<NotesIcon />}
                />
                <FormInput
                  isAdminRegister
                  value={time as string}
                  setValue={(e: T_InputEvent) =>
                    setInputValues({
                      ...inputValues,
                      time:
                        parseInt(e.target.value) / 1 ===
                        parseInt(e.target.value)
                          ? parseInt(e.target.value)
                          : "",
                    })
                  }
                  errorMessage={errorMessages.time}
                  isSubmited={isSubmited}
                  placeholder="مدت زمان (دقیقه) جلسه را وارد نمایید"
                  icon={<AccessTimeIcon />}
                  type="tel"
                />
                <FormInput
                  isAdminRegister
                  placeholder="ویدئو جلسه را آپلود کنید"
                  fileName={(inputValues.video as File)?.name}
                  setValue={(e: T_InputEvent) => {
                    setInputValues({
                      ...inputValues,
                      video: (e.target.files as FileList)[0],
                    });
                  }}
                  errorMessage={errorMessages.video}
                  isSubmited={isSubmited}
                  icon={<UploadRoundedIcon />}
                  type="file"
                />
                <FormSelect
                  onChange={(id: string) =>
                    setInputValues({
                      ...inputValues,
                      courseID: id,
                    })
                  }
                  options={courses}
                  value={courseID}
                  placeholder={"-- دوره مد نظر را انتخاب کنید --"}
                />
                <div className="md:pb-0 pb-4">
                  <FormControlLabel
                    labelPlacement="start"
                    control={
                      <Switch
                        color="success"
                        checked={isFree}
                        onChange={(e) => {
                          setInputValues({
                            ...inputValues,
                            isFree: e.target.checked,
                          });
                        }}
                      />
                    }
                    label="جلسه رایگان"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  disable={Object.entries(errorMessages).some(
                    (error) => error[1] !== ""
                  )}
                  styles="md:!w-48 !w-full !py-[10px]"
                >
                  ایجاد
                </Button>
              </div>
            </form>
          </div>
        </DataCotainerBox>}
        <DataCotainerBox
          title="لیست جلسات"
          action={
            <div className="flex sm:gap-4 gap-2">
              <SearchByP
                searchFields={[
                  { title: "عنوان", value: "title" },
                  { title: "دوره", value: "courseName" },
                ]}
                list={sessions}
                setList={setOrderedSessions}
                placeholder="جلسات"
              />
              <div
                onClick={() => {
                  setOrderedSessions(
                    [...(orderedSessions as T_SessionData[])]?.reverse()
                  );
                  setIsReverse(!isReverse);
                }}
                className="btn btn-sm btn-neut"
              >
                <FilterListRoundedIcon
                  fontSize="small"
                  className={isReverse ? "rotate-180" : ""}
                />
              </div>
            </div>
          }
        >
          <div className="panel_table overflow-x-auto h-[72vh] lg:max-w-[calc(100vw-26.5rem)] md:max-w-[calc(100vw-18.5rem)]">
            {orderedSessions && (
              <>
                {orderedSessions.length !== 0 ? (
                  <div className="min-w-max relative sm:min-w-[900px]">
                    <div className="admin_Panel_Hs_Table flex text-sm items-center sm:grid grid-cols-20 sm:grid-cols-12 *:shrink-0">
                      <div className="w-16 sm:w-auto sm:col-span-1 text-center">
                        <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                          شناسه
                        </span>
                      </div>
                      <div className="w-24 sm:w-auto sm:col-span-3 text-center">
                        <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                          عنوان
                        </span>
                      </div>
                      <div className="w-28 sm:w-auto sm:col-span-2 text-center">
                        <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                          مدت زمان
                        </span>
                      </div>
                      <div className="w-36 sm:w-auto sm:col-span-3 text-center">
                        <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                          دوره
                        </span>
                      </div>
                      <div className="w-60 sm:w-auto sm:col-span-3 text-center">
                        <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body"></span>
                      </div>
                    </div>
                    <div className="*:odd:bg-d-neut-seco-panel">
                      {orderedSessions?.length !== 0 ? (
                        orderedSessions?.map((session, index) => (
                          <AllSessionsListItemPA
                            session={{ ...session }}
                            id={
                              isReverse
                                ? index
                                : orderedSessions.length - index - 1
                            }
                            index={index}
                            deleteSession={deleteSession}
                            key={session._id}
                          />
                        ))
                      ) : (
                        <div className="h-36 pt-6 grid sm:place-content-center sm:ps-0 ps-[40vw]">
                          <WrapperLoader />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <NotSearchRes />
                )}
              </>
            )}
          </div>
        </DataCotainerBox>
      </div>
      {isShowAlert.delete && (
        <DeleteAlertPA
          deleteHandler={deleteSessionHandler}
          closeAlerts={closeAlerts}
          name={` جلسه ${targetSession?.title}`}
        />
      )}
      {isShowAlert.delete && <CoverPageP z="z-40" onClick={closeAlerts} />}
    </>
  );
}

export default SessionsPA;

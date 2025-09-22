import { Link, useNavigate } from "react-router";
import DataCotainerBox from "../../../components/DataCotainerBox/DataCotainerBox";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import { useEffect, useState } from "react";
import FormSelect from "../../../../Submit/components/FormSelect/FormSelect";
import type {
  T_DepartmentList,
  T_InputEvent,
  T_Transaction,
} from "../../../../../Types/type";
import FormInput from "../../../../Submit/components/FormInput/FormInput";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import FormTextarea from "../../../../Submit/components/FormTextarea/FormTextarea";
import Button from "../../../../../Components/DesignSystem/Button";

function CreateTicketPU() {
  const [allCourses, setAllCourses] = useState<T_Transaction[] | null>(null);

  const [departmentsList, setDepartmentsList] = useState<T_DepartmentList[] | null>(null);

  const [subDepartments, setSubDepartments] = useState<T_DepartmentList[] | null>(null);

  const [inputValues, setInputValues] = useState({
    title: "",
    body: "",
    priority: "1",
    departmentId: "",
    departmentSubId: "",
    courseId: "",
  });
  const { title, body, priority, departmentId, departmentSubId, courseId } =
    inputValues;

  const [errorMessages, setErrorMessages] = useState({
    title: "",
    body: "",
    priority: "",
    departmentId: "",
    departmentSubId: "",
    courseId: "",
  });

  const navigate = useNavigate()

  const userDatas = JSON.parse(localStorage.getItem("user") as string);

  //   actions
  const getAllCourses = async () => {
    try {
      const allCourses = await (
        await fetch(`http://localhost:4000/v1/courses`)
      ).json();
      setAllCourses(allCourses.reverse());
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const createNewTicketHandler = async () => {
    try {
      const res = await (await fetch(`http://localhost:4000/v1/tickets`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userDatas.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          priority,
          departmentID: departmentId,
          departmentSubID: departmentSubId,
          course: courseId ? courseId : undefined,
        }),
      })).json()
      console.log(res);
    } catch (error) {
      throw new Error(`{error}`);
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !errorMessages.title &&
      !errorMessages.body &&
      !errorMessages.priority &&
      !errorMessages.departmentId &&
      !errorMessages.departmentSubId &&
      !errorMessages.courseId
    ) {
      createNewTicketHandler();
      setInputValues({
        title: "",
        body: "",
        priority: "1",
        departmentId: "",
        departmentSubId: "",
        courseId: "",
      });
      navigate("/my-panel/tickets/")
    }
  };

  const getDepartmentsList = async () => {
    try {
      const departments = await (
        await fetch(`http://localhost:4000/v1/tickets/departments`)
      ).json();
      setDepartmentsList(departments);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const getSubDepartments = async () => {
    console.log(departmentId);
    try {
      if (departmentsList && departmentId) {
        const departmentsList = await (
          await fetch(
            `http://localhost:4000/v1/tickets/departments-subs/${departmentId}`
          )
        ).json();
        console.log(departmentsList);
        setSubDepartments(departmentsList);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
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

    if (!body) {
      setErrorMessages((prevError) => ({
        ...prevError,
        body: "error!",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, body: "" }));
    }

    if (!departmentId) {
      setErrorMessages((prevError) => ({
        ...prevError,
        departmentId: "error!",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, departmentId: "" }));
    }

    if (!departmentSubId) {
      setErrorMessages((prevError) => ({
        ...prevError,
        departmentSubId: "error!",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, departmentSubId: "" }));
    }

    if (departmentSubId === "63b688c5516a30a651e98156") {
      if (!courseId) {
        setErrorMessages((prevError) => ({
          ...prevError,
          courseId: "error!",
        }));
      } else {
        setErrorMessages((prevError) => ({
          ...prevError,
          courseId: "",
        }));
      }
    } else { 
      setErrorMessages((prevError) => ({
        ...prevError,
        courseId: "",
      }));
      setInputValues(prev => ({...prev, courseId: ""}))
    }
  }, [title, body, departmentId, departmentSubId, courseId]);

  useEffect(() => {
    getDepartmentsList();
    getAllCourses();
  }, []);

  useEffect(() => {
    getSubDepartments();
    subDepartments &&
      setInputValues({
        ...inputValues,
        departmentSubId: "",
      });
  }, [departmentId]);

  return (
    <DataCotainerBox
      title="ثبت تیکت جدید"
      action={
        <div>
          <Link
            to={"/my-panel/tickets/"}
            className="btn btn-sm btn-neut !flex gap-0.5 items-center !w-20"
          >
            <div className="text-xs ps-1.5 font-[dana-xl]">بازگشت</div>
            <div>
              <NavigateBeforeRoundedIcon fontSize="small" />
            </div>
          </Link>
        </div>
      }
    >
      <div>
        {departmentsList && (
          <form onSubmit={submitHandler}>
            <div className="lg:flex md: gap-6">
              <FormSelect
                onChange={(id: string) =>
                  setInputValues({
                    ...inputValues,
                    departmentId: id,
                  })
                }
                options={departmentsList}
                value={departmentId}
                placeholder={"-- دپارتمان مد نظر را انتخاب کنید --"}
              />
              <FormSelect
                onChange={(id: string) =>
                  setInputValues({
                    ...inputValues,
                    departmentSubId: id,
                  })
                }
                options={
                  subDepartments ? subDepartments : [{ _id: "-1", title: "" }]
                }
                value={departmentSubId}
                placeholder={"-- نوع تیکت مد نظر را انتخاب کنید --"}
                isDisabled={Boolean(!subDepartments)}
              />
              {departmentSubId === "63b688c5516a30a651e98156" && (
                <FormSelect
                  onChange={(id: string) =>
                    setInputValues({
                      ...inputValues,
                      courseId: id,
                    })
                  }
                  options={allCourses}
                  value={courseId}
                  placeholder={"-- دوره مد نظر را انتخاب کنید --"}
                />
              )}
            </div>
            <FormInput
              isAdminRegister
              value={title}
              setValue={(e: T_InputEvent) =>
                setInputValues({ ...inputValues, title: e.target.value })
              }
              errorMessage={errorMessages.title}
              isSubmited={false}
              placeholder="موضوع تیکت"
              icon={<NotesRoundedIcon />}
            />
            <FormTextarea
              isAdminRegister
              value={body}
              setValue={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setInputValues({
                  ...inputValues,
                  body: e.target.value,
                })
              }
              errorMessage={errorMessages.body}
              isSubmited={false}
              placeholder="جزئیات کامل مشکل یا سوال خودتون رو بنویسید..."
            />
            <div className="mt-6 w-full flex justify-end">
              <Button
                disable={Object.entries(errorMessages).some(
                  (error) => error[1] !== ""
                )}
                styles="!py-[14px] text-sm !px-6 sm:!w-40 sm:w-full"
              >
                ارسال تیکت
              </Button>
            </div>
          </form>
        )}
      </div>
    </DataCotainerBox>
  );
}

export default CreateTicketPU;

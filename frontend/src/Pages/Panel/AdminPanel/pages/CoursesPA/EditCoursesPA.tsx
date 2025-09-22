import { useParams } from "react-router";
import DataCotainerBox from "../../../components/DataCotainerBox/DataCotainerBox";
import { useEffect, useState } from "react";
import type {
  T_CategoriesData,
  T_InputEvent,
} from "../../../../../Types/type";
import Button from "../../../../../Components/DesignSystem/Button";
import FormInput from "../../../../Submit/components/FormInput/FormInput";
import NotesIcon from "@mui/icons-material/Notes";
import ShortTextIcon from "@mui/icons-material/ShortText";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import FormTextarea from "../../../../Submit/components/FormTextarea/FormTextarea";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import FormSelect from "../../../../Submit/components/FormSelect/FormSelect";

export type T_CoursesPAInputValues = {
  name: string;
  description: string;
  cover: File | string;
  shortName: string;
  price: string;
  status: "start" | "presell";
  categoryID: string;
};

function EditCoursesPA() {
  const { courseName } = useParams();

  const [categories, setCategories] = useState<T_CategoriesData[] | null>(null);

  const [isSubmited, setIsSubmited] = useState(false);

  const [inputValues, setInputValues] = useState<T_CoursesPAInputValues>({
    name: "",
    description: "",
    cover: "",
    shortName: "",
    price: "",
    status: "start",
    categoryID: "",
  });
  const { name, description, cover, shortName, price, status, categoryID } = inputValues;

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    description: "",
    cover: "",
    shortName: "",
    price: "",
    categoryID: ""
  });

  const userDatas = JSON.parse(localStorage.getItem("user") as string);

  const getAllCategories = async () => {
    try {
      const allCourses = await (
        await fetch(`http://localhost:4000/v1/category`)
      ).json();
      setCategories(allCourses.reverse());
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  // add new course
  const addNewCourseHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("cover", cover);
    formData.append("shortName", shortName);
    formData.append("price", price);
    formData.append("status", status);
    formData.append("categoryID", categoryID);

    try {
      await (
        await fetch(`http://localhost:4000/v1/courses`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userDatas.token}`,
          },
          body: formData,
        })
      ).json();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmited(true);
    if (
      !errorMessages.name &&
      !errorMessages.shortName &&
      !errorMessages.price &&
      !errorMessages.cover &&
      !errorMessages.description
    ) {
      setIsSubmited(false);
      addNewCourseHandler();
      setInputValues(() => ({
        categoryID: "",
        name: "",
        description: "",
        cover: "",
        shortName: "",
        price: "",
        status: "start",
      }));
    }
  };

  useEffect(() => {
    if (!name) {
      setErrorMessages((prevError) => ({
        ...prevError,
        name: "error!",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, name: "" }));
    }

    if (!shortName) {
      setErrorMessages((prevError) => ({
        ...prevError,
        shortName: "error!",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, shortName: "" }));
    }

    if (!price) {
      setErrorMessages((prevError) => ({
        ...prevError,
        price: "error!",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, price: "" }));
    }

    if (!cover) {
      setErrorMessages((prevError) => ({
        ...prevError,
        cover: "error!",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, cover: "" }));
    }

    if (!description) {
      setErrorMessages((prevError) => ({
        ...prevError,
        description: "error!",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, description: "" }));
    }

    if (!categoryID) {
      setErrorMessages((prevError) => ({
        ...prevError,
        categoryID: "error!",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, categoryID: "" }));
    }
  }, [name, shortName, price, cover, description, categoryID]);

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <div>
        <DataCotainerBox title="ایجاد دوره جدید">
          <form onSubmit={submitHandler} className="">
            <div className="grid sm:grid-cols-2 gap-x-4">
              <FormInput
                isAdminRegister
                value={name}
                setValue={(e: T_InputEvent) =>
                  setInputValues({ ...inputValues, name: e.target.value })
                }
                errorMessage={errorMessages.name}
                isSubmited={isSubmited}
                placeholder="نام دوره را وارد نمایید"
                icon={<NotesIcon />}
              />
              <FormInput
                isAdminRegister
                value={shortName}
                setValue={(e: T_InputEvent) =>
                  setInputValues({ ...inputValues, shortName: e.target.value })
                }
                errorMessage={errorMessages.shortName}
                isSubmited={isSubmited}
                placeholder="لینک دوره را وارد نمایید"
                icon={<ShortTextIcon />}
              />
              <FormInput
                isAdminRegister
                value={price}
                setValue={(e: T_InputEvent) =>
                  setInputValues({
                    ...inputValues,
                    price:
                      parseInt(e.target.value) / 1 === parseInt(e.target.value)
                        ? parseInt(e.target.value).toString()
                        : "",
                  })
                }
                errorMessage={errorMessages.price}
                isSubmited={isSubmited}
                placeholder="قیمت دوره را وارد نمایید"
                icon={<AttachMoneyIcon />}
                type="tel"
              />
              <FormInput
                isAdminRegister
                placeholder="کاور دوره را آپلود کنید"
                fileName={(inputValues.cover as File)?.name}
                setValue={(e: T_InputEvent) => {
                  setInputValues({
                    ...inputValues,
                    cover: (e.target.files as FileList)[0],
                  });
                  console.log(cover);
                }}
                errorMessage={errorMessages.cover}
                isSubmited={isSubmited}
                icon={<UploadRoundedIcon />}
                type="file"
              />
              <div className="">
                <div className="font-[dana-xb] text-sm sm:pb-1 pb-1 text-d-neut-ther/95 dark:text-white/60">
                  دسته‌بندی دوره
                </div>
                <FormSelect
                  onChange={(id: string) =>
                    setInputValues({
                      ...inputValues,
                      categoryID: id,
                    })
                  }
                  options={categories}
                  value={categoryID}
                  placeholder={"-- دسته بندی دوره را انتخاب کنید --"}
                />
              </div>
              <div className="px-6 py-1 pb-6">
                <div className="font-[dana-xb] text-sm text-d-neut-ther/95 dark:text-white/60 sm:pb-1 pb-1">
                  وضعیت دوره
                </div>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue="start"
                    className="!font-[dana-xl]"
                  >
                    <FormControlLabel
                      onInput={() =>
                        setInputValues((prev) => ({ ...prev, status: "start" }))
                      }
                      value="start"
                      control={<Radio color="success" />}
                      label="درحال برگذاری"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      onInput={() =>
                        setInputValues((prev) => ({
                          ...prev,
                          status: "presell",
                        }))
                      }
                      className="!font-[dana-xl]"
                      value="presell"
                      control={<Radio color="success" />}
                      label="پیش فروش"
                      labelPlacement="start"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 items-end">
              <div className="col-span-2">
                <FormTextarea
                  isAdminRegister
                  value={description}
                  setValue={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setInputValues({
                      ...inputValues,
                      description: e.target.value,
                    })
                  }
                  errorMessage={errorMessages.description}
                  isSubmited={isSubmited}
                  placeholder="توضیحات دوره را وارد کنید"
                />
              </div>
              <div className="sm:col-span-1 py-2 sm:px-6">
                <Button
                  disable={Object.entries(errorMessages).some(
                    (error) => error[1] !== ""
                  )}
                  styles="!w-full !py-3"
                >
                  ایجاد
                </Button>
              </div>
            </div>
          </form>
        </DataCotainerBox>
      </div>
    </>
  );
}

export default EditCoursesPA
import { useState, useEffect } from "react";
import type {
  T_ArticlesData,
  T_CategoriesData,
  T_InputEvent,
} from "../../../../../Types/type";
import DataCotainerBox from "../../../components/DataCotainerBox/DataCotainerBox";
import Editor from "../../../../../Components/Editor/Editor";
import FormInput from "../../../../Submit/components/FormInput/FormInput";
import type { T_CoursesPAInputValues } from "../CoursesPA/CoursesPA";
import FormTextarea from "../../../../Submit/components/FormTextarea/FormTextarea";
import Button from "../../../../../Components/DesignSystem/Button";
import NotesIcon from "@mui/icons-material/Notes";
import ShortTextIcon from "@mui/icons-material/ShortText";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import { useParams } from "react-router";
import FormSelect from "../../../../Submit/components/FormSelect/FormSelect";

function ArticleDraftPA() {
  const [article, setArticle] = useState<T_ArticlesData | null>(null);

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
  const [articleBody, setArticleBody] = useState("");
  const { name, description, cover, shortName, categoryID } = inputValues;

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    description: "",
    cover: "",
    shortName: "",
    categoryID:""
  });

  const { articleName } = useParams();

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

  const getArticle = async () => {
    try {
      const oneArticle = await (
        await fetch(`http://localhost:4000/v1/articles/${articleName}`)
      ).json();
      setArticle(oneArticle);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  // create new article
  const createNewArticleHandler = async (URLdomain: string) => {
    const formData = new FormData();
    formData.append("title", name);
    formData.append("description", description);
    formData.append("shortName", shortName);
    formData.append("categoryID", categoryID);
    formData.append("body", articleBody);
    formData.append("cover", cover);
    try {
      const res = await (
        await fetch(`http://localhost:4000/v1/articles${URLdomain}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userDatas.token}`,
          },
          body: formData,
        })
      ).json();
      
      console.log(res);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const submitHandler = (isDraft?: boolean) => {
    setIsSubmited(true);
    if (
      !errorMessages.name &&
      !errorMessages.description &&
      !errorMessages.cover &&
      !errorMessages.shortName &&
      articleBody
    ) {
      isDraft ? createNewArticleHandler("/draft") : createNewArticleHandler("");
      setIsSubmited(false);
      setInputValues((prev) => ({
        ...prev,
        name: "",
        description: "",
        cover: "",
        shortName: "",
        price: "",
        status: "start",
      }));
      setArticleBody("");
    }
  };

  useEffect(() => {
    if (article) {
      setInputValues({
        name: article?.title,
        description: article.description,
        cover: "",
        shortName: article.shortName,
        price: "",
        status: "start",
        categoryID: "",
      });
      setArticleBody(article?.body);
    }
  }, [article]);

  useEffect(() => {
    if (!name) {
      setErrorMessages((prevError) => ({
        ...prevError,
        name: "لطفا عنوان مقاله را وارد نمایید",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, name: "" }));
    }

    if (!shortName) {
      setErrorMessages((prevError) => ({
        ...prevError,
        shortName: "لطفا لینک مقاله را وارد نمایید",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, shortName: "" }));
    }

    if (!cover) {
      setErrorMessages((prevError) => ({
        ...prevError,
        cover: "لطفا کاور مقاله را آپلود نمایید",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, cover: "" }));
    }
    if (!categoryID) {
      setErrorMessages((prevError) => ({
        ...prevError,
        categoryID: "لطفا کاور مقاله را آپلود نمایید",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, categoryID: "" }));
    }

    if (!description) {
      setErrorMessages((prevError) => ({
        ...prevError,
        description: "لطفا توضیحات مقاله را وارد نمایید",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, description: "" }));
    }
  }, [name, shortName, cover, description]);

  useEffect(() => {
    getAllCategories();
    getArticle();
  }, []);

  return (
    <DataCotainerBox title="جاپ مقاله جدید">
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid sm:grid-cols-2 gap-x-4">
            <FormInput
              isAdminRegister
              value={name}
              setValue={(e: T_InputEvent) =>
                setInputValues({ ...inputValues, name: e.target.value })
              }
              errorMessage={errorMessages.name}
              isSubmited={isSubmited}
              placeholder="عنوان مقاله را وارد نمایید"
              icon={<NotesIcon />}
            />
            <FormInput
              isAdminRegister
              value={shortName}
              setValue={(e: T_InputEvent) =>
                setInputValues({
                  ...inputValues,
                  shortName: e.target.value,
                })
              }
              errorMessage={errorMessages.shortName}
              isSubmited={isSubmited}
              placeholder="لینک مقاله را وارد نمایید"
              icon={<ShortTextIcon />}
            />
            <FormInput
              isAdminRegister
              placeholder="کاور مقاله را آپلود کنید"
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
              <FormSelect
                onChange={(id: string) =>
                  setInputValues({
                    ...inputValues,
                    categoryID: id,
                  })
                }
                options={categories}
                value={categoryID}
                placeholder={"-- دسته بندی مقاله را انتخاب کنید --"}
              />
            </div>
          </div>
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
              placeholder="توضیحات مقاله را وارد کنید"
            />
          </div>
          <div className="pt-4">
            <Editor value={articleBody} setValue={setArticleBody} />
          </div>
          <div className="sm:col-span-1 pt-6 flex justify-end gap-2">
            <Button
              disable={Object.entries(errorMessages).some(
                (error) => error[1] !== ""
              )}
              onClick={() => submitHandler(true)}
              styles="!bg-amber-500 sm:!px-12 sm:!w-fit !w-full !py-3"
            >
              پیش نویس
            </Button>
            <Button
              disable={Object.entries(errorMessages).some(
                (error) => error[1] !== ""
              )}
              onClick={() => submitHandler()}
              styles="!bg-notf sm:!px-16 sm:!w-fit !w-full !py-3"
            >
              انتشار
            </Button>
          </div>
        </form>
      </div>
    </DataCotainerBox>
  );
}

export default ArticleDraftPA;

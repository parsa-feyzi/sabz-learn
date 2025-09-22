import { useState, useEffect } from "react";
import WrapperLoader from "../../../../../Components/DesignSystem/WrapperLoader/WrapperLoader";
import type {
  T_AlertIsShow,
  T_ArticlesData,
  T_CategoriesData,
  T_InputEvent,
  T_setAlertShow,
} from "../../../../../Types/type";
import DataCotainerBox from "../../../components/DataCotainerBox/DataCotainerBox";
import CoverPageP from "../../../components/CoverPageP/CoverPageP";
import AlertP from "../../../components/AlertP/AlertP";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import DeleteAlertPA from "../../../components/AlertP/DeleteAlertPA";
import AllArticlesListItemPA from "./components/AllArticlesListItemPA";
import Editor from "../../../../../Components/Editor/Editor";
import FormInput from "../../../../Submit/components/FormInput/FormInput";
import type { T_CoursesPAInputValues } from "../CoursesPA/CoursesPA";
import FormTextarea from "../../../../Submit/components/FormTextarea/FormTextarea";
import Button from "../../../../../Components/DesignSystem/Button";
import NotesIcon from "@mui/icons-material/Notes";
import ShortTextIcon from "@mui/icons-material/ShortText";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import SearchByP from "../../../components/SearchByP/SearchByP";
import NotSearchRes from "../../../components/NotSearchRes/NotSearchRes";
import FormSelect from "../../../../Submit/components/FormSelect/FormSelect";
import Alert from "../../../../../Components/Alert/Alert";
import useAlertShow from "../../../../../Hooks/useAlertShow";

function ArticlesPA() {
  const [articles, setArticles] = useState<T_ArticlesData[] | null>(null);
  const [orderedArticles, setOrderedArticles] = useState<
    T_ArticlesData[] | null
  >(null);

  const [categories, setCategories] = useState<T_CategoriesData[] | null>(null);

  const [isReverse, setIsReverse] = useState(false);

  const [isSubmited, setIsSubmited] = useState(false);

  const [targetArticle, setTargetArticle] = useState<T_ArticlesData | null>(
    null
  );

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
  });

  const [isShowAlert, setIsShowAlert] = useState({
    edit: false,
    delete: false,
  });

  const userDatas = JSON.parse(localStorage.getItem("user") as string);

  const [successAlertArticle, setSuccessAlertArticle] = useAlertShow();

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

  const getAllArticles = async () => {
    try {
      const allArticles = await (
        await fetch(`http://localhost:4000/v1/articles`)
      ).json();
      setArticles(allArticles);
      isReverse
        ? setOrderedArticles(allArticles.reverse())
        : setOrderedArticles(allArticles);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const closeAlerts = () => {
    setIsShowAlert({ edit: false, delete: false });
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
      const res = await fetch(`http://localhost:4000/v1/articles${URLdomain}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userDatas.token}`,
        },
        body: formData,
      });
      res.ok && (setSuccessAlertArticle as T_setAlertShow)(URLdomain ? "ذخیره" : "منتشر")
      getAllArticles();
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
      setInputValues(() => ({
        name: "",
        description: "",
        cover: "",
        shortName: "",
        price: "",
        status: "start",
        categoryID: "",
      }));
      setArticleBody("");
    }
  };

  // edit article
  const editArticle = (article: T_ArticlesData) => {
    setTargetArticle(article);
    setIsShowAlert((prev) => ({ ...prev, edit: true }));
  };

  // delete article
  const deleteArticleHandler = async () => {
    try {
      await fetch(`http://localhost:4000/v1/articles/${targetArticle?._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userDatas.token}`,
        },
      });
      getAllArticles();
      closeAlerts();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const deleteArticle = (article: T_ArticlesData) => {
    setTargetArticle(article);
    setIsShowAlert((prev) => ({ ...prev, delete: true }));
  };

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
        categoryID: "error!",
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
  }, [name, shortName, cover, description, categoryID]);

  useEffect(() => {
    getAllCategories();
    getAllArticles();
  }, []);

  return (
    <>
      {(successAlertArticle as T_AlertIsShow).isShow && (
        <Alert
          isPanelAlert
          message={`مقاله با موفقیت ${
            (successAlertArticle as T_AlertIsShow).userFullName
          } شد`}
        />
      )}
      <div>
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
                  styles="!bg-prim sm:!px-16 sm:!w-fit !w-full !py-3"
                >
                  انتشار
                </Button>
              </div>
            </form>
          </div>
        </DataCotainerBox>
        <DataCotainerBox
          title="لیست مقالات"
          action={
            <div className="flex sm:gap-4 gap-2">
              <SearchByP
                searchFields={[
                  { title: "عنوان", value: "title" },
                  { title: "نویسنده", value: "creatorName" },
                ]}
                list={articles}
                setList={setOrderedArticles}
                placeholder="مقالات"
              />
              <div
                onClick={() => {
                  setOrderedArticles(
                    [...(orderedArticles as T_ArticlesData[])]?.reverse()
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
            {orderedArticles && (
              <>
                {orderedArticles.length !== 0 ? (
                  <div className="min-w-[400px] relative">
                    <div className="admin_Panel_Hs_Table text-sm items-center grid grid-cols-12 *:shrink-0">
                      <div className="col-span-1 text-center">
                        <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                          شناسه
                        </span>
                      </div>
                      <div className="col-span-3 text-center">
                        <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                          عنوان
                        </span>
                      </div>
                      <div className="col-span-3 text-center">
                        <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                          نویسنده
                        </span>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                          لینک
                        </span>
                      </div>
                      <div className="col-span-3 text-center">
                        <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body"></span>
                      </div>
                    </div>
                    <div className="*:odd:bg-d-neut-seco-panel">
                      {orderedArticles?.length !== 0 ? (
                        orderedArticles?.map((article, index) => (
                          <AllArticlesListItemPA
                            editArticles={editArticle}
                            deleteArticles={deleteArticle}
                            article={{ ...article }}
                            id={
                              isReverse
                                ? index
                                : orderedArticles.length - index - 1
                            }
                            index={index}
                            key={article._id}
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
          deleteHandler={deleteArticleHandler}
          closeAlerts={closeAlerts}
          name={`مقاله ${targetArticle?.title}`}
        />
      )}
      {isShowAlert.edit && (
        <AlertP>
          <div className="sm:w-80 w-[80vw]"></div>
        </AlertP>
      )}
      {(isShowAlert.edit || isShowAlert.delete) && (
        <CoverPageP z="z-40" onClick={closeAlerts} />
      )}
    </>
  );
}

export default ArticlesPA;

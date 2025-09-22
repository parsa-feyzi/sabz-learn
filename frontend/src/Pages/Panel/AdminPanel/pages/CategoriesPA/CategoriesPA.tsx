import { useState, useEffect } from "react";
import WrapperLoader from "../../../../../Components/DesignSystem/WrapperLoader/WrapperLoader";
import type { T_CategoriesData, T_InputEvent } from "../../../../../Types/type";
import DataCotainerBox from "../../../components/DataCotainerBox/DataCotainerBox";
import AllCategoriesListItemPA from "./components/AllCategoriesListItemPA";
import FormInput from "../../../../Submit/components/FormInput/FormInput";
import Button from "../../../../../Components/DesignSystem/Button";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import CoverPageP from "../../../components/CoverPageP/CoverPageP";
import AlertP from "../../../components/AlertP/AlertP";
import DeleteAlertPA from "../../../components/AlertP/DeleteAlertPA";

function CategoriesPA() {
  const [categories, setCategories] = useState<T_CategoriesData[] | null>(null);

  const [targetCategory, setTargetCategory] = useState<T_CategoriesData | null>(
    null
  );

  const [inputValues, setInputValues] = useState({
    title: "",
    name: "",
    editTitle: "",
    editName: "",
  });
  const { title, name, editTitle, editName } = inputValues;

  const [errorMessages, setErrorMessages] = useState({
    title: "",
    name: "",
  });
  const [editErrorMessages, setEditErrorMessages] = useState({
    editTitle: "",
    editName: "",
  });

  const [isSubmit, setIsSubmit] = useState(false);

  const [isShowAlert, setIsShowAlert] = useState({
    edit: false,
    delete: false,
  });

  const userDatas = JSON.parse(localStorage.getItem("user") as string);

  const getAllCategories = async () => {
    try {
      const allCategories = await (
        await fetch(`http://localhost:4000/v1/category`)
      ).json();
      setCategories(allCategories.reverse());
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const closeAlerts = () => {
    setIsShowAlert({ edit: false, delete: false });
  };

  // edit Category
  const editCategoryHandler = async () => {
    try {
      await fetch(
        `http://localhost:4000/v1/category/${targetCategory?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userDatas.token}`,
          },
          body: JSON.stringify({
            title: inputValues.editTitle,
            name: inputValues.editName,
          }),
        }
      );
      getAllCategories();
      closeAlerts();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const editCategory = (category: T_CategoriesData) => {
    setTargetCategory(category);
    setInputValues((prev) => ({
      ...prev,
      editTitle: category.title,
      editName: category.name,
    }));
    setIsShowAlert((prev) => ({ ...prev, edit: true }));
  };

  // delete Category
  const deleteCategoryHandler = async () => {
    try {
      await fetch(`http://localhost:4000/v1/category/${targetCategory?._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userDatas.token}`,
        },
      });
      getAllCategories();
      closeAlerts();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const deleteCategory = (category: T_CategoriesData) => {
    setTargetCategory(category);
    setIsShowAlert((prev) => ({ ...prev, delete: true }));
  };

  // create New Category
  const createNewCategoryHandler = async () => {
    try {
      const res = await fetch(`http://localhost:4000/v1/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDatas.token}`,
        },
        body: JSON.stringify({
          title,
          name,
        }),
      });
      console.log(res);
      getAllCategories();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!errorMessages.name && !errorMessages.title) {
      createNewCategoryHandler();
      setInputValues((prev) => ({ ...prev, name: "", title: "" }));
      setIsSubmit(false);
    }
  };

  useEffect(() => {
    if (!title) {
      setErrorMessages((prevError) => ({
        ...prevError,
        title: "لطفا یک عنوان وارد نمایید",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, title: "" }));
    }

    if (!name) {
      setErrorMessages((prevError) => ({
        ...prevError,
        name: "لطفا یک لینک وارد نمایید",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, name: "" }));
    }
  }, [title, name]);

  useEffect(() => {
    if (!editTitle) {
      setEditErrorMessages((prevError) => ({
        ...prevError,
        editTitle: "لطفا یک عنوان وارد نمایید",
      }));
    } else {
      setEditErrorMessages((prevError) => ({ ...prevError, editTitle: "" }));
    }

    if (!editName) {
      setEditErrorMessages((prevError) => ({
        ...prevError,
        editName: "لطفا یک لینک وارد نمایید",
      }));
    } else {
      setEditErrorMessages((prevError) => ({ ...prevError, editName: "" }));
    }
  }, [editTitle, editName]);

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <div>
        <DataCotainerBox title="ایجاد دسته‌بندی جدید">
          <form onSubmit={submitHandler} className="sm:flex items-end">
            <div className="w-full">
              <FormInput
                isAdminRegister
                value={title}
                setValue={(e: T_InputEvent) =>
                  setInputValues({ ...inputValues, title: e.target.value })
                }
                errorMessage={errorMessages.title}
                isSubmited={isSubmit}
                placeholder="عنوان دسته‌بندی را وارد نمایید"
                icon={<TextSnippetIcon />}
              />
              <FormInput
                isAdminRegister
                value={name}
                setValue={(e: T_InputEvent) =>
                  setInputValues({ ...inputValues, name: e.target.value })
                }
                errorMessage={errorMessages.name}
                isSubmited={isSubmit}
                placeholder="لینک دسته‌بندی را وارد نمایید"
                icon={<NotesRoundedIcon />}
              />
            </div>
            <div className="sm:w-2/6 sm:p-[22px]">
              <Button disable={Object.entries(errorMessages).some(error => error[1] !== "")} styles="!w-full !py-3">ایجاد</Button>
            </div>
          </form>
        </DataCotainerBox>
        <DataCotainerBox title="لیست دسته بندی‌ها">
          <div className="panel_table overflow-x-auto h-[72vh] lg:max-w-[calc(100vw-26.5rem)] md:max-w-[calc(100vw-18.5rem)]">
            <div className="min-w-[400px] relative">
              <div className="admin_Panel_Hs_Table text-sm items-center grid grid-cols-12 *:shrink-0">
                <div className="col-span-1 text-center">
                  <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                    شناسه
                  </span>
                </div>
                <div className="col-span-4 text-center">
                  <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                    عنوان
                  </span>
                </div>
                <div className="col-span-1 text-center">
                  <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                    لینک
                  </span>
                </div>
                <div className="col-span-6 text-center">
                  <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body"></span>
                </div>
              </div>
              <div className="*:odd:bg-d-neut-seco-panel">
                {categories?.length !== 0 ? (
                  categories?.map((category, index) => (
                    <AllCategoriesListItemPA
                      editCategory={editCategory}
                      deleteCategory={deleteCategory}
                      category={{ ...category }}
                      id={categories.length - index - 1}
                      index={index}
                      key={category._id}
                    />
                  ))
                ) : (
                  <div className="h-36 pt-6 grid sm:place-content-center sm:ps-0 ps-[40vw]">
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
          deleteHandler={deleteCategoryHandler}
          closeAlerts={closeAlerts}
          name={targetCategory?.title}
        />
      )}
      {isShowAlert.edit && (
        <AlertP>
          <div className="sm:w-80 w-[80vw]">
            <FormInput
              isAdminRegister
              value={editTitle}
              setValue={(e: T_InputEvent) =>
                setInputValues({ ...inputValues, editTitle: e.target.value })
              }
              isSubmited
              placeholder="عنوان دسته‌بندی را وارد نمایید"
              icon={<TextSnippetIcon />}
            />
            <FormInput
              isAdminRegister
              value={editName}
              setValue={(e: T_InputEvent) =>
                setInputValues({ ...inputValues, editName: e.target.value })
              }
              isSubmited
              placeholder="لینک دسته‌بندی را وارد نمایید"
              icon={<NotesRoundedIcon />}
            />
            <Button
              onClick={() => {editTitle &&  editName && editCategoryHandler()}}
              disable={Object.entries(editErrorMessages).some(error => error[1] !== "")}
              styles="!w-full !py-3"
            >
              تایید
            </Button>
          </div>
        </AlertP>
      )}
      {(isShowAlert.edit || isShowAlert.delete) && (
        <CoverPageP z="z-40" onClick={closeAlerts} />
      )}
    </>
  );
}

export default CategoriesPA;

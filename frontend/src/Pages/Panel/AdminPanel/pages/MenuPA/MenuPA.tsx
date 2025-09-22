import { useState, useEffect } from "react";
import WrapperLoader from "../../../../../Components/DesignSystem/WrapperLoader/WrapperLoader";
import type {
  T_InputEvent,
  T_menu,
  T_submenu,
} from "../../../../../Types/type";
import DataCotainerBox from "../../../components/DataCotainerBox/DataCotainerBox";
import FormInput from "../../../../Submit/components/FormInput/FormInput";
import Button from "../../../../../Components/DesignSystem/Button";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import CoverPageP from "../../../components/CoverPageP/CoverPageP";
import DeleteAlertPA from "../../../components/AlertP/DeleteAlertPA";
import AllMenuListItemPA from "./components/AllMenuListItemPA";
import FormSelect from "../../../../Submit/components/FormSelect/FormSelect";

function MenuPA() {
  const [menus, setMenus] = useState<T_menu[] | null>(null);

  const [topMenus, setTopMenus] = useState<T_menu[] | null>(null);

  const [targetMenus, setTargetMenus] = useState<T_menu | T_submenu | null>(
    null
  );

  const [inputValues, setInputValues] = useState({
    title: "",
    href: "",
    menuID: "",
  });
  const { title, href, menuID } = inputValues;

  const [errorMessages, setErrorMessages] = useState({
    title: "",
    href: "",
    menuID: "",
  });

  const [isSubmit, setIsSubmit] = useState(false);

  const [isShowAlert, setIsShowAlert] = useState({
    edit: false,
    delete: false,
  });

  const userDatas = JSON.parse(localStorage.getItem("user") as string);

  const getAllMenus = async () => {
    try {
      const allMenus = await (
        await fetch(`http://localhost:4000/v1/menus`)
      ).json();
      setMenus(allMenus.reverse());
      setTopMenus(
        allMenus.filter(
          (menu: T_menu | T_submenu) => !(menu as T_submenu).parent
        )
      );
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const closeAlerts = () => {
    setIsShowAlert({ edit: false, delete: false });
  };

  // delete Menu
  const deleteMenuHandler = async () => {
    try {
      await fetch(`http://localhost:4000/v1/menus/${targetMenus?._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userDatas.token}`,
        },
      });
      getAllMenus();
      closeAlerts();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const deleteMenu = (menu: T_menu | T_submenu) => {
    setTargetMenus(menu);
    setIsShowAlert((prev) => ({ ...prev, delete: true }));
  };

  // create New menu
  const createNewMenuHandler = async () => {
    const requestBody = menuID !== "mainMenu"
      ? {
          title,
          href,
          parent: menuID,
        }
      : {
          title,
          href,
        };
    try {
      const res = await fetch(`http://localhost:4000/v1/menus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDatas.token}`,
        },
        body: JSON.stringify(requestBody),
      });
      console.log(res);
      getAllMenus();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!errorMessages.href && !errorMessages.title) {
      createNewMenuHandler();
      setInputValues(() => ({ menuID: "", href: "", title: "" }));
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

    if (!href) {
      setErrorMessages((prevError) => ({
        ...prevError,
        href: "لطفا یک لینک وارد نمایید",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, href: "" }));
    }

    if (!menuID) {
      setErrorMessages((prevError) => ({
        ...prevError,
        menuID: "error!",
      }));
    } else {
      setErrorMessages((prevError) => ({ ...prevError, menuID: "" }));
    }
  }, [title, href, menuID]);

  useEffect(() => {
    getAllMenus();
  }, []);

  return (
    <>
      <div>
        <DataCotainerBox title="ایجاد منو جدید">
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
                placeholder="عنوان منو را وارد نمایید"
                icon={<TextSnippetIcon />}
              />
              <FormInput
                isAdminRegister
                value={href}
                setValue={(e: T_InputEvent) =>
                  setInputValues({ ...inputValues, href: e.target.value })
                }
                errorMessage={errorMessages.href}
                isSubmited={isSubmit}
                placeholder="لینک منو را وارد نمایید"
                icon={<NotesRoundedIcon />}
              />
              <FormSelect
                onChange={(id: string) =>
                  setInputValues({
                    ...inputValues,
                    menuID: id,
                  })
                }
                options={topMenus}
                value={menuID}
                placeholder={"-- منوی والد را انتخاب کنید --"}
                surpluse={{ _id: "mainMenu", title: "منوی اصلی" }}
              />
            </div>
            <div className="sm:w-2/6 sm:p-[22px]">
              <Button
                disable={Object.entries(errorMessages).some(
                  (error) => error[1] !== ""
                )}
                styles="!w-full !py-3"
              >
                ایجاد
              </Button>
            </div>
          </form>
        </DataCotainerBox>
        <DataCotainerBox title="لیست دسته بندی‌ها">
          <div className="panel_table overflow-x-auto h-[72vh] lg:max-w-[calc(100vw-26.5rem)] md:max-w-[calc(100vw-18.5rem)]">
            <div className="min-w-[300px] relative">
              <div className="admin_Panel_Hs_Table text-sm items-center grid grid-cols-12 *:shrink-0">
                <div className="col-span-1 text-center">
                  <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body"></span>
                </div>
                <div className="col-span-3 text-center">
                  <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                    عنوان
                  </span>
                </div>
                <div className="col-span-4 text-center">
                  <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                    لینک
                  </span>
                </div>
                <div className="col-span-4 text-center">
                  <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body"></span>
                </div>
              </div>
              <div className="*:odd:bg-d-neut-seco-panel">
                {menus?.length !== 0 ? (
                  menus?.map((menu, index) => (
                    <AllMenuListItemPA
                      menu={menu}
                      deleteMenu={deleteMenu}
                      index={index}
                      key={menu._id}
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
          deleteHandler={deleteMenuHandler}
          closeAlerts={closeAlerts}
          name={`منوی ${targetMenus?.title}`}
        />
      )}
      {(isShowAlert.edit || isShowAlert.delete) && (
        <CoverPageP z="z-40" onClick={closeAlerts} />
      )}
    </>
  );
}

export default MenuPA;

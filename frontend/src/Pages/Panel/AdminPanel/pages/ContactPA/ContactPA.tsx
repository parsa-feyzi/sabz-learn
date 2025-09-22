import { useEffect, useState } from "react";
import DataCotainerBox from "../../../components/DataCotainerBox/DataCotainerBox";
import type { T_ContactDatas } from "../../../../../Types/type";
import WrapperLoader from "../../../../../Components/DesignSystem/WrapperLoader/WrapperLoader";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import CoverPageP from "../../../components/CoverPageP/CoverPageP";
import DeleteAlertPA from "../../../components/AlertP/DeleteAlertPA";
import AllContactListItemPA from "./components/AllContactListItemPA";
import AlertP from "../../../components/AlertP/AlertP";
import Button from "../../../../../Components/DesignSystem/Button";
import FormTextarea from "../../../../Submit/components/FormTextarea/FormTextarea";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import { CircularProgress } from "@mui/material";

function ContactPA() {
  const [allContact, setAllContact] = useState<T_ContactDatas[] | null>(null);

  const [isReverse, setIsReverse] = useState(false);

  const [targetContact, setTargetContact] = useState<T_ContactDatas | null>(
    null
  );

  const [isShowAlert, setIsShowAlert] = useState({
    delete: false,
    answer: false,
    message: false,
  });

  const [answerValue, setAnswerValue] = useState("");

  const [sendAnswrIsPending, setSendAnswrIsPending] = useState(false);

  const userDatas = JSON.parse(localStorage.getItem("user") as string);

  // Functions
  const closeAlerts = () =>
    setIsShowAlert({ delete: false, answer: false, message: false });

  const getAllContact = async () => {
    try {
      const allContact = await (
        await fetch(`http://localhost:4000/v1/contact`)
      ).json();
      console.log(allContact);
      isReverse
        ? setAllContact(allContact)
        : setAllContact(allContact.reverse());
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  // delete contact
  const deleteContactHandler = async () => {
    console.log(targetContact?._id);
    try {
      await fetch(`http://localhost:4000/v1/contact/${targetContact?._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userDatas.token}`,
        },
      });
      getAllContact();
      closeAlerts();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const deleteContact = (contact: T_ContactDatas) => {
    setTargetContact(contact);
    setIsShowAlert((prev) => ({ ...prev, delete: true }));
  };

  // answer to contect
  const answerToContectHandler = async () => {
    try {
      const res = await fetch(`http://localhost:4000/v1/contact/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDatas.token}`,
        },
        body: JSON.stringify({
          email: targetContact?.email,
          answer: answerValue,
        }),
      });
      console.log(res);
      
      setSendAnswrIsPending(false);
      setAnswerValue("");
      getAllContact();
      closeAlerts();
    } 
    catch (error) {
      throw new Error(`${error}`);
    }
  };

  const answerToContect = (contact: T_ContactDatas) => {
    setTargetContact(contact);
    setIsShowAlert((prev) => ({ ...prev, answer: true }));
  };

  // see message
  const seeMessageHandler = (contact: T_ContactDatas) => {
    setTargetContact(contact);
    setIsShowAlert((prev) => ({ ...prev, message: true }));
  };

  useEffect(() => {
    getAllContact();
  }, []);

  return (
    <>
      <div>
        <DataCotainerBox
          title="لیست پیغام ها"
          action={
            <div
              onClick={() => {
                setAllContact([...(allContact as T_ContactDatas[])]?.reverse());
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
                <div className="w-28 sm:w-auto sm:col-span-2 text-center">
                  <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                    شماره مبایل
                  </span>
                </div>
                <div className="w-36 sm:w-auto sm:col-span-3 text-center">
                  <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                    ایمیل
                  </span>
                </div>
                <div className="w-60 sm:w-auto sm:col-span-4 text-center">
                  <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body"></span>
                </div>
              </div>
              <div className="*:odd:bg-d-neut-seco-panel">
                {allContact?.length !== 0 ? (
                  allContact?.map((contact, index) => (
                    <AllContactListItemPA
                      contact={{ ...contact }}
                      id={isReverse ? index : allContact.length - index - 1}
                      index={index}
                      deleteContact={deleteContact}
                      answerToContect={answerToContect}
                      seeMessageHandler={seeMessageHandler}
                      answer={contact.answer}
                      key={contact._id}
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
          deleteHandler={deleteContactHandler}
          closeAlerts={closeAlerts}
          name={`پیغام ${targetContact?.name}`}
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
                    answerToContectHandler();
                    setSendAnswrIsPending(true);
                  }
                }}
                styles=" !py-2 sm:!px-10 !w-full"
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
          <div className="flex gap-4 justify-between">
            <div>
              <div>
                <div className="font-[dana-b] text-sm text-neutral-600 dark:text-neutral-400">
                  {targetContact?.name}
                </div>
                <div className="text-sm ps-1 pt-0.5 text-neutral-500">
                  {targetContact?.email}
                </div>
              </div>
              <div className="leading-8 font-[dana-xl] px-2 pt-2">
                {targetContact?.body}
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
              className="text-prim hover:text-prim/50 h-fit pt-1 cursor-pointer active:scale-90"
            >
              <ForwardToInboxRoundedIcon />
            </div>
          </div>
        </AlertP>
      )}
      {(isShowAlert.delete || isShowAlert.answer || isShowAlert.message) && (
        <CoverPageP z="z-40" onClick={closeAlerts} />
      )}
    </>
  );
}

export default ContactPA;

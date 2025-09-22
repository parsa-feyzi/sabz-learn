import { useEffect, useState } from "react";
import DataCotainerBox from "../../../components/DataCotainerBox/DataCotainerBox";
import type { T_Ticket } from "../../../../../Types/type";
import WrapperLoader from "../../../../../Components/DesignSystem/WrapperLoader/WrapperLoader";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import CoverPageP from "../../../components/CoverPageP/CoverPageP";
import AlertP from "../../../components/AlertP/AlertP";
import Button from "../../../../../Components/DesignSystem/Button";
import FormTextarea from "../../../../Submit/components/FormTextarea/FormTextarea";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import { CircularProgress } from "@mui/material";
import SearchByP from "../../../components/SearchByP/SearchByP";
import AllTicketsListItemPA from "./components/AllTicketsListItemPA";

function TicketsPA() {
  const [allTickets, setAllTickets] = useState<T_Ticket[] | null>(null);

  const [allOrderedTickets, setAllOrderedTickets] = useState<T_Ticket[] | null>(null);

  const [isReverse, setIsReverse] = useState(false);

  const [targetTicket, setTargetTicket] = useState<T_Ticket | null>(null)

  const [isShowAlert, setIsShowAlert] = useState({ answer: false, message: false });

  const [answerValue, setAnswerValue] = useState("");

  const [sendAnswrIsPending, setSendAnswrIsPending] = useState(false);

  const userDatas = JSON.parse(localStorage.getItem("user") as string);

  // Functions
  const closeAlerts = () => setIsShowAlert({ answer: false, message: false });

  const getAllTickets = async () => {
    try {
      const tickets = await (
        await fetch(`http://localhost:4000/v1/tickets`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userDatas.token}`
          }
        })
      ).json();
      console.log(tickets);
      setAllTickets(tickets)
      isReverse
        ? setAllOrderedTickets(tickets)
        : setAllOrderedTickets(tickets.reverse());
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  // answer to contect
  const answerToTicketsHandler = async () => {
    try {
      const res = await fetch(`http://localhost:4000/v1/tickets/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDatas.token}`,
        },
        body: JSON.stringify({
          ticketID: targetTicket?._id,
          body: answerValue,
        }),
      });
      console.log(res);
      setSendAnswrIsPending(false);
      setAnswerValue("");
      getAllTickets();
      closeAlerts();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const answerToContect = (ticket: T_Ticket) => {
    setTargetTicket(ticket);
    setIsShowAlert((prev) => ({ ...prev, answer: true }));
  };

  // see message
  const seeMessageHandler = (ticket: T_Ticket) => {
    setTargetTicket(ticket);
    setIsShowAlert((prev) => ({ ...prev, message: true }));
  };

  useEffect(() => {
    getAllTickets();
  }, []);

  return (
    <>
      <div>
        <DataCotainerBox
          title="لیست پیغام ها"
          action={
            <div className="flex sm:gap-4 gap-2">
              <SearchByP
                searchFields={[
                  { title: "عنوان", value: "title" },
                  { title: "دپارتمان", value: "department" },
                  { title: "زیر دپارتمان", value: "departmentSub" },
                ]}
                list={allTickets}
                setList={setAllOrderedTickets}
                placeholder="تیکت‌ها"
              />
              <div
                onClick={() => {
                  setAllOrderedTickets(
                    [...(allOrderedTickets as T_Ticket[])]?.reverse()
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
            <div className="min-w-max sm:min-w-[1000px] relative">
              <div className="admin_Panel_Hs_Table flex text-sm items-center sm:grid grid-cols-20 sm:grid-cols-12 *:shrink-0">
                <div className="w-16 sm:w-auto sm:col-span-1 text-center">
                  <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                    شناسه
                  </span>
                </div>
                <div className="w-40 sm:w-auto sm:col-span-2 text-center">
                  <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                    عنوان
                  </span>
                </div>
                <div className="w-40 sm:w-auto sm:col-span-2 text-center">
                  <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                    ثبت کننده
                  </span>
                </div>
                <div className="w-40 sm:w-auto sm:col-span-2 text-center">
                  <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                    دپارتمان
                  </span>
                </div>
                <div className="w-40 sm:w-auto sm:col-span-2 text-center">
                  <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                    دوره
                  </span>
                </div>
                <div className="w-40 sm:w-auto sm:col-span-2 text-center">
                  <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body"></span>
                </div>
                <div className="w-40 sm:w-auto sm:col-span-1 text-center">
                  <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body"></span>
                </div>
              </div>
              <div className="*:odd:bg-d-neut-seco-panel">
                {allOrderedTickets && allOrderedTickets?.length !== 0 ? (
                  allOrderedTickets?.map((ticket, index) => (
                    <AllTicketsListItemPA
                      ticket={{ ...ticket }}
                      id={isReverse ? index : allOrderedTickets.length - index - 1}
                      index={index}
                      answerToContect={answerToContect}
                      seeMessageHandler={seeMessageHandler}
                      answer={ticket.answer}
                      key={ticket._id}
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
                    answerToTicketsHandler();
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
                <div className="font-[dana-b] pb-4 text-sm pt-2 text-neutral-600 dark:text-neutral-400">
                  {targetTicket?.user}
                </div>
                <div className="font-[dana-b] text-sm pt-2 doot">
                  {targetTicket?.title}
                </div>
              </div>
              <div className="leading-8 pb-2 font-[dana-xl] px-2 pt-2">
                {targetTicket?.body}
              </div>
            </div>
            {targetTicket?.answer === 0 && <div
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
            </div>}
          </div>
        </AlertP>
      )}
      {(isShowAlert.answer || isShowAlert.message) && (
        <CoverPageP z="z-40" onClick={closeAlerts} />
      )}
    </>
  );
}

export default TicketsPA;

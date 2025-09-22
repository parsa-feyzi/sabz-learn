import DataCotainerBox from "../../../components/DataCotainerBox/DataCotainerBox";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import type { T_Ticket } from "../../../../../Types/type";

type T_answerTicket = { answer?: string; ticket: string };

function ChatTicket() {
  const [answerTicket, setAnswerTicket] = useState<T_answerTicket | null>(null);

  const [mainTicket, setMainTicket] = useState<T_Ticket | null>(null);

  const navigate = useNavigate();

  const { ticketName } = useParams();

  const userDatas = JSON.parse(localStorage.getItem("user") as string);

  const getAllTickets = async () => {
    try {
      const allTickets = await (
        await fetch(`http://localhost:4000/v1/tickets/user`, {
          headers: {
            Authorization: `Bearer ${userDatas.token}`,
          },
        })
      ).json();

      const targetTicket = allTickets.find(
        (ticket: T_Ticket) => ticket._id === ticketName
      );
      targetTicket && setMainTicket(targetTicket);
    } 
    catch (error) {
      throw new Error(`${error}`);
    }
  };

  const getAnswerTicketHandler = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/v1/tickets/answer/${ticketName}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userDatas.token}`,
          },
        }
      );
      if (res.status === 404) {
        navigate("/my-panel/tickets/");
      } else {
        const answerTicketRes = await res.json();
        setAnswerTicket(answerTicketRes);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    getAllTickets()
    getAnswerTicketHandler();
  }, []);

  return (
    <div>
      <DataCotainerBox
        title={
          <div className="font-[dana-b] text-[15px] line-clamp-2 pt-2 doot">
            { mainTicket?.title }
          </div>
        }
        action={
          <Link
            to={`/my-panel/tickets/`}
            className="btn btn-neut !flex sm:!pt-2.5 !px-3 !pb-1.5 gap-1 items-center text-[13px] sm:size-auto size-9 ms-8"
          >
            <div className="font-[dana-xl] sm:block hidden text-xs">بازگشت</div>
            <div>
              <WestRoundedIcon sx={{ fontSize: 16 }} />
            </div>
          </Link>
        }
      >
        <div className="lbt pt-6">
          <div className="lg:w-[calc(100%-13rem)] max-w-[600px] w-full">
            <div className="bg-neut-ther-panel font-[dana-xl] leading-6 text-sm dark:bg-d-neut-ther-panel rounded-md sm:p-5 p-4 border border-gray-500/5 dark:border-gray-500/25 mt-4">
              {answerTicket && answerTicket.ticket}
            </div>
            <div className="text-[13px] text-neutral-700 dark:text-neutral-400 mt-1.5">
              . شما
            </div>
          </div>
          {answerTicket && answerTicket.answer && (
            <div className="flex justify-end">
              <div className="lg:w-[calc(100%-13rem)] max-w-[600px] w-full">
                <div className="text-neut-prim-panel font-[dana-xl] leading-6 dark:text-d-neut-seco-panel dark:bg-neut-ther-panel/80 text-sm bg-d-neut-ther-panel/90 rounded-md sm:p-5 p-4 border dark:border-gray-500/5 border-gray-500/25 mt-4 ">
                  {answerTicket.answer}
                </div>
                <div className="text-[13px] text-neutral-700 dark:text-neutral-400 mt-1.5">
                  . پشتیبان
                </div>
              </div>
            </div>
          )}
        </div>
      </DataCotainerBox>
    </div>
  );
}

export default ChatTicket;

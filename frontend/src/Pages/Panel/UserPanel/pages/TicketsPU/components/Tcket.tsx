import WestRoundedIcon from "@mui/icons-material/WestRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import type { T_Ticket } from "../../../../../../Types/type";
import { Link } from "react-router";
import TextSnippetRoundedIcon from "@mui/icons-material/TextSnippetRounded";
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import TicketDetails from "./TicketDetails";

function Ticket({ ticket }: { ticket: T_Ticket }) {
  return (
    <div className="sm:px-6 px-4 py-6 rounded-md border border-d-neut-ther/10 dark:border-white/15 mb-4">
      <div className="flex items-center justify-between">
        <Link
          to={`/my-panel/tickets/chat/${ticket._id}`}
          className="line-clamp-1 font-[dana-b] sm:text-[15px] text-sm hover:text-prim before:size-1.5 before:mx-2 before:bg-neutral-800 dark:before:bg-neutral-400 before:rounded-full before:inline-block"
        >
          {ticket.title}
        </Link>
        <div>
          <Link to={`/my-panel/tickets/chat/${ticket._id}`}>
            <button className="sm:size-auto size-9 flex gap-1 items-center text-[13px] p-2 pt-2.5 border border-d-neut-ther/10 dark:border-white/15 hover:bg-d-neut-ther/10 hover:dark:bg-white/15 hover:border-white/0 hover:dark:border-white/0 rounded-lg">
              <div className="sm:block hidden font-[dana-xl]">
                مشاهده جزییات
              </div>
              <div>
                <WestRoundedIcon sx={{ fontSize: 17 }} />
              </div>
            </button>
          </Link>
        </div>
      </div>
      <div className="md:flex text-xs pt-3 flex-wrap gap-x-8 gap-y-3.5">
        <TicketDetails
          title="دپارتمان"
          icon={<TextSnippetRoundedIcon sx={{ fontSize: 17 }} />}
        >
          <div className="flex items-start gap-0.5">
            <span className="line-clamp-1 font-[dana-xl]">
              {ticket.departmentID}
            </span>
            <span>
              <ArrowBackIosRoundedIcon sx={{ fontSize: 14 }} />
            </span>
            <span className="line-clamp-1 font-[dana-xl]">
              {ticket.departmentSubID}
            </span>
          </div>
        </TicketDetails>
        <TicketDetails
          title="تاریخ ثبت"
          icon={<QueryBuilderRoundedIcon sx={{ fontSize: 17 }} />}
        >
          <div className="font-[irsans] font-bold">
            {ticket.createdAt.slice(0, 10)}
          </div>
        </TicketDetails>
        <div className="sm:block hidden">
          <TicketDetails
            title="وضعیت"
            icon={<AutorenewRoundedIcon sx={{ fontSize: 17 }} />}
          >
            {ticket.answer ? (
              <div className="w-25 suc-btn">پاسخ داده شده</div>
            ) : (
              <div className="w-25 warn-btn">در انتظار پاسخ</div>
            )}
          </TicketDetails>
        </div>
        <div className="sm:hidden block pt-2">
          <div className="w-fit">
            {ticket.answer ? (
              <div className="w-25 suc-btn">پاسخ داده شده</div>
            ) : (
              <div className="w-25 warn-btn">در انتظار پاسخ</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;

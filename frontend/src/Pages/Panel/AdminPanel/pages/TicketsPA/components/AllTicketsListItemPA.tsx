import type { T_Ticket } from "../../../../../../Types/type";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import "../../../../../../Button.css";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Badge } from "@mui/material";
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';

type T_AllContactsListItem = {
  ticket: T_Ticket;
  index: number;
  id: number;
  answerToContect: (ticket: T_Ticket) => void;
  seeMessageHandler: (ticket: T_Ticket) => void;
  answer: 0 | 1;
};

function AllTicketsListItemPA({ ticket, index, answerToContect, seeMessageHandler, answer, id }: T_AllContactsListItem) {
  return (
    <div
      className={`${
        index % 2
          ? ""
          : "rounded-lg bg-neut-seco-panel dark:bg-d-neut-seco-panel"
      } flex items-center sm:grid sm:grid-cols-12 py-4 me-2 rounded-md *:shrink-0`}
    >
      <div className="w-16 sm:w-auto md:text-base text-sm sm:col-span-1 text-center">
        <span className="font-[irsans] font-bold opacity-50 text-label xs:text-caption">
          {id + 1}
        </span>
      </div>
      <div className="w-40 sm:w-auto md:text-base text-sm sm:col-span-2 text-center flex items-center justify-center gap-x-1.5">
        <span className="text-label text-sm font-[dana-xl] xs:text-caption">{ticket.title}</span>
      </div>
      <div className="w-40 sm:w-auto md:text-base text-sm sm:col-span-2 text-center">
        <span className="text-label text-sm xs:text-caption">
          {ticket.user}
        </span>
      </div>
      <div className="w-40 sm:w-auto md:text-base text-sm sm:col-span-2 text-center">
        <span className="text-label text-xs xs:text-caption">{ticket.departmentID} {<KeyboardArrowLeftRoundedIcon fontSize="small" />} {ticket.departmentSubID}</span>
      </div>
      <div className="w-40 sm:w-auto md:text-base text-sm sm:col-span-2 text-center">
        <span className="text-label text-xs xs:text-caption px-1">{ticket.course ? ticket.course : "__"}</span>
      </div>
      <div className="w-40 sm:w-auto md:text-base text-sm sm:col-span-2 text-center">
        <span className="text-label xs:text-caption">
          <span
            onClick={() => seeMessageHandler(ticket)}
            className="cursor-pointer active:scale-90 py-2 px-2 flex gap-2 w-fit items-center text-sm rounded bg-notf-seco/10 dark:bg-notf/5 dark:text-notf/60 text-notf-seco/70"
          >
            <div className="font-[dana-xl]">مشاهده تیکت</div>
            <VisibilityOutlinedIcon fontSize="small" />
          </span>
        </span>
      </div>
      <div className="w-40 sm:w-auto md:text-base text-sm sm:col-span-1 text-center">
        <div className="w-auto text-label text-center px-2 py-0.5 mx-auto bg-brand-90/10 text-brand-darker rounded-md">
          <div className="flex sm:gap-3 gap-2 sm:justify-start justify-center">
            <div
              onClick={() => answer || answerToContect(ticket)}
              className="btn btn-sm btn-neut !text-prim"
            >
              {answer ? (
                <ForwardToInboxRoundedIcon className="text-neutral-500/50" />
              ) : (
                <Badge color="success" badgeContent=" " variant="dot">
                  <ForwardToInboxRoundedIcon />
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default AllTicketsListItemPA


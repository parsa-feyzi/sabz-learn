import type { T_ContactDatas } from "../../../../../../Types/type";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import "../../../../../../Button.css";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Badge } from "@mui/material";

type T_AllContactsListItem = {
  contact: T_ContactDatas;
  index: number;
  id: number;
  deleteContact: (contact: T_ContactDatas) => void;
  answerToContect: (contact: T_ContactDatas) => void;
  seeMessageHandler: (contact: T_ContactDatas) => void;
  answer: 0 | 1;
};

function AllContactListItemPA({ contact, index, deleteContact, answerToContect, seeMessageHandler, answer, id }: T_AllContactsListItem) {
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
      <div className="w-24 sm:w-auto md:text-base text-sm sm:col-span-2 text-center flex items-center justify-center gap-x-1.5">
        <span className="text-label xs:text-caption">{contact.name}</span>
      </div>
      <div className="w-28 sm:w-auto md:text-base text-sm sm:col-span-2 text-center">
        <span className="text-label font-[irsans] font-bold xs:text-caption">
          {contact.phone}
        </span>
      </div>
      <div className="w-36 sm:w-auto md:text-base text-sm sm:col-span-3 text-center">
        <span className="text-label xs:text-caption">{contact.email}</span>
      </div>
      <div className="w-36 sm:w-auto md:text-base text-sm sm:col-span-2 text-center">
        <span className="text-label xs:text-caption">
          <span
            onClick={() => seeMessageHandler(contact)}
            className="cursor-pointer active:scale-90 py-2 px-2 flex gap-2 w-fit items-center text-sm rounded bg-notf-seco/10 dark:bg-notf/5 dark:text-notf/60 text-notf-seco/70"
          >
            <div className="font-[dana-xl]">مشاهده پیغام</div>
            <VisibilityOutlinedIcon fontSize="small" />
          </span>
        </span>
      </div>
      <div className="w-60 sm:w-auto md:text-base text-sm sm:col-span-2 text-center">
        <div className="w-auto text-label text-center px-2 py-0.5 mx-auto bg-brand-90/10 text-brand-darker rounded-md">
          <div className="flex sm:gap-3 gap-2 justify-center">
            <div
              onClick={() => answerToContect(contact)}
              className="btn btn-sm btn-neut !text-prim"
            >
              {answer ? (
                <ForwardToInboxRoundedIcon className="opacity-60" />
              ) : (
                <Badge color="success" badgeContent=" " variant="dot">
                  <ForwardToInboxRoundedIcon />
                </Badge>
              )}
            </div>
            <div
              onClick={() => deleteContact(contact)}
              className="btn btn-sm btn-neut !text-rose-500"
            >
              <DeleteOutlineRoundedIcon fontSize="small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllContactListItemPA;

import type { JSX } from "react";

type T_TicketDetails = { title: string, icon: JSX.Element, children: JSX.Element }

function TicketDetails({ title, icon, children }: T_TicketDetails) {
  return (
    <div className="flex items-end gap-2 mt-3">
      <div className="flex text-d-neut-ther/80 dark:text-white/50 items-end gap-1">
        <div>{icon}</div>
        <div className="font-[dana-xl]">{title}:</div>
      </div>
      <div className="">
        {children}
      </div>
    </div>
  );
}

export default TicketDetails;

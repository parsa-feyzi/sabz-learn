import { useEffect, useState } from "react";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import type { T_Ticket } from "../../../../../Types/type";
import DataCotainerBox from "../../../components/DataCotainerBox/DataCotainerBox";
import Button from "../../../../../Components/DesignSystem/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Link } from "react-router";
import Ticket from "./components/Tcket";
import EmptyPU from "../../../components/EmptyPU/EmptyPU";

function TicketsPU() {
  const [tickets, setTickets] = useState<T_Ticket[] | null>(null);

  const [isPending, setIsPending] = useState(true);

  const [isReverse, setIsReverse] = useState(false);

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
      setTickets(allTickets);
      setIsPending(false);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    getAllTickets();
  }, []);

  return (
    <DataCotainerBox
      title="تیکت های من"
      action={
        <div className="flex sm:gap-4 gap-2">
          <div
            onClick={() => {
              setTickets([...(tickets as T_Ticket[])]?.reverse());
              tickets && setIsReverse(tickets.length !== 0 && !isReverse);
            }}
            className="btn btn-sm btn-neut"
          >
            <FilterListRoundedIcon
              fontSize="small"
              className={isReverse ? "rotate-180" : ""}
            />
          </div>
          <Link to={"create"}>
            <Button styles="!flex !px-2 sm:!size-auto !size-8 !rounded-lg">
              <div>
                <AddRoundedIcon fontSize="small" />
              </div>
              <div className="sm:block hidden text-xs font-[dana-xl] pe-1">
                ایجاد تیکت جدید
              </div>
            </Button>
          </Link>
        </div>
      }
    >
      <div className="panel_table overflow-x-auto min-h-[68vh] lg:max-w-[calc(100vw-26.5rem)] md:max-w-[calc(100vw-18.5rem)]">
        {!isPending ? (
          <>
            {tickets && tickets.length !== 0 ? (
              <div>
                {tickets.map((ticket) => (
                  <Ticket ticket={ticket} />
                ))}
              </div>
            ) : (
              <EmptyPU
                title="تاکنون هیچ تیکتی ثبت نکردی!"
                text="اگه یه وقت به مشکلی خوردی، سوالی درباره پرداخت، دسترسی، یا
                     هر موضوع کلی داشتی، می‌تونی برامون تیکت بزنی."
                img="tickets-empty.png"
              >
                <Link
                  to={"create"}
                  className="flex items-center gap-x-2 text-caption text-brand text-prim"
                >
                  <div>
                    <AddRoundedIcon fontSize="small" />
                  </div>
                  <div className="font-[dana-xl]">ایجاد تیکت جدید</div>
                </Link>
              </EmptyPU>
            )}
          </>
        ) : (
          <div className=""></div>
        )}
      </div>
    </DataCotainerBox>
  );
}

export default TicketsPU;

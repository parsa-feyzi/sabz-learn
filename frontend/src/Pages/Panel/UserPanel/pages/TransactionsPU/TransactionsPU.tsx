import { useEffect, useState } from "react";
import DataCotainerBox from "../../../components/DataCotainerBox/DataCotainerBox";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import WrapperLoader from "../../../../../Components/DesignSystem/WrapperLoader/WrapperLoader";
import type { T_Transaction } from "../../../../../Types/type";
import AllTransactionsListItemPU from "./components/AllTransactionsListItemPU";
import EmptyPU from "../../../components/EmptyPU/EmptyPU";

function TransactionsPU() {
  const [transactions, setTransactions] = useState<T_Transaction[] | null>(null);

  const [isReverse, setIsReverse] = useState(false);

  const userDatas = JSON.parse(localStorage.getItem("user") as string);

  const getAllTransactions = async () => {
    try {
      const allTransactions = await (
        await fetch(`http://localhost:4000/v1/orders`, {
          headers: {
            Authorization: `Bearer ${userDatas.token}`,
          },
        })
      ).json();
      setTransactions(allTransactions.reverse());
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <DataCotainerBox
      title="لیست تراکنش‌های من"
      action={
        <div className="flex sm:gap-4 gap-2">
          <div
            onClick={() => {
              setTransactions(
                [...(transactions as T_Transaction[])]?.reverse()
              );
              transactions?.length && setIsReverse(!isReverse);
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
      <div className={`${transactions?.length ? "h-[72vh]" : "h-[68vh]"} panel_table overflow-x-auto lg:max-w-[calc(100vw-26.5rem)] md:max-w-[calc(100vw-18.5rem)]`}>
        {transactions && (
          <>
            {transactions.length !== 0 ? (
              <div className="min-w-max relative sm:min-w-[750px]">
                <div className="admin_Panel_Hs_Table flex text-sm items-center sm:grid grid-cols-20 sm:grid-cols-12 *:shrink-0">
                  <div className="w-16 sm:w-auto sm:col-span-1 text-center">
                    <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                      شناسه
                    </span>
                  </div>
                  <div className="w-36 sm:w-auto sm:col-span-4 text-center">
                    <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                      دوره
                    </span>
                  </div>
                  <div className="w-36 sm:w-auto sm:col-span-2 text-center">
                    <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                      تاریخ
                    </span>
                  </div>
                  <div className="w-36 sm:w-auto sm:col-span-2 text-center">
                    <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                      مبلغ
                    </span>
                  </div>
                  <div className="w-36 sm:w-auto sm:col-span-2 text-center">
                    <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                      تخفیف
                    </span>
                  </div>
                </div>
                <div className="*:odd:bg-d-neut-seco-panel">
                  {transactions?.length !== 0 ? (
                    transactions?.map((transaction, index) => (
                      <AllTransactionsListItemPU
                        transaction={transaction}
                        index={index}
                        id={isReverse ? index : transactions.length - index - 1}
                      />
                    ))
                  ) : (
                    <div className="h-36 pt-6 grid sm:place-content-center sm:ps-0 ps-[40vw]">
                      <WrapperLoader />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <EmptyPU title="تراکنشی برای نمایش وجود نداره!" text="هر زمان که دوره‌ای بخری یا جلسه‌ای رزرو کنی، جزئیاتش اینجا برات لیست می‌شه." img="transactions-empty.png" />
            )}
          </>
        )}
      </div>
    </DataCotainerBox>
  );
}

export default TransactionsPU;

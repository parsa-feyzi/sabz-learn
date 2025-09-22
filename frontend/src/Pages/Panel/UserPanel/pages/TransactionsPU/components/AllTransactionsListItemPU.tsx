import type { T_Transaction } from "../../../../../../Types/type";
import "../../../../../../Button.css";

type T_AllTransactionsListItem = {
  transaction: T_Transaction;
  index: number;
  id: number;
};

function AllTransactionsListItemPU({
  transaction,
  index,
  id,
}: T_AllTransactionsListItem) {
  return (
    <div
      className={`${
        index % 2
          ? ""
          : "rounded-lg bg-neut-seco-panel dark:bg-d-neut-seco-panel"
      } flex items-center sm:grid sm:grid-cols-12 py-6 me-2 rounded-md *:shrink-0`}
    >
      <div className="w-16 sm:w-auto md:text-base text-sm sm:col-span-1 text-center">
        <span className="font-[irsans] font-bold opacity-50 text-label xs:text-caption">
          {id + 1}
        </span>
      </div>
      <div className="w-36 sm:w-auto md:text-base text-sm sm:col-span-4 text-center flex items-center justify-center gap-x-1.5">
        <span className="text-label xs:text-caption">
          {transaction.course?.name}
        </span>
      </div>
      <div className="w-36 sm:w-auto md:text-base text-sm sm:col-span-2 text-center">
        <span className="text-label font-[irsans] font-bold xs:text-caption">
          {transaction.createdAt.slice(0, 10)}
        </span>
      </div>
      <div className="w-36 sm:w-auto md:text-lg text-base sm:col-span-2 text-center">
        <span className="text-label xs:text-caption text-green-950 dark:text-green-100">
          {transaction.price ? (
            <span className="font-[irsans] font-bold">
              {transaction.price.toLocaleString()}
              <span className="text-sm ps-1">تومان</span>
            </span>
          ) : (
            <span className="font-[dana-xl]">رایگان</span>
          )}
        </span>
      </div>
      <div className="w-36 sm:w-auto md:text-base text-sm sm:col-span-2 text-center">
        <div className="w-auto text-label text-center px-2 py-0.5 mx-auto bg-brand-90/10 text-brand-darker rounded-md">
          <div className="flex sm:gap-3 gap-2 justify-center">
            {transaction.course && (
              <>
                {transaction.course.price - transaction.price ? (
                  <div className="text-red-600 dark:text-red-400">
                    <span className="font-[irsans] font-bold pe-1">
                      ({(((transaction.price - transaction.course.price) / transaction.course.price) * 100 * -1).toFixed()}%)
                    </span>
                    <span className="font-[irsans] font-bold">
                      {(
                        transaction.course.price - transaction.price
                      ).toLocaleString()}
                    </span>
                  </div>
                ) : transaction.price ? (
                  <span className="opacity-50">__</span>
                ) : (
                  <span className="font-[irsans] font-bold text-red-700 dark:text-red-500">
                    100%
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllTransactionsListItemPU;

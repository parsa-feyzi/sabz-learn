import { type JSX } from "react";

type T_CategoryContent = {
  titlePage: React.ReactNode;
  labelPage: string;
  itemsCount?: number;
  children: JSX.Element;
  pb?: string
};

function CategoryContent({ titlePage, labelPage, itemsCount, children, pb="sm:pb-12 pb-8" }: T_CategoryContent) {
  return (
    <div className="max-w-[1500px] mx-auto sm:pt-12 pt-8">
      {(titlePage || labelPage || itemsCount) && (
        <div className={`${pb} flex sm:flex-row flex-col sm:justify-between justify-start items-center gap-y-3`}>
          <div className="flex items-center content-center gap-2">
            <div className="size-4 rounded-sm sm:block hidden bg-amber-500 dark:bg-amber-400"></div>
            <div className="md:text-3xl text-2xl font-[dana-b]">
              {titlePage}
            </div>
          </div>
          <div className="text-base text-gray-500">
            <span className="font-[irsans] md:text-xl font-bold pe-2">
              {itemsCount}
            </span>
            <span className="md:text-lg font-[dana-xl]">{labelPage}</span>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

export default CategoryContent;

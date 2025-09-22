import type React from "react";
import type { JSX } from "react";

type T_DataCotainerBox = {
  title?: React.ReactNode;
  action?: JSX.Element;
  children: JSX.Element;
};

function DataCotainerBox({ title, action, children }: T_DataCotainerBox) {
  return (
    <div className="lg:pb-8">
      <div className="bg-neut-prim-panel dark:bg-d-neut-prim-panel p-6 sm:pt-5 pt-8 lg:rounded-lg lg:border lg:border-gray-500/5 dark:lg:border-gray-500/25">
        {(!title && !action) || (
          <div className="flex justify-between items-center pt-2 lg:mb-9 mb-6">
            {title && (
              <div className="text sm:text-lg text-base font-[dana-xb]">
                {title}
              </div>
            )}
            {action}
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default DataCotainerBox;

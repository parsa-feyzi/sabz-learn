import type { JSX } from "react";

function HeaderSection({ subject, title, children }: { subject: string; title: string, children?: JSX.Element }) {
  return (
    <div className={`${children && "flex justify-between items-end content-end flex-wrap gap-6"} sm:pb-12 pb-8`}>
      <div>
        <div className="relative z-0 w-fit sm:text-lg text-base text-gray-600 dark:text-gray-400">
          <div>{subject}</div>
          <div className="w-full absolute bottom-0 h-[10px] -z-[1] -skew-x-[30deg] bg-prim block bg-opacity-30"></div>
        </div>
        <div className="mt-4 sm:text-2xl text-xl font-[dana-b] text-d-neut-seco dark:text-neut-prim">{title}</div>
      </div>
      {children}
    </div>
  );
}

export default HeaderSection;

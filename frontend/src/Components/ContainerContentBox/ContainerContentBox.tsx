import type { JSX } from "@emotion/react/jsx-runtime";

type T_ContainerContentBox = {
  title: string;
  color: string;
  icon?: JSX.Element;
  leftBox?: JSX.Element;
  children: React.ReactNode;
};

function ContainerContentBox({ title, color, icon, leftBox, children}: T_ContainerContentBox) {
  return (
    <div className="bg-neut-prim dark:bg-d-neut-prim rounded-xl p-4 sm:p-5 w-full mt-6">
      <div className="relative flex items-center content-center justify-between sm:mb-7 mb-6">
        <div className="flex items-center translate-y-1 gap-3">
          <div className="md:block hidden" style={{ color: color }}>{icon}</div>
          <div className="md:text-2xl text-xl leading-8 font-[dana-b]">{title}</div>
        </div>
        <div>{leftBox}</div>
        <div
          style={{ backgroundColor: color }}
          className="absolute -right-6 sm:-right-[26px] block w-1.5 h-[34px] md:h-9.5 rounded-r-sm top-1/2 -translate-y-1/2"
        ></div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default ContainerContentBox;

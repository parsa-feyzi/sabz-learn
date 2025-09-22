import type { JSX } from "react";
import type React from "react";

interface I_EmptyPU {
  img: string;
  title: string;
  text: React.ReactNode;
  children?: JSX.Element;
}

function EmptyPU({ img, title, text, children }: I_EmptyPU) {
  return (
    <div className="max-w-sm mx-auto h-[63vh] flex flex-col gap-4 justify-center">
      <div>
        <img className="size-20 sm:size-24 mx-auto mb-2" src={`/img/${img}`} />
      </div>
      <div className="text-center text-lg font-[dana-b]">{title}</div>
      <div className="text-center text-[15px] text-neutral-600 dark:text-neutral-400 leading-7">
        {text}
      </div>
      <div className="flex justify-center mt-4">{children}</div>
    </div>
  );
}

export default EmptyPU;

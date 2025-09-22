import { useEffect, useState } from "react";
import type { JSX } from "react/jsx-dev-runtime";

type T_InfoBoxPA = {
  icon: JSX.Element;
  title: string;
  count: number;
  label: string;
};

function InfoBoxPA({ icon, title, count, label }: T_InfoBoxPA) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let counterInterval: NodeJS.Timeout;
    if(counter < count){
      counterInterval = setInterval(() => {
        setCounter((prev) => prev + 1);
      }, 30);
    }
    return () => clearInterval(counterInterval);
  }, [counter]);

  return (
    <div className="lg:border lg:border-gray-500/5 flex lg:gap-2 gap-4 lg:items-start items-center sm:justify-start justify-center dark:lg:border-gray-500/25 px-7 lg:py-6 py-5 rounded-xl bg-neut-prim-panel dark:bg-d-neut-prim-panel">
      <div className="text-green-500">{icon}</div>
      <div className="sm:w-full">
        <div className="text-lg font-[dana-xb] translate-y-1">{title}</div>
        <div className="flex lg:justify-end lg:pt-4 pt-2">
          <div className="font-[irsans] font-bold lg:text-5xl text-2xl text-green-950 dark:text-green-100">
            {counter}
            <span className="text-sm opacity-80"> {label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoBoxPA;

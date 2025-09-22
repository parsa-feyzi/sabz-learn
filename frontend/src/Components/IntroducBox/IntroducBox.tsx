// import { useEffect, useState } from "react";
import { numberSeparator } from "../../Founctions/NumberSeparator";

interface I_IntroducBox {
  img: string;
  count?: number;
  title: string;
}

function IntroducBox({ img, count, title }: I_IntroducBox) {
  // const [counter, setcounter] = useState(0);

  // useEffect(() => {
  //   let increaseSpead: number = 60;

  //   if (count < 1_00) {
  //     increaseSpead = 60;
  //   } else if (count < 10_000) {
  //     increaseSpead = 1;
  //   } else if (count < 100_000) {
  //     increaseSpead = 0.001;
  //   } else {
  //     increaseSpead = 0.00001;
  //   }

  //   // increase handling
  //   const countInterval = setInterval(() => {
  //     setcounter((prevCount) => prevCount + 1);
  //   }, increaseSpead);

  //   if (count <= counter) clearInterval(countInterval);

  //   return () => clearInterval(countInterval);
  // }, [counter]);

  return (
    <div className="flex flex-col w-full">
      <div className="text-center">
        <img className="mx-auto sm:pb-4 pb-3 md:w-20 w-11" src={img} alt="" />
      </div>
      <div className="md:text-3xl sm:text-xl text-lg pb-1 font-black font-[irsans] text-center">
        {count && numberSeparator(count)}
      </div>
      <div className="md:text-lg text-sm md:font-bold font-normal text-center">
        {title}
      </div>
    </div>
  );
}

export default IntroducBox;

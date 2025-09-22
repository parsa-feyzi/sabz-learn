import type { JSX } from "react";

function AboutusIcon({ icon, color, iconColor }: { icon: JSX.Element; color: string; iconColor: string }) {
  return (
    <div>
      <div
        className={`${color} relative flex justify-center lg:justify-end items-center lg:w-[3.25rem] w-36 lg:p-0 md:py-1 py-1.5 h-full mb-11 lg:mb-0 lg:ml-11 rounded-full`}
      >
        <div className={`${iconColor} w-fit h-fit absolute lg:-left-4 lg:bottom-auto md:-bottom-4 bottom-1`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default AboutusIcon;

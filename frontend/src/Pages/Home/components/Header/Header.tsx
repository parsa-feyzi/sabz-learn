import Navbar from "../../../../Components/Navbar/Navbar";
import SearchBoxHome from "../../../../Components/DesignSystem/SearchBoxHome";
import IntroducBox from "../../../../Components/IntroducBox/IntroducBox";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Typewriter from "typewriter-effect";
import KerbIcon from "../../../../Components/Icons/KerbIcon";
import { useEffect, useState } from "react";

type T_infos = {
  phone: string;
  email: string;
  coursesCount: number;
  usersCount: number;
  totalTime: number;
};

function Header() {
  const [infos, setInfos] = useState<T_infos | null>(null);

  const getInfosHandler = async () => {
    const infos = await (
      await fetch(`http://localhost:4000/v1/infos/index`)
    ).json();
    setInfos(infos);
  };

  useEffect(() => {
    getInfosHandler();
  }, []);

  return (
    <header className="relative z-[1] text-neut-prim mb-9 sm:mb-24 lg:mb-32">
      <img
        className="absolute h-full w-full object-cover top-0 z-[-1]"
        src="https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/hero-section.webp"
        alt=""
      />
      <div>
        <div>
          <Navbar isNavhome />
        </div>
        <div className="flex flex-col md:pt-12 pt-8 items-center lg:px-[8vw] px-[5vw] max-w-[1500px] mx-auto">
          <div className="md:pb-14 pb-8">
            <div className="md:text-4xl sm:text-2xl text-xl text-center md:pb-8 pb-4 font-[dana-xb]">
              بــی‌لـرن، اولین گام برنامه‌نویس شدن
            </div>
            <div className="md:text-lg text-sm text-center">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString(
                      "با آکادمی خصوصی بــی‌لـرن، علم برنامه نویسی رو با خیال راحت یاد بگیر و پیشرفت کن"
                    )
                    .start()
                    .pauseFor(5000)
                    .deleteAll()
                    .typeString(
                      "با آکادمی خصوصی بــی‌لـرن، علم برنامه نویسی رو با خیال راحت یاد بگیر و پیشرفت کن"
                    )
                    .pauseFor(5000)
                    .deleteAll();
                }}
                options={{
                  loop: true,
                }}
              />
            </div>
          </div>
          <div className="lg:w-8/12 md:w-10/12 w-full ">
            <div className="min-w-full md:pb-16 sm:pb-12 pb-10">
              <SearchBoxHome />
            </div>
            <div className="flex lg:px-12 md:px-6 px-0 md:pb-24 sm:pb-16 pb-12  justify-center lg:gap-16 md:gap-12 gap-8">
              <IntroducBox
                img="https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/clock-min.webp"
                count={infos?.totalTime}
                title="ساعت آموزش"
              />
              <IntroducBox
                img="https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/book-min.webp"
                count={infos?.coursesCount}
                title="دوره آموزشی"
              />
              <IntroducBox
                img="https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/conversation-min.webp"
                count={infos?.usersCount}
                title="دانشجو"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="absolute md:block hidden -bottom-3 z-[3] left-1/2 -translate-x-1/2 text-neutral-800 dark:text-neut-prim">
          <KeyboardArrowDownRoundedIcon fontSize="large" />
        </div>
        <div className="absolute md:block hidden bottom-0 z-[2] left-1/2 -translate-x-1/2">
          <KerbIcon />
        </div>
      </div>
    </header>
  );
}

export default Header;

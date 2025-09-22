import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import TimeButton from "../DesignSystem/TimeButton";
import { useEffect, useState } from "react";
import { Link } from "react-router";

function Topbar() {
  const [second, setSecond] = useState<number | null>(59);
  const [minute, setMinute] = useState<number | null>(59);
  const [hour, setHour] = useState<number | null>(1);
  const [day, setDay] = useState<number | null>(2);

  useEffect(() => {
    const secondInterval = setInterval(() => {
      setSecond((prev) => {
        if ((prev as number) > 0) {
          return (prev as number) - 1;
        }
        return 59;
      });
    }, 1000);

    return () => clearInterval(secondInterval);
  }, [second]);
  
  useEffect(() => {
    const minuteInterval = setInterval(() => {
      setMinute((prev) => {
        if ((prev as number) > 0) {
          return (prev as number) - 1;
        }
        return 59;
      });
    }, 60000);
    
    return () => clearInterval(minuteInterval);
  }, [minute]);

  return (
    <div className=" bg-prim text-neut-prim lg:py-4 py-6 lg:px-[7vw] px-[5]">
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center content-center max-w-[1500px] mx-auto">
        <div className="flex gap-3 items-center content-center">
          <div className="sm:block hidden">
            <NotificationsActiveOutlinedIcon />
          </div>
          <div className="sm:text-base sm:text-right text-center text-sm">
            با ۷۰٪ تخفیف تابستانه برنامه‌نویس شو! فرصت محدود !
          </div>
          <div>
            <button className="sm:flex hidden gap-1 px-3 py-1.5 bg-neut-prim rounded-lg text-prim items-center content-center hover:gap-1.5 active:bg-opacity-70">
              <Link to={"/category-courses/courses"} className="sm:text-sm text-xs">مشاهده دوره‌ها</Link>
              <div className="sm:block hidden">
                <KeyboardBackspaceRoundedIcon />
              </div>
            </button>
          </div>
        </div>
        <div className="flex gap-3 items-center content-center">
          {second !== null && (
            <>
              <TimeButton label="ثانیه" time={second as number} isOutline />
              <TimeButton label="دقیقه" time={minute as number} isOutline />
              <TimeButton label="ساعت" time={hour as number} />
              <TimeButton label="روز" time={day as number} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;

import { useState } from "react";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

function ShareBoxToggle({ link }: { link: string }) {
  const [toggle, setToggle] = useState(true);

  const [isCopy, setIsCopy] = useState(false);

  return (
    <div className="bg-neut-prim dark:bg-d-neut-prim p-5 rounded-lg mt-6">
      <div
        onClick={() => setToggle((prevToggle) => !prevToggle)}
        className="flex cursor-pointer justify-between gap-2 items-center content-center"
      >
        <div className="flex gap-2">
          <div>
            <ShareOutlinedIcon />
          </div>
          <div className="font-[dana-b]">اشتراک گذاری مطلب</div>
        </div>
        <div>
          <div className={toggle ? "rotate-90" : "-rotate-90"}>
            <ArrowBackIosRoundedIcon fontSize="small" />
          </div>
        </div>
      </div>
      {toggle && (
        <div className="pt-5 mt-5 border-t-2 border-gray-500/25">
          <div className="p-4 bg-notf/10 border-dashed border border-notf flex gap-2 items-center content-center rounded-xl justify-between text-notf">
            <div
              onClick={() => {
                navigator.clipboard.writeText(link);
                setIsCopy(true);
                setTimeout(() => {
                  setIsCopy(false);
                }, 2000);
              }}
              className="cursor-pointer"
            >
              {isCopy ? <CheckRoundedIcon /> : <FileCopyOutlinedIcon />}
            </div>
            <div dir="ltr" className="share_link translate-y-0.5">{link}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShareBoxToggle;

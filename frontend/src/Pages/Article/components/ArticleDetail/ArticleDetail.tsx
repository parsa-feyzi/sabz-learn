import { type JSX } from "react";

type T_ArticleInfo = { icon: JSX.Element; info: string; font?: string };

function ArticleInfo({ icon, info, font }: T_ArticleInfo) {
  return (
    <div className="flex gap-1 items-center content-center">
      <div>{icon}</div>
      <div
        className={`font-${font ? font : "[dana]"} ${font ? "font-bold" : ""}`}
      >
        {info}
      </div>
    </div>
  );
}

export default ArticleInfo;

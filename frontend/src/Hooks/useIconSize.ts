import { useEffect, useState } from "react";
import type { T_size } from "../Types/type";

function useIconSize(size: T_size) {
  const [iconSize, setIconSize] = useState("");

  useEffect(() => {
    switch (size) {
      case "large":
        setIconSize("w-12");
        break;
      case "small":
        setIconSize("w-[30px]");
        break;
      default:
        setIconSize("w-9");
        break;
    }
  }, []);

  return iconSize
}

export default useIconSize;

import type { T_SwitchThem, T_ThemSwitcher } from "../../Types/type";
import { useContext } from "react";
import { themContext } from "../../App";

function ThemSwitcher({ lightStyle, darkStyle }: T_ThemSwitcher) {
  const { toggleTheme, isDark } = useContext<T_SwitchThem>(themContext)

  return (
    <div onClick={toggleTheme}  className="cursor-pointer text-center">
      {isDark ? <>{darkStyle}</> : <>{lightStyle}</>}
    </div>
  );
}

export default ThemSwitcher;
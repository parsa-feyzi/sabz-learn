import { themContext } from "../../context/AppContext";
import type { T_SwitchThem, T_ThemSwitcher } from "../../Types/type";
import { useContext } from "react";

function ThemSwitcher({ lightStyle, darkStyle }: T_ThemSwitcher) {
  const { toggleTheme, isDark } = useContext<T_SwitchThem>(themContext)

  return (
    <div onClick={toggleTheme}  className="cursor-pointer text-center">
      {isDark ? <>{darkStyle}</> : <>{lightStyle}</>}
    </div>
  );
}

export default ThemSwitcher;
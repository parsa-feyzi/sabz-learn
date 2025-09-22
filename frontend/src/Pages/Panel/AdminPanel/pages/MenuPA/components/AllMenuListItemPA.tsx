// import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import type { T_menu, T_submenu } from "../../../../../../Types/type";
import { useState } from "react";

type T_AllMenuListItemPA = {
  menu: T_menu;
  index: number;
  deleteMenu: (menu: T_menu | T_submenu) => void;
};

function AllMenuListItemPA({ menu, index, deleteMenu }: T_AllMenuListItemPA) {
  const [isShowSubmenuTogel, setIsShowSubmenuTogel] = useState(false);

  return (
    <div
      className={`${
        index % 2
          ? ""
          : "bg-neut-seco-panel dark:bg-d-neut-seco-panel"
      }
      rounded-lg overflow-hidden me-2`}
    >
      <div className="items-center grid grid-cols-12 py-4 *:shrink-0">
        <div className="w-auto md:text-base text-sm col-span-1 text-center">
          <span
            onClick={() => setIsShowSubmenuTogel(!isShowSubmenuTogel)}
            className="cursor-pointer font-[irsans] font-bold opacity-50 text-label xs:text-caption"
          >
            <ArrowBackIosRoundedIcon
              className={`${
                isShowSubmenuTogel ? "rotate-90" : "-rotate-90"
              } active:scale-90`}
            />
          </span>
        </div>
        <div className="w-auto sm:text-base text-sm col-span-3 text-center flex items-center justify-center gap-x-1.5">
          <span className="text-label xs:text-caption">{menu.title}</span>
        </div>
        <div className="w-auto sm:text-base text-sm col-span-4 text-center flex items-center justify-center gap-x-1.5">
          <span className="text-label xs:text-caption">{menu.href}</span>
        </div>
        <div className="w-auto text-sm col-span-4 text-center me-10">
          <div className="w-auto text-label text-center px-2 py-0.5 mx-auto bg-brand-90/10 text-brand-darker rounded-md">
            <div className="flex sm:gap-6 gap-3 justify-end lg:me-14">
              <div
                onClick={() => deleteMenu(menu)}
                className="btn btn-sm btn-neut !text-rose-500"
              >
                <DeleteOutlineRoundedIcon fontSize="small" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isShowSubmenuTogel && menu.submenus.length !== 0 && (
        <div className="panel_table overflow-x-auto max-h-[55vh] w-full sm:px-4 px-0">
          <div className="min-w-[300px]">
            <div>
              {menu.submenus.map((submenu, childIndex) => (
                <div
                  className={`${
                    index % 2
                      ? "bg-neut-prim-panel dark:bg-d-neut-prim-panel"
                      : "bg-neut-seco-panel dark:bg-d-neut-seco-panel"
                  } items-center grid grid-cols-12 py-4 lbt *:shrink-0`}
                >
                  <div className="font-[irsans] font-bold w-auto md:text-base opacity-65 text-sm col-span-1 text-center">
                    {childIndex+1}
                  </div>
                  <div className="w-auto sm:text-base text-sm col-span-3 text-center flex items-center justify-center gap-x-1.5">
                    <span className="text-label xs:text-caption">
                      {submenu.title}
                    </span>
                  </div>
                  <div className="w-auto sm:text-base text-sm col-span-4 text-center flex items-center justify-center gap-x-1.5">
                    <span className="text-label xs:text-caption">
                      {submenu.href}
                    </span>
                  </div>
                  <div className="w-auto text-sm col-span-4 text-center me-10">
                    <div className="w-auto text-label text-center px-2 py-0.5 mx-auto bg-brand-90/10 text-brand-darker rounded-md">
                      <div className="flex sm:gap-6 gap-3 sm:justify-center justify-end">
                        <div
                          onClick={() => deleteMenu(submenu)}
                          className="btn btn-sm btn-neut !text-rose-500"
                        >
                          <DeleteOutlineRoundedIcon fontSize="small" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllMenuListItemPA;

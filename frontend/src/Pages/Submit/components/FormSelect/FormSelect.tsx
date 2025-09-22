import ImportExportRoundedIcon from "@mui/icons-material/ImportExportRounded";
import { useEffect, useState } from "react";

type T_FormSelect = {
  onChange: (id: string) => void;
  value: string;
  options: any[] | null;
  placeholder: string;
  surpluse?: { _id: string; title: string };
  isDisabled?: boolean;
  isNotPanelSelect?: boolean;
};

function FormSelect({
  onChange,
  value,
  options,
  placeholder,
  surpluse,
  isDisabled,
  isNotPanelSelect,
}: T_FormSelect) {
  const [selectTitle, setSelectTitle] = useState<string>("");

  const [isShowOptions, setIsShowOptions] = useState(false);

  useEffect(() => {
    const targetOption = options?.find(
      (option: { _id: string }) => option._id === value
    );
    if (targetOption) {
      targetOption.title
        ? setSelectTitle(targetOption.title)
        : setSelectTitle(targetOption.name);
    } else if (surpluse?._id === value) {
      setSelectTitle(surpluse?.title);
    } else {
      setSelectTitle(placeholder);
    }
  }, [value, options]);

  return (
    <div className={`${isDisabled ? "opacity-80" : ""} relative w-full`}>
      <div
        onClick={() => isDisabled || setIsShowOptions(!isShowOptions)}
        className={`${isShowOptions ? "z-30" : ""} ${
          isDisabled
            ? "border-neut-seco-panel dark:border-d-neut-ther-panel"
            : "border-d-neut-ther/10 dark:border-white/15 hover:!border-prim dark:hover:!border-prim"
        } ${
          isNotPanelSelect
            ? "bg-neut-seco dark:bg-d-neut-ther"
            : "bg-neut-seco-panel dark:bg-d-neut-ther-panel"
        } border relative mb-5 pe-4  rounded-xl overflow-hidden h-fit items-center`}
      >
        <div
          className={`${
            isDisabled ? "cursor-default" : "cursor-pointer"
          } outline-none line-clamp-1 text-sm appearance-none h-fit px-4 my-4 pe-5 w-full bg-inherit`}
        >
          {selectTitle === placeholder ? (
            <div className="line-clamp-1 text-d-neut-ther/70 dark:text-white/25">
              {selectTitle}
            </div>
          ) : (
            selectTitle
          )}
        </div>
        <div
          className={`${
            isNotPanelSelect
              ? "bg-neut-seco dark:bg-d-neut-ther"
              : "bg-neut-seco-panel dark:bg-d-neut-ther-panel"
          } absolute h-full flex items-center text-d-neut-ther/70 dark:text-white/25 left-4 top-1/2 -translate-y-1/2`}
        >
          <ImportExportRoundedIcon />
        </div>
      </div>
      {isShowOptions && (
        <div className={`${
          isNotPanelSelect
            ? "bg-neut-prim dark:bg-d-neut-seco"
            : "bg-neut-prim-panel dark:bg-d-neut-seco-panel"
        } select_options_parent tableP shadow-2xl absolute w-full overflow-hidden top-16 z-30 rounded-xl border border-d-neut-ther/10 dark:border-white/15`}>
          <div className="panel_table overflow-y-auto max-h-[69vh] p-3">
            {surpluse && (
              <div
                key={surpluse._id}
                onClick={() => {
                  onChange(surpluse._id);
                  setTimeout(() => {
                    setIsShowOptions(false);
                  }, 200);
                }}
                className={`${
                  surpluse._id === value
                    ? "bg-prim/15 text-prim"
                    : "hover:bg-prim/5 hover:text-prim"
                } text-center px-2 py-3 font-[dana-xl] text-[13px] cursor-pointer rounded-lg`}
              >
                {surpluse.title}
              </div>
            )}
            {options?.length !== 0 &&
              options?.map((option) => (
                <div
                  key={option._id}
                  onClick={() => {
                    onChange(option._id);
                    setTimeout(() => {
                      setIsShowOptions(false);
                    }, 200);
                  }}
                  className={`${
                    option._id === value
                      ? "bg-prim/15 text-prim"
                      : "hover:bg-prim/5 hover:text-prim"
                  } text-center px-2 py-3 font-[dana-xl] text-[13px] cursor-pointer rounded-lg`}
                >
                  {option.title ? option.title : option.name}
                </div>
              ))}
          </div>
        </div>
      )}
      {isShowOptions && (
        <div
          onClick={() => setIsShowOptions(false)}
          className="fixed z-20 bg-black/10 top-0 left-0 w-screen h-screen"
        ></div>
      )}
    </div>
  );
}

export default FormSelect;

import { useState, useId, useRef, useEffect } from "react";
import type { T_FormInput } from "../../../../Types/type";

function FormInput({
  value,
  setValue,
  errorMessage,
  isSubmited,
  type = "text",
  placeholder,
  icon,
  isContactInput,
  isAdminRegister,
  fileName
}: T_FormInput) {
  const [isFocus, setIsFocus] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null)

  const inputId = useId();

  useEffect(() => {
    type === "file" ? inputRef.current?.classList.add('hidden') : inputRef.current?.classList.remove('hidden')
  }, [])

  return (
    <div className={isSubmited && errorMessage ? "mb-3" : "mb-5"}>
      <div
        className={`${
          isFocus ? "border-d-neut-ther/15 dark:border-white/25" : ""
        } ${
          isFocus && isAdminRegister ? "!border-prim dark:!border-prim" : ""
        } ${
          fileName ? "hover:!border-prim dark:hover:!border-prim" : ""
        }
         ${
          isAdminRegister ? "border-d-neut-ther/10 dark:border-white/15" : ""
        }
        ${
          isSubmited && errorMessage
            ? "!bg-red-700/5 dark:!bg-red-300/15"
            : `${
                isAdminRegister
                  ? "bg-neut-seco-panel dark:bg-d-neut-ther-panel"
                  : "bg-neut-seco dark:bg-d-neut-ther"
              }`
        } ${
          isFocus && isSubmited && errorMessage
            ? "!border-red-600/25 dark:!border-red-400/50"
            : ""
        }
         flex justify-between items-center content-center gap-2 rounded-xl w-full px-4  border-red-50/[0] border`}
      >
        <div className={isAdminRegister ? "w-[calc(100%-3rem)]" : ""}>
          <input
            id={inputId}
            ref={inputRef}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={setValue}
            value={value && value}
            placeholder={placeholder}
            type={type}
            autoComplete="off"
            className={`${
              type === "tel"
                ? "font-[irsans] font-bold placeholder:font-normal"
                : "font-[dana]"
            } ${isContactInput ? "max-w-80" : "max-w-[13.5rem]"} ${
              isAdminRegister ? "w-full !max-w-none" : "w-[55vw]"
            } text-sm bg-inherit text-right text-d-neut-prim dark:text-neut-seco placeholder:font-[dana] placeholder:text-d-neut-ther/80 dark:placeholder:text-white/45 outline-none border-none py-4`}
          />
          {type === "file" && (
            <label htmlFor={inputId} className="line-clamp-1 text-sm">
              {fileName ? <div className="py-4">{fileName}</div> : <div className="w-full cursor-pointer block py-4 text-d-neut-ther/70 dark:text-white/25">{placeholder}</div>}
            </label>
          )}
        </div>
        <label
          htmlFor={inputId}
          className="cursor-pointer text-d-neut-ther/70 dark:text-white/25"
        >
          {icon}
        </label>
      </div>
      {isSubmited && errorMessage && (
        <div className="mt-1.5 ps-2 text-xs text-red-700 dark:text-red-600">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default FormInput;

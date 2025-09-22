type T_FormTextarea = {
  value?: string;
  setValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errorMessage?: string;
  isSubmited: boolean;
  placeholder: string;
  isAdminRegister?: boolean;
  styles?: string;
};

function FormTextarea({ value, setValue, errorMessage, isSubmited, placeholder, isAdminRegister, styles }: T_FormTextarea) {
  return (
    <div className="">
      <div className="">
        <textarea
          onChange={(e) => setValue(e)}
          value={value}
          placeholder={placeholder}
          className={`
          ${
            isAdminRegister ? "border-d-neut-ther/10 dark:border-white/15 focus:!border-prim focus:dark:!border-prim" : "focus:border-d-neut-ther/15 focus:dark:border-white/25"
          }
          ${
            isSubmited && errorMessage
              ? "!bg-red-700/5 dark:!bg-red-300/15 focus:!border-red-600/25 focus:dark:!border-red-400/50"
              : `${
                  isAdminRegister
                    ? "bg-neut-seco-panel dark:bg-d-neut-ther-panel"
                    : "bg-neut-seco dark:bg-d-neut-ther"
                }`
          } ${styles} min-h-32 max-h-72 text-sm bg-inherit text-right overflow-hidden text-d-neut-prim rounded-xl w-full px-4  border-red-50/[0] border dark:text-neut-seco placeholder:font-[dana] placeholder:text-d-neut-ther/80 dark:placeholder:text-white/45 outline-none max-w-full py-4`}
        ></textarea>
      </div>
      {isSubmited && errorMessage && (
        <div className="mt-1.5 ps-2 text-xs text-red-700 dark:text-red-600">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default FormTextarea;

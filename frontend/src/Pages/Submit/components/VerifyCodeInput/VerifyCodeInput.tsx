import type { T_setString } from "../../../../Types/type";

type T_VerifyCodeInput = { value: string; setValue: T_setString, isSubmited: boolean, ref?:any };

function VerifyCodeInput({ value, setValue, isSubmited, ref }: T_VerifyCodeInput) {
  //
  const inputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    (e.target.value.length < value.length || !value.length) && setValue(e.target.value);
  };

  return (
    <input
      onChange={inputValueHandler}
      value={value}
      ref={ref}
      className={`${(isSubmited && !value) ? "!bg-red-700/10 dark:!bg-red-300/25 focus:border-red-600/50 dark:focus:dark:border-red-500/50" : "bg-neut-seco dark:bg-d-neut-ther focus:border-d-neut-ther/15 dark:focus:dark:border-white/25"} w-full font-[irsans] outline-none font-bold border border-red-50/[0]  p-4 text-center rounded-xl`}
      type="tel"
    />
  );
}

export default VerifyCodeInput;

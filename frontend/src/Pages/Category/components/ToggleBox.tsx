type T_ToggleBox = { title: string; toggle: boolean; setToggle: () => void };

function ToggleBox({ title, toggle, setToggle }: T_ToggleBox) {
  return (
    <div
      onClick={setToggle}
      className="md:p-5 cursor-pointer sm:p-4 p-0 flex items-center content-center mb-6 justify-between bg-neut-prim dark:bg-d-neut-prim rounded-lg"
    >
      <div className="md:text-lg text-base">{title}</div>
      <div
        className={`${
          toggle ? "bg-notf" : "bg-gray-200 dark:bg-d-neut-ther"
        } w-11 p-1 rounded-full relative cursor-pointer`}
      >
        <div
          className={`${
            toggle ? "-translate-x-5" : "translate-x-0"
          } rounded-full size-4 bg-neut-prim dark:bg-d-neut-prim`}
        ></div>
      </div>
    </div>
  );
}

export default ToggleBox;

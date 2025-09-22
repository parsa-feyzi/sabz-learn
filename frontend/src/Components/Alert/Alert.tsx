type T_Alert = {
  message: string;
  alertThem?: "bg-prim" | "bg-error" | "bg-warn" | "bg-notf";
  isPanelAlert?: boolean
};

function Alert({ message, alertThem="bg-prim", isPanelAlert }: T_Alert) {
  return (
    <>
    <div className="fixed z-[80] w-screen h-screen bg-black bg-opacity-30 blur-xl top-0 left-0"></div>
      <div className={`${isPanelAlert ? "bg-neut-prim-panel dark:bg-d-neut-prim-panel" : "bg-neut-prim dark:bg-d-neut-prim"} alert z-[90] shadow-lg fixed overflow-hidden gap-3 top-6 right-4 w-10/12 max-w-80 px-6 pt-4 pb-6 rounded-t-lg rounded-b-sm`}>
        <div className={`h-full absolute top-0 right-0 w-3 ${alertThem}`}></div>
        <div className="">
          <div>{message}</div>
          <div className='w-full h-0.5 absolute left-0 bottom-0'>
              <div className={`alert_timer h-full ${alertThem}`}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Alert;

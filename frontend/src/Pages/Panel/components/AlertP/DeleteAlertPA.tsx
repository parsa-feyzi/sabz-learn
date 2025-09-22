import Button from "../../../../Components/DesignSystem/Button";
import AlertP from "./AlertP";

type T_DeleteAlert = {
  deleteHandler: () => void;
  closeAlerts: () => void;
  name?: string;
  isBan?: boolean;
};

function DeleteAlertPA({ deleteHandler, closeAlerts, name, isBan }: T_DeleteAlert) {
  return (
    <AlertP
      title={
        isBan
          ? `آیا از مسدود کردن ${name} اطمینان دارید؟`
          : `آیا از حذف ${name} اطمینان دارید؟`
      }
    >
      <div className="flex justify-center gap-3 pt-4">
        <Button onClick={closeAlerts} styles="!bg-neutral-500 dark:!bg-neutral-700 !py-1.5 sm:!w-auto sm:!px-10 !w-full">
          خیر
        </Button>
        <Button onClick={deleteHandler} styles="!py-1.5 sm:!w-auto sm:!px-10 !w-full">
          بله
        </Button>
      </div>
    </AlertP>
  );
}

export default DeleteAlertPA;

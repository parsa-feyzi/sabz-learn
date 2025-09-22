import { useDispatch } from "react-redux";
import { login } from "../../../../Redux/slices/authInfosSlice";
import type { T_Notif } from "../../../../Types/type";
import { useCallback, useEffect, useState } from "react";

function NotifModalP({ notifs }: { notifs?: T_Notif[] }) {
  const [toggle, setToggle] = useState(false)

  const dispatch = useDispatch();

  const userDatas = JSON.parse(localStorage.getItem("user") as string);

  const userInfosHandler = async () => {
    try {
      const userInfos = await (
        await fetch("http://localhost:4000/v1/auth/me", {
          headers: {
            Authorization: `Bearer ${userDatas.token}`,
          },
        })
      ).json();
      dispatch(login({ token: userDatas.token, user: userInfos }));
      console.log(userInfos);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const seenNotifHandler = useCallback(async (notifId: string) => {
    try {
      const notifRes = await (
        await fetch(`http://localhost:4000/v1/notifications/see/${notifId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${userDatas.token}`,
          },
        })
      ).json();
      console.log(notifRes);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }, [toggle]);

  useEffect(() => {
    userInfosHandler();
  }, [seenNotifHandler]);

  return (
    <div className="absolute top-10 z-20 left-0 sm:w-72 w-64 bg-neut-prim-panel dark:bg-d-neut-prim-panel text-sm py-2 sm:px-4 px-3 rounded-md">
      {notifs?.length !== 0 &&
        notifs?.map((notif, index) => (
          <div
            className={`${
              index + 1 === notifs?.length
                ? ""
                : "border-b border-neutral-500/30"
            } flex gap-2 justify-between items-end py-3 my-2`}
            key={notif._id}
          >
            <div className="px-2 sm:text-base text-sm max-h-96 overflow-y-auto">
              {notif.msg}
            </div>
            <div
              onClick={() => {
                seenNotifHandler(notif._id);
                setToggle(!toggle)
              }}
              className="text-prim text-[dana-xl] cursor-pointer"
            >
              seen
            </div>
          </div>
        ))}
    </div>
  );
}

export default NotifModalP;

import { useState } from "react";

function useAlertShow() {
  const [alertIsShow, setAlertIsShow] = useState({
    userFullName: "",
    isShow: false,
  });

  const setAlertShow = (userFullName?: string) => {
    if (userFullName) {
      setAlertIsShow({ userFullName: userFullName as string, isShow: true });
    } 
    else {
      setAlertIsShow({ ...alertIsShow, isShow: true });
    }

    setTimeout(() => {
      setAlertIsShow({ userFullName: "", isShow: false });
    }, 5000);
  };

  return [alertIsShow, setAlertShow]
}

export default useAlertShow;

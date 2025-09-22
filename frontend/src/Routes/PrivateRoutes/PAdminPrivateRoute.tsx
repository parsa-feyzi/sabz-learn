import { useSelector } from "react-redux";
import type { I_AuthInfos } from "../../Types/interface";
import type { JSX } from 'react'
import { Navigate } from "react-router";

function PAdminPrivateRoute({ children }: { children: JSX.Element }) {
  const authInfos = useSelector(
    (state: { authInfos: { values: I_AuthInfos } }) => state.authInfos.values
  );

  return <>{authInfos.userInfos?.role === "ADMIN" ? children : <Navigate to={'/login'} />} </>;
}

export default PAdminPrivateRoute;

import { Navigate, useLocation } from "react-router-dom";
import { getLoginPage } from "@/shared/consts/router";
import useStore from "../../StoreProvider/config/useStore";
import { observer } from "mobx-react-lite";

interface RequireAuthProps {
  children: JSX.Element;
}

export const RequireAuth = observer(({ children }: RequireAuthProps) => {
  const { user } = useStore();
  const location = useLocation();

  if (!user.isAuth) {
    return <Navigate to={getLoginPage()} state={{ from: location }} replace />;
  }

  return children;
});

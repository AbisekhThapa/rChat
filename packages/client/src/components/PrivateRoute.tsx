import { Navigate, Outlet } from "react-router-dom";
import { AccountContext, contextType } from "./AccountContext";
import { useContext } from "react";

const useAuth = () => {
  const { user } = useContext(AccountContext);
  if (user?.loggedIn === true) {
    return true;
  } else {
    return false;
  }
};

const PrivateRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;

import Login from "./Login/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./Login/Signup";
import { Spinner, Text } from "@chakra-ui/react";
import PrivateRoutes from "./PrivateRoute";
import { useContext } from "react";
import { AccountContext } from "./AccountContext";
import Home from "./Home";

const Views = () => {
  const { user } = useContext(AccountContext);
  return user?.loggedIn === null ? (
    <Spinner />
  ) : (
    <Routes>
      <Route path={"/"} element={<Login />} />
      <Route path={"/signup"} element={<Signup />} />
      <Route element={<PrivateRoutes />}>
        <Route path={"/home"} element={<Home />} />
      </Route>
      <Route path={"*"} element={<Login />} />
    </Routes>
  );
};

export default Views;

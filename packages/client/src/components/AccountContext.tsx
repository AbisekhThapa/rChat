import { FC, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type userType = {
  loggedIn: boolean | null;
  username: string | null;
};
export type contextType = {
  user: userType | null;
  setUser: ((value: userType) => void) | null;
};
export const AccountContext = createContext<contextType | null>(null);

type AccountProps = {
  children: any;
};

const UserContext: FC<AccountProps> = ({ children }) => {
  const [user, setUser] = useState<userType>({
    loggedIn: null,
    username: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchingUser = async () =>
      await fetch("http://localhost:8000/auth/login", {
        credentials: "include",
      })
        .catch((err) => {
          setUser({ loggedIn: false, username: null });
          return;
        })
        .then((r) => {
          if (!r || !r.ok || r.status >= 400) {
            setUser({ loggedIn: false, username: null });
            return;
          }
          return r.json();
        })
        .then((data) => {
          if (!data) {
            setUser({ loggedIn: false, username: null });
            return;
          }
          console.log(data);
          setUser({ ...data });
          navigate("/home");
        });
    fetchingUser();
  }, []);

  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;

import { createContext, useEffect, useState } from "react";
import { Global } from "../helpers/Global";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  useEffect(() => {
    authUser();
  }, []);
  
  const authUser = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) {
      return false;
    }

    const userObj = JSON.parse(user);
    const userId = userObj._id;

    const request = await fetch(Global.url + "user/profile/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const response = await request.json();
    if (response.status === "success") {
      setAuth(response.user);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

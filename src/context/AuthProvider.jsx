import { createContext, useEffect, useState } from "react";
import { Global } from "../helpers/Global";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [counters, setCounters] = useState({});
  const [publicationsCount, setPublicationsCount] = useState(0);

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

    // Petición para obtener los datos del usuario
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

    // Petición para obtener contadores
    const requestCounters = await fetch(
      Global.url + "user/count-follows/" + userId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    // Verifica si la respuesta es exitosa
    if (requestCounters.ok) {
      const responseCounters = await requestCounters.json();
      setCounters(responseCounters);
    } else {
      // Opcional: muestra un error o maneja el caso
      setCounters({});
      console.error("Error al obtener los contadores:", requestCounters.status);
    }

    // Dentro de authUser (después de obtener el userId)
    const requestPublications = await fetch(
      Global.url + "publication/count/" + userId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (requestPublications.ok) {
      const responsePublications = await requestPublications.json();
      setPublicationsCount(responsePublications.total);
    } else {
      setPublicationsCount(0);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, counters, publicationsCount }}>
      {children}
    </AuthContext.Provider>
  );
};

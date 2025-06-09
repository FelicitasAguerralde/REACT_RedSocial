import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useAuth } from "../../../hooks/useAuth";

export const PrivateLayout = () => {
  const { auth } = useAuth();

  return (
    <>
      <Header />
      <section className="layout__content">
        {auth._id ? <Outlet /> : <Navigate to="/login" />}
      </section>

      <Sidebar />
    </>
  );
};

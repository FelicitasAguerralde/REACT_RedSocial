import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Feed } from "../components/layout/private/Feed";
import { PrivateLayout } from "../components/layout/private/PrivateLayout";
import { PublicLayout } from "../components/layout/public/PublicLayout";
import { Login } from "../components/user/Login";
import { Register } from "../components/user/Register";
import { AuthProvider } from "../context/AuthProvider";

export const Routing = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/social" element={<PrivateLayout />}>
          <Route index element={<Feed />} />
          <Route path="feed" element={<Feed />} />
        </Route>

        <Route
          path="*"
          element={
            <>
              <p>
                <h1>Error 404 - Page not found</h1>
                <Link to="/">Volver al Inicio</Link>
              </p>
            </>
          }
        />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

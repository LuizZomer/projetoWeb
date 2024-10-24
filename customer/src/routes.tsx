import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Menu } from "./screens/Menu";
import { SocketConnectProvider } from "./context/SocketConnect/SocketConnectProvider";
import { Login } from "./screens/Login";

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route path="/menu" element={<SocketConnectProvider />}>
        <Route index element={<Menu />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

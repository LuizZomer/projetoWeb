import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Menu } from "./screens/Menu";
import { SocketConnectProvider } from "./context/SocketConnect/SocketConnectProvider";
import { Login } from "./screens/Login";
import { RequireAuth } from "./context/Auth/RequiredAuth";
import { CustomerArea } from "./screens/CustomerArea";
import { Home } from "./screens/Home";

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />

      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="/menu" element={<SocketConnectProvider />}>
        <Route index element={<Menu />} />
      </Route>

      <Route path="/" element={<RequireAuth />}>
        <Route path="customer-area" element={<CustomerArea />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

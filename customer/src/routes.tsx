import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Menu } from "./screens/Menu";

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/menu" />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
  </BrowserRouter>
);

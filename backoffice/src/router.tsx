import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./screens/Login";
import { RequireAuth } from "./context/Auth/RequiredAuth";
import { Sidebar } from "./components/Sidebar";
import { UserList } from "./screens/User/List";
import { MenuList } from "./screens/Menu/List";
import { CustomerList } from "./screens/Customer/List";

export const AppRouter = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/user" />} />

        <Route
          path="/"
          element={
            <RequireAuth>
              <Sidebar />
            </RequireAuth>
          }
        >
          <Route path="user">
            <Route index element={<UserList />} />
          </Route>

          <Route path="menu">
            <Route index element={<MenuList />} />
          </Route>

          <Route path="customer">
            <Route index element={<CustomerList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);

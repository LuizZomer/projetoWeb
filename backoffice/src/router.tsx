import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./screens/Login";
import { RequireAuth } from "./context/Auth/RequiredAuth";
import { Sidebar } from "./components/Sidebar";
import { UserList } from "./screens/User/List";

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

          {/* <Route path="customer">
            <Route index element={<Customer />} />
          </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);

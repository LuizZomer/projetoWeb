import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";
import { IUser } from "./types";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  const signIn = async (token: string | null) => {
    if (!token) return;
    const decoded = jwtDecode(token) as IUser;
    localStorage.setItem("authToken", token);

    setUser(decoded);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

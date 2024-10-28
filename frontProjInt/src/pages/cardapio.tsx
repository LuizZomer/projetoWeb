import { useAuth } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';
import ContentCardapio from "./contentCardapio";

export default function Cardapio() {
  const { token } = useAuth();
  return token ? <ContentCardapio /> : <Navigate to="/login" />;
}

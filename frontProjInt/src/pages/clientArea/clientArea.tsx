import { useAuth } from "../../context/AuthContext";
import { Navigate } from 'react-router-dom';
import ContentArea from "./contentArea";

export default function ClientArea() {
  const { token } = useAuth();
  return token ? <ContentArea /> : <Navigate to="/login" />;
}

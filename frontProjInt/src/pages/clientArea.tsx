import { useAuth } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';
import { Text } from "@chakra-ui/react";

export default function ClientArea() {
  const { token } = useAuth();
  return token ? <Text>Area do Cliente</Text> : <Navigate to="/login" />;
};
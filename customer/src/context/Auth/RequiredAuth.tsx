import { useContext, useEffect } from "react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";

// CONTEXTS
import { AuthContext } from "./AuthContext";

// COMPONENTS

// TYPES
import { Spinner } from "@chakra-ui/react";
import { useValidationToken } from "../../hooks/useValidateToken";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`;

export const RequireAuth = () => {
  const { signIn, signOut } = useContext(AuthContext);
  const { isValid, loading } = useValidationToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isValid) {
      signOut();
      navigate("/login");
    }
    if (!loading && isValid) {
      const token = localStorage.getItem("authToken");
      signIn(token);
    }
  }, [loading]);

  return loading ? (
    <Container>
      <Spinner label="Verificando credenciais" />
    </Container>
  ) : (
    <Outlet />
  );
};

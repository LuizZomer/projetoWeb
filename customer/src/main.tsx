import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRoutes } from "./routes";
import { ThemeProvider } from "styled-components";
import { themes } from "./styles/theme";
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <ThemeProvider theme={themes}>
        <AppRoutes />
      </ThemeProvider>
    </ChakraProvider>
  </StrictMode>
);

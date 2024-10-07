import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./router";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/Auth/AuthProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { GlobalStyle } from "./styles/Globals";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <ToastContainer
          position="bottom-left"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <AppRouter />
        <GlobalStyle />
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>
);

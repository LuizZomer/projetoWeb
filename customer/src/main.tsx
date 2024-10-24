import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRoutes } from "./routes";
import { ThemeProvider } from "styled-components";
import { themes } from "./styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { OrderListProvider } from "./context/OrderList/OrderListProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/Auth/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
    <OrderListProvider>
      <ChakraProvider>
        <ThemeProvider theme={themes}>
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
          <AppRoutes />
        </ThemeProvider>
      </ChakraProvider>
    </OrderListProvider>
    </AuthProvider>
  </StrictMode>
);

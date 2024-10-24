import { useContext } from "react";
import { SocketConnectContext } from "./SocketConnectContext";

export const useSocketConnect = () => {
  const socketConnect = useContext(SocketConnectContext);

  return socketConnect;
};

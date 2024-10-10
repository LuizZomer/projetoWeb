import { useContext } from "react";
import { SocketConnectContext } from "./SocketConnectContext";

export const useSocketConnectContext = () => {
  const socketConnectContext = useContext(SocketConnectContext);

  return socketConnectContext;
};

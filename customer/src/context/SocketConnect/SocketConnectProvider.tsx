import { useEffect, useRef } from "react";
import { SocketConnectContext } from "./SocketConnectContext";
import { Outlet } from "react-router-dom";
import { io, Socket } from "socket.io-client";

export interface IOrderSocket {
  customerName: string;
  OrderItems: {
    menuId: string;
    quantity: number;
  }[];
}

export const SocketConnectProvider = () => {
  const socketRef = useRef<Socket>();

  const newOrder = (order: IOrderSocket) => {
    return new Promise<void>((resolve, reject) => {
      socketRef.current?.emit("newOrder", order);

      socketRef.current?.on(
        "newOrderResponse",
        (response: { success: boolean; message: string }) => {
          if (response.success) {
            resolve();
          } else {
            reject(new Error(response.message));
          }
        }
      );
    });
  };

  useEffect(() => {
    socketRef.current = io("http://localhost:3000/order");

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <SocketConnectContext.Provider value={{ newOrder }}>
      <Outlet />
    </SocketConnectContext.Provider>
  );
};

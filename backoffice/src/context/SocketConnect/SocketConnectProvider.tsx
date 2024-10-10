import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SocketConnectContext } from "./SocketConnectContext";
import { IOrdemParam, IOrderList } from "./types";

export const SocketConnectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [orderList, setOrderList] = useState<IOrderList[]>([]);
  const [orderParam, setOrderParam] = useState<IOrdemParam>({
    revenue: "false",
    sequence: "desc",
  });
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000/order", {
      query: orderParam,
    });

    socketRef.current.emit("newOrderList");

    socketRef.current.on("newOrderList", (newOrderList: IOrderList[]) => {
      setOrderList(newOrderList);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [orderParam]);

  return (
    <SocketConnectContext.Provider value={{ orderList, setOrderParam }}>
      {children}
    </SocketConnectContext.Provider>
  );
};

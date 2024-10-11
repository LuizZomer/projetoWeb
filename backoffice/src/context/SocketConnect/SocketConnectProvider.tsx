import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SocketConnectContext } from "./SocketConnectContext";
import { IOrdemParam, IOrderList } from "./types";
import { api } from "../../services/api";

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

  const reqOrderList = async () => {
    await api
      .get(
        `/order?sequence=${orderParam.sequence}&revenue=${orderParam.revenue}`
      )
      .then(({ data }) => {
        setOrderList(data);
      });
  };

  useEffect(() => {
    socketRef.current = io("http://localhost:3000/order");

    reqOrderList();

    socketRef.current.on("newOrderList", () => {
      reqOrderList();
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [orderParam]);

  return (
    <SocketConnectContext.Provider
      value={{ orderList, setOrderParam, reqOrderList, orderParam }}
    >
      {children}
    </SocketConnectContext.Provider>
  );
};

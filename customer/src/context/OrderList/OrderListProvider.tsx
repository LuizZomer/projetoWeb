import { useState } from "react";
import { IOrderList } from "./types";
import { OrderListContext } from "./OrderListContext";

export const OrderListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [orderList, setOrderList] = useState<IOrderList[]>([]);
  const [customerName, setCustomerName] = useState("");

  return (
    <OrderListContext.Provider
      value={{ orderList, setOrderList, setCustomerName, customerName }}
    >
      {children}
    </OrderListContext.Provider>
  );
};

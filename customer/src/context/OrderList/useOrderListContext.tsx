import { useContext } from "react";
import { OrderListContext } from "./OrderListContext";

export const useOrderListContext = () => {
  const orderListContext = useContext(OrderListContext);

  return orderListContext;
};

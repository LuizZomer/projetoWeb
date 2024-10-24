import { createContext } from "react";
import { IOrderListContext } from "./types";

export const OrderListContext = createContext<IOrderListContext>(null!);

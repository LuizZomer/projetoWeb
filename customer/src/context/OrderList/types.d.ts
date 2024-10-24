import { IMenu } from "../../utils/types";

export interface IOrderList extends IMenu {
  quantity: number;
}

export interface IOrderListContext {
  orderList: IOrderList[];
  setOrderList: React.Dispatch<React.SetStateAction<IOrderList[]>>;
  customerName: string;
  setCustomerName: React.Dispatch<React.SetStateAction<string>>;
}

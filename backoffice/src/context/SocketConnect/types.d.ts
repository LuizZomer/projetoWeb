export interface IOrderList {
  id: string;
  customerId: string | null;
  customerName: string | null;
  createdAt: string;
  Revenue: {
    id: string;
    status: boolean;
    value: number;
  };
  OrderItems: {
    id: string;
    orderId: string;
    menuId: string;
    quantity: number;
    Menu: {
      id: string;
      name: string;
      description: string;
      value: number;
      type: string;
      size: string;
    };
  }[];
}

export interface IOrdemParam {
  revenue: "true" | "false";
  sequence: "asc" | "desc";
}

export interface ISocketConnect {
  orderList: IOrderList[];
  orderParam: IOrdemParam;
  setOrderParam: React.Dispatch<React.SetStateAction<IOrdemParam>>;
  reqOrderList: () => void;
}

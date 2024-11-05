export interface IMenu {
  description: string;
  id: string;
  name: string;
  size: string;
  type: string;
  value: number;
}

interface IRevenue {
  date: string;
  value: number;
  status: boolean;
}

interface IOrderItem {
  id: string;
  orderId: string;
  menuId: string;
  quantity: number;
  Menu: IMenu;
}

export interface IOrder {
  id: string;
  Revenue: IRevenue;
  OrderItems: IOrderItem[];
}

interface IOrderLog {
  Order: IOrder;
}

interface ICustomer {
  loyalty_points: number;
  idnr: string;
  fullName: string;
  email: string;
  id: string;
  OrderLog: IOrderLog[];
}

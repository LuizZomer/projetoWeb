import { IOrderSocket } from "./SocketConnectProvider";

export interface ISocketConnect {
  newOrder: (order: IOrderSocket) => Promise<void>;
}

import { createContext } from "react";
import { ISocketConnect } from "./types";

export const SocketConnectContext = createContext<ISocketConnect>(null!);

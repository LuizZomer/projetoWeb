import { JwtPayload } from "jwt-decode";

interface IUser extends JwtPayload {
  name: string;
  email: string;
}

export interface IAuthContext {
  user: IUser | null;
  signIn: (token: string | null) => void;
  signOut: () => void;
}

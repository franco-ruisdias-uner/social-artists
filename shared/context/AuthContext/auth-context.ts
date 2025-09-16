import {Context, createContext} from "react";

const AuthContext: Context<any> = createContext({
  state: {},
  dispatch: () => {
  }
});

export default AuthContext;
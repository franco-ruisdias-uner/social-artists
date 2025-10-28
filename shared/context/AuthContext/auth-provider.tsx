import AuthContext from "./auth-context";
import {useReducer} from "react";
import {IUser} from "@shared/models";
import {AUTH_ACTIONS} from "@shared/context/AuthContext/enums";
import {deleteItem, setTokens, setUser, STORAGE_KEYS} from "@utils/secure-store";

interface Action {
  type: AUTH_ACTIONS
  payload?: any
}

interface State {
  isLoading: boolean
  token: string | null
  user: IUser | null
  refreshToken: string | null
}

const initialState = {
  isLoading: false,
  token: null,
  user: null,
  refreshToken: null,
}

const AuthProvider = (props: any) => {

  const [state, dispatch] = useReducer((prevState: State, action: Action) => {
    const {payload} = action
    switch (action.type) {
      case AUTH_ACTIONS.LOGIN:
        setUser(payload.user);
        setTokens({jwtToken: payload.token, jwtRefreshToken: payload.refreshToken});
        return {
          ...prevState,
          user: payload.user,
          token: payload.token,
          refreshToken: payload.refreshToken,
        }
      case AUTH_ACTIONS.LOGOUT:
        deleteItem(STORAGE_KEYS.USER);
        deleteItem(STORAGE_KEYS.TOKENS);
        return initialState
      default:
        return prevState
    }

  }, initialState)

  return (
      <AuthContext.Provider value={{state, dispatch}}>
        {props.children}
      </AuthContext.Provider>
  )
}

export default AuthProvider
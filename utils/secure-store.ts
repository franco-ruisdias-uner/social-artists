import * as SecureStore from "expo-secure-store";
import {IUser} from "@shared/models";
import {SecureStoreToken} from "@shared/interfaces";

const STORAGE_NAME = "SOCIAL_ARTISTS_"

export enum STORAGE_KEYS {
  TOKENS = 'tokens',
  USER = 'user',
  DEVICE_ID = 'deviceId'
}

const _setItem = (key: any, value: any, options?: any) =>
    SecureStore.setItemAsync(`${STORAGE_NAME}${key}`, value, options);
const _getItem = (key: string) => SecureStore.getItemAsync(`${STORAGE_NAME}${key}`);
const _deleteItem = (key: string) => SecureStore.deleteItemAsync(`${STORAGE_NAME}${key}`);


const setUser = (user: IUser) => _setItem(STORAGE_KEYS.USER, JSON.stringify(user));

const getUser = async () => {
  const user = await _getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
}

const deleteItem = (key: STORAGE_KEYS) => _deleteItem(key);

const setTokens = (tokens: SecureStoreToken) => _setItem(STORAGE_KEYS.TOKENS, JSON.stringify(tokens));


const getTokens = async (): Promise<SecureStoreToken | undefined> => {
  const tokens = await _getItem(STORAGE_KEYS.TOKENS);
  return tokens ? JSON.parse(tokens) : undefined;
}

export {setUser, getUser, deleteItem, setTokens, getTokens}
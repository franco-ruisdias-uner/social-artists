import * as SecureStore from "expo-secure-store";
import {IUser} from "@shared/models";

const STORAGE_NAME = "SOCIAL_ARTISTS_"

export const STORAGE_KEYS = {
  JWT_TOKEN: 'jwtToken',
  USER: 'user',
  JWT_REFRESH_TOKEN: 'jwtRefreshToken',
  DEVICE_ID: 'deviceId'
};

const _setItem = (key: any, value: any, options?: any) =>
    SecureStore.setItemAsync(`${STORAGE_NAME}${key}`, value, options);
const _getItem = (key: string) => SecureStore.getItemAsync(`${STORAGE_NAME}${key}`);
const _deleteItem = (key: string) => SecureStore.deleteItemAsync(`${STORAGE_NAME}${key}`);


const setUser = (user: IUser) => _setItem(STORAGE_KEYS.USER, JSON.stringify(user));

const getUser = async () => {
  const user = await _getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
}

const deleteUser = () => _deleteItem(STORAGE_KEYS.USER);

export {setUser, getUser, deleteUser}
import axios, {AxiosHeaders} from "axios";
import {getTokens, setTokens, setUser} from "@utils/secure-store";
import {LoginResponse} from "@shared/interfaces";

const PUBLIC_ROUTES = ['auth/login', 'auth/register'];


const axiosClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': "application/json"
  }
})


axiosClient.interceptors.request.use(async (config) => {
  // console.log(config)
  if (PUBLIC_ROUTES.includes(config.url as string)) {
    return config
  }
  const tokens = await getTokens()

  if (!tokens) {
    return config;
  }
  config.headers = AxiosHeaders.from({
    ...config.headers,
    'Authorization': `Bearer ${tokens.jwtToken}`
  })

  return config
})

axiosClient.interceptors.response.use(function onFulfilled(response) {
  //Va a atrapar todos las respuestas 2xx
  return response;
}, async function onRejected(error) {
  //Atrapa todas las funciones por fuera  del 2xx

  const requestOriginal = error.config;

  if (!error.response?.data) {
    return Promise.reject(error);
  }

  const {data} = error.response;
  if (!data.statusCode || data.statusCode !== 401) {
    return Promise.reject(error);
  }

  const tokens = await getTokens()
  if (!tokens?.jwtRefreshToken) {
    return Promise.reject(error);
  }

  const response = await axiosClient.post<LoginResponse>('/auth/refresh-token', {refreshToken: tokens.jwtRefreshToken})
  if (!response.data) {
    return Promise.reject(error);
  }

  const {data: jwtData} = response
  await setTokens({
    jwtToken: jwtData.access_token,
    jwtRefreshToken: jwtData.refresh_token,
  })

  await setUser(jwtData.user)
  requestOriginal.headers.Authorization = `Bearer ${jwtData.access_token}`
  return axiosClient(requestOriginal);

})


export default axiosClient;
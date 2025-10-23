import axios, {AxiosHeaders} from "axios";

const PUBLIC_ROUTES = ['auth/login', 'auth/register'];


const axiosClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': "application/json"
  }
})


axiosClient.interceptors.request.use((config) => {
  console.log(config)
  if (PUBLIC_ROUTES.includes(config.url as string)) {
    return config
  }

  config.headers = AxiosHeaders.from({
    ...config.headers,
    'Authorization':'Bearer asdqweazsxczxc'
  })

  return config
})


export default axiosClient;
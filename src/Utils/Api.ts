import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { IsMock } from './IsMock';

const Api = axios.create({
  baseURL: IsMock ? '' : 'https://aimclient.herokuapp.com/'
});
/*
Api.interceptors.request.use((config) => {

  if (cookieAccess) {
    config.headers.Authorization = `bearer ${JSON.parse(cookieAccess)}`;
  }
  return config;
});
*/
Api.interceptors.response.use(
  (response) => {
    //console.log(new Date() + "Response", response.data)
    return response},
  (error) => {
    console.log(new Date() + "Status Code Error", error.response)
    if (error.response.status === 403) {
      AsyncStorage.clear();
    }
    return error
  }
);

export default Api;

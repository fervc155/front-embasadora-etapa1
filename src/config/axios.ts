import axios from 'axios';
import Token from '@/config/token';
import errorAxios from './axios/error';
const clienteAxios = axios.create({
    baseURL :  process.env.VUE_APP_BACK_URL
});

const authAxios= axios.create({
    baseURL : process.env.VUE_APP_BACK_URL
});

const downloadAxios= axios.create({
    baseURL : process.env.VUE_APP_BACK_URL
});
authAxios.defaults.headers.common['Authorization'] ='Bearer '+ Token.get() ;
downloadAxios.defaults.headers.common['Authorization'] ='Bearer '+ Token.get() ;
downloadAxios.defaults.responseType= 'blob';

const Open = (route:any)=>{
    window.open( process.env.VUE_APP_BACK_URL+route+'/'+Token.get());
}
export {
    authAxios,
    clienteAxios,
    downloadAxios,
    Open,
    errorAxios
 
};
export default clienteAxios;
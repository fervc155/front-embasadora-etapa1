import axios from 'axios';
import Token from '@/config/token';

const clienteAxios = axios.create({
    baseURL :  process.env.VUE_APP_BACK_URL
});

const authAxios= axios.create({
    baseURL : process.env.VUE_APP_BACK_URL
});
authAxios.defaults.headers.common['Authorization'] ='Bearer '+ Token.get() ;

const Open = (route:any)=>{
    window.open( process.env.VUE_APP_BACK_URL+route+'/'+Token.get());
}
export {
    authAxios,
    Open
};
export default clienteAxios;
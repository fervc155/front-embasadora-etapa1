import {authAxios} from '@/config/axios';

class Clients{
	get(){
		return authAxios.get('/clients');
	}
 
}

export default (new Clients());
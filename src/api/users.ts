import {authAxios} from '@/config/axios';

class Users{
	save(data:any){
		return authAxios.post('/users',data);
	}
	clousers(){
		return authAxios.get('/users/role/clouser')
	}
}

export default (new Users());
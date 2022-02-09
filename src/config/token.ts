import jwt_decode from "jwt-decode";
import { useStore } from 'vuex'
const $store = useStore();

class Token {


	public get(){
		return localStorage.getItem('token') || false
	}

	public json():any{
		return jwt_decode(localStorage.getItem('token')||'') || false;
	}
	public decode(token:string):any{
		return jwt_decode(token) || false;
	}

	public set(token:string){
		return localStorage.setItem('token', token);
	}

	public check(){
		let token = this.get();

		if(!token)
			return false;

		let response = this.decode(token);

		if(!response){
			this.destroy();
			return false;
		}




	    if (response.exp <= (new Date().getTime() ) / 1000) 
	    {
			this.destroy();
	    	return false;
	    }	

	    return response;

	}

	public destroy(){
		return localStorage.removeItem('token')
	}


}

export default  (new Token) ;
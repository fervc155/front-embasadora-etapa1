import jwt from "jsonwebtoken";

class Token {
   
   	public key:any = process.env.VUE_APP_JWT_TOKEN;

	get(){
		return localStorage.getItem('token') || false
	}

	json(){
		return this.decode(localStorage.getItem('token')||'') || false;
	}
	decode(token:any){
		try{
		   return (jwt.verify(token,this.key) as any) || false;
		}
		catch(e){
			console.log(e);
			return false;
		}
	}

	set(token:any){
		return localStorage.setItem('token', token);
	}

	check(){
		let token = this.get();

		if(!token)
			return false;

		let response = this.decode(token);
		console.log('decode',response);

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

	destroy(){
		return localStorage.removeItem('token')
	}


}

export default  (new Token()) ;
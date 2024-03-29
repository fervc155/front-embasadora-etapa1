import Token from '@/config/token';

let capabilities:any={
	answers:{
		create:['hostess','senior'],
		edit  :['senior','hostess'],
		delete:['hostess','senior'],
	},
	clients:{
		create:['hostess','clouser','senior'],
		edit  :['senior'],
		delete:['senior'],
	},
	quotes:{
		create:['hostess,','clouser','senior'],
		delete:['senior'],
	},
	users:{
		create:['hostess','clouser','senior'],
		edit  :['hostess','clouser','senior'],
		delete:['senior'],
	},
	appointments:{
		create:['hostess','clouser','senior'],
		edit  :['hostess','clouser','senior'],
		delete:['senior','clouser','hostess'],
	},

}

export function CanI(capability:string,response:any=true){
	let user = Token.json().user;
	let [section,can]= capability.split('.');

	if(capabilities[section][can].includes(user.role))
		return response;

	return false;

}

export const I= Token.json().user;

export function AmI(role:string){
	return Token.json().user.role==role;
}

 
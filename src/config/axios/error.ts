import Token from '../token';
class Error {

	catch=(vue:any,error:any) => {

		if(vue.loading!=undefined)
			vue.loading=false;

		if(error.response==undefined){
			console.error(error);
			return;
		}

		error = error.response; 
		console.error(error);

		switch(error.status){
			case 422:
				error = error.data;
				for(let fieldError in error.errors){
				    error.errors[fieldError].map((errorMessage:any)=>{
				        vue.$vaToast.init({
				        message: errorMessage,
				        iconClass: 'fas fa-times',
					    position: 'top-right',
					    duration: 5000,
					    color:'danger',                     
				      })
				    })     
			    }
    			break;
    		case 400:
    		case 401:
    		case 402:
    		case 403:
    			vue.$vaToast.init({
				   message:error.data.msg,
				    iconClass: 'fas fa-times',
				    position: 'top-right',
				    duration: 2500,
				    fullWidth: true,
				    color:'danger',
				  });
    			break;
    		case 404:
    			vue.$vaToast.init({
				   message:'El recurso solicitado no existe',
				    iconClass: 'fas fa-times',
				    position: 'top-right',
				    duration: 2500,
				    fullWidth: true,
				    color:'danger',
				  });
    			break;
    		case 419:
    			vue.$vaToast.init({
				   message:'La sesion ha expirado',
				    iconClass: 'fas fa-times',
				    position: 'top-right',
				    duration: 2500,
				    fullWidth: true,
				    color:'danger',
				  });
    			Token.destroy();
				window.location.reload();
    			break;
			case 500:
			default:    			
			    vue.$vaToast.init({
				   message:'Hubo un error de servidor, contacta con administracion',
				    iconClass: 'fas fa-times',
				    position: 'top-right',
				    duration: 2500,
				    fullWidth: true,
				    color:'danger',
				  });
    			break;
		}
		throw error;

	}
}

export default (new Error());
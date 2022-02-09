const print_error_validate=(error:any,self:any)=>{
  let errors = (error.response.data.errors);
  for(let fieldError in errors){
    errors[fieldError].map((errorMessage:any)=>{
      self.$vaToast.init({
        message: errorMessage,
        iconClass: 'fas fa-times',
	    position: 'top-right',
	    duration: 5000,
	    color:'danger',                     
      })
    })     
  }
}

const error_500=(self:any,message:any = 'No se puede procesar tu peticion')=>{
  self.$vaToast.init({
    message,
    iconClass: 'fas fa-times',
    position: 'top-right',
    duration: 2500,
    fullWidth: true,
    color:'danger',
    });
}


const for_select=(items:any,fields:any={})=>{
  return items.map((item:any)=>{
    return {
      id:item.id,
      text:item.name,
      value:item, 
      ...fields
    }
  });
}

export {
	print_error_validate,
  error_500,

  for_select,

}
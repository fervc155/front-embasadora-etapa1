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
  for_select,

}
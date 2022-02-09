import moment from 'moment';

const answers_map=(answers:any)=>{
   return answers.map((res:any)=>{
      let respuestas =JSON.parse(res.answers);
      let nombreEntrevistado = respuestas.group_information.content.name.answer || '-';
      return{
        ID:res.id,
        Fecha:moment(res.created_at).format('D-MM-Y'),
        Estatus:res.status,
        Cliente: res.client==null? nombreEntrevistado : res.client.name,
        Entrevistador:res.interviewer==null ? 'Sin asignar': res.interviewer.name,
        Atiende:res.attend==null ? 'Sin asignar' : res.attend.name,
        Opciones:res.id
      }
    });
}


export {
	answers_map,
  

}
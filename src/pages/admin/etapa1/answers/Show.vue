<template>
  <div class="mb-3">
    <va-chip to="/admin/cuestionarios">Volver</va-chip>
  </div>

  <va-card v-if="answer.status=='En observacion'">
    <va-card-title>Selecciona una opcion</va-card-title>
    <va-card-content>
       <va-chip v-if="answer" @click="esPotencial()"> Es cliente potencial</va-chip> 
       <va-chip v-if="answer" @click="esCurioso()"> Es cliente curioso</va-chip>
    </va-card-content>
  </va-card>
  <va-card v-if="answer.status=='Cliente potencial' && answer.attend_by==null">
    <va-card-title></va-card-title>
    <va-card-content>
       <va-chip v-if="answer" @click="continuar()">Atender</va-chip> 
     </va-card-content>
  </va-card>

   <card-information v-if="answer.client!=null" :client="answer.client" />


 <va-card>
    <va-card-title v-if="answer">{{answer.poll.name}} v{{answer.poll.version}}</va-card-title>
   <va-card-content>

   

      <poll-builder :show="true" :edit="false" :questions="answer.answers"></poll-builder>
    
   </va-card-content>
 </va-card>
</template>

<script>

import {authAxios} from '@/config/axios';
 import PollBuilder from '@/components/poll-builder/PollBuilder.vue';
 import CardInformation from '@/pages/admin/etapa1/clients/CardInformation.vue';
import Create from '@/pages/admin/etapa1/clients/Create.vue';
import {print_error_validate,error_500} from '@/helpers';
import Swal from 'sweetalert2';

    
export default {
  name: 'show',

  components:{
    PollBuilder,
    CardInformation
  },
 
  data () {
    return {
      answer:false
    }
  },
    mounted () {
    authAxios.get('/answers/'+this.$route.params.id).then((res)=>{
      res = res.data.data;
      res.answers = JSON.parse(res.answers);
      this.answer=res;
    }).catch(error=>{
      console.error(error);
    })
 
  },
  methods: {
    esPotencial(){
      this.$router.push({
        name: "es-potencial", //use name for router push
      });
    },


    continuar(){
        authAxios.post('/answers/'+this.answer.id+"/attend").then((res)=>{
              return this.$router.push({ name: 'cuestionarios'})
        
            }).catch((error)=>{
              if(error.response.status==422){
                print_error_validate(error,this);
                return;
              }
              error_500(this);
            })
    },

    esCurioso(){
       Swal.fire({
          title: 'Seleccionar como curioso',
          showDenyButton: true,
          confirmButtonText: 'Aceptar',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
         
            let params ={
              poll_status:"Cliente curioso"
            }
            authAxios.put('/answers/'+this.answer.id+"/status",params).then((res)=>{
              return this.$router.push({ name: 'crear-cotizacion', params:{answer_id:this.answer.id
              } })
        
            }).catch((error)=>{
              if(error.response.status==422){
                print_error_validate(error,this);
                return;
              }
              error_500(this);
            })
          }
        })  
    }

   

  }
}
	
</script>

<style>
	
</style>
<template>
    <div class="mb-3">
    <va-chip :to="'/admin/cuestionarios/'+answer.id">Volver</va-chip>
  </div>

  <va-card>
    <va-card-title>Cliente potencial</va-card-title>
    <va-card-content>
      <h2>Selecciona un cliente</h2>
      <div class="row">
        
      <va-select class="flex md6" 
      label="Selecciona un cliente" v-model="client"  :options="clients" />
     <div class="flex md6">
       <va-button @click="showModal = !showModal">
      Crear cliente
    </va-button>
        <va-modal
          v-model="showModal"
          hide-default-actions
          overlay-opacity="0.2"
        >

          <slot>
            <create @new-user="addNewUser($event)" :answer="answer" />
          </slot>


        </va-modal>
     </div>
      </div>


      <h2>Selecciona un Clouser</h2>
      <div class="row">
        
      <SelectClouser class="flex md6" @clouser="clouser=$event"/>
      </div>

      <va-button @click="submit()">Guardar</va-button>
 
    </va-card-content>
  </va-card>
 
</template>

<script>

import {authAxios,errorAxios} from '@/config/axios';
import {for_select} from '@/helpers';
import Create from '@/pages/admin/etapa1/clients/Create.vue';
import SelectClouser from '@/pages/admin/users/SelectClouser';
export default {
  name: 'potential',
  components:{Create,SelectClouser}, 
  data () {
    return {
      clients:[],
      clousers:[{
        id:null,
        text:'No asignar',
        value:false
      }],
      client:{id:-1},
      clouser:{},
      showModal:false,
      answer:{},
     
    }
  },
mounted () {

    authAxios.get('/answers/'+this.$route.params.id).then((res)=>{
      res = res.data.data;
      res.answers = JSON.parse(res.answers);
      this.answer=res;
    }).catch(error=>{errorAxios.catch(this,error)})

  authAxios.get('/clients').then((res)=>{
    this.clients= for_select(res.data.data);
    
    }).catch(error=>{errorAxios.catch(this,error)})

 
 
  }, 
  methods: {
    submit(){
      let params = {
        poll_status:"Cliente potencial",
        attend_by:this.clouser.id,
        client_id:this.client.id,
      }

      authAxios.put('/answers/'+this.answer.id+"/status",params).then((res)=>{
        return this.$router.push({ name: 'crear-cita', params:{client_id:this.client.id} })
      }).catch(error=>{errorAxios.catch(this,error)})


    },
    addNewUser(data){
      let newUser ={
        id:data.id,
        text:data.name,
        value:data
      }
      this.clients=[
       newUser,
       ...this.clients        
      ];
      this.client= newUser;
      this.showModal=false;
    }

   

  }
}
	
</script>

<style>
	
</style>
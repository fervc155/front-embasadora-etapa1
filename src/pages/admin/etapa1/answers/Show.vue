<template>
  <div class="mb-3" v-if="!id">
    <va-chip to="/admin/cuestionarios">Volver</va-chip>
  </div>

  <tabs @active="active=$event" :tabs="tabs" />



  <div class="row"  v-if=" active==tabs[2] && answer.status=='En observacion'">

    <div class="flex  md6" @click="esCurioso()">
      <va-card class="card-like curioso" >
        <va-card-content>
          <va-icon name="fa fa-thumbs-o-down va-icon fa fa-thumbs-o-down"/>
          Es cliente curioso
        </va-card-content>
      </va-card>
    </div>
    <div class="flex    md6" @click="esPotencial()">
      <va-card class="card-like potencial" >

        <va-card-content class="color-white">
          <va-icon name="fa fa-thumbs-o-up va-icon fa fa-thumbs-o-up"/> Es cliente potencial
        </va-card-content>
      </va-card>
    </div>
  </div>

  <va-card v-if="active==tabs[2] && answer.status=='Cliente potencial' " class="flex md3 card-like potencial mt-3">
      <va-card-content  @click="appointment()" class="color-white">
     <va-icon name="fa fa-check va-icon fa fa-check"/> Agendar cita
   </va-card-content>
 </va-card>

 <card-client  v-if="active==tabs[1] && answer.client!=null" :client="answer.client" />

 <va-card v-if="active==tabs[0]">
  <va-card-title v-if="answer">{{answer.poll.name}} v{{answer.poll.version}}</va-card-title>
  <va-card-content>
    <h3>STATUS: {{answer.status}}</h3>



    <poll-builder :show="true" :edit="false" :questions="answer.answers"></poll-builder>
    
  </va-card-content>
</va-card>
</template>

<script>

  import {authAxios,errorAxios} from '@/config/axios';
  import PollBuilder from '@/components/poll-builder/PollBuilder.vue';
  import CardClient from '@/pages/admin/etapa1/clients/CardClient.vue';
  import Create from '@/pages/admin/etapa1/clients/Create.vue';
  import Swal from 'sweetalert2';
  import Tabs from '@/components/Tabs.vue';
  import {AmI} from  '@/config/capabilities'

  export default {
    name: 'show',

    components:{
      PollBuilder,
      CardClient,
      Tabs
    },

    data () {
      return {
        AmI,
        tabs:['Respuestas','Cliente','Opciones'],
        active:'Respuestas',
        answer:false,
        tabs:['Respuestas','Cliente','Opciones'],
        active:'Respuestas',

      }
    },
    mounted () {
      authAxios.get('/answers/'+this.$route.params.id).then((res)=>{
        res = res.data.data;
        res.answers = JSON.parse(res.answers);
        this.answer=res;
      }).catch(error=>{errorAxios.catch(this,error)})

    },
    methods: {

      appointment(){
        this.$router.push({name:'crear-cita',params:{client_id:this.answer.client_id}})
      },
      esPotencial(){
        this.$router.push({
        name: "es-potencial", //use name for router push
      });
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

          }).catch(error=>{errorAxios.catch(this,error)})
        }
      })  
    }



  }
}

</script>

<style>
  .card-like .va-card__content
  {
    text-align: center;
    cursor: pointer;
    font-size: 20px;
    transition: all 0.3s ease;
  }

  .curioso  .va-card__content{
    background: var(--va-warning);
  }
  .potencial .va-card__content{
    background: var(--va-info);
  }
  .card-like  .va-card__content:hover{  
    transform: scale(1.05);
  }


</style>
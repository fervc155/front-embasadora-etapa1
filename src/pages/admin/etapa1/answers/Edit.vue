<template>
  <div class="mb-3">
    <va-chip to="/admin/cuestionarios">Volver</va-chip>
  </div>

  <va-card>
   <va-card-title>Editar cuestionario</va-card-title>
    <va-card-content>

    <va-button size="medium" v-if="answer" v-on:click="submit()" class="mr-4 mb-4">Guardar respuestas</va-button>

    <poll-builder :show="false" :edit="true" :id="answer.id" v-bind:questions="answer.answers" />

    <va-button size="medium" v-if="answer" v-on:click="submit()" class="mr-4 mt-4">Guardar respuestas</va-button>
    </va-card-content>
  </va-card>
</template>

<script>

import {authAxios} from '@/config/axios';
import PollBuilder from '@/components/poll-builder/PollBuilder.vue';
import Swal from 'sweetalert2';


export default {
  name: 'Edit',

  components: {
    PollBuilder
  },
  data () {
    return {
      answer:false,

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

    submit(){

        Swal.fire({
          title: 'Guardar cuestionario',
          text:'Los campos sin contestar tambien seran guardados',
          showDenyButton: true,
          confirmButtonText: 'Guardar',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
         

            let formData={
               answers:JSON.stringify(this.answer.answers),
               poll_status_id:this.answer.poll_status_id,
               attend_by:this.answer.attend_by
            }

            authAxios.put('/answers/'+this.answer.id,formData).then((res)=>{
              return this.$router.push({ name: 'cuestionarios' })        
            }).catch((error)=>{
              error = (error.response.data);

              console.log(error);
               this.$vaToast.init({
                      message: 'No se puede procesar tu peticion',
                      iconClass: 'fas fa-times',
                      position: 'top-right',
                      duration: 2500,
                      fullWidth: true,
                      color:'danger',
                });
              })
          }
        })  
      } 
    }
}
	
</script>

<style>
	
</style>
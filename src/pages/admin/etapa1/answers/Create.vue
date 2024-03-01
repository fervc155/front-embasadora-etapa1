<template>
  <div class="mb-3">
    <va-chip to="/admin/cuestionarios">Volver</va-chip>
  </div>

  <va-card>
   <va-card-title>Responde un cuestionario</va-card-title>
    <va-card-content>
      <va-select
      v-model="poll"
      class="mb-4"
      placeholder="Elije un cuestionario"
      :options="polls"
    />
    <va-button size="medium" v-if="poll" v-on:click="submit()" class="mr-4 mb-4">Guardar respuestas</va-button>

    <poll-builder :show="false" :edit="false" :id="poll.id" v-bind:questions="poll.value" />
    <va-button size="medium" v-if="poll" v-on:click="submit()" class="mr-4 mt-4">Guardar respuestas</va-button>
    </va-card-content>
  </va-card>
</template>

<script>

import {authAxios,errorAxios} from '@/config/axios';
import PollBuilder from '@/components/poll-builder/PollBuilder.vue';
import Swal from 'sweetalert2';


export default {
  name: 'Create',

  components: {
    PollBuilder
  },
  data () {
    return {
      polls:[],
      poll:false,

    }
  },

  mounted () {
    authAxios.get('/polls').then((res)=>{
      this.polls= res.data.data.map(poll=>{
        return {
          text:poll.name+" v"+poll.version,
          value:JSON.parse(poll.questions),
          id:poll.id
        }
      });

    }).catch(error=>{errorAxios.catch(this,error)})
 
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
         
            const formData = new FormData();

            formData.append('poll_id',this.poll.id);
            formData.append('answers',JSON.stringify(this.poll.value));

            authAxios.post('/answers',formData).then((res)=>{
              return this.$router.push({ name: 'cuestionarios' })
        
            }).catch(error=>{errorAxios.catch(this,error)})
          }
        })  
      } 
    }
}
	
</script>

<style>
	
</style>
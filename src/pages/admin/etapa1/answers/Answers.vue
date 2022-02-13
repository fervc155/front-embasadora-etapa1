<template>
  <va-card>
   <va-card-title>Cuestionarios reespondidos</va-card-title>
    <va-card-content>
      <va-chip v-if="CanI('answers.create')" class="mb-2 mr-2" to="cuestionarios/crear-respuesta" color="primary">Contestar encuesta</va-chip>
      <data-table :items="answers"
        show="cuestionarios/"
        :edit="CanI('answers.edit','cuestionarios/editar/')"
        :drop="CanI('answers.delete',drop)"
      ></data-table>
 
    </va-card-content>

  </va-card>
</template>

<script>
import {authAxios} from '@/config/axios';
import DataTable from '@/components/table/DataTable.vue';
import Swal from 'sweetalert2';
import {CanI} from '@/config/capabilities';

import {answers_map} from'./_helpers';

export default {
  name: 'polls',
  components:{DataTable},
  data () {
    return {
      answers:[],
      CanI:CanI,
      drop:(id,options)=>{

        Swal.fire({
          title: 'Eliminar Registro',
          showDenyButton: true,
          confirmButtonText: 'Borrar',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            authAxios.delete('/answers/'+id).then((res)=>{
              this.answers = this.answers.filter((answer)=>{
                return answer.ID!=id;
             })
            }).catch(error=>{
              console.error(error);
            })
          }
        })

       
      }


    }
  },
    mounted () {
    authAxios.get('/answers').then((res)=>{
      this.answers=answers_map(res.data.data);
    }).catch(error=>{
      console.error(error);
    })
 
  },
  methods: {



  }
  

}
	
</script>

<style>
	
</style>
<template>
  <va-card>
    <va-card-title>Cuestionarios sin revisar</va-card-title>
    <va-card-content>

      <data-table :items="answers"
        show="cuestionarios/"
        :edit="false"
        :drop="false"
      ></data-table>
  
       </va-card-content>


    
     
  </va-card>


  <va-card>
    <va-card-title>Entrevistas sin closer asignado</va-card-title>
      <va-card-content>

      <data-table :items="answersPotencial"
        show="cuestionarios/"
        :edit="false"
        :drop="false"
      ></data-table>
  
       </va-card-content>



  </va-card>
</template>

<script>
import {authAxios} from '@/config/axios';
import DataTable from '@/components/table/DataTable.vue';
import Swal from 'sweetalert2';

import {answers_map} from'@/pages/admin/etapa1/answers/_helpers';

export default {
  name: 'dashboard',
  components:{DataTable},
  data () {
    return {
      answers:[],
      answersPotencial:[],

    }
  },
  mounted () {
    authAxios.get('/answers/status/1').then((res)=>{
      this.answers=answers_map(res.data.data);
    }).catch(error=>{
      console.error(error);
    })
 
   authAxios.get('/answers/status/3/0').then((res)=>{
      this.answersPotencial=answers_map(res.data.data);
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
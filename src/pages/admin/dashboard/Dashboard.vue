<template>

  <tabs @active="active=$event" :tabs="tabs" />
  <va-card v-if="active==tabs[0]">
    <va-card-title>Cuestionarios sin revisar</va-card-title>
    <va-card-content>

      <data-table :items="answers"
        show="cuestionarios/"
        :edit="false"
        :drop="false"
      ></data-table>
  
       </va-card-content>


    
     
  </va-card>
  <va-card v-if="active==tabs[1]">
    <va-card-title>Citas para hoy</va-card-title>
      <va-card-content>

      <data-table :items="citas"
        show="citas/"
        :edit="false"
        :drop="false"
      ></data-table>
  
       </va-card-content>



  </va-card>
</template>

<script>
import {authAxios,appointmentsApi,errorAxios} from '@/api/index';
import DataTable from '@/components/table/DataTable.vue';
import Swal from 'sweetalert2';
import Tabs from '@/components/Tabs.vue';
import {answers_map} from'@/pages/admin/etapa1/answers/_helpers';
import {AmI} from  '@/config/capabilities'

export default {
  name: 'dashboard',
  components:{DataTable,Tabs},
  data () {
    let tabs =['Cuestionarios sin revisar','Citas para hoy'];
    let active ='Cuestionarios sin revisar';
    if(AmI('clouser')){
      delete tabs[0];
      active = tabs[1];

    }
    return {
      tabs,
      active,
      answers:[],
      citas:[],

    }
  },
  mounted () {

    if(!AmI('clouser')){

      authAxios.get('/answers/status/1').then((res)=>{
        this.answers=answers_map(res.data.data);
      }).catch(error=>{errorAxios.catch(this,error) })
   
    }
   appointmentsApi.today().then((res)=>{
      this.citas=appointmentsApi.map(res);
    }).catch(error=>{errorAxios.catch(this,error) })
 
 

  },
  methods: {

  }
}
	
</script>

<style>
	
</style>
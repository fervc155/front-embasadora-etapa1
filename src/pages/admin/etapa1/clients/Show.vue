<template>
    <div class="mb-3">
    <va-chip to="/admin/clientes">Volver</va-chip>
  </div>

  
  <card-information :client="client" />
  <va-card>
    <va-card-title>Cuestionarios respondidos</va-card-title>
    <va-card-content>
        <data-table :items="answers"
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
import CardInformation from './CardInformation.vue';
import {answers_map} from'./../answers/_helpers';


export default {
  name: 'show',
  components:{DataTable,CardInformation},
  data () {
    return {
      answers:[],
      client:{
        name:'',
        email:'',
        whatsapp:'',
        phone:'',
        social_networks:{

        }
      }
    }
  },
  mounted(){
    authAxios.get('/clients/'+this.$route.params.id+"/answers").then((res)=>{

      let client = res.data.data;
      client.social_networks = client.social_networks==null? {}:  JSON.parse(client.social_networks);
      this.client= client;
      this.answers = answers_map(client.answers);
    
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
<template>
    <div class="mb-3" v-if="!id">
    <va-chip to="/admin/clientes">Volver</va-chip>
  </div>

  <va-tabs v-model="active"
  >
    <template #tabs>
      <va-tab
        v-for="title in tabs"
        :name="title"
        :key="title"
      >
        {{ title }}
      </va-tab>
    </template>
  </va-tabs>

  <card-client v-if="active==tabs[0]" :client="client" />


  <va-card v-if="active==tabs[1]">
    <va-card-title>Cuestionarios respondidos</va-card-title>
    <va-card-content>

        <data-table :items="answers"
        show="cuestionarios/"
        :edit="false"
        :drop="false"
      ></data-table>
    </va-card-content>
  </va-card>

  <va-card v-if="active==tabs[2]">
    <va-card-title>Cotizaciones curiosas</va-card-title>
    <va-card-content>

        <data-table :items="quotes"
        show="cuestionarios/"
        :edit="false"
        :drop="false"
      ></data-table>
    </va-card-content>
  </va-card>
</template>

<script>
import {authAxios,errorAxios} from '@/config/axios';
import DataTable from '@/components/table/DataTable.vue';
import CardClient from './CardClient.vue';
import {answers_map} from'./../answers/_helpers';
import moment from 'moment';

export default {
  name: 'show',
  components:{DataTable,CardClient},
  props:['id'],
  data () {
    return {
      active:'Informacion',
      tabs: ['Informacion', 'Cuestionarios respondidos','Cotizaciones curiosas'],
      answers:[],
      qutoes:[],
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
    authAxios.get('/clients/'+(this.id || this.$route.params.id )+"/answers").then((res)=>{

      let client = res.data.data;
      client.social_networks = client.social_networks==null? {}:  JSON.parse(client.social_networks);
      this.client= client;
      this.answers = answers_map(client.answers);
      this.quotes= client.quotes.map((quote)=>{
        return {
          No_cotizacion:quote.id,
          Estatus:quote.status.name,
          Titulo:quote.title,
          Cliente:quote.client_name,
          Email:quote.email,
          Fecha_de_creacion:moment(quote.created_at).format('D-MM-Y'),
          Validez:moment(quote.start_validity).format('D-MM-Y')+"-"+moment(quote.end_validity).format('D-MM-Y'),
          
          Opciones:quote.id
        }
      })
    
    }).catch(error=>{errorAxios.catch(this,error)})

  },
  methods: {

  }
}
	
</script>

<style>


  .button{
    border-radius: 100px;
    background: var(--va-info);
    padding: 6px 1rem;
    color: white;
    cursor: pointer;
    font-size: 12px;
  }

  .network{
   border: 1px solid gray;
   border-radius: 4px;
   padding: 8px 16px;
   display: inline-block;
   margin: 6px;
   text-transform: capitalize;
   font-size: 14px;
  }

  .icon i{
    padding-right:6px; 
    font-size: 14px !important;
  }

   
	
</style>
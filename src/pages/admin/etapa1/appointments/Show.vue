<template >
  <div v-if="answer==null" class="mb-3">
    <va-chip to="/admin/citas">Volver</va-chip>
  </div>


  <tabs @active="active=$event" :tabs="tabs" />

    <va-card v-if="active==tabs[0]">
      <va-card-title>Detalll de la cita</va-card-title>
      <va-card-content>
        <h4>{{appointment.title}}</h4>
        <p>
          <span class="fwb"> <va-icon name="fa fa-calendar va-icon fa fa-calendar"/>Dia:</span>{{appointment.date}} 
       <span class="fwb"> <va-icon name="fa fa-clock-o va-icon fa fa-clock-o"/>Hora:</span>{{appointment.time}}</p>
        <p>
          <span class="fwb"> <va-icon name="fa fa-user-o"/>Creado por:</span>{{appointment.created_by.name}}  
        </p>
 

      
        <div>
          <h4>Contenido</h4>
          <p>{{appointment.content}}</p>
        </div>

   

      </va-card-content>
    </va-card>
    <ShowClient :id="appointment.client_id" v-if="appointment.client_id && active==tabs[1]" />
</template>
<script>

import {appointmentsApi,errorAxios} from '@/api/index';
import Tabs from '@/components/Tabs.vue';
import ShowClient from '@/pages/admin/etapa1/clients/Show';

import moment from 'moment';
export default {
  name: 'show',
  components:{Tabs,ShowClient},
  data () {
    return {
      active:'Detalle de la cita',
      tabs:['Detalle de la cita','Cliente'],
      appointment:{created_by:{name:''}},
    }
  },

  mounted () {

    appointmentsApi.show(this.$route.params.id).then(res=>{
      this.appointment=JSON.parse(JSON.stringify(res.data.data));
    })

    }
}
  
</script>

<style>
.va-button{
  margin: 5px;
}
.selected{
  background: var(--va-info)  !important;
 }

 .disabled{
  background: var(--va-secondary)  !important;
  opacity: 0.4;
 }

 h4{
  margin: 10px 0px;
 }
 .fwb{
  font-weight: bold;
  margin-bottom: 5px;
 }
</style>
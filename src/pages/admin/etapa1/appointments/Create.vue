<template >
  <div v-if="answer==null" class="mb-3">
    <va-chip to="/admin/citas">Volver</va-chip>
  </div>

  <va-card>
    <va-card-title>Crear cita</va-card-title>
  <va-card-content>

    <div class="row">
      <div class="flex md6">
        <SelectClouser @clouser="appointment.user_id=$event.id" />
      </div>
      <div class="flex md6">
        <va-select  label="Selecciona un cliente" :options="clients" v-model="client" />
      </div>
    </div>
    <div class="row">

       <div class="flex md12">
      <va-input v-model="appointment.title" label="titulo"/>
    </div>
      
    <div class="flex md4">  
    <h5>Selecciona un dia</h5> 
      <va-date-picker  v-model="date" />
    </div>

    <div class="flex md8">
       <h5>Selecciona una hora</h5> 

      <va-button v-for=" hour in hours" v-on:click="setTime(hour,$event)" 
      :class="(hour.disabled?'disabled ':'') + (hour.selected?' selected':'')">
      {{hour.time}}</va-button>
    </div>
    <div class="flex md12">
      <va-input  type="textarea" autosize v-model="appointment.content" label="Contenido o descripcion"/>
    </div>

   
    </div>
    <va-button size="medium"   v-on:click="submit()" class="mr-4 mt-4">Guardar cita</va-button>

    </va-card-content>
  </va-card>
</template>
<script>

import {authAxios,usersApi,clientsApi,appointmentsApi,errorAxios} from '@/api/index';
import Swal from 'sweetalert2';
import moment from 'moment';
import {for_select} from '@/helpers';
import SelectClouser from '@/pages/admin/users/SelectClouser';
export default {
  name: 'create',

  components:{
    SelectClouser
  },
  props:['answer','modal'],

  data () {
    return {
      date:'',
        clients:[{
          id:null,
          text:'No asignar',
          value:false
        }],
        client:{},
        appointment:{        
          date:'',
          time:'',
          user_id:null,
          title:'',
          content:'',
        },

        hoursTaken:[],
        hoursValid:[
        {time:'06:00',selected:false,disabled:false},
        {time:'07:00',selected:false,disabled:false},
        {time:'08:00',selected:false,disabled:false},
        {time:'09:00',selected:false,disabled:false},
        {time:'10:00',selected:false,disabled:false},
        {time:'11:00',selected:false,disabled:false},
        {time:'12:00',selected:false,disabled:false},
        {time:'13:00',selected:false,disabled:false},
        {time:'14:00',selected:false,disabled:false},
        {time:'15:00',selected:false,disabled:false},
        {time:'16:00',selected:false,disabled:false},
        {time:'17:00',selected:false,disabled:false},
        {time:'18:00',selected:false,disabled:false},
        {time:'19:00',selected:false,disabled:false},
        {time:'20:00',selected:false,disabled:false},
        {time:'21:00',selected:false,disabled:false},
        {time:'22:00',selected:false,disabled:false},
        ],
        hours:[],
    }
  },

  mounted () {

    clientsApi.get().then(res=>{
      this.clients = [
        ...this.clients,
        ...for_select(res.data.data)
      ];

      if(this.$route.params.client_id){
        this.client = this.clients.filter(c=>c.id==this.$route.params.client_id)[0]||{};
      }
    }).catch(e=>errorAxios(this,e));

  },
  computed:{
    formatDate(){
      if(this.appointment.date=='')
        return'';
      return moment(this.appointment.date).format('D-MM-Y');
    }
  },
  watch:{
    date(val){
      this.appointment.date =val;

      if(this.appointment.user_id){
        appointmentsApi.getTimes(this.appointment.user_id,val).then((res)=>{

          this.hoursTaken = JSON.parse(JSON.stringify(this.hoursValid)); 

          this.hoursTaken.map(hour=>{
            if(res.data.data.includes(hour.time)){
              hour.disabled=true
            }

            return hour;

          })

          this.hours = JSON.parse(JSON.stringify(this.hoursTaken)); 

        }).catch(e=>errorAxios(this,e));
      }
      
    }
  },
  methods: {

  

    setTime(hour,e){
      if(hour.disabled)
        return;

      this.hours= this.hoursTaken.map(hourP=>{
        if(hour.time==hourP.time){
          return {
            ...hourP,
            selected:true
          }
        }
        else
          return hourP;

      })
      this.appointment.time=hour.time;

    },

    submit(){


        Swal.fire({
          title: 'Guardar cita',
          showDenyButton: true,
          confirmButtonText: 'Guardar',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.appointment.client_id=this.client.id;
            appointmentsApi.save(this.appointment).then((res)=>{
                return this.$router.push({ name: 'citas' })        
            }).catch(error=>{errorAxios.catch(this,error)})
          }
        })  
      } 
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
</style>
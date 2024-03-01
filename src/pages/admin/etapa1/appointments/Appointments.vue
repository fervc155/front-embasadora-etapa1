<template>
  <va-card>
    <va-card-title>Citas <va-chip v-if="CanI('appointments.create')" class="mb-2 mr-2" to="citas/crear" color="primary">Crear cita</va-chip></va-card-title>
    <va-card-content>
      
      <data-table :items="appointments"
        show="citas/"
        :edit="false"
        :drop="CanI('appointments.delete',drop)"
      ></data-table>
  
 
    </va-card-content>
  </va-card>


</template>

<script>
import {appointmentsApi,errorAxios} from '@/api/index';
import DataTable from '@/components/table/DataTable.vue';
import Swal from 'sweetalert2';
import {CanI} from '@/config/capabilities';


export default {
  name: 'appointments',
  components:{DataTable},
  data () {
    return {
      appointments:[],
      CanI:CanI,
      drop:(id,options)=>{

        Swal.fire({
          title: 'Eliminar Registro',
          showDenyButton: true,
          confirmButtonText: 'Borrar',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            appointmentsApi.delete(id).then((res)=>{

              this.appointments = this.appointments.filter((appointment)=>{
                return appointment.No_cita!=id;
             })
            }).catch(error=>{errorAxios.catch(this,error)})
          }
        })   
      }
    }
  },
  mounted(){
        appointmentsApi.get().then((res)=>{
      this.appointments= appointmentsApi.map(res);
    }).catch(error=>{errorAxios.catch(this,error)})

  },
  methods: {

  }
}
	
</script>

<style>
	
</style>
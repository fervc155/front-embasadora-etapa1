<template>
  <va-card>
   <va-card-title>Cotizaciones       <va-chip class="mb-2 mr-2" to="cotizaciones/crear" color="primary">Crear cotizacion</va-chip>
</va-card-title>
    <va-card-content>
      <data-table :items="quotes"
        show="cotizaciones/"
        :edit="false"
        :drop="drop"
        download="quotes"
      ></data-table>
  
 
    </va-card-content>
  </va-card>
</template>

<script>
import {authAxios,errorAxios} from '@/config/axios';
import DataTable from '@/components/table/DataTable.vue';
import Swal from 'sweetalert2';
import moment from 'moment';

  
export default {
  name: 'quotes',
  components:{DataTable},
  data () {
    return {
      quotes:[],
      drop:(id,options)=>{
        Swal.fire({
          title: 'Eliminar Registro',
          showDenyButton: true,
          confirmButtonText: 'Borrar',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            authAxios.delete('/quotes/'+id).then((res)=>{
              this.quotes = this.quotes.filter((quote)=>{
                return quote.No_cotizacion!=id;
             })
            }).catch(error=>{errorAxios.catch(this,error)})
          }
        })

       
      }


    }
  },
    mounted () {
    authAxios.get('/quotes').then((res)=>{
      this.quotes= res.data.data.map((quote)=>{
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
  
</style>
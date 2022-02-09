<template>
  <va-card>
    <va-card-title>Clientes</va-card-title>
    <va-card-content>
      <va-chip class="mb-2 mr-2" to="clientes/crear" color="primary">Crear cliente</va-chip>
      <data-table :items="clients"
        show="clientes/"
        edit="clientes/editar/"
        :drop="drop"
      ></data-table>
  
 
    </va-card-content>
  </va-card>


</template>

<script>
import {authAxios} from '@/config/axios';
import DataTable from '@/components/table/DataTable.vue';
import Swal from 'sweetalert2';

export default {
  name: 'clients',
  components:{DataTable},
  data () {
    return {
      clients:[],
      drop:(id,options)=>{

        Swal.fire({
          title: 'Eliminar Registro',
          showDenyButton: true,
          confirmButtonText: 'Borrar',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            authAxios.delete('/clients/'+id).then((res)=>{

              this.clients = this.clients.filter((client)=>{
                return client.No_cliente!=id;
             })
            }).catch(error=>{
              console.error(error);
            })
          }
        })   
      }
    }
  },
  mounted(){
        authAxios.get('/clients').then((res)=>{
      this.clients= res.data.data.map((client)=>{
        return {
          No_cliente:client.id,
          Nombre:client.name,
          Email:client.email,
          Whatsapp:client.whatsapp,
          Telefono:client.phone,
          Opciones:client.id

        }
      });
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
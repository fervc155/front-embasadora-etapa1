<template>
  <va-card>
   <va-card-title>Usuarios  <va-chip class="mb-2 mr-2" to="usuarios/crear" color="primary">Crear usuario</va-chip></va-card-title>
    <va-card-content>
    
  
      <data-table :items="users"
        show="usuarios/"
        edit="usuarios/editar/"
        :drop="drop"
      ></data-table>

 
    </va-card-content>
 
  </va-card>
</template>

<script>
import {authAxios,errorAxios} from '@/config/axios';
import DataTable from '@/components/table/DataTable.vue';
import Swal from 'sweetalert2';

 
export default {
  name: 'users',
  components:{DataTable},
  data () {
    return {
      users:[],
      drop:(id,options)=>{

        Swal.fire({
          title: 'Eliminar Registro',
          showDenyButton: true,
          confirmButtonText: 'Borrar',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            authAxios.delete('/users/'+id).then((res)=>{
              this.users = this.users.filter((answer)=>{
                return answer.ID!=id;
             })
            }).catch(error=>{errorAxios.catch(this,error)})
          }
        })   
      }
     

    }
  },
    mounted () {
    authAxios.get('users').then((res)=>{
      this.users=res.data.data.map((user)=>{
        return {
          ID:user.id,
          Nombre:user.name,
          Rol:user.roles[0].name,
          Jefe:user.boss==undefined?'-':user.boss.name,
          Opciones:user.id,


        }

      });
    }).catch(error=>{errorAxios.catch(this,error)})
 
  },
  methods: {

  }
  

}
	
</script>

<style>
	
</style>
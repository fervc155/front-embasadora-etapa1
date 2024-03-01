<template>
  <div class="mb-3">
    <va-chip to="/admin/usuarios">Volver</va-chip>
  </div>
   
  <va-card>
    <va-card-title>Informacion del usuario          <va-chip v-if="CanI('users.edit')" class="mb-2 mr-2" :to="editUrl" color="primary">Editar</va-chip>
   </va-card-title>
       <va-card-content>
      <card-user :user="user" />
    </va-card-content>
  </va-card>

    <va-card>
    <va-card-title> Empleados
   </va-card-title>
   <va-card-content>
      <table>
        <tr v-for="employee in user.employees" >
          <td><va-icon name="fa fa-user-o"/> {{employee.name}}</td>
          <td class="fwb">{{employee.role}}</td>
        </tr>
    </table>
   </va-card-content>
      
 
  </va-card>


</template>

<script>
import {authAxios,errorAxios} from '@/config/axios';
import {AmI} from '@/config/capabilities';
import Token from '@/config/token';
import {CanI} from '@/config/capabilities';
import CardUser from './CardUser';

export default {
  name: 'show',
  components:{CardUser},
  data () {
    return {
      CanI,
      user:{}
    }
  },

  computed:{

    editUrl(){
      if(this.user.id!=undefined)
        return '/admin/usuarios/editar/'+this.user.id;
      else
        return '';
    }


  },
  mounted(){

    authAxios.get('/users/'+this.$route.params.id).then((res)=>{
      this.user= res.data.data;
    }).catch(error=>{errorAxios.catch(this,error)})

  },
  methods: {

  }
}
	
</script>

<style>

  .fwb{
    font-weight: bold;
    padding-left:1rem ;
  }
	
</style>
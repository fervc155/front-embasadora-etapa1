<template>
    <div class="mb-3">
    <va-chip to="/admin/usuarios">Volver</va-chip>
  </div>
  <va-card>
   <va-card-title>Editar usuario</va-card-title>
    <va-card-content>

      <form-user :edit="true" v-bind:user="user" />

      <va-button size="medium"  class="mt-4" v-on:click="submit()" >Editar usuario</va-button>

    </va-card-content>
 
 
  </va-card>
  <change-password :user="user" />


  
</template>

<script>
import {authAxios,errorAxios} from '@/config/axios';

import FormUser from './FormUser.vue';
import ChangePassword from './ChangePassword.vue';
import Swal from 'sweetalert2';

         
export default {
  name: 'create', 
  components:{FormUser,ChangePassword},
 
  data () {
    return {
      user:{
        name:'',
        email:'',
        role:''
      },
     

    }
  },
    mounted () {

      authAxios.get('/users/'+this.$route.params.id).then((res)=>{
        let user =res.data.data;
        user.role = res.data.data.roles[0].name;
        delete user.roles;
        this.user = user;
      }).catch(error=>{errorAxios.catch(this,error)})

  },
  methods: {

    submit(){

      let formData = new FormData();

      authAxios.put('/users/'+this.user.id,this.user).then((res)=>{
        Swal.fire(
                  'Exito',
                  'Datos editados correctamente',
                  'success'
                )
      }).catch(error=>{errorAxios.catch(this,error)})
    }

  }
  

}
	
</script>

<style>
	
</style>
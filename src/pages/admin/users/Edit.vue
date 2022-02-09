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
import {authAxios} from '@/config/axios';
import {print_error_validate,error_500} from '@/helpers';

import FormUser from './FormUser.vue';
import ChangePassword from './ChangePassword.vue';
 

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
      }).catch((error)=>{
        console.error(error);
      })

  },
  methods: {

    submit(){

      let formData = new FormData();

      authAxios.put('/users/'+this.user.id,this.user).then((res)=>{
        return this.$router.push({ name: 'usuarios' })
      }).catch((error)=>{
        if(error.response.status==422){
          print_error_validate(error,this);
          return;
        }
        error_500(this);

      })
    }

  }
  

}
	
</script>

<style>
	
</style>
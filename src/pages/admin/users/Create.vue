<template>
    <div class="mb-3">
    <va-chip to="/admin/usuarios">Volver</va-chip>
  </div>
  <va-card>
   <va-card-title>Crear usuario</va-card-title>
    <va-card-content>

      <form-user v-bind:user="user" />

      <va-button size="medium"  class="mt-4" v-on:click="submit()" >Crear usuario</va-button>

    </va-card-content>
  </va-card>
</template>

<script>
import {authAxios,errorAxios,usersApi} from '@/api/index';
import FormUser from './FormUser.vue';

export default {
  name: 'create',
  components:{FormUser},
  data () {
    return {
      user:{
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
        role:''
      },
    }
  },
    mounted () {



  },
  methods: {

    submit(){

      let formData = new FormData();

      usersApi.save(this.user).then((res)=>{
        return this.$router.push({ name: 'usuarios' })
      }).catch(error=>{errorAxios.catch(this,error)})
    }

  }
  

}
	
</script>

<style>
	
</style>
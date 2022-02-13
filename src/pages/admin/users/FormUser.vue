<template>

      <div class="row">
        <div class="flex md6">
          <va-input label="Nombre del usuario" v-model="user.name"/>
        </div>

        <div class="flex md6">
          <va-input type="email" label="Correo electronico" v-model="user.email"/>
        </div>

        <div  v-if="edit==null" class="flex md6">
          <va-input label="Contraseña" type="password" v-model="user.password"/>
        </div>
        <div v-if="edit==null" class="flex md6">
          <va-input label="Confirmar contraseña" type="password" v-model="user.password_confirmation"/>
        </div>
      </div>
    
      <va-select v-if="AmI('senior')"  label="selecciona un rol" v-model="user.role" :options="roles" />


</template>

<script>
import {authAxios} from '@/config/axios';
import {AmI} from  '@/config/capabilities'


 
export default {
  name: 'form-user',
  props:['user','edit'],
  data () {
    return {
      AmI:AmI,
      roles:[],


    }
  },
    mounted () {

      authAxios.get('/roles').then((res)=>{
        this.roles =res.data.data.map((role)=>{
          return role.name
        })

      }).catch((error)=>{
        console.error(error);
      })

  },
  methods: {

    

  }
  

}
	
</script>

<style>
	
</style>
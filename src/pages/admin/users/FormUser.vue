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
      
      <SelectClouser :clouser_id="user.user_id" class="mt-3" v-if="user.role=='hostess'" @clouser="user.user_id=$event.id" />
 
</template>

<script>
import {authAxios,errorAxios} from '@/config/axios';
import {AmI} from  '@/config/capabilities'
import SelectClouser from '@/pages/admin/users/SelectClouser';



 
export default {
  name: 'form-user',
  props:['user','edit'],
  components:{SelectClouser},
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

      }).catch(error=>{errorAxios.catch(this,error)})

  },
  methods: {

    

  }
  

}
	
</script>

<style>
	
</style>
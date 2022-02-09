<template>
  <va-card>
    <va-card-title>Editar Contrasena</va-card-title>
    <va-card-content>
      
          <div class="row">

      <div   class="flex md4">
        <va-input label="Contraseña actual" type="password" v-model="old_password"/>
        </div>
              <div   class="flex md4">

        <va-input label="Nueva Contraseña" type="password" v-model="password"/>
        </div>
        <div  class="flex md4">
          <va-input label="Confirmar contraseña" type="password" v-model="password_confirmation"/>
        </div>
      </div>
            <va-button size="medium"  class="mt-4" v-on:click="submit()" >Crear usuario</va-button>

    </va-card-content>
  </va-card>
{{user}}

  
</template>

<script>
import {authAxios} from '@/config/axios';
import {print_error_validate,error_500} from '@/helpers';

 

export default {
  name: 'change-password', 
  components:{},
 
  props:['user'],
  data () {
    return {
      old_password:'',
      password:'',
      password_confirmation:'',
     

    }
  },
  mounted () {

  },
  methods: {

    submit(){

      let formData = new FormData();

      this.user.role = this.user.role.value;
      authAxios.post('/users',this.user).then((res)=>{
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
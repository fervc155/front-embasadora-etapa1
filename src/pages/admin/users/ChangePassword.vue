<template>
  <va-card>
    <va-card-title>Editar Contrasena</va-card-title>
    <va-card-content>
      
          <div class="row">

      <div   class="flex md4" v-if="!AmI('senior')">
        <va-input label="Contraseña actual" type="password" v-model="old_password"/>
        </div>
              <div   class="flex md4">

        <va-input label="Nueva Contraseña" type="password" v-model="password"/>
        </div>
        <div  class="flex md4">
          <va-input label="Confirmar contraseña" type="password" v-model="password_confirmation"/>
        </div>
      </div>
            <va-button size="medium"  class="mt-4" v-on:click="submit()" >Cambiar password</va-button>

    </va-card-content>
  </va-card>

  
</template>

<script>
import {authAxios} from '@/config/axios';
import {print_error_validate,error_500} from '@/helpers';
import {AmI} from  '@/config/capabilities'
import Swal from 'sweetalert2';
 

export default {
  name: 'change-password', 
  components:{},
 
  props:['user'],
  data () {
    return {
      AmI:AmI,
      old_password:'',
      password:'',
      password_confirmation:'',
     

    }
  },
  mounted () {

  },
  methods: {

    submit(){

      let data = {
        password:this.password,
        password_confirmation:this.password_confirmation,
        old_password:this.old_password
      };

      authAxios.put('/users/'+this.user.id+'/change-password',data).then((res)=>{
         Swal.fire(
          'Exito',
          'Contraseña cambiada correctamente',
          'success'
        )
         this,password='';
         this,password_confirmation='';
         this,old_password='';
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
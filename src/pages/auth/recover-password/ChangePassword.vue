<template>
  <h1 class="text-center mb-4">Escribe una nueva contraseña</h1>
  <form @submit.prevent="onsubmit" class="login">
      <va-input
        class="mb-3"
        v-model="password"
        type="password"
        placeholder="Contraseña"
        label="Contraseña"
      />

      <va-input
        class="mb-3"
        v-model="password_confirmation"
        type="password"
        placeholder="Confirmar Contraseña"
        label="Confirmar Contraseña"
      />

        <div class="auth-layout__options d-flex align--center justify--space-between">
      <router-link class="ml-1 link" :to="{name: 'login'}">Ir a Iniciar Sesion</router-link>
    </div>
    <div class="row justify--center">
      <va-button type="onsubmit()" class="my-0" :rounded="false">Cambiar contraseña</va-button>
    </div>
  </form>
</template>

<script>
  import clienteAxios,{errorAxios} from '@/config/axios';
export default {
  name: 'cambiar-password',
  data () {
    return {
      password: '',
      password_confirmation: '',
      token:'',
    }
  },

  mounted(){
    this.token = this.$route.params.token??false;

    if(!this.token)
      this.$router.push({name:"login"})

  },
  methods: {
    onsubmit () {
     
        

      let data = {
        password:this.password,
        password_confirmation:this.password_confirmation,
        token:this.token
      };

      clienteAxios.post('/auth/change-password',data).then(res=>{
               this.$vaToast.init({
                  message: 'Contraseña cambiada, inicia sesion',
                  iconClass: 'fas fa-times',
                  position: 'top-right',
                  duration: 2500,
                  fullWidth: true,
                  color:'success',
            });
               this.$router.push({name:'login'})
   
   
        
      }).catch(error=>{errorAxios.catch(this,error)})

    

      
    },
  },
}
</script>

<style lang="scss">
h1, .va-input__content-wrapper .va-input__content__input{
  color: var(--va-gray2Dark);
}
.link:hover {
  color: var(--va-darkGreen) !important;
}
.va-message-list{
  padding: 0.25rem 0.5rem;
}
.va-input--solid .va-input__container{
  border-color: var(--va-lightGray);
}
</style>

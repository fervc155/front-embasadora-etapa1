<template>
  <h1 class="text-center mb-4">Recuperar password</h1>
  <form @submit.prevent="onsubmit" class="login">
      <va-input
        class="mb-3"
        v-model="email"
        type="email"
        placeholder="Email"
        :error="!!emailErrors.length"
        :error-messages="emailErrors"
      />
        <div class="auth-layout__options d-flex align--center justify--space-between">
      <router-link class="ml-1 link" :to="{name: 'login'}">Ir a Iniciar Sesion</router-link>
    </div>
    <div class="row justify--center">
      <va-button type="submit" class="my-0">Enviar link de recuperación</va-button>
    </div>
  </form>
</template>

<script>
  import clienteAxios from '@/config/axios';

export default {
  name: 'recover-password',
  data () {
    return {
      email: '',
      emailErrors: [],
    }
  },
  methods: {
    onsubmit () {
      if (!this.email) {
        this.emailErrors = ['Email is required']
      } else {
        

        let data = {
        email:this.email
        };
      clienteAxios.post('/auth/recover-password',data).then(res=>{
        let data = res.data.data;
          this.$vaToast.init({
                  message: 'Un email se ha enviado a tu correo electronico',
                  iconClass: 'fas fa-times',
                  position: 'top-right',
                  duration: 2500,
                  fullWidth: true,
                  color:'success',
            });
          
        
      }).catch(error=>{
          this.$vaToast.init({
                message: 'Tus claves de acceso son incorrectas',
                iconClass: 'fas fa-times',
                position: 'top-right',
                duration: 2500,
                fullWidth: true,
                color:'danger',
          });
        })

    

      }
    },
  },
}
</script>

<style lang="scss">
</style>

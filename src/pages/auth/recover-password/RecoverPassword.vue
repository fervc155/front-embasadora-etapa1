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
        :label="emailLabel"
      />
        <div class="auth-layout__options d-flex align--center justify--space-between">
      <router-link class="ml-1 link" :to="{name: 'login'}">Ir a Iniciar Sesion</router-link>
    </div>
    <div class="row justify--center">
      <va-button type="submit" class="my-0" :rounded="false">Enviar link de recuperación</va-button>
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
  computed: {
    emailLabel () {
      return this.email ? 'email' : '' 
    },
  },
  methods: {
    onsubmit () {
      if (!this.email) {
        this.emailErrors = ['El email es requerido']
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

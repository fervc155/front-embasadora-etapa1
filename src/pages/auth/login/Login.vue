<template>
  <h1 class="text-center mb-4">Iniciar Sesion</h1>
  <form @submit.prevent="onsubmit">
    <va-input
      class="mb-3"
      v-model="email"
      type="email"
      placeholder="Email"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
      :label="emailLabel"
    />

    <va-input
      class="mb-3"
      v-model="password"
      type="password"
      placeholder="Password"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
      :label="passwordLabel"
    />

    <div class="auth-layout__options d-flex align--center justify--space-between">
      <router-link class="ml-1 link" :to="{name: 'recover-password'}">Reestablecer password</router-link>
    </div>

    <div class="d-flex justify--center mt-3">
      <va-button @click="onsubmit()" :rounded="false" class="my-0">Iniciar sesion</va-button>
    </div>
  </form>
</template>


<script>
import clienteAxios from '@/config/axios';
import Token from '@/config/token';
import {useStore} from "vuex";

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      emailErrors: [],
      passwordErrors: [],
      $store:useStore(),
    }
  },
  setup(){
  },
  computed: {
    formReady () {
      return !this.emailErrors.length && !this.passwordErrors.length
    },

    emailLabel () {
      return this.email ? 'email' : '' 
    },

    passwordLabel () {
      return this.password ? 'password' : ''
    },
  },
  methods: {
    onsubmit () {
      this.emailErrors = this.email ? [] : ['El email es requerido']
      this.passwordErrors = this.password ? [] : ['El password es requerido']
      if (!this.formReady) {
        return
      }

      const formData = new FormData();
      formData.append('email',this.email);
      formData.append('password',this.password);



      clienteAxios.post('/auth/login',formData).then(res=>{
        let data = res.data.data;
        Token.set(data);
        this.$router.push({name:'dashboard'})
        
      }).catch(error=>{
          this.$vaToast.init({
                message: 'Tus claves de acceso son incorrectas',
                iconClass: 'fas fa-times',
                position: 'top-right',
                duration: 2500,
                fullWidth: true,
                color:'danger',
          });
          error = (error.response.data);
          this.emailErrors = error.errors.email;
          this.passwordErrors = error.errors.password;
        })

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

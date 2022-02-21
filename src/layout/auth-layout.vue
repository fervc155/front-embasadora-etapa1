<template>
  <div class="auth-layout row align-content--center">
    <div class="flex xs12 pa-3 flex-center">
      <router-link class="py-4 flex-center" to="/">
        <img src="/img/Formulabs_Gris.png">
      </router-link>
    </div>

    <div class="flex xs12 pa-3">
      <div class="d-flex justify--center">
        <va-card class="auth-layout__card">
          <va-card-content>
            <div class="pa-3">
              <router-view />
            </div>
          </va-card-content>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "AuthLayout",
  data() {
    return {

    };
  },
  computed: {

  }
};
</script>

<style lang="scss">
.auth-layout {
  min-height: 100vh;
  background-color: var(--va-gray1Light);

  &__card {
    width: 100%;
    max-width: 600px;
  }
}

img {
  width: 420px;
  height: 160px;
  object-fit: cover;
  object-position: -2px;
}

</style>

<template>
  <va-dropdown
    class="profile-dropdown"
    v-model="isShown"
    boundary-body
    position="bottom"
    :offset="[0, 13]"
  >
    <template #anchor>
      <span class="profile-dropdown__anchor">
        <slot/>
        <va-icon
          class="px-2"
          :name="isShown ? 'angle_up' :'angle_down'"
          :color="theme.primary"
        />
      </span>
    </template>
    <va-dropdown-content class="profile-dropdown__content">
      <va-list-item>
        <router-link to="/admin/profile">Perfil</router-link>
        <span @click="logout()">Salir</span>


      </va-list-item>
    </va-dropdown-content>
  </va-dropdown>
</template>

<script>
import { useGlobalConfig } from 'vuestic-ui'
import Token from '@/config/token';
import { useStore } from 'vuex'

export default {
  name: 'profile-section',
  data () {
    return {
    isShown: false,
    $store:useStore()

    }
  },

  methods: {
    logout(){
      Token.destroy();
      this.$store.commit('logout');
      this.$router.push('/');


    },

  },
  computed: {
    theme() { return useGlobalConfig().getGlobalConfig() },
  }
}
</script>

<style lang="scss">

.profile-dropdown {
  cursor: pointer;

  .va-dropdown-popper__anchor {
    display: flex;
    justify-content: flex-end;
  }

  &__content {
    width: 8rem;
  }

  &__item {
    display: block;
    color: var(--va-gray);

    &:hover,
    &:active {
      color: var(--va-primary);
    }
  }

  .va-dropdown__anchor {
    display: inline-block;
  }
}
</style>

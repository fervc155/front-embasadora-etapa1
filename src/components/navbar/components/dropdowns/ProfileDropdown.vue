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
        <span to="/admin/profile">Perfil</span>
      </va-list-item>
      <va-list-item>
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
    color: var(--va-gray2Dark);

    &:hover,
    &:active {
      color: var(--va-primary);
    }
  }

}
.profile-dropdown__anchor:hover{
  color: var(--va-darkGreen);
}
.va-dropdown__content{
  position: relative;
  padding-left: 0;
  padding-right: 0;
  left: 0;
  display: block;
  min-width: 9rem;
  box-shadow: 0px 4px 7px -1px #ccc;
  background-color: var(--va-background);

  & .va-list-item{
    width: 100%;
    text-align: left;

    & .va-list-item__inner:hover{
      padding-left: 12px;
      border-left: 3px solid var(--va-secondary);
      transition: all 0.3s ease;
    }
    & .va-list-item__inner:active{
      background-color: var(--va-secondary);
      color: white;
    }

    & .va-list-item__inner span{
      width: 100%;
      color: var(--va-gray1Dark);
      &:hover{
        color: var(--va-primary);
      }
    }
  }
}
</style>

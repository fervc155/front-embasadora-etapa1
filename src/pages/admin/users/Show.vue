<template>
    <div class="mb-3">
  </div>

   
  <va-card>
    <va-card-title>Informacion del usuario</va-card-title>
    <va-card-content>
         <va-chip v-if="CanI('users.edit')" class="mb-2 mr-2" :to="editUrl" color="primary">Editar</va-chip>
        {{user}}
    </va-card-content>
  </va-card>
</template>

<script>
import {authAxios} from '@/config/axios';
import {AmI} from '@/config/capabilities';
import Token from '@/config/token';
import {CanI} from '@/config/capabilities';

export default {
  name: 'show',
  data () {
    return {
      CanI,
      user:{}
    }
  },

  computed:{

    editUrl(){
      if(this.user.id!=undefined)
        return '/admin/usuarios/editar/'+this.user.id;
      else
        return '';
    }


  },
  mounted(){

    authAxios.get('/users/'+this.$route.params.id).then((res)=>{
      this.user= res.data.data;
    }).catch(error=>{
      console.error(error);
    })

  },
  methods: {

  }
}
	
</script>

<style>
	
</style>
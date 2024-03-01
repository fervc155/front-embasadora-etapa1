<template>
    <div class="mb-3">
    <va-chip to="/admin/clientes">Volver</va-chip>
  </div>

  <va-card>
    <va-card-title>Editar cliente</va-card-title>
    <va-card-content>
     
     <form-client v-bind:client="client" />
    <va-button size="medium"   v-on:click="submit()" class="mr-4 mt-4">Guardar cliente</va-button>

    </va-card-content>
  </va-card>
</template>

<script>
import {authAxios,errorAxios} from '@/config/axios';
import FormClient from '@/pages/admin/etapa1/clients/FormClient.vue';
import Swal from 'sweetalert2';


export default {
  name: 'edit',
  components:{FormClient},
  data () {
    return {
      client:{
        name:'',
        email:'',
        whatsapp:'',
        phone:'',
        social_networks:{

        }
      }
    }
  },
  mounted(){
    authAxios.get('/clients/'+this.$route.params.id).then((res)=>{

      let client = res.data.data;
      client.social_networks = client.social_networks==null? {}:  JSON.parse(client.social_networks);
      this.client= client;

    
    }).catch(error=>{errorAxios.catch(this,error)})

  },
  methods: {
        submit(){

        Swal.fire({
          title: 'Guardar cliente',
          showDenyButton: true,
          confirmButtonText: 'Guardar',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
         
            let client = JSON.parse(JSON.stringify(this.client));
            client.social_networks = JSON.stringify(client.social_networks);    
            authAxios.put('/clients/'+this.client.id,client).then((res)=>{
              return this.$router.push({ name: 'clientes' })
        
            }).catch(error=>{errorAxios.catch(this,error)})
      } 
    })

  }
}
}
	
</script>

<style>
	
</style>
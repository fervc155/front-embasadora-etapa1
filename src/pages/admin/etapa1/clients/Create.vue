<template >
  <div v-if="answer==null" class="mb-3">
    <va-chip to="/admin/clientes">Volver</va-chip>
  </div>

  <va-card>
    <va-card-title>Crear cliente</va-card-title>
  <va-card-content>
    <form-client v-bind:client="client" />

    <va-button size="medium"   v-on:click="submit()" class="mr-4 mt-4">Guardar cliente</va-button>
    </va-card-content>
  </va-card>
</template>
<script>

import {authAxios} from '@/config/axios';
import Swal from 'sweetalert2';
import {print_error_validate,error_500} from '@/helpers';
import FormClient from '@/pages/admin/etapa1/clients/FormClient.vue';
export default {
  name: 'create',

  props:['answer'],
  components: {
    FormClient,
  },
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

  mounted () {
    if(this.answer!=null){
      this.client.name = this.answer.answers.group_information.content.name.answer;
      this.client.email = this.answer.answers.group_information.content.email.answer;
      this.client.whatsapp = this.answer.answers.group_information.content.whatsapp.answer;
      this.client.phone = this.answer.answers.group_information.content.phone.answer;

      let facebook_company = this.answer.answers.group_information.content.facebook_company.answer;

      if(facebook_company.trim().length>1)
        this.client.social_networks['facebook'] = facebook_company;


      let instagram_company = this.answer.answers.group_information.content.instagram_company.answer;

      if(instagram_company.trim().length>1)
        this.client.social_networks['instagram'] = instagram_company;


    }

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
            authAxios.post('/clients',client).then((res)=>{
              if(answer==null)
                return this.$router.push({ name: 'clientes' })
              else{
                this.client ={name:'',email:'',whatsapp:'',phone:'', social_networks:{}}
                this.$emit('new-user',res.data.data);
              }
        
            }).catch((error)=>{
              if(error.response.status==422){
                print_error_validate(error,this);
                return;
              }

              error_500(this);
              })
          }
        })  
      } 
    }
}
  
</script>

<style>

</style>
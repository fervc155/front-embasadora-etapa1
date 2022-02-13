<template>
    <h3>Informacion general</h3>

    <div class="row">
      <div class="flex md6 ">
        <va-input  v-model="client.name" type="text" label="Nombre"/>
      </div>

      <div class="flex md6 ">     
        <va-input type="email" v-model="client.email"  label="Email"/>
      </div>

      <div class="flex md6 ">     
        <va-input type="number" v-model="client.whatsapp"  label="Whatsapp"/>
      </div>

      <div class="flex md6 ">     
        <va-input  type="number" v-model="client.phone"  label="Telefono"/>
      </div>
      <div class="flex md6 ">     
        <va-input v-model="client.company"  label="Empresa"/>
      </div>
    </div>
    <h3>Redes sociales</h3>
    <div class="row" >
      <div class="flex md5">     
        <va-input  type="text" v-model="key"  label="Red social"/>
      </div>
        <div class="flex md5">     
        <va-input  type="text"  v-model="value" label="Link"/>
      </div>
      <div class="flex md2">
        <va-button :disabled="key.length<1 || value.length<1" @click="addSocialNetwork()">Agregar</va-button>
      </div>
    </div>
     <div class="va-table-responsive">
    <table class="va-table w-100">
      <thead>
        <tr>
          <th>Red social</th>
          <th>Link</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr  v-for="network in Object.keys(client.social_networks)">
          <td>{{network}}</td>
          <td> {{client.social_networks[network]}}</td>
          <td @click="removeSocialNetwork(network)" class="pointer"><va-icon  color="danger" name="trash"/></td>
        </tr>
      </tbody>
    </table>
  </div>


</template>

<script>


export default {
  name: 'form-client',

  props:['client'],
  components: {
  },
  data () {
    return {
      key:'',
      value:'',
    }
  },

  mounted () {
   
  },
  methods: {

    removeSocialNetwork(network){
      delete this.client.social_networks[network];
    },

    addSocialNetwork(){
      if(this.key.trim()=='' || this.value.trim()=='')
        return;
      this.client.social_networks[this.key.toLowerCase()]=this.value.toLowerCase();
      this.key=this.value='';
    },
}}
  
</script>

<style>

</style>
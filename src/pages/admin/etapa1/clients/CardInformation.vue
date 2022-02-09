<template>
    <va-card>
    <va-card-title>Detalle del cliente</va-card-title>
    <va-card-content v-if="client!=null">
    <h1>{{client.name}}</h1>
    <h3>{{client.email}}</h3>
    <h3>{{client.whatspp}}</h3>
    <h3>{{client.phone}}</h3>
    <h3>{{client.social_networks}}</h3>
    </va-card-content>
 
  </va-card>
</template>

<script>
    export default {
  name: 'card-information',
  props:['client'],
  data () {
    return {}
  },
  mounted(){},
  methods: {

  }
}
</script>
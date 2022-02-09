<template>
  <poll-loop :show="show" :edit="edit"  v-bind:questions="questions" />    

  
</template>

<script>
import PollLoop from '@/components/poll-builder/PollLoop.vue';


export default {
  name: "poll-builder",
  props: ['questions','show','edit'],
  components:{
    PollLoop
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
	
</script>

<style>
	  .border-gray{
    border:1px solid #b7b7b7 !important;
  } 
</style>
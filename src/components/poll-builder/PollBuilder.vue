<template>
  <poll-loop :show="show" :edit="edit"  @prev="changeDisplay($event)" @next="changeDisplay($event)" :display="display" v-bind:questions="questions" />    

  
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
      display:0,
    }
  },
  methods: {
    changeDisplay(e){
      this.display=e;
    }

  }
}
	
</script>

<style>
	  .border-gray{
    border:1px solid #b7b7b7 !important;
  } 
</style>
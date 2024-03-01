<template>
   <va-select  class="mb-1"
   v-if="!show" 
      :name="data.key"
      :options="data.options"
      :label="data.label"
      multiple
      v-model="answer"
      :input="onchange()"

    />

  <poll-answer v-if="show" :data="data"></poll-answer>
 


</template>

<script>
import PollAnswer from '@/components/poll-builder/PollAnswer.vue';

export default {
  name: "poll-check",
  props: ['data','show','edit'],
   components:{PollAnswer}, 
  data () {
    if(this.edit)
      return {
        answer:this.data.answer,
      }
    else  
      return {
        answer:'',
      }
  },
  methods: {
     onchange(){
      this.data.answer=this.answer;
    }


  }
}
	
</script>

<style>
  .border-gray{
    border:1px solid #b7b7b7 !important;
  }	
</style>
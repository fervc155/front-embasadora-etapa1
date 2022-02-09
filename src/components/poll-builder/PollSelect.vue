<template>
    <va-select
     v-if="!show"
      v-model="answer"
      class="mb-4 border-gray"
      :label="data.label"
      :options="data.options"
      :input="onchange()"
    />
  <poll-answer v-if="show" :data="data"></poll-answer>

 


</template>
<script>
import PollAnswer from '@/components/poll-builder/PollAnswer.vue';

export default {
  name: "poll-select",
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
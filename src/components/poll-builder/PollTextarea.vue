<template>
  <va-input  v-if="!show"  :input="onchange()" v-model="answer" class="mb-4 border-gray" :label="data.label" placeholder="..." type="textarea" autosize/>

  <poll-answer v-if="show" :data="data"></poll-answer>

 

</template>


<script>
 
import PollAnswer from '@/components/poll-builder/PollAnswer.vue';

 
export default {
  name: "poll-textarea",
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
  mounted(){
    if(!this.edit)
      this.data.answer=this.data.answer||'-';
    
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
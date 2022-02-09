<template>  


   <div v-for="question in questions">
    <poll-group :show="show" :edit="edit" v-if="question.type=='group'" v-bind:data="question" />


    <hr>
  </div>
</template>

<script>
import PollGroup from '@/components/poll-builder/PollGroup.vue';
import PollText from '@/components/poll-builder/PollText.vue';


export default {
  props: ['questions','show','edit'],
  components:{
    PollGroup,
    PollText
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
	
</style>
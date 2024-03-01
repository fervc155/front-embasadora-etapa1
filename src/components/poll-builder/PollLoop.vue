<template>  
   <div v-for="(question,key,index) in questions">
    <div  :class="(index==display)?'':'d-none'" >
    <poll-group  :show="show" :edit="edit"  v-bind:data="question" />
      <div class="align-end"> 
       <va-button v-if="index>0" @click="prev()" color="secondary">Anterior</va-button><va-button v-if="index<Object.keys(questions).length-1"  @click="next()" class="ml-2">Siguiente</va-button>
      </div>
    </div>
  </div>
</template>

<script>
import PollGroup from '@/components/poll-builder/PollGroup.vue';
import PollText from '@/components/poll-builder/PollText.vue';


export default {
  props: ['questions','show','edit','display'],
  components:{
    PollGroup,
    PollText
  },
  data () {
    return {

    }
  },
  methods: {
    prev(){
       this.$emit('prev',this.display-1)
    },  
    next(){
       this.$emit('next',this.display+1)
    }
  }
}
	
</script>

<style>
  .align-end{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }
	
  .d-none{
    display: none;
  }
</style>
<template >

  <div class="row">  
    <h2 class="flex md12 text-capitalize">{{data.label}}</h2>
  </div>
  <div class=" row">
    
  <div class="flex md6" v-for="question in data.content">
    <poll-text  :show="show" :edit="edit" v-if="question.type=='text'"  v-bind:data="question" />
    <poll-number  :show="show" :edit="edit" v-if="question.type=='number'"  v-bind:data="question" />
    <poll-select :show="show" :edit="edit"  v-if="question.type=='radio'"  v-bind:data="question" />
    <poll-textarea :show="show" :edit="edit"  v-if="question.type=='textarea'"  v-bind:data="question" />
    <poll-check :show="show" :edit="edit"  v-if="question.type=='check'"  v-bind:data="question" />
    
  </div>

  </div>
</template>
<script>

import PollText from '@/components/poll-builder/PollText.vue';
import PollNumber from '@/components/poll-builder/PollNumber.vue';
import PollSelect from '@/components/poll-builder/PollSelect.vue';
import PollTextarea from '@/components/poll-builder/PollTextarea.vue';
import PollCheck from '@/components/poll-builder/PollCheck.vue';
export default {
  name: "poll-group",

  components:{
    PollText,
    PollCheck,
    PollTextarea,
    PollSelect,
    PollNumber
  },
  props: ['data','show','edit'],
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
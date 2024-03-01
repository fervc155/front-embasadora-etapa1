<template>
  <div  v-if="data.answer!=null">
    <p class="question">{{data.label}}</p>
    <p class="answer">R= {{data.answer}}</p>
  </div>

</template>


<script>

export default {
  name: "poll-answer",
  props: ['data'],
  data () {
    return {
    }
  }
}
	
</script>

<style>
  .question{
    color: var(--va-primary);
    font-weight: bold;
    font-size: 18px;
  }
</style>
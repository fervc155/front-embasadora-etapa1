<template>
  <div  v-if="data.answer!=null">
    <p class="lead">{{data.label}}</p>
    <p>R= {{data.answer}}</p>
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
  .border-gray{
    border:1px solid #b7b7b7 !important;
  }	
</style>
<template>
   <va-tabs v-model="model"
  >
    <template #tabs>
      <va-tab
        v-for="title in tabs"
        :name="title"
        :key="title"
      >
        {{ title }}
      </va-tab>
    </template>
  </va-tabs>
</template>


<script >
  export default {
  name: 'tabs',
  props:['tabs'],
  data () {
    return {
      model:this.tabs[0]
    }
  },
  watch:{
    model(val){
      this.$emit('active',val);
    }
  }
}

</script>
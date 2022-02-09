<template>
  <span v-if="show">
    <router-link :to="show+id">
      <va-icon
        name="eye"
        color="primary"
        class="mr-4"
      />
    </router-link>
  </span>

  <span v-if="edit">
    <router-link :to="edit+id">
      <va-icon
        name="pencil"
        color="success"
        class="mr-4"
      />
    </router-link>
  </span>

  <span v-if="drop"  v-on:click="drop(id)">
    <va-icon
      name="trash"
      color="danger"
      class="mr-4"

    />
 
  </span>

  <span v-if="download"  v-on:click="onDownload(id)">
    <va-icon
      name="download"
      color="success"
      class="mr-4"

    />
  </span>

</template>

<script>
import {Open} from '@/config/axios';
import FileSaver from 'file-saver';

export default {
  name: 'data-table',
  props:['id','show','edit',"drop",'download'],
  data () {
    return {
      filter:'',
    }
  },

  methods: {
    onDownload(id){
     Open('quotes/'+this.id+'/download');
    }

  }
  

}
	
</script>

<style>
	span{
    cursor: pointer !important;
    transition: all 0.3s ease;
  }
  span:hover{
    transform: scale(1.01);
  }
</style>
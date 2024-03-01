<template>
  <span v-if="show">
    <router-link :to="'/admin/'+show+id">
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
import {downloadAxios} from '@/config/axios';
import download from 'downloadjs'

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
     downloadAxios.get('quotes/'+this.id+'/download').then(res=>{
        const content = res.headers['content-type'];
           download(res.data,'Cotizacion curioso', content)
     });
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
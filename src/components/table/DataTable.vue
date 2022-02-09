<template>
  <va-input
    class="flex mb-2 md6"
    placeholder="Buscar..."
    v-model="filter"
  />

  <va-data-table 
    no-data-html="No hay resultados"
    no-data-filtered-html="No hay resultados"
    :filter="filter"
    :items="items" 
    :per-page="perPage"
    :current-page="currentPage"
  >

    <template #cell(Opciones)="{ source: id }">
       <table-options :id="id"  :download="download" :show="show"  :edit="edit"  :drop="drop"></table-options>
    </template>


  </va-data-table>
    <center class="mt-3 table-example--pagination">
        <va-pagination
          v-model="currentPage"
          input
          :pages="pages"
        />
      </center>

 

</template>

<script>
import authAxios from '@/config/axios';
import TableOptions from '@/components/table/TableOptions.vue';

 
export default {
  name: 'data-table',
  props:['items','show','edit','drop','download'],
  components:{TableOptions},
  data () {
    return {
      filter:'',
      perPage:5,
      currentPage:1,
    }
  },

  methods: {

  },
  computed:{
    pages () {
      return (this.perPage && this.perPage !== 0)
        ? Math.ceil(this.items.length / this.perPage)
        : this.items.length
    },
  }

  

}
	
</script>

<style>
	
</style>
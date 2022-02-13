<template>
  <div class="row">    
    <div class="flex  mb-2 md6">
      <va-input placeholder="Buscar..." label="Buscar" v-model="filter" />    
    </div>
    <div class="flex  mb-2 md4">
      <va-select
        placeholder="Selecciona"
        v-model="sortBy"
        label="Ordenar por"
        :options="sortByOptions"
      />
    </div>
    <div class="flex  mb-2 md2">
      <va-select
        placeholder="Selecciona"
        v-model="sortOrder"
        label="Direccion"
        :options="sortOrderOptions"
      />
    </div>    
  </div>



  <va-data-table 
    no-data-html="No hay resultados"
    no-data-filtered-html="No hay resultados"
    v-model:sort-by="sortBy"
    v-model:sorting-order="sortOrder"
    :filter="filter"
    :items="elements" 
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
      sortBy:'',
      sortOrder:'',
      sortOrderOptions:['asc','desc'],
      sortByEmitted: '',
      sortingOrderEmitted: '',
      sortedRowsEmitted: [],

    }
  },

  methods: {

  },
  computed:{
    elements(){


      if(this.sortBy=='' || this.sortOrder=='')
        return this.items;

      let collection = JSON.parse(JSON.stringify(this.items));

      if(this.sortOrder=='asc')
        collection = collection.sort((e)=>(e[this.sortBy]));
      else
        collection = collection.reverse((e)=>(e[this.sortBy]));

      return collection;
    },
    pages () {
      return (this.perPage && this.perPage !== 0)
        ? Math.ceil(this.items.length / this.perPage)
        : this.items.length
    },
    sortByOptions(){
      if(this.items.length==0)
        return [];

      return Object.keys(this.items[0]).filter(columna=>(columna!='Opciones'))
    }
  }

  

}
	
</script>

<style>
	
</style>
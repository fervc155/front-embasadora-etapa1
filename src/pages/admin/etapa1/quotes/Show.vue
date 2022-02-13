<template>
  <va-card>
    <va-card-title>Estatus</va-card-title>
    <va-card-content>
      <va-slider
      v-model="progress"
      :color="colorBar"
      disabled
      />
      

      <h2>Estatus actual: {{currentStatus}}</h2>

      <div v-if="this.quote.quote_status_id<5">

        <p>Siguiente status: {{nextStatusLegend}} </p>
        <va-button @click="nextStatus()">Siguiente status</va-button>
        <va-button color="success" @click="complete()">Aprobada</va-button>
        <va-button color="danger" @click="cancell()">Cancelar</va-button>
      </div>


    </va-card-content>


  </va-card>

  <va-card  v-if="this.quote.quote_status_id==6 && this.quote.client_id==null">
    <va-card-title>Seleccionar cliente</va-card-title>
    <va-card-content>       
      <div class="row">

        <va-select class="flex md6" 
        label="Selecciona un cliente" v-model="client"  :options="clients" />
        <div class="flex md6">
         <va-button @click="showModal = !showModal">
          Crear cliente
        </va-button>
        <va-modal
        v-model="showModal"
        hide-default-actions
        overlay-opacity="0.2"
        >

        <slot>
          <create @new-user="addNewUser($event)"  :answer="quote.answer" :modal="true" />
        </slot>


      </va-modal>
    </div>
  </div>
  <va-button  @click="setClient()">Guardar</va-button>

</va-card-content>
</va-card>

<card-information v-if="quote.client!=null" :client="quote.client" />


<va-card>
 <va-card-title>Informacion de la cotizacion</va-card-title>
 <va-card-content>

   {{quote.client_name}}
   {{quote.title}}
   {{quote.start_validity}}
   {{quote.end_validity}}
   {{quote.email}}
   {{quote.phone}}

   <div class="va-table-responsive  mb-5">
    <table class="va-table w-100">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Contenido</th>
          <th>Piezas</th>
          <th>Precio unitario</th>
          <th>Iva (si incluye)</th>
          <th>subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr  v-for="(product_quote,index) in (quote.content)">
          <td><h2>{{product_quote.name}}</h2><p>{{product_quote.ingredients}}</p></td>
          <td>{{product_quote.unit_amount}}{{product_quote.unit}}</td>
          <td>{{product_quote.count}}</td>
          <td>${{product_quote.price}}</td>
          <td>${{product_quote.total * product_quote.iva / 100}}</td>
          <td>${{product_quote.total}}</td>
        </tr>
        <tr><td></td><td></td><td></td><td></td><td>IVA: <span class="iva">${{iva}}</span></td><td>Total: <span class="total">${{total}}</span>{{quote.currency}}</td></tr>
        <tr v-if="quote.content.length==0"><td>Sin contenido</td></tr>
      </tbody>
    </table>
  </div>


</va-card-content>
</va-card>
</template>




<script>
  import {authAxios} from '@/config/axios';
  import Swal from 'sweetalert2';
  import {print_error_validate,error_500} from '@/helpers';
  import Create from '@/pages/admin/etapa1/clients/Create.vue';
  import {for_select} from '@/helpers';
  import CardInformation from '@/pages/admin/etapa1/clients/CardInformation.vue';


  export default {
    name: 'show',
    components: {
      Create,
      CardInformation

    },
    data () {
      return {
        quote:{status:{name:''},content:[]},
        currentStatus:'',
        clients:[],
        client:{id:-1},
        showModal:false,
      }
    },
    mounted () {
      authAxios.get('/quotes/'+this.$route.params.id).then((res)=>{

       let quote = res.data.data;
       quote.content = JSON.parse(quote.content);

       let answer = quote.answer;
       answer.answers = JSON.parse(answer.answers);
       quote.answer= answer;

       this.currentStatus=quote.status.name;
       this.quote = quote;

       this.getClients();


     }).catch(error=>{
      console.error(error);
    })



   },

   computed:{    
    total : function(){
      let total =0;
      this.quote.content.map((product)=>{
        total+=Number(product.price);
      })

      return total;
    },
    iva : function(){
      let iva =0;
      this.quote.content.map((product)=>{
        iva+=Number(product.price * (product.iva/100));
      })

      return iva;
    },
    nextStatusLegend(){
      if(this.quote.quote_status_id!=undefined){
        switch(this.quote.quote_status_id){
          case 1: return 'Primera llamada';
          case 2: return 'Segunda llamada';
          case 3: return 'Tercera llamada';
          case 4: return 'Cancelado';
        }
      }

      return ''

    },
    colorBar(){
      if(this.quote.quote_status_id!=undefined){
        switch(this.quote.quote_status_id){
          case 1: 
          case 2:  
          case 3:  
          case 4: return 'primary';
          case 5: return 'danger';
          case 6: return 'info';
        }
      }

      return 'primary'
    },
    progress(){
      if(this.quote.quote_status_id!=undefined){
        return (100/5) * this.quote.quote_status_id;
      }

      return 0;
    }

  },
  methods: {
    getClients(){
     if(this.quote.quote_status_id==6 && this.quote.client_id==null){
      authAxios.get('clients').then((res)=>{
        this.clients= for_select(res.data.data);
        console.log(this.clients);
      })
    }
  },
  nextStatus(){
   Swal.fire({
    title: 'Confirmar',
    showDenyButton: true,
    confirmButtonText: 'Confirmar',
    denyButtonText: `No`,
  }).then((result) => {
    if (result.isConfirmed) {

      let next = this.quote.quote_status_id*1+1;
      authAxios.post('/quotes/'+this.quote.id+'/status/'+next).then((res)=>{
        this.quote = res.data.data;
        this.currentStatus=this.quote.status.name;

        Swal.fire('Exito','Status cambiado correctamente','success');
      }).catch(error=>{
        console.error(error);
      })
    }
  })
},
complete(){
 Swal.fire({
  title: 'Marcar como aprobada',
  showDenyButton: true,
  confirmButtonText: 'Aprobar',
  denyButtonText: `No`,
}).then((result) => {
  if (result.isConfirmed) {

    let next ='6';
    authAxios.post('/quotes/'+this.quote.id+'/status/'+next).then((res)=>{
      this.quote = res.data.data;
      this.currentStatus=this.quote.status.name;

      this.getClients();

      Swal.fire('Exito','Status cambiado correctamente','success');
    }).catch(error=>{
      console.error(error);
    })
  }
})
},
cancell(){
 Swal.fire({
  title: 'Marcar como cancelada',
  showDenyButton: true,
  confirmButtonText: 'Cancelar cotizacion',
  denyButtonText: `No`,
}).then((result) => {
  if (result.isConfirmed) {

    let next ='5';
    authAxios.post('/quotes/'+this.quote.id+'/status/'+next).then((res)=>{
      this.quote = res.data.data;
      this.currentStatus=this.quote.status.name;

      Swal.fire('Exito','Status cambiado correctamente','success');
    }).catch(error=>{
      console.error(error);
    })
  }
})
},

addNewUser(data){
  let newUser ={
    id:data.id,
    text:data.name,
    value:data
  }
  this.clients=[
  newUser,
  ...this.clients        
  ];
  this.client= newUser;
  this.showModal=false;
},

setClient(){
  if(this.client.id>0){
    let data ={
      client_id:this.client.id
    };
    authAxios.put('/quotes/'+this.quote.id,data).then((res)=>{
      this.quote = res.data.data;
      Swal.fire('Exito','Cliente asignado correctamente','success');

    }).catch(error=>{
      console.error(error);
    })
  }
}

},

}




</script>

<style>
  .va-slider--disabled{
    opacity: 1 !important;
  }
    .total{
    font-size: 30px;
    font-weight: bold;
  }
</style>
<template>
   <div class="mb-3">
    <va-chip to="/admin/cotizaciones">Volver</va-chip>
  </div>

  <va-card>
   <va-card-title>Crear cotizacion</va-card-title>
   <va-card-content>
     <va-input class="mb-4" type="textarea" autosize v-model="quote.header" label="Encabezado" />

     <div class="row">
      <div class="flex md9">
        <va-input class="mb-4"   v-model="quote.title" label="Titulo de la cotizacion" />
      </div>
      <div class="flex md3">
        <va-select :options="currencies" class="mb-4"   v-model="quote.currency" label="Moneda divisa" />
      </div>
      <div class="flex md6">

       <va-input   v-model="quote.client_name" label="Nombre del cliente" />
     </div>
     <div class="flex md6">

       <va-input  type="email"  v-model="quote.email" label="Email de destino" />
     </div>
      <div class="flex md6">
       <va-input  type="number"  v-model="quote.phone" label="Telefono" />
     </div>
     <div class="flex md6">
      <va-input class="mb-4" type="date"  v-model="quote.start_validity" label="Comienzo Fecha de validez" />

    </div>

    <div class="flex md6">
      <va-input class="mb-4" type="date"  v-model="quote.end_validity" label="Fin Fecha de validez" />
    </div>
  </div>

  <hr/>


  <div class="row">
    <div class="flex md6">
      <va-input class="" v-model="product.name" label="Nombre del Producto" />
    </div>
    <div class="flex md3">
      <va-input class="" type="number"  v-model="product.price" label="Precio del producto" />
    </div>
    <div class="flex md3">
      <va-input class="" type="number"  v-model="product.count" label="Piezas" />
    </div>
    <div class="flex md12">
      <va-input class="" v-model="product.ingredients" label="Ingredientes" type="textarea" />
    </div>
    <div class="flex md6">
      <va-select :options="units" class="" v-model="product.unit" label="Unidad de medida" />
    </div>
    <div class="flex md3">
      <va-input type="number" class="" v-model="product.unit_amount" label="Cantidad" />
    </div>
    <div class="flex md3">
      <va-input class="" v-model="product.iva" label="Iva (si incluye)" />
    </div>  
  </div>
  <div class="text-right">
    <va-button @click="addProduct()" >Agregar producto</va-button>

  </div>
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
          <td  class="pointer">
            <va-icon @click="editProduct(index)"  color="primary" name="pencil"/>
            <va-icon @click="removeProduct(index)"  color="danger" name="trash"/></td>
          </tr>
          <tr><td></td><td></td><td></td><td></td><td>IVA: <span class="iva">${{iva}}</span></td><td>Total: <span class="total">${{total}}</span>{{quote.currency}}</td></tr>
          <tr v-if="quote.content.length==0"><td>Sin contenido</td></tr>
        </tbody>
      </table>
    </div>
    <va-input class="mb-4" type="textarea" autosize v-model="quote.first_footer" label="Primer pie de pagina" />
    <va-input class="mb-4" type="textarea" autosize v-model="quote.second_footer" label="Segundo pie de pagina" />


    <va-button :loading="loading" @click="submit()">Crear cotizacion</va-button>
  </va-card-content>
</va-card>
</template>


<script>
  import {authAxios,errorAxios} from '@/config/axios';
  import Swal from 'sweetalert2';

  import VaMediumEditor from '@/components/va-medium-editor/va-medium-editor'

  
  export default {
    name: 'create',
    components: {
      VaMediumEditor
    },
    data () {
      return {
        loading:false,
        units:['L','ml',"Kgs",'Gr',"M","Cm","Mm",'Oz','Lbs',"In"],
        currencies:["MXN","COP","USD","EUR"],
        quote:{header:'Formulabs | RFC: SOCM741122SJ7 AV. DEL SOL MZA 3, SMZA 45, LTE 9 CANCÚNQ. ROO MÉXICO CP: 77506',
        start_validity:'',
        end_validity:'',
        client:'',
        email:'',
        currency:'MXN',
        title:'',
        first_footer:"Para iniciar la producción se requiere un 60% de anticipo sobre el costo total del pedido. Incluye formulación personalizada. En el apartado de cantidades, son las mínimas a solicitar. No incluye IVA y envío. Incluye Tamizaje, Certificado de Bioseguridad",
        second_footer:"Contamos con 3, 6 y hasta 12 MSI. Aplica únicamente con tarjeta de crédito, Visa y Master Card",
        content:[],

      },
      new_product:{name:'',count:1,price:"",iva:16,ingredients:'',unit:'',unit_amount:''},
      product:{},

      editor:{},
    }
  },
  mounted () {
    this.product= JSON.parse(JSON.stringify(this.new_product));
    let answer_id = this.$route.params.answer_id;
    if(answer_id>0){

      authAxios.get('answers/'+answer_id).then(res=>{
        res= res.data.data;
        let answers= JSON.parse(res.answers)

        this.quote.answer_id = res.id;
        this.quote.client_name = answers.group_information.content.name.answer;
        this.quote.email = answers.group_information.content.email.answer;
        this.quote.phone = answers.group_information.content.phone.answer;
      }).catch(error=>{errorAxios.catch(this,error)})
    }

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
    }
  },
  methods: {

    addProduct(){
      let isValid=true;

      for(let k in this.product){
        if(k=='iva'){
          continue;
        }
        if(this.product[k].toString().trim()=="" || this.product[k].toString().trim()=="0"){
          console.log(this.product[k],k)
          isValid=false;
        }
      }
      if(isValid){
        this.product.total = this.product.price * this.product.count;

      let find=false;
      this.quote.content =this.quote.content.map((product)=>{
        if(product.name == this.product.name)
        {
          product = this.product;
          find=true;
        }

        return product;
      })


      if(!find){
        this.quote.content.push(this.product);
      }
      this.product= JSON.parse(JSON.stringify(this.new_product));

    }
  },

  removeProduct(index){

    this.quote.content =this.quote.content.filter((product,i)=>{
      return i!=index;

    })

  },
  editProduct(index){
    this.product =JSON.parse(JSON.stringify(this.quote.content[index]));
  },

  submit(){
    this.loading=true;
    let quote = JSON.parse(JSON.stringify(this.quote))
    quote.content = JSON.stringify(quote.content);
    console.log(quote)
    authAxios.post('/quotes',quote).then((res)=>{
      return this.$router.push({ name: 'cotizaciones' })
      this.loading=false;
    }).catch(error=>{errorAxios.catch(this,error)})
  }

},
}




</script>

<style>
  .total{
    font-size: 30px;
    font-weight: bold;
  }
</style>
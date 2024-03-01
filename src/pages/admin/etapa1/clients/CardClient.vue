<template>
    <va-card v-if="client!=null">   
        <va-card-title>Cliente</va-card-title>   
        <va-card-content>


            <div class="user-info">
                <va-icon name="fa fa-user-o"/> 
                <span class="subtitle">Nombre</span> 
                {{client.name}}
            </div>
            <div class="user-info"> 
                <va-icon name="fa fa-envelope-o"/> 
                <span class="subtitle">Correo</span> 
                {{client.email}}
            </div>
            <div class="user-info"> 
                <va-icon name="fa fa-phone"/> 
                <span class="subtitle">Telefono</span> 
                {{client.phone}}
            </div>
            <div class="user-info"> 
                <va-icon name="fa fa-whatsapp"/> 
                <span class="subtitle">Whatsapp</span> 
                {{client.whatsapp}}
            </div>

            <h3>Redes sociales</h3>

            <div class="row">
               <div   v-for="(network,name) in networks ">

                  <div @click="open(network)" class="network">
                    <span  class="icon"><va-icon :name="'fa fa-'+name"/></span>
                    <span>{{name}}</span>
                </div>
            </div>
        </div>
        



    </va-card-content>  </va-card>
</template>

<script>


    export default {
        name: 'card-client', 
        props:['client'],

      
        methods:{
            open(url){
                window.open(url)
            }
        },
        computed:{
        networks(){
            let net={}
            if(this.client!=null){
              net =  this.client.social_networks;
              if(typeof net =='string')
                net = JSON.parse(net);
            }
            return net;    
        
        }

    } }

</script>

<style>

    .subtitle{
        font-weight: bold;
        display: inline-block;
        margin:0rem 1rem;
    }

    .user-info{
        display: flex;
        margin-bottom: 10px;
    }




  .button{
    border-radius: 100px;
    background: var(--va-info);
    padding: 6px 1rem;
    color: white;
    cursor: pointer;
    font-size: 12px;
  }

  .network{
   border: 1px solid gray;
   border-radius: 4px;
   padding: 8px 16px;
   display: inline-block;
   margin: 6px;
   text-transform: capitalize;
   font-size: 14px;
   cursor: pointer;
  }

  .icon i{
    padding-right:6px; 
    font-size: 14px !important;
  }

  h3{
    align-items: center;
    margin: 1rem 0px;
    display: flex;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .6px;
    line-height: 1.2;
    text-transform: uppercase;
  }

</style>
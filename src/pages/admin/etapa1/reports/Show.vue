<template>
  <va-card id="content" ref="content">
    <va-card-title>
      Resumen de la etapa1
    </va-card-title>
    <va-card-content>
      <div class="row">
        <div class="flex md6">
          <va-date-input
            class="mb-4"
            label="Fecha de inicio"
            v-model="startDate"
          />
        </div>
        <div class="flex md6">
          <va-date-input
            class="mb-4"
            label="Fecha de fin"
            v-model="endDate"
          />
        </div>
      </div>

      
   <div class="group">
 
     <div class="flex md12">
      <h5>Cuestionarios</h5>
        <table class="va-table">
          <thead>
            <tr>
              <th>Respondidos</th>
              <th>Aún en observacion</th>
              <th>Curiosos</th>
              <th>Potenciales</th>
            </tr>
          </thead>
            <tbody>
              <tr>
                <td>{{report.answers_created}}</td>
                <td>{{report.answers_observation}}</td>
                <td>{{report.answers_curious}}</td>
                <td>{{report.answers_potential}}</td>

              </tr>
            </tbody>

        </table>
     </div>
   </div>
  <div class="group">

     <div class="flex md12">
        <h5>Cotizaciones a curiosos</h5>
         <table class="va-table">
              <thead>
                <tr>
                  <th>Creados</th>
                  <th>Aún sin llamar</th>
                  <th>Primera llamada</th>
                  <th>Segunda llamada</th>
                  <th>Tercera llamada</th>
                  <th>Aprobados</th>
                  <th>Cancelados</th>
                </tr>
              </thead>
                <tbody>
                  <tr>
                    <td>{{report.quotes_created}}</td>
                    <td>{{report.quotes_email}}</td>
                    <td>{{report.quotes_first_call}}</td>
                    <td>{{report.quotes_second_call}}</td>
                    <td>{{report.quotes_third_call}}</td>
                    <td>{{report.quotes_approved}}</td>
                    <td>{{report.quotes_cancelled}}</td>


                  </tr>
                </tbody>

            </table>
     </div>
   </div>
   <div class="group">
     <div class="flex md12">
        <h5>Citas</h5>
            <table class="va-table">
              <thead>
                <tr>
                  <th>Creadas</th>
                  <th>Agendadas/Atendidas</th>

                </tr>
              </thead>
                <tbody>
                  <tr>
                    <td>{{report.appointments_created}}</td>
                    <td>{{report.appointments_scheduled}}</td>

                  </tr>
                </tbody>

            </table>

     </div>
   </div>
      <div class="group">
     <div class="flex md2">
       <h5>Clientes registrados {{report.clients}}</h5>
       
     </div>
      
   </div>

        <va-input
            class="mb-4"
            v-model="comments"
            type="textarea"
            label="Comentarios"
            autosize
          />

    </va-card-content>
 </va-card>


              <va-button @click="download()" >Descargar en pdf</va-button>

</template>



<script>
  import {reportsApi,errorAxios} from '@/api/index';
  import moment from 'moment'
import download from 'downloadjs'

  export default {
    name: 'show',
    components: {
         
    },
    data () {
      return {
        startDate:'',
        endDate:'',
        report:{},       
        comments:''

        
      }
    },
    mounted () {
          
    },

    watch:{

        startDate(val){
          this.makeReport()
        },
        endDate(val){
           this.makeReport()
         
        }
    },

    methods:{
      download(){
        reportsApi.firstDownload(this.startDate,this.endDate,this.comments).then(res=>
        {
           const content = res.headers['content-type'];
           download(res.data,'Reporte etapa 1', content)
        })
      },
      makeReport(){
        if(this.startDate!='' && this.startDate!=''){
          if(this.startDate<this.endDate){
            reportsApi.first(this.startDate,this.endDate).then(res=>{
              this.report= res.data.data;
            })
          }
        }
      }
    }

}




</script>

<style>
   .group{
    margin-bottom: 1rem !important;
    border: 1px solid #e1e0cb;
    border-radius: 8px;
    padding: 1rem;
   }
 
</style>
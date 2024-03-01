<template>
  <va-select  label="Selecciona un clouser" v-model="clouser" :options="clousers"  />  
</template>

<script>
import {authAxios,usersApi,errorAxios} from '@/api/index';
import {for_select} from '@/helpers';
import {AmI,I} from '@/config/capabilities';

export default {
  name: 'SelectClouser', 
  props:['clouser_id'],
  components:{},
   data () {
    return {
      clousers:[],
      clouser:{},
    
    }
  },
  mounted () {

    if(AmI('clouser')){
      this.clousers=for_select([I]);
      this.clouser=this.clousers[0];
      return ;
    }

    usersApi.clousers().then((res)=>{
      this.clousers=for_select(res.data.data);
    


      if(this.clouser_id){
        this.clouser=this.clousers.filter(c=>c.id==this.clouser_id)[0]
        this.$emit('clouser',this.clouser);
      }else{
        console.log(I);
        if(AmI('hostess')){
          this.clouser=this.clousers.filter(c=>c.id==I.user_id)[0]
          this.$emit('clouser',this.clouser);
        }
      }

    }).catch(error=>{errorAxios.catch(this,error)});
  },
  watch:{
    clouser(val){
      this.$emit('clouser',val);

    }
  }
  

}
  
</script>

<style>
  
</style>
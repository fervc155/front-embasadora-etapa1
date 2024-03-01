<template v-if="user!=null">

            <div class="user-info">
                <va-icon name="fa fa-user-o"/> 
                <span class="subtitle">Nombre</span> 
                {{user.name}}
            </div>
            <div class="user-info"> 
                <va-icon name="fa fa-envelope-o"/> 
                <span class="subtitle">Correo</span> 
                {{user.email}}
            </div>
            <div class="user-info"> 
                <va-icon name="fa fa-key"/> 
                <span class="subtitle">Rol</span> 
                {{user.role}}
            </div>
            <div v-if="user.boss" class="user-info"> 
                <va-icon name="fa fa-black-tie va-icon fa fa-black-tie"/> 
                <span  class="subtitle">Superior</span> 
                {{user.boss.name}} 
            </div>



</template>

<script>


    export default {
        name: 'card-user', 
      props:['user'],

  }
  
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


</style>
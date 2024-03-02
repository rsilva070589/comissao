<template>
 
<div>
    <div v-if="storeLogin.dadosUsuario == undefined"  >    
         Usuário Deslogado
    </div>
   
</div>
  
<div v-if="!store.recursos.progress">
 <div class="layout-px-spacing" style="margin-top: 0px;">
 
     <div >
     </div >
     <img style="width: 90%; height: 500px;" 
         src="@/assets/images/imagem.png" alt="">
    </div>
</div>
    
    
</template>

<script setup> 
    import { onMounted, ref, computed } from 'vue';
    import axios from 'axios'
    import { useMeta } from '@/composables/use-meta';    
    useMeta({ title: 'GRUPO AGP' });
    import {indexStore, useUserStore} from '../../store/IndexStore' 
    import { useRouter } from "vue-router"; 
    const store = indexStore();  
    
    const code_arr = ref([]);
    const router = useRouter() 
const storeLogin = useUserStore()   

    
    function login (){
        console.log(storeLogin.loginAtivo)
    switch (storeLogin.loginAtivo) {
    case 'YES':
        console.log('usuario logado')  
        if(!window.location.hash) {
        window.location = window.location + '#carregar';
        window.location.reload();
    }
        break;
 
    default:
        console.log('precisa fazer login')
        router.push('/auth/login') 
    } 
}
login()

 
  
    
</script>

<style>
</style>
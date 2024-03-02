<template>
    <div v-if="!storeLogin.dadosUsuario.filter(f=> f.GESTOR =='X').length > 0 "
      style="color: red; font-size: 25px; padding: 15px;"
      >
          USUARIO NÃO TEM ACESSO
  </div> 
  
 <div>
    <div style=" padding: 10px;color: red; font-size: 25px; padding: 15px;">
        CheckPoint
    </div>
    
   

    <div v-if="!store.checkpointSelecionado"
    style="padding: 15px; width: 500px;">
    
        <table style="background-color: white;" role="table" aria-busy="false" aria-colcount="5" class="table b-table table-hover" id="__BVID__310">
                <thead role="rowgroup" class="">
                    <tr role="row" class="">
                        <th role="columnheader" scope="col" aria-colindex="1" class=""><div>QTDE</div></th> 
 
                        <th role="columnheader" scope="col" aria-colindex="2" class=""><div>TIPO</div></th>
                        <th role="columnheader" scope="col" aria-colindex="3" class=""><div>DETALHES</div></th> 
                    </tr>
                </thead>
                <tbody v-for="(item, i) in distinctTipos()" :key="item.name" role="rowgroup">
                    <tr role="row" class="">
                        <td aria-colindex="1" role="cell" class="">{{ store.checkpoint.filter(f=> f.DESC_TIPO == item).length }}</td>
                        <td aria-colindex="2" role="cell" class="">{{ item }}</td> 
                        <td style="color: blue;"><div @click="store.checkpointSelecionado = item">detalhes</div>  </td>                       
                    </tr>

                    
                </tbody>
            </table>
    </div>

    <div v-if="store.checkpointSelecionado">
        <CheckPointDetalhe />
    </div>

 </div>


   
   
  
  </template>
  
  <script setup>
      import {indexStore, useUserStore} from '../../store/IndexStore' 
      import { onMounted, ref, computed } from 'vue'; 
      import axios from 'axios'
      import { useMeta } from '@/composables/use-meta';
      import CheckPointDetalhe from './CheckpointDetalhe.vue' 
    const storeLogin = useUserStore()  
      useMeta({ title: 'GRUPO AGP' });
      const store = indexStore(); 
      const code_arr = ref([]);
      //table 1
      store.cadastroRegra.ID = 0;
   
      store.editando = false
  
      store.menuSelecionado='Parametros / Regras de Comissão'
   
  
      onMounted(() => {
          bind_data(); 
      });
  
      const bind_data = async  () => {  

        async function getCheckpoint(){
        store.checkpoint   = (await axios.get(store.baseApiHTTPS+'/checkpoint')).data 
        }
        getCheckpoint()
        
  
          async function getEmpresas()  {
              store.empresasGrupo = []
              if (1==1) { 
              var empresasResult = await axios.get(store.baseApiHTTPS+'/empresas') 
              store.empresasGrupo = empresasResult.data
              }
          }       
  
          getEmpresas()  
          store.recursos.progress = false
   
      }

      function distinctTipos() {
        const data = store.checkpoint
        const unique = [...new Set(data?.map(item => item.DESC_TIPO))]    
        return unique
    }

 
  </script>
  
  <style>
    .conteudo {
      
      flex-direction: row;
      /* justify-content: center; */
      align-items: center;
      width: 100%;
      overflow-x: auto;
  }
  </style>
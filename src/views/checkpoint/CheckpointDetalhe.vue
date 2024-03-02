<template>
 
 
    <div  
      style="color: rgb(144, 0, 255); font-size: 25px; padding: 5px;"
      >
      {{ store.checkpointSelecionado }}
  </div> 

    <div  class="conteudo"
    style="padding: 10px;  width: 95%;  height: 60vh ">
    
        <table style="background-color: white;" role="table" aria-busy="false" aria-colcount="5" class="table b-table table-hover" id="__BVID__310">
                <thead role="rowgroup" class="">
                    <tr role="row" class="">
                        <th role="columnheader" scope="col" aria-colindex="1" class=""><div>#</div></th>  
                        <th role="columnheader" scope="col" aria-colindex="1" class=""><div>COD_TIPO</div></th>  
                        <th role="columnheader" scope="col" aria-colindex="2" class=""><div>DESC_TIPO</div></th>
                        <th role="columnheader" scope="col" aria-colindex="3" class=""><div>COD_EMPRESA</div></th> 
                        <th role="columnheader" scope="col" aria-colindex="4" class=""><div>DESCRICAO</div></th> 
                    </tr>
                </thead>
                <tbody v-for="(item, i) in store.checkpoint.filter(f=> f.DESC_TIPO==store.checkpointSelecionado)" :key="item.name" role="rowgroup">
                    <tr role="row" class="">
                        <td aria-colindex="1" role="cell" class="">{{  i+1 }}</td>
                        <td aria-colindex="1" role="cell" class="">{{  item.COD_TIPO }}</td>
                        <td aria-colindex="2" role="cell" class="">{{ item.DESC_TIPO }}</td> 
                        <td aria-colindex="3" role="cell" class="">{{ item.COD_EMPRESA }}</td> 
                        <td aria-colindex="4" role="cell" > <div  >{{ item.DESCRICAO }}</div></td> 
                        
                    </tr>

                    
                </tbody>
            </table>
    </div>

    <div 
        style="padding: 3px"
        @click="store.checkpointSelecionado = false">
        <button>Voltar</button> 
    </div>
</template>

<script setup>
    import {indexStore, useUserStore} from '../../store/IndexStore'  
      const store = indexStore(); 
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
<template>
  <!--vendas-->
  <div>
    <div 
            v-for="d, dptoIndex in distinctFuncao().filter(f=> f.DPTO ==  store.setorSelecionado)" :key="dptoIndex">
            <span style="font-size: 20px;color: rgb(0, 0, 0); font-weight: bold;">{{ d.FUNCAO }}</span>
            
            <div style="max-width: 100%;" >
                <table style="max-width: 100%; background-color: white; font-size: 15px;" role="table" aria-busy="false" aria-colcount="5" class="table b-table table-hover" id="__BVID__310">
                        
                  <tr role="row" class="">     
                            <th role="columnheader" scope="col" aria-colindex="2"   ><div> Empresa</div></th>     
                            <th role="columnheader" scope="col" aria-colindex="4" class=""><div>Colaborador </div></th>              
                               <th role="columnheader" scope="col" aria-colindex="2" style="text-align: end;" ><div>Total</div></th>
                        </tr>
                
                        <tr   role="row" 
                            v-for="item, indexItem in store.vendasArrayExcel.filter(f => f.FUNCAO == d.FUNCAO)" :key="indexItem"
                            v-key="index"
                            >    
                            <td aria-colindex="2" role="cell" style="font-size: ">     {{item.EMPRESA}}           </td> 
                            <td aria-colindex="4" role="cell" style="font-size: ">     {{item.COLABORADOR}}               </td>    
                            <td aria-colindex="2" role="cell" style="text-align: end;color: green; font-weight: bold;">{{store.formataDinheiro(item.TOTAL)}}</td>
                        </tr>    
            </table>
            </div>
            </div>
    </div>
  <!--servicos-->

  <!--pecas-->

    <!--crm-->

    <!--seguros-->
    

</template>

<script setup>
import {indexStore} from '../../../store/IndexStore' 
const store = indexStore();  

store.ArrayAgrupador = []

function distinctFuncao() {
    const data = store.vendasArrayExcel
    const key = 'FUNCAO';
    const unique = [...new Map(data.map(item =>  [item[key], item])).values()]; 
    return unique
 }
 


</script>

<style>
</style>
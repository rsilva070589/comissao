<template>
    <div class="layout-px-spacing" style="margin-top: -100px;">
        <h2 class="text-2xl font-medium mx-2" data-testid="statements-title-txt">Ticket Médio de Vendas</h2>
        <div> 
</div>
 
<Progress v-if="store.recursos.progress" />



<div v-if="!store.recursos.progress">
    <div  style="display: flex;
        flex-wrap: wrap; 
                        margin: 15px 0px 15px 0px;
                    ">

                    <div class="card" style="padding: 10px; width: 250px;height: 120px;border-radius: 10px;
                                    align-items: center; margin: 0px 20px 15px 0px;">
            <span style="font-size: 30px; color: black;">
                Total Mês
            </span> 
            <div style="font-size: 30px; color: forestgreen">
                R$ {{ totalMes()}}
            </div>
         </div>

         <div class="card" style="padding: 10px;  width: 250px; height: 120px; 
                                 border-radius: 10px; align-items: center;
                                 margin: 0px 20px 15px 0px;
                                 background-color: ;
                                 ">
            <span style="font-size: 30px; color: black; ">
                Lucro Mês
            </span> 
            <div style="font-size: 30px; color: forestgreen">
                R$ {{ lucroMes()}}
            </div>
            
         </div> 

         <div class="card" style="padding: 10px;  width: 250px; height: 120px; 
                                 border-radius: 10px; align-items: center;
                                 margin: 0px 20px 15px 0px;
                                 background-color: ;
                                 ">
            <span style="font-size: 30px; color: black; ">
                Total do Dia
            </span> 
            <div style="font-size: 30px; color: forestgreen">
                R$ {{ vendasHoje()}}
            </div>
            
         </div> 

         <div class="card" style="padding: 10px; width: 250px;height: 
                                120px;border-radius: 10px; align-items: center;
                                margin: 0px 20px 15px 0px;
                                
                                ">
            <span style="font-size: 30px; color: black;">
                Lucro do Dia
            </span> 
             
            <div style="font-size: 30px; color: forestgreen">
                R$ {{ lucroHoje()}}
            </div>
           
         </div>
       
         <select class="form-control" style="height: 44px; width: 130px;" v-model="store.displayVendasCategoria">
            <option>Esconder</option>  
            <option>Diario</option>
            <option>Mensal</option>                                                     
        </select>
         </div>
  


    


<div v-if="store.displayVendasCategoria == 'Diario'"   style="display: flex;
        flex-wrap: wrap; 
                        margin: 15px 0px 15px 0px;
                    ">
                  
    <div v-for="c,index in estoqueCategorias" key="index">
        <div class="card" style="padding: 5px; width: 180px;height: 100px;border-radius: 10px;
                                    align-items: center; margin: 0px 20px 15px 0px;">
            <span style="font-size: 30px; color: black;">
                {{ c }}
            </span> 
            <div style="font-size: 30px; color: forestgreen">
                  {{ VendasCategoriaDiario(c) }}
            </div>
         </div>
    </div>
</div>

 
<div v-if="store.displayVendasCategoria == 'Mensal'" style="display: flex;
        flex-wrap: wrap; 
                        margin: 15px 0px 15px 0px;
                    ">
                  
    <div v-for="c,index in estoqueCategorias" key="index">
        <div class="card" style="padding: 5px; width: 180px;height: 100px;border-radius: 10px;
                                    align-items: center; margin: 0px 20px 15px 0px;">
            <span style="font-size: 30px; color: black;">
                {{ c }}
            </span> 
            <div style="font-size: 30px; color: forestgreen">
                  {{ VendasCategoriaMes(c) }}
            </div>
         </div>
    </div>
</div>
  
        
        <div v-if="!store.editando">
            <div  >
              
                <div class="panel br-0 p-0 mt-0">
                    <div class="custom-table">
                        <v-client-table :data="store.itensRelVendas" :columns="columns1" :options="table_option1">
                        
                            <template #progress="props">
                                <div class="progress">
                                    <div
                                        role="progressbar"
                                        aria-valuemin="0"
                                        :aria-valuemax="props.row.progress.count"
                                        aria-valuenow="100"
                                        class="progress-bar"
                                        :class="'bg-' + props.row.progress.class"
                                        :style="{ width: props.row.progress.count + '%' }"
                                    ></div>
                                </div>
                            </template>
                            <template #salary="props"> ${{ props.row.salary }} </template>
                            <template #actions="props">
                                <div class="me-2 custom-dropdown dropdown btn-group">
                                    <a class="btn dropdown-toggle btn-icon-only" href="#" role="button" id="pendingTask" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            style="width: 24px; height: 24px"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-more-horizontal"
                                        >
                                            <circle cx="12" cy="12" r="1"></circle>
                                            <circle cx="19" cy="12" r="1"></circle>
                                            <circle cx="5" cy="12" r="1"></circle>
                                        </svg>
                                    </a>

                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item" @click="view_row1(props.row)"> view </a>
                                        </li>
                                        <li @click="selectItemEdit(props.row)">
                                            <a href="javascript:void(0);" class="dropdown-item"> Edit </a>
                                        </li>
                                        <li @click="deleteItem(props.row)">
                                            <a href="javascript:void(0);" class="dropdown-item"> Delete </a>
                                        </li>
                                    </ul>
                                </div>
                            </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
</div>
       
    </div>
</template>

<script setup>
    import Progress from '@/components/Progress.vue';
    import {indexStore} from '../../store/IndexStore' 
    import { onMounted, ref } from 'vue';
    import axios from 'axios'
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'GRUPO AGP' });
    const store = indexStore(); 
    const code_arr = ref([]);
    //table 1

    store.recursos.progress = true

    function dataAtualFormatada(dataFormat){
    var data = dataFormat,
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
    } 

    function dataAtualMes(dataFormat){
    var data = dataFormat,
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return mesF+"/"+anoF;
    } 
    
        const end=new Date()
        end.setHours(23,59,59,999)
        end.getTime()
 

    function formataDinheiro(item) {
         let venda = item;
         if (!!venda && venda.toString().includes(",")) {
           venda = venda.toString().replace(",", ".");
         }
         return parseFloat(venda)
           .toFixed(2)
           .replace(".", ",")
           .replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
    }

    function vendasHoje(dtfilter) { 
        var arr =  store.itensRelVendas.filter(f => f.DATA==dataAtualFormatada(new Date())) 
        var sum = 0; 
        for(var i =0;i<arr.length;i++){ 
          sum+=arr[i].VALOR; 
        }  
        return formataDinheiro(sum)
      }
   
      function lucroHoje(dtfilter) { 
        var arr =  store.itensRelVendas.filter(f => f.DATA==dataAtualFormatada(new Date())) 
        var sum = 0; 
        for(var i =0;i<arr.length;i++){ 
          sum+=arr[i].LUCRO; 
        }  
        return formataDinheiro(sum)
      }
   
      function totalMes(dtfilter) { 
        var arr =  store.itensRelVendas.filter(f => f.MES == dataAtualMes(new Date())) 
        var sum = 0; 
        for(var i =0;i<arr.length;i++){ 
          sum+=arr[i].VALOR; 
        }  
        return formataDinheiro(sum)
      }

      function lucroMes(dtfilter) { 
        var arr =  store.itensRelVendas.filter(f => f.MES == dataAtualMes(new Date())) 
        var sum = 0; 
        for(var i =0;i<arr.length;i++){ 
          sum+=arr[i].LUCRO; 
        }  
        return formataDinheiro(sum)
      }

      function VendasCategoriaDiario(c) {
console.log(store.itensRelVendas)

        var arr =  store.itensRelVendas.filter(f => f.DATA==dataAtualFormatada(new Date()) && f.CATEGORIA==c) 
        var sum = 0; 
        for(var i =0;i<arr.length;i++){ 
          sum+=arr[i].VALOR; 
        }  
        return formataDinheiro(sum)
         
      }

      function VendasCategoriaMes(c) {
console.log(store.itensRelVendas)

        var arr =  store.itensRelVendas.filter(f => f.MES == dataAtualMes(new Date()) && f.CATEGORIA==c) 
        var sum = 0; 
        for(var i =0;i<arr.length;i++){ 
          sum+=arr[i].VALOR; 
        }  
        return formataDinheiro(sum)
         
      }
   
     
    

    //table 2
    const columns1 = ref( ['ID','DATA','CATEGORIA','COD_PRODUTO','NOME','QTDE','VALOR','CUSTO','LUCRO','PERC_LUCRO' ]);
    const items1 = store.itensRelVendas;
    const table_option1 = ref({
        perPage: 10,
        perPageValues: [5, 10, 20, 50],
        skin: 'table ',
        columnsClasses: { actions: 'actions text-center' },
        sortable: [],
        pagination: { nav: 'scroll', chunk: 5 },
        texts: {
            count: 'Showing {from} to {to} of {count}',
            filter: '',
            filterPlaceholder: 'Search...',
            limit: 'Results:',
        },
        sortable: ['ID','DATA','CATEGORIA','COD_PRODUTO','NOME','QTDE','VALOR','CUSTO','LUCRO','PERC_LUCRO' ],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
        resizableColumns: false,
    });

    onMounted(() => {
        bind_data();
    });

    const bind_data = async  () => {
        store.itensRelVendas = []
       var result = await axios.get(store.baseApiHTTPS+'/mercadovendas') 
      
    
        //table 2
        console.log(result.data)
        store.itensRelVendas =  result.data
        store.recursos.progress = false

    }
    //table 2
    const view_row1 = (item) => {
        alert('ID: ' + item1.value.ID + ', Name: ' + item1.value.NOMENCLATURA);
    };

 
    const estoqueCategorias = ['Mercearia','Bebidas','Cigarros','Diversos','Frios','Limpeza']
    store.displayVendasCategoria = 'Diario'


</script>

<style>
</style>

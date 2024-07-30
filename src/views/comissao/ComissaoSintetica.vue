<template>
    <div v-if="!storeLogin.dadosUsuario.some(f => f.GESTOR === 'X')" style="color: red; font-size: 25px; padding: 15px;">
      USUARIO NÃO TEM ACESSO
    </div> 
  
    {{ validaDatas() }}
  
    <div v-if="store.mensagem?.length" style="color: red; font-size: 25px; padding: 15px;" @click="store.mensagem = []">
      {{ store.mensagem }}
    </div> 
  
    <div v-if="storeLogin.dadosUsuario.some(f => f.GESTOR === 'X')">
      <div class="layout-px-spacing"> 
        <div style="display: flex; max-width: 90%;">
          <div class="table-light table-responsive" style="margin-right: 10px;">
            Mês
            <select class="mb-4 form-select form-select-lg w-100" v-model="store.mesSelecionado" @change="getUsuarios">
              <option :value="e" v-for="e in distinctMes().sort()" :key="e">
                {{ e }}
              </option>
            </select>
          </div>
  
          <div v-if="store.marcaGrupo?.length > 1" class="table-light table-responsive" style="margin-right: 10px;">
            Grupo
            <select class="mb-4 form-select form-select-lg w-100" v-model="store.marcaSelecionada">
              <option :value="e" v-for="e in store.marcaGrupo" :key="e">
                {{ e }}
              </option>
            </select>
          </div>
  
          <div v-if="store.marcaGrupo?.length > 1" class="table-light table-responsive" style="margin-right: 10px;">
            Setor
            <select class="mb-4 form-select form-select-lg w-100" v-model="store.setorSelecionado">
              <option :value="e" v-for="e in distinctSetor()" :key="e">
                {{ e }}
              </option>
            </select>
          </div>
  
          <div style="margin-top: 10px;" v-if="!store.recursos.progress">
            <button class="btn btn-success mt-3" @click="listaUsuarios">buscar</button>
          </div>
  
          <div v-if="!store.recursos.progress1" style="margin-top: 23px; margin-left: 250px; width: 40px;" @click="fechamento(2)">
            <svg version="1.1" viewBox="0 0 20 20" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round" stroke-linecap="round">
              <rect x="5" y="1.25" width="10" height="15" rx="5" ry="5" fill="none" stroke="#808080" stroke-width="2.5"/>
              <rect x="2.5" y="7.5" width="15" height="12.5" rx="1.25" ry="1.25" style="fill:#ff6600"/>
            </svg>
            {{ store.dataFechamento }}
          </div>
  
          <div v-if="store.recursos.progress1">
            <Progress />
          </div>
        </div>
  
        <div class="conteudo" style="height: 60vh; max-width: 85%;">
          <ProgressBar v-if="store.recursos.progress" :bgcolor="'#6a1b9a'" :completed="store.progressPerc" />
          <ComissaoSinteticaGrid />
        </div>
      </div>
    </div>
  
    <div style="display: flex; margin-left: 10px;">
      <div style="width: 50px; padding: 5px;" @click="export_table('pdf')"> 
        <!-- SVG for export button -->
        <!-- SVG content here -->
      </div>
    </div>
  </template>
  

<script setup>
    import jsPDF from 'jspdf';
    import 'jspdf-autotable';
    import JsonExcel from "vue-json-excel3"; 
    import {indexStore, useUserStore} from '../../store/IndexStore' 
    import { onMounted, ref } from 'vue';
    import axios from 'axios'
    import feather from 'feather-icons';  
    import ComissaoSinteticaGrid from './components/ComissaoSinteticaGrid.vue' 
    import Progress from '@/components/Progress.vue'; 
    import ProgressBar from './components/Progressbar.vue'
    const store = indexStore();  
    const storeLogin = useUserStore()  
    store.menuSelecionado='Comissão / Sintetica' 
    store.recursos.progress = true
    store.vendasArrayExcel = [ ] 
    store.marcaSelecionada = []  
    store.titulosExcel =   []
    store.vendedorSelecionado = 0
    store.notaNPS = 100
    store.mensagem = []
    store.dadosComissao = []

    store.progressPerc =  0


    onMounted(() => {
        bind_data();
        feather.replace();
    });

    const bind_data = async  () => { 
     
        async function getEmpresas()  {
            if (store.mesSelecionado) { 
            var empresasResult = await axios.get(store.baseApiHTTPS+'/empresas',
                                { params: { MES: store.mesSelecionado} }
                                ) 
            store.empresasGrupo = empresasResult.data
            }
        }       

        getEmpresas()
 

        async function getRegrasComissao ( ){
       // store.regrasComissao// = regracomissao; 
       var mesAjustado = store.mesSelecionado.replace('/','-')
        var   regrasComissao   = await axios.get(store.baseApiHTTPS+'/regracomissao')
        store.regrasComissao =  regrasComissao.data 
        
        }
        getRegrasComissao()
 
      
        function distinctMes() {
            const data = store.regrasComissao
            const unique = [...new Set(data.map(item => item.MES_VENDA))]    
            return unique
        }

        store.recursos.progress = false
    }

async function fechamento(tipo) {       
    store.recursos.progress1 = true

var arr = []

 
    var mesAjustado = store.mesSelecionado.replace('/','-')

        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: store.baseApiHTTPS+'/fechamento/'+tipo+'&'+mesAjustado,
        headers: { 
            'Content-Type': 'application/json'
        } 
        };

        if(store.mesSelecionado && tipo == 1){
        axios.request(config)
        .then((response) => {  
                store.dataFechamento = dataHoraFormatada(response.data[0].DATA_GRAVACAO) 
                store.recursos.progress1 = false  
        })
        .catch((error) => {
        console.log(error);
        store.recursos.progress1 = false
        });
        } else{
            if(store.mesSelecionado && tipo == 2 && validaDatas()){
                store.recursos.progress1 = true
                axios.request(config)
                                .then((response) => {  
                                        store.dataFechamento = dataHoraFormatada(response.data[0].DATA_GRAVACAO) 
                                        store.recursos.progress1 = false  
                                        fechamento(1)
                                })
                                .catch((error) => {
                                console.log(error);
                                store.recursos.progress1 = false
                                });

                     
            }else{
                console.log('nao fazer nada')
                store.mensagem = []
                store.mensagem.push('Periodo Indisponivel para Fechamento')
                store.recursos.progress1 = false
            }
            
        }}

 

    async function getUsuarios() {       
    store.usuariosGrupo = []  
    var arr = []
   
       var mesAjustado = store.mesSelecionado.replace('/','-')

        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: store.baseApiHTTPS+'/usuarios/'+mesAjustado,
        headers: { 
            'Content-Type': 'application/json'
        } 
        };

        if(store.mesSelecionado){
        axios.request(config)
        .then((response) => { 
        store.usuariosGrupo = response.data
        const parsed_array = arr.map(val=>{return JSON.stringify(val)})
        store.empresasFuncao = parsed_array.filter((value, ind)=> parsed_array.indexOf(value) == ind).map((val)=>{return JSON.parse(val)})
        store.marcaGrupo = distinctMarca()
        })
        .catch((error) => {
        console.log(error);
        });
        } 
    }
    getUsuarios()



 function listaUsuarios() {
    store.progressPerc = 0
    store.dadosComissao = []
    store.vendasArrayExcel = []
    store.userFiltro = store.usuariosGrupo.filter(f=> f.MARCA==store.marcaSelecionada && f.DPTO == store.setorSelecionado && f.ANULAR != 'S' && f.DIRETORIA != 'S')
    store.recursos.progress = true
    store.userFiltro.map( u => {
        getComissaoUsuarios(u)  
    })
 }

 async function getComissaoUsuarios(usuario){ 
    console.log('Buscando Comissao do Usuario: '+usuario.NOME_COMPLETO +' - '+usuario.NOME)

 console.log(usuario)

 let data = null

if (usuario.PERIODO_FIM == null){
    data = JSON.stringify({
            "MES": store.mesSelecionado,
            "CPF": "12345678123",
            "NOME": usuario.NOME 
            });
}else{
    data = JSON.stringify({
            "MES": store.mesSelecionado,
            "CPF": "12345678123",
            "NOME": usuario.NOME,
            "PERIODO_INI": dataAtualFormatada(usuario.PERIODO_INI),
            "PERIODO_FIM": dataAtualFormatada(usuario.PERIODO_FIM)
            });
}
    
 

                    let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: store.baseApiHTTPS+'/comissao',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    data : data
                    };

                    axios.request(config)
                    .then((response) => {
          
                    store.dadosComissao.push({COLABORADOR: usuario.NOME, FUNCAO: usuario.FUNCAO, COMISSOES: response.data})
                    
                    if (somaValor(response.data.map(x => x.COMISSAO)) > 0){
                        ajustaArrayExcel(usuario)
                    }
                    if (store.userFiltro?.length == store.dadosComissao.length){
                            store.recursos.progress = false
                        }
                        store.progressPerc = arredonda((store.dadosComissao?.length * 100) / store.userFiltro?.length,0)


                    })
                    .catch((error) => {
                    console.log(error);
                    }); 
                     
 }

 function ajustaArrayExcel(usuario){      
                var colaborador = {
                    EMPRESA: usuario.COD_EMPRESA,
                    DPTO:    usuario.DPTO,
                    FUNCAO:  store.dadosComissao.filter(f => f.COLABORADOR == usuario.NOME).map(x => x.FUNCAO)[0],
                    COLABORADOR: usuario.NOME_COMPLETO,
                    QTDE:        somaValor(store.dadosComissao.filter(f => f.COLABORADOR == usuario.NOME).map(x => x.COMISSOES)[0].map(x => x.QTDE)),
                    VENDAS:      formataDinheiro(somaValor(store.dadosComissao.filter(f => f.COLABORADOR == usuario.NOME).map(x => x.COMISSOES)[0]?.filter(f=> f.CLASSE=='VENDAS').map(x => x.COMISSAO))),                    
                    PREMIACOES:  formataDinheiro(somaValor(store.dadosComissao.filter(f => f.COLABORADOR == usuario.NOME).map(x => x.COMISSOES)[0]?.filter(f=> f.CLASSE=='PREMIACOES').map(x => x.COMISSAO))),
                    BENEFICIOS:  formataDinheiro(somaValor(store.dadosComissao.filter(f => f.COLABORADOR == usuario.NOME).map(x => x.COMISSOES)[0]?.filter(f=> f.CLASSE=='BENEFICIOS').map(x => x.COMISSAO))),
                    TOTAL:       formataDinheiro(somaValor(store.dadosComissao.filter(f => f.COLABORADOR == usuario.NOME).map(x => x.COMISSOES)[0]?.filter(f=> f.CLASSE!='BENEFICIOS').map(x => x.COMISSAO)))
                    
                }           
                if (1) {
                store.vendasArrayExcel.push(colaborador) 
                }
              
            }

 
            const export_table = (type) => {
            let cols =['EMPRESA','COLABORADOR','VENDAS','PREMIACOES','BENEFICIOS','TOTAL']
            const records = store.vendasArrayExcel
            
            let filename = 'Comissao-'+store.setorSelecionado;  
       
            cols = cols.map((d) => {
                return { header: capitalize(d), dataKey: d };
            });
            const doc = new jsPDF('l', 'pt', cols.length > 10 ? 'a3' : 'a4');
            let str = "Pagina: ";
            let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber;
            var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
            var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
            const arrayHead = []


            distinctFuncao1().map( x=> {
                doc.autoTable({
                headStyles: { fillColor: '#eff5ff', textColor: '#515365', fontsize: 70,  5: {halign: 'right'} },   
                createdHeaderCell: function (cell, data) {
                    if (cell.raw === 'Name') {//cell.raw
                        cell.styles.fontSize= 15;
                       cell.styles.textColor = 111;
                    } else {
                        cell.styles.textColor = 255;
                        cell.styles.fontSize = 10;
                  
                    }
                },          
                
                head: [[x.FUNCAO],['EMPRESA','COLABORADOR','VENDAS','PREMIACOES','BENEFICIOS','TOTAL']], 
                didParseCell: (hookData) => {
                    if (hookData.section === 'head') {
                        if (hookData.column.dataKey === 'TOTAL') {
                            hookData.cell.styles.halign = 'right';
                        }
                        if (hookData.column.dataKey === 'VENDAS') {
                            hookData.cell.styles.halign = 'right';
                        }
                        if (hookData.column.dataKey === 'PREMIACOES') {
                            hookData.cell.styles.halign = 'right';
                        }
                        if (hookData.column.dataKey === 'BENEFICIOS') {
                            hookData.cell.styles.halign = 'right';
                        }
                    }
                },
                columns: cols,
                bodyStyles: { valign: "top" },
                body: records.filter(f => f.DPTO == x.DPTO).filter(f => f.FUNCAO == x.FUNCAO),
                styles: { overflow: 'linebreak' },
                pageBreak: 'auto', 
                margin: { horizontal: 35 },
                columnStyles: { 0: {cellWidth: 150},1: {cellWidth: 300},2: {halign: 'right'} ,3: {halign: 'right'} ,4: {halign: 'right'} ,     5: {halign: 'right'} 
                                },
               didDrawPage: () => { 
                    doc.setFontSize(15);
                    doc.setTextColor(40); 
                    doc.text( store.marcaSelecionada+' - SETOR DE '+store.setorSelecionado+ '  - Mês: '+store.mesSelecionado,250, 25 ); 
                    doc.setFontSize(10);
                    doc.setTextColor(30); 
                    doc.text( 'Emissão: '+store.dataHora(), 680, 25, );
                    doc.text(str + doc.internal.getCurrentPageInfo().pageNumber, pageWidth / 2, pageHeight  - 10, {align: 'center'}); 
                }
            });
            })  

            doc.save(store.marcaSelecionada+' - '+store.setorSelecionado + ' - '+store.mesSelecionado+'.pdf');
        
    };    
     

    function somaTotalVenda(tipo,vendedor) { 
        var arr =  store.comissaoResumo.filter(f => f.VENDEDOR == vendedor && f.TIPO==tipo)      
        var sum = 0; 
        for(var i =0;i<arr.length;i++){ 
          sum+=arr[i].TOTAL_VENDA; 
        }  
         
        return arredonda(sum, 2)
      }
 
    function distinctSetor() {
        const data = store.usuariosGrupo.filter(f => f.MARCA == store.marcaSelecionada)
        const unique = [...new Set(data.map(item => item.DPTO))]    
        return unique
    }                        
 
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

    var arredonda = function(numero, casasDecimais) {
   
    casasDecimais = typeof casasDecimais !== 'undefined' ?  casasDecimais : 2;
    numero = typeof numero !== 'undefined' ?  numero : 0;
    return +(Math.floor(numero + ('e+' + casasDecimais)) + ('e-' + casasDecimais));
  };

 
  

function totalSalario(vendedor) { 

var arr = store.comissaoResumo.filter(f => f.MARCA==store.marcaSelecionada
                                        && f.VENDEDOR==vendedor 
                                        && f.MES_VENDA == store.mesSelecionado
                                        && f.VALOR_COMISSAO > 0
                                        && f.TIPO != 'EMPLACAMENTO'
                                        ).map(x =>  x.VALOR_COMISSAO) 
        
var sum = 0; 
for(var i =0;i<arr.length;i++){ 
    sum+=arr[i]; 
}  
    
return arredonda(sum  , 2)
//return arr

}
 
   
function somaValor(array) { 
        var arr =  array     
        var sum = 0; 
        for(var i =0;i<arr.length;i++){ 
          sum+=arr[i]; 
        }   
        return arredonda(sum,2)
      }

      function somaQtde(array) { 
        var arr =  array     
        var sum = 0; 
        for(var i =0;i<arr.length;i++){ 
          sum+=arr[i]; 
        }   
        return sum
      }    
      
      function primeirasLetras(a) {
            var text = a || ''
        return text.substring(7, 21).replace("-", "")
      }
    
      function distinctMes() {
    const data = store.regrasComissao
    const unique = [...new Set(data.map(item => item.MES))]    
    return unique
 }
 
  
 function distinctFuncao1() {
    const data = store.vendasArrayExcel
    const key = 'FUNCAO';
    const unique = [...new Map(data.map(item =>  [item[key], item])).values()]; 
    return unique
 }
 

 function distinctMarca() {
    const data = store.usuariosGrupo
    const unique = [...new Set(data?.map(item => item.MARCA))]    
    return unique
 }
        



const excel_columns = () => {
        return {
            EMPRESA: 'EMPRESA',
            DPTO: 'DPTO',
            COLABORADOR: 'VENDEDOR',
            TOTAL: 'TOTAL' 
        };
    };
    const excel_items = () => {
        return store.vendasArrayExcel;
    };

    const capitalize = (text) => {
        return text
            .replace('_', ' ')
            .replace('-', ' ')
            .toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    };



    function orderByVendedor( a, b ) {
                if ( a.NOME_COMPLETO < b.NOME_COMPLETO ){
                    return -1;
                }
                if ( a.NOME_COMPLETO > b.NOME_COMPLETO ){
                    return 1;
                }
                return 0;
                }

   function dataAtualFormatada(dataFormat){        
        if (dataFormat){ 
        var data = new Date(dataFormat),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
        }else{
            return null
        } 
    } 

    function mesFormatada(dataFormat){        
        if (dataFormat){ 
        var data = new Date(dataFormat),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return mesF+"/"+anoF;
        }else{
            return null
        } 
    } 

    function dataHoraFormatada(dataFormat){        
        if (dataFormat){ 
        var data = new Date(dataFormat),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear(),
            hora = data.getHours(),
            minuto = data.getMinutes(),
            minutos = (minuto.length < 2) ? '0'+minuto : minuto ;
            ;
          

        return diaF+"/"+mesF+"/"+anoF+" "+hora+":"+minutos; 

        }else{
            return null
        } 
    } 

function validaDatas() { 
    store.mensagem = []
    var diasAtras = new Date();
    diasAtras.setDate(new Date().getDate()-28);        
    var mes = new Date().getMonth();
    return mesFormatada(diasAtras) == store.mesSelecionado && new Date().getDate() < 7
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
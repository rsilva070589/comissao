<template>



   <div style="position: fixed; margin-left: 98%;">
      <router-link class="button is-light" to="/itens">   
        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class=""
                    >
                        <circle cx="12" cy="12" r="3"></circle>
                        <path
                            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                        ></path>
                    </svg>
        </router-link> 
    </div>
   
    

    <div  
    style="
           background-attachment: fixed;                               
           background-size: 100%; 
           background-position: center;           
          "
    v-bind:style="{ 'background-image': 'url(' + store.imagemAmbiente + ')' }"
    > 

  
    <div style="padding: 15px; width: 300px; position: relative;">
    
        <h2 style="color: black; font-size: 27px; margin-left: 5px; font-weight: bold;">Resumo do Pedido</h2> 
    
        <input style="padding: 5px; 
                font-size: 18px;
                background-color: #000000DD;
                color: white;
                width: 265px;
                border-radius: 10px;" type="text" placeholder="Nome do Cliente" v-model="store.nomeCliente">   

                <div style="display: flex; padding: 5px 0px 0px 0px;">
                  <input style="padding: 5px; 
                                font-size: 18px;
                                background-color: #000000DD;
                                color: white;
                                width: 170px;
                                border-radius: 10px;" type="text" placeholder="CPF/CNPJ" v-model="store.cpfCnpjCliente">    

                                <input style="padding: 5px; 
                                margin-left: 4px;
                                font-size: 18px;
                                background-color: #000000DD;
                                color: white;
                                width: 90px;
                                border-radius: 10px;" type="text" placeholder="Casa" v-model="store.numeroCasa">  
                </div>

    
    
    <div  
            style="padding: 10px;
                   margin: 10px 0px 20px 0px;
                   background-color: #000000DD;
                   width: 265px;
                   border-radius: 10px;
                   
                   "
          v-for="(a, indexA) in store.ambiente" :key="indexA">
    <div style="color: whitesmoke; font-weight: bold; font-size: 18px;
    border: 1px solid var(--bgContainer);
                          transition: all 0.2s ease 0s;
                          cursor: pointer;
                        
  " 
       @click="AmbienteOpenClose(a);
                        store.AmbienteOpen = a;                         
                         selecionarImagem(store.AmbienteOpen); 
                         store.dadosItensFiltro = store.dadosItens; 
                         store.ilhaBalcao=null "
  >

  <span class="item">
    {{primeiraLetraMaiuscula(a)}}
  </span>
  
  </div>

  <div v-if="store.AmbienteOpen == a  && store.AmbienteOpenClose"> 

<div style="display: flex; justify-content: center;  margin: 10px 0px 0px 15px; "
        @click=""
>

  <div  v-if="getOpcional(store.AmbienteOpen, 'ILHA') > 0"     
        style="" @click="store.ilhaBalcao='ILHA'; 
                          selecionarImagem(store.AmbienteOpen)
                          dadosFiltro(store.AmbienteOpen, store.ilhaBalcao)                
                          ">     
        <label class="container">Com Ilha
        <input type="radio" checked="checked" name="radio">
        <span class="checkmark"></span>
        </label>
    </div>    

    <div v-if="getOpcional(store.AmbienteOpen, 'BALCAO') > 0"  
          style="" @click="store.ilhaBalcao='BALCAO';
                           selecionarImagem(store.AmbienteOpen)
                           dadosFiltro(store.AmbienteOpen, store.ilhaBalcao)  
                           ">  
            <label class="container">Com Balcão
            <input type="radio" name="radio">
            <span class="checkmark"></span>
            </label>
    </div>    
</div>
    


    
    <div style="color: white; padding: 0px 0px 7px 0px; cursor: pointer; " 
            v-for="(b, indexB) in store.itensTipo.filter(x => x.AMBIENTE==a)" :key="indexB"            
            >
          <span style="font-size: 16px;">
            {{ primeiraLetraMaiuscula(b.TIPO)}}  
          </span>  
   
         
         <div v-if="!buscaItem(a, b.TIPO) > 0"
              style=" background-color: #000000DD;    
                      text-transform: capitalize;        
                      font-size: 16px;             
                      border-style: solid;
                      border-width: 0 0 1px 0;   
                      display: flex;
                      justify-content: space-between;
                      
                       "                     
               @click="store.BoxOpen = a+'-'+b.TIPO;" 
                    >
                <div>
                  Selecione
                </div>    
                <div style="padding: 5px 7px 0px 0px; font-size: 12px;  font-weight: bold; ">
                v
                </div>
                
        </div>  

        <div  
               
                v-for="(c, indexC) in store.itensSelecao.filter(x=>  x.AMBIENTE ==a 
                                                                && x.TIPO     ==b.TIPO 
                                                                        )" 
              :key="indexC"                                                              
              style=" 
                      background-color: #000000DD;    
                      text-transform: capitalize;        
                      font-size: 16px;       
                      color: #D98427;      
                      border-style: solid;
                      border-width: 0 0 1px 0;
                      display: flex;
                      justify-content: space-between;
                          "                     
                @click="store.BoxOpen = a+'-'+b.TIPO" 
              >
            
            <div>
              {{ primeiraLetraMaiuscula30(c.NOMENCLATURA) }}
            </div>

            <div style="padding: 5px 7px 0px 0px; font-size: 12px;  font-weight: bold; ">
                v
                </div>
        </div>         
        
 
 <div class="conteudo" style="background-color: #000000DD; ">
 
      
      <div   style="                              
                  color: white;
                  text-transform: capitalize;        
                  font-size: 15px;             
                  padding: 2px;
                  height: auto;
                  max-height: 40vh;    
                  width: auto;
                  
                "   
            v-if="store.BoxOpen == a+'-'+b.TIPO"
             >
 
            <div class="itemSelect"
              style="display: flex; justify-content: space-between; padding-right: 10px;"                 
              v-for="(d, indexD) in store.dadosItensFiltro.filter(x => x.AMBIENTE==a && x.TIPO==b.TIPO)" 
              :key="indexD"
              :value="d.NOMENCLATURA"  
              @click="incluiItem(d)"
              >
                    
            <div>
            {{  primeiraLetraMaiuscula(d.NOMENCLATURA) }} 
            </div>                   
            
            <div>
              R$ {{ formataDinheiro(d.PRECO_TOTAL || 0) }}
            </div>
            

               
              
            </div> 
         
          
        </div>    
  
    </div>
   </div>   

  </div> 

  <div style="font-size: 20px; 
                display: flex;
                justify-content: end;
                color: #D98427;
                font-weight: bold; 
                ">
                <div>
                    Total: R$ {{totalAmbiente(a) }}
                </div>
                
    </div>

  </div> 
    <div style="  color: #292929;      
                  display: flexbox;
                  font-size: 18px;
                  background-color: #D98427;                   
                  border-radius: 10px;
                  padding: 18px;
                  width: 265px;
        "> 
        <div>Total geral</div> 
          <div style="font-size: 25px; font-weight: bold;">
            R$ {{totalGeral()}}
          </div>
          <div style="                        
                        font-size: 18px;
                        font-weight: bold;
                        border-radius: 10px;
                        background-color: transparent;
                        color: var(--bgContainer); 
                        border: 1px solid var(--bgContainer);
                        transition: all 0.2s ease 0s;
                        cursor: pointer;
                    ">
              <div 
            
                    style="border-style: solid; 
                          padding: 10px; 
                          border-radius: 10px; 
                          text-align: center;                                               
                          "
                     @click="export_table('pdf'); savePedido()"
                          >
                FECHAR PEDIDO
              </div>
             
              <div style="border-style: solid; 
                          padding: 10px; 
                          border-radius: 10px; 
                          text-align: center;
                          margin-top: 15px;
                          "
                          @click="store.itensSelecao = []"
                          >
                NOVO PEDIDO
              </div>
          </div>
        </div>
    </div> 
 
    </div>
    
    
</template>
    
<script setup>
    
    import {indexStore} from '../../store/IndexStore' 
    import {index} from '../../store/Index' 
    import axios from 'axios'  
    import icons from '../../views/font_icons.vue'
    import { onMounted, ref } from 'vue';
    import '@/assets/sass/scrollspyNav.scss';
    import '@/assets/sass/font-icons/fontawesome/css/regular.css';
    import '@/assets/sass/font-icons/fontawesome/css/fontawesome.css';
    import highlight from '@/components/plugins/highlight.vue';
    import feather from 'feather-icons';
    import { useMeta } from '@/composables/use-meta'; 
    import jsPDF from 'jspdf';
      import { useRouter } from "vue-router";
    import 'jspdf-autotable';
    
 
    function redireciona(){ 
      console.log('redirect')
      router.push("/itens") 
    }
    const store1 = indexStore(); 
   
    const store = indexStore(); 
    
    const arrayAmbiente = []

    
    async function getItens() {
    
    var result = await axios.get(store.baseApiHTTPS+'/itens') 
    
    store.dadosItens = result.data
    store.dadosItensFiltro = result.data
    
    store.dadosItens.forEach(i => {    
        arrayAmbiente.push (i.AMBIENTE)      
    }); 
    
     
    
    arrayAmbiente.getUnique = function() {
        var o = {}, a = [], i, e;
        for (i = 0; e = this[i]; i++) {o[e] = 1};
        for (e in o) {a.push (e)};   
        return a;  
       }         
    store.ambiente=arrayAmbiente.getUnique()
    }     
    getItens()


    function dadosFiltro(ambiente, tipo, opcional) { 
      store.dadosItensFiltro = store.dadosItens


       if (store.ilhaBalcao == null) {        
        store.dadosItensFiltro = store.dadosItensFiltro.filter(x => x.AMBIENTE == ambiente)        
       }else{
        if (store.ilhaBalcao == 'ILHA') {
          store.dadosItensFiltro = store.dadosItensFiltro.filter(x =>  x.AMBIENTE == ambiente && x.OPCIONAL != 'BALCAO')
          store.ilhaBalcao
        } else{
          store.dadosItensFiltro = store.dadosItensFiltro.filter(x =>  x.AMBIENTE == ambiente && x.OPCIONAL != 'ILHA')
        }        
       }
       store.ilhaBalcao=null
    }
    
   

    async function getItensTipo() {
    
    var result = await axios.get(store.baseApiHTTPS+'/itenstipo') 
     
    store.itensTipo = result.data
     
    } 
    getItensTipo()


    function primeiraLetraMaiuscula30(minhaFrase) {  
    if (minhaFrase == null) {
        return null
    }else{
        var minusculo = minhaFrase.toLowerCase()
        if(minusculo.length>25){
          return (minusculo.substring(0,25)).replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase())
          }else{
            return (minusculo.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase()))
          }
    
    }
   
   }
    
    function primeiraLetraMaiuscula(minhaFrase) {  
    if (minhaFrase == null) {
        return null
    }else{
        var minusculo = minhaFrase.toLowerCase()
        if(minusculo.length>50){
          return (minusculo.substring(0,50)+'...').replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase())
          }else{
            return (minusculo.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase()))
          }    
    }   
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
 
    function totalAmbiente(ambiente) {
        
      /** somatoria de Todos os ambiente */
        
      var arr =  store.itensSelecao.filter(i => i.AMBIENTE == ambiente)
    
      var sum = 0; 

      for(var i =0;i<arr.length;i++){ 
        sum+=arr[i].PRECO_TOTAL; 
      } 
      
      return formataDinheiro(sum)

    }

function totalGeral () {
    
    /** somatoria de Todos os ambiente */
      
    var arr =  store.itensSelecao
   
    var sum = 0; 
  
    for(var i =0;i<arr.length;i++){ 
      sum+=arr[i].PRECO_TOTAL; 
    } 

    return formataDinheiro(sum)
  
  }
   
function getOpcional (ambiente,opcional) {
   for(var i=0; i<store.dadosItens.length; i++) {
      if(store.dadosItens[i].AMBIENTE === ambiente && store.dadosItens[i].OPCIONAL === opcional) {
         return i
      }
  }
} 

    
function buscaItem(ambiente, tipo) {
   for(var i=0; i<store.itensSelecao.length; i++) {
      if(store.itensSelecao[i].AMBIENTE === ambiente && store.itensSelecao[i].TIPO === tipo) {
         return i
      }
  }
} 

function incluiItem(item) {
  if (buscaItem(item.AMBIENTE, item.TIPO) > -1){
    
    store.itensSelecao.splice(buscaItem(item.AMBIENTE, item.TIPO), 1)
    store.itensSelecao.push(item)
  }else{
   
    store.itensSelecao.push(item)
  }
  store.BoxOpen = '' 
} 

async function getImagens() {
     var result = await axios.get(store.baseApiHTTPS+'/imagens')      
     store.imagens = result.data 
    }
    
getImagens()


function selecionarImagem(ambiente){ 
  var result = store.imagens.filter(x=> x.AMBIENTE==ambiente) 
  result.map(a=> {
    if(store.ilhaBalcao == 'ILHA')
    {
      store.imagemAmbiente = a.IMG
    }else{
      store.imagemAmbiente = a.IMG_BALCAO || a.IMG
    }
    

  })
  return result
}


function removeAcento (text)
{       
    text = text.toLowerCase();                                                         
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    return text;                 
}
 
const columns = ref(['TIPO', 'DESCRICAO', 'PRECO_TOTAL']); 

const capitalize = (text) => {
        return text
            .replace('_', ' ')
            .replace('-', ' ')
            .toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    };

const export_table = (type) => {
        let cols = columns.value.filter((d) => d != 'profile' && d != 'action');
        let records = store.itensSelecao;
        let filename = store.nomeCliente || 'sem nome';

        if (type == 'csv') {
            let coldelimiter = ',';
            let linedelimiter = '\n';
            let result = cols
                .map((d) => {
                    return capitalize(d);
                })
                .join(coldelimiter);
            result += linedelimiter;
            records.map((item) => {
                cols.map((d, index) => {
                    if (index > 0) {
                        result += coldelimiter;
                    }
                    let val = item[d] ? item[d] : '';
                    result += val;
                });
                result += linedelimiter;
            });

            if (result == null) return;
            if (!result.match(/^data:text\/csv/i) && !window.navigator.msSaveOrOpenBlob) {
                var data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(result);
                var link = document.createElement('a');
                link.setAttribute('href', data);
                link.setAttribute('download', filename + '.csv');
                link.click();
            } else {
                var blob = new Blob([result]);
                if (window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveBlob(blob, filename + '.csv');
                }
            }
        } else if (type == 'print') {
            var rowhtml = '<p>' + filename + '</p>';
            rowhtml +=
                '<table style="width: 100%; " cellpadding="0" cellcpacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; "> ';
            cols.map((d) => {
                rowhtml += '<th>' + capitalize(d) + '</th>';
            });
            rowhtml += '</tr></thead>';
            rowhtml += '<tbody>';

            records.map((item) => {
                rowhtml += '<tr>';
                cols.map((d) => {
                    let val = item[d] ? item[d] : '';
                    rowhtml += '<td>' + val + '</td>';
                });
                rowhtml += '</tr>';
            });
            rowhtml +=
                '<style>body {font-family:Arial; color:#495057;}p{text-align:center;font-size:18px;font-weight:bold;margin:15px;}table{ border-collapse: collapse; border-spacing: 0; }th,td{font-size:12px;text-align:left;padding: 4px;}th{padding:8px 4px;}tr:nth-child(2n-1){background:#f7f7f7; }</style>';
            rowhtml += '</tbody></table>';
            var winPrint = window.open('', '', 'left=0,top=0,width=1000,height=600,toolbar=0,scrollbars=0,status=0');
            winPrint.document.write('<title>Print</title>' + rowhtml);
            winPrint.document.close();
            winPrint.focus();
            winPrint.print();
            // winPrint.close();
        } else if (type == 'pdf') {

            cols = cols.map((d) => {
                return { header: capitalize(d), dataKey: d };
            });

            const doc = new jsPDF('l', 'pt', cols.length > 10 ? 'a3' : 'a4');
            
            const arrayHead = []

            store.ambiente.map( x => {   
              arrayHead.push() 
              doc.autoTable({           
                headStyles: { fillColor: '#eff5ff', textColor: '#515365', fontsize: 40 },
                head: [{TIPO: x}],
                columns: cols,
                body: store.itensSelecao.filter(d => d.AMBIENTE == x),                
                styles: { overflow: 'linebreak' },
                pageBreak: 'auto',
                margin: { top: 45 },
                didDrawPage: () => {
                    doc.text('ANEXO 1', cols.length > 10 ? 535 : 365, 30);
                },
            });          
            }) 

      
            doc.save(filename + '.pdf');
        }
    };

    function AmbienteOpenClose(a) {
      
      if (store.AmbienteOpenClose ) {
        store.AmbienteOpenClose = false
      }else{
        store.AmbienteOpenClose = true        
      }
    }

    function BoxOpenClose() {
      if (store.BoxOpenClose) {
        store.BoxOpenClose = false
      }else{
        store.BoxOpenClose = true
      }
    }

    function savePedido(){

    const arrayItensPedido = []


    store.itensSelecao.map(x => 
    
    arrayItensPedido.push({
                        "COD_ITEM": x.ID,
                        "VALOR"   : x.PRECO_TOTAL,
                        "DESCONTO": 0
                        })
    )
      
      var data = JSON.stringify({
        "NOME": store.nomeCliente,
        "COD_CLIENTE": store.cpfCnpjCliente,
        "EMPREENDIMENTO": "COMDOMINIO PADRAO",
        "CASA": store.numeroCasa,
        "VALOR": totalGeral(),
        "DESCONTO": 0,
        "ITENS": arrayItensPedido.filter(x => x.COD_ITEM > 0)
      });

       var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://json-replace-oracle-production.up.railway.app/pedidos',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    }
 
     

 
    </script>
    
    <style>
/* The container */
.container {
  display: block;
  position: relative;
  padding-left: 25px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 13px;
  color: white;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 17px;
  width: 17px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.container .checkmark:after {
 	top: 5px;
	left: 5px;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: white;
}


.conteudo {    
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;
    width: 450px;
    overflow-x: auto;
}
 
.item {
  color: write;
}

.item:hover {
  color: #D98427;
}

.itemSelect {
  color: write;
}

.itemSelect:hover {
  background-color: #2196F3;
}

</style>
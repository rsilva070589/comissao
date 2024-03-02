<template>   

    <div v-if=" 
                storeLogin.loginAtivo
                "
    >   
    
        <!--filtros-->
    <div style="display: flex;max-width: 95%; ">  
    
        <div   class="table-light table-responsive" style="margin-right: 10px;" >
            Mês
           <select class="mb-4 form-select form-select-lg w-100"   
                    v-model="store.mesSelecionado"  
                    @click="getUsuarios()"
                    >
                    <option :value="e" v-for="e, index in distinctMes().sort()" v-key="index" >
                        {{  e  }}                
                    </option> 
            </select>
        </div>
    
        <div   class="table-light table-responsive" style="margin-right: 10px;" v-if="store.empresasFuncao.length > 1" 
            >
        Empresa
        <div>
            <select   class="mb-4 form-select form-select-lg w-100"   
                v-model="store.empresaSelecionada"            
                @click="() => {store.funcaoSelecionada = 0},
                            () =>  { store.comissaoColaborador = []}"
                >
                <option 
              
                v-if="storeLogin.dadosUsuario[0]?.GESTOR != 'X'" :value="e.COD_EMPRESA" v-for="e, index in store.empresasGrupo.filter(f=> f.COD_EMPRESA == storeLogin.dadosUsuario[0]?.GESTOR)" v-key="index"  >
                    {{  e.COD_EMPRESA  }}  {{  e.NOME  }}                 
                </option> 
                <option 
              
                v-if="storeLogin.dadosUsuario[0]?.GESTOR == 'M'                        
                " 
                :value="e.COD_EMPRESA" v-for="e, index in store.empresasGrupo.filter(f=> f.MARCA == storeLogin.dadosUsuario[0].MARCA)" v-key="index"  >
                    {{  e.COD_EMPRESA  }}  {{  e.NOME  }}                 
                </option> 
                <option 
               
                v-if="storeLogin.dadosUsuario[0]?.GESTOR == 'N'                        
                " 
                :value="e.COD_EMPRESA" v-for="e, index in store.empresasGrupo.filter(f=> f.COD_EMPRESA == storeLogin.dadosUsuario[0].COD_EMPRESA)" v-key="index"  >
                    {{  e.COD_EMPRESA  }}  {{  e.NOME  }}                 
                </option> 
                <option 
                
                v-if="storeLogin.dadosUsuario[0]?.GESTOR == 'X'"  :value="e.COD_EMPRESA" v-for="e, index in store.empresasGrupo" v-key="index"  >
                    {{  e.COD_EMPRESA  }}  {{  e.NOME  }}                 
                </option> 
               
        </select>
        </div>
    
        </div>
     
     
    
        <div class="table-light table-responsive" style="margin-right: 10px;" v-if="store.empresasFuncao.length > 1" 
             @click="() => {store.vendedorSelecionado = 0},
                     functionClickColaborador()"
            >
        Função
       <select   class="mb-4 form-select form-select-lg w-100"   
                v-model="store.funcaoSelecionada" 
                
                >
                <option v-if="storeLogin.dadosUsuario[0]?.GESTOR != 'X' && storeLogin.dadosUsuario[0]?.GESTOR != 'N'" 
                    :value="e.COD_FUNCAO" v-for="e, index in store.funcoes.filter(f => f.COD_EMPRESA == store.empresaSelecionada && f.DPTO == storeLogin.dadosUsuario[0].DPTO)" v-key="index"  >
                    {{e.FUNCAO}}
                </option> 
                <option v-if="storeLogin.dadosUsuario[0]?.GESTOR == 'N'" :value="e.COD_FUNCAO" v-for="e, index in store.funcoes.filter(f => f.COD_EMPRESA == store.empresaSelecionada && f.COD_FUNCAO == storeLogin.dadosUsuario[0].COD_FUNCAO)" v-key="index"  >
                    {{e.FUNCAO}}
                </option> 
                <option v-if="storeLogin.dadosUsuario[0]?.GESTOR == 'X'" :value="e.COD_FUNCAO" v-for="e, index in store.funcoes.filter(f => f.COD_EMPRESA == store.empresaSelecionada)" v-key="index"  >
                    {{e.FUNCAO}}
                </option> 
        </select>
        </div>
    
        <div   class="table-light table-responsive" style="margin-right: 10px;"  >
            Colaborador
        <select    class="mb-4 form-select form-select-lg w-100"
                    v-model="store.vendedorSelecionado" 
                    @click="functionClickColaborador()"
                    >
                    
                    <option v-if="storeLogin.dadosUsuario[0]?.GESTOR != 'N'"
                            v-for="v, index in store.usuariosGrupo?.filter(f => f.COD_FUNCAO == store.funcaoSelecionada 
                                                                                && f.COD_EMPRESA ==  store.empresaSelecionada 
                                                                                && f.MES == store.mesSelecionado
                                                                                && f.DIRETORIA != 'S'
                                                                                )" 
                            v-key="index"
                            :value="v.NOME"
                            >
                            {{ v.NOME }}-{{ v.NOME_COMPLETO }}
                    </option> 
                    <option v-if="storeLogin.dadosUsuario[0]?.GESTOR == 'N'"
                            v-for="v, index in store.usuariosGrupo?.filter(f => f.COD_FUNCAO == store.funcaoSelecionada 
                                                                                && f.COD_EMPRESA ==  store.empresaSelecionada 
                                                                                && f.MES == store.mesSelecionado
                                                                                && f.NOME == storeLogin.dadosUsuario[0].NOME
                                                                                )" 
                            v-key="index"
                            :value="v.NOME"
                            >
                            {{ v.NOME }}-{{ v.NOME_COMPLETO }}
                    </option> 
                 
    
        </select>
        </div>
    
        <div v-if="!store.recursos.progress" 
            style="margin-top: 10px;">
            <button class="btn btn-success mt-3"  
                    @click="getComissaoUsuarios();
                    store.dataHora()
                    ">
                 buscar
            </button>
        </div>
        
    </div>
    
    <div v-if="store.usuariosGrupo?.filter(f=> f.MES == store.mesSelecionado && f.NOME == store.vendedorSelecionado)[0]?.PERIODO_INI != null"
        style="color: red; font-size: 20px;"
        >
        USUARIO DE FERIAS - PERIODO TRABALHADO: 
        {{store.usuariosGrupo?.filter(f=> f.MES == store.mesSelecionado && f.NOME == store.vendedorSelecionado)[0].PERIODO_INI}}
        a
        {{store.usuariosGrupo?.filter(f=> f.MES == store.mesSelecionado && f.NOME == store.vendedorSelecionado)[0].PERIODO_FIM}}
    </div>
       <!--FIM filtro-->

       <div  
        style="color: rgb(51, 50, 50); font-size: 20px; font-style: italic;"
        >
        Emissão: 
        {{store.dataHora() }}
       
    </div>
     
       <div v-if="storeLogin.loginAtivo">
        <Progress v-if="store.recursos.progress" /> 
    </div>
    
    
          <!--comissao Colaborador-->
     <div   style="padding: 3px; border: 1px;" 
            v-if="!store.editando 
            && store.vendedorSelecionado.length > 1 
            && !store.expandirComissao
            && store.usuariosGrupo.filter(f => f.NOME == store.vendedorSelecionado).length > 0
            && store.comissaoColaborador.length > 0
            " 
            >
      
    
            <div style="max-width: 95%;">
        <table style="background-color: white; font-size: 17px;" role="table" aria-busy="false" aria-colcount="5" class="table b-table table-hover" id="__BVID__310">
                  
                  <tr role="row" class="">          
                    <th role="columnheader" scope="col" aria-colindex="2" class="">                   <div>#</div></th>              
                      <th role="columnheader" scope="col" aria-colindex="2" class="">                 <div>Tipo Comissão</div></th>                  
                      <th role="columnheader" scope="col" aria-colindex="3" style="text-align: end;" ><div>Qtde</div></th>
                      <th role="columnheader" scope="col" aria-colindex="4" style="text-align: end;" ><div>Valor Bruto</div></th> 
                      <th role="columnheader" scope="col" aria-colindex="4" style="text-align: end;" ><div>Ganhos</div></th> 
                      <th role="columnheader" scope="col" aria-colindex="4" style="text-align: end;" ><div>Despesas</div></th> 
                      <th role="columnheader" scope="col" aria-colindex="4" style="text-align: end;" ><div>Valor Liquido</div></th> 
                      <th role="columnheader" scope="col" aria-colindex="5" style="text-align: end;" ><div>Remuneração Variavel</div></th> 
                      <th role="columnheader" scope="col" aria-colindex="5" style="text-align: end;" ><div>%</div></th> 
                  </tr>
          
                   <tr   role="row" 
                   v-for="comi, index in store.comissaoColaborador" 
                      v-key="index"
                    >      
                            <div v-if="store.expandirComissao != comi.TIPO && store.comissaoColaborador?.filter(x => x.TIPO == comi.TIPO)[0]?.ANALITICO != undefined" 
                            @click="expandirDetalhes(1,comi.TIPO,comi.MARCA,formataDinheiro(comi.COMISSAO) )">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                            </div>
                            <div v-if="store.expandirComissao != comi.TIPO && store.comissaoColaborador?.filter(x => x.TIPO == comi.TIPO)[0]?.ANALITICO == undefined" 
                             >
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                            </div>  
                      <td aria-colindex="2" role="cell" style="color: black; font-weight: bold;"> {{comi.TIPO}}   <span style="font-size: 12px" > {{ comi.MARCA }}{{comi.LEGENDA || ''}}       </span> </td>
                      <td aria-colindex="3" role="cell" style="text-align: end;"> <span style="color: black; font-weight: bold;">{{ (store.comissaoColaborador?.filter(x => x.TIPO == comi.TIPO)[0]?.ANALITICO?.filter(f => f.TOTAL_VENDA > 0).length  - store.comissaoColaborador?.filter(x => x.TIPO == comi.TIPO)[0]?.ANALITICO?.filter(f => f.TOTAL_VENDA < 0).length) || comi.QTDE }}  </span> </td>                   
                      <td aria-colindex="4" role="cell" style="text-align: end;" > <span style="color: black; font-weight: bold;"> {{ formataDinheiro(comi.TOTAL_VENDA + (comi.DESPESAS || 0) - (comi.GANHOS || 0))  }}  </span> </td>                  
                      <td aria-colindex="4" role="cell" style="text-align: end;" > <span style="color: black; font-weight: bold;"> {{ formataDinheiro(comi.GANHOS || 0) }}  </span> </td>                  
                      <td aria-colindex="4" role="cell" style="text-align: end;" > <span style="color: black; font-weight: bold;"> {{ formataDinheiro(comi.DESPESAS ||0)  }}  </span> </td>  
                      <td aria-colindex="4" role="cell" style="text-align: end;" > <span style="color: black; font-weight: bold;"> {{ formataDinheiro(comi.TOTAL_VENDA)  }}  </span> </td>  
                      <td aria-colindex="5" role="cell"> <div :class="(comi.TOTAL_VENDA > 0) ? 'debito' : 'credito'">{{ formataDinheiro(comi.COMISSAO)  }}  </div> </td>  
                      <td aria-colindex="5" role="cell" style="text-align: end;"> <span class="credito" style="font-weight: bold; text-align: end;"> {{ arredonda(comi.PERC * 100,2)}}  %  </span> </td>  
                  </tr>     
      </table>
    
      <div style="text-align: end; font-size: 30px; color: black;">
                    Total: R$  {{ formataDinheiro(somaValor(store.comissaoColaborador.map(x => x.COMISSAO)))  }}
        </div>
    </div>
      
     </div>
     <!--FIM comissao COlaborador--> 
     
      <!--NAO HA DADOS--> 
       <div style="font-size: 30px; text-align: center;"
       v-if="   
               store.relSemDados
            " 
       >
        NÃO HÁ DADOS PARA SEREM EXIBIDOS!
       </div>
       <!--FIM NAO HA DADOS--> 
     
    
     <div v-if="store.expandirComissao 
             && store.expandirComissao == store.tipoComissaoSelecionada 
             ">
        <ComissaoDetalhe :dados="preparaDadosDetalhe()"
        /> 
     </div>
     
    
            
    </div>       
    
    <div style="padding: 20px;">
       <div v-if="!storeLogin.dadosUsuario?.sucess && !storeLogin.dadosUsuario?.sucess == undefined"  >    
             Usuário Deslogado
        </div>
     
    </div>
        
    </template>
    
    <script setup>
        import Progress from '@/components/Progress.vue'; 
        import { onMounted, ref } from 'vue';
        import axios from 'axios'
        import feather from 'feather-icons';
        import {indexStore, useUserStore} from '../../store/IndexStore'
        import ComissaoDetalhe from './ComissaoDetalhe.vue'; 
        import { useRouter } from "vue-router"; 
        import storeLayout from '../../store';
import { async } from 'file-upload-with-preview';
        const store = indexStore();  
        const storeLogin = useUserStore()  
        const router = useRouter() 
    
        login()
        store.vendedorSelecionado = 0
    
        store.notaNPS = 0
        store.arrayfiltroGestorFaixa = []
        store.comissaoColaborador = []
       
        store.menuSelecionado='Comissão / Analítica'
    
        storeLayout.commit('setLayout', 'app');
      
    
        
    function login (){
        console.log(storeLogin.loginAtivo)
    switch (storeLogin.loginAtivo) {
    case 'YES':
        console.log('usuario logado')  
        window.onload = function() {
       
    }
        break;
    
    default:
        console.log('precisa fazer login')
        router.push('/auth/login') 
    }
    
    }
    
    
        onMounted(() => {
            bind_data();
            feather.replace();
        });
    
        
    
const bind_data = async  () => {  
    store.recursos.progress = true

    async function getFuncoes(){
        store.funcoes   = (await axios.get(store.baseApiHTTPS+'/funcoes')).data 
    }
    getFuncoes()

    async function getRegrasComissao (){
    store.regrasComissao = [] 
    var   regrasComissao   = await axios.get(store.baseApiHTTPS+'/regracomissao')
    
        regrasComissao.data.map( x => 
            {  const dados = {      
                                    "EMPRESA":      x.COD_EMPRESA,
                                    "DPTO":         x.DPTO,
                                    "FUNCAO":       x.COD_FUNCAO,
                                    "PERCENTUAL":   x.PERC,
                                    "TIPO":         x.TIPO_COMISSAO,
                                    "VALOR":        x.VALOR,
                                    "QTDE":         x.QTDE,
                                    "PREMIO":       x.PREMIO,
                                    "QTDE_MIN":              x.QTDE_MIN,
                                    "QTDE_MAX":              x.QTDE_MAX,
                                    "MEDIA_ACESSORIOS_MIN":  x.MEDIA_ACESSORIOS_MIN,
                                    "MEDIA_ACESSORIOS_MAX":  x.MEDIA_ACESSORIOS_MAX,
                                    "USA_FAIXA":        x.USA_FAIXA,
                                    "PERMITE_AVULSO":   x.PERMITE_AVULSO,
                                    "META":             x.META,
                                    "PAGAR_DSR":        x.PAGAR_DSR,
                                    "VALOR_MIN":        x.VALOR_MIN,
                                    "VALOR_MAX":        x.VALOR_MAX,
                                    "MES_VENDA":        x.MES,
                                    "PAGAR_GESTOR":     x.PAGAR_GESTOR,
                                    "PERC_MIN":         x.PERC_MIN,
                                    "PERC_MAX":         x.PERC_MAX,
                                    
                                } 
                            store.regrasComissao.push(dados) 
                } 
    )
    }
    getRegrasComissao()

         
    
    async function getEmpresas()  {
        if (1) { 
        var empresasResult = await axios.get(store.baseApiHTTPS+'/empresas') 
        store.empresasGrupo = []
        empresasResult.data.map( x => 
            {  const dados = {  
                                "COD_EMPRESA": x.COD_EMPRESA,
                                "NOME":    x.NOME,
                                "MARCA":   x.MARCA
                            }
            store.empresasGrupo.push(dados)
            })   
        }
    }       

    getEmpresas() 
           
       
    
             store.recursos.progress = false
    
        }
    
     async function getComissaoUsuarios(){
        store.expandirComissao = null;
            store.tipoComissaoSelecionada = null;
            store.recursos.progress = true
            store.comissaoColaborador = []
            store.relSemDados = false
    
            let data = null
    
            if (store.usuariosGrupo.filter(f=> f.MES == store.mesSelecionado && f.NOME == store.vendedorSelecionado)[0].PERIODO_FIM){
                data = JSON.stringify({
                        "MES": store.mesSelecionado,
                        "CPF": "12345678123",
                        "NOME": store.vendedorSelecionado,
                        "PERIODO_INI": store.usuariosGrupo.filter(f=> f.MES == store.mesSelecionado && f.NOME == store.vendedorSelecionado)[0].PERIODO_INI,
                        "PERIODO_FIM": store.usuariosGrupo.filter(f=> f.MES == store.mesSelecionado && f.NOME == store.vendedorSelecionado)[0].PERIODO_FIM
                        });
            }else{
                data = JSON.stringify({
                        "MES": store.mesSelecionado,
                        "CPF": "12345678123",
                        "NOME": store.vendedorSelecionado
                        });
            }
    
        console.log('Buscando Comissao do Usuario: '+ store.vendedorSelecionado) 
    
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
                            store.recursos.progress = false
                            if (!response.data.length > 0){
                                store.relSemDados = true
                            }
    
                            /** 
                        response.data.map(x=> {
                            var dados = {
                                VENDEDOR: x.VENDEDOR,                          
                                TIPO: x.TIPO,
                                COD_EMPRESA: x.COD_EMPRESA,
                                MES_VENDA: x.MES_VENDA, 
                                TOTAL_VENDA: x.TOTAL_VENDA,
                                COMISSAO: x.COMISSAO,
                                CLASSE: x.CLASSE,
                                APELIDO: x.APELIDO
                            }
                            store.comissaoColaborador.push(dados)
                        })           
                        */
                        if (somaValor(response.data.map(x => x.COMISSAO)) > 0){
                            store.comissaoColaborador = response.data
                        }
                        
                        })
                        .catch((error) => {
                        console.log(error);
                        }); 
     }
    
     async function getUsuarios() {
         store.empresaSelecionada = 0 
         store.comissaoColaborador = [] 
                var mesAjustado = store.mesSelecionado.replace('/','-')
                var usuariosResult = await axios.get(store.baseApiHTTPS+'/usuarios/'+mesAjustado) 
            store.usuariosGrupo = []
            usuariosResult.data.map( x => 
                {  const dados = {  "COD_EMPRESA":  x.COD_EMPRESA,
                                    "NOME":     x.NOME,
                                    "FUNCAO":   x.FUNCAO,
                                    "COD_FUNCAO": x.COD_FUNCAO,
                                    "DPTO":     x.DPTO,
                                    "NOME_COMPLETO": x.NOME_COMPLETO,
                                    "GESTOR": x.GESTOR,
                                    "MARCA": x.MARCA,
                                    "MES": x.MES,
                                    "DIRETORIA": x.DIRETORIA,
                                    "PERIODO_INI": dataAtualFormatada(x.PERIODO_INI),
                                    "PERIODO_FIM": dataAtualFormatada(x.PERIODO_FIM)
                                }
                store.usuariosGrupo.push(dados)
                } 
            )
            
            var arr = []
            usuariosResult.data.map( x => 
                {  const dados = {  "EMPRESA":  x.COD_EMPRESA,                                
                                    "FUNCAO":   x.FUNCAO,     
                                    "COD_FUNCAO":   x.COD_FUNCAO,
                                    "DPTO": x.DPTO                      
                                }
                arr.push(dados)
                } 
            )
            const parsed_array = arr.map(val=>{return JSON.stringify(val)})
            store.empresasFuncao = parsed_array.filter((value, ind)=> parsed_array.indexOf(value) == ind).map((val)=>{return JSON.parse(val)})
            
            }
            getUsuarios()            
    
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
    
        var arredonda = function(numero, casasDecimais) {
        casasDecimais = typeof casasDecimais !== 'undefined' ?  casasDecimais : 0;
        return +(Math.floor(numero + ('e+' + casasDecimais)) + ('e-' + casasDecimais));
      };

      
      function stripZeros(str) {
        if (str=='Infinity'){
            return 0
        }else{
           return str.replace(/(^0+(?=\d))|(,?0+$)/g, ''); 
        }
        
        }
    
       store.regrasComissaoFinal = []
       store.qtdeTotalVendas = 0
    
        
    
          function somaValor(array) { 
            var arr =  array     
            var sum = 0; 
            for(var i =0;i<arr.length;i++){ 
              sum+=arr[i]; 
            }  
             
            return sum
          }
        
    
    
          function distinctMes() {
            const data = store.regrasComissao
            const unique = [...new Set(data.map(item => item.MES_VENDA))]    
            return unique
        }
      
       
     function calcDSR() {
        comissaoPerc(store.empresaSelecionada,'DSR')
        somaComissao('VENDA-VEICULOS-NOVOS')
        const vlrFiltrado =  store.regrasComissaoFinal?.filter(f => f.EMPRESA == store.empresaSelecionada &&  f.PAGAR_DSR == 'S' ).map(x => 
        somaValores(x.TIPO)    
        ) 
    
        var sum = 0; 
            for(var i =0;i<vlrFiltrado.length;i++){ 
              sum+=vlrFiltrado[i]; 
            }  
    
        let dsr = sum * comissaoPerc(store.empresaSelecionada,'DSR')
        return (dsr)  
     }
    
     function expandirDetalhes(a,b,marca,c){
        
        console.log(a,b)
        if(a > 0){
            store.expandirComissao = b;
            store.tipoComissaoSelecionada = b;
            store.valorComissaoSelecionada = c;
            store.marcaDetalhe = marca
        }
     }
     
    
     function functionClickColaborador () {
          store.expandirComissao        = null;
          store.tipoComissaoSelecionada = null;
          store.comissaoColaborador     = []
          store.relSemDados             = false
          store.comissaoColaborador = []
     }

     function preparaDadosDetalhe(){
        var registros = []

        var comi = {}
        comi.COMISSAO = store.comissaoColaborador?.filter(f => f.TIPO == store.tipoComissaoSelecionada 
                                            && f.MARCA == store.marcaDetalhe)?.[0]?.COMISSAO
        comi.TOTAL_VENDA = store.comissaoColaborador?.filter(f => f.TIPO == store.tipoComissaoSelecionada 
                                            && f.MARCA == store.marcaDetalhe)?.[0]?.TOTAL_VENDA

                        store.comissaoColaborador?.filter(f => f.TIPO == store.tipoComissaoSelecionada 
                                            && f.MARCA == store.marcaDetalhe)?.[0]?.ANALITICO.map(x => {
                                                var dados = {
                                                TIPO: x.TIPO,
                                                COD_EMPRESA: x.COD_EMPRESA ,
                                                COD_EMPRESA_VENDEDORA: x.COD_EMPRESA_VENDEDORA ,
                                                MARCA: x.MARCA ,
                                                DATA_VENDA: x.DATA_VENDA ,
                                                MES_VENDA: x.MES_VENDA ,
                                                COD_CLIENTE: x.COD_CLIENTE ,
                                                NOME_CLIENTE: x.NOME_CLIENTE ,
                                                CHASSI: x.CHASSI ,
                                                NOVO_USADO: x.NOVO_USADO ,
                                                DESCRICAO_MODELO: x.DESCRICAO_MODELO ,
                                                ANO_MODELO: x.ANO_MODELO ,
                                                COD_PROPOSTA: x.COD_PROPOSTA ,
                                                VENDEDOR: x.VENDEDOR ,
                                                TOTAL_VENDA: x.TOTAL_VENDA ,
                                                MARGEM_VENDA: x.MARGEM_VENDA ,
                                                DESPESAS: x.DESPESAS ,
                                                GANHOS: x.GANHOS ,
                                                PERC: store.comissaoColaborador?.filter(f => f.TIPO == store.tipoComissaoSelecionada && f.MARCA == store.marcaDetalhe)?.[0]?.PERC,
                                                COMISSAO_TOTAL: store.comissaoColaborador?.filter(f => f.TIPO == store.tipoComissaoSelecionada && f.MARCA == store.marcaDetalhe)?.[0]?.COMISSAO
                                        
                                                }
                                                registros.push(dados)
                                            })
        

            return registros
      }


    
    </script>
    
    <style>
      .fundoVendaDev {
        color: rgb(206, 11, 11);
      } 
      .conteudo {
        
        flex-direction: row;
        /* justify-content: center; */
        align-items: center;
        width: 100%;
        overflow-x: auto;
    }

    .credito { 
        color: rgb(240, 12, 12);
        font-weight: bold;
        text-align: end;
    }
    .debito {
        color: rgb(17, 206, 11);
        font-weight: bold; 
        text-align: end;
    }
    </style>
<template>
  

<div  class="table-light table-responsive" style="display: flex; padding: 12px;  "> 
 

         
        <div class="form-group col-md-3"   >     
            Buscar Usuario:                               
            <div @click="store.usuarioSelecionado = ''">
                <input    v-model="store.produtoSearch"  type="text" id="VALOR" class="form-control" placeholder="Buscar Usuario" />
            </div>
        </div>        

        <div   v-if="store.mesSelecionado" >
          Mês
            <select   class="mb-4 form-select form-select-lg w-100"   
                    v-model="store.mesSelecionado" 
                    @click="getUsuarios()"
                    >
                    <option :value="e" v-for="e, index in distinctMes().sort()" v-key="index" 
                     >
                        {{  e  }}                
                    </option> 
            </select>
        </div>
</div>


    <div  class="layout-px-spacing" >
        <!-- CRUD -->
 
   <!-- Novo Filtro Busca -->
 
   <div class="table-light table-responsive">
   
                                
    <div >
 

      <div style="font-size: 12px; max-width: 850px; color: #060606"
      v-if="!store.usuarioSelecionado"
      > 
        <table>
            <tr>
                <th>Empresa</th> 
                <th>Nome</th>
                <th>Funcao</th>
                <th>#</th>
            </tr>
            <tr v-if="store.produtoSearch != ''" v-for="u, indexU in store.usuariosGrupo?.filter(f => f.MES == store.mesSelecionado && f.NOME_COMPLETO.toLowerCase().includes(store.produtoSearch?.toLocaleLowerCase()))" :key="indexU">
                <td>{{ u.COD_EMPRESA }} - {{u.MARCA}}</td> 
                <td>{{ u.NOME }} - {{ u.NOME_COMPLETO }}</td>
                <td>{{ u.FUNCAO }} - {{ u.MES }}</td>
                <td><div class="btn btn-success mt-3"
                         @click="store.usuarioSelecionado = u;
                                 selecionarUsuario(u);
                                 store.produtoSearch = u.NOME_COMPLETO;
                                 store.comissaoAvulsa = [];
                                 store.editando = true;
                                 store.cadastroItem.VALOR = ''
                                 store.cadastroItem.DATA = ''
                                 store.cadastroItem.DESC_ITEM = ''
                                 getComissaoAvulsa();
                                "
                    >Selecionar</div></td>
                
            </tr>           
            </table>
      </div> 
     

      <div v-if="store.usuarioSelecionado && store.editando"
                class="col-xl-10 col-lg-6 col-md-6 col-sm-10 col-10" style="margin-bottom: 24px">
                <div class="statbox panel box box-shadow">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                <h4>Cadastro de Comissão Facil - Diversos</h4>
                            </div>
                        </div>   
                    </div>
                    <div class="panel-body">
                        <div > 
                         
                            <div class="row">   

                                    <div   class="table-light table-responsive" v-if="store.usuarioSelecionado && store.cadastroItem.ID == 0 ">
                                        Tipo Comissão
                                        <select   class="mb-4 form-select form-select-lg w-25"   
                                                v-model="store.tipoComissaoSelecionada"   
                                                >
                                                <option :value="e.TIPO"     v-for="e, index in  store.tipoComissaoAvulsaNew" v-key="index"  >
                                                    {{e.TIPO }} 
                                                </option> 
                                        </select>
                                    </div>

                                 

                                    <div   class="table-light table-responsive" v-if="store.usuarioSelecionado && store.cadastroItem.ID > 0">
                                        Tipo Comissão edição
                                        <select   class="mb-4 form-select form-select-lg w-25"   
                                                v-model="store.tipoComissaoSelecionada"   
                                                >
                                                <option :value="store.tipoComissaoSelecionada"   v-key="index"  >
                                                    {{store.tipoComissaoSelecionada }}
                                                </option> 
                                        </select>
                                    </div>

                             
                                
                                <div class="form-group col-md-3" >
                                    <label class="col-form-label pt-0" for="DATA">Data</label>
                                    <div>
                                        <input  v-model="store.cadastroItem.DATA" type="date" id="DATA" class="form-control" placeholder="DATA" />
                                    </div>
                                </div>                               
                              
                             
                                <div class="form-group col-md-3">
                                    <label class="col-form-label pt-0" for="VALOR">Valor do Serviço</label>
                                    <div>
                                        <input v-model="store.cadastroItem.VALOR"  type="text" id="VALOR" class="form-control" placeholder="VALOR" />
                                    </div>
                                </div>    
                                
                                <div class="form-group col-md-5">
                                    <label class="col-form-label pt-0" for="DESC_ITEM">Descricao</label>
                                    <div>
                                        <input  v-model="store.cadastroItem.DESC_ITEM" type="text" id="DESC_ITEM" class="form-control" placeholder="Descricao" />
                                    </div>
                                </div>
                                               
                            </div>
    
                       
                            
                            <button v-if="   store.tipoComissaoSelecionada
                                          && store.cadastroItem.VALOR != ''
                                          && store.cadastroItem.DATA
                            "
                                     @click="confirmar(store.cadastroItem.ID); " type="" class="btn btn-success mt-3">CONFIRMAR</button>
                            <button style="margin-left: 10px;" 
                                                    @click="store.editando = false;
                                                         store.cadastroItem.ID=0    
                                                    " type="" class="btn btn-danger mt-3">CANCELAR</button>
                        
                        </div>
                    </div>
                </div>
            </div>
    </div>
   </div>
 
   
   <!-- Novo Filtro Busca -->
    
        <!-- SVG BOTAO INSERIR -->
      
    
            
            
    
             <div v-if="store.usuarioSelecionado"
                style=" display: flex;
                        max-width: 50px; 
                "
             >

                <div @click="store.editando = true">
                <svg   enable-background="new 0 0 512 512" fill="#43B05C" height="25px"   version="1.1" 
                viewBox="0 0 512 512" width="30px"  xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M256,512C114.625,512,0,397.391,0,256C0,114.609,114.625,0,256,0c141.391,0,256,114.609,256,256  C512,397.391,397.391,512,256,512z M256,64C149.969,64,64,149.969,64,256s85.969,192,192,192c106.047,0,192-85.969,192-192  S362.047,64,256,64z M288,384h-64v-96h-96v-64h96v-96h64v96h96v64h-96V384z"/></svg>      
            </div>
         
            <div @click="getComissaoAvulsa();
                store.cadastroItem.ID=0">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="25px"   viewBox="0 0 1280.000000 1266.000000"
                        preserveAspectRatio="xMidYMid meet"> 
                        <g transform="translate(0.000000,1266.000000) scale(0.100000,-0.100000)"
                        fill="#43B05C" stroke="none">
                        <path d="M6130 12653 c-1136 -47 -2253 -397 -3200 -1002 -1163 -744 -2048                        -1830 -2525 -3096 -433 -1150 -520 -2406 -249 -3595 169 -740 463 -1430 880                        -2063 765 -1161 1874 -2034 3189 -2509 977 -354 2044 -467 3080 -328 1388 186                        2694 829 3675 1810 129 129 1201 1318 1207 1339 2 8 -1951 1746 -1964 1746 -5                        0 -200 -214 -433 -475 -596 -668 -655 -732 -782 -847 -599 -539 -1284 -857                        -2083 -964 -292 -39 -726 -36 -1025 7 -1069 153 -1996 719 -2605 1589 -746                        1066 -863 2457 -305 3632 359 755 979 1375 1745 1744 387 186 728 287 1180                        351 213 29 712 33 927 5 649 -82 1206 -288 1723 -638 269 -182 481 -372 781                        -704 153 -168 162 -181 146 -196 -9 -9 -287 -254 -617 -544 -330 -291 -601                        -532 -603 -537 -2 -4 4 -8 13 -8 8 0 305 -68 658 -150 353 -83 851 -200 1107                        -260 256 -60 726 -170 1045 -245 319 -75 831 -195 1138 -267 307 -71 560 -128                        562 -126 3 2 -47 960 -110 2129 -63 1168 -119 2221 -126 2339 -6 118 -14 245                        -17 282 l-7 67 -520 -459 c-286 -252 -522 -459 -525 -459 -3 -1 -66 67 -140                        150 -194 219 -425 458 -575 595 -1250 1147 -2934 1759 -4645 1687z"/>
                        </g>
            </svg> 
            </div>
           
     
</div>
 

      <!-- gridview consorcio -->
      <div v-if="store.comissaoAvulsa?.length > 0" style="padding: 0px 45px 0px 0px">
     
     <table style="background-color: white;" role="table" aria-busy="false" aria-colcount="5" class="table b-table table-hover" id="__BVID__310">
             <thead role="rowgroup" class="">
                 <tr role="row" class="">
                     <th role="columnheader" scope="col" aria-colindex="1" class=""><div>#</div></th>
                     <th role="columnheader" scope="col" aria-colindex="2" class=""><div>TIPO</div></th>
                     <th role="columnheader" scope="col" aria-colindex="3" class=""><div>EMPRESA</div></th>
                     <th role="columnheader" scope="col" aria-colindex="5" class=""><div>DATA</div></th>
                       <th role="columnheader" scope="col" aria-colindex="9" class=""><div>DESC_ITEM</div></th>
                      <th role="columnheader" scope="col" aria-colindex="10" class=""><div>VALOR</div></th>                    
                     <th role="columnheader" scope="col" aria-colindex="11" class=""><div>...</div></th>
                     
                 </tr>
             </thead>
             <tbody v-for="(item, i) in store.comissaoAvulsa?.filter(f =>  f.VENDEDOR == store.usuarioSelecionado?.NOME)" :key="item.name" role="rowgroup">
                 <tr role="row" class="">
                     <td aria-colindex="1" role="cell" class="">{{ item.ID }}</td>
                     <td aria-colindex="2" role="cell" class="">{{ item.TIPO }}</td>
                     <td aria-colindex="3" role="cell" class="">{{ item.EMPRESA}}</td>
                     <td aria-colindex="5" role="cell" class="">{{ item.DATA }}</td>
                     <td aria-colindex="9" role="cell" class="">{{ item.DESC_ITEM || item.MODELO }}</td>                        
                     <td aria-colindex="10" role="cell" class="">{{ item.VALOR }}</td>                     
                                          
                     <td >
                           <svg @click="selectItemEdit(item)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>                                 
                            <svg  @click="store.cancelando = item" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"                     width="24" height="24" viewBox="0 0 729.837 729.838" style="enable-background:new 0 0 729.837 729.838;"	 xml:space="preserve"><g>	<g>		<g>			<path d="M589.193,222.04c0-6.296,5.106-11.404,11.402-11.404S612,215.767,612,222.04v437.476c0,19.314-7.936,36.896-20.67,49.653				c-12.733,12.734-30.339,20.669-49.653,20.669H188.162c-19.315,0-36.943-7.935-49.654-20.669				c-12.734-12.734-20.669-30.313-20.669-49.653V222.04c0-6.296,5.108-11.404,11.403-11.404c6.296,0,11.404,5.131,11.404,11.404				v437.476c0,13.02,5.37,24.922,13.97,33.521c8.6,8.601,20.503,13.993,33.522,13.993h353.517c13.019,0,24.896-5.394,33.498-13.993				c8.624-8.624,13.992-20.503,13.992-33.498V222.04H589.193z"/>			<path d="M279.866,630.056c0,6.296-5.108,11.403-11.404,11.403s-11.404-5.107-11.404-11.403v-405.07				c0-6.296,5.108-11.404,11.404-11.404s11.404,5.108,11.404,11.404V630.056z"/>			<path d="M376.323,630.056c0,6.296-5.107,11.403-11.403,11.403s-11.404-5.107-11.404-11.403v-405.07				c0-6.296,5.108-11.404,11.404-11.404s11.403,5.108,11.403,11.404V630.056z"/>			<path d="M472.803,630.056c0,6.296-5.106,11.403-11.402,11.403c-6.297,0-11.404-5.107-11.404-11.403v-405.07				c0-6.296,5.107-11.404,11.404-11.404c6.296,0,11.402,5.108,11.402,11.404V630.056L472.803,630.056z"/>			<path d="M273.214,70.323c0,6.296-5.108,11.404-11.404,11.404c-6.295,0-11.403-5.108-11.403-11.404				c0-19.363,7.911-36.943,20.646-49.677C283.787,7.911,301.368,0,320.73,0h88.379c19.339,0,36.92,7.935,49.652,20.669				c12.734,12.734,20.67,30.362,20.67,49.654c0,6.296-5.107,11.404-11.403,11.404s-11.403-5.108-11.403-11.404				c0-13.019-5.369-24.922-13.97-33.522c-8.602-8.601-20.503-13.994-33.522-13.994h-88.378c-13.043,0-24.922,5.369-33.546,13.97				C278.583,45.401,273.214,57.28,273.214,70.323z"/>			<path d="M99.782,103.108h530.273c11.189,0,21.405,4.585,28.818,11.998l0.047,0.048c7.413,7.412,11.998,17.628,11.998,28.818				v29.46c0,6.295-5.108,11.403-11.404,11.403h-0.309H70.323c-6.296,0-11.404-5.108-11.404-11.403v-0.285v-29.175				c0-11.166,4.585-21.406,11.998-28.818l0.048-0.048C78.377,107.694,88.616,103.108,99.782,103.108L99.782,103.108z				 M630.056,125.916H99.782c-4.965,0-9.503,2.02-12.734,5.274L87,131.238c-3.255,3.23-5.274,7.745-5.274,12.734v18.056h566.361				v-18.056c0-4.965-2.02-9.503-5.273-12.734l-0.049-0.048C639.536,127.936,635.021,125.916,630.056,125.916z"/>		</g>	</g></g>                     </svg>                                          
                    </td>
                    </tr>
             </tbody>      
         </table>

          <!-- confirmar o cancelamento -->     
     
        <div class="modal-dialog modal-md modal-dialog-centered"
         v-if="store.cancelando?.ID > 1"
        style=" 
            background-color: white;
             max-width: 450px;
             
            ">
             
               
             
             <div id="deleteConformation"   aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md modal-dialog-centered">
                <div class="modal-content mailbox-popup">
                    <div class="modal-header">
                        <div class="icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-trash-2"
                            >
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </div>
                        <h5 class="modal-title" id="exampleModalLabel">Deletar comissão?</h5>
                        <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
                    </div>
                    <div class="modal-body" style="font: bold;">
                        <p style="color: #060606;">Tem certeza que deseja deletar o lancamento da comissao Nº:  {{ store.cancelando?.ID }} ?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"   @click="store.cancelando = null">Cancelar</button>
                        <button type="button" data-remove="task" class="btn btn-danger"  @click="deleteItem(store.cancelando); store.cancelando = null">Deletar</button>
                    </div>
                </div>
            </div>
        </div>


        </div>

       
       
 </div>         
 </div>
</template>
    
    <script setup>
        import {indexStore} from '../../store/IndexStore' 
        import { onMounted, ref, computed } from 'vue';
        import axios from 'axios'
        import { useMeta } from '@/composables/use-meta'; 
        import { updateDoc } from 'firebase/firestore';
        useMeta({ title: 'GRUPO AGP' });
        const store = indexStore(); 
      
        store.usuariosTipoAvulso = []
        store.tipoComissaoAvulsa = []
        store.empresaSelecionada = 0 
        store.tipoComissaoSelecionada = null
        store.tipoFuncaoSelecionada = null
        store.subtipoComissaoSelecionada = null
        store.cadastroItem.DATA = '08/29/2023'
       

        store.subGrupoComissoes = []

        onMounted(() => {
            bind_data();
        });
    
        const bind_data = async  () => {
            store.itensCadastro = []
            store.itensHistorico = []             
            store.usuariosGrupo = [] 
            store.modelos = []            
            async function getFuncoes(){
            store.funcoes   = (await axios.get(store.baseApiHTTPS+'/funcoes')).data 
        }
        getFuncoes()
         
        async function getEmpresas()  {
                if (1 == 1) { 
                var empresasResult = await axios.get(store.baseApiHTTPS+'/empresas') 
                store.empresasGrupo = []
                empresasResult.data.map( x => 
                    {  const dados = {  
                                        "EMPRESA": x.COD_EMPRESA,
                                        "NOME":    x.NOME,
                                        "MARCA":   x.MARCA,
                                        "MARCA_VEIC": x.MARCA_VEIC
                                    }
                    store.empresasGrupo.push(dados)
                    })   
                } 
            }       
    
            getEmpresas()

        async function getModelos()  {
                if (1 == 1) { 
                var busca = await axios.get(store.baseApiHTTPS+'/modelos') 
                 
                store.modelos =  busca.data.filter(f => f.NOVO_USADO =='N' 
                                                && f.DESCRICAO_MARCA == store.empresasGrupo.filter(f => f.EMPRESA == store.empresaSelecionada).map(x => x.MARCA_VEIC)[0])
                                                 
                } 
            }       
    
            getModelos()

           
    
            async function getRegrasComissao() { 
                store.tipoComissaoAvulsa = [{ "TIPO": 'CREDITO-VENDAS'},
                                            { "TIPO": 'DEBITO-VENDAS'},
                                            { "TIPO": 'CREDITO-PREMIO'},
                                            { "TIPO": 'DEBITO-PREMIO'},
                                            ]
                if (1==1) {                      
                  
                var   regrasComissao   = await axios.get(store.baseApiHTTPS+'/regracomissao')                 
                    regrasComissao.data.filter(f => f.PERMITE_AVULSO=='S' 
                                                 && f.ID  != 0
                    
                                                ).map( x => 
                            {  const dados = {      
                                                    "COD_EMPRESA":      x.COD_EMPRESA, 
                                                    "COD_FUNCAO":       x.COD_FUNCAO,                                                
                                                    "TIPO":         x.TIPO_COMISSAO,
                                                    "PERMITE_AVULSO": x.PERMITE_AVULSO,
                                                    "MES":          x.MES
                                                } 
                                                store.tipoComissaoAvulsa.push(dados) 
                                } 
                        )
                        
                }
            
            }
            getRegrasComissao() 
   
            getUsuarios()
    
    
        }
    
        function selecionarUsuario (usuario){
                store.tipoComissaoAvulsaNew = []
                store.tipoComissaoAvulsaNew = store.tipoComissaoAvulsa.filter(f => f.COD_EMPRESA == usuario.COD_EMPRESA && f.COD_FUNCAO ==usuario.COD_FUNCAO && f.MES == usuario.MES)
                store.tipoComissaoAvulsaNew.push({ "COD_EMPRESA": usuario.COD_EMPRESA, "COD_FUNCAO": usuario.COD_FUNCAO, "TIPO": 'CREDITO-VENDAS', "MES": store.mesSelecionado},
                                                { "COD_EMPRESA": usuario.COD_EMPRESA, "COD_FUNCAO": usuario.COD_FUNCAO, "TIPO": 'CREDITO-PREMIO', "MES": store.mesSelecionado},
                                                 { "COD_EMPRESA": usuario.COD_EMPRESA, "COD_FUNCAO": usuario.COD_FUNCAO, "TIPO": 'DEBITO-VENDAS', "MES": store.mesSelecionado},                                                 
                                                 { "COD_EMPRESA": usuario.COD_EMPRESA, "COD_FUNCAO": usuario.COD_FUNCAO, "TIPO": 'DEBITO-PREMIO', "MES": store.mesSelecionado}
                                                        )
            }
 
      
        async function getComissaoAvulsa() {
                if (1) {                       
                store.comissaoAvulsa = [] 
                var mesAjustado = store.mesSelecionado.replace('/','-')
                var   regrasComissao   = await axios.get(store.baseApiHTTPS+'/facil/'+mesAjustado)                 
                    regrasComissao.data.map( x => 
                            {  const dados = {      
                                                    "ID":           x.ID,
                                                    "EMPRESA":      x.COD_EMPRESA,
                                                    "TIPO":         x.TIPO,
                                                    "VENDEDOR":     x.VENDEDOR,
                                                    "DATA":         x.DATA,
                                                    "COD_CLIENTE":  x.COD_CLIENTE,
                                                    "CLIENTE":      x.CLIENTE,
                                                    "CHASSI":       x.CHASSI,
                                                    "REGISTRO":     x.REGISTRO,
                                                    "DESC_ITEM":    x.DESC_ITEM,
                                                    "ANO_MODELO":   x.ANO_MODELO,
                                                    "VALOR":        x.VALOR,
                                                    "FAMILIA":      x.FAMILIA,
                                                    "MODELO":       x.MODELO,
                                                    "GRUPO_COTA":   x.GRUPO_COTA,
                                                    "DIA":   x.DIA,
                                                    "STATUS":       x.STATUS,
                                                    "GRUPO":        store.subGrupoComissoes?.filter(f => f.name==x.TIPO).map(x => x.GRUPO)[0]
                                                } 
                                            store.comissaoAvulsa.push(dados) 
                                            
                                } 
                        )
                }
            
            }

            async function getUsuarios () {
                store.usuariosGrupo = []
            if (1 == 1)  {
                var mesAjustado = store.mesSelecionado.replace('/','-')
            var usuariosResult = await axios.get(store.baseApiHTTPS+'/usuarios/'+mesAjustado) 
            
            usuariosResult.data.map( x => 
                {  const dados = {  "COD_EMPRESA":  x.COD_EMPRESA,
                                    "NOME":     x.NOME,
                                    "FUNCAO":   x.FUNCAO,
                                    "COD_FUNCAO": x.COD_FUNCAO,
                                    "DPTO":     x.DPTO,
                                    "NOME_COMPLETO": x.NOME_COMPLETO,
                                    "MES": x.MES,
                                    "MARCA": x.MARCA
                                }
                store.usuariosGrupo.push(dados)
                } 
            )
    
            var arr = []
            usuariosResult.data.map( x => 
                {  const dados = {  "COD_EMPRESA":  x.COD_EMPRESA,                                
                                    "FUNCAO":   x.FUNCAO,     
                                    "COD_FUNCAO":   x.COD_FUNCAO,                            
                                }
                arr.push(dados)
                } 
            )
            const parsed_array = arr.map(val=>{return JSON.stringify(val)})
            store.empresasFuncao = parsed_array.filter((value, ind)=> parsed_array.indexOf(value) == ind).map((val)=>{return JSON.parse(val)})
            }
    
            }    
     
    function selectItemEdit (props) {
        store.editando = true
        console.log(props)
 
        store.tipoComissaoSelecionada = props.TIPO,
        store.cadastroItem.ID = props.ID,
        store.cadastroItem.COD_EMPRESA = props.EMPRESA, 
        store.cadastroItem.TIPO = props.TIPO , 
        store.cadastroItem.VENDEDOR = props.VENDEDOR, 
        store.cadastroItem.DATA = props.DATA, 
        store.cadastroItem.DESC_ITEM = props.DESC_ITEM,
        store.cadastroItem.VALOR = props.VALOR
        
    }
    
    
    function editItem(id){        
        console.log('Editando Item ID: '+store.cadastroItem.ID)
        
        let valor = store.cadastroItem.VALOR;
                if(store.tipoComissaoSelecionada.substring(0,7) == 'CREDITO'){
                    valor =  store.cadastroItem.VALOR.replace(',','.')
                } 
                if(store.tipoComissaoSelecionada.substring(0,6) == 'DEBITO'){
                    valor = store.cadastroItem.VALOR.replace(',','.') * -1
                }
               

    var data = 
    JSON.stringify ( {  
                        "COD_EMPRESA":  store.cadastroItem.COD_EMPRESA || 99,
                        "DESC_ITEM":    store.cadastroItem.DESC_ITEM,
                        "VALOR":        valor,
                        "ID": store.cadastroItem.ID 
                        
                    } 
                )
    
    var config = {
        method: 'put',
        maxBodyLength: Infinity,        
        url: store.baseApiHTTPS+'/facil/'+store.cadastroItem.ID,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };
    
        axios(config)
        .then(function (response) { 
 
            console.log(JSON.stringify(response.data));
            showMessage('Comissão Atualizada com sucesso.');
            getComissaoAvulsa()
        
        })
        .catch(function (error) {
         
        });
    
    }
    
     function createItem(tipo,valor1){
        var data = {}
        console.log('Cadastrando Novo Item')
 
            let valor = store.cadastroItem.VALOR.replace(',','.')
                if(store.tipoComissaoSelecionada == 'CREDITO-VENDAS'){
                    valor =  store.cadastroItem.VALOR.replace(',','.')
                }
                if(store.tipoComissaoSelecionada == 'CREDITO-PREMIO'){
                    valor = store.cadastroItem.VALOR.replace(',','.')
                }
                if(store.tipoComissaoSelecionada == 'DEBITO-VENDAS'){
                    valor = store.cadastroItem.VALOR.replace(',','.') * -1
                }
                if(store.tipoComissaoSelecionada == 'DEBITO-PREMIO'){
                    valor = store.cadastroItem.VALOR.replace(',','.') * -1
                }

                let tipo1 = store.tipoComissaoSelecionada
                if (store.tipoComissaoSelecionada.match('CREDITO')){
                    tipo1 = store.tipoComissaoSelecionada+'-'+store.usuarioSelecionado.NOME
                } 
                if (store.tipoComissaoSelecionada.match('DEBITO')){
                    tipo1 = store.tipoComissaoSelecionada+'-'+store.usuarioSelecionado.NOME
                } 


        data = JSON.stringify( 
               
                            {  
                            "COD_EMPRESA":  store.usuarioSelecionado.COD_EMPRESA , 
                            "TIPO":         tipo1, 
                            "VENDEDOR":     store.usuarioSelecionado.NOME, 
                            "DATA":         dataAtualFormatada(store.cadastroItem.DATA), 
                            "COD_CLIENTE":  11111111, 
                            "CHASSI":       store.cadastroItem.CHASSI, 
                            "REGISTRO":     store.cadastroItem.REGISTRO || 9999999, 
                            "DESC_ITEM":    store.cadastroItem.DESC_ITEM,
                            "ANO_MODELO":   store.cadastroItem.ANO_MODELO,
                            "VALOR":        valor,
                            "FAMILIA":      store.cadastroItem.FAMILIA,
                            "MODELO":       store.cadastroItem.MODELO,
                            "GRUPO_COTA":   store.cadastroItem.GRUPO_COTA,
                            "DIA":          store.cadastroItem.DIA,
                            "STATUS":        store.cadastroItem.STATUS
                            } )
         
           
        
    
    var config = {
      method: 'post',
    maxBodyLength: Infinity,
      url: store.baseApiHTTPS+'/facil',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      showMessage('Comissão incluida com sucesso!!!');
      getComissaoAvulsa()
      bind_data()
    })
    .catch(function (error) {
      console.log(error);
    });
    
     }
    
     function confirmar (id) {
        console.log('Valor do ID: ' + id)
        if (id > 0) {
            editItem(id)
        }else{            
            if(store.tipoComissaoSelecionada == 'SDR'){
                store.subGrupoComissoes.map(x => {
                    console.log(x)
                    createItem(x.name,x.value)
                })
            }else {
                createItem()
            }
        }
        store.editando = false
        store.cadastroItem.ID=0    
     }
    
     function deleteItem(props){
        store.editando = false
        store.cadastroItem.ID=0
        
        var data =   {"ID" : props.ID}  
    
                    var config = {
                    method: 'delete',
                    maxBodyLength: Infinity,
                    url: store.baseApiHTTPS+'/facil/'+props.ID,
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    data : data
                    };
    
                    axios(config)
                    .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    showMessage('Comissão detetada com sucesso.');
                    getComissaoAvulsa()
                    
                    })
                    .catch(function (error) {
                    console.log(error); 
                    });
    
     }

     const showMessage = (msg = '', type = 'success') => {
        const toast = window.Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };
     
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
    
     
    
    function dataAtualFormatada(d){ 
    var data =  new Date(d),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  =  data.toLocaleDateString('en-GB', { month: 'short'  })  ,
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"-"+mes+"-"+anoF;
    }

    function dataComparar(d){ 
    var data =  new Date(d),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  =  (data.getMonth() +1).toString()  ,
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return mesF+'/'+anoF;
    }


    const tomorrow = (dt) => {
  
  // Creating the date instance
  let d = new Date(dt);

  // Adding one date to the present date
  d.setDate(d.getDate() + 1);

  let year = d.getFullYear()
  let month = String(d.getMonth() + 1)
  let day = String(d.getDate())
  let mes = null

  // Adding leading 0 if the day or month
  // is one digit value
  month = month.length == 1 ? 
      month.padStart('2', '0') : month;

      if(month == '01'){ mes = 'Jan' }
      if(month == '02'){ mes = 'Feb' }
      if(month == '03'){ mes = 'Mar' }
      if(month == '04'){ mes = 'Apr' }
      if(month == '05'){ mes = 'May' }
      if(month == '06'){ mes = 'Jun' }
      if(month == '07'){ mes = 'Jul' }
      if(month == '08'){ mes = 'Aug' }
      if(month == '09'){ mes = 'Sept' }
      if(month == '10'){ mes = 'Oct' }
      if(month == '11'){ mes = 'Nov' }
      if(month == '12'){ mes = 'Dec' }        


  day = day.length == 1 ? 
      day.padStart('2', '0') : day;

  // Printing the present date
  console.log(`${day}-${mes}-${year}`)
  return(`${day}-${mes}-${year}`);
  }
    

  function distinctMes() {
            const data = store.tipoComissaoAvulsa
            const unique = [...new Set(data.map(item => item.MES))]    
            return unique
        }

  function distinctFamilia() {
    const data = store.modelos
    const unique = [...new Set(data.map(item => item.DESCRICAO_PRODUTO))]    
    return unique
 }

    function dataFormatada(d){ 
        var data =  new Date(d),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return anoF+"-"+mesF+"-"+diaF;
        }
  
 
 

    function distinctFuncao() {
        const teste = []
        const data1 = store.tipoComissaoAvulsa
        const uniqueCodFuncao1 = [...new Set(data1.map(item => item.COD_FUNCAO))] 

        uniqueCodFuncao1.map(func1 => {
            store.usuariosGrupo.filter(f=> f.COD_FUNCAO == func1).map(u => {
                const dataUser = {
                    "COD_EMPRESA":   u.COD_EMPRESA,
                    "COD_FUNCAO" :   u.COD_FUNCAO,
                    "FUNCAO"     :   u.FUNCAO,
                    "NOME"       :   u.NOME 
                }
                teste.push(dataUser)
                if (store.usuariosTipoAvulso.filter(f=> f.NOME == u.NOME).length < 1 ){
                    store.usuariosTipoAvulso?.push(dataUser)
                }
                
            })
        })

        const data = teste.filter(f=> f.COD_EMPRESA==store.empresaSelecionada)
        const uniqueFuncao = [...new Set(data.map(item => item.FUNCAO))]
        return uniqueFuncao
    }
    

    
     
    </script>
    
    <style scoped>
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    
    td, th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }
    
    tr:nth-child(even) {
      background-color: #dddddd;
    }
    </style>
    
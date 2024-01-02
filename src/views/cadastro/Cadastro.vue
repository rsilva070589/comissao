<template>
 
    <div  class="layout-px-spacing" >
        <!-- CRUD -->
        <!-- FIltro Empresa Funcao -->
        <div   v-if="!store.editando" style="display: flex;" >

        <div   class="table-light table-responsive" style="margin-right: 10px;" >
        Mês
            <select   class="mb-4 form-select form-select-lg w-100"   
                    v-model="store.mesSelecionado"  
                    @click="() => store.tipoComissaoSelecionada = null"
                    >
                    <option :value="e" v-for="e, index in distinctMes().sort()" v-key="index"  >
                        {{  e  }}                
                    </option> 
            </select>
        </div>
    
            <div   class="table-light table-responsive">
            Empresa
            <select   class="mb-4 form-select form-select-lg w-100"   
                    v-model="store.empresaSelecionada"                         
                    >
                    <option :value="e.EMPRESA" v-for="e, index in store.empresasGrupo" v-key="index"  >
                        {{  e.EMPRESA  }}  {{  e.NOME  }}                 
                    </option> 
            </select>
            </div>
    
            <div   class="table-light table-responsive" v-if="store.empresaSelecionada > 1">
                Função
                <select   class="mb-4 form-select form-select-lg w-100"   
                        v-model="store.funcaoSelecionada"   
                        >
                        <option :value="e.COD_FUNCAO"     v-for="e, index in store.funcoes.filter(f=> f.COD_EMPRESA==store.empresaSelecionada)"  >
                            {{e.FUNCAO}} 
                        </option> 
                </select>
            </div>


            <div   class="table-light table-responsive"  >
                Colaborador
                <select   class="mb-4 form-select form-select-lg w-100"   
                        v-model="store.colaboradorSelecionado">
                        <option :value="e.NOME" v-for="e, index in store.usuariosGrupo?.filter( f => f.COD_FUNCAO == store.funcaoSelecionada && f.COD_EMPRESA == store.empresaSelecionada).sort() " v-key="index"  >
                            {{e.NOME_COMPLETO}}
                        </option> 
                </select>
            </div>
            
     
            <div   class="table-light table-responsive" v-if="store.empresaSelecionada > 1">
                Tipo Comissão
                <select   class="mb-4 form-select form-select-lg w-100"   
                        v-model="store.tipoComissaoSelecionada"   
                        >
                        <option :value="e.TIPO"     v-for="e, index in  store.tipoComissaoAvulsa?.filter(f=>    f.MES ==store.mesSelecionado && f.COD_EMPRESA == store.empresaSelecionada
                                                                                                            &&  f.COD_FUNCAO == store.funcaoSelecionada)" v-key="index"  >
                            {{e.TIPO}} 
                        </option> 
                </select>
            </div>


           
     
    
     
            </div>
 
    
        <div v-if="store.editando">
        
            <div class="row layout-top-spacing"
                            > 
                        
             <div v-if="store.tipoComissaoSelecionada != 'CONSORCIO' 
                            && store.tipoComissaoSelecionada != 'SDR'"
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
                                <div class="form-group col-md-4">
                                    <label class="col-form-label pt-0" for="CATEGORIA">Empresa</label>
                                    <div style="font-size: 20px;" >
                                        {{store.empresaSelecionada}}
                                    </div>
                                </div>
                                
                                <div class="form-group col-md-3">
                                    <label class="col-form-label pt-0" for="CATEGORIA">Tipo de Comissão</label>
                                    <div style="font-size: 20px;" >                                
                                        {{store.tipoComissaoSelecionada}}
                                    </div>
                                </div>
    
                                <div class="form-group col-md-3">
                                    <label class="col-form-label pt-0" for="CATEGORIA">Colaborador</label>
                                    <div style="font-size: 20px;" >
                                     {{store.colaboradorSelecionado}}
                                    </div>
                                </div>                            
                             
                            </div>
    
    
                            <div class="row">  
                                
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
                                
                                <div class="form-group col-md-3">
                                    <label class="col-form-label pt-0" for="DESC_ITEM">Descricao</label>
                                    <div>
                                        <input  v-model="store.cadastroItem.DESC_ITEM" type="text" id="DESC_ITEM" class="form-control" placeholder="Descricao" />
                                    </div>
                                </div>
                                               
                            </div>
    
                       
                            
                            <button v-if="dataComparar(store.cadastroItem.DATA)  ==  store.mesSelecionado"
                                     @click="confirmar(store.cadastroItem.ID)" type="" class="btn btn-success mt-3">CONFIRMAR</button>
                            <button style="margin-left: 10px;" @click="store.editando = false " type="" class="btn btn-danger mt-3">CANCELAR</button>
                        
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="store.tipoComissaoSelecionada == 'CONSORCIO'"
                class="col-xl-10 col-lg-6 col-md-6 col-sm-10 col-10" style="margin-bottom: 24px">
                <div class="statbox panel box box-shadow">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                <h4>Cadastro Facil - Consorcio</h4>
                            </div>
                        </div>   
                    </div>
                    <div class="panel-body">
                        <div > 
                        
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label class="col-form-label pt-0" for="CATEGORIA">Empresa</label>
                                    <div>
                                        <select   class="mb-4 form-select form-select-lg w-100"   
                                        v-model="store.empresaSelecionada"
                                                @click="getRegrasComissao(store.empresaSelecionada)"            
                                                >
                                                <option :value="e.EMPRESA" v-for="e, index in store.empresasGrupo" v-key="index"  >
                                                    {{  e.EMPRESA  }}  {{  e.NOME  }}                 
                                                </option> 
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group col-md-3">
                                    <label class="col-form-label pt-0" for="CATEGORIA">SubTipo de Comissão</label>
                                    <div>                                   
                                        <select   class="mb-4 form-select form-select-lg w-100"   
                                                v-model="store.subtipoComissaoSelecionada">
                                                <option :value="e.name" v-for="e, index in store.subGrupoComissoes.filter(f => f.GRUPO == store.tipoComissaoSelecionada)" v-key="index"  >
                                                    {{e.name}}
                                                </option> 
                                        </select>
                                    </div>
                                </div>
    
                                <div class="form-group col-md-3">
                                    <label class="col-form-label pt-0" for="CATEGORIA">Colaborador</label>
                                    <div> 
                                        <select   class="mb-4 form-select form-select-lg w-100"   
                                                    v-model="store.colaboradorSelecionado">
                                                <option :value="e.NOME" v-for="e, index in store.usuariosGrupo.filter(f => f.EMPRESA == store.empresaSelecionada && f.COD_FUNCAO == store.tipoFuncaoSelecionada)" v-key="index"  >
                                                    {{e.NOME}} - {{ e.NOME_COMPLETO }}
                                                </option> 
                                        </select>
                                    </div>
                                </div>                            
                             
                            </div>
    
    
                            <div class="row">                        
                                <div class="form-group col-md-3">
                                    <label class="col-form-label pt-0"  >Data</label>
                                    <div>
                                        <input v-if="store.cadastroItem.ID == 0" v-model="store.cadastroItem.DATA" type="date" id="DATA" class="form-control"   />
                                        <span v-if="!store.cadastroItem.ID == 0" style="font-size: 25px;">{{ store.cadastroItem.DATA }}</span>
                                    </div>
                                </div>
                                <div class="form-group col-md-3">
                                    <label class="col-form-label pt-0" for="COD_CLIENTE">CPF / CNPJ</label>
                                    <div>
                                        <input v-model="store.cadastroItem.COD_CLIENTE"  type="text" id="COD_CLIENTE" class="form-control" placeholder="CPF / CNPJ" />
                                    </div>
                                </div>   
                                <div class="form-group col-md-3">
                                    <label class="col-form-label pt-0" for="CHASSI">Familia</label>
                                    <select class="mb-4 form-select form-select-lg w-100"
                                        v-model="store.cadastroItem.FAMILIA"
                                    >
                                        <option :value="f" v-for="f in distinctFamilia()">
                                        {{ f }}
                                        </option>
                                    </select>
                                </div>   
                                <div class="form-group col-md-3">
                                    <label class="col-form-label pt-0" for="CHASSI">Modelo</label>
                                    <select class="mb-4 form-select form-select-lg w-100"
                                            v-model="store.cadastroItem.MODELO"
                                    >
                                        <option :value="m.DESCRICAO_MODELO" v-for="m in store.modelos.filter(f => f.DESCRICAO_PRODUTO == store.cadastroItem.FAMILIA)">
                                        {{ m.DESCRICAO_MODELO }}-{{m.ANO_MODELO}}
                                        </option>
                                    </select>
                                </div>      
                                <div class="form-group col-md-3">
                                    <label class="col-form-label pt-0" for="REGISTRO">PROPOSTA</label>
                                    <div>
                                        <input v-model="store.cadastroItem.REGISTRO"  type="number" id="REGISTRO" class="form-control" placeholder="PROPOSTA" />
                                    </div>
                                </div>   
                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="GRUPO">GRUPO/COTA</label>
                                    <div>
                                        <input v-model="store.cadastroItem.GRUPO_COTA"  type="text" id="REGISTRO" class="form-control" placeholder="GRUPO/COTA" />
                                    </div>
                                </div>
                               
                              
                               
                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="VALOR">Valor</label>
                                    <div>
                                        <input v-model="store.cadastroItem.VALOR"  type="number" id="VALOR" class="form-control" placeholder="VALOR" />
                                    </div>
                                </div>         
                           
                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="STATUS">Dia Vencimento</label>
                                    <div>
                                        <input  v-model="store.cadastroItem.DIA" type="text" id="DESC_ITEM" class="form-control" placeholder="Dia Vencimento" />
                                    </div>
                                </div>     
                                <div class="form-group col-md-3">
                                    <label class="col-form-label pt-0" for="STATUS">Status</label>
                                    <select   class="mb-4 form-select form-select-lg w-100"   
                                                    v-model="store.cadastroItem.STATUS">
                                                <option value="PAGO">PAGO</option> 
                                                <option value="ABERTO">AGUARDANDO-PGTO</option>
                                                <option value="CANCELADO">CANCELADO</option>
                                        </select>
                                </div>                
                            </div>
    
                          
                            
                            <button @click="confirmar(store.cadastroItem.ID)" type="" class="btn btn-success mt-3">CONFIRMAR</button>
                            <button style="margin-left: 10px;" @click="store.editando = false " type="" class="btn btn-danger mt-3">CANCELAR</button>
                        
                        </div>
                    </div>
                </div>
            </div>

            <div   v-if="store.tipoComissaoSelecionada == 'SDR'"
                    class="col-xl-10 col-lg-6 col-md-6 col-sm-10 col-10" 
                    style="margin-bottom: 24px">
                <div class="statbox panel box box-shadow">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                <h4>Cadastro Facil SDR</h4>
                            </div>
                        </div>   
                    </div>

                   
                    <div class="panel-body">
                        <div > 
                        
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label class="col-form-label pt-0" for="CATEGORIA">Empresa</label>
                                    <div>
                                        <select   class="mb-4 form-select form-select-lg w-100"   
                                                v-model="store.empresaSelecionada"
                                                @click="getRegrasComissao(store.empresaSelecionada)"            
                                                >
                                                <option :value="e.EMPRESA" v-for="e, index in store.empresasGrupo" v-key="index"  >
                                                    {{  e.EMPRESA  }}  {{  e.NOME  }}                 
                                                </option> 
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group col-md-3">
                                    <label class="col-form-label pt-0" for="CATEGORIA">Tipo de Comissão</label>
                                    <div>                                   
                                        <select   class="mb-4 form-select form-select-lg w-100"   
                                                v-model="store.tipoComissaoSelecionada">
                                                <option :value="e.TIPO" v-for="e, index in store.tipoComissaoAvulsa.filter( f => f.EMPRESA == store.empresaSelecionada && f.PERMITE_AVULSO =='S')" v-key="index"  >
                                                    {{e.TIPO}}
                                                </option> 
                                        </select>
                                    </div>
                                </div>
    
                                <div class="form-group col-md-3">
                                    <label class="col-form-label pt-0" for="CATEGORIA">Colaborador</label>
                                    <div> 
                                        <select   class="mb-4 form-select form-select-lg w-100"   
                                                    v-model="store.colaboradorSelecionado">
                                                <option :value="e.NOME" v-for="e, index in store.usuariosGrupo.filter(f => f.COD_EMPRESA == store.empresaSelecionada && f.COD_FUNCAO == store.tipoFuncaoSelecionada)" v-key="index"  >
                                                    {{e.NOME}} - {{ e.NOME_COMPLETO }}
                                                </option> 
                                        </select>
                                    </div>
                                </div>                            
                             
                            </div>
    
 
                        

                                <div id="app" >
                                    <div v-for="item in store.subGrupoComissoes.filter(f => f.GRUPO ==  store.tipoComissaoSelecionada)" 
                                            style="font-size: 30px; 
                                                    display: flex; 
                                                    justify-content: space-between;
                                                    max-width: 850px;">
                                        <label style="font-size: 30px;">{{item.name}}:</label>

                                        <div style="padding: 5px;
                                            ">
                                            <input 
                                            style="width: 150px;"
                                                type="text" 
                                                name="item.name" 
                                                v-model="item.value">
                                                
                                        </div>
                                       
                                    </div>

                                <!-- Output for debugging purposes -->
                             
                                </div>


     
                            <button @click="confirmar(store.cadastroItem.ID)" type="" class="btn btn-success mt-3">CONFIRMAR</button>
                            <button style="margin-left: 10px;" @click="store.editando = false " type="" class="btn btn-danger mt-3">CANCELAR</button>
                        
                        </div>
                    </div>
                </div>
            </div>
    
                
        </div>
        </div>
    
        <!-- SVG BOTAO INSERIR -->
        <div
                v-if="!store.editando"
                @click="store.editando = true;  
                store.cadastroItem.ID=0">
    
            <svg version="1.1" id="Capa_1" width="30px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                viewBox="0 0 50 50" xml:space="preserve">
                <circle style="fill:#43B05C;" cx="25" cy="25" r="25"/>
                <line style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="25" y1="13" x2="25" y2="38"/>
                <line style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="37.5" y1="25" x2="12.5" y2="25"/>
            </svg>
        </div>

      <!-- gridview consorcio -->
      <div v-if="store.tipoComissaoSelecionada != 'CONSORCIO' && store.tipoComissaoSelecionada != 'SDR'" style="padding: 0px 45px 0px 0px">
     
     <table style="background-color: white;" role="table" aria-busy="false" aria-colcount="5" class="table b-table table-hover" id="__BVID__310">
             <thead role="rowgroup" class="">
                 <tr role="row" class="">
                     <th role="columnheader" scope="col" aria-colindex="1" class=""><div>#</div></th>
                     <th role="columnheader" scope="col" aria-colindex="2" class=""><div>TIPO</div></th>
                     <th role="columnheader" scope="col" aria-colindex="3" class=""><div>EMPRESA</div></th>
                     <th role="columnheader" scope="col" aria-colindex="5" class=""><div>DATA</div></th>
                       <th role="columnheader" scope="col" aria-colindex="9" class=""><div>DESC_ITEM</div></th>
                      <th role="columnheader" scope="col" aria-colindex="10" class=""><div>VALOR</div></th>
                      <th role="columnheader" scope="col" aria-colindex="10" class=""><div>STATUS</div></th>
                     <th role="columnheader" scope="col" aria-colindex="11" class=""><div>...</div></th>
                     
                 </tr>
             </thead>
             <tbody v-for="(item, i) in store.comissaoAvulsa?.filter(f => f.EMPRESA ==  store.empresaSelecionada  && f.VENDEDOR == store.colaboradorSelecionado)" :key="item.name" role="rowgroup">
                 <tr role="row" class="">
                     <td aria-colindex="1" role="cell" class="">{{ item.ID }}</td>
                     <td aria-colindex="2" role="cell" class="">{{ item.TIPO }}</td>
                     <td aria-colindex="3" role="cell" class="">{{ item.EMPRESA}}</td>
                     <td aria-colindex="5" role="cell" class="">{{ item.DATA }}</td>
                        <td aria-colindex="9" role="cell" class="">{{ item.DESC_ITEM || item.MODELO }}</td>                        
                      <td aria-colindex="10" role="cell" class="">{{ item.VALOR }}</td> 
                     
                     <td aria-colindex="10" role="cell" class="">
                     <span  v-if="item.STATUS=='PAGO'" style="color: green; font-size: 18px;">{{ item.STATUS }}</span>
                     <span  v-if="item.STATUS=='ABERTO'" style="color: rgb(255, 145, 0); font-size: 15px;">AGUARDANDO-PGTO</span>
                     <span  v-if="item.STATUS=='CANCELADO'" style="color: rgb(255, 30, 0); font-size: 15px;">{{ item.STATUS }}</span>
                     </td> 
                     
                     <td>
                     <svg @click="selectItemEdit(item)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
             
                     </td>
                 </tr>
             </tbody>
      
         </table>
 </div>     
    
    <!-- gridview consorcio -->
    <div v-if="store.tipoComissaoSelecionada == 'CONSORCIO'" style="padding: 0px 45px 0px 0px">
     
        <table style="background-color: white;" role="table" aria-busy="false" aria-colcount="5" class="table b-table table-hover" id="__BVID__310">
                <thead role="rowgroup" class="">
                    <tr role="row" class="">
                        <th role="columnheader" scope="col" aria-colindex="1" class=""><div>#</div></th>
                        <th role="columnheader" scope="col" aria-colindex="2" class=""><div>TIPO</div></th>
                        <th role="columnheader" scope="col" aria-colindex="3" class=""><div>EMPRESA</div></th>
                        <th role="columnheader" scope="col" aria-colindex="5" class=""><div>DATA</div></th>
                        <th role="columnheader" scope="col" aria-colindex="4" class=""><div>CLIENTE</div></th>                        
                        <th role="columnheader" scope="col" aria-colindex="6" class=""><div>COD_CLIENTE</div></th>                        
                        <th role="columnheader" scope="col" aria-colindex="8" class=""><div>REGISTRO</div></th> 
                        <th role="columnheader" scope="col" aria-colindex="7" class=""><div>GRUPO-COTA</div></th>                        
                        <th role="columnheader" scope="col" aria-colindex="9" class=""><div>DESC_ITEM</div></th>
                        <th role="columnheader" scope="col" aria-colindex="10" class=""><div>DIA</div></th>
                        <th role="columnheader" scope="col" aria-colindex="10" class=""><div>VALOR</div></th>
                         <th role="columnheader" scope="col" aria-colindex="10" class=""><div>STATUS</div></th>
                        <th role="columnheader" scope="col" aria-colindex="11" class=""><div>...</div></th>
                        
                    </tr>
                </thead>
                <tbody v-for="(item, i) in store.comissaoAvulsa?.filter(f => f.EMPRESA ==  store.empresaSelecionada && f.GRUPO == store.tipoComissaoSelecionada && f.VENDEDOR == store.colaboradorSelecionado)" :key="item.name" role="rowgroup">
                    <tr role="row" class="">
                        <td aria-colindex="1" role="cell" class="">{{ item.ID }}</td>
                        <td aria-colindex="2" role="cell" class="">{{ item.TIPO }}</td>
                        <td aria-colindex="3" role="cell" class="">{{ item.EMPRESA}}</td>
                        <td aria-colindex="5" role="cell" class="">{{ item.DATA }}</td>
                        <td aria-colindex="4" role="cell" class="">{{ item.CLIENTE || 'NAO CADASTRADO' }}</td>                        
                        <td aria-colindex="6" role="cell" class="">{{ item.COD_CLIENTE }}</td>
                        <td aria-colindex="8" role="cell" class="">{{ item.REGISTRO }}</td>
                        <td aria-colindex="7" role="cell" class="">{{ item.GRUPO_COTA}}</td>                                                
                        <td aria-colindex="9" role="cell" class="">{{ item.DESC_ITEM || item.MODELO }}</td>                        
                        <td aria-colindex="10" role="cell" class="">{{ item.DIA}}</td>
                        <td aria-colindex="10" role="cell" class="">{{ item.VALOR }}</td> 
                        
                        <td aria-colindex="10" role="cell" class="">
                        <span  v-if="item.STATUS=='PAGO'" style="color: green; font-size: 18px;">{{ item.STATUS }}</span>
                        <span  v-if="item.STATUS=='ABERTO'" style="color: rgb(255, 145, 0); font-size: 15px;">AGUARDANDO-PGTO</span>
                        <span  v-if="item.STATUS=='CANCELADO'" style="color: rgb(255, 30, 0); font-size: 15px;">{{ item.STATUS }}</span>
                        </td> 
                        
                        <td>
                        <svg @click="selectItemEdit(item)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                
                        </td>
                    </tr>
                </tbody>
         
            </table>
    </div>
         

  <!-- gridview consorcio -->
  <div v-if="store.tipoComissaoSelecionada == 'SDR'" style="padding: 0px 45px 0px 0px">
     
     <table style="background-color: white;" role="table" aria-busy="false" aria-colcount="5" class="table b-table table-hover" id="__BVID__310">
             <thead role="rowgroup" class="">
                 <tr role="row" class="">
                     <th role="columnheader" scope="col" aria-colindex="1" class=""><div>#</div></th>
                     <th role="columnheader" scope="col" aria-colindex="2" class=""><div>TIPO</div></th>
                     <th role="columnheader" scope="col" aria-colindex="3" class=""><div>EMPRESA</div></th>
                     <th role="columnheader" scope="col" aria-colindex="5" class=""><div>DATA</div></th>
                     <th role="columnheader" scope="col" aria-colindex="4" class=""><div>CLIENTE</div></th>                        
                     <th role="columnheader" scope="col" aria-colindex="6" class=""><div>COD_CLIENTE</div></th>                        
                     <th role="columnheader" scope="col" aria-colindex="8" class=""><div>REGISTRO</div></th> 
                     <th role="columnheader" scope="col" aria-colindex="7" class=""><div>GRUPO-COTA</div></th>                        
                     <th role="columnheader" scope="col" aria-colindex="9" class=""><div>DESC_ITEM</div></th>
                     <th role="columnheader" scope="col" aria-colindex="10" class=""><div>DIA</div></th>
                     <th role="columnheader" scope="col" aria-colindex="10" class=""><div>VALOR</div></th>
                      <th role="columnheader" scope="col" aria-colindex="10" class=""><div>STATUS</div></th>
                     <th role="columnheader" scope="col" aria-colindex="11" class=""><div>...</div></th>
                     
                 </tr>
             </thead>
             <tbody v-for="(item, i) in store.comissaoAvulsa?.filter(f => f.EMPRESA  == store.empresaSelecionada 
                                                                          && f.GRUPO    == store.tipoComissaoSelecionada 
                                                                          && f.VENDEDOR == store.colaboradorSelecionado)" 
                                    :key="item.name" role="rowgroup">
                 <tr role="row" class="">
                     <td aria-colindex="1" role="cell" class="">{{ item.ID }}</td>
                     <td aria-colindex="2" role="cell" class="">{{ item.TIPO }}</td>
                     <td aria-colindex="3" role="cell" class="">{{ item.EMPRESA}}</td>
                     <td aria-colindex="5" role="cell" class="">{{ item.DATA }}</td>
                     <td aria-colindex="4" role="cell" class="">{{ item.CLIENTE || 'NAO CADASTRADO' }}</td>                        
                     <td aria-colindex="6" role="cell" class="">{{ item.COD_CLIENTE }}</td>
                     <td aria-colindex="8" role="cell" class="">{{ item.REGISTRO }}</td>
                     <td aria-colindex="7" role="cell" class="">{{ item.GRUPO_COTA}}</td>                                                
                     <td aria-colindex="9" role="cell" class="">{{ item.DESC_ITEM || item.MODELO }}</td>                        
                     <td aria-colindex="10" role="cell" class="">{{ item.DIA}}</td>
                     <td aria-colindex="10" role="cell" class="">{{ item.VALOR }}</td> 
                     
                     <td aria-colindex="10" role="cell" class="">
                     <span  v-if="item.STATUS=='PAGO'" style="color: green; font-size: 18px;">{{ item.STATUS }}</span>
                     <span  v-if="item.STATUS=='ABERTO'" style="color: rgb(255, 145, 0); font-size: 15px;">AGUARDANDO-PGTO</span>
                     <span  v-if="item.STATUS=='CANCELADO'" style="color: rgb(255, 30, 0); font-size: 15px;">{{ item.STATUS }}</span>
                     </td> 
                     
                     <td>
                     <svg @click="selectItemEdit(item)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
             
                     </td>
                 </tr>
             </tbody>
      
         </table>
 </div>

    </div>
</template>
    
    <script setup>
        import {indexStore} from '../../store/IndexStore' 
        import { onMounted, ref, computed } from 'vue';
        import axios from 'axios'
        import { useMeta } from '@/composables/use-meta'; 
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
                store.tipoComissaoAvulsa = []
                if (1==1) {                      
                  
                var   regrasComissao   = await axios.get(store.baseApiHTTPS+'/regracomissao')                 
                    regrasComissao.data.filter(f => f.PERMITE_AVULSO=='S').map( x => 
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
    
    
        
    
          
            
    
            async function getUsuarios () {
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
            getUsuarios()
    
    
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
     
    function selectItemEdit (props) {
        store.editando = true
        console.log(props)

        store.subtipoComissaoSelecionada = props.TIPO
        
        
        store.cadastroItem.ID = props.ID,
        store.cadastroItem.COD_EMPRESA = props.COD_EMPRESA, 
        store.cadastroItem.TIPO = props.TIPO, 
        store.cadastroItem.VENDEDOR = props.VENDEDOR, 
        store.cadastroItem.DATA = props.DATA, 
        store.cadastroItem.COD_CLIENTE = props.COD_CLIENTE, 
        store.cadastroItem.CHASSI = props.CHASSI, 
        store.cadastroItem.REGISTRO = props.REGISTRO, 
        store.cadastroItem.DESC_ITEM = props.DESC_ITEM,
        store.cadastroItem.ANO_MODELO = props.ANO_MODELO,
        store.cadastroItem.VALOR = props.VALOR,
        store.cadastroItem.FAMILIA = props.FAMILIA,
        store.cadastroItem.MODELO = props.MODELO,
        store.cadastroItem.GRUPO_COTA = props.GRUPO_COTA,
        store.cadastroItem.DIA = props.DIA,
        store.cadastroItem.STATUS = props.STATUS
    }
    
    
    function editItem(id){        
        console.log('Editando Item ID: '+store.cadastroItem.ID)
        
        let valor = 0;
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

    var data = 
    JSON.stringify ( { 
                    
                        "COD_EMPRESA":  store.empresaSelecionada, 
                        "TIPO":         store.subtipoComissaoSelecionada || store.tipoComissaoSelecionada, 
                        "VENDEDOR":     store.cadastroItem.VENDEDOR, 
                        "DATA":         store.cadastroItem.DATA, 
                        "COD_CLIENTE":  store.cadastroItem.COD_CLIENTE, 
                        "CHASSI":       store.cadastroItem.CHASSI, 
                        "REGISTRO":     store.cadastroItem.REGISTRO, 
                        "DESC_ITEM":    store.cadastroItem.DESC_ITEM,
                        "ANO_MODELO":   store.cadastroItem.ANO_MODELO,
                        "VALOR":        valor,
                        "FAMILIA":      store.cadastroItem.FAMILIA,
                        "MODELO":       store.cadastroItem.MODELO,
                        "GRUPO_COTA":   store.cadastroItem.GRUPO_COTA,
                        "DIA":          store.cadastroItem.DIA,
                        "STATUS":       store.cadastroItem.STATUS
                        
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
            bind_data()
        
        })
        .catch(function (error) {
         
        });
    
    }
    
     function createItem(tipo,valor){
        var data = {}
        console.log('Cadastrando Novo Item')
        if(store.tipoComissaoSelecionada == 'SDR'){
            data = JSON.stringify( 
                    {  
                    "COD_EMPRESA":  store.empresaSelecionada , 
                    "TIPO":         tipo, 
                    "VENDEDOR":     store.colaboradorSelecionado, 
                    "DATA":         dataAtualFormatada(new Date()), 
                    "COD_CLIENTE":  11111111, 
                    "CHASSI":       store.cadastroItem.CHASSI || '-', 
                    "REGISTRO":     valor || 99999999, 
                    "DESC_ITEM":    store.cadastroItem.DESC_ITEM,
                    "ANO_MODELO":   store.cadastroItem.ANO_MODELO || '23/23',
                    "VALOR":        store.cadastroItem.VALOR,
                    "FAMILIA":      store.cadastroItem.FAMILIA,
                    "MODELO":       store.cadastroItem.MODELO,
                    "GRUPO_COTA":   store.cadastroItem.GRUPO_COTA,
                    "DIA":          store.cadastroItem.DIA,
                    "STATUS":       store.cadastroItem.STATUS 
                    } )
        }else{
            let valor = store.cadastroItem.VALOR.replace(',','.');
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

        data = JSON.stringify( 
               
                            {  
                            "COD_EMPRESA":  store.empresaSelecionada , 
                            "TIPO":         store.subtipoComissaoSelecionada || store.tipoComissaoSelecionada, 
                            "VENDEDOR":     store.colaboradorSelecionado, 
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
        }
           
        
    
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
                    bind_data()
                    })
                    .catch(function (error) {
                    console.log(error);
                    });
    
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
    
    <style>
    </style>
    
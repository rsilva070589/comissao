<template>
    <div v-if="!storeLogin.dadosUsuario.filter(f=> f.GESTOR =='X').length > 0 "
      style="color: red; font-size: 25px; padding: 15px;"
      >
          USUARIO NÃO TEM ACESSO
  </div> 
  
   <div class="layout-px-spacing" v-if="storeLogin.dadosUsuario.filter(f=> f.GESTOR =='X').length > 0">     
      <div v-if="!store.recursos.progress" > 
  

        
           
      <div style="display: flex;" >
  
          <div   class="table-light table-responsive" style="margin-right: 10px;" >
          Mês
            <select   class="mb-4 form-select form-select-lg w-100"   
                    v-model="store.mesSelecionado"  
                    @click="getUsuarios()"          
                    >
                    <option :value="e" v-for="e, index in distinctMes().sort()" v-key="index"  >
                        {{  e  }}                
                    </option> 
            </select>
          </div>
  
  
          <div   class="table-light table-responsive" style="margin-right: 10px;">
          Empresa
            <select   class="mb-4 form-select form-select-lg w-100"   
                    v-model="store.empresaSelecionada"            
                    >
                    <option :value="e.COD_EMPRESA" v-for="e, index in store.empresasGrupo" v-key="index"  >
                        {{  e.COD_EMPRESA  }}  {{  e.NOME  }}                 
                    </option> 
            </select>
          </div>
      
  
          <div   class="table-light table-responsive" style="margin-right: 10px;">
              Função
              <select   class="mb-4 form-select form-select-lg w-100"   
                      v-model="store.funcaoSelecionada" 
                      >
                      <option :value="e.COD_FUNCAO" v-for="e, index in store.funcoes?.filter(f => f.COD_EMPRESA == store.empresaSelecionada)" v-key="index"  >
                       {{e.FUNCAO}} - {{ e.COD_FUNCAO }} 
                      </option> 
              </select>
          </div>
  
      
      </div>
      
  
  
      <div v-if="store.editando" >
          
          <div class="row layout-top-spacing"
                          >                       
          <div class="col-xl-10 col-lg-6 col-md-6 col-sm-10 col-10" style="margin-bottom: 24px">
              <div class="statbox panel box box-shadow">
                  <div class="panel-heading">
                      <div class="row">
                          <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                              <h4>Cadastro de Tipo de Comissão</h4>
                          </div>
                      </div>   
                  </div>
                  <div class="panel-body">
                      <div > 
                          <div class="row">  
                                                    
                              <div class="form-group col-md-3">
                                  <label class="col-form-label pt-0" for="TIPO">Tipo Comissão</label>
                                  <div>
                                      <input  v-model="store.cadastroRegra.TIPO_COMISSAO" type="text" id="text" class="form-control" placeholder="Ex: Bonus" />
                                  </div>
                              </div>
                              <div class="form-group col-md-1">
                                  <label class="col-form-label pt-0" for="QTDE">QTDE</label>
                                  <div>
                                      <input v-model="store.cadastroRegra.QTDE"  type="number" id="QTDE" class="form-control" placeholder="" />
                                  </div>
                              </div>   
                              <div class="form-group col-md-1">
                                  <label class="col-form-label pt-0" for="PERC">%</label>
                                  <div>
                                      <input v-model="store.cadastroRegra.PERC"  type="text" id="PERC" class="form-control" placeholder="%" />
                                  </div>
                              </div>   
                              <div class="form-group col-md-1">
                                  <label class="col-form-label pt-0" for="VALOR">VALOR</label>
                                  <div>
                                      <input v-model="store.cadastroRegra.VALOR"  type="text" id="VALOR" class="form-control" placeholder="VALOR" />
                                  </div>
                              </div>  
                              <div class="form-group col-md-1">
                                  <label class="col-form-label pt-0" for="PREMIO">PREMIO</label>
                                  <select   class="mb-4 form-select form-select-lg w-100"   
                                      v-model="store.cadastroRegra.PREMIO">
                                          <option value="S">Sim</option>
                                          <option value="N">Não</option>
                                      </select>
                              </div>    
                              
                              <div class="form-group col-md-1">
                                  <label class="col-form-label pt-0" for="AVULSO">AVULSO</label>
                                  <select   class="mb-4 form-select form-select-lg w-100"   
                                      v-model="store.cadastroRegra.PERMITE_AVULSO">
                                          <option value="S">Sim</option>
                                          <option value="N">Não</option>
                                      </select>
                              </div>   
                             
                            
                         
                              <div class="form-group col-md-2">
                                  <label class="col-form-label pt-0" for="MES">MES</label>
                                  <select   class="mb-4 form-select form-select-lg w-100"   
                                          v-model="store.cadastroRegra.MES"      
                                          >
                                          <option :value="e" v-for="e, index in distinctMes().sort()" v-key="index"  >
                                              {{  e  }}                
                                          </option> 
                                  </select>
                              </div>   
  
                              <div class="form-group col-md-2">
                                  <label class="col-form-label pt-0" for="CLASSE">CLASSE</label>
                                  <select   class="mb-4 form-select form-select-lg w-100"   
                                      v-model="store.cadastroRegra.CLASSE">
                                          <option value="VENDAS">VENDA</option>
                                          <option value="PREMIACOES">PREMIO</option>
                                          <option value="BENEFICIOS">BENEFICIOS</option>
                                      </select>
                              </div>   
  
                              <div class="form-group col-md-2">
                                  <label class="col-form-label pt-0" for="APELIDO">APELIDO</label>
                                  <div>
                                      <input v-model="store.cadastroRegra.APELIDO"  type="text" id="APELIDO" class="form-control" placeholder="APELIDO" />
                                  </div>
                              </div>   
  
                              <div class="form-group col-md-3">
                                  <label class="col-form-label pt-0" for="LEGENDA">LEGENDA</label>
                                  <div>
                                      <input v-model="store.cadastroRegra.LEGENDA"  type="text" id="LEGENDA" class="form-control" placeholder="LEGENDA" />
                                  </div>
                              </div>   
                              
                              <div class="form-group col-md-1">
                                  <label class="col-form-label pt-0" for="FAIXA">FAIXA</label>
                                  <select   class="mb-4 form-select form-select-lg w-100"   
                                      v-model="store.cadastroRegra.USA_FAIXA">
                                          <option value="S">Sim</option>
                                          <option value="N">Não</option>
                                      </select>
                              </div>   
                              
                                 
                                      <div v-if="store.cadastroRegra.USA_FAIXA == 'S'" class="form-group col-md-2">
                                          <label class="col-form-label pt-0" for="VALOR_MIN">Vlr Min</label>
                                          <div>
                                              <input v-model="store.cadastroRegra.VALOR_MIN"  type="text" id="VALOR_MIN" class="form-control" placeholder="" />
                                          </div>
                                      </div> 
                                      <div v-if="store.cadastroRegra.USA_FAIXA == 'S'"  class="form-group col-md-2">
                                          <label class="col-form-label pt-0" for="VALOR_MAX">Vlr Max</label>
                                          <div>
                                              <input v-model="store.cadastroRegra.VALOR_MAX"  type="text" id="VALOR_MAX" class="form-control" placeholder="" />
                                          </div>
                                      </div>   
                                      <div v-if="store.cadastroRegra.USA_FAIXA == 'S'"  class="form-group col-md-2">
                                          <label class="col-form-label pt-0" for="QTDE_MIN">Qtde Min</label>
                                          <div>
                                              <input  v-model="store.cadastroRegra.QTDE_MIN" type="text" id="QTDE_MIN" class="form-control" placeholder="" />
                                          </div>
                                      </div>
                                      <div v-if="store.cadastroRegra.USA_FAIXA == 'S'"  class="form-group col-md-2">
                                          <label class="col-form-label pt-0" for="QTDE_MAX">Qtde MAX</label>
                                          <div>
                                              <input  v-model="store.cadastroRegra.QTDE_MAX" type="text" id="QTDE_MAX" class="form-control" placeholder="" />
                                          </div>
                                      </div>
                  
                                  
                                      <div v-if="store.cadastroRegra.USA_FAIXA == 'S'"  class="form-group col-md-2">
                                          <label class="col-form-label pt-0" for="PERC_MIN">Perc Min</label>
                                          <div>
                                              <input  v-model="store.cadastroRegra.PERC_MIN" type="text" id="PERC_MIN" class="form-control" placeholder="" />
                                          </div>
                                      </div>
                                      <div v-if="store.cadastroRegra.USA_FAIXA == 'S'"  class="form-group col-md-2">
                                          <label class="col-form-label pt-0" for="PERC_MAX">Perc MAX</label>
                                          <div>
                                              <input  v-model="store.cadastroRegra.PERC_MAX" type="text" id="PERC_MAX" class="form-control" placeholder="" />
                                          </div>
                                      </div>
  
                                      <div v-if="store.cadastroRegra.USA_FAIXA == 'S'"  class="form-group col-md-2">
                                          <label class="col-form-label pt-0" for="MEDIA_ACESSORIOS_MIN">Acess Min</label>
                                          <div>
                                              <input  v-model="store.cadastroRegra.MEDIA_ACESSORIOS_MIN" type="text" id="MEDIA_ACESSORIOS_MIN" class="form-control" placeholder="" />
                                          </div>
                                      </div>
                                      <div v-if="store.cadastroRegra.USA_FAIXA == 'S'"  class="form-group col-md-2">
                                          <label class="col-form-label pt-0" for="MEDIA_ACESSORIOS_MAX">Acess Max</label>
                                          <div>
                                              <input  v-model="store.cadastroRegra.MEDIA_ACESSORIOS_MAX" type="text" id="MEDIA_ACESSORIOS_MAX" class="form-control" placeholder="" />
                                          </div>
                                    </div> 
  
                          </div>
                          
                          <button @click="confirmar(store.cadastroRegra.ID)" type="" class="btn btn-success mt-3">CONFIRMAR</button>
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
              store.cadastroRegra.ID = 0;
          " 
              >
  
          <svg version="1.1" id="Capa_1" width="30px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
              viewBox="0 0 50 50" xml:space="preserve">
              <circle style="fill:#43B05C;" cx="25" cy="25" r="25"/>
              <line style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="25" y1="13" x2="25" y2="38"/>
              <line style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="37.5" y1="25" x2="12.5" y2="25"/>
          </svg>
      </div>
  
  
      
          <div v-if="store.funcaoSelecionada > 0"
          style="padding: 0px 45px 0px 0px; height: 60vh;"
          class="conteudo"  
          >
          
              <table style="background-color: white;" role="table" aria-busy="false" aria-colcount="5" class="table b-table table-hover" id="__BVID__310">
                      <thead role="rowgroup" class="">
                          <tr role="row" class="">
                              <th role="columnheader" scope="col" aria-colindex="1" class=""><div>#</div></th>
                              <th role="columnheader" scope="col" aria-colindex="2" class=""><div>TIPO</div></th>
                              <th role="columnheader" scope="col" aria-colindex="3" class=""><div>%</div></th>
                              <th role="columnheader" scope="col" aria-colindex="4" class=""><div>Vlr Fixo</div></th>
                              <th role="columnheader" scope="col" aria-colindex="5" class=""><div>Premio</div></th>
                              <th role="columnheader" scope="col" aria-colindex="6" class=""><div>Faixa</div></th>
                              <th role="columnheader" scope="col" aria-colindex="7" class=""><div>Vlr Min</div></th>                        
                              <th role="columnheader" scope="col" aria-colindex="8" class=""><div>Vlr Max</div></th> 
                              <th role="columnheader" scope="col" aria-colindex="9" class=""><div>Qtde Min</div></th>
                              <th role="columnheader" scope="col" aria-colindex="10" class=""><div>Qtde Max</div></th>
                              <th role="columnheader" scope="col" aria-colindex="11" class=""><div>% Min</div></th>
                              <th role="columnheader" scope="col" aria-colindex="12" class=""><div>% Max</div></th>
                              <th role="columnheader" scope="col" aria-colindex="11" class=""><div>Ace Min</div></th>
                              <th role="columnheader" scope="col" aria-colindex="12" class=""><div>Ace Max</div></th>
                              <th role="columnheader" scope="col" aria-colindex="12" class=""><div>Classe</div></th>
                              <th role="columnheader" scope="col" aria-colindex="13" class=""><div>...</div></th>
                              
                          </tr>
                      </thead>
                      <tbody v-for="(item, i) in store.regrasComissao?.filter(f => f.COD_EMPRESA == store.empresaSelecionada && f.COD_FUNCAO == store.funcaoSelecionada && f.MES == store.mesSelecionado && f.ID != 0)" :key="item.name" role="rowgroup">
                          <tr role="row" class="">
                              <td aria-colindex="1" role="cell" class="">{{ item.ID }}</td>
                              <td aria-colindex="2" role="cell" class="">{{ item.TIPO_COMISSAO }}</td>
                              <td aria-colindex="3" role="cell" class="">{{ arredonda(item.PERC * 100,2)}}</td>
                              <td aria-colindex="4" role="cell" class="">{{ item.VALOR }}</td>
                              <td aria-colindex="5" role="cell" class="">{{ item.PREMIO }}</td>
                              <td aria-colindex="6" role="cell" class="">{{ item.USA_FAIXA }}</td>
                              <td aria-colindex="7" role="cell" class="">{{ item.VALOR_MIN }}</td>                        
                              <td aria-colindex="8" role="cell" class="">{{ item.VALOR_MAX }}</td>
                              <td aria-colindex="9" role="cell" class="">{{ item.QTDE_MIN }}</td>                        
                              <td aria-colindex="10" role="cell" class="">{{ item.QTDE_MAX }}</td>
                              <td aria-colindex="9" role="cell" class="">{{ item.PERC_MIN }}</td>                        
                              <td aria-colindex="10" role="cell" class="">{{ item.PERC_MAX }}</td>
                              <td aria-colindex="9" role="cell" class="">{{ item.MEDIA_ACESSORIOS_MIN }}</td>                        
                              <td aria-colindex="10" role="cell" class="">{{ item.MEDIA_ACESSORIOS_MAX }}</td>
                              <td aria-colindex="11" role="cell" class="">{{ item.CLASSE }}</td>
                              <td>
                          
                                  <span @click="selectItemCopy(item)">
                                      <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 467 512.22"><path fill-rule="nonzero" d="M131.07 372.11c.37 1 .57 2.08.57 3.2 0 1.13-.2 2.21-.57 3.21v75.91c0 10.74 4.41 20.53 11.5 27.62s16.87 11.49 27.62 11.49h239.02c10.75 0 20.53-4.4 27.62-11.49s11.49-16.88 11.49-27.62V152.42c0-10.55-4.21-20.15-11.02-27.18l-.47-.43c-7.09-7.09-16.87-11.5-27.62-11.5H170.19c-10.75 0-20.53 4.41-27.62 11.5s-11.5 16.87-11.5 27.61v219.69zm-18.67 12.54H57.23c-15.82 0-30.1-6.58-40.45-17.11C6.41 356.97 0 342.4 0 326.52V57.79c0-15.86 6.5-30.3 16.97-40.78l.04-.04C27.51 6.49 41.94 0 57.79 0h243.63c15.87 0 30.3 6.51 40.77 16.98l.03.03c10.48 10.48 16.99 24.93 16.99 40.78v36.85h50c15.9 0 30.36 6.5 40.82 16.96l.54.58c10.15 10.44 16.43 24.66 16.43 40.24v302.01c0 15.9-6.5 30.36-16.96 40.82-10.47 10.47-24.93 16.97-40.83 16.97H170.19c-15.9 0-30.35-6.5-40.82-16.97-10.47-10.46-16.97-24.92-16.97-40.82v-69.78zM340.54 94.64V57.79c0-10.74-4.41-20.53-11.5-27.63-7.09-7.08-16.86-11.48-27.62-11.48H57.79c-10.78 0-20.56 4.38-27.62 11.45l-.04.04c-7.06 7.06-11.45 16.84-11.45 27.62v268.73c0 10.86 4.34 20.79 11.38 27.97 6.95 7.07 16.54 11.49 27.17 11.49h55.17V152.42c0-15.9 6.5-30.35 16.97-40.82 10.47-10.47 24.92-16.96 40.82-16.96h170.35z"/></svg>
                                  </span>
  
  
                                  <span @click="selectItemEdit(item)">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                  </span>
                              
                                  <span @click="deleteItem(item)">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                  </span>
                                                      
                              </td>                       
                          </tr>
  
                          
                      </tbody>
                  </table>
          </div>
  
      </div> 
   </div>
   
   
  
  </template>
  
  <script setup>
      import {indexStore, useUserStore} from '../../store/IndexStore' 
      import { onMounted, ref, computed } from 'vue';
      import axios from 'axios'
      import { useMeta } from '@/composables/use-meta';
      import ItensDetalhe from './RegrasComissaoDetalhe.vue' 
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

        async function getFuncoes(){
        store.funcoes   = (await axios.get(store.baseApiHTTPS+'/funcoes')).data 
        }
        getFuncoes()
        
  
          async function getEmpresas()  {
              store.empresasGrupo = []
              if (1==1) { 
              var empresasResult = await axios.get(store.baseApiHTTPS+'/empresas') 
              store.empresasGrupo = empresasResult.data
              }
          }       
  
          getEmpresas()
  
          async function getRegrasComissao() {
              if (1==1) {   
                  
              store.regrasComissao = [] 
              var   regrasComissao   = await axios.get(store.baseApiHTTPS+'/regracomissao') 
              store.regrasComissao =   regrasComissao.data 
              }}
          getRegrasComissao() 
        
           
          store.recursos.progress = false
  
  
      }
  
      async function getUsuarios () {
  
  if (1==1)  {
      var mesAjustado = store.mesSelecionado.replace('/','-')
   var usuariosResult = await axios.get(store.baseApiHTTPS+'/usuarios/'+mesAjustado) 
  store.usuariosGrupo = usuariosResult.data 
  
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
  
      function distinctMes() {
              const data = store.regrasComissao
              const unique = [...new Set(data.map(item => item.MES))]    
              return unique
          }
   
      function selectItemEdit (props) {
          store.editando = true
  
          store.cadastroRegra.ID = props.ID
          store.cadastroRegra.TIPO_COMISSAO = props.TIPO_COMISSAO
          store.cadastroRegra.QTDE = props.QTDE
          store.cadastroRegra.PERC = props.PERC * 100
          store.cadastroRegra.VALOR = props.VALOR
          store.cadastroRegra.USA_FAIXA = props.USA_FAIXA
          store.cadastroRegra.VALOR_MIN = props.VALOR_MIN
          store.cadastroRegra.VALOR_MAX = props.VALOR_MAX
          store.cadastroRegra.QTDE_MIN = props.QTDE_MIN
          store.cadastroRegra.QTDE_MAX = props.QTDE_MAX
          store.cadastroRegra.PREMIO = props.PREMIO
          store.cadastroRegra.PERMITE_AVULSO = props.PERMITE_AVULSO   
          store.cadastroRegra.MES = props.MES
          store.cadastroRegra.ACESS_MIN = props.ACESS_MIN
          store.cadastroRegra.ACESS_MAX = props.ACESS_MAX 
          store.cadastroRegra.PERC_MIN  = props.PERC_MIN
          store.cadastroRegra.PERC_MAX  = props.PERC_MAX
          store.cadastroRegra.LEGENDA  = props.LEGENDA
          store.cadastroRegra.APELIDO  = props.APELIDO
          store.cadastroRegra.CLASSE   = props.CLASSE
          store.cadastroRegra.CAMPANHA  = props.CAMPANHA
  
          
          console.log(store.cadastroRegra)
           
      }
  
  
      function selectItemCopy (props) {
          store.editando = true
          store.cadastroRegra.ID = props.ID
          store.cadastroRegra.TIPO_COMISSAO = props.TIPO_COMISSAO
          store.cadastroRegra.QTDE = props.QTDE
          store.cadastroRegra.PERC = props.PERC * 100
          store.cadastroRegra.VALOR = props.VALOR
          store.cadastroRegra.USA_FAIXA = props.USA_FAIXA
          store.cadastroRegra.VALOR_MIN = props.VALOR_MIN
          store.cadastroRegra.VALOR_MAX = props.VALOR_MAX
          store.cadastroRegra.QTDE_MIN = props.QTDE_MIN
          store.cadastroRegra.QTDE_MAX = props.QTDE_MAX
          store.cadastroRegra.PREMIO = props.PREMIO
          store.cadastroRegra.PERMITE_AVULSO = props.PERMITE_AVULSO   
          store.cadastroRegra.MES = props.MES
          store.cadastroRegra.ACESS_MIN = props.ACESS_MIN
          store.cadastroRegra.ACESS_MAX = props.ACESS_MAX 
          store.cadastroRegra.PERC_MIN  = props.PERC_MIN
          store.cadastroRegra.PERC_MAX  = props.PERC_MAX
          store.cadastroRegra.LEGENDA  = props.LEGENDA
          store.cadastroRegra.APELIDO  = props.APELIDO
          store.cadastroRegra.CLASSE   = props.CLASSE
          store.cadastroRegra.CAMPANHA  = props.CAMPANHA    
          console.log(store.cadastroRegra)
           
      }
  
  
      function editItem(id){        
          console.log('Editando Item ID: '+id) 
          
      var data = 
      JSON.stringify ( { 
                          "ID":           id,
                          "COD_EMPRESA":  store.empresaSelecionada,
                          "COD_FUNCAO":       store.funcaoSelecionada,
                          "MES":          store.mesSelecionado,
                          "TIPO_COMISSAO":store.cadastroRegra.TIPO_COMISSAO,
                          "QTDE":         store.cadastroRegra.QTDE,
                          "PERC":         store.cadastroRegra.PERC / 100,
                          "VALOR":        store.cadastroRegra.VALOR,
                          "USA_FAIXA":    store.cadastroRegra.USA_FAIXA,
                          "VALOR_MIN":    store.cadastroRegra.VALOR_MIN,
                          "VALOR_MAX":    store.cadastroRegra.VALOR_MAX,
                          "QTDE_MIN":     store.cadastroRegra.QTDE_MIN,
                          "QTDE_MAX":     store.cadastroRegra.QTDE_MAX,
                          "PREMIO":       store.cadastroRegra.PREMIO,
                          "PERMITE_AVULSO":store.cadastroRegra.PERMITE_AVULSO, 
                          "MES":          store.cadastroRegra.MES,
                          "ACESS_MIN":    store.cadastroRegra.ACESS_MIN,
                          "ACESS_MAX":    store.cadastroRegra.ACESS_MAX,
                          "PERC_MIN":     store.cadastroRegra.PERC_MIN,
                          "PERC_MAX":     store.cadastroRegra.PERC_MAX,
                          "CLASSE":     store.cadastroRegra.CLASSE 
                      } 
               )
  
      var config = {
          method: 'put',
          maxBodyLength: Infinity,
          url: store.baseApiHTTPS+'/regracomissao/'+id,
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
  
   function createItem() {
      let data = JSON.stringify({
          
                          "COD_EMPRESA":  store.empresaSelecionada,
                          "COD_FUNCAO":       store.funcaoSelecionada,
                          "MES":          store.mesSelecionado,
                          "TIPO_COMISSAO":store.cadastroRegra.TIPO_COMISSAO,
                          "QTDE":         store.cadastroRegra.QTDE,
                          "PERC":         store.cadastroRegra.PERC / 100,
                          "VALOR":        store.cadastroRegra.VALOR,
                          "USA_FAIXA":    store.cadastroRegra.USA_FAIXA,
                          "VALOR_MIN":    store.cadastroRegra.VALOR_MIN,
                          "VALOR_MAX":    store.cadastroRegra.VALOR_MAX,
                          "QTDE_MIN":     store.cadastroRegra.QTDE_MIN,
                          "QTDE_MAX":     store.cadastroRegra.QTDE_MAX,
                          "PREMIO":       store.cadastroRegra.PREMIO,
                          "PERMITE_AVULSO":store.cadastroRegra.PERMITE_AVULSO, 
                          "MES":          store.cadastroRegra.MES,
                          "ACESS_MIN":    store.cadastroRegra.ACESS_MIN,
                          "ACESS_MAX":    store.cadastroRegra.ACESS_MAX,
                          "PERC_MIN":     store.cadastroRegra.PERC_MIN,
                          "PERC_MAX":     store.cadastroRegra.PERC_MAX,
                          "CLASSE":     store.cadastroRegra.CLASSE 
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: store.baseApiHTTPS+'/regracomissao/', 
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    bind_data()
  })
  .catch((error) => {
    console.log(error);
  });
  
   }
  
   
  
   function confirmar (id) {
      console.log('Valor do ID: ' + id)
      if (id > 0) {
          editItem(id)
      }else{
          createItem()
      }
      store.editando = false
      store.cadastroRegra.ID=0     
   }
  
   function deleteItem(props){
      store.editando = false
      store.cadastroRegra.ID=0
      
      var data =   {"ID" : props.ID}  
  
                  var config = {
                  method: 'delete',
                  maxBodyLength: Infinity,
                  url: store.baseApiHTTPS+'/regracomissao/'+props.ID,
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
   
    
   function totalEstoque() {
      if (store.itensCadastro){
          var somarProduto = store.itensCadastro.map(p =>{
                  return (p.VALOR_CUSTO * p.QTDE_ESTOQUE)
                } )
               
  
    let totalProd = 0
    for(let i in somarProduto) {
             totalProd += somarProduto[i] 
      }
      
            return formataDinheiro(totalProd,2)
      }
  
  }
  
     
  
  function totalEstoqueCategoria(categoria) {
      if (store.itensCadastro){
  var dados = store.itensCadastro 
          var somarProduto = store.itensCadastro.filter(f => f.CATEGORIA==categoria).map(p =>{
                  return (p.VALOR_CUSTO * p.QTDE_ESTOQUE)
                } )                
  
    let totalProd = 0
    for(let i in somarProduto) {
             totalProd += somarProduto[i] 
      }
      
            return formataDinheiro(totalProd,2)
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
  
      var arredonda = function(numero, casasDecimais) {
      casasDecimais = typeof casasDecimais !== 'undefined' ?  casasDecimais : 0;
      return +(Math.floor(numero + ('e+' + casasDecimais)) + ('e-' + casasDecimais));
    };
  
  
   
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
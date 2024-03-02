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
                <option :value="e.EMPRESA" v-for="e, index in store.empresasGrupo" v-key="index"  >
                    {{  e.EMPRESA  }}  {{  e.NOME  }}                 
                </option> 
        </select>
        </div>
     
    
        <div   class="table-light table-responsive" style="margin-right: 10px;">
            Função
            <select   class="mb-4 form-select form-select-lg w-100"   
                    v-model="store.funcaoSelecionada" 
                    >
                    <option :value="e" v-for="e, index in store.funcoes?.filter(f => f.COD_EMPRESA == store.empresaSelecionada)" v-key="index"  >
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
                            <h4>Cadastro de Usuario</h4>
                        </div>
                    </div>   
                </div>
                <div class="panel-body">
                    <div > 
                        <div class="row">                        
                            <div class="form-group col-md-2">
                                <label class="col-form-label pt-0" for="Login">Login</label>
                                <div>
                                    <input  v-model="store.cadastroUsuario.NOME" type="text" id="text" class="form-control" placeholder="usuario" />
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label class="col-form-label pt-0" for="Nome">Nome</label>
                                <div>
                                    <input v-model="store.cadastroUsuario.NOME_COMPLETO"  type="text" id="QTDE" class="form-control" placeholder="Nome Completo" />
                                </div>
                            </div>   
                                
                            <div class="form-group col-md-2">
                                <label class="col-form-label pt-0" for="DPTO">Dpto</label>
                                <div>
                                    <input v-model="store.cadastroUsuario.DPTO"  type="text" id="DPTO" class="form-control" placeholder="DPTO" />
                                </div>
                            </div> 
                            <div class="form-group col-md-2"  >
                                <label class="col-form-label pt-0" for="MARCA">Marca</label> 
                                <select   class="mb-4 form-select form-select-lg w-100"   
                                        v-model="store.cadastroUsuario.MARCA"  
                                        >
                                        <option :value="e" v-for="e, index in distinctMarca()" v-key="index"                
                                        >
                                            {{  e  }}                
                                        </option> 
                                </select>
                            </div>   
                            <div class="form-group col-md-2">
                                <label class="col-form-label pt-0" for="PERCENTUAL">é Gestor?</label>
                                <select   class="mb-4 form-select form-select-lg w-100"   
                                    v-model="store.cadastroUsuario.GESTOR">                                
                                    <option value="N">Não</option>
                                    <option :value="store.empresaSelecionada">Empresa</option>
                                    <option value="M">Marca</option>
                                    <option value="X">Adm do Sistema</option>
                                </select>
                            </div>                                
                           
                             <div class="form-group col-md-2">
                                <label class="col-form-label pt-0" for="DIRETORIA">é Diretoria?</label>
                                <select   class="mb-4 form-select form-select-lg w-100"   
                                v-model="store.cadastroUsuario.DIRETORIA">
                                    <option value="S">Sim</option>
                                    <option value="N">Não</option>
                                </select>
                            </div>   
                            <div class="form-group col-md-2">
                                <label class="col-form-label pt-0" for="FERIAS">Ferias</label>
                                <select   class="mb-4 form-select form-select-lg w-100"   
                                v-model="store.cadastroUsuario.FERIAS">
                                    <option value="S">Sim</option>
                                    <option value="N">Não</option>
                                </select>
                            </div>   
                            <div class="form-group col-md-2" v-if="store.cadastroUsuario.FERIAS == 'S'">
                                <label class="col-form-label pt-0" for="PERIODO_INI">Ferias Inicio</label>
                                <div>
                                    <input v-model="store.cadastroUsuario.PERIODO_INI"  type="date" id="PERIODO_INI" class="form-control" placeholder="" />
                                </div>
                            </div>  
                            <div class="form-group col-md-2" v-if="store.cadastroUsuario.FERIAS == 'S'">
                                <label class="col-form-label pt-0" for="PERIODO_FIM">Ferias Fim</label>
                                <div>
                                    <input v-model="store.cadastroUsuario.PERIODO_FIM"  type="date" id="PERIODO_FIM" class="form-control" placeholder="" />
                                </div>
                            </div>  
                        </div>
                         
                        <button @click="confirmar(store.cadastroUsuario.ID)" type="" class="btn btn-success mt-3">CONFIRMAR</button>
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
              store.cadastroUsuario = {
                ID: 0,
                NOME: '',
                NOME_COMPLETO: '',
                GESTOR: '',
                FUNCAO: '',
    
        }        
            " 
            >
    
        <svg version="1.1" id="Capa_1" width="30px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
            viewBox="0 0 50 50" xml:space="preserve">
            <circle style="fill:#43B05C;" cx="25" cy="25" r="25"/>
            <line style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="25" y1="13" x2="25" y2="38"/>
            <line style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="37.5" y1="25" x2="12.5" y2="25"/>
        </svg>
    </div>
    
    <div class="modal-dialog modal-md modal-dialog-centered"
         v-if="store.cancelando?.NOME"
        style=" 
            background-color: white;
             max-width: 450px; 
             margin-bottom: 15px;
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
                        <h5 class="modal-title" id="exampleModalLabel">Deletar Usuario?</h5>
                        <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
                    </div>
                    <div class="modal-body" style="font: bold;">
                        <p style="color: #060606;">Tem certeza que deseja deletar o Usuario:  {{ store.cancelando?.NOME_COMPLETO }} no Mes: {{ store.mesSelecionado }} ?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"   @click="store.cancelando = null">Cancelar</button>
                        <button type="button" data-remove="task" class="btn btn-danger"  @click="deleteItem(store.cancelando); store.cancelando = null">Deletar</button>
                    </div>
                </div>
            </div>
        </div>


        </div>
     
        <div v-if="store.funcaoSelecionada.COD_FUNCAO > 0  "
        style="padding: 0px 45px 0px 0px; width:90%; height: 55vh;"
        class="conteudo"  
        >    
            <table style="background-color: white;" role="table" aria-busy="false" aria-colcount="5" class="table b-table table-hover" id="__BVID__310">
                    <thead role="rowgroup" class="">
                        <tr role="row" class="">                        
                            <th role="columnheader" scope="col" aria-colindex="2" class=""><div>MES</div></th>
                            <th role="columnheader" scope="col" aria-colindex="3" class=""><div>LOGIN</div></th>                     
                            <th role="columnheader" scope="col" aria-colindex="5" class=""><div>NOME_COMPLETO</div></th>    
                            <th role="columnheader" scope="col" aria-colindex="2" class=""><div>FUNCAO</div></th>
                            <th role="columnheader" scope="col" aria-colindex="3" class=""><div>MARCA</div></th>                     
                            <th role="columnheader" scope="col" aria-colindex="5" class=""><div>DIRETORIA</div></th>   
                            <th role="columnheader" scope="col" aria-colindex="2" class=""><div>PERIODO_INI</div></th>
                            <th role="columnheader" scope="col" aria-colindex="3" class=""><div>PERIODO_FIM</div></th>               
                            <th role="columnheader" scope="col" aria-colindex="11" class=""><div>...</div></th>                        
                        </tr>
                    </thead>
                    <tbody v-for="(user, indexUser) in store.usuariosGrupo.filter(f => f.COD_EMPRESA == store.empresaSelecionada && f.COD_FUNCAO == store.funcaoSelecionada.COD_FUNCAO && f.MES == store.mesSelecionado)" :key="indexUser" role="rowgroup">
                        <tr>      
                            <td aria-colindex="1" role="cell" class="">{{ user.MES }}</td>                    
                            <td aria-colindex="2" role="cell" class="">{{ user.NOME }}</td>
                            <td aria-colindex="3" role="cell" class="">{{ user.NOME_COMPLETO }}</td>        
                            <td aria-colindex="4" role="cell" class="">{{ user.FUNCAO }}</td>   
                            <td aria-colindex="5" role="cell" class="">{{ user.MARCA }}</td>    
                            <td aria-colindex="6" role="cell" class="">{{ user.DIRETORIA }}</td>   
                            <td aria-colindex="7" role="cell" class="">{{ formatDate(user.PERIODO_INI) }}</td>  
                            <td aria-colindex="8" role="cell" class="">{{ formatDate(user.PERIODO_FIM) }}</td>    
                                  
                            <td>                    
                                <span @click="selectItemCopy(user)">
                                    <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 467 512.22"><path fill-rule="nonzero" d="M131.07 372.11c.37 1 .57 2.08.57 3.2 0 1.13-.2 2.21-.57 3.21v75.91c0 10.74 4.41 20.53 11.5 27.62s16.87 11.49 27.62 11.49h239.02c10.75 0 20.53-4.4 27.62-11.49s11.49-16.88 11.49-27.62V152.42c0-10.55-4.21-20.15-11.02-27.18l-.47-.43c-7.09-7.09-16.87-11.5-27.62-11.5H170.19c-10.75 0-20.53 4.41-27.62 11.5s-11.5 16.87-11.5 27.61v219.69zm-18.67 12.54H57.23c-15.82 0-30.1-6.58-40.45-17.11C6.41 356.97 0 342.4 0 326.52V57.79c0-15.86 6.5-30.3 16.97-40.78l.04-.04C27.51 6.49 41.94 0 57.79 0h243.63c15.87 0 30.3 6.51 40.77 16.98l.03.03c10.48 10.48 16.99 24.93 16.99 40.78v36.85h50c15.9 0 30.36 6.5 40.82 16.96l.54.58c10.15 10.44 16.43 24.66 16.43 40.24v302.01c0 15.9-6.5 30.36-16.96 40.82-10.47 10.47-24.93 16.97-40.83 16.97H170.19c-15.9 0-30.35-6.5-40.82-16.97-10.47-10.46-16.97-24.92-16.97-40.82v-69.78zM340.54 94.64V57.79c0-10.74-4.41-20.53-11.5-27.63-7.09-7.08-16.86-11.48-27.62-11.48H57.79c-10.78 0-20.56 4.38-27.62 11.45l-.04.04c-7.06 7.06-11.45 16.84-11.45 27.62v268.73c0 10.86 4.34 20.79 11.38 27.97 6.95 7.07 16.54 11.49 27.17 11.49h55.17V152.42c0-15.9 6.5-30.35 16.97-40.82 10.47-10.47 24.92-16.96 40.82-16.96h170.35z"/></svg>
                                </span>
                                <span @click="selectItemEdit(user)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                </span>                        
                                <span @click="store.cancelando = user">
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
        useMeta({ title: 'GRUPO AGP' });
        const store = indexStore(); 
        const storeLogin = useUserStore()  
        const code_arr = ref([]);
        //table 1
    
        store.marcaGrupo = distinctMarca()
        store.editando = false
    
        store.menuSelecionado='Parametros / Usuarios'
      
        store.cadastroUsuario = {
            ID: 0
        }
    
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
                store.empresasGrupo = []
                empresasResult.data.map( x => 
                    {  const dados = {  
                                        "EMPRESA": x.COD_EMPRESA,
                                        "NOME":    x.NOME 
                                    }
                    store.empresasGrupo.push(dados)
                    })   
                }
            }      
    
            getEmpresas()
    
            async function getRegrasComissao() {
                if (1==1) {   
                    
                store.regrasComissao = [] 
                var   regrasComissao   = await axios.get(store.baseApiHTTPS+'/regracomissao')                 
                    regrasComissao.data.map( x => 
                            {  const dados = {      "ID":      x.ID,
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
                                                    "USA_FAIXA":             x.USA_FAIXA,
                                                    "PERMITE_AVULSO":        x.PERMITE_AVULSO,
                                                    "MES":                   x.MES,
                                                    "VALOR_MIN":             x.VALOR_MIN,
                                                    "VALOR_MAX":             x.VALOR_MAX,
                                                } 
                                            store.regrasComissao.push(dados) 
                                } 
                        )
                }}
            getRegrasComissao() 
          
            store.recursos.progress = false
    
          
    
    
        }
    
        async function getUsuarios () {
                var mesAjustado = store.mesSelecionado.replace('/','-')
                if (1==1)  {
                 var usuariosResult = await axios.get(store.baseApiHTTPS+'/usuarios/'+mesAjustado) 
                store.usuariosGrupo = usuariosResult.data
                usuariosResult.data.map( x => 
                    {  const dados = {  "EMPRESA":  x.COD_EMPRESA,
                                        "NOME":     x.NOME,
                                        "NOME_COMPLETO":     x.NOME_COMPLETO,
                                        "FUNCAO":   x.FUNCAO,
                                        "COD_FUNCAO": x.COD_FUNCAO,
                                        "FUNCAO": x.FUNCAO,
                                        "DPTO":     x.DPTO,
                                        "MES":     x.MES,
                                        "MARCA":     x.MARCA,
                                    } 
                    } 
                )
                
              
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
            store.cadastroUsuario = props  
            console.log(store.cadastroUsuario)
        }
    
        function selectItemCopy (props) {
            store.editando = true
            store.cadastroUsuario = props 
            store.cadastroUsuario.ID=0          
        }
    
        function editItem(props){        
            console.log('Editando Usuario: '+props) 
            if(store.cadastroUsuario.FERIAS!= 'S'){
                store.cadastroUsuario.PERIODO_INI = null
                store.cadastroUsuario.PERIODO_FIM = null
            }
            
            let data = JSON.stringify({
                "COD_EMPRESA":  store.empresaSelecionada, 
                "NOME_EMPRESA": store.empresasGrupo.filter(f => f.EMPRESA == store.empresaSelecionada)[0].NOME,
                "COD_FUNCAO":   store.funcaoSelecionada.COD_FUNCAO,
                "FUNCAO":       store.funcaoSelecionada.FUNCAO,
                "MES":          store.mesSelecionado,
                "NOME":         store.cadastroUsuario.NOME,
                "NOME_COMPLETO":store.cadastroUsuario.NOME_COMPLETO,
                "DPTO":         store.cadastroUsuario.DPTO,
                "GESTOR":       store.cadastroUsuario.GESTOR,
                "MARCA":        store.cadastroUsuario.MARCA,
                "DIRETORIA":    store.cadastroUsuario.DIRETORIA,
                "ANULAR":       'N',
                "FERIAS":       store.cadastroUsuario.FERIAS,
                "PERIODO_INI":   store.cadastroUsuario.PERIODO_INI,
                "PERIODO_FIM":   store.cadastroUsuario.PERIODO_FIM
            });
    
        var config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: store.baseApiHTTPS+'/usuarios',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
            };
    
            axios(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            showMessage('Usuario Atualizado com sucesso.');
            bind_data()
            getUsuarios ()
            })
            .catch(function (error) {
            console.log(error);
            errorMessage('erro ao cadastrar usuario')
           
            });
    
     }
    
     function createItem() {
        console.log(store.cadastroUsuario)
        let data = JSON.stringify({
                "COD_EMPRESA":  store.empresaSelecionada, 
                "NOME_EMPRESA": store.empresasGrupo.filter(f => f.EMPRESA == store.empresaSelecionada)[0].NOME,
                "COD_FUNCAO":   store.funcaoSelecionada.COD_FUNCAO,
                "FUNCAO":       store.funcaoSelecionada.FUNCAO,
                "MES":          store.mesSelecionado,
                "NOME":         store.cadastroUsuario.NOME,
                "NOME_COMPLETO":store.cadastroUsuario.NOME_COMPLETO,
                "DPTO":         store.cadastroUsuario.DPTO,
                "GESTOR":       store.cadastroUsuario.GESTOR,
                "MARCA":        store.cadastroUsuario.MARCA,
                "DIRETORIA":    store.cadastroUsuario.DIRETORIA,
                "ANULAR":       'N',
                "FERIAS":       store.cadastroUsuario.FERIAS,
                "PERIODO_INI":   store.cadastroUsuario.PERIODO_INI,
                "PERIODO_FIM":   store.cadastroUsuario.PERIODO_FIM
            });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: store.baseApiHTTPS+'/usuarios/', 
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      showMessage('Usuario Criado com sucesso.');
      getUsuarios()
    })
    .catch((error) => {
      console.log(error);
    });
    
     }
    
     
    
     function confirmar (id) {
        console.log('Valor do ID: ' + id)
        if (id == 0) {
            createItem()  
        }else{
            editItem(id)
        }
        store.editando = false
        store.cadastroUsuario.ID=0     
     }
    
     function deleteItem(props){
        store.editando = false
        store.cadastroUsuario.ID=0
        
        let data = JSON.stringify({            
                "MES":          store.mesSelecionado,
                "NOME":         props.NOME
                }); 
    
                    var config = {
                    method: 'delete',
                    maxBodyLength: Infinity,
                    url: store.baseApiHTTPS+'/usuarios',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    data : data
                    };
    
                    axios(config)
                    .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    showMessage('Usuario Deletado com sucesso.');
                    getUsuarios()
                    })
                    .catch(function (error) {
                    console.log(error);
                    });
    
     }
    
     function distinctMarca() {
        const data = store.usuariosGrupo
        const unique = [...new Set(data?.map(item => item.MARCA))]    
        return unique
     }
    
      
     function formatDate(dataFormat){ 
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

    const errorMessage = (msg = '', type = 'danger') => {
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
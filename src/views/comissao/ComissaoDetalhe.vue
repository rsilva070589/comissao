<template>  
 
    <!--DETALHE DAS VENDAS-->  
    <div style="padding: 0px 45px 0px 10px">
       
       <div   
       @click="store.expandirComissao = false" style="color: black; font-weight: bold; font-size: 20px;">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
           {{ store.tipoComissaoSelecionada }} -  Comissão: {{ store.valorComissaoSelecionada }}
       </div>
     <div class="conteudo" style="height: 65vh;">
       <table style="background-color: white;" role="table" aria-busy="false" aria-colcount="5" class="table b-table table-hover" id="__BVID__310">
                   <thead role="rowgroup" class="">
                       <tr role="row" class="">
                           <th role="columnheader" scope="col" aria-colindex="1" class=""><div>#</div></th>
                           <th role="columnheader" scope="col" aria-colindex="2" class=""><div>Data</div></th>
                           <th role="columnheader" scope="col" aria-colindex="3" class=""><div>Produto</div></th>
                           <th role="columnheader" scope="col" aria-colindex="4" class=""><div>Chassi</div></th>
                           <th role="columnheader" scope="col" aria-colindex="5" class=""><div>Nota/OS/Proposta</div></th>
                           <th role="columnheader" scope="col" aria-colindex="6" class=""><div>CPF</div></th>
                           <th role="columnheader" scope="col" aria-colindex="7" class=""><div>Cliente</div></th>                        
                           <th role="columnheader" scope="col" aria-colindex="8" class=""><div>Valor Liquido</div></th>
                           <th role="columnheader" scope="col" aria-colindex="8" class=""><div>Ganhos</div></th>
                           <th role="columnheader" scope="col" aria-colindex="8" class=""><div>Despesas</div></th>
                           <th role="columnheader" scope="col" aria-colindex="8" class=""><div>Margem</div></th>
                           <th role="columnheader" scope="col" aria-colindex="9" class=""><div>Comissão</div></th>
                           <th role="columnheader" scope="col" aria-colindex="9" class=""><div>%</div></th>
                       </tr>
                   </thead>
                   <tbody v-for="(item, i) in store.relDetalhePDF.filter(f=> f.MARCA == store.marcaDetalhe)" :key="item.name" role="rowgroup">
                 
                       <tr   role="row" class="">
                        <td aria-colindex="1" role="cell" class="">{{ i + 1 }}</td>
                        <td aria-colindex="2" role="cell" class="">{{ item.DATA }}</td>
                        <td aria-colindex="3" role="cell" class="">{{ item.MODELO }}</td>
                        <td aria-colindex="4" role="cell" class="">{{ item.CHASSI }}</td>
                        <td aria-colindex="5" role="cell" class="">{{ item.PROPOSTA }}</td>
                        <td aria-colindex="6" role="cell" class="">{{ item.CPF }}</td>
                        <td aria-colindex="7" role="cell" class="">{{ item.NOME }}</td>                        
                        <td aria-colindex="8" role="cell" class="">{{ item.TOTAL }}</td>
                        <td aria-colindex="8" role="cell" class="">{{ item.GANHOS }}</td>
                        <td aria-colindex="8" role="cell" class="">{{ item.DESPESAS }}</td>
                        <td aria-colindex="8" role="cell" class="">{{ item.MARGEM }}</td>
                        <td aria-colindex="9" role="cell" class="text-end" style="text-align: end;"><span style="color: green; font-weight: bold;">{{ item.COMISSAO }}</span> </td>
                        <td aria-colindex="10" role="cell" class="">{{ item.PERC}}</td>
                       </tr>
                
                   </tbody>
               </table>

              
    </div>


    <div style="display: flex;">  
    <div style="width: 50px; padding: 5px;" @click="export_table('pdf')"> 
        <svg version="1.1" id="_x34_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"	 viewBox="0 0 512 512"  xml:space="preserve"><g>	<polygon style="fill:#FFFEFE;" points="475.435,117.825 475.435,512 47.791,512 47.791,0.002 357.613,0.002 412.491,54.881 	"/>	<rect x="36.565" y="34.295" style="fill:#B43331;" width="205.097" height="91.768"/>	<g>		<g>			<path style="fill:#FFFEFE;" d="M110.133,64.379c-0.905-2.186-2.111-4.146-3.769-5.804c-1.659-1.658-3.694-3.015-6.031-3.92				c-2.412-0.98-5.127-1.432-8.141-1.432H69.652v58.195h11.383V89.481h11.157c3.015,0,5.729-0.452,8.141-1.432				c2.337-0.905,4.371-2.261,6.031-3.92c1.658-1.658,2.865-3.543,3.769-5.804c0.828-2.186,1.281-4.523,1.281-6.935				C111.413,68.902,110.961,66.565,110.133,64.379z M97.845,77.118c-1.508,1.432-3.618,2.186-6.182,2.186H81.035V63.323h10.628				c2.564,0,4.674,0.754,6.182,2.261c1.432,1.432,2.185,3.392,2.185,5.804C100.031,73.726,99.277,75.686,97.845,77.118z"/>			<path style="fill:#FFFEFE;" d="M164.558,75.761c-0.075-2.035-0.15-3.844-0.377-5.503c-0.225-1.659-0.603-3.166-1.131-4.598				c-0.527-1.357-1.206-2.714-2.111-3.92c-2.035-2.94-4.522-5.126-7.312-6.483c-2.864-1.357-6.256-2.035-10.252-2.035H122.42v58.195				h20.956c3.996,0,7.388-0.678,10.252-2.035c2.79-1.357,5.277-3.543,7.312-6.483c0.905-1.206,1.584-2.563,2.111-3.92				c0.528-1.432,0.905-2.94,1.131-4.598c0.227-1.658,0.301-3.468,0.377-5.503c0.075-1.96,0.075-4.146,0.075-6.558				C164.633,79.908,164.633,77.721,164.558,75.761z M153.175,88.2c0,1.734-0.15,3.091-0.302,4.297				c-0.151,1.131-0.376,2.186-0.678,2.94c-0.301,0.829-0.754,1.583-1.281,2.261c-1.885,2.412-4.749,3.543-8.518,3.543h-8.668V63.323				h8.668c3.769,0,6.634,1.206,8.518,3.618c0.528,0.678,0.98,1.357,1.281,2.186c0.302,0.829,0.528,1.809,0.678,3.015				c0.152,1.131,0.302,2.563,0.302,4.221c0.075,1.659,0.075,3.694,0.075,5.955C153.251,84.581,153.251,86.541,153.175,88.2z"/>			<path style="fill:#FFFEFE;" d="M213.18,63.323V53.222h-38.37v58.195h11.383V87.823h22.992V77.646h-22.992V63.323H213.18z"/>		</g>		<g>			<path style="fill:#FFFEFE;" d="M110.133,64.379c-0.905-2.186-2.111-4.146-3.769-5.804c-1.659-1.658-3.694-3.015-6.031-3.92				c-2.412-0.98-5.127-1.432-8.141-1.432H69.652v58.195h11.383V89.481h11.157c3.015,0,5.729-0.452,8.141-1.432				c2.337-0.905,4.371-2.261,6.031-3.92c1.658-1.658,2.865-3.543,3.769-5.804c0.828-2.186,1.281-4.523,1.281-6.935				C111.413,68.902,110.961,66.565,110.133,64.379z M97.845,77.118c-1.508,1.432-3.618,2.186-6.182,2.186H81.035V63.323h10.628				c2.564,0,4.674,0.754,6.182,2.261c1.432,1.432,2.185,3.392,2.185,5.804C100.031,73.726,99.277,75.686,97.845,77.118z"/>		</g>	</g>	<polygon style="opacity:0.08;fill:#040000;" points="475.435,117.825 475.435,512 47.791,512 47.791,419.581 247.706,219.667 		259.541,207.832 266.099,201.273 277.029,190.343 289.995,177.377 412.491,54.881 	"/>	<polygon style="fill:#BBBBBA;" points="475.435,117.836 357.6,117.836 357.6,0 	"/>	<g>		<path style="fill:#B43331;" d="M414.376,370.658c-2.488-4.372-5.88-8.518-10.101-12.287c-3.467-3.166-7.538-6.106-12.137-8.82			c-18.543-10.93-45.003-16.207-80.961-16.207h-3.618c-1.96-1.809-3.996-3.618-6.106-5.503			c-13.644-12.287-24.499-25.63-32.942-40.48c16.583-36.561,24.499-69.126,23.519-96.867c-0.151-4.674-0.83-9.046-2.036-13.117			c-1.808-6.558-4.824-12.363-9.046-17.112c-0.075-0.075-0.075-0.075-0.15-0.151c-6.709-7.538-16.056-11.835-25.555-11.835			c-9.574,0-18.393,4.146-24.802,11.76c-6.331,7.538-9.724,17.866-9.875,30.002c-0.225,18.544,1.282,36.108,4.448,52.315			c0.301,1.282,0.528,2.563,0.829,3.844c3.166,14.7,7.84,28.645,13.871,41.611c-7.086,14.398-14.248,26.836-19.222,35.279			c-3.769,6.408-7.916,13.117-12.213,19.826c-19.373,3.468-35.807,7.689-50.129,12.966c-19.374,7.011-34.903,16.056-46.059,26.836			c-7.238,6.935-12.137,14.323-14.55,22.012c-2.563,7.915-2.411,15.83,0.453,22.916c2.638,6.558,7.387,12.061,13.719,15.83			c1.508,0.905,3.091,1.658,4.749,2.337c4.825,1.96,10.102,3.015,15.604,3.015c12.74,0,25.856-5.503,36.938-15.378			c20.654-18.469,41.988-48.169,54.576-66.94c10.327-1.583,21.559-2.94,34.224-4.297c14.927-1.508,28.118-2.412,40.104-2.865			c3.694,3.317,7.237,6.483,10.63,9.498c18.846,16.81,33.168,28.947,46.134,37.465c0,0.075,0.075,0.075,0.15,0.075			c5.127,3.392,10.026,6.181,14.926,8.443c5.502,2.563,11.081,3.92,16.81,3.92c7.237,0,14.021-2.186,19.675-6.181			c5.729-4.146,9.875-10.101,11.76-16.81C420.181,387.694,418.899,378.724,414.376,370.658z M247.706,219.667			c-1.056-9.348-1.508-19.072-1.357-29.324c0.15-9.724,3.694-16.283,8.895-16.283c3.919,0,8.066,3.543,9.951,10.327			c0.528,2.035,0.905,4.372,0.98,7.01c0.15,3.166,0.075,6.483-0.075,9.875c-0.452,9.574-2.112,19.75-4.976,30.681			c-1.734,7.011-3.995,14.323-6.784,21.936C251.173,243.186,248.911,231.803,247.706,219.667z M121.968,418.073			c-1.282-3.166,0.15-9.272,7.99-16.81c11.985-11.458,30.755-20.504,56.914-27.364c-4.976,6.784-9.875,12.966-14.625,18.619			c-7.237,8.744-14.172,16.132-20.429,21.71c-5.351,4.824-11.232,7.84-16.81,8.594c-0.98,0.151-1.96,0.226-2.94,0.226			C127.169,423.049,123.173,421.089,121.968,418.073z M242.428,337.942l0.528-0.829l-0.829,0.151			c0.15-0.377,0.377-0.754,0.602-1.055c3.167-5.352,7.161-12.212,11.458-20.127l0.377,0.829l0.98-2.035			c3.166,4.523,6.634,8.971,10.252,13.267c1.735,2.035,3.544,3.995,5.352,5.955l-1.205,0.075l1.055,0.98			c-3.09,0.226-6.331,0.528-9.573,0.829c-2.036,0.226-4.147,0.377-6.257,0.603C250.796,337.037,246.499,337.49,242.428,337.942z			 M369.298,384.98c-8.97-5.729-18.997-13.795-31.36-24.575c17.564,1.809,31.36,5.654,41.159,11.383			c4.297,2.488,7.538,5.051,9.724,7.538c3.619,3.844,4.901,7.312,4.221,9.649c-0.602,2.337-3.241,3.92-6.483,3.92			c-1.885,0-3.844-0.452-5.879-1.432c-3.468-1.658-7.086-3.694-10.931-6.181C369.598,385.282,369.448,385.131,369.298,384.98z"/>	</g></g></svg>
        </div>
    </div>
            
   </div>
    
     <!--fim DETALHE DAS VENDAS--> 
            
   </template>
   
   <script setup>
       import Progress from '@/components/Progress.vue'; 
       import { onMounted, ref } from 'vue';
       import axios from 'axios'
       import feather from 'feather-icons';
       import {indexStore, useUserStore} from '../../store/IndexStore' 
       import jsPDF from 'jspdf';
       import 'jspdf-autotable';
       const store = indexStore();  
       const storeLogin = useUserStore()  
   
       const props = defineProps({
           dados: String
           })
   
       console.log(props.dados)
       store.relDetalhePDF = []

       var arredonda = function(numero, casasDecimais) {
        casasDecimais = typeof casasDecimais !== 'undefined' ?  casasDecimais : 0;
        return +(Math.floor(numero + ('e+' + casasDecimais)) + ('e-' + casasDecimais));
      };

       props.dados.filter(f=> f.MARCA == store.marcaDetalhe).map((x,index) => {
        let comissao = 0 

            if (x.COMISSAO && x.PERC > 0){
                comissao = x.COMISSAO
            }else{ 
                    comissao =  x.TOTAL_VENDA *  x.PERC  
            }
            if (x.PERC == 0){
                console.log(x.COMISSAO)
                comissao = x.COMISSAO_TOTAL / props.dados.filter(f=> f.MARCA == store.marcaDetalhe).length
            } 

            var dados = {
                NUM: index + 1,
                DATA:       x.DATA_VENDA,
                MODELO:     x.DESCRICAO_MODELO,
                CHASSI:     x.CHASSI,
                PROPOSTA:   x.COD_PROPOSTA,
                CPF:        x.COD_CLIENTE,
                NOME:       x.NOME_CLIENTE,
                TOTAL:      formataDinheiro(x.TOTAL_VENDA),
                MARGEM:     x.MARGEM_VENDA,
                COMISSAO:   formataDinheiro(comissao),
                GANHOS:     x.GANHOS,
                DESPESAS:   x.DESPESAS,
                MARCA:      x.MARCA,
                PERC:       arredonda(x.PERC * 100,2),
                
            }
            store.relDetalhePDF.push(dados)
       })
   
        
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
            let cols =['NUM','DATA','NOME','MODELO','CHASSI','PROPOSTA','TOTAL','COMISSAO','PERC']
            const records = store.relDetalhePDF
            
            let filename = 'Comissao-'+store.vendedorSelecionado;  
       
            cols = cols.map((d) => {
                return { header: capitalize(d), dataKey: d };
            });
            const doc = new jsPDF('l', 'pt', cols.length > 10 ? 'a3' : 'a4');
            let str = "Pagina: ";
            let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber;
            var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
            var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
            const arrayHead = []

 

            
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
                
                head: [['NUM','DATA','NOME','MODELO','CHASSI','PROPOSTA','TOTAL','COMISSAO','PERC']], 
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
                body: records,
                styles: { overflow: 'linebreak' },
                pageBreak: 'auto', 
                margin: {
                        top: 60,
                        bottom: 30,
                        left: 35,
                        width: 522
                            },
                columnStyles: { 0: {cellWidth: 35},1: {cellWidth: 80},2: {halign: 'left'} ,3: {halign: 'left'} ,4: {halign: 'left'} ,5: {halign: 'left'} ,     6: {halign: 'right'} , 7: {halign: 'right'} , 8: {halign: 'right' }
                                },
                didDrawPage: () => { 
                    doc.setFontSize(15);
                    doc.text( store.vendedorSelecionado+ ' - Mês: '+store.mesSelecionado, 320, 25);
                    doc.setFontSize(12);
                    doc.text( 'Tipo: '+store.tipoComissaoSelecionada+ ' - Comissão: R$: '+store.valorComissaoSelecionada, 35, 50, );                   
                    doc.text( 'Emissão: '+store.dataHora(), 650, 25, );
                   // doc.text( 'COMISSÃO: '+store.valorComissaoSelecionada,500 , 550, ); EX TOTAL NO FINAL
                    
                    doc.setTextColor(40); 
                   
                    doc.text(str + doc.internal.getCurrentPageInfo().pageNumber, pageWidth / 2, pageHeight  - 10, {align: 'center'}); 
                
                },
            });
            

            doc.save(store.vendedorSelecionado+ ' - '+ store.tipoComissaoSelecionada+ '  - Mês: '+store.mesSelecionado+'.pdf');
        
    };  


    function somaValor(array) { 
            var arr =  array     
            var sum = 0; 
            for(var i =0;i<arr.length;i++){ 
              sum+=arr[i]; 
            }  
             
            return sum
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
   </style>
   
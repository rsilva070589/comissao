import { ref } from 'vue' 
import { defineStore } from 'pinia';
 

export const indexStore = defineStore("rotas", () =>{
    const rotas = ref({ 
    }); 

 
   //const baseApiHTTPS  = 'https://json-replace-oracle-production.up.railway.app'
   
   const baseApiHTTPS  = 'http://192.168.10.12:4141'
   

   //const baseApiHTTPS  = 'http://35.226.231.200:4040'

  
  

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
 

    return {     
        formataDinheiro
    }
});



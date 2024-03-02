<template>
    <!-- BEGIN FOOTER -->
    <div class="footer-wrapper">
       
    </div>
    <!-- END FOOTER -->
</template>

<script setup> 
    import { indexStore, useUserStore } from '../../store/IndexStore' 
    const store = indexStore();

    function dataFormatada(d){ 
    var data =  new Date(d),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return anoF 
    }
  
</script>
<template>
  <div  
    style="display: flex; justify-content: center; padding-top: 100px; ;
    "
>
    
      <div class="spinner-border text-primary" role="status" style="width: 100px; height: 100px;">
        <span class="sr-only"></span>
      </div>
 
  </div>
</template>

<script setup>
 import {indexStore} from '../store/IndexStore' ;
const store = indexStore(); 
</script>

<style>

</style>
import { ref } from 'vue' 
import { defineStore } from 'pinia'; 

export const useUserStore = defineStore("user", () =>{
    const user = ref({ 
        uidOri: 'DEFAULT',
        displayNameOri: 'DEFAULT',
        photoUrlOri: 'DEFAULT', 
        emailOri: 'DEFAULT',
        
        uidDest: 'DEFAULT',
        displayNameDest: 'DEFAULT',
        photoUrlDest: 'DEFAULT', 
                
        result: null,        
        uid: 'NAO-TEM',
        collectionChat: '',

        ultimaMensagem: '',
        dataUltimaMensagem: ''
    });

    const arrayPinia = [];

 

    return {
        user,
        arrayPinia
    }
});
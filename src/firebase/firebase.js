import { initializeApp } from "firebase/app"; 
import { getFirestore  } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const firebaseConfig = {
  apiKey:'AIzaSyC1-sFFdJLKhtnK_YcLm3m6IHXv2JKVkr0',
  authDomain:'projetodev-176bd.firebaseapp.com',
  projectId:'projetodev-176bd.firebaseapp.com',
  storageBucket:'projetodev-176bd.firebaseapp.com',
  messagingSenderId:'projetodev-176bd.firebaseapp.com',
  appId:'projetodev-176bd.firebaseapp.com',
  measurementId:'projetodev-176bd.firebaseapp.com'
}; 

const app = initializeApp(firebaseConfig); 
const db = getFirestore(app);
const storage = getStorage(app);

export {
    db
} 
 

const auth = getAuth()

export function useAuth() {
  const user = ref(null)
  const unsubscribe = auth.onAuthStateChanged(_user => (user.value = _user))
  onUnmounted(unsubscribe)
  const isLogin = computed(() => user.value !== null)

  const signIn = async () => {
    const googleProvider = new GoogleAuthProvider()
    await signInWithPopup(getAuth(), googleProvider)
    console.log(googleProvider);
  }
   
  const signOut = () => { 
        auth.signOut()
        console.log("Fechando") 
      }
  return { user, isLogin, signIn, signOut } 
}
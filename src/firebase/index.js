import { initializeApp } from "firebase/app"; 
import { getFirestore } from "firebase/firestore";
 
const firebaseConfig = {
  apiKey:             process.env.VUE_APP_APIKEY,
  authDomain:         process.env.VUE_APP_AUTHDOMAIN,
  projectId:          process.env.VUE_APP_PROJECTID,
  storageBucket:      process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId:  process.env.VUE_APP_MESSAGINGSENDERID,
  appId:              process.env.VUE_APP_APPID,
  measurementId:      process.env.VUE_APP_MEASUREMENDID
};

const app = initializeApp(firebaseConfig); 
const db = getFirestore(app);

export {
    db
}
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Timestamp, collection, onSnapshot,  setDoc, doc, deleteDoc, updateDoc, query, orderBy, limit} from  'firebase/firestore'
import { db }   from '../firebase/firebase' 
const storage = getStorage(); 
  
   
export default function  postPhoto(arrayPhoto:Blob, 
                                              idTodo: string, 
                                              nome:   string,
                                              Valor:  Number,
                                              descricao:   string,
                                              categoria:   string,
                                              situacao: string,
                                              idEmpresa: string,
                                              qualTela: string,
                                              idCadEmpresa: String
                                              
                                               ) {
          
const metadata = {   contentType: 'image/png' };
const storageRef = ref(storage, 'images/'+idEmpresa+'/' + idTodo);
const uploadTask = uploadBytesResumable(storageRef, arrayPhoto, metadata);
      
        uploadTask.on('state_changed',
          (snapshot) => { 
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
       
          },
          (error) => { 
            switch (error.code) {
              case 'storage/unauthorized': 
                break;
              case 'storage/canceled': 
                break; 
              case 'storage/unknown': 
                break;
            }
          },
          () => {             
            getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL) => {
              console.log('File available at', getDownloadURL);    
              // vou gravar a URL da Imagem no TODOO
               const updateImgProd = () => {
                console.log('add imagem produto')           
                         setDoc(doc (db, 'PRAJA/PRODUTOS/'+idEmpresa+'/' + idTodo), { 
                            foto: getDownloadURL,
                             data: Date.now(),
                             nome: nome,
                             valor: Valor,
                             descricao: descricao,
                             categoria: categoria
                          } )
                          }
                

                  const updateLogoEmpresa = async () => {
                    console.log('Updade Logo empresa')           
                    await updateDoc(doc (db, 'PRAJA/EMPRESAS/LISTA', idCadEmpresa), { 
                              img: getDownloadURL,
                              data: Date.now()                     
                            })
                              }

                console.log(idCadEmpresa)
                 if (!idCadEmpresa) {
                  updateImgProd()
                 } else{
                  updateLogoEmpresa() 
                 }
                               
                                 

              })  
            }
            )
 
}
 
 //download da imagem
 /*
        const pathReference  = ref(storage, 'images/Perfil.png');
        const gsReference    = ref(storage, 'gs://bucket/images/Perfil.png'); 
        const starsRef       = ref(storage, 'images/Perfil.png');
 
    
          getDownloadURL(starsRef)
                      .then((url) => { 
                        console.log('Url da Imagem: ' +url)
                        imagens.push( {"url": url}  )
                        //console.log(imagens)
                      })
                      .catch((error) => {               
                        switch (error.code) {
                          case 'storage/object-not-found': 
                            break;
                          case 'storage/unauthorized': 
                            break;
                          case 'storage/canceled': 
                            break; 
                          case 'storage/unknown': 
                            break;
                        }
                      })  
        */
   ////-----firebase fim------/////
 
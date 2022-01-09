import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT,LARAVEL_SGI} from '../../config/API'
const axios = require('axios');


export const obtenerDocumentosFormulario = (params,setData) => {

 
  let url = LARAVEL_SGI+"perfilDocumentos/formulario"
  let setting = {
    method: "Get",
    url: url,
    params,
    headers: { 'Accept': 'application/json', }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
      setData(response.documentos)


     }else{
     
     }
    })
    .catch((error) => {
     


    });
}
export const obtenerDocumentosProyecto = (params,setData) => {

 
    let url = LARAVEL_SGI+"perfilDocumentos/proyecto"
    let setting = {
      method: "Get",
      url: url,
      params,
      headers: { 'Accept': 'application/json', }
  
    };
  
  
    axios(setting)
      .then((res) => {
        let response = res.data
       if(response.type!="error"){
        setData(response.documentos)
  
  
       }else{
       
       }
      })
      .catch((error) => {
       
  
  
      });
  }

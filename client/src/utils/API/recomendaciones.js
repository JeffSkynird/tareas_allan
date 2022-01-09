import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT,LARAVEL_SGI} from '../../config/API'
const axios = require('axios');

export const obtenerRecomendaciones = (setData) => {

 
  let url = LARAVEL_SGI+"medios"
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json', }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
        setData(response.medios)
     

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}
export const obtenerCanales = (setData) => {

 
  let url = LARAVEL_SGI+"canales"
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json', }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
        setData(response.canales)
     

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}
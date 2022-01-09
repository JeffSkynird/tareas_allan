import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT,LARAVEL_SGI} from '../../config/API'
const axios = require('axios');

export const obtenerEstadoCivil = (setData) => {

 
  let url = LARAVEL_SGI+"estadocivil"
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json', }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
        setData(response.estado_civil)
     

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}
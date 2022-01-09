import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT} from '../../config/API'
const axios = require('axios');

export const obtenerTodos = (setData,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

 
  let url =ENTRYPOINT+"housing_plants/all"
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json',Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
        setData(response)
     

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}
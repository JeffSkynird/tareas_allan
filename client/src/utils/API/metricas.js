import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT,LARAVEL_SGI} from '../../config/API'
const axios = require('axios');

export const obtenerTodosPorPoll = (id,setData,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;


let url = ENTRYPOINT+"showByPoll/"+id
let setting = {
  method: "Get",
  url: url,
  headers: { 'Accept': 'application/json',
  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

};


axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
      setData(response.data)
   

   }else{
   
   }
  })
  .catch((error) => {
   


  });
}
export const obtenerTodos = (setData,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

 
  let url = ENTRYPOINT+"metrics"
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json',
    Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
        setData(response.data)
     

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}
export const obtenerPreguntas = (data,setData,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

 
  let url = ENTRYPOINT+"questions"
  let setting = {
    method: "Get",
    url: url,
    params:data,
    headers: { 'Accept': 'application/json',
    Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
        setData(response.data)
     

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}
export const obtenerOpciones = (setData,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

 
  let url = ENTRYPOINT+"options"
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json',
    Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
        setData(response.data)
     

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}
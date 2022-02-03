import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT} from '../../config/API'
const axios = require('axios');

export const obtenerPermisosUser = (setData,store) => {

    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
    let url = ENTRYPOINT+"get_permissions"
    let setting = {
      method: "Get",
      url: url,
      headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }
  
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
    let url = ENTRYPOINT+"permissions"
    let setting = {
      method: "Get",
      url: url,
      headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }
  
    };
  
  
    axios(setting)
      .then((res) => {
        let response = res.data
       if(response.type!="error"){
          setData(response.permisos)
       
  
       }else{
       
       }
      })
      .catch((error) => {
       
  
  
      });
  }
  
  
  export const crear = (data, store ,limpiar)=> {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
   
 
    let url = ENTRYPOINT+"permissions";
    let setting = {
      method: "POST",
      url: url,
      data: data,
      body: data,
      headers: { Accept: "application/json",  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, },
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
          limpiar()
        } else {
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
        mostrarNotificacion({ type: "error", message: error.message });
      });
  };
  export const editar = (data,store,limpiar )=> {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
   
 
    let url = ENTRYPOINT+"permissions";
    let setting = {
      method: "PUT",
      url: url,
      data: data,
      body: data,
      headers: { Accept: "application/json",  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, },
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
         
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
          limpiar()
        } else {
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
        mostrarNotificacion({ type: "error", message: error.message });
      });
  };
  
  export const eliminar = (city_id,store,cargarData) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"permissions";
    var raw = {
        rol_id:city_id,
    };
    let setting = {
      method: "DELETE",
      url: url,
      data: raw,
      body: raw,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
  
      }
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data
        if(res.data.type!="error"){
        
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
          cargarData()
        }else{
        
          mostrarLoader(false);
          mostrarNotificacion({ type: "error", message: response.message });
        }
        
      })
      .catch((error) => {
        mostrarLoader(false);
        mostrarNotificacion({ type: "success", message: error.message });
      });
  };
  
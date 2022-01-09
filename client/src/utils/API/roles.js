import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT} from '../../config/API'
const axios = require('axios');

export const obtenerRolUsuario = (id,setData,store) => {

  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  let url = ENTRYPOINT+"user/role?user_id="+id
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
        setData(response.role)
     

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}
export const obtenerPermisosAuth = (setData,store) => {

  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  let url = ENTRYPOINT+"permission/user"
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
export const obtenerTodos = (setData,store) => {

    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
    let url = ENTRYPOINT+"roles"
    let setting = {
      method: "Get",
      url: url,
      headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }
  
    };
  
  
    axios(setting)
      .then((res) => {
        let response = res.data
       if(response.type!="error"){
          setData(response.roles)
       
  
       }else{
       
       }
      })
      .catch((error) => {
       
  
  
      });
  }
  export const obtenerPermisos = (setData,store) => {

    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
    let url = ENTRYPOINT+"permisos"
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
  
  export const obtenerPermisosRol = (rol,setData,store) => {

    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
    let url = ENTRYPOINT+"role/permissions/get?rol="+rol
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
  
  export const crearRol = (data, store,       asignarP ,limpiar)=> {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
   
 
    let url = ENTRYPOINT+"role/create";
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
            asignarP();
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
  export const editarRol = (data, asignarP,store,limpiar )=> {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
   
 
    let url = ENTRYPOINT+"role/edit";
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
          asignarP()
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
  export const asignarPermiso = (data, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
   
 
    let url = ENTRYPOINT+"role/asign-multiple";
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
  export const eliminarRole = (city_id,store,cargarData) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"role/delete";
    var raw = {
        rol:city_id,
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
  
import { guardarSession,obtenerSession,removeSession } from '../session'
import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT} from '../../config/API'
import {play} from '../../utils/sound'

const axios = require('axios');
export const upload = (data, store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;

 
  var resp = new FormData()
  resp.append('file', data.image_file)
  
  let url = ENTRYPOINT+"upload";
  let setting = {
    method: "POST",
    url: url,
    data: resp,
    body: resp,
    headers: { Accept: "application/json",
    Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, },
  };
  mostrarLoader(true);

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
       
        mostrarLoader(false);
      } else {
        mostrarNotificacion({ type: "error", message: response.message });

        mostrarLoader(false);
      }
    })
    .catch((error) => {
      mostrarLoader(false);

      
    });
};
export const registrar = (data, setTab,store) => {
  const { cargarUsuario ,playSound,mostrarNotificacion,mostrarLoader} = store
  
  let url = ENTRYPOINT+"users"
  let setting = {
    method: "POST",
    url: url,
    data: data,
    body:data,
    headers: { 'Accept': 'application/json' }

  };
  mostrarLoader(true)

  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
      mostrarLoader(false)
      mostrarNotificacion({type:"success",message:response.message})
      setTab(0)
     }else{
      mostrarNotificacion({type:"error",message:response.message})
      mostrarLoader(false)
   
     }
    })
    .catch((error) => {
      mostrarLoader(false)

      


    });
}
export const editarUsuario = (data,     uploadImage,store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;
 

  let url = ENTRYPOINT+"user";
  let setting = {
    method: "PUT",
    url: url,
    params:data,
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
    
        window.location.reload();
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
export const iniciarSesion = (email, password, store,history) => {
  const { cargarUsuario ,playSound,mostrarNotificacion,mostrarLoader} = store
  var raw = {
    "email": email,
    "password": password
  }
  let url = ENTRYPOINT+"auth/login"
  let setting = {
    method: "POST",
    url: url,
    data: raw,
    body:raw,
    headers: { 'Accept': 'application/json' }

  };
  mostrarLoader(true)

  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
      let user={
        user:response.user,
        token: response.token
      }
      let encrypt= encriptarJson(JSON.stringify(user))
    
      cargarUsuario(encrypt)
      guardarSession(encrypt);
      mostrarLoader(false)
      mostrarNotificacion({type:"success",message:response.message})
    
      /* if(response.user.type_user=="client"){
        history.push('dashboard');
      }else{
        history.push('dashboard_asesor');
      } */
      window.location.href='/redirect';

     }else{
      mostrarNotificacion({type:"error",message:response.message})
      mostrarLoader(false)
   
     }
    })
    .catch((error) => {
      mostrarLoader(false)
 
      


    });
}
export const cerrarSesion = (store) => {
  const { usuario,logout,mostrarNotificacion ,playSound,mostrarLoader} = store

  let url = ENTRYPOINT+"auth/logout"
  let setting = {
    method: "POST",
    url: url,

    headers: {
       'Accept': 'application/json',
      'Authorization':'Bearer '+JSON.parse(desencriptarJson(usuario)).token
      }

  };
  mostrarLoader(true)

  axios(setting)
    .then((res) => {
      logout()
      removeSession()
     
      mostrarNotificacion({type:"success",message:res.data.message})
      mostrarLoader(false)
      window.location.href="/login"

    })
    .catch((error) => {
      mostrarLoader(false)

      let response = error.data

   
    });
}
export const obtenerUsuario = (setData,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;


let url = ENTRYPOINT+"user"
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

export const obtenerPhoto = (setFile,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;


let url = ENTRYPOINT+"user_photo"
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
      setFile(response)
   

   }else{
   
   }
  })
  .catch((error) => {
   


  });
}
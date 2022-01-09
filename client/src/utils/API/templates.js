
import { encriptarJson, desencriptarJson } from "../security";
import {ENTRYPOINT} from '../../config/API'
import {play} from '../sound'

const axios = require("axios");
export const obtenerTodosPlantilla = (setData, store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

  let url = ENTRYPOINT+"email_template/all";
  let setting = {
    method: "GET",
    url: url,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
    },
  };
 

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        setData(response.data);
       
      } else {
       
      }
    })
    .catch((error) => {
    
    });
};
export const enviarMensaje = (client_id,plantilla_id, store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"email_template/send?client_id="+client_id+"&template_id="+plantilla_id;
    let setting = {
      method: "GET",
      url: url,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
      },
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
  export const enviarMensajeMultiple = (data, store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"email_template/send_multiple";
    let setting = {
      method: "POST",
      data: data,
      body: data,
      url: url,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
      },
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
export const editar = (data,atras, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader,playSound } = store;
   
   
    let url = ENTRYPOINT+"email_template/edit";
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
          play(playSound,'success')
          atras()

        } else {
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
          play(playSound,'error')

        }
      })
      .catch((error) => {
        mostrarLoader(false);
        play(playSound,'error')

        mostrarNotificacion({ type: "error", message: error.message });
      });
  };
   export const registrar = (data, atras,store,subir) => {
    const { usuario, mostrarNotificacion, mostrarLoader,playSound } = store;
  
   
    let url = ENTRYPOINT+"email_template/register";
    let setting = {
      method: "POST",
      url: url,
      data: data,
      body: data,
      headers: { Accept: "application/json",
      Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  },
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
          
          subir(response.template.id)
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
          play(playSound,'success')
          atras()

        } else {
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
          play(playSound,'error')

        }
      })
      .catch((error) => {
        mostrarLoader(false);
        play(playSound,'error')

        mostrarNotificacion({ type: "error", message: error.message });
      });
  }
  export const eliminar = (template_id,store,cargarData) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader,playSound } = store;
  
    let url = ENTRYPOINT+"email_template/delete";
    var raw = {
        template_id:template_id,
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
          play(playSound,'success')

        }else{
        
          mostrarLoader(false);
          mostrarNotificacion({ type: "error", message: response.message });
          play(playSound,'error')

        }
        
      })
      .catch((error) => {
        mostrarLoader(false);
        mostrarNotificacion({ type: "success", message: error.message });
        play(playSound,'error')

      });
  };
  export const uploadAttach = (data, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
  
   
    var resp = new FormData()
    resp.append('template_file', data.template_file)
    resp.append('template_id',  data.template_id)
    
    let url = ENTRYPOINT+"email_template/upload";
    let setting = {
      method: "POST",
      url: url,
      data: resp,
      body: resp,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
  
      }
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
         
          mostrarLoader(false);
          //mostrarNotificacion({ type: "success", message: response.message });
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
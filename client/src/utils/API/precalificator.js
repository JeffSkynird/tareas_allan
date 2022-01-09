import { encriptarJson, desencriptarJson } from "../security";
import {ENTRYPOINT,LARAVEL_SGI} from '../../config/API'
const axios = require("axios");
export const obtenerOpciones = (setData, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"precalificator/options";
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

  export const obtenerParametrosSgi = (setData) => {
   
  
    let url = LARAVEL_SGI+"parametros";
    let setting = {
      method: "GET",
      url: url,
      headers: {
        Accept: "application/json",
       
      },
    };


    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
          setData(response.parametros);
          
         
        } else {
        
      
        }
      })
      .catch((error) => {
      
  
       
      });
  };
  
  export const registrarOpciones= (data, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"precalificator/editar";
    let setting = {
      method: "POST",
      url: url,
      data: data,
      body: data,
      headers: { Accept: "application/json",
      Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, },
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
  export const obtenerDetalleArchivos = (id,setData, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"precalificator/file_detail?client_id="+id;
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
          setData({...response.data,dependence:response.client_dependence});
          
         
        } else {
        
      
        }
      })
      .catch((error) => {
      
  
       
      });
  };

  export const obtenerDetalleArchivosS = (id,setData, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"precalificator/file_detail_spouse?spouse_id="+id;
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
          setData({...response.data,dependence:response.client_dependence});
          
         
        } else {
        
      
        }
      })
      .catch((error) => {
      
  
       
      });
  };
 
  export const actualizarCalificacionArchivo= (data, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"file_data/update";
    let setting = {
      method: "POST",
      url: url,
      data: data,
      body: data,
      headers: { Accept: "application/json",
      Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, },
    };
    //mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
         
       //   mostrarLoader(false);
          //mostrarNotificacion({ type: "success", message: response.message });
        } else {
         /*  mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false); */
        }
      })
      .catch((error) => {
     /*    mostrarLoader(false);
  
        mostrarNotificacion({ type: "error", message: error.message }); */
      });
  };
  
  export const editarCliente= (data, store,setValidation,setHasValidation) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"precalificator/editar_cliente";
    let setting = {
      method: "POST",
      url: url,
      data: data,
      body: data,
      headers: { Accept: "application/json",
      Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, },
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
         
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
        } else {
          if(response.fields!=null){
            setValidation(response.fields)
            setHasValidation(true)
          }
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
        mostrarNotificacion({ type: "error", message: error.message });
      });
  };
  export const editarClienteS= (data, store,setValidation,setHasValidation,subirConyuge,atras) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"precalificator/editar_cliente";
    let setting = {
      method: "POST",
      url: url,
      data: data,
      body: data,
      headers: { Accept: "application/json",
      Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, },
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
         
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
          subirConyuge();
          atras()
        } else {
          if(response.fields!=null){
            setValidation(response.fields)
            setHasValidation(true)
          }
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
        mostrarNotificacion({ type: "error", message: error.message });
      });
  };
  export const downloadFiles = (datos,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
    const {client_id,dni}=datos
  
    let url = ENTRYPOINT+"precalificator/download?client_id="+client_id+'&dni='+dni;
    let setting = {
      method: "GET",
      url: url,
      responseType: 'blob',
      headers: {
        Accept: "application/json",
      }
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if(res.data.type!="error"){
          const url = window.URL.createObjectURL(new Blob([response]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'data.pdf'); //or any other extension
          document.body.appendChild(link);
          link.click();
          mostrarLoader(false);
        
        }else{
        
          mostrarLoader(false);
          
        }
        
      })
      .catch((error) => {
        mostrarLoader(false);
     
      });
  };


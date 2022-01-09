import { encriptarJson, desencriptarJson } from "../security";
import {ENTRYPOINT} from '../../config/API'
const axios = require("axios");
export const obtenerTodos = (setData, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    let superQuery = ""
    if(JSON.parse(desencriptarJson(usuario)).user.type_user=="supervisor"){
      superQuery="?supervisor="+JSON.parse(desencriptarJson(usuario)).user.user_ca
    }
    let url = ENTRYPOINT+"asessors/all"+superQuery;
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
          setData(response.data);
          mostrarLoader(false);
         
        } else {
        
          mostrarLoader(false);
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
       
      });
  };
  export const obtenerReservasAsesor = (data,setData, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    
    let url = ENTRYPOINT+"asesor/get_reservations"
    let setting = {
      method: "GET",
      url: url,
      params:data,
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
          if(response.hasOwnProperty('data_cumplen_asesores')){
            setData(response.data_cumplen_asesores[0].reservas_activas);
          }
        
         
        } else {
        
          mostrarLoader(false);
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
       
      });
  };

  
  export const obtenerSupervisor= (asessor_id,setData, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"supervisors/asigns?asessor_id="+asessor_id;
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
          setData(response.asessor.id);
          mostrarLoader(false);
         
        } else {
        
          mostrarLoader(false);
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
       
      });
  };
  
  export const obtenerPorAsesor= (setData, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"citation/get_by_asesor?asesor_id="+JSON.parse(desencriptarJson(usuario)).user.user_ca
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
          setData(response.data);
          mostrarLoader(false);
         
        } else {
        
          mostrarLoader(false);
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
       
      });
  };
  export const asignarAsesor = (data, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    const {
        asessor_id,
      client_id,village_id
    
    } = data;
    var raw = {
      asessor_id:asessor_id,
      client_id:client_id,
      village_id:village_id
    
    };
    let url = ENTRYPOINT+"asessors/asignar";
    let setting = {
      method: "POST",
      url: url,
      data: raw,
      body: raw,
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
  export const editarAsesor = (data, atras,store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    const {

      dni,
      names,
      last_names,
      born_date,
      cellphone,
      landline,asesor_id,
      address,
      neighborhood,password,
      city_id,
      production
    } = data;
    var raw = {
      ...data,
      password:password,
      dni:dni,
      asesor_id:asesor_id,
      names:names,
      last_names:last_names,
      born_date:born_date,
      cellphone:cellphone,
      landline:landline,
      address:address,
      neighborhood:neighborhood,
      city_id:city_id,
      production:production
    };
    let url = ENTRYPOINT+"asessor/edit";
    let setting = {
      method: "POST",
      url: url,
      data: raw,
      body: raw,
      headers: { Accept: "application/json" },
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
         
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
          atras()
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
  export const registerAsesor = (data,vaciarCampos, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    const {

      dni,
      names,email,
      last_names,
      born_date,
      cellphone,
      landline,asesor_id,
      address,password:password,
      neighborhood,
      city_id,production
  
    } = data;
    var raw = {
      password:password,
      dni:dni,
      asesor_id:asesor_id,email:email,
      names:names,
      last_names:last_names,
      born_date:born_date,
      cellphone:cellphone,
      landline:landline,
      address:address,
      neighborhood:neighborhood,
      city_id:city_id,
      production:production
    };
    let url = ENTRYPOINT+"asessors/register";
    let setting = {
      method: "POST",
      url: url,
      data: raw,
      body: raw,
      headers: { Accept: "application/json",
      Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  },
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
         
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
          vaciarCampos()
        } else {
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
        mostrarNotificacion({ type: "error", message: error.message });
      });
  }
  
  export const eliminarAsesor = (asesor_id,store,cargarData) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"asessor/delete";
    var raw = {
      asesor_id:asesor_id,
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
  export const upload = (data, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
  
   
    var resp = new FormData()
    resp.append('image_file', data.image_file)
    resp.append('dni',  data.dni)

    
    let url = ENTRYPOINT+"asessors/upload";
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
          //mostrarNotificacion({ type: "success", message: response.message });
        } else {
         
          mostrarLoader(false);
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
        
      });
  };
  export const downloadFiles = (dni,setData,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

    let url = ENTRYPOINT+"asessors/download?dni="+dni;
    let setting = {
      method: "GET",
      url: url,
      responseType: 'blob',
      headers: {
        Accept: "application/json", Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
      }
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        console.log("ER")
        console.log(res)
        if(res.data.type!="error"){
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          //link.setAttribute('download', 'file.png'); //or any other extension
          document.body.appendChild(link);
     
          var oReq = new XMLHttpRequest();
    
          var URLToPDF = url;
    
          oReq.open("GET", URLToPDF, true);
    
          oReq.responseType = "blob";
    
          oReq.onload = function() {
              // Once the file is downloaded, open a new window with the PDF
              // Remember to allow the POP-UPS in your browser
              const file = new Blob([oReq.response], { type: 'image/png' });
    
              const fileURL = URL.createObjectURL(file);
              
              setData(fileURL)
              //window.open(fileURL, "_blank");
          };
    
          oReq.send();
          mostrarLoader(false);
        
        }else{
        
          mostrarLoader(false);
          
        }
        
      })
      .catch((error) => {
        mostrarLoader(false);
     
      });
  };
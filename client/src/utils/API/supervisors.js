import { encriptarJson, desencriptarJson } from "../security";
import {ENTRYPOINT} from '../../config/API'
const axios = require("axios");
export const obtenerTodos = (setData, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"supervisors/all";
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
  export const obtenerTodosPorMetas = (setData, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"supervisors/all?for_goals=1";
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
  export const obtenerAsigns = (setData, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"supervisors/asigns";
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
  
  
  export const editarSupervisor = (data,atras, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    const {
        supervisor_id,
      dni,
      names,
      last_names,
      born_date,
      cellphone,
      landline,
      address,
      neighborhood,
    
  
    } = data;
    var raw = {
       ...data,
      dni:dni,
      supervisor_id:supervisor_id,
      names:names,
      last_names:last_names,
      born_date:born_date,
      cellphone:cellphone,
      landline:landline,
      address:address,
      neighborhood:neighborhood,
  
  
    };
    let url = ENTRYPOINT+"supervisors/edit";
    let setting = {
      method: "POST",
      url: url,
      data: raw,
      body: raw,
      headers: { Accept: "application/json" , Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,},
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
  export const registerSupervisor = (data,vaciarCampos, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    const {

      dni,
      names,email,
      last_names,
      born_date,
      cellphone,
      landline,asesor_id,
      address,
      neighborhood,
      
  
    } = data;
    var raw = {
   
      dni:dni,
      asesor_id:asesor_id,email:email,
      names:names,
      last_names:last_names,
      born_date:born_date,
      cellphone:cellphone,
      landline:landline,
      address:address,
      neighborhood:neighborhood,
   
  
    };
    let url = ENTRYPOINT+"supervisors/register";
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
  export const asignarSupervisor = (data, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    const {

        asessor_id,
        supervisor_id
      
  
    } = data;
    var raw = {

      asessor_id:asessor_id,
      supervisor_id:supervisor_id,
   
  
    };
    let url = ENTRYPOINT+"supervisors/saveAsign";
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

  
  export const upload = (data, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
  
   
    var resp = new FormData()
    resp.append('image_file', data.image_file)
    resp.append('dni',  data.dni)

    
    let url = ENTRYPOINT+"supervisors/upload";
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

    let url = ENTRYPOINT+"supervisors/download?dni="+dni;
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
  
  export const eliminarSupervisor = (asesor_id,store,cargarData) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"supervisors/delete";
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
import { encriptarJson, desencriptarJson } from "../security";
import {ENTRYPOINT,LARAVEL_SGI} from '../../config/API'
const axios = require("axios");


export const obtenerProyectos = (setData) => {

 
  let url = LARAVEL_SGI+"proyectos"
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json', }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
        setData(response.proyectos)
     

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}
export const obtenerVillas = (setData) => {


  let url = ENTRYPOINT+"villages";
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
        setData(response);
       
      } else {
      
      }
    })
    .catch((error) => {
     
    });
};


export const obtenerTodasVillas = (setData,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;


  let url = ENTRYPOINT+"villages/all";
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
          mostrarNotificacion({ type: "success", message: response.message });
      } else {
        mostrarLoader(false);
        mostrarNotificacion({ type: "error", message: response.message });
      }
    })
    .catch((error) => {
      mostrarLoader(false);
        mostrarNotificacion({ type: "success", message: error.message });
    });
};
export const editarVilla = (data, store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;
 
  const {
    proyect,
    village_id,
    urbanization,
    name,
    housing_type_id,
    housing_plants_id,
    house_metters,
    dining_room,backyards,
    living_room,
    kitchen_room,
    bath_room,
    laundry,
    front_garden,
    back_garden,
    parking,
    entry,
    price,
    financing,
    financing_months
    
  } = data;
  var raw = {
    proyect,
    village_id,
    urbanization,
    name,
    housing_type_id,
    housing_plants_id,
    house_metters,
    dining_room,backyards,
    living_room,
    kitchen_room,
    bath_room,
    laundry,
    front_garden,
    back_garden,
    parking,
    entry,
    price,
    financing,
    financing_months
  };
  let url = ENTRYPOINT+"village/edit";
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

export const uploadFiles = (data, store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;

 
  var resp = new FormData()
  resp.append('internal-file', data.internal_file)
  let count=1

  
  if(data.external_files!=null){
    resp.append('files-number', data.external_files.length)
    for(let i=1;i<=data.external_files.length;i++){
      resp.append('external-file-'+i, data.external_files[(i-1)])
     
    }
   
  }else{
    resp.append('files-number', -1)
    resp.append('external-file', null)

  }


 // resp.append('external-files',  data.external_files)
  resp.append('village-id',  data.village_id)

  
  let url = ENTRYPOINT+"village/upload";
  let setting = {
    method: "POST",
    url: url,
    data: resp,
    body: resp, 
    headers: { Accept: "application/json", Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, },
   

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
export const downloadFiles = (datos,setData,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  const {village_id,tipo}=datos
  let url = ENTRYPOINT+"village/download?village_id="+village_id+"&tipo="+tipo;
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
        link.setAttribute('download', 'file.png'); //or any other extension
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
export const eliminarVilla = (village_id,store,cargarData) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

  let url = ENTRYPOINT+"village/delete";
  var raw = {
    village_id:village_id,
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
export const registerVillage = (data, store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;
  const {

    proyect,
    urbanization,name,
    housing_type_id,
    housing_plants_id,
    house_metters,
    dining_room,living_room,
    kitchen_room,
    laundry,
    backyards,
    front_garden, back_garden, parking,entry,price,financing,financing_months
  } = data;

  let url = ENTRYPOINT+"village/register";
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
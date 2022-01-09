import { encriptarJson, desencriptarJson } from "../security";
import {ENTRYPOINT} from '../../config/API'
const axios = require("axios");

export const obtenerLeadsPorAsesor  = (setData,store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;

 
  let url = ENTRYPOINT+"lead/clients_by_asesor?asesor_id="+JSON.parse(desencriptarJson(usuario)).user.user_ca
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json',   Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
  },

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
export const obtenerLeadsPorAsesorId  = (id,setData,store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;

  let user_ca = id
    if(user_ca==""){
      user_ca = JSON.parse(desencriptarJson(usuario)).user.user_ca
    }
  let url = ENTRYPOINT+"lead/clients_by_asesor?asesor_id="+user_ca
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json',   Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
  },

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
export const obtenerLead = (client_id,setData, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"lead?client_id="+client_id;
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
 
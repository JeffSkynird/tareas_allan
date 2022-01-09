
import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT,LARAVEL_SGI} from '../../config/API'
const axios = require('axios');
export const downloadFiles = (tipo,store,filter) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
   
    let params = ""
  if (filter.length != 0) {
    filter.map((e) => {
      params += "&" + e.tipo + "=" + e.valor
    })
  }
    let url = ENTRYPOINT+"reporte?tipo="+tipo+params;
    let setting = {
      method: "GET",

      url: url,
      responseType: 'blob',
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
      }
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if(res.data.type!="error"){
      

          var _url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }));
          window.open(_url, "_blank").focus(); // window.open + focus

        
          mostrarLoader(false);
        
        }else{
        
          mostrarLoader(false);
          
        }
        
      })
      .catch((error) => {
        mostrarLoader(false);
     
      });
  };



  export const ObtenerGrafico1 = (setData,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

 
  let url = ENTRYPOINT+"sales/last_months"
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
  export const printTicket = (id,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
   
 
    let url = ENTRYPOINT+"print_invoice/"+id;
    let setting = {
      method: "GET",

      url: url,
      responseType: 'blob',
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
      }
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if(res.data.type!="error"){
      

          var _url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }));
          window.open(_url, "_blank").focus(); // window.open + focus

        
          mostrarLoader(false);
        
        }else{
        
          mostrarLoader(false);
          
        }
        
      })
      .catch((error) => {
        mostrarLoader(false);
     
      });
  };
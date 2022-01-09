import { encriptarJson, desencriptarJson } from "../security";
import {ENTRYPOINT} from '../../config/API'
const axios = require("axios");
export const obtenerGestiones = (setData) => {

   
    let url = ENTRYPOINT+"gestiones";
    let setting = {
      method: "GET",
      url: url,
      headers: {
        Accept: "application/json"
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

  export const obtenerGestionesCitas = (gestion,setData) => {
   
   
    let url = ENTRYPOINT+"gestion_citas?id_gestion="+gestion;
    let setting = {
      method: "GET",
      url: url,
      headers: {
        Accept: "application/json"
      },
    };


    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
          console.log("DATA GESTION CITAS")
          setData(response.data);
        
         
        } else {
    
        }
      })
      .catch((error) => {

       
      });
  };

  export const obtenerGestionNombre = (gestion,setData) => {
   
   
    let url = ENTRYPOINT+"obtenerGestion?id_gestion_cita="+gestion;
    let setting = {
      method: "GET",
      url: url,
      headers: {
        Accept: "application/json"
      },
    };


    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
          setData({gestionCita:response.data.gestion_cita,gestion:response.data.gestion});
        
         
        } else {
    
        }
      })
      .catch((error) => {

       
      });
  };

  
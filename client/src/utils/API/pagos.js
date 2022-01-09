import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT} from '../../config/API'
const axios = require('axios');

export const obtenerLogs = (data,setTotal,setData,store) => {


  const {  mostrarLoader } = store;


  let url = "https://crm-api.ambiensa.info/api/v1/logs";
  let setting = {
    method: "GET",
    url: url,
    params:data,
    headers: { Accept: "application/json"},
  };

  mostrarLoader(true);

  axios(setting)
    .then((res) => {
      let response = res.data;

      setTotal(response.data.total)
     setData(response.data.data)
      let a =[]
     response.data.data.map((e)=>{

       if(e.endpoint=="rest_boton_de_pago/info_pago.php"&&e.method=="POST"&&e.status=="200"){

         let fech = new Date(Date.parse(e.date+"T11:22:33+0000"))
       
          a.push({...e})
       
      
       }
     })
     console.log(a)
     mostrarLoader(false);

    })
    .catch((error) => {
      mostrarLoader(false);

       
    });
};
export const obtenerTodos = (setData,initializer,inicio,final) => {

 
    let url = 'https://pagos.ambiensa.info/list.php?initial_date='+inicio+"&final_date="+final
    let setting = {
      method: "Get",
      url: url,
      headers: { 'Accept': 'application/json', }
  
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
  export const obtenerReserva = (dni,setData,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
 
    let url = ENTRYPOINT+'client/reserva?client_dni='+dni
    let setting = {
      method: "Get",
      url: url,

    headers: { Accept: "application/json",          Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
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

  
export const obtenerTodosNuevo = (setData,initializer,inicio,final) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = initializer;

 
    let url = 'https://cloud.abitmedia.com/api/payments/index?limit=99999&access-token=2y-13-ivhq6xvdajgssnxawlwrkuqcl031ol9rnqhqn0gcmw-ra3xfmrlemg-20oszjxprr8b6znkl2&status=Pagado&initial_date='+inicio+"&final_date="+final
    let setting = {
      method: "Get",
      url: url,

    headers: { Accept: "application/json",  },
    };
  
    mostrarLoader(true)
    axios(setting)
      .then((res) => {
        let response = res.data
       if(response.type!="error"){
        mostrarLoader(false)
          setData(response.data)
       
  
       }else{
        mostrarLoader(false)
       }
      })
      .catch((error) => {
       
        mostrarLoader(false)
  
      });
  }

  
  export const obtenerTotalProProyecto = (setData,initializer) => {

 
    let url = 'https://api.ambiensa.info/api/v1/reservations/get_by_proyect'
    let setting = {
      method: "Get",
      url: url,

    headers: { Accept: "application/json",  },
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

  export const importar = (data,setLoader,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
    var resp = new FormData()
    resp.append('excel-file', data.excelFile)
    
    let url = "https://api.ambiensa.info/api/v1/clients/import";
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
   

    setLoader(true)
    axios(setting)
      .then((res) => {
        let response = res.data
        if(res.data.type!="error"){
        
          setLoader(false)
          mostrarNotificacion({ type: "success", message:"Datos importados exitosamente, los cambios se verán reflejados en unos minutos." });
     
        }else{
        
          setLoader(false)
          mostrarNotificacion({ type: "error", message: response.message });
        }
        
      })
      .catch((error) => {
        setLoader(false)
        mostrarNotificacion({ type: "success", message:"Datos importados exitosamente, los cambios se verán reflejados en unos minutos." });
      });
  };
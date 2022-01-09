import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT,LARAVEL_SGI} from '../../config/API'
const axios = require('axios');
export const editar= (id,data, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
   
 
    let url = ENTRYPOINT+"clients/"+id;
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
export const eliminar = (id,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"clients/"+id;
    
    let setting = {
      method: "DELETE",
      url: url,
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
  export const registrarDesglose = (data,store,carga) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    
    let url = ENTRYPOINT+"splits";
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
          carga()
        } else {
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
          carga()
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
        mostrarNotificacion({ type: "error", message: error.message });
      });
  }
export const registrar = (data,store,carga) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    
    let url = ENTRYPOINT+"cash";
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
          carga()
        } else {
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
          carga()
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
        mostrarNotificacion({ type: "error", message: error.message });
      });
  }
  
  export const obtenerDesglose = (setData,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

 
  let url = ENTRYPOINT+"splits"
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json',
    Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

  };
  mostrarLoader(true)

  axios(setting)
    .then((res) => {
      let response = res.data
        if(response.type!="error"){
            setData(response.data)
        
            mostrarLoader(false)

        }else{
     
            mostrarLoader(false)

        }
    })
    .catch((error) => {
      
        mostrarLoader(false)

    });
}
export const obtenerDesglosePorId = (id,setData,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;


let url = ENTRYPOINT+"splits/"+id
let setting = {
  method: "Get",
  url: url,
  headers: { 'Accept': 'application/json',
  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

};
mostrarLoader(true)

axios(setting)
  .then((res) => {
    let response = res.data
      if(response.type!="error"){
          setData(response.data)
      
          mostrarLoader(false)

      }else{
   
          mostrarLoader(false)

      }
  })
  .catch((error) => {
    
      mostrarLoader(false)

  });
}
  export const obtenerHistoricoCajas = (setData,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

 
  let url = ENTRYPOINT+"cash"
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json',
    Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

  };
  mostrarLoader(true)

  axios(setting)
    .then((res) => {
      let response = res.data
        if(response.type!="error"){
            setData(response.data)
        
            mostrarLoader(false)
            mostrarNotificacion({ type: "success", message: response.message });

        }else{
            setData(response.abierta)
              mostrarNotificacion({ type: "error", message: response.message });
            mostrarLoader(false)

        }
    })
    .catch((error) => {
      
        mostrarLoader(false)

    });
}
export const estaAbiertaCaja = (setData,store,msg) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

 
  let url = ENTRYPOINT+"cash_is_open"
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json',
    Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

  };
  mostrarLoader(true)

  axios(setting)
    .then((res) => {
      let response = res.data
        if(response.type!="error"){
            setData(response.abierta)
        
            mostrarLoader(false)

        }else{
            setData(response.abierta)
            if(msg){
              mostrarNotificacion({ type: "error", message: response.message });

            }
            mostrarLoader(false)

        }
    })
    .catch((error) => {
        setData(0)
        mostrarLoader(false)

    });
}
export const obtenerSistemaEvaluaciones = (setLabels,setValues,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;


let url = ENTRYPOINT+"systems_evaluations"
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
      setLabels(response.data.system)
      setValues(response.data.count)


   }else{
   
   }
  })
  .catch((error) => {
   


  });
}

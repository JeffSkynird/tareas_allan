import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT,LARAVEL_SGI} from '../../config/API'
const axios = require('axios');
export const editarSistema = (id,data, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
   
 
    let url = ENTRYPOINT+"polls/"+id;
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
export const eliminarPool = (id,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"polls/"+id;
    
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
export const registrarSistema = (data,store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    
    let url = ENTRYPOINT+"polls";
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
export const obtenerTodos = (setData,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

 
  let url = ENTRYPOINT+"polls"
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
export const evaluar = (data,store,setIdPoll) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    
    let url = ENTRYPOINT+"polls";
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
         setIdPoll(response.id_poll)
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
  export const obtenerPool = (id,setData,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

 
  let url = ENTRYPOINT+"polls/"+id
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
export const obtenerPool2 = (id,setData,setData2,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;


let url = ENTRYPOINT+"polls/"+id
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
      setData2(response.data.answers)

   }else{
   
   }
  })
  .catch((error) => {
   


  });
}
export const obtenerPoolResult = (id,setData,setData2,setData3,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;


let url = ENTRYPOINT+"poll_result/"+id
let setting = {
  method: "Get",
  url: url,
  headers: { 'Accept': 'application/json',
 }

};


axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
     if(response.data.length!=0){
      setData3({
        poll:response.data.poll.name,
        poll_score:response.data.poll.score,
       description:response.data.poll.descripcion,
       system:response.data.system.name
     
      }
       )
    }
    
      setData(response.data.metric)
      setData2(response.data.score)
   

   }else{
   
   }
  })
  .catch((error) => {
   


  });
} 
export const obtenerFeatureResult = (data,setLabels,setValues,setData) => {

let url = ENTRYPOINT+"features_result"
let setting = {
  method: "Get",
  url: url,
  params:data,
  headers: { 'Accept': 'application/json',
 }

};


axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
    
      setData(response.data.data)
      setLabels(response.data.sub_caracteristica)
      setValues(response.data.score)

   }else{
   
   }
  })
  .catch((error) => {
   


  });
} 
export const obtenerPanelResult = (setData,setLabels,setValues,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  let url = ENTRYPOINT+"obtener_panel_result"
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json',    Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, 

   }
  
  };
  
  
  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
      setData(response.data)
        setLabels(response.data1.labels)
        setValues(response.data1.values)
  
     }else{
     
     }
    })
    .catch((error) => {
     
  
  
    });
  } 
  
  export const obtenerMetricasSistemas = (setData,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
    let url = ENTRYPOINT+"metrics_systems"
    let setting = {
      method: "Get",
      url: url,
      headers: { 'Accept': 'application/json',    Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, 
  
     }
    
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
    

    export const editarPoll = (id,data, store,carga) => {
      const { usuario, mostrarNotificacion, mostrarLoader } = store;
     
   
      let url = ENTRYPOINT+"polls/"+id;
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
           carga()
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
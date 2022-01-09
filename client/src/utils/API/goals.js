

import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT} from '../../config/API'
import {play} from '../sound'
const axios = require('axios');


export const guardarMetas = (data,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  
  let url = ENTRYPOINT+"guardarMetas"
  let setting = {
    method: "post",
data:data,
    body: data,
    url: url,
    headers: {
      Accept: "application/json",
    }
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
   
    });
};
export const exportarMetasExcel = (data,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  
  let url = ENTRYPOINT+"exportarMetasExcel"
  let setting = {
    method: "post",
data:data,
    body: data,
    url: url,
    responseType: 'blob',
    headers: {
      Accept: "application/json",
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
        link.setAttribute('download', 'reporte.xlsx'); //or any other extension
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
export const exportarMetas = (data,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  
  let url = ENTRYPOINT+"exportarMetas"
  let setting = {
    method: "post",
data:data,
    body: data,
    url: url,
    responseType: 'blob',
    headers: {
      Accept: "application/json",
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
        link.setAttribute('download', 'reporte.xlsx'); //or any other extension
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
export const obtenerMetasPorMes  = (data,cargarData,store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;


  let url = ENTRYPOINT+"obtenerMetasMensuales"
  let setting = {
    method: "POST",
    url: url,
    data: data,
    body: data,
    headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  }

  };
mostrarLoader(true)

  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
      cargarData(response)
      //mostrarNotificacion({ type: "success", message: response.message });

      mostrarLoader(false)

     }else{
      mostrarNotificacion({ type: "error", message: response.message });

      mostrarLoader(false)

     }
    })
    .catch((error) => {

      mostrarLoader(false)


    });
}


export const ObtenerKpisRendimientoS   = (data,cargarData,store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;


  let url = ENTRYPOINT+"getKpisRendimientoSupervisores"
  let setting = {
    method: "GET",
    url: url,
    params: data,
    body: data,
    headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
      cargarData(response)
     

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}
export const ObtenerKpisRendimiento   = (data,cargarData,store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;


  let url = ENTRYPOINT+"getKpisRendimiento"
  let setting = {
    method: "GET",
    url: url,
    params: data,
    body: data,
    headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
      cargarData(response)
     

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}

export const obtenerMetasPorSupervisor  = (data,cargarData,store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;


  let url = ENTRYPOINT+"obtenerMetasSupervisor"
  let setting = {
    method: "GET",
    url: url,
    params: data,
    body: data,
    headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
      cargarData(response)
     

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}
export const obtenerGoalsConfig  = (setData,store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;

 
    let url = ENTRYPOINT+"seller_goals"
    let setting = {
      method: "Get",
      url: url,
      headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  }
  
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

  export const obtenerKPISupervisor  = (data,setData,setGoal,setKpiSupervisorId,store) => {
    const { usuario, mostrarNotificacion, mostrarLoader,playSound } = store;
   
 
 
    let url = ENTRYPOINT+`kpi_supervisor/get`
    let setting = {
      method: "Get",
      url: url,
      headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  },
      params: data
    };
  
  
    axios(setting)
      .then((res) => {
        let response = res.data
       if(response.type!="error"){
      
      
        if(response.goal!=0){
          setGoal(response.goal)
        }
        setData(response.data)
        setKpiSupervisorId(response.kpi_supervisor_id)
        
       }else{
       
       }
      })
      .catch((error) => {
       
  
  
      });
  }
  export const obtenerGoalsPorFechaAsesorKpi  = (asesor,mes,año,store,setNumber) => {
    const { usuario, mostrarNotificacion, mostrarLoader,playSound } = store;
    let id_asesor=asesor
    if(JSON.parse(desencriptarJson(usuario)).user.type_user=="asessor"){
      id_asesor=JSON.parse(desencriptarJson(usuario)).user.user_ca
    }

 
    let url = ENTRYPOINT+"goals/get_by_date_asesor_kpi?asesor="+id_asesor+"&month="+mes+"&year="+año
    let setting = {
      method: "Get",
      url: url,
      headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  }
  
    };
  
  
    axios(setting)
      .then((res) => {
        let response = res.data
       if(response.type!="error"){
      
         let citasI = response.data.citas_inefectivas;
         let citasE = response.data.citas_efectivas;
         let callsE = response.data.llamadas_efectivas;
         let callsI = response.data.llamadas_inefectivas;
        console.log(response.data)
        
          setNumber({inEffectiveCitations:citasI,effectiveCitations:citasE,inEffectiveCalls:callsI,effectiveCalls:callsE})
       
         
       }else{
       
       }
      })
      .catch((error) => {
       
  
  
      });
  }
  export const obtenerGoalsPorFechaAsesor  = (asesor,mes,año,setData,store,setNumber) => {
    const { usuario, mostrarNotificacion, mostrarLoader,playSound } = store;
    let id_asesor=asesor
    if(JSON.parse(desencriptarJson(usuario)).user.type_user=="asessor"){
      id_asesor=JSON.parse(desencriptarJson(usuario)).user.user_ca
    }

 
    let url = ENTRYPOINT+"goals/get_by_date_asesor?asesor="+id_asesor+"&month="+mes+"&year="+año
    let setting = {
      method: "Get",
      url: url,
      headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  }
  
    };
  
  
    axios(setting)
      .then((res) => {
        let response = res.data
       if(response.type!="error"){
      
         let citasI = response.citas_inefectivas;
         let citasE = response.citas_efectivas;
         let callsE = response.calls_efectivas;
         let callsI = response.calls_inefectivas;

         let total= citasI.concat(citasE, callsE,callsI);
        
          setData(total)
          setNumber({inEffectiveCitations:citasI.length,effectiveCitations:citasE.length,inEffectiveCalls:callsI.length,effectiveCalls:callsE.length})
         if(citasI!=0||citasE!=0||callsE!=0||callsI!=0){
          play(playSound,'click2')
         }
         
       }else{
       
       }
      })
      .catch((error) => {
       
  
  
      });
  }
  export const obtenerPorId  = (id,setData,store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;

 
    let url = ENTRYPOINT+"citation/get_by_id?citation_id="+id
    let setting = {
      method: "Get",
      url: url,
      headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  }
  
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
 
  export const obtenerTodosPorAsesor  = (setData,store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;

 
    let url = ENTRYPOINT+"calls_by_asesor?asesor_id="+JSON.parse(desencriptarJson(usuario)).user.user_ca
    let setting = {
      method: "Get",
      url: url,
      headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  }
  
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
  export const editarGoalsConfig = (data, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    
    let url = ENTRYPOINT+"seller_goals/edit";
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
 
  export const generarPerformance = (data, setData,store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    
    let url = ENTRYPOINT+"kpi_supervisor/generate_by_performance";
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
          if(response.message!="No se han encontrado datos previos"){
            setData(response.data)
          }
      
          mostrarLoader(false);
          mostrarNotificacion({ type: response.type, message: response.message });
      
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
  
  export const obtenerGlobalGoals  = (data,setData,store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;

 
    let url = ENTRYPOINT+"goals/get_global_obtained"
    let setting = {
      method: "Get",
      url: url,
      headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  },
      params:data
    };
  
  
    axios(setting)
      .then((res) => {
        let response = res.data
       if(response.type!="error"){
      //    setData(response.data)
      let values=[]
      let labels=[]
      let obtained=[]
      
      response.data.map((e)=>{
        values.push(e.goal!=null?e.goal:0)
        obtained.push(e.obtained!=null?e.obtained:0)
       labels.push(e.name)
      })
      
      setData({goal:values,labels:labels,obtained:obtained})
  
       }else{
       
       }
      })
      .catch((error) => {
       
  
  
      });
  }
  export const generarGlobalPerformance = (data, setData,store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    
    let url = ENTRYPOINT+"kpi_supervisor/generate_by_supervisor";
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
         setData(response.data)
          mostrarLoader(false);
          mostrarNotificacion({ type: response.type, message: response.message });
      
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
  
  export const editarKPISupervisorGlobal = (data, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    
    let url = ENTRYPOINT+"kpi_supervisor/edit_global";
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
  export const editarKPISupervisor = (data, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    
    let url = ENTRYPOINT+"kpi_supervisor/edit";
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
  export const editarCitas = (data, store,cargarTodos) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    
    let url = ENTRYPOINT+"citation/editar";
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
          cargarTodos()
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

  export const eliminarCitation = (citation_id,store,cargarData) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"citation/delete";
    var raw = {
        citation_id:citation_id,
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
  
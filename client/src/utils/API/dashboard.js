import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT} from '../../config/API'
const axios = require('axios');



export const obtenerTareasEstado = (params,setData,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;


let url = ENTRYPOINT+"total_tasks"
let setting = {
  method: "Get",
  url: url,
  params,
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
export const obtenerUsuarioTareas = (params,setData,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;


let url = ENTRYPOINT+"user_tasks"
let setting = {
  method: "Get",
  url: url,
  params,
  headers: { 'Accept': 'application/json',
  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

};
mostrarLoader(true)

axios(setting)
  .then((res) => {
    let response = res.data
      if(response.type!="error"){
          setData(response.data
            )
      
          mostrarLoader(false)

      }else{
       
          mostrarLoader(false)

      }
  })
  .catch((error) => {
   
      mostrarLoader(false)

  });
}

export const obtenerEstadoTareas = (params,setData,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;


let url = ENTRYPOINT+"pending_tasks"
let setting = {
  method: "Get",
  params,
  url: url,
  headers: { 'Accept': 'application/json',
  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

};
mostrarLoader(true)

axios(setting)
  .then((res) => {
    let response = res.data
      if(response.type!="error"){
          setData({completas:response.data.completas,incompletas:response.data.incompletas}
            )
      
          mostrarLoader(false)

      }else{
       
          mostrarLoader(false)

      }
  })
  .catch((error) => {
   
      mostrarLoader(false)

  });
}


export const obtenerComprasYVentas = (setData,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;


let url = ENTRYPOINT+"sales_purchases"
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

export const obtenerVentasCaja = (setData,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;


let url = ENTRYPOINT+"sales_cash"
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
export const obtenerKpisPanel = (params,setData,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

let url = ENTRYPOINT+"kpis"
let setting = {
  method: "Get",
  url: url,
  params:params,
  headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,}

};

mostrarLoader(true);

axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
      setData(response.data)
      mostrarLoader(false);
      mostrarNotificacion({ type: "success", message: response.message });

   }else{
    mostrarNotificacion({ type: "error", message: response.message });
    mostrarLoader(false);
   }
  })
  .catch((error) => {
    mostrarLoader(false);


  });
}

export const obtenerStatusPorSupervisor = (supervisor,setData1,store,min,max) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

let supervisor_id = supervisor 
if(JSON.parse(desencriptarJson(usuario)).user.type_user == "supervisor"){
  supervisor_id = JSON.parse(desencriptarJson(usuario)).user.user_ca
}

let url = ENTRYPOINT+"clients/status_by_supervisor?supervisor_id="+supervisor_id+"&min="+min+"&max="+max
let setting = {
  method: "Get",
  url: url,
  headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,}

};


axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
      setData1({values:response.data,labels:response.types})
     

   }else{
   
   }
  })
  .catch((error) => {
   


  });
}
export const obtenerStatusPorAsesor = (asesor,setData1,store,min,max) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

let asesor_id = asesor 
if(JSON.parse(desencriptarJson(usuario)).user.type_user == "asessor"){
  asesor_id = JSON.parse(desencriptarJson(usuario)).user.user_ca
}

let url = ENTRYPOINT+"clients/status_by_asesor?asesor_id="+asesor_id+"&min="+min+"&max="+max
let setting = {
  method: "Get",
  url: url,
  headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,}

};


axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
      setData1({values:response.data,labels:response.types})
     

   }else{
   
   }
  })
  .catch((error) => {
   


  });
}
export const obtenerClientesPorPaso = (setData1,store,min,max) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

let url = ENTRYPOINT+"clients_by_step"+"?min="+min+"&max="+max
let setting = {
  method: "Get",
  url: url,
  headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,}

};


axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
      setData1({values:response.clients,labels:response.types})
     

   }else{
   
   }
  })
  .catch((error) => {
   


  });
}
export const obtenerKpis = (setData1,setData2,setData3,setData4,store,min,max) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
 
  let url = ENTRYPOINT+"kpis"+"?min="+min+"&max="+max
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,}

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
        setData1(response.leads)
        setData2(response.asessors)
        setData3(response.supervisors)
      //  setData4(response.leads)

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}
export const obtenerKpisA = (setData1,setData2,setData3,store,min,max) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
let query = ""
  if(JSON.parse(desencriptarJson(usuario)).user.type_user == "asessor"){
    query = "asesor_id="+JSON.parse(desencriptarJson(usuario)).user.user_ca
}else{
  query = "supervisor_id="+JSON.parse(desencriptarJson(usuario)).user.user_ca
}
let url = ENTRYPOINT+"kpis?min="+min+"&max="+max+"&"+query
let setting = {
  method: "Get",
  url: url,
  headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,}

};


axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
      setData1(response.leads)
      setData2(response.citas)
      setData3(response.calls)

   }else{
   console.log("error")
   }
  })
  .catch((error) => {
   


  });
}
export const obtenerKpisR = (setData1,store,asesor,min,max) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

  let id_asesor=JSON.parse(desencriptarJson(usuario)).user.user_ca
  if(asesor!=''){
    id_asesor = asesor
  }
let url = ENTRYPOINT+"kpis_performance?asesor_id="+id_asesor+"&min="+min+"&max="+max
let setting = {
  method: "Get",
  url: url,
  headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,}

};


axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
      setData1({citations1:response.citas,citations2:response.citas_efectivas,calls1:response.calls,calls2:response.calls_efectivas})
     
 

   }else{
   console.log("error")
   }
  })
  .catch((error) => {
   


  });
}

export const getFactibilidad = (setData,store,asesor_id,min,max) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
 
let url = ENTRYPOINT+'getFactibilidad?id_asesor='+asesor_id+"&min="+min+"&max="+max
let setting = {
  method: "Get",
  url: url,
  headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,}

};


axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
    let temp =response.data
    
   
     setData(temp)


      
      

   }else{
   
   }
  })
  .catch((error) => {
   


  });
}
export const obtenerEstadoProspectos = (setData,store,asesor_id,min,max) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  let id_asesor=JSON.parse(desencriptarJson(usuario)).user.user_ca
  if(asesor_id!=''){
    id_asesor = asesor_id
  }
let url = ENTRYPOINT+'client/get_purchase_status?asesor_id='+id_asesor+"&min="+min+"&max="+max
let setting = {
  method: "Get",
  url: url,
  headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,}

};


axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
    let temp =response.data
    let values = []
    let label = []
    temp.map((e)=>{
      values.push(e.count)
      if(e.estado_compra==0){
        label.push('Bajo (No esta decidido)')
      }else if(e.estado_compra==1){
        label.push('Medio (Va a comprar en un mes)')
        
      }else if(e.estado_compra==2){
        label.push('Alto (Va a comprar en 8 días)')
      }
      
    })
   
     setData({value:values,label:label})


      
      

   }else{
   
   }
  })
  .catch((error) => {
   


  });
}
export const obtenerGoalEffeectiveCitations = (setData,store,asesor,month,year) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
 /*  let id_asesor=JSON.parse(desencriptarJson(usuario)).user.user_ca
  if(asesor_id!=''){
    id_asesor = asesor_id
  } */

let url = ENTRYPOINT+'goals/get_effective_citations?asesor='+asesor+"&month="+month+"&year="+year
let setting = {
  method: "Get",
  url: url,
  headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,}

};


axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
   

     setData({total_performance:response.total_performance,obtained:response.obtained,goal:response.global_goal,performance:response.performance,label:response.categories})


      
      

   }else{
   
   }
  })
  .catch((error) => {
   


  });
}

export const obtenerMetasObtenidasPorSupervisor = (data,setData,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
 /*  let id_asesor=JSON.parse(desencriptarJson(usuario)).user.user_ca
  if(asesor_id!=''){
    id_asesor = asesor_id
  } */

let url = ENTRYPOINT+'goals/get_obtained_supervisor'
let setting = {
  method: "Get",
  url: url,
  headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,},
  params: data
};

mostrarLoader(true)
axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
   
let values=[]
let labels=[]
let obtained=[]

response.data.map((e)=>{
  values.push(e.goal!=null?e.goal:0)
  obtained.push(e.obtained!=null?e.obtained:0)
 labels.push(e.names.replace(/ .*/,'')+" "+e.last_names.replace(/ .*/,''))
})

setData({goal:values,labels:labels,obtained:obtained})
 

      
      
     mostrarLoader(false)

   }else{
    mostrarLoader(false)

   }
  })
  .catch((error) => {
    mostrarLoader(false)



  });
}
export const obtenerMetasPorAsesor = (data,setData,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
 /*  let id_asesor=JSON.parse(desencriptarJson(usuario)).user.user_ca
  if(asesor_id!=''){
    id_asesor = asesor_id
  } */

let url = ENTRYPOINT+'goals/get_by_asesor'
let setting = {
  method: "Get",
  url: url,
  headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,},
  params: data
};

mostrarLoader(true)
axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
   
let values=[]
let labels=[]

response.data.map((e)=>{
  values.push(e.goal)
  labels.push(e.names.replace(/ .*/,'')+" "+e.last_names.replace(/ .*/,''))
})
setData({values:values,labels:labels})
     //setData({total_performance:response.total_performance,obtained:response.obtained,goal:response.global_goal,performance:response.performance,label:response.categories})


      
      
     mostrarLoader(false)

   }else{
    mostrarLoader(false)

   }
  })
  .catch((error) => {
    mostrarLoader(false)



  });
}
export const obtenerMetasPorSupervisor = (data,setData,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
 /*  let id_asesor=JSON.parse(desencriptarJson(usuario)).user.user_ca
  if(asesor_id!=''){
    id_asesor = asesor_id
  } */

let url = ENTRYPOINT+'goals/get_by_supervisor'
let setting = {
  method: "Get",
  url: url,
  headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,},
  params: data
};

mostrarLoader(true)
axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
   
let values=[]
let labels=[]
let ids=[]
response.data.map((e)=>{
  ids.push(e.id)
  values.push(e.goal)
  labels.push(e.month.trim())
})
setData({ids:ids,values:values,labels:labels})
     //setData({total_performance:response.total_performance,obtained:response.obtained,goal:response.global_goal,performance:response.performance,label:response.categories})


      
      
     mostrarLoader(false)

   }else{
    mostrarLoader(false)

   }
  })
  .catch((error) => {
    mostrarLoader(false)



  });
}
export const obtenerCitasPorSemana = (setData1,setData2,store,asesor,min,max) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  let id_asesor=JSON.parse(desencriptarJson(usuario)).user.user_ca
  if(asesor!=''){
    id_asesor = asesor
  }
let url = ENTRYPOINT+"citations_by_week?asesor_id="+id_asesor+"&min="+min+"&max="+max
let setting = {
  method: "Get",
  url: url,
  headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,}

};


axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
 /*     console.log(JSON.stringify(response))
  
     let citas = response.citas
     let citas_efectivas = response.citas_efectivas
    let value1 = []
    let label1 = []

    let value2 = []
    let label2 = []

    citas.map((e)=>{
      label1.push(e.range)
      value1.push(e.count)
    })
    citas_efectivas.map((e)=>{
      label2.push(e.range)
      value2.push(e.count)
    })
 */
    // setData1({values:value1,labels:label1})
    // setData2({values:value2,labels:label2})

    setData1({data:response.citas,backup:response.citas})
    setData2({data:response.citas_efectivas,backup:response.citas_efectivas})

   }else{
   console.log("error")
   }
  })
  .catch((error) => {
    console.log(error)


  });
}
export const obtenerLlamadasPorSemana = (setData1,setData2,store,asesor,min,max) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  let id_asesor=JSON.parse(desencriptarJson(usuario)).user.user_ca
  if(asesor!=''){
    id_asesor = asesor
  }
let url = ENTRYPOINT+"calls_by_week?asesor_id="+id_asesor+"&min="+min+"&max="+max
let setting = {
  method: "Get",
  url: url,
  headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,}

};


axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
/*      console.log(response)
     let citas = response.calls
     let citas_efectivas = response.calls_efectivas
    let value1 = []
    let label1 = []

    let value2 = []
    let label2 = []

    citas.map((e)=>{
      label1.push(e.range)
      value1.push(e.count)
    })
    citas_efectivas.map((e)=>{
      label2.push(e.range)
      value2.push(e.count)
    })

     setData1({values:value1,labels:label1})
     setData2({values:value2,labels:label2}) */
     
     setData1({data:response.calls,backup:response.calls})
     setData2({data:response.calls_efectivas,backup:response.calls_efectivas})

   }else{
   console.log("error")
   }
  })
  .catch((error) => {
   


  });
}

export const obtenerClientesPorMes = (setData1,store,min,max) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  let query = ""
  if(JSON.parse(desencriptarJson(usuario)).user.type_user == "asessor"){
    query = "asesor_id="+JSON.parse(desencriptarJson(usuario)).user.user_ca
}else if(JSON.parse(desencriptarJson(usuario)).user.type_user == "supervisor"){
  query = "supervisor_id="+JSON.parse(desencriptarJson(usuario)).user.user_ca
}
let url = ENTRYPOINT+"clients_by_month"+"?min="+min+"&max="+max+"&"+query
let setting = {
  method: "Get",
  url: url,
  headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,}

};


axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
      setData1({data:response.clients,backup:response.clients})

   }else{
   
   }
  })
  .catch((error) => {
   


  });
}
export const obtenerCitasAsesores = (setData1,setData2,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
 
  let url = ENTRYPOINT+"cites_by_monthAll"
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,}

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
        setData1(response.clients)
        setData2(response.months)
       

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}
export const obtenerCitasPorMes = (setData1,setData2,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

let url = ENTRYPOINT+"cites_by_month?asesor_id="+JSON.parse(desencriptarJson(usuario)).user.user_ca
let setting = {
  method: "Get",
  url: url,
  headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,}

};


axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
      setData1(response.clients)
      setData2(response.months)
     

   }else{
   
   }
  })
  .catch((error) => {
   


  });
}


export const obtenerClientesPorTipo = (setData1,setData2,store,min,max) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
 
  let url = ENTRYPOINT+"clients_by_type"+"?min="+min+"&max="+max
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,}

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
        setData1(response.clients)
        setData2(response.types)
       

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}
export const obtenerAsesoresPorProduccion = (setData1,setData2,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
 
  let url = ENTRYPOINT+"assesors_by_production"
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,}

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
        setData1(response.assesors)
        setData2(response.productions)
       

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}
export const obtenerSupervisorProProduccion = (setData1,setData2,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

let url = ENTRYPOINT+"supervisors_by_production"
let setting = {
  method: "Get",
  url: url,
  headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,}

};


axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
      setData1(response.assesors)
      setData2(response.productions)
     

   }else{
   
   }
  })
  .catch((error) => {
   


  });
}


export const obtenerLeadsPorMes = (setData1,setData2,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  
let url = ENTRYPOINT+"assesors/leads_month?asesor_id="+JSON.parse(desencriptarJson(usuario)).user.user_ca
let setting = {
  method: "Get",
  url: url,
  headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,}

};


axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
      setData1(response.leads)
      setData2(response.months)
     

   }else{
   
   }
  })
  .catch((error) => {
   


  });
}
export const obtenerKpisAsesor = (setData4,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

let url = ENTRYPOINT+"assesors/pending_leads?asesor_id="+JSON.parse(desencriptarJson(usuario)).user.user_ca
let setting = {
  method: "Get",
  url: url,
  headers: { 'Accept': 'application/json',  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,}

};


axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
    setData4(response.leads)
     

   }else{
   
   }
  })
  .catch((error) => {
   


  });
}

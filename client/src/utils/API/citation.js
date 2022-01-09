import { encriptarJson, desencriptarJson } from '../security'
import { ENTRYPOINT } from '../../config/API'
const axios = require('axios');




export const obtenerFactibilidad = (setData, store, setIndicadores, tipo,id_asesor) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;


  let user_ca = id_asesor
  if (user_ca == "") {
    if(JSON.parse(desencriptarJson(usuario)).user.type_user=="asessor"){
      user_ca = JSON.parse(desencriptarJson(usuario)).user.user_ca

    }
  }


  let params = ""
  if (tipo.length != 0) {
    tipo.map((e) => {
      params += "&" + e.tipo + "=" + e.valor
    })
  }

  let url = ENTRYPOINT + "getTotalCitasLlamadas?id_asesor="+user_ca+""+ params
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

  };

  mostrarLoader(true)
  axios(setting)
    .then((res) => {
      let response = res.data
      mostrarLoader(false)

      let newArray = []
      let indicadores = [{nombre:"Citas","valor":response.total.citas},{nombre:"Llamadas","valor":response.total.llamadas}]
      response.values.map((e, i) => {

        newArray.push({ ...e, numero: (i + 1), nombres_completos: e.nombres + " " + e.apellidos, efectiva: e.efectiva, fecha: new Date(e.fecha).toLocaleString() })

      })
     
      setData(newArray)
      setIndicadores(indicadores)


    })
    .catch((error) => {

      mostrarLoader(false)

    });
}

export const obtenerIncidencias = (setData, store, setIndicadores, tipo) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;

  let params = ""
  if (tipo.length != 0) {
    tipo.map((e) => {
      params += "&" + e.tipo + "=" + e.valor
    })
  }

  let url = ENTRYPOINT + "getAllCitationsAndCalls?id_asesor=" + JSON.parse(desencriptarJson(usuario)).user.user_ca + " " + params
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

  };

  mostrarLoader(true)
  axios(setting)
    .then((res) => {
      let response = res.data
      mostrarLoader(false)

      let newArray = []
      let indicadores = [{nombre:"Citas","valor":response.total.citas},{nombre:"Llamadas","valor":response.total.llamadas}]
      response.values.map((e, i) => {

        newArray.push({ ...e, numero: (i + 1), nombres_completos: e.nombres + " " + e.apellidos, efectiva: e.efectiva, fecha: new Date(e.fecha).toLocaleString() })

      })
     
      setData(newArray)
      setIndicadores(indicadores)


    })
    .catch((error) => {

      mostrarLoader(false)

    });
}
export const obtenerTodosPorLead = (id, setData, store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;


  let url = ENTRYPOINT + "citation/get_by_lead?lead_id=" + id
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
      if (response.type != "error") {
        setData(response.data)


      } else {

      }
    })
    .catch((error) => {



    });
}

export const obtenerTodosPorCliente = (id, setData, store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;


  let url = ENTRYPOINT + "citation/get_by_client?client_id=" + id
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
      if (response.type != "error") {
        setData(response.data)


      } else {

      }
    })
    .catch((error) => {



    });
}

export const obtenerPorId = (id, setData, store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;


  let url = ENTRYPOINT + "citation/get_by_id?citation_id=" + id
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
      if (response.type != "error") {
        setData({...response.data,id_gestion:response.id_gestion})


      } else {

      }
    })
    .catch((error) => {



    });
}

export const obtenerTodosPorAsesor = (setData, store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;


  let url = ENTRYPOINT + "citation/get_by_asesor?asesor_id=" + JSON.parse(desencriptarJson(usuario)).user.user_ca
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
      if (response.type != "error") {
        setData(response.data)


      } else {

      }
    })
    .catch((error) => {



    });
}
export const obtenerTodosPorAsesorFiltro = (setData, store,filtro) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;


  let params = ""
  if (filtro.length != 0) {
    filtro.map((e) => {
      params += "&" + e.tipo + "=" + e.valor
    })
  }

  let url = ENTRYPOINT + "citation/get_by_asesor?asesor_id=" + JSON.parse(desencriptarJson(usuario)).user.user_ca+" "+params
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
      if (response.type != "error") {
        setData(response.data)


      } else {

      }
    })
    .catch((error) => {



    });
}
export const obtenerTodosPorAsesorId = (id, fecha, setData, store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;

  let user_ca = id
  if (user_ca == "") {
    user_ca = JSON.parse(desencriptarJson(usuario)).user.user_ca
  }
  let url = ENTRYPOINT + "citation/get_by_asesor?asesor_id=" + user_ca
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json', Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
      if (response.type != "error") {
        setData(response.data)
     /*    let mesA = fecha.getMonth() + 1
        let anioA = fecha.getFullYear()
        let dataN = []
        response.data.map((e) => {
          let fechaC = new Date(e.fecha);
          if (anioA == fechaC.getFullYear()) {
            if (mesA == fechaC.getMonth() + 1) {
              dataN.push({ ...e })
            }

          }
        })
        setData(dataN) */
      } else {

      }
    })
    .catch((error) => {



    });
}
export const registrarCitas = (data, store, cargarTodos) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;

 
  let url = ENTRYPOINT + "citation/register";
  let setting = {
    method: "POST",
    url: url,
    data: data,
    body: data,
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
export const guardarCitasLlamadas = (data, store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;

  let url = ENTRYPOINT + "saveCitationsAndCalls";
  let setting = {
    method: "POST",
    url: url,
    data: data,
    body: data,
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
        console.log(response)
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



export const reagendarCita = (data) => {
  let url = ENTRYPOINT + "reagendarCita";
  let setting = {
    method: "POST",
    url: url,
    data: data,
    body: data,
    headers: {
      Accept: "application/json",
    },
  };


  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        console.log(response)
      } else {
      }
    })
    .catch((error) => {
    
    });
}

export const editarCitas = (data, store, cargarTodos) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;

  let url = ENTRYPOINT + "citation/editar";
  let setting = {
    method: "POST",
    url: url,
    data: data,
    body: data,
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

export const eliminarCitation = (citation_id, store, cargarData) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

  let url = ENTRYPOINT + "citation/delete";
  var raw = {
    citation_id: citation_id,
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
      if (res.data.type != "error") {

        mostrarLoader(false);
        mostrarNotificacion({ type: "success", message: response.message });
        cargarData()
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

import React, { useReducer } from "react";
import Initializer from "./Initializer";
import Reducer from "./reducer/Reducer";
import Propager from "./Propager";
import {
  CARGAR_USUARIO,
  LOGOUT,MOSTRAR_NOTIFICACION,MOSTRAR_LOADER,PLAY_SOUND
} from "./actions/Actions";
const Store = (props) => {

  const initialState = {
    usuario: null,notificacion:null,loader:false,sound:null
  };
  const [state, dispatch] = useReducer(Reducer, initialState);

  //FUNCIONES
  const cargarUsuario = (usuario) => {
    dispatch({
      type: CARGAR_USUARIO,
      payload: usuario,
    });
  };
  const mostrarNotificacion = (data) => {
    dispatch({
      type: MOSTRAR_NOTIFICACION,
      payload: data,
    });
  };
  const mostrarLoader = (data) => {
    dispatch({
      type: MOSTRAR_LOADER,
      payload: data,
    });
  };
  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };
  const playSound = (data) => {
    dispatch({
      type: PLAY_SOUND,
      payload: data,
    });
  };
  return (
    <Initializer.Provider
      value={{
        sound:state.sound,
        playSound,
        usuario: state.usuario,
        notificacion: state.notificacion,
        mostrarNotificacion,
        loader: state.loader,
        mostrarLoader,
        cargarUsuario,
        logout,

      }}
    >
     <Propager >{props.children}</Propager>
    </Initializer.Provider>
  );
};
export default Store;

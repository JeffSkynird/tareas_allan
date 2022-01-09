import {
    CARGAR_USUARIO,
    LOGOUT,MOSTRAR_NOTIFICACION,MOSTRAR_LOADER,PLAY_SOUND
  } from "../actions/Actions";
  
  export default (state, action) => {
    switch (action.type) {
        case CARGAR_USUARIO:
            return { ...state, usuario: action.payload };
        case LOGOUT:
            return { ...state, usuario: null,};
        case MOSTRAR_NOTIFICACION:
            return { ...state, notificacion: action.payload ,};
            case PLAY_SOUND:
                return { ...state, sound: action.payload ,};
                
        case MOSTRAR_LOADER:
            return { ...state, loader: action.payload ,};
            
        default:
            return state;
    }
  };
  
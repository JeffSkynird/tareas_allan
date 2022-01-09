import React,{useContext,useState} from 'react'
import Initializer from '../store/Initializer'
import { obtenerRol } from '../utils/API/usuarios';
import { desencriptarJson } from '../utils/security';

export default function Redirect(props) {
    const initializer = useContext(Initializer);
    const [rol, setRol] = useState("")
    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerRol(JSON.parse(desencriptarJson  (initializer.usuario)).user.id, setRol, initializer);

        }
    }, [initializer.usuario])
    React.useEffect(() => {
        if(rol!=""){
            if (rol == "Gerente") {
                props.history.push('/panel')
            }else{
                props.history.push('/control')
            }
        }
       
    }, [rol])
    return (
        <div>
            Redireccionando...
        </div>
    )
}

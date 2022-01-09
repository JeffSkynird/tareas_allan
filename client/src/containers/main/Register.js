import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { registrar } from '../../utils/API/auth';
import Initializer from '../../store/Initializer'
export default function Iniciar(props) {
    const initializer = React.useContext(Initializer);

    const [nombre,setNombre]=React.useState("")
    const [apellido,setApellido]=React.useState("")

    const [correo,setCorreo]=React.useState("")
    const [clave,setClave]=React.useState("")
    const entrar=()=>{
        registrar({names:nombre,last_names:apellido,email:correo,password:clave},props.setTab,initializer)
    }
    return (
        <form className={props.classes.form} noValidate>
               <TextField
            variant="outlined"
            style={{marginBottom:10,marginTop:10}}
            required
            style={{marginBottom:10}}
            id="email"
            size="small"
            label="Nombres"
            name="email"
            value={nombre}
            onChange={(e)=>setNombre(e.target.value)}
            
        />
           <TextField
            variant="outlined"
         
            required
            style={{marginBottom:10}}
            size="small"
            id="email"
            label="Apellidos"
            name="email"
            value={apellido}
            onChange={(e)=>setApellido(e.target.value)}
          
        />
        <TextField
            variant="outlined"
            style={{marginBottom:10}}
            size="small"
            required

            id="email"
            label="Correo electrónico"
            name="email"
            value={correo}
            onChange={(e)=>setCorreo(e.target.value)}
        />
        <TextField
            variant="outlined"
          
            size="small"
            required
            value={clave}
            onChange={(e)=>setClave(e.target.value)}
            name="password"
            label="Contraseña"
            type="password"
            id="password"
     
        />

        <Button

            variant="contained"
            color="primary"
            onClick={entrar}
            className={props.classes.submit}
        >
            Registrate ahora
        </Button>

    </form>

    )
}

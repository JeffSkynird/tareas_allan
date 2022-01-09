import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Initializer from '../../../../store/Initializer'
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Slide from '@material-ui/core/Slide';
import { Avatar, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select } from '@material-ui/core';
import { editar as editarBodega, registrar as registrarBodega } from '../../../../utils/API/usuarios';
import { obtenerTodos as obtenerZonas } from '../../../../utils/API/zones';
import { Autocomplete } from '@material-ui/lab';
import { obtenerRolUsuario, obtenerTodos } from '../../../../utils/API/roles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);

    const [nombre, setNombre] = React.useState("")
    const [documento, setDocumento] = React.useState("")
    const [direccion, setDireccion] = React.useState("")
    const [celular, setCelular] = React.useState("")
    const [correo, setCorreo] = React.useState("")
    const [telefono, setTelefono] = React.useState("")
    const [jpcode, setJpcode] = React.useState("")
    const [supplierCode, setSupplirCode] = React.useState("")
    const [serie, setSerie] = React.useState("")
    const [zone, setZone] = React.useState("")
    const [zoneData, setZoneData] = React.useState([])
    const [image, setImage] = React.useState("")

    const [stock, setStock] = React.useState("")
    const [clave, setClave] = React.useState("")
    const [apellidos, setApellidos] = React.useState("")
    const [roles, setRoles] = React.useState([])
    const [rol, setRol] = React.useState("")

    const [descripcion, setDescripcion] = React.useState("")
    React.useEffect(() => {
        if (initializer.usuario != null) {
        obtenerTodos(setRoles, initializer)
        }
  
}, [initializer.usuario])
    React.useEffect(()=>{
        if(props.sistema!=null){
            setNombre(props.sistema.names)
            setApellidos(props.sistema.last_names)
            setDocumento(props.sistema.dni)
            setRol(props.sistema.rol_id)
            setCorreo(props.sistema.email)
     

        }
    },[props.sistema])
    const guardar=()=>{
        if(validar(documento)==false){
            initializer.mostrarNotificacion({ type: "error", message: 'Cédula inválida' });
            return;
        }
        if(validarCorreo(correo)==false){
            initializer.mostrarNotificacion({ type: "error", message: 'Correo inválido' });
            return;
        }
        let data={ 
        'names': nombre,
        'last_names':apellidos,
        'dni': documento,
        'email': correo,
        'password':clave,
        'rol_id':rol
   }
        if(props.sistema==null){
            registrarBodega(data,initializer,limpiar)
            
        }else{
            editarBodega(props.sistema.id,data,initializer,limpiar)

        }
        props.setOpen(false)
      
    }
    const limpiar=()=>{
        setNombre("")
        setDocumento("")
        setClave("")
        setDireccion("")
        setApellidos("")
        setRol("")
        setCelular("")
        setCorreo("")
        setTelefono("")
        props.setSelected(null)
        props.carga()
    }
    const getName = (id) => {
        let object = null
        zoneData.map((e) => {
            if (id == e.id) {
                object = { ...e }
            }
        })
        return object
    }
    function validarCorreo(valor) {
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)){
            return true;
        } else {
         return false;
        }
      }
 
    function validar(cedula) {
        var cad = cedula
        var total = 0;
        var longitud = cad.length;
        var longcheck = longitud - 1;

        if (cad !== "" && longitud === 10){
          for(let i = 0; i < longcheck; i++){
            if (i%2 === 0) {
              var aux = cad.charAt(i) * 2;
              if (aux > 9) aux -= 9;
              total += aux;
            } else {
              total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
            }
          }

          total = total % 10 ? 10 - total % 10 : 0;

          if (cad.charAt(longitud-1) == total) {
           return true;
          }else{
          return false;
          }
        }
      }

    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {
                props.setOpen(false)
                limpiar()
            }}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Personal</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                   {props.sistema!=null?"Formulario de edición de usuarios": "Formulario de creación de usuarios"}
                </DialogContentText>
            
                <Grid container spacing={2}>
            
    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width:'100%' }}
                      
                        label="Cédula/RUC"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}

                    /></Grid>
                  
                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width:'100%' }}
                      
                        label="Nombres "
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}

                    /></Grid>
                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width:'100%' }}
                      
                        label="Apellidos "
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}

                    /></Grid>
                   <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width:'100%' }}
                      
                        label="Correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}

                    /></Grid>
    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width:'100%' }}
                        type="password"
                        label="Clave"
                        value={clave}
                        onChange={(e) => setClave(e.target.value)}

                    /></Grid>
                    <Grid item xs={12}> 
                    <FormControl style={{width:'100%'}} variant="outlined" >
        <InputLabel id="demo-simple-select-filled-label">Rol</InputLabel>
        <Select
        
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={rol}
          onChange={(e)=>setRol(e.target.value)}
          label="Rol"
        >
          <MenuItem value="">
            <em>Seleccione una opción</em>
          </MenuItem>
            {
                roles.map((e)=>(
                        <MenuItem value={e.id}>{e.name}</MenuItem>
                ))
            }
        </Select>
      </FormControl>
      
      </Grid>

                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                 limpiar()
                 props.setOpen(false)
                }} color="default">
                    Cancelar
                </Button>
                <Button color="primary" onClick={guardar}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

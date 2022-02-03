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
import { Avatar, Chip, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select } from '@material-ui/core';
import { editar as editarBodega, registrar as registrarBodega } from '../../../../utils/API/usuarios';
import { obtenerTodos as obtenerZonas } from '../../../../utils/API/zones';
import { Autocomplete } from '@material-ui/lab';
import { crear, editar, obtenerPermisos, obtenerPermisosPorRol, obtenerRolUsuario  } from '../../../../utils/API/roles';
import { obtenerTodos } from '../../../../utils/API/permisos';

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
    const [permisos, setPermisos] = React.useState([])

    const [descripcion, setDescripcion] = React.useState("")
    React.useEffect(() => {
        if (initializer.usuario != null) {
        obtenerTodos(setRoles, initializer)
        }
  
}, [initializer.usuario])
    React.useEffect(()=>{
        if(props.sistema!=null){
            setNombre(props.sistema.name)
            obtenerPermisosPorRol(props.sistema.id,setPermisos,initializer)

        }
    },[props.sistema])
    const guardar=()=>{
      
        let data={ 
        'nombre': nombre,
        'permisos': permisos
   }
        if(props.sistema==null){
            crear(data,initializer,limpiar)
            
        }else{
            editar(props.sistema.id,data,initializer,limpiar)

        }
        props.setOpen(false)
      
    }
    const limpiar=()=>{
        setNombre("")
        setDocumento("")
        setPermisos([])
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
      const existeDato=(id)=>{
        let existe=false
        permisos.map((e)=>{
            if(e.id==id){
                existe=true
            }
        })
        return existe
      }
      const adicionarPermiso=(permiso)=>{
        let permisosAux=permisos.slice()
        let pr = buscarPermiso(permiso)
     
        
        if(pr!=null){
               //si existe el permiso en permisosAux no lo agrega
               if(!existeDato(pr.id)){
                if((permisosAux.indexOf(pr)==-1)){
                    permisosAux.push(pr)
                    setPermisos(permisosAux)
                    setRol(permiso.id)
                }
               }
        }
     


    
     
      }
      const quitar=(permiso)=>{
        setRol("")
        let permisosAux=permisos.slice()
        permisosAux.splice(permisosAux.indexOf(permiso),1)  
        setPermisos(permisosAux)
        }

        const buscarPermiso=(permiso)=>{
            let permisosAux=roles
            let encontrado=null
            permisosAux.map((e)=>{
                if(e.id==permiso){
                    encontrado=e
                }
            })
            return encontrado
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
            <DialogTitle id="alert-dialog-slide-title">Roles</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                   {props.sistema!=null?"Formulario de edición de roles": "Formulario de creación de roles"}
                </DialogContentText>
            
                <Grid container spacing={2}>
            
                <Grid item xs={12}>  
                  
                   <TextField
                        variant="outlined"
                        style={{ width:'100%' }}
                      
                        label="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}

                    /></Grid>
                  
                    <Grid item xs={12}> 
                    <FormControl style={{width:'100%'}} variant="outlined" >
        <InputLabel id="demo-simple-select-filled-label">Agregar permisos</InputLabel>
        <Select
        
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={rol}
          onChange={(e)=>adicionarPermiso(e.target.value)}
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
      <Grid item xs={12}>  
            {
                permisos.map((e)=>(
                    <Chip label={e.name} style={{marginRight:5}} onClick={()=>quitar(e)} />
                ))
            }
 
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

import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Initializer from '../../../../store/Initializer'
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Slide from '@material-ui/core/Slide';
import { Avatar, Chip, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, Slider } from '@material-ui/core';
import { obtenerTodos, } from '../../../../utils/API/usuarios';
import { Autocomplete } from '@material-ui/lab';
import { editar, obtenerUsuariosTarea, registrar } from '../../../../utils/API/tareas';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);

    const [nombre, setNombre] = React.useState("")
    const [asignado, setAsignado] = React.useState("")
    const [users, setUsers] = React.useState([])
    const [observacion, setObservacion] = React.useState("")
    const [asignados, setAsignados] = React.useState([])

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setUsers, initializer)
        }

    }, [initializer.usuario])
   
    React.useEffect(() => {
        if (props.sistema != null) {
            setNombre(props.sistema.name)
            setAsignado(props.sistema.asigned_to)
            setObservacion(props.sistema.observacion)
            buscarUsuarios(props.sistema.id)
        }
    }, [props.sistema])
    const buscarUsuarios= (e) => {
        obtenerUsuariosTarea(e,setAsignados,initializer)
    }
    const guardar = () => {
        let data = {
            'task': {
                'name': nombre
            },
            'asigned_to': asignados
        }
        if (props.sistema == null) {
            registrar(data, initializer, limpiar)

        } else {
            editar(props.sistema.id, data, initializer, limpiar)

        }
        props.setOpen(false)

    }
    const limpiar = () => {
        setNombre("")
        setAsignado("")
        setAsignados([])
        props.setSelected(null)
        props.carga()
    }
    const existeDato=(id)=>{
        let existe=false
        asignados.map((e)=>{
            if(e.id==id){
                existe=true
            }
        })
        return existe
      }
    const adicionarPermiso=(permiso)=>{
        let permisosAux=asignados.slice()
        let pr = buscarPermiso(permiso)
     
        
        if(pr!=null){
               //si existe el permiso en permisosAux no lo agrega
               if(!existeDato(pr.id)){
                if((permisosAux.indexOf(pr)==-1)){
                    permisosAux.push(pr)
                    setAsignados(permisosAux)
                    setAsignado(permiso.id)
                }
               }
        }
     


    
     
      }
      const quitar=(permiso)=>{
        setAsignado("")
        let permisosAux=asignados.slice()
        permisosAux.splice(permisosAux.indexOf(permiso),1)  
        setAsignados(permisosAux)
        }

        const buscarPermiso=(permiso)=>{
            let permisosAux=users
            let encontrado=null
            permisosAux.map((e)=>{
                if(e.id==permiso){
                    encontrado=e
                }
            })
            return encontrado
        }
        const obtenerValor=(id)=>{

          
                return id.percent
           
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
            <DialogTitle id="alert-dialog-slide-title">Tarea</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {props.sistema != null ? "Formulario de edición de tareas" : "Formulario de creación de tareas"}
                </DialogContentText>

                <Grid container spacing={2}>

                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width: '100%' }}

                        label="Nombres "
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}

                    /></Grid>
                    <Grid item xs={12}>
                        <FormControl style={{ width: '100%' }} variant="outlined" >
                            <InputLabel id="demo-simple-select-filled-label">Asignar a</InputLabel>
                            <Select

                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={asignado}
                           //     onChange={(e) => setAsignado(e.target.value)}
                                onChange={(e)=>adicionarPermiso(e.target.value)}
                                label="Usuario"
                            >
                                <MenuItem value="">
                                    <em>Seleccione una opción</em>
                                </MenuItem>
                                {
                                    users.map((e) => (
                                        <MenuItem value={e.id}>{e.names + " " + e.last_names}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item xs={12}>
                        {
                            asignados.map((e) => (
                                <Chip label={e.names + " " + e.last_names} style={{ marginRight: 5 }} onClick={() => quitar(e)} />
                            ))
                        }

                    </Grid>

                    {
                        props.sistema != null && (
                            <Grid item xs={12} md={12}>
                                <TextField
                                    style={{ width: '100%' }}
                                    variant="outlined"
                                
                                    label="Observación"
                                    value={observacion}
                                />
                            </Grid>
                        )
                    }
                    {
                        props.sistema != null && (
                            <Grid item xs={12} md={12}>
                                <TextField

                                    style={{ width: '100%' }}
                                    variant="outlined"
                                    
                                    label="Porcentaje total"
                                    value={props.sistema.percent}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    }}
                                />
                            </Grid>

                        )
                    }
                     <Grid item xs={12}>
                        {
                            asignados.map((e) => (
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12}>
                                    <span>{e.names+" "+e.last_names} ({e.percent}%)</span>
                                    </Grid>
                                    <Grid item>
                                        <CheckCircleOutlineIcon color="primary" />
                                    </Grid>
                                    <Grid item xs>
                                        <Slider
                                            value={typeof e.percent === 'number' ? obtenerValor(e) : 0}
                                       
                                           
                                            valueLabelDisplay="auto"
                                            marks={
                                                [
                                                    {
                                                        value: 0,
                                                        label: '0%',
                                                    },
                                                    {
                                                        value: 100,
                                                        label: '100%',
                                                    }]

                                            }
                                            aria-labelledby="input-slider"
                                        />
                                    </Grid>

                                </Grid>

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

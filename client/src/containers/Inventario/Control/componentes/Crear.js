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
import { Avatar, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, FormControlLabel, Checkbox, Slider, Input } from '@material-ui/core';
import { obtenerTodos, } from '../../../../utils/API/usuarios';
import { Autocomplete } from '@material-ui/lab';
import { editar, obtenerUsuariosTarea, registrar } from '../../../../utils/API/tareas';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { desencriptarJson } from '../../../../utils/security';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);
    const [users, setUsers] = React.useState([])
    const [completada, setCompletada] = React.useState(false)
    const [observacion, setObservacion] = React.useState("")
    const [value, setValue] = React.useState(0)
    const [asignados, setAsignados] = React.useState([])
    const [auth,setAuth]= React.useState(0)
    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setUsers, initializer)
            setAuth(JSON.parse(desencriptarJson(initializer.usuario)).user.id)
        }

    }, [initializer.usuario])
    const buscarUsuarios = (e) => {
        obtenerUsuariosTarea(e, setAsignados, initializer)
    }
    React.useEffect(() => {
        if (props.sistema != null) {
            setObservacion(props.sistema.observacion)
            setCompletada(props.sistema.is_complete == 1 ? true : false)
            //setValue(props.sistema.percent)
            buscarUsuarios(props.sistema.id)

        }
    }, [props.sistema])
    const guardar = () => {
        let data = {
            'task':{
                'observacion': observacion,
            },
            'value_user': value
        }

        editar(props.sistema.id, data, initializer, limpiar)
        props.setOpen(false)

    }
    const limpiar = () => {
        setCompletada(false)
        setObservacion("")
        setValue(0)
        props.setSelected(null)
        props.carga()
    }
    const handleSliderChange = (newValue,id) => {
       
        if(id==auth){
            setValue(newValue)

        }
     
    };
    const existe=(id)=>{
        let temp=value.slice()
        let existe=false
        temp.forEach(element => {
            if(element.id==id){
                existe=true
            }
        });
        return existe
    }

    const obtenerValor=(id)=>{

        if(id.id==auth){
            if(value==0){
                return id.percent
            }else{
                return value
            }
      
        }else{
            return id.percent
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
            <DialogTitle id="alert-dialog-slide-title">Tarea</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {props.sistema != null ? "Formulario de edición de tareas" : "Formulario de creación de tareas"}
                </DialogContentText>

                <Grid container spacing={2}>


                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width: '100%' }}

                        label="Observacion "
                        value={observacion}
                        onChange={(e) => setObservacion(e.target.value)}

                    /></Grid>
                  {/*   <Grid item xs={12}>
                        <FormControlLabel
                            label="Completada"
                            control={
                                <Checkbox
                                    value=""
                                    checked={completada}
                                    onChange={() => {
                                        setCompletada(!completada)
                                        if ((!completada) == true) {
                                            setValue(100)
                                        } else {
                                            setValue(0)
                                        }

                                    }
                                    }
                                    color="primary"
                                />
                            }
                        />
                    </Grid> */}
                    <Grid item xs={12}>
                        {
                            asignados.map((e) => (
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12}>
                                    <span>{e.names+" "+e.last_names}</span>
                                    </Grid>
                                    <Grid item>
                                        <CheckCircleOutlineIcon color="primary" />
                                    </Grid>
                                    <Grid item xs>
                                        <Slider
                                            value={typeof value === 'number' ? obtenerValor(e) : 0}
                                            onChange={(ea,n)=>handleSliderChange(n,e.id)}
                                           
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

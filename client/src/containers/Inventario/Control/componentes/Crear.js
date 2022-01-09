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
import { Avatar, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, FormControlLabel, Checkbox } from '@material-ui/core';
import { obtenerTodos,  } from '../../../../utils/API/usuarios';
import { Autocomplete } from '@material-ui/lab';
import { editar, registrar } from '../../../../utils/API/tareas';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);
    const [users, setUsers] = React.useState([])
    const [completada, setCompletada] = React.useState(false)
    const [observacion, setObservacion] = React.useState("")

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setUsers, initializer)
        }

    }, [initializer.usuario])
    React.useEffect(() => {
        if (props.sistema != null) {
            setObservacion(props.sistema.observacion)
            setCompletada(props.sistema.is_complete==1?true:false)

        }
    }, [props.sistema])
    const guardar = () => {
        let data = {
            'observacion': observacion,
            'is_complete': completada,
        }
 
            editar(props.sistema.id, data, initializer, limpiar)
        props.setOpen(false)

    }
    const limpiar = () => {
        setCompletada(false)
    setObservacion("")
        props.setSelected(null)
        props.carga()
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
                    <Grid item xs={12}>
                        <FormControlLabel
                          label="Completada"
                          control={
                            <Checkbox
                              value=""
                              checked={completada}
                              onChange={()=>setCompletada(!completada)}
                              color="primary"
                            />
                          }
                        />
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

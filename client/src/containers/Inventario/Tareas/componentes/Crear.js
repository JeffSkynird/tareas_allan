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
import { obtenerTodos, } from '../../../../utils/API/usuarios';
import { Autocomplete } from '@material-ui/lab';
import { editar, registrar } from '../../../../utils/API/tareas';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);

    const [nombre, setNombre] = React.useState("")
    const [asignado, setAsignado] = React.useState("")
    const [users, setUsers] = React.useState([])
    const [observacion, setObservacion] = React.useState("")

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setUsers, initializer)
        }

    }, [initializer.usuario])
    React.useEffect(() => {
        if (props.sistema != null) {
            setNombre(props.sistema.name)
            setAsignado(props.sistema.user_id)
            setObservacion(props.sistema.observacion)

        }
    }, [props.sistema])
    const guardar = () => {
        let data = {
            'name': nombre,
            'asigned_to': asignado
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
                                onChange={(e) => setAsignado(e.target.value)}
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
                    {
                        props.sistema != null && (
                            <Grid item xs={12} md={12}>
                                <TextField
                                    style={{ width: '100%' }}
                                    variant="filled"

                                    label="Observación"
                                    value={observacion}
                                />
                            </Grid>
                        )
                    }

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

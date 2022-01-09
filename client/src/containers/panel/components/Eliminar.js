import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Initializer from '../../../store/Initializer'

import Slide from '@material-ui/core/Slide';
import { Grid } from '@material-ui/core';
import { eliminarSistema, registrarSistema } from '../../../utils/API/sistemas';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);
    const guardar=()=>{
        eliminarSistema(props.sistema.id,initializer)
        props.setOpen(false)
        props.carga()
    }
    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => props.setOpen(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Sistemas</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    ¿Está seguro que desea eliminar el registro?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpen(false)} color="default">
                    Cancelar
                </Button>
                <Button color="primary" onClick={guardar}>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

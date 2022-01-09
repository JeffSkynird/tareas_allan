import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import Slide from '@material-ui/core/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const guardar=()=>{
        props.accion()
        props.setOpen(false)
    }
    return (
        <Dialog
            open={props.open}
            fullWidth={props.ancho}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => props.setOpen(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Confirmación</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {props.titulo}
                </DialogContentText>
                {props.body}
            </DialogContent>
            <DialogActions>
                {
                    props.hasOwnProperty('customAction')&&(
                        props.customAction
                    )
                }
                <Button onClick={() => props.setOpen(false)} color="default">
                    Cancelar
                </Button>
                <Button color="primary" onClick={guardar}>
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

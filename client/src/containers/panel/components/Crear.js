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
import { editarSistema, registrarSistema } from '../../../utils/API/sistemas';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);

    const [nombre, setNombre] = React.useState("")
    const [url, setUrl] = React.useState("")
    const [descripcion, setDescripcion] = React.useState("")
    React.useEffect(()=>{
        if(props.sistema!=null){
            setNombre(props.sistema.name)
            setUrl(props.sistema.url)
            setDescripcion(props.sistema.description)
        }
    },[props.sistema])
    const guardar=()=>{
        if(props.sistema==null){
            registrarSistema({name:nombre,url:url,description:descripcion},initializer)
            limpiar()
        }else{
            editarSistema(props.sistema.id,{name:nombre,url:url,description:descripcion},initializer)
            limpiar()

        }
        props.setOpen(false)
        props.carga()
    }
    const limpiar=()=>{
        setNombre("")
        setUrl("")
        setDescripcion("")
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
            <DialogTitle id="alert-dialog-slide-title">Sistemas</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                   {props.sistema!=null?"Formulario de edición de sistema": "Formulario de creación de sistema"}
                </DialogContentText>
                <Grid container>
                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ marginBottom: 10,width:'100%' }}
                        size="small"
                        label="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}

                    /></Grid>
                    <Grid item xs={12}>   <TextField
                        variant="outlined"
                        style={{ marginBottom: 10,width:'100%' }}
                        size="small"
                        label="Url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}

                    /></Grid>
                    <Grid item xs={12}>  <TextField
                        variant="outlined"

                        style={{ marginBottom: 10,width:'100%' }}
                   
                        label="Descripción"

                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}

                    /></Grid>



                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpen(false)} color="default">
                    Cancelar
                </Button>
                <Button color="primary" onClick={guardar}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

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
import { Avatar, Grid, IconButton, InputAdornment } from '@material-ui/core';
import { editarSistema, registrarSistema } from '../../../../utils/API/sistemas';
import { obtenerTodos as obtenerUnidades } from '../../../../utils/API/unidades';
import { Autocomplete } from '@material-ui/lab';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);

    const [unity, setUnity] = React.useState("")
    const [unityData, setUnityData] = React.useState([])

    const getName=()=>{

    }
 
    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {
                props.setOpen(false)
            }}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Filtrar productos</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                Puede seleccionar filtros anidados
                </DialogContentText>
            
                <Grid container spacing={1}>
               
                   
                     <Grid item xs={12} md={12} >
                        <Autocomplete
                             size="small"
                            style={{ width: '100%'}}
                                options={unityData}
                                value={getName(unity)}
                                getOptionLabel={(option) => option.name}
                                onChange={(event, value) => {
                                    if (value != null) {

                                        setUnity(value.id)
                                    } else {

                                        setUnity('')

                                    }

                                }} // prints the selected value
                                renderInput={params => (
                                    <TextField {...params} label="Seleccione una bodega" variant="outlined" fullWidth />
                                )}
                            />
                           
                        </Grid>
                    
                        <Grid item xs={12} md={12} >
                        <Autocomplete
                             size="small"
                            style={{ width: '100%'}}
                                options={unityData}
                                value={getName(unity)}
                                getOptionLabel={(option) => option.name}
                                onChange={(event, value) => {
                                    if (value != null) {

                                        setUnity(value.id)
                                    } else {

                                        setUnity('')

                                    }

                                }} // prints the selected value
                                renderInput={params => (
                                    <TextField {...params} label="Seleccione una categoría" variant="outlined" fullWidth />
                                )}
                            />
                           
                        </Grid>
                        <Grid item xs={12} md={12} >
                        <Autocomplete
                             size="small"
                            style={{ width: '100%'}}
                                options={unityData}
                                value={getName(unity)}
                                getOptionLabel={(option) => option.name}
                                onChange={(event, value) => {
                                    if (value != null) {

                                        setUnity(value.id)
                                    } else {

                                        setUnity('')

                                    }

                                }} // prints the selected value
                                renderInput={params => (
                                    <TextField {...params} label="Seleccione una medida" variant="outlined" fullWidth />
                                )}
                            />
                           
                        </Grid>

                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpen(false)} color="default">
                    Cancelar
                </Button>
                <Button color="primary" onClick={() => props.setOpen(false)}>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

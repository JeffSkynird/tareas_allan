import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Initializer from '../../../store/Initializer'
import FilterListIcon from '@material-ui/icons/FilterList';
import DateFnsUtils from '@date-io/date-fns';
import { utcDate } from '../../../utils/Date'
import {
    DatePicker,
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import es from 'date-fns/locale/es'
import { obtenerTodos } from '../../../utils/API/usuarios.js';
import { Autocomplete } from '@material-ui/lab';

import { Grid, IconButton, TextField } from '@material-ui/core';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const initializer = React.useContext(Initializer);

    const [open, setOpen] = React.useState(false);
    const [usuario, setUsuario] = React.useState("");
    const [usuarioData, setUsuarioData] = React.useState([]);
    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setUsuarioData, initializer)
        }
    }, [initializer.usuario])
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const getFirst = () => {
        let date = new Date();
        let primerDia = new Date(date.getFullYear(), date.getMonth(), 1);

        return primerDia
    }
    const sumarDias = (dias)=>{
        let date = new Date();
        let primerDia = new Date(date.getFullYear(), date.getMonth(), dias);

        return primerDia

    }
    const getLast = () => {
        let date = new Date();

        let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return ultimoDia
    }
    const getName = (id,data) => {
        let object = null
        data.map((e) => {
            if (id == e.id) {
                object = { ...e }
            }
        })
        return object
    }
    return (
        <div>
  

            <IconButton aria-label="abrirmodal" onClick={handleClickOpen} size='medium'>
                <FilterListIcon />
                </IconButton>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Filtros</DialogTitle>
                <DialogContent>
                
               
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>

                    <DialogContentText id="alert-dialog-slide-description">
                        Seleccione el rango de fechas para filtrar.
                        
                        </DialogContentText>
                 
                 <div>
                 <Button onClick={()=>{
                        props.setDesde(getFirst())
                        props.setHasta(getLast())
                   
                    }}  color="default" variant="outlined" style={{marginRight:5}}>MES ACTUAL</Button>
                           <Button onClick={()=>{
                        props.setDesde(getFirst())
                        props.setHasta(getLast())
                   
                    }}  color="default" variant="outlined">HOY</Button>
                 </div>
                  
                    </Grid>
           
                  
                    
                        <Grid item md={6} xs={12}>


                            <MuiPickersUtilsProvider style={{ width: "100%" }} utils={DateFnsUtils} locale={es}>
                                <KeyboardDatePicker
                                    autoOk
                                    
                                    ampm={false}
                                    size="small"
                                    inputVariant="outlined"
                                    label="Desde"
                                    style={{ width: "100%" }}
                                    // disablePast
                                    format="yyyy-MM-dd"
                                    value={props.desde}

                                    onChange={date => props.setDesde(date)}
                                />


                            </MuiPickersUtilsProvider>


                        </Grid>
                        <Grid item md={6} xs={12}>


                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                                <KeyboardDatePicker
                                    autoOk
                                    
                                    ampm={false}
                                    size="small"
                                    inputVariant="outlined"
                                    label="Hasta"
                                    style={{ width: "100%" }}
                                    // disablePast
                                    format="yyyy-MM-dd"
                                    value={props.hasta}

                                    onChange={date => props.setHasta(date)}
                                />


                            </MuiPickersUtilsProvider>


                        </Grid>
                        <Grid item xs={12} md={12} >
                        <Autocomplete
                             size="small"
                            style={{ width: '100%',marginBottom:10}}
                                options={usuarioData}
                                value={getName(usuario,usuarioData)}
                                getOptionLabel={(option) => option.names+" "+option.last_names}
                                onChange={(event, value) => {
                                    if (value != null) {

                                        setUsuario(value.id)
                                    } else {

                                        setUsuario('')

                                    }

                                }} // prints the selected value
                                renderInput={params => (
                                    <TextField {...params} label="Seleccione una usuario" variant="outlined" fullWidth />
                                )}
                            />
                           
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                   
                    <Button onClick={handleClose}  color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={()=>{
                        props.filtrarFecha(usuario)
                        handleClose()
                    }} color="primary">
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Grid } from '@material-ui/core';
import Initializer from '../../../store/Initializer'
import TextField from '@material-ui/core/TextField';

import { obtenerTodos } from '../../../utils/API/sistemas';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import add from '../../../assets/add.png'
import Evaluar from './Evaluar';
import { editarPoll, evaluar, obtenerPool2 } from '../../../utils/API/evaluaciones';
const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
    const classes = useStyles();
    const initializer = React.useContext(Initializer);
    const [nombre, setNombre] = React.useState("")

    const [descripcion, setDescripcion] = React.useState("")
    const [tab, setTab] = React.useState(0)
    const [sistemas, setSistemas] = React.useState([])
    const [sistema, setSistema] = React.useState('')
    const [evalu,setEvalu]=React.useState([])

    const [datos,setDatos]=React.useState(null)
    
    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setSistemas, initializer)
        }
    }, [initializer.usuario])
    const empezar = () => {
        setTab(1)
     
    };
    React.useEffect(() => {
        if (props.sistema != null) {
            setNombre(props.sistema.name)
            setSistema(props.sistema.id_system)
            setDescripcion(props.sistema.descripcion)
            obtenerPool2(props.sistema.id,setDatos,setEvalu, initializer)
        }
    }, [props.sistema])
    const actualizarEval=(ev)=>{
        setEvalu(ev)
    }
    const tomarValor=(id_metric)=>{
        let tp =[]
        evalu.map((e)=>{
            if(e.id_metric==id_metric){
                tp.push({...e})
            }
        })
        return tp
    }
    const guardar=()=>{
        let ar=[]
        evalu.map((e)=>{
            if(!ar.some(c => c.id_metric == e.id_metric)){
                ar.push({id_metric:e.id_metric,answers:tomarValor(e.id_metric)})
            }
           
        })
        if(datos==null){
           
           evaluar({ name:nombre,
                system:sistema,
                description:descripcion,
                evaluations:ar
            },initializer,        props.completar) 
        }else{
            editarPoll(props.sistema.id,{ name:nombre,
                system:sistema,
                description:descripcion,
                evaluations:ar
            },initializer,    props.carga)
        }
    
        setEvalu([])
        setNombre("")
        setDescripcion("")
        setTab(0)
        props.setOpen(false)
     
        setDatos(null)
    }
    const close =()=>{
        setEvalu([])
        setNombre("")
        setDescripcion("")
        setTab(0)
        props.setOpen(false)
        props.carga()
        setDatos(null)
    }
    const getName = (id) => {
        let object = null
        sistemas.map((e) => {
            if (id == e.id) {
                object = { ...e }
            }
        })
        return object
    }
    return (


        <Dialog fullScreen open={props.open} onClose={() =>close() } TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => close()} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {props.sistema!=null?"Editar evaluación":"Nueva evaluación"}
                    </Typography>
                    <Button disabled={evalu.length==0} autoFocus color="inherit" onClick={guardar}>
                        Guardar
                    </Button>
                </Toolbar>
            </AppBar>
            {
                tab == 0 ?
                    <Grid container style={{ padding: 10, marginTop: 10 }}>
                    
                        <Grid item xs={12} md={12} style={{ display: 'flex' }}>
                        <Autocomplete
                        disabled={datos!=null}
                             size="small"
                            style={{ width: '100%', marginRight: 10 }}
                                options={sistemas}
                                value={getName(sistema)}
                                getOptionLabel={(option) => option.name}
                                onChange={(event, value) => {
                                    if (value != null) {

                                        setSistema(value.id)
                                    } else {

                                        setSistema('')

                                    }

                                }} // prints the selected value
                                renderInput={params => (
                                    <TextField {...params} label="Seleccione un sistema" variant="outlined" fullWidth />
                                )}
                            />
                            <Button disabled={sistema == ""||nombre==""||descripcion==""} onClick={() => empezar()} variant="contained" size="small" color="primary">
                                Empezar
                            </Button>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: 10 }}>
                            <TextField
                                variant="outlined"
                                style={{ marginBottom: 10, width: '100%' }}
                                size="small"
                                label="Nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}

                            /></Grid>
                        <Grid item xs={12} >
                            <TextField
                                variant="outlined"
                                style={{ marginBottom: 10, width: '100%' }}
                             
                                label="Descripción"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}

                            /></Grid>
                        <Grid md={12} xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                            <img src={add} style={{ height: 300, width: 300 }} alt="" srcset="" />
                        </Grid>
                    </Grid>
                    :
                     <Evaluar datos={datos} actualizarEval={actualizarEval}/>
            }


        </Dialog>

    );
}

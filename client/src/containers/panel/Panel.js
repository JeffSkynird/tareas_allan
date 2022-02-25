import React from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Avatar from '@material-ui/core/Avatar';
import Initializer from '../../store/Initializer'
import Tabs from '@material-ui/core/Tabs';

import Tab from '@material-ui/core/Tab';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { LocalizationTable, TableIcons, removeAccent } from '../../utils/table.js'
import MaterialTable from "material-table";
import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Slider } from '@material-ui/core';
import { obtenerSistemaEvaluaciones, obtenerTodos } from '../../utils/API/sistemas.js';
import Crear from './components/Crear'
import Eliminar from './components/Eliminar'
import { obtenerTodos as obtenerMetricasSistemas } from '../../utils/API/clientes';
import Bar from './components/Bar';
import BarVertical from './components/BarVertical';
import PieChart from './components/PieChart';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { utcDate } from '../../utils/Date'

import Box from '@material-ui/core/Box';
import Tab2 from './components/Tab2';
import { obtenerTodos as obtenerTodosS } from '../../utils/API/facturas';
import { obtenerTodos as obtenerTodosTareas, obtenerUsuariosTarea } from '../../utils/API/tareas';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Radio from './components/Radio';
import noValue from '../../assets/noValue.svg'
import { obtenerComprasYVentas, obtenerEstadoTareas, obtenerKpisPanel, obtenerTareasEstado, obtenerUsuarioTareas, obtenerVentasCaja } from '../../utils/API/dashboard';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import FiltroPanel from './components/FiltroPanel';
import { ObtenerGrafico1 } from '../../utils/API/reporte';
import { estaAbiertaCaja } from '../../utils/API/cajas';
import { Alert } from '@material-ui/lab';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        backgroundColor: "#5e35b1",
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',


    },
    card2: {
        backgroundColor: "#5e35b1",
        color: '#fff',
        overflow: 'hidden',
        position: 'relative'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.,
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
export default function Sistemas(props) {
    const initializer = React.useContext(Initializer);
    const classes = useStyles();
    const [data3, setData3] = React.useState({ completas: 0, pendientes: 0 })

    const [data, setData] = React.useState(null)
    const [data0, setData0] = React.useState([])
    const [desde, setDesde] = React.useState(null)
    const [hasta, setHasta] = React.useState(null)
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [selected, setSelected] = React.useState(null)
    const [selected2, setSelected2] = React.useState(null)
    const [values, setValues] = React.useState([])
    const [labels, setLabels] = React.useState([])
    const [values2, setValues2] = React.useState([])
    const [labels2, setLabels2] = React.useState([])
    const [value, setValue] = React.useState(0);
    const [sistemas, setSistemas] = React.useState([])
    const [sistema, setSistema] = React.useState('')
    const [data1, setData1] = React.useState({ ventas: [], cantidad: [], meses: [] })
    const [cajaAbierta, setCajaAbierta] = React.useState(null)
    const [comprasVentas, setComprasVentas] = React.useState({ ventas: [], compras: [] })
    const [cajaVenta, setCajaVenta] = React.useState({ factura: [], caja: [] })
    const [estadoTareas, setEstadoTareas] = React.useState({ completas: [], incompletas: [] })

    const [empleados, setEmpleados] = React.useState([])
    const [asignados, setAsignados] = React.useState([])

    const [tareas, setTareas] = React.useState([])
    const [tarea, setTarea] = React.useState('')

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerEstadoTareas({}, setEstadoTareas, initializer)
            obtenerUsuarioTareas({}, setEmpleados, initializer)
            obtenerTareasEstado({}, setData3, initializer)
            obtenerTodosTareas(setTareas, initializer)
        }
    }, [initializer.usuario])
    const getFirstLast = () => {
        return "(" + utcDate(desde) + " hasta " + utcDate(hasta) + ")"
    }
    const getFirst = () => {
        let date = new Date();
        let primerDia = new Date(date.getFullYear(), date.getMonth(), 1);

        return primerDia
    }
    const getLast = () => {
        let date = new Date();

        let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return ultimoDia
    }
    const carga = () => {
        obtenerKpisPanel(setData, initializer)
        setSelected(null)
        setSelected2(null)
    }
    const total = () => {
        let tot = 0
        data0.map((e) => {
            tot += e.evaluaciones
        })
        return tot
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const getName = (id) => {
        let object = null
        sistemas.map((e) => {
            if (id == e.id) {
                object = { ...e }
            }
        })
        return object
    }
    const filtrarFecha = (userId) => {

        obtenerEstadoTareas({ desde: utcDate(desde), hasta: utcDate(hasta), user_id: userId }, setEstadoTareas, initializer)
        obtenerUsuarioTareas({ desde: utcDate(desde), hasta: utcDate(hasta), user_id: userId }, setEmpleados, initializer)
        setData3({ completas: 0, pendientes: 0 })
        obtenerTareasEstado({ desde: utcDate(desde), hasta: utcDate(hasta), user_id: userId }, setData3, initializer)

    }
    const colorPuntaje = (val) => {
        if ((val * 100) <= 54) {
            return 'red';
        } else if (val * 100 >= 55 && val * 100 <= 69) {
            return 'yellow';
        } else if (val * 100 >= 70 && val * 100 <= 100) {
            return 'green';
        }
    }
    const obtenerValor = (id) => {


        return id.percent

    }
    return (
        <Grid container spacing={2}>
            <Crear sistema={selected} setSelected={setSelected} setOpen={setOpen} open={open} carga={carga} />
            <Eliminar sistema={selected2} setOpen={setOpen2} open={open2} carga={carga} />
            <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" >
                    Dashboard
                </Typography>
                <FiltroPanel desde={desde} hasta={hasta} setDesde={setDesde} setHasta={setHasta} filtrarFecha={filtrarFecha} />

            </Grid>

            <Grid item xs={12} md={12} >
                <Grid container spacing={2}>

                    <Grid item xs={12} md={4}>
                        <Card class={classes.card} style={{ width: '100%', height: 157, marginRight: 20, marginBottom: 5, backgroundColor: '#5e35b1', borderRadius: 12 }}>
                            <CardContent>
                                <Avatar variant="rounded" style={{ zIndex: 1, height: 30, width: 30, position: 'absolute', top: 15, right: 10, backgroundColor: '#5e35b1', borderRadius: 5, marginBottom: 15 }} >
                                    <IconButton aria-label="show 4 new mails" color="inherit" >

                                        <MoreHorizIcon fontSize="small" />
                                    </IconButton>

                                </Avatar>
                                <Avatar variant="rounded" style={{ marginTop: 5, backgroundColor: '#4527a0', borderRadius: 5, marginBottom: 15 }} >

                                    <DescriptionOutlinedIcon />

                                </Avatar>


                                <Typography variant="h4" style={{ color: 'white', fontSize: '2.125rem' }} >
                                    {estadoTareas != null ? estadoTareas.completas : 0}
                                </Typography>
                                <Typography variant="subtitle1" style={{ color: 'white' }} gutterBottom>
                                    Actividades Realizadas
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card class={classes.card2} style={{ width: '100%', height: 157, marginRight: 20, marginBottom: 5, backgroundColor: '#1e88e5', borderRadius: 12 }}>
                            <CardContent>
                                <Avatar variant="rounded" style={{ zIndex: 1, height: 30, width: 30, position: 'absolute', top: 15, right: 10, backgroundColor: '#1e88e5', borderRadius: 5, marginBottom: 15 }} >
                                    <IconButton aria-label="show 4 new mails" color="inherit" >

                                        <MoreHorizIcon fontSize="small" />
                                    </IconButton>

                                </Avatar>
                                <Avatar variant="rounded" style={{ marginTop: 5, backgroundColor: '#1565c0', borderRadius: 5, marginBottom: 15 }} >
                                    <CheckCircleIcon />
                                </Avatar>


                                <Typography variant="h4" style={{ color: 'white', fontSize: '2.125rem' }} >
                                    {estadoTareas != null ? estadoTareas.incompletas : 0}
                                </Typography>
                                <Typography variant="subtitle1" style={{ color: 'white' }} gutterBottom>
                                    Actividades Pendientes
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Grid>

            <Grid item md={6} xs={12}>
                <div style={{ marginTop: 15 }} >

                    {
                        data3.pendientes != 0 || data3.completas != 0 ? (
                            <PieChart pendientes={data3.pendientes} completas={data3.completas} text="Tareas Pendientes/Realizadas" />
                        )
                            :
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={noValue} width={150} height={150} alt="" srcset="" />
                                <p>No hay registros</p>
                            </div>
                    }
                </div>


            </Grid>

            <Grid item md={6} xs={12}>
                <MaterialTable
                    icons={TableIcons}
                    columns={[

                        { title: "Empleado", field: "user" },

                        {
                            title: "Completas", field: "total", render: rowData => <span style={{ fontWeight: 'bold' }}>{rowData.total}</span>
                        },




                    ]}
                    data={
                        empleados
                    }
                    localization={LocalizationTable}

                    title="Cumplimiento de tareas/Empleado"
                    options={{

                        actionsColumnIndex: -1,
                        search: false,
                        maxBodyHeight: 350,
                        padding: 'dense',
                        headerStyle: {
                            textAlign: 'left'
                        },
                        cellStyle: {
                            textAlign: 'left'
                        },
                        searchFieldStyle: {

                            padding: 5
                        }
                    }}

                />
            </Grid>
            <Grid item xs={12}>
                <FormControl variant="outlined" style={{width:'100%'}}>
                    <InputLabel id="demo-simple-select-outlined-label">Seleccione una tarea</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={tarea}
                        onChange={(e) => {
                            setTarea(e.target.value)

                            obtenerUsuariosTarea(e.target.value, setAsignados, initializer)

                        }}

                        label="Seleccione una tarea"
                    >
                        <MenuItem value="">
                            <em>Seleccione una opción</em>
                        </MenuItem>

                        {
                            tareas.map((e) => (
                                <MenuItem value={e.id}>{e.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>

                {
                    asignados.map((e) => (
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12}>
                                <span>{e.names + " " + e.last_names} ({e.percent}%)</span>
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
    )
}

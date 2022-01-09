import React from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import CardContent from '@material-ui/core/CardContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Chart from "react-apexcharts";
import Bar from './components/Bar';
import { obtenerPoolResult } from '../../utils/API/evaluaciones';
import Avatar from '@material-ui/core/Avatar';
import Initializer from '../../store/Initializer'
import Box from '@material-ui/core/Box';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import ScrollHorizontal from 'react-scroll-horizontal';
import { LocalizationTable, TableIcons, removeAccent } from '../../utils/table.js'
import MaterialTable from "material-table";
import { Grid } from '@material-ui/core';
import { obtenerTodos } from '../../utils/API/evaluaciones.js';
import CrearEvaluacion from './components/CrearEvaluacion'
import Eliminar from './components/EliminarEvaluacion'
import { obtenerTodosPorPoll } from '../../utils/API/metricas';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Radial from './components/Radial';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tab2 from './components/Tab2';
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
  
export default function Evaluacion(props) {

    const dato = props.location.state;

    const initializer = React.useContext(Initializer);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [values, setValues] = React.useState([])
    const [labels, setLabels] = React.useState([])
    const [data, setData] = React.useState([])
    const [value, setValue] = React.useState(0);


    React.useEffect(() => {
        if (initializer.usuario != null) {
            setData([])
            obtenerPoolResult(dato.id, setLabels, setValues, setData, initializer)
        }
    }, [initializer.usuario])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleClickOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
    };
    const total = () => {
        let t = 0
        values.map((e) => {
            t += e
        })
        if (values.length != 0) {
            return (t / values.length).toFixed(2)
        } else {
            return t
        }
    }
    return (
        <Grid container >

            <Grid xs={12} md={12}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <Card style={{ width: fullScreen ? '100%' : '100%', display: 'flex', }}>
                        <CardContent style={{ width: '100%' }}>
                            <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h5" >
                                {data.length != 0 ? data.system : "N/A"}
                                </Typography>
                                <IconButton aria-label="Cancelar" onClick={() => props.history.goBack()}>
                                    <ArrowBackIcon  color="primary"/>
                                </IconButton>
                            </Grid>
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
                                {
                                    values.length != 0 ?
                                        <Radial values={dato.score} />
                                        : null
                                }

                                <div >
                                
                                    <Typography variant="subtitle1" gutterBottom>
                                        <span style={{ fontWeight: 'bold' }}>Evaluación</span>: {data.length != 0 ? data.poll : "N/A"}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom>
                                        <span style={{ fontWeight: 'bold' }}>Descripción</span>: {data.length != 0 ? data.description : "N/A"}
                                    </Typography>
                                </div>
                            </div>
                    
                                <Tabs
                                    value={value}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    onChange={handleChange}
                                    aria-label="disabled tabs example"
                                >
                                    <Tab label="Puntuación general" />
                                    <Tab label="Puntuación por característica" />

                                </Tabs>

                                <TabPanel value={value} index={0} dir={theme.direction}>
                                    <div style={{ marginTop: 15 }} >
                                        {
                                            labels.length != 0 && values.length != 0 && (
                                                <Bar values={values} labels={labels} />
                                            )
                                        }
                                    </div>
                                </TabPanel>
                                <TabPanel value={value} index={1} dir={theme.direction}>
                                        <Tab2  {...props} id_poll={dato.id}/ >
                                </TabPanel>
                       
                        </CardContent>
                    </Card>
                </div>


            </Grid>
        </Grid>
    )
}

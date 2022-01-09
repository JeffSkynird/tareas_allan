import React from 'react'
import { useTheme } from '@material-ui/core/styles';
import Chart from "react-apexcharts";
import { Grid, IconButton, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Bar from './components/Bar';
import { obtenerPoolResult } from '../../utils/API/evaluaciones';
import Initializer from '../../store/Initializer'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Tab2 from './components/Tab2';
import Radial from './components/Radial';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
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
export default function Resultado(props) {
    const initializer = React.useContext(Initializer);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [values, setValues] = React.useState([])
    const [labels, setLabels] = React.useState([])
    const [data, setData] = React.useState([])
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        if (initializer.usuario != null) {
            
            obtenerPoolResult(props.id, setLabels, setValues, setData, initializer)
        }
    }, [initializer.usuario, props.id])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleClickOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
        setData([])
        setValues([])
        setLabels([])
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
        <Dialog
            fullScreen={true}
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            fullWidth={true}
            maxWidth={'xl'}
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title" style={{marginBottom:0,paddingBottom:0}}>
                <div item xs={12} md={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" >
                    {data.length != 0 ? data.system : "N/A"}
                    </Typography>
                    <IconButton aria-label="Cancelar" onClick={handleClose}>
                        <ArrowBackIcon color="primary" />
                    </IconButton>
                </div>

            </DialogTitle>
            <DialogContent>
                <Card style={{ width: fullScreen ? '100%' : '100%', display: 'flex', }}>
                    <CardContent style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>

                            <div style={{ width: fullScreen ? '100%' : '80%', display: 'flex', }}>
                        
                                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
                                        {
                                            values.length != 0 ?
                                                <Radial values={data.poll_score} />
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
                            <Tab2 {...props} id_poll={props.id} />
                        </TabPanel>
                    </CardContent>
                </Card>
            </DialogContent>
       
        </Dialog>

    )
}

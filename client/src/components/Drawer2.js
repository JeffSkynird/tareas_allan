import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import PersonIcon from '@material-ui/icons/Person';
import Hidden from '@material-ui/core/Hidden';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AccountCircle from '@material-ui/icons/PermIdentity';
import NotificationsIcon from '@material-ui/icons/NotificationsNone';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from "react-router-dom";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import SecurityIcon from '@material-ui/icons/Security';
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { PUBLIC_PATH } from '../config/API'
import ListIcon from '@material-ui/icons/List';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import Initializer from '../store/Initializer'
import { desencriptarJson } from '../utils/security'
import AllInboxIcon from '@material-ui/icons/AllInbox';
import StoreIcon from '@material-ui/icons/Store';
import PostAddIcon from '@material-ui/icons/PostAdd';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import TransformIcon from '@material-ui/icons/Transform';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import { cerrarSesion, obtenerUsuario } from '../utils/API/auth';
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import MapIcon from '@material-ui/icons/Map';
import { useLocation, Switch } from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import RoomIcon from '@material-ui/icons/Room';
import logo from '../assets/logo1.jpg'
import { Badge, Box, Button, Grid } from '@material-ui/core';
import { obtenerPermisos, obtenerPermisosAuth } from '../utils/API/roles';
import { obtenerRol } from '../utils/API/usuarios';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { obtenerPermisosUser } from '../utils/API/permisos';
const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        pointerEvents: 'auto',
        [theme.breakpoints.up('sm')]: {


            pointerEvents: 'none',

        },
    },
    search: {
        height: 45,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(0, 0, 0, 0.12)',
        position: 'relative',
        borderRadius: 10,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            borderColor: 'rgb(30, 136, 229)',
            borderWidth: 1,
            borderStyle: 'solid'
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%', color: 'gray',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit', height: '100%'
    },
    root: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
        overflow: 'hidden'
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    avatar: {
        margin: theme.spacing(2),
        objectFit: 'cover',
        width: theme.spacing(10),
        height: theme.spacing(10),

    },
    drawer: {
        overflow: 'hidden',
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        overflowX: 'hidden',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    grow: {
        flexGrow: 1,
    },
}));


function ResponsiveDrawer(props) {
    const { window } = props;
    let history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const theme = useTheme();
    const [openCollapse, setOpenCollapse] = React.useState(false);
    const [openCollapse2, setOpenCollapse2] = React.useState(false);


    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [cambio, setCambio] = React.useState(null)
    const [info, setInfo] = React.useState(null)
    const [file, setFile] = React.useState(null)

    const [names, setNames] = React.useState('')
    const [permisos, setPermisos] = React.useState([])
    const [rol, setRol] = React.useState("");

    const initializer = useContext(Initializer);


    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerUsuario(setInfo, initializer)

            obtenerRol(JSON.parse(desencriptarJson(initializer.usuario)).user.id, setRol, initializer);
            obtenerPermisosUser(setPermisos, initializer);
        }
    }, [initializer.usuario])
    React.useEffect(() => {
        if (info != null) {
            setNames(info.names + " " + info.last_names)
        }
    }, [info])
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    function handleOpenSettings() {
        setOpenCollapse(!openCollapse);
    }
    const cerrar = () => {
        cerrarSesion(initializer)
    }
    const comprobador = (val) => {

        if (location.pathname == val) {
            return { backgroundColor: '#242B38', borderRadius: 7, color: '#242B38', marginRight: 5, marginLeft: 5 }
        } else {
            if (location.pathname == "/evaluacion" && val == "/evaluaciones") {
                return { backgroundColor: '#EDE7F6', borderRadius: 7, color: '#3f51b5', marginRight: 5, marginLeft: 5 }

            } else {
                return { borderRadius: 7, marginRight: 5, marginLeft: 5 }

            }
        }


    }
    const incluyePermiso = (val) => {
        let existe = false
        permisos.slice().map((e)=>{
            if(val==e.id){
                existe = true
            }
        })
        return existe
    }
    const drawer = (
        <div style={{ backgroundColor: '#111827', height: '100%' }} >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Avatar size="" className={classes.avatar} >

                </Avatar>

                <div style={{
                    width: '90%',
                    marginBottom: '10px',
                    borderRadius: '10px',

                    whiteSpace: 'nowrap',
                    overflow: 'hidden', textAlign: 'center',
                    textOverflow: 'ellipsis', backgroundColor: '#1B2130'
                }}>
                    <Typography variant="subtitle1" style={{ fontSize: 15, color: '#9E9BA0', fontWeight: 'bold' }}>
                        {rol}
                    </Typography>
                    <Typography variant="subtitle1" style={{ fontSize: 15, color: '#9E9BA0' }}>
                        {names}
                    </Typography>

                </div>


            </div>

            <Divider style={{ color: 'white', backgroundColor: 'rgb(45, 55, 72)' }} />
            <div style={{ justifyContent: 'space-between', flexDirection: 'column', display: 'flex' }}>
                <List style={{ padding: 10 }} >


                    {
                        rol == "Gerente" && (
                            <ListItem button onClick={() => props.history.push('panel')} style={comprobador('/panel')}>
                                <ListItemIcon style={{ color: '#9E9BA0' }}><DashboardIcon style={{ color: location.pathname == '/panel' ? 'rgb(16, 185, 129)' : '#9E9BA0' }} /> </ListItemIcon>
                                <ListItemText primary={'Dashboard'} style={{ color: location.pathname == '/panel' ? 'rgb(16, 185, 129)' : '#9E9BA0' }} />
                            </ListItem>
                        )
                    }


                    {
                       incluyePermiso(2) && (
                            <ListItem button onClick={() => props.history.push('/tareas')} style={comprobador('/tareas')}>
                                <ListItemIcon style={{ color: '#9E9BA0' }} ><AssignmentIcon style={{ color: location.pathname == '/tareas' ? 'rgb(16, 185, 129)' : '#9E9BA0' }} /> </ListItemIcon>
                                <ListItemText primary={'Tareas'} style={{ color: location.pathname == '/tareas' ? 'rgb(16, 185, 129)' : '#9E9BA0' }} />
                            </ListItem>
                        )
                    }
{
incluyePermiso(4) && (

                            <ListItem button onClick={() => props.history.push('/control')} style={comprobador('/control')}>
                                <ListItemIcon style={{ color: '#9E9BA0' }} ><AssignmentTurnedInIcon style={{ color: location.pathname == '/control' ? 'rgb(16, 185, 129)' : '#9E9BA0' }} /> </ListItemIcon>
                                <ListItemText primary={'Control de tareas'} style={{ color: location.pathname == '/control' ? 'rgb(16, 185, 129)' : '#9E9BA0' }} />
                            </ListItem>

                        )
                    }
                    {
                          incluyePermiso(3) && (
                            <ListItem button onClick={() => props.history.push('/personal')} style={comprobador('/personal')}>
                                <ListItemIcon style={{ color: '#9E9BA0' }} ><PeopleOutlineIcon style={{ color: location.pathname == '/personal' ? 'rgb(16, 185, 129)' : '#9E9BA0' }} /> </ListItemIcon>
                                <ListItemText primary={'Personal'} style={{ color: location.pathname == '/personal' ? 'rgb(16, 185, 129)' : '#9E9BA0' }} />
                            </ListItem>
                        )
                    }

{
                   incluyePermiso(1) && (
                            <ListItem button onClick={() => props.history.push('/seguridad')} style={comprobador('/seguridad')}>
                                <ListItemIcon style={{ color: '#9E9BA0' }} ><SecurityIcon style={{ color: location.pathname == '/personal' ? 'rgb(16, 185, 129)' : '#9E9BA0' }} /> </ListItemIcon>
                                <ListItemText primary={'Seguridad'} style={{ color: location.pathname == '/seguridad' ? 'rgb(16, 185, 129)' : '#9E9BA0' }} />
                            </ListItem>
                        )
                    }



                </List>

                <div>
                    <Divider style={{ color: 'white', backgroundColor: 'rgb(45, 55, 72)' }} />
                    <List>

                        <ListItem button onClick={cerrar}>
                            <ListItemIcon><ExitToAppIcon style={{ color: '#9E9BA0' }} /> </ListItemIcon>
                            <ListItemText primary={'Salir'} style={{ color: '#9E9BA0' }} />
                        </ListItem>

                    </List>
                </div>
            </div>


        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
   
    return (
        <div className={ history.location.pathname != "/login"?classes.root:""}>
            <CssBaseline />

            {
                // initializer.usuario != null ?
                history.location.pathname != "/bienvenida" && history.location.pathname != "/login" ?

                    <React.Fragment>
                        <AppBar position="fixed" className={classes.appBar} color="white" elevation={0} style={{ border: '1px solid rgba(0, 0, 0, 0.12)', }}>
                            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>

                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={handleDrawerToggle}
                                    className={classes.menuButton}
                                >
                                    <MenuIcon />
                                </IconButton>


                                <img src={logo} alt="" style={{ height: 50 }} srcset="" />

                                <span> BETO </span>


                            </Toolbar>
                        </AppBar>
                        <nav aria-label="mailbox folders" className={classes.drawer}>
                            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                            <Hidden smUp implementation="css">
                                <Drawer
                                    container={container}
                                    variant="temporary"
                                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                    open={mobileOpen}
                                    onClose={handleDrawerToggle}
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                    ModalProps={{
                                        keepMounted: true, // Better open performance on mobile.
                                    }}
                                >
                                    {drawer}
                                </Drawer>
                            </Hidden>
                            <Hidden xsDown implementation="css">
                                <Drawer
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                    variant="permanent"
                                    open
                                >
                                    {drawer}
                                </Drawer>
                            </Hidden>

                        </nav>
                    </React.Fragment>
                    :
                    null
            }

            <main className={history != null ? history.location.pathname != "/login" ? classes.content : "" : ""}>


                <div className={history != null ? history.location.pathname != "/login" ? classes.toolbar : "" : ""} />
                {props.children}
            </main>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;

import React, { Component, useState, useContext } from 'react';
import '../style/AppBar.css'
import Menu from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Home from '@material-ui/icons/Home';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Notifications from '@material-ui/icons/Notifications';
import AppBar from '@material-ui/core/AppBar';
import ArrowDropDownCircle from '@material-ui/icons/ArrowDropDownCircle';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Drawer from './Drawer2';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ModalLogin from './ModalLogin'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';

import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from "react-router-dom";
import { desencriptarJson } from '../utils/security'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Initializer from '../store/Initializer'
function HideOnScroll(props) {
    const { children, window } = props;



    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const AppBarC = (props) => {
    const initializer = useContext(Initializer);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    let history = useHistory();
    const [show, setShow] = useState(false);
    const handleClickAway = () => {
        setShow(false);
    };

    return (

        <HideOnScroll {...props}>

            <AppBar color="primary" position="sticky">
                <ClickAwayListener onClickAway={handleClickAway}>

                    <Toolbar>
                        <Grid item container direction="row" alignItems="center" justify="flex-start" xs={7} >
                            <Drawer {...props} />
                            <Button disableRipple style={{display:'flex',justifyContent:'center',alignItems:'center'}}  color="primary" variant="contained" size="small" onClick={() => window.location.href = './dashboard'}><img src={require('../assets/isotipoAmbiensa.png')} className="foto" style={{ borderRadius: 8, height: '30px', width: '30px' }} /></Button>
                            
                            <div className="title">
                                <Box className="vertical-line" ml={1} mr={1} />
                                <Typography color="inherit" variant="subtitle1">
                                    Gestor comercial
                                </Typography>
                            </div>
                        </Grid>


                        <Grid item container direction="row" alignItems="center" justify="flex-end" xs={5} >

                            {/*     <IconButton aria-label="delete" color="inherit">
                                <Badge color="secondary" badgeContent={1}>
                                    <Notifications fontSize="inherit" />
                                </Badge>
                            </IconButton> */}
                            {
                                !fullScreen&&
                                initializer.usuario != null ? JSON.parse(desencriptarJson(initializer.usuario)).user.names+" "+JSON.parse(desencriptarJson(initializer.usuario)).user.last_names : ""
                            }
                       
                            <IconButton aria-label="delete" color="inherit" size="medium" onClick={() => {
                                setShow(!show)
                            }} ><ArrowDropDownCircle /></IconButton>
                            <Fade in={show}>
                                <Paper>
                                    <ModalLogin changeTheme={props.changeTheme} show={show} {...props} />
                                </Paper>

                            </Fade>

                        </Grid>
                    </Toolbar>


                </ClickAwayListener>
            </AppBar>

        </HideOnScroll>





    )
}

export default AppBarC
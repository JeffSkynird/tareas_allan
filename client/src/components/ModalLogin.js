import React, { useContext, useState } from 'react';
import '../style/ModalLogin.css';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton';
import Person from '@material-ui/icons/Person';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import Settings from '@material-ui/icons/Settings';
import { cerrarSesion } from '../utils/API/auth'
import Initializer from '../store/Initializer'
import { desencriptarJson } from '../utils/security'

function ModalLogin(props) {

    const initializer = useContext(Initializer);

    let show = (props.show == true ? 'flex' : 'none')
    const logout = () => {
        cerrarSesion(initializer)

        props.history.push('/login');
    }
    const getType = (type) => {
        switch (type) {

            case "manager":
                return "Administrador"
                break;
            case "asessor":
                return "Asesor"
                break;
            case "supervisor":
                return "Supervisor"
                break;
                default:
                    return "N/A"
                    break;
        }
    }

    return (
        <div style={{ display: show }} className="modal">

            <Paper className="content" elevation={3}>
                <Grid item container direction="row" justify="space-between" alignItems="center" >
                    <Grid item>
                        <Typography variant="subtitle1" style={{ fontSize: 20, fontWeight: 'bold' }}>
                            Usuario
                    </Typography>
                        <Typography variant="subtitle1" style={{ fontSize: 15, color: '#929396' }}>
                            {initializer.usuario != null ? JSON.parse(desencriptarJson(initializer.usuario)).user.names +" "+JSON.parse(desencriptarJson(initializer.usuario)).user.last_names : ""}
                        </Typography>
                    </Grid>


                </Grid>
                <Box mt={2}>
                    <Grid item container direction="row" justify="space-between" alignItems="center" >
                        <Typography variant="subtitle1"  >
                            Tipo
                    </Typography>
                        <Typography variant="subtitle1" style={{ fontSize: 15, color: '#929396' }}>
                            {getType(initializer.usuario != null ? JSON.parse(desencriptarJson(initializer.usuario)).user.type_user : "")}
                        </Typography>
                    </Grid>
                </Box>
                <Grid item container direction="row" justify="space-between" alignItems="center" >
                    <Box>
                        <Grid item container direction="row" alignItems="center" >
                            <Box mr={1}><Person /></Box>
                            <Typography variant="subtitle1" style={{ fontSize: 15, color: '#929396' }}>
                                Configuración
                        </Typography>
                        </Grid>
                    </Box>
                    <IconButton onClick={() => props.history.push("/editar_cuenta")} aria-label="delete" size="medium" ><ArrowForwardIos fontSize="inherit" /></IconButton>
                </Grid>
                <Grid item container direction="row" justify="space-between" alignItems="center" >
                    <Box>
                        <Grid item container direction="row" alignItems="center" >
                            <Box mr={1}><Brightness4Icon /></Box>
                            <Typography variant="subtitle1" style={{ fontSize: 15, color: '#929396' }}>
                                Modo oscuro
                        </Typography>
                        </Grid>
                    </Box>
                    <Switch
                        color="secondary"
                        name="checkedB"
                        onChange={() => {
                            props.changeTheme()

                        }}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Grid>

                <Button variant="contained" color="secondary" style={{ width: '100%', borderRadius: 13, marginTop: 10 }} onClick={logout}>
                    Cerrar sesión
                </Button>
            </Paper>
        </div>
    )
}
export default ModalLogin
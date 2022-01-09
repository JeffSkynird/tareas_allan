import React from 'react'
import logo from '../../assets/logoPeque.png'
import fondo from '../../assets/fondo.png'
import splash from '../../assets/bienvenida2.png'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function Bienvenida(props) {
    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <div style={{ height: '100vh', width: '100%',backgroundImage: "url(" + fondo + ")" }} >
            <div style={{ display: 'flex', flexDirection: fullScreen ? 'column' : 'row', alignItems: fullScreen ? 'center' : '', justifyContent: 'space-between', padding: 15 }}>
                <img src={logo} style={{ marginBottom: 15, height: 30, width: 124 }} alt="" srcset="" />

                <div>
                    <Button style={{ marginRight: 10 }} onClick={() => props.history.push('/login', { register: true })}>Registrarse</Button>
                    <Button variant="contained" color="primary" onClick={() => props.history.push('/login')}>
                        Iniciar Sesión
                    </Button>
                </div>
            </div>
            <div style={{ marginTop:fullScreen?50:0,display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: fullScreen ? '100%' : '40%', paddingLeft: 30,paddingRight:30 }}>
                    <Typography variant="h5" >
                        Modelo de calidad de Software
                    </Typography>
                    <Typography variant="h3" style={{ color: '#186FFD', fontWeight: 'bold' }}>
                        ISO 25010
                    </Typography>
                    <Typography variant="subtitle1" style={{ fontWeight: 100, marginTop: 10, color: '#929396', marginBottom: 15 }} >
                        La norma ISO/IEC 25010 es una norma internacional que se enfoca en la evaluación de calidad de software y sistemas,  es un conjunto de estándares de calidad para evaluar productos de software por medio de la evaluación de varias características: adecuación funcional, compatibilidad, usabilidad, fiabilidad, seguridad, mantenibilidad, portabilidad y eficiencia en el desempeño.

                    </Typography>

                </div>
                <img src={splash} style={{ display:fullScreen?'none':'',width: 700, height: 625 }} alt="" srcset="" />


            </div>
        </div>
    )
}

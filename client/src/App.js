
import React, { useContext, useState } from 'react';
import AppBar from './components/AppBar'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
//Containers
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import Initializer from './store/Initializer'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import Login from './containers/main/Login'
import { useHistory } from "react-router-dom";
import Drawer2 from './components/Drawer2'
import purple from '@material-ui/core/colors/purple';

/* import Bienvenida from './containers/main/Bienvenida'



import Sistemas from './containers/panel/Sistemas'
import Resultado from './containers/panel/Resultado';
import Settings from './containers/panel/Settings';
 */

import Panel from './containers/panel/Panel';
 import Personal from './containers/Inventario/Personal/Index'
import Tareas from  './containers/Inventario/Tareas/Index'
import Control from  './containers/Inventario/Control/Index'
import Redirecting from './containers/Redirect'
import Seguridad from './containers/Inventario/Seguridad'
import { green,red } from '@material-ui/core/colors';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function App(props) {
  const { usuario, notificacion, mostrarNotificacion, loader, sound, playSound } = useContext(Initializer);
  let history = useHistory();
  const [colorP, setColorP] = useState(green)
  const [colorS, setColorS] = useState(red)
  const [white, setWhite] = useState(createMuiTheme({
    palette: {
      primary: colorP,
      secondary: colorS,
      type: 'light',
    },

  }))
  const [dark, setDark] = useState(createMuiTheme({
    palette: {
      primary: colorP,

      secondary: colorS,

      type: 'dark',
    },

  }))
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    mostrarNotificacion(null);
  };
  React.useEffect(() => {
    if (notificacion != null) {

      setTimeout(function () { mostrarNotificacion(null) }, 3000);
    }
  }
    , [notificacion])
  var themeLight = createMuiTheme({
    palette: {
      primary: colorP,
      secondary: colorS,
      type: 'light',
    },

  });
  var themeDark = createMuiTheme({
    palette: {
      primary: colorP,

      secondary: colorS,

      type: 'dark',
    },

  });
  React.useEffect(() => {
    setWhite(createMuiTheme({
      palette: {
        primary: {
          main: colorP[500],
        },

        secondary: {
          main: colorS['A400'],
        },
        type: 'light',
      },

    }))
    setDark(createMuiTheme({
      palette: {
        primary: {
          main: colorP[500],
        },
        secondary: {
          main: colorS['A400'],
        },
        type: 'dark',
      },

    }))
  }, [colorP, colorS])
  let themeFinal = white
  let tm = localStorage.getItem("theme");


  let [themeColor, setThemeColor] = useState(themeFinal);
  let changeTheme = () => {
    let ct = themeColor.palette.type === "light" ? dark : white;
    setThemeColor(ct);
    let color = themeColor.palette.type == "light" ? "dark" : "light"
    localStorage.setItem("theme", color);
    // play(playSound,'ok')
  }
  let changeThemeColor = (pr, se) => {
    setColorP(pr)
    setColorS(se)
  }

  return (
    <ThemeProvider theme={tm == "dark" ? dark : white}>
      <React.Fragment>

        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={notificacion != null} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={notificacion != null ? notificacion.type : "success"}>
            {notificacion != null ? notificacion.message : ""}
          </Alert>
        </Snackbar>

        {loader != false ?
          <LinearProgress style={{ zIndex: 9999 }} color="secondary" />

          :
          null
        }


        <CssBaseline />

        <Grid container style={{ flexGrow: 1 }}>
          <Grid item xs={12}>

            <Drawer2  history={history}>
              <Box component="main"  >

                <Switch>
                  
                <Route exact path="/redirect" component={Redirecting} />

                  <Route exact path="/login" component={Login} />
                  <Route exact path="/panel" component={Panel} />
                  <Route exact path="/tareas" component={Tareas} />
                  <Route exact path="/control" component={Control} />
                  <Route exact path="/seguridad" component={Seguridad} />

                  <Route exact path="/personal" component={Personal} />

                  <Route render={() => <Redirect to="/panel" />} />
                  
                </Switch>



              </Box>
            </Drawer2>

          </Grid>
        </Grid>



      </React.Fragment>
    </ThemeProvider>

  );
}


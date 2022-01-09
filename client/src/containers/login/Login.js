import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { iniciarSesion } from '../../utils/API/auth'
import Initializer from '../../store/Initializer'
import avatar from '../../assets/logoF.png';
import avatarW from '../../assets/logoF.png';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
export default function SignInSide(props) {
  const initializer = useContext(Initializer);
  const classes = useStyles();
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)


  const login = () => {
    iniciarSesion(email, password, initializer, props.history);


  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const confirmar = (e) => {
    if (e.key === "Enter") {
    
        login();
    
    }
  };
  return (
    initializer.usuario == null ?

      <Grid container justify="center" component="main" className={classes.root} style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover", background: localStorage.getItem("theme") == "dark" ? "url(" + require('../../assets/fondoDark.png')+")": "url(" + require('../../assets/fondoWhite.png') + ")" }}>





        <Grid item xs={12} sm={8} md={5} style={{ maxWidth: "500px" }} component={Paper} elevation={6} square>
          <div className={classes.paper} >
            {
              localStorage.getItem("theme") == "dark" ?
              <img style={{
                width: '182px',
                height: '130px'
              }} src={avatarW} alt="" />
                :
                
                <img style={{
               
                  width: '182px',
                  height: '130px'
                }} src={avatar} alt="" />
            }



            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"

                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onKeyDown={confirmar}
                autoFocus
                onChange={
                  (e) => {
                    setEmail(e.target.value)
                  }
                }
                value={email}
              />
              <FormControl variant="outlined" style={{ width: '100%', marginTop: 10 }}>
                <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  onKeyDown={confirmar}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuerdame"
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={() => login()}
              >
                Iniciar sesión
            </Button>

              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
      : null
  );
}
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Gestor Comercial Beta 01.01 by Ambiensa ©'}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom: '10px'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

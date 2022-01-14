import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Initializer from '../../store/Initializer'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { iniciarSesion } from '../../utils/API/auth';
import { makeStyles } from '@material-ui/core';
import logo from '../../assets/logo2.jpg'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),

    width: theme.spacing(10),
    height: theme.spacing(10),

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
export default function Iniciar(props) {
  const initializer = React.useContext(Initializer);
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false)
  const [correo, setCorreo] = React.useState("")
  const [clave, setClave] = React.useState("")
  React.useEffect(() => {
    if(initializer.usuario!=null){
      window.location.href ='/panel'
    }

  }, [initializer.usuario])
  const entrar = () => {
    iniciarSesion(correo, clave, initializer)
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <form noValidate>
      <div className={classes.paper}>
        <Avatar size="" className={classes.avatar} >

        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            fullWidth
            required
            margin="normal"

            id="email"
            label="Correo electrónico"
            name="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <FormControl variant="outlined" style={{ width: '100%', marginTop: 10 }}>
            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={clave}
              onChange={(e) => {
                setClave(e.target.value)
              }}
              onKeyDown={(e)=>{
                if (e.key === "Enter") {
                  entrar()
                }
                }}
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
             
              label="Contraseña"
            />
          </FormControl>
         

          <Button

            onClick={entrar}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Iniciar Sesión Ahora
          </Button>
         
        </form>
      </div>






    </form>

  )
}

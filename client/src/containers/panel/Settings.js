
import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import { editarUsuario, obtenerUsuario, upload } from '../../utils/API/auth';
import Initializer from '../../store/Initializer'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
export default function Settings(props) {
    const initializer = React.useContext(Initializer);

    const [nombres, setNombres] = React.useState('')
    const [apellidos, setApellidos] = React.useState('')
    const [correo, setCorreo] = React.useState('')
    const [clave, setClave] = React.useState('')
    const [info, setInfo] = React.useState(null)
    const [image, setImage] = React.useState(null)


    React.useEffect(()=>{
        if (initializer.usuario != null) {
        obtenerUsuario(setInfo,initializer)
        }
    }, [initializer.usuario])
    React.useEffect(()=>{
        if(info!=null){
            setNombres(info.names)
            setApellidos(info.last_names)
            setCorreo(info.email)
        }
    },[info])
    const cambiar=()=>{
        editarUsuario({names:nombres,last_names:apellidos,email:correo,password:clave},    uploadImage,initializer)
    
    }
    const uploadImage=(va)=>{
        upload({image_file:va},initializer)
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Typography variant="h5" >
                    Configuración
                </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField
                    variant="outlined"
                    style={{ marginBottom: 10, marginTop: 10 }}
                    required
                    style={{ marginBottom: 10, width: '100%' }}
                    id="email"
                    size="small"
                    label="Nombres"
                    name="email"
                    value={nombres}
                    onChange={(e) => setNombres(e.target.value)}

                />
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField
                    variant="outlined"
                    style={{ marginBottom: 10, marginTop: 10 }}
                    required
                    style={{ marginBottom: 10, width: '100%' }}
                    id="email"
                    size="small"
                    label="Apellidos"
                    name="email"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}

                />
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField
                    variant="outlined"
                    style={{ marginBottom: 10, marginTop: 10 }}
                    required
                    style={{ marginBottom: 10, width: '100%' }}
                    id="email"
                    size="small"
                    label="Correo"
                    name="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}

                />
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField
                    variant="outlined"
                    style={{ marginBottom: 10, marginTop: 10 }}
                    required
                    style={{ marginBottom: 10, width: '100%' }}
                    id="email"
                    size="small"
                    type="password"
                    label="Contraseña"
                    name="email"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}

                />
            </Grid>
            <Grid item md={12} xs={12}>
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="templateFile"
                      multiple
                      type="file"
                  
                      onChange={(e) => {
                          setImage(e.target.files[0])
                          uploadImage(e.target.files[0]) 
                      }}
                    />
                   
                  </Grid>
            <Grid item xs={12} md={12}>
                <Button onClick={cambiar} variant="contained" color="primary">
                    Guardar
                </Button>
            </Grid>
        </Grid>

    )
}

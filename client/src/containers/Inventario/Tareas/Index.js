import React from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Avatar from '@material-ui/core/Avatar';
import Initializer from '../../../store/Initializer'

import { LocalizationTable, TableIcons, removeAccent } from '../../../utils/table.js'
import MaterialTable from "material-table";
import { Chip, Grid } from '@material-ui/core';
import { obtenerTodos } from '../../../utils/API/tareas';
import Crear from './componentes/Crear'
import Eliminar from './componentes/Eliminar'
import Filtro from './componentes/Filtro'
import Check from '@material-ui/icons/Check';

export default function Sistemas(props) {
    const initializer = React.useContext(Initializer);

    const [data, setData] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [selected, setSelected] = React.useState(null)
    const [selected2, setSelected2] = React.useState(null)
    const [openFilter, setOpenFilter] = React.useState(false)

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setData, initializer)
        }
    }, [initializer.usuario])
    const carga = () => {
        obtenerTodos(setData, initializer)
        setSelected(null)
        setSelected2(null)
    }

    return (
        <Grid container spacing={2}>
            <Crear sistema={selected} setSelected={setSelected} setOpen={setOpen} open={open} carga={carga} />
            <Eliminar sistema={selected2} setOpen={setOpen2} open={open2} carga={carga} />
            <Filtro setOpen={setOpenFilter} open={openFilter}  />

            <Grid item xs={12} md={12} style={{display:'flex',justifyContent:'space-between'}}>
                <Typography variant="h5" >
                    Tareas
                </Typography>
             
            </Grid>
            <Grid item xs={12} md={12} style={{display:'flex',justifyContent:'space-between'}}>
            <Button onClick={() => setOpen(true)} startIcon={<AddIcon />} variant="contained" color="primary">
                        Nuevo
                    </Button>
            </Grid>
      
      
            <Grid item xs={12}>
                <MaterialTable
                    icons={TableIcons}
                    columns={[
                      
                        { title: "Nombre", field: "name" },
                        { title: "Observacion", field: "observacion" },
                        { title: "Completada", field: "is_complete", render: rowData => 
                        <Chip label={rowData.is_complete==1?'Si':'No'} color={rowData.is_complete==1?'primary':'secondary'}  /> 
                       
                        },
                        { title: "Porcentaje", field: "percent", render: rowData =>

                        <Chip label={rowData.percent+"%"} />},
                        { title: "Registro", field: "created_at", type: "datetime" },


                    ]}
                    data={
                        data
                    }

                    localization={LocalizationTable}

                    actions={[
                        {
                            icon: TableIcons.Edit,
                            tooltip: 'Editar',

                            onClick: (event, rowData) => {
                                setSelected(rowData)
                                setOpen(true)
                            }
                        },
                       

                        {
                            icon: TableIcons.Delete,
                            tooltip: "Borrar",

                            onClick: (event, rowData) => {
                                setSelected2(rowData)
                                setOpen2(true)
                            }
                        }

                    ]}

                    options={{
                        pageSize:10,
                        showTitle: false,
                        actionsColumnIndex: -1,
                      
                        maxBodyHeight: 350,
                        padding: 'dense',
                        headerStyle: {
                            textAlign: 'left'
                        },
                        cellStyle: {
                            textAlign: 'left'
                        },
                        searchFieldStyle: {

                            padding: 5
                        }
                    }}

                />
            </Grid>
        </Grid>
    )
}

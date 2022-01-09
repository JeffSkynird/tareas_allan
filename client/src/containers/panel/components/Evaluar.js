import React from 'react'

import { Grid, IconButton } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { obtenerOpciones, obtenerPreguntas, obtenerTodos } from '../../../utils/API/metricas';
import Initializer from '../../../store/Initializer'
import { Typography } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Info from './Info';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
export default function Evaluar(props) {
    const initializer = React.useContext(Initializer);

    const [metricas, setMetricas] = React.useState([])
    const [metrica, setMetrica] = React.useState("")
    const [preguntas, setPreguntas] = React.useState([])
    const [opciones, setOpciones] = React.useState([])
    const [answers, setAnswers] = React.useState([])

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setMetricas, initializer)
            obtenerOpciones(setOpciones, initializer)

        }
    }, [initializer.usuario])
    React.useEffect(() => {
        if (metricas.length != 0) {
            obtenerPreguntas({ metric: metricas[0].id }, setPreguntas, initializer)
            setMetrica(metricas[0].id)
        }
    }, [metricas])
    React.useEffect(() => {
        if (props.datos != null) {
            setAnswers(props.datos.answers)

        }
    }, [props.datos])
    const obtenerRadio = (id_question) => {
        let op = "0"
        answers.map((e) => {
            if (e.id_metric == metrica) {
                if (e.id_question.toString() == id_question.toString()) {
                    op = e.id_option.toString()
                }
            }

        })
        console.log(answers)
        console.log(op)
        return op
    }
    const cambiarRadio = (id_question, id_option) => {
        let ar = []
        let esta = false
        answers.map((e) => {
            if (e.id_metric == metrica) {
                if (e.id_question.toString() == id_question.toString()) {
                    ar.push({ ...e, id_option: id_option, id_metric: metrica })
                    esta = true
                } else {
                    ar.push({ ...e })
                }
            } else {
                ar.push({ ...e })
            }


        })
        if (esta) {
            setAnswers(ar)
            console.log(ar)
            props.actualizarEval(ar)
        } else {
            ar.push({ id_question, id_option, id_metric: metrica, score: 0 })
            setAnswers(ar)
            props.actualizarEval(ar)
            console.log(ar)
        }


    }
    return (
        <Grid container style={{ padding: 10 }} >
            <Grid xs={12} md={12} style={{ display: 'flex', alignItems: 'center' }}>
                <FormControl size="small" variant="filled" style={{ width: '95%', padding: 5 }} >
                    <InputLabel id="demo-simple-select-label">Seleccione una métrica</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={metrica}
                        onChange={(e) => {
                            setMetrica(e.target.value)
                            obtenerPreguntas({ metric: e.target.value }, setPreguntas, initializer)
                        }}
                    >
                        {
                            metricas.map((e) => (
                                <MenuItem value={e.id}>{e.name}</MenuItem>

                            ))
                        }
                    </Select>
                </FormControl>
                    <Info />
            </Grid>


            <Grid xs={12} md={12} style={{ marginTop: 30 }}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">
                                    <Typography style={{ textAlign: 'center', color: '#929396' }}>
                                        Característica
                                    </Typography>
                                </TableCell>
                                {opciones.map((e) => (
                                    <TableCell align="center">
                                        <Typography style={{ textAlign: 'center', color: '#929396' }}>
                                            {e.name}
                                        </Typography>
                                    </TableCell>

                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                preguntas.map((e, i) => (
                                    <TableRow key={i}>
                                        <TableCell component="th" scope="row">
                                            <span style={{ fontWeight: 'bold' }}>{e.title}</span><br />
                                            {e.name}
                                        </TableCell>


                                        {
                                            opciones.map((z) => (
                                                <TableCell align="center">
                                                    <Radio
                                                        checked={obtenerRadio(e.id.toString()) == z.id.toString()}
                                                        onChange={(a) => cambiarRadio(e.id.toString(), a.target.value)}
                                                        value={z.id.toString()}
                                                        color="primary"
                                                        name="radio-button-demo"
                                                        inputProps={{ 'aria-label': 'D' }}
                                                    />
                                                </TableCell>
                                            ))
                                        }



                                    </TableRow>



                                ))
                            }

                        </TableBody>
                    </Table>
                </TableContainer>

            </Grid>

        </Grid >
    )
}

import React from 'react'
import { obtenerOpciones, obtenerPreguntas, obtenerTodos } from '../../../utils/API/metricas';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Initializer from '../../../store/Initializer'
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Info() {
    const initializer = React.useContext(Initializer);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [opciones, setOpciones] = React.useState([])
    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerOpciones(setOpciones, initializer)

        }
    }, [initializer.usuario])
    return (
        <div>
            <IconButton size="medium" aria-label="delete" onClick={handleClickOpen}>
                <InfoIcon />
            </IconButton>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Escala de Likert</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        El cálculo del puntaje se basa en la escala de Likert. A continuación se lista las opciones y su porcentaje equivalente.
                    </DialogContentText>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Porcentaje</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    opciones.map((z, i) => (
                                        <TableRow key={i}>
                                            <TableCell >{z.name}</TableCell>
                                            <TableCell align="right">{z.score}%</TableCell>

                                        </TableRow>
                                    ))
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                 
                    <Button onClick={handleClose} color="primary">
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}

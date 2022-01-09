import { Grid } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React from 'react'
import { obtenerFeatureResult } from '../../../utils/API/evaluaciones'
import { obtenerTodos } from '../../../utils/API/metricas'
import Bar from './Bar'
import Initializer from '../../../store/Initializer'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { LocalizationTable, TableIcons } from '../../../utils/table'
import MaterialTable from 'material-table'

export default function Tab2(props) {
    const initializer = React.useContext(Initializer);

    const [labels, setLabels] = React.useState([])
    const [values, setValues] = React.useState([])
    const [data, setData] = React.useState([])
    const [metrics, setMetrics] = React.useState([])
    const [metric, setMetric] = React.useState([])


    React.useEffect(() => {
        obtenerTodos(setMetrics, initializer)
    }, [])
    const getName = (id) => {
        let object = null
        metrics.map((e) => {
            if (id == e.id) {
                object = { ...e }
            }
        })
        return object
    }
    React.useEffect(() => {
        if (metrics.length != 0) {
            obtenerFeatureResult({ id_metric: metrics[0].id, id_poll: props.id_poll }, setLabels, setValues, setData)
            setMetric(metrics[0].id)
        }
    }, [metrics])
    return (
        <Grid container spacing={2} >
            <Grid item xs={12} md={12} style={{ display: 'flex' }}>
                <Autocomplete
                    size="small"
                    style={{ width: '100%', marginRight: 10 }}
                    options={metrics}
                    value={getName(metric)}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => {
                        if (value != null) {

                            setMetric(value.id)
                            setLabels([])
                            setValues([])
                            setData([])
                            obtenerFeatureResult({ id_metric: value.id, id_poll: props.id_poll }, setLabels, setValues, setData)

                        } else {

                            setMetric('')

                        }

                    }} // prints the selected value
                    renderInput={params => (
                        <TextField {...params} label="Seleccione una métrica" variant="outlined" fullWidth />
                    )}
                />

            </Grid>
            <Grid item xs={12} md={6} >
                <div style={{ marginTop: 15 }} >
                    {
                        labels.length != 0 && values.length != 0 && (
                            <Bar values={values} labels={labels} />
                        )
                    }
                </div>
            </Grid>
            <Grid item xs={12} md={6}>
                <MaterialTable
                    icons={TableIcons}
                    columns={[

                        { title: "Título", field: "title" },
                        { title: "Puntaje", field: "score" }




                    ]}
                    data={
                        data
                    }

                    localization={LocalizationTable}

                    options={{
                        pageSize: 10,
                        paging: false,

                        toolbar: false,
                        showTitle: false,
                        actionsColumnIndex: -1,
                        search: false,
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

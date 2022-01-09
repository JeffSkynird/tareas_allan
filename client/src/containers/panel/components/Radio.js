import React from 'react'
import Chart from "react-apexcharts";
import { obtenerSistemaEvaluaciones } from '../../../utils/API/sistemas';
import Initializer from '../../../store/Initializer'

export default function Radio(props) {
    const initializer = React.useContext(Initializer);
    const [values, setValues] = React.useState([])
    const [labels, setLabels] = React.useState([])
    const [state,setState]=React.useState({
          
        series: props.values,
        options: {
            title: {
                text: 'Evaluaciones por sistemas',
                align: 'left'
              },
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: props.labels,
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 300
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
      
      
      }
    
)


    return (
        <Chart options={state.options} series={state.series} type="pie" width={400}/>

    )
}

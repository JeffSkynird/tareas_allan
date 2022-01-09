import React from 'react'
import Chart from "react-apexcharts";

export default function Radial(props) {
    const [state, setState] = React.useState({

        series: [props.values],
        options: {
            
         
            chart: {
                height: 200,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '70%',
                    }
                },
            },
            labels: ['Puntaje'],
        },


    })
    return (
   
            <Chart options={state.options} series={state.series} type="radialBar" height={200} width={200} />


    )
}

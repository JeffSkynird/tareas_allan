import React,{useState} from 'react'
import Chart from "react-apexcharts";
export default function BarChart(props) {
    const [series,setSeries]=useState([props.pendientes,props.completas])
      const [options,setOptions]=useState({
        colors: ["#1e88e5","#5e35b2"],
        chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Pendientes', 'Completas'],
          title: {
            text: props.text,
          
            offsetY: 0,
            align: 'center',
            style: {
              color: '#444',
         
            }
          }
        
      }) 
    
        

    return (
       
   

        <Chart height={240} width={"100%"} options={options} series={series} type="pie"  />

    )
}

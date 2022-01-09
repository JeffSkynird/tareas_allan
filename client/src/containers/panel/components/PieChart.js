import React,{useState} from 'react'
import Chart from "react-apexcharts";
export default function BarChart(props) {
    const [series,setSeries]=useState([props.compras,props.ventas])
      const [options,setOptions]=useState({
        chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Compras', 'Ventas'],
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

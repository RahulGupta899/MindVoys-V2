import React from 'react'
import {Box, Typography} from '@mui/material'
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
  } from 'chart.js';

  import { Chart }  from 'react-chartjs-2'

  ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
  )



const DayOnDayGraph = ({graphData}) => {
    

  //--------------------------
  // DATASETS
  //--------------------------
    const labels = graphData.dates
    const calls = graphData.calls
    const qualityScore = graphData.qualityScore

  //--------------------------
  // GRAPH INFO
  //--------------------------
  const data = {
    labels,
    datasets: [
        {
            type: 'line',
            label: 'Quality Score',
            borderColor: 'rgb(255,99,132)',
            borderColor: '#1C315E',
            borderWidth: 1.8,
            fill: false,
            data: qualityScore,
            tension: 0.1,
            yAxisID: 'percentage',
            order: 1
        },
        {
            type: 'bar',
            label: 'Calls',
            backgroundColor: 'rgb(75, 192, 192)',
            data: calls,
            borderColor: 'white',
            borderWidth: 1,
            yAxisID: 'y',
            order: 2
        },
        
    ]
  }     
  const options = {
    responsive: true,
    plugins:{
        legend: true,
        title:{
            display: true
        }
    },
    scales: {
        y: {           
            beginAtZero: true,
            position: 'left',
            title:{
                // display: true,
                text: 'Calls ',
                padding: 4
            },
            scale:{
                min:0,
                max: 100
            },
        },
        percentage:{
            beginAtZero: true,
            position: 'right',
            grid:{
                drawOnChartArea: false
            },
            ticks:{
                callback: function(value,idx,values){
                    return `${value} %`
                }
            },
            title:{
                // display: true,
                text: 'Quality Score ',
                padding: 4
            },
        }
    }
  }



  return (
    <Chart  type='bar' data={data} options={options}/>
  )
}

export default DayOnDayGraph

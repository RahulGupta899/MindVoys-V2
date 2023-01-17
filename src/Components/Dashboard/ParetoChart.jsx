import React from 'react'
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

const ParetoChart = ({paretoData}) => {

    console.log("Pareto Data: ",paretoData)

    // const labels = ["Opening","Closing","Customer Handling","Feedback","Payment Due","Product Review"]
    // const errors = [90,80,70,65,55,45]
    // const sum = 405
    // const cumulativeSum = [90,170,240,305,360,405]
    // const cumulativePercentage = [22.22,41.97,59.25,75.30,88.88,100]


    const labels = paretoData.parameters
    const errors = paretoData.errors
    const cumulativePercentage = paretoData.percent


    


  //--------------------------
  // GRAPH INFO
  //--------------------------
  const data = {
    labels,
    datasets: [
        {
            type: 'bar',
            label: 'Error in Absolute',
            backgroundColor: '#1C315E',
            data: errors,
            borderColor: 'white',
            borderWidth: 1,
            yAxisID: 'y',
            order: 2
        },
        {
            type: 'line',
            label: 'Errors in Percentage',
            borderColor: '#FF0032',
            // borderColor: '#1C315E',
            borderWidth: 2,
            fill: false,
            data: cumulativePercentage,
            tension: 0.1,
            yAxisID: 'percentage',
            order: 1
        }
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
            scale:{
                min:0,
                max: 100
            },
            // title:{
            //     display: true,
            //     text: 'Count',
            //     padding: 4
            // },
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
            // title:{
            //     display: true,
            //     text: 'Percent',
            //     padding: 4
            // },
        }
    }
  }

  return (
    <Chart  type='bar' data={data} options={options}/>
  )
}

export default ParetoChart
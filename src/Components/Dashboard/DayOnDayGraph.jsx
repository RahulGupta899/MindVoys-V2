import React,{useState,useRef,useEffect} from 'react'
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
    

   console.log("GRAPH DATA: ", graphData)
  //--------------------------
  // DATASETS
  //--------------------------
    const labels = graphData.dates
    const calls = graphData.calls
    const qualityScore = graphData.qualityScore
    const barsLimit = 12

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
            // borderColor: '#567189',
            borderWidth: 1.5,
            fill: false,
            data: qualityScore,
            tension: 0.3,
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
        x: {
            min: 0,
            max: barsLimit-1,
            grid:{
                drawOnChartArea: false
            }
        },
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

  // CUSTOM HOOK
    const moveChart = {
        id: 'moveChart',

        // HOVER EFFECT : TO CHANGE THE CURSOR TYPE
        afterEvent: (chart, args)=>{
            const {ctx, canvas, chartArea: {left, right, top, bottom, width, height} } = chart 
        
            canvas.addEventListener('mousemove', (event)=>{
                const x = args.event.x;
                const y = args.event. y;

                if( x >= left-15 && x<=left+15 && y>=height/2+top-15 && y<=height/2+top+15){
                    canvas.style.cursor = 'pointer'
                }
                else if( x >= right-15 && x<=right+15 && y>=height/2+top-15 && y<=height/2+top+15){
                    canvas.style.cursor = 'pointer'
                }
                else{
                    canvas.style.cursor = 'default'
                }
            })
        }, 


        // IMPLEMENT afterDraw HOOK : TO CREATE THE LEFT AND RIGHT BUTTONS
        afterDraw: (chart, args, pluginOptions)=>{ 
            const {ctx, canvas, chartArea: {left,right,top,bottom,width,height}} = chart
            
            // CREATED CONSTRUCTOR FUNCTION FOR CODE REUASBILITY
            class CircleChevron {
                draw(ctx, x1, pixel){
                    const angle = Math.PI / 180;

                    // LEFT ARROW BACKGROUND
                    ctx.beginPath()
                    ctx.lineWidth = 3
                    ctx.strokeStyle = 'rgba(102, 102, 102, 0.5)'
                    ctx.fillStyle = 'white'
                    ctx.arc(x1, height/2 + top, 15, angle*0 , angle*360, false)
                    ctx.stroke()
                    ctx.fill()
                    ctx.closePath()

                    // LEFT ARROW
                    ctx.beginPath()
                    ctx.lineWidth = 3
                    ctx.strokeStyle = 'rgba(255, 26, 104,1)'
                    ctx.moveTo(x1 + pixel, height/2 + top - 7.5);
                    ctx.lineTo(x1 - pixel, height/2 + top)
                    ctx.lineTo(x1 + pixel, height/2 + top + 7.5)
                    ctx.stroke()
                    ctx.closePath()
                }
            }

            let drawCircleLeft = new CircleChevron();
            drawCircleLeft.draw(ctx, left, 5)

            let drawCircleRight = new CircleChevron();
            drawCircleRight.draw(ctx, right, -5)

            // SLIDER 
            // ctx.beginPath();
            // ctx.fillStyle = 'lightgrey'
            // ctx.rect(left + 15, bottom + 30, width - 30, 15)
            // ctx.fill()
            // ctx.closePath()

            // ctx.beginPath();
            // ctx.fillStyle = 'rgba(225,26,104,1)'
            // ctx.rect(left,bottom+30,15,15)
            // ctx.rect(right-15, bottom+30, 15, 15)
            // ctx.fill();
            // ctx.closePath();
        }
    }


    const chartRef = useRef(null)
    console.log(chartRef.current)

    // USED THIS STATE SO THAT THE COMPONENT RE-RENDERS AND chartRef GETS ASSIGN
    const [controller,setController] = useState(null)
    useEffect(()=>{setController(true)},[])

    if(controller){
        const {ctx, canvas,  chartArea: {left, right, top, bottom, width, height} } = chartRef.current
        
        canvas.addEventListener('click', (event)=>{
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            // IF CLICKED ON LEFT BUTTON
            if( x >= left-15 && x<=left+15 && y>=height/2+top-15 && y<=height/2+top+15){
                chartRef.current.config._config.options.scales.x.min -= barsLimit
                chartRef.current.config._config.options.scales.x.max -= barsLimit
                console.log("##################")
                console.log("LEFT CLICKED")
                console.log("MIN: ", chartRef.current.config._config.options.scales.x.min)
                console.log("MAX: ", chartRef.current.config._config.options.scales.x.max)
                if(chartRef.current.config._config.options.scales.x.min <= 0 ){
                    chartRef.current.config._config.options.scales.x.min = 0
                    chartRef.current.config._config.options.scales.x.max = barsLimit-1
                }
                chartRef.current.update()
                console.log("##################")
            }
            //IF CLICKED ON RIGHT BUTTON
            else if( x >= right-15 && x<=right+15 && y>=height/2+top-15 && y<=height/2+top+15){
                if(chartRef.current.config._config.options.scales.x.max == labels.length) return
                chartRef.current.config._config.options.scales.x.min += barsLimit
                chartRef.current.config._config.options.scales.x.max += barsLimit
                console.log("##################")
                console.log("LEFT CLICKED")
                console.log("MIN: ", chartRef.current.config._config.options.scales.x.min)
                console.log("MAX: ", chartRef.current.config._config.options.scales.x.max)
                if(chartRef.current.config._config.options.scales.x.max >= labels.length){
                    chartRef.current.config._config.options.scales.x.min = labels.length - barsLimit
                    chartRef.current.config._config.options.scales.x.max = labels.length - 1
                    console.log("INTERNAL LOGIN")
                    console.log("  >>>ADJUSTED MIN: ", chartRef.current.config._config.options.scales.x.min)
                    console.log("  >>>ADUSTED MAX: ", chartRef.current.config._config.options.scales.x.max)
                }
                chartRef.current.update()
                console.log("##################")
                
            }
        })
    }



  return (
    // <Chart  type='bar' data={data} options={options}/>
    <Chart type='bar' data={data} options={options} plugins={[moveChart]} ref={chartRef} />
  )
}

export default DayOnDayGraph

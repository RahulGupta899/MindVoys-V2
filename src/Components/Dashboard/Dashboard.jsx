import React,{useEffect, useState} from 'react'
import {Loading} from 'react-loading-dot'
import { Skeleton, Typography } from '@mui/material'
import DayOnDayGraph from './DayOnDayGraph'
import ParetoChart from './ParetoChart'
import TagScore from './TagScore'
import { API_EndPoints } from '../../Helper/API_EndPoints'
import axios from 'axios'

const Dashboard = (props) => {
    console.log("DASHBOARD COMPONENT")
    // FILTER STATES
    const {value} = props
    const {
        dateRange,
        l2Manager,
        l1Manager,
        agentName,
        tenure,
        callDuration,
        filterController
    } = value
    
    // DASHBOARD STATE
    const [dashboardData,setDashboardData] = useState(null)
    console.log("DASHBOARD: ",dashboardData)

    // FETCH DASHBOARD DATA 
    useEffect(() => {
      const fetchDashboardInfo = async()=>{
        setDashboardData(null)
        const {API_POST_calls_QS_AHT_AgentCount} = API_EndPoints
        const options = {dateRange,l2Manager,l1Manager,agentName,tenure,callDuration}
        const {data} = await axios.post(API_POST_calls_QS_AHT_AgentCount,options)
        console.log("useEffect: ",data.analytics)
        setDashboardData(data.analytics)
      }
      fetchDashboardInfo()
    }, [filterController])
    

    return (
        <>

            <section className="page_title_sec">
                    <h1>Call Analytics</h1>
            </section>

            <section className="dash_count_sec comman_top">
                <div className="container-fluid-">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6 dash_count_box_main">
                    <div className="dash_count_box">
                        <div className="dash_icon">
                            <img src="images/dash_total_call.png" alt="" />
                        </div>
                        <div className="dash_total_no">
                            {
                                dashboardData
                                ?
                                <h3>{dashboardData.calls}</h3>
                                :
                                <Skeleton sx={{height:'70px', width:'120px', margin:0}}/>
                            }    
                            <h5>Total Calls</h5>              
                        </div>
                        <div className='round_shape'></div>
                    </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 dash_count_box_main">
                    <div className="dash_count_box">
                        <div className="dash_icon">
                            <img src="images/dash_quality_score.png" alt="" />
                        </div>
                        <div className="dash_total_no">
                            {
                                dashboardData
                                ?
                                <h3>{dashboardData.qualityScore?dashboardData.qualityScore:0}%</h3>
                                :
                                <Skeleton sx={{height:'80px', width:'120px'}}/>
                            }
                            <h5>Quality Score</h5>
                        </div>
                        <div className='round_shape'></div>
                    </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 dash_count_box_main">
                    <div className="dash_count_box">
                        <div className="dash_icon">
                            <img src="images/dash_average_time.png" alt="" />
                        </div>
                        <div className="dash_total_no">
                            {
                                dashboardData
                                ?
                                <h3>{dashboardData.averageHandlingTime}</h3>
                                :
                                <Skeleton sx={{height:'80px', width:'120px'}}/>
                            }
                            <h5>Average Handling Time</h5>
                        </div>
                        <div className='round_shape'></div>
                    </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 dash_count_box_main">
                    <div className="dash_count_box">
                        <div className="dash_icon">
                            <img src="images/dash_agent_count.png" alt="" />
                        </div>
                        <div className="dash_total_no">
                            {
                                dashboardData
                                ?
                                <h3>{dashboardData.agentCount}</h3>
                                :
                                <Skeleton sx={{height:'80px', width:'120px'}}/>
                            }
                            <h5>Agent Count</h5>
                        </div>
                        <div className='round_shape'></div>
                    </div>
                    </div>
                    
                </div>
                </div>
            </section>

            <section className='graph_sec comman_top'>
                <div className="row">
                    <div className="col-lg-9 col-md-8 box_style_main">
                        <div className="box_style">
                            <div className="box_style_head">
                                <h2>Day on Day Calls</h2>
                            </div>
                            <div className="box_style_body">
                                {
                                    dashboardData && dashboardData.dodData && dashboardData.dodData.dates.length
                                    ?
                                    <DayOnDayGraph graphData={dashboardData.dodData}/>
                                    :
                                    <Typography variant='h5'>Loading...</Typography>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 box_style_main">
                        <div className="box_style">
                            <div className="box_style_head">
                                <h2>Title Here..</h2>
                            </div>
                            <div className="box_style_body">
                            Space for others Work
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 box_style_main">
                        <div className="box_style">
                            <div className="box_style_head">
                                <h2>Pareto Chart</h2>
                            </div>
                            <div className="box_style_body">
                                {
                                    dashboardData
                                    ?
                                    <ParetoChart paretoData={dashboardData.paretoInfo}/>
                                    :
                                    <Typography variant='h5'>Loading...</Typography>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 box_style_main">
                        <div className="box_style">
                            <div className="box_style_head">
                                <h2>Tags Score</h2>
                            </div>
                            <div className="box_style_body">
                                <div className="progress_area scrollbar_style">
                                    {
                                        dashboardData
                                        ?
                                        <TagScore tagScoresData = {dashboardData.tagScoresInfo}/>
                                        :
                                        <Typography variant='h5'>Loading...</Typography>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        
        </>
    )
}

export default Dashboard
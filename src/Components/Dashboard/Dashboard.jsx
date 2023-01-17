import React from 'react'
import {Loading} from 'react-loading-dot'
import { Skeleton, Typography } from '@mui/material'
import DayOnDayGraph from './DayOnDayGraph'
import ParetoChart from './ParetoChart'
import TagScore from './TagScore'

const Dashboard = (props) => {

    const {analytics} = props

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
                        analytics
                        ?
                        <h3>{analytics.calls}</h3>
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
                        analytics
                        ?
                        <h3>{analytics.qualityScore?analytics.qualityScore:0}%</h3>
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
                        analytics
                        ?
                        <h3>{analytics.averageHandlingTime}</h3>
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
                        analytics
                        ?
                        <h3>{analytics.agentCount}</h3>
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
                            analytics
                            ?
                            <DayOnDayGraph graphData={analytics.dodData}/>
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
                            analytics
                            ?
                            <ParetoChart paretoData={analytics.paretoInfo}/>
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
                        <div className="progress_area">
                            {
                                analytics
                                ?
                                <TagScore tagScoresData = {analytics.tagScoresInfo}/>
                                :
                                <Typography variant='h5'>Loading...</Typography>
                            }
                            {/* <div className='progress_repeat'>
                                <div className='progress_name'><label htmlFor="">Opening</label></div>
                                <div className="progress tooltip_cus">
                                    <div className="progress-bar bg_green" style={{width: '96%'}}>96%</div>
                                    <div className='tooltip_data'>
                                        70/100
                                    </div>
                                </div>
                            </div>
                            <div className='progress_repeat'>
                                <div className='progress_name'><label htmlFor="">Opening</label></div>
                                <div className="progress tooltip_cus">
                                    <div className="progress-bar bg_green" style={{width: '80%'}}>80%</div>
                                    <div className='tooltip_data'>
                                        70/100
                                    </div>
                                </div>
                            </div>
                            <div className='progress_repeat'>
                                <div className='progress_name'><label htmlFor="">Opening</label></div>
                                <div className="progress tooltip_cus">
                                    <div className="progress-bar bg_green" style={{width: '70%'}}>70%</div>
                                    <div className='tooltip_data'>
                                        70/100
                                    </div>
                                </div>
                            </div>
                            <div className='progress_repeat'>
                                <div className='progress_name'><label htmlFor="">Opening</label></div>
                                <div className="progress tooltip_cus">
                                    <div className="progress-bar bg_green" style={{width: '50%'}}>50%</div>
                                    <div className='tooltip_data'>
                                        70/100
                                    </div>
                                </div>
                            </div>
                            <div className='progress_repeat'>
                                <div className='progress_name'><label htmlFor="">Opening</label></div>
                                <div className="progress tooltip_cus">
                                    <div className="progress-bar bg_light_blue" style={{width: '35%'}}>35%</div>
                                    <div className='tooltip_data'>
                                        35/100
                                    </div>
                                </div>
                            </div>
                            <div className='progress_repeat'>
                                <div className='progress_name'><label htmlFor="">Opening</label></div>
                                <div className="progress tooltip_cus">
                                    <div className="progress-bar bg_light_blue" style={{width: '30%'}}>30%</div>
                                    <div className='tooltip_data'>
                                        30/100
                                    </div>
                                </div>
                            </div>
                            <div className='progress_repeat'>
                                <div className='progress_name'><label htmlFor="">Opening</label></div>
                                <div className="progress tooltip_cus">
                                    <div className="progress-bar bg_light_blue" style={{width: '25%'}}>25%</div>
                                    <div className='tooltip_data'>
                                        20/100
                                    </div>
                                </div>
                            </div> */}
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
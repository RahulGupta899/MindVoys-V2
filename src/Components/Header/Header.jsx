import React,{useState,useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import {
    AppBar,
    Toolbar,
    Drawer,
    Box
} from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import Filter from './Filter'
import {FilterContext} from './FilterContext'
import Footer from '../Footer/Footer'
import {API_EndPoints} from '../../Helper/API_EndPoints'


function Header({Children}){ 


    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    //FILTER STATES
    const [dateRange,setDateRange]              = useState([new Date(), new Date()])
    const [l2Manager, setL2Manager]             = useState([])
    const [l1Manager, setL1Manager]             = useState([])
    const [agentName, setAgentName]             = useState([])
    const [tenure, setTenure]                   = useState([])
    const [section, setSection]                 = useState([])
    const [tagName, setTagName]                 = useState([])
    const [callDuration,setCallDuration]        = useState([0,60])
    const [employeeDetails,setEmployeeDetails]  = useState(null)

    const [controller,setController]            = useState(null)     // FOR USE-EFFECT
    const [transController,setTransController]  = useState(false)    // Use effect to take care re-rendring in transcriptions page when apply filters                                                            // ATTACHED setController.analyticsBackup 
    
    //DASHBOARD STATES
    const [analytics,setAnalytics] = useState(null)


    // TASKS
    // 1. SEPARATE DASHBOARD SATES FROM HEADER
    // 2. APPLY FILTER WILL EXECUTE DURING MOUNTING OF COMPONENTS
    // 3. MAKE A CONTROLLER STATE FOR APPLY FILTERS THAT IDENTIFIES WHEN TO RE-RENDER COMPONENT



    










    // Memoize this function 
    const fetchDashBoardAnalytics = async()=>{
        setAnalytics(null)
        const {API_POST_calls_QS_AHT_AgentCount} = API_EndPoints
        const options = {dateRange,l2Manager,l1Manager,agentName,tenure,callDuration}
        const {data} = await axios.post(API_POST_calls_QS_AHT_AgentCount,options)
        console.log("Filtered Analytics: ",data)
        setAnalytics(data.analytics)
        
        // Logic to ATTACH the initial Dashboard Analytics to setController
        if(controller === null){
            setController.analyticsBackup = "DATA"
        }
        else if(setController.analyticsBackup === "DATA" ){
            setController.analyticsBackup = data.analytics
        }

        setController(true)
    }


    const value = {
        dateRange, setDateRange,
        l2Manager, setL2Manager,
        l1Manager, setL1Manager,
        agentName, setAgentName,
        tenure, setTenure,
        section, setSection, 
        tagName, setTagName,
        callDuration, setCallDuration,
        setIsDrawerOpen,
        employeeDetails,
        setAnalytics,
        fetchDashBoardAnalytics,
        controller,
        setController,
        transController,setTransController
    }
    // console.log("Filters: ",value)









    useEffect(() => {
        
      const {
        API_GET_OldestAndNewestDates,
        API_GET_EmployeeList
      } = API_EndPoints

      const fetchDates = async()=>{
        const {data} = await axios.get(API_GET_OldestAndNewestDates)
        const dates = data.dates
        const dateRanges = [new Date(dates[0]), new Date(dates[1])]
        setDateRange(dateRanges)
        setDateRange.backup = dateRanges          // ATTACHING INITIAL DATES FOR BACKUP
      }
      fetchDates()

      const fetchEmployees = async()=>{
        const {data} = await axios.get(API_GET_EmployeeList)
        const {employees,l2Managers} = data
        setEmployeeDetails({employees,l2Managers})
      }
      fetchEmployees()
    }, [])


    useEffect(()=>{
        fetchDashBoardAnalytics()
    },[controller])

    
    

    return(
        <>

            {/* APPBAR */}
            <AppBar className="nav_sec" id="sticky-wrap">
                <Toolbar className='nav_inner'>
                    <div className='logo_area'>
                       <NavLink> <img src="images/logo.png" alt="" /></NavLink>
                    </div>
                    <div className='nav_area'>
                        <ul>
                            <li>
                                <NavLink  to='/dashboard'>
                                    <span className='nav_item_icon'>
                                        <img src="images/menu_icon_dashboard.png" />
                                    </span>
                                    <span className='nav_name'>Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink  to='/scorecard'>
                                <span className='nav_item_icon'>
                                    <img src="images/menu_icon_scorecard.png" />
                                </span>
                                <span className='nav_name'>Scorecard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink  to='/transcriptions'>
                                <span className='nav_item_icon'>
                                    <img src="images/menu_icon_transcription.png" />
                                </span>
                                <span className='nav_name'>Transcriptions</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink  to='/configuration'>
                                    <span className='nav_item_icon'>
                                        <img src="images/menu_icon_config.png" />
                                    </span>
                                    <span className='nav_name'>Configuration</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className='header_right'>
                        <div className='filter_btn_box'  onClick={()=>{setIsDrawerOpen(true)}}>
                            <FilterAltIcon 
                                color='inherit'
                                sx={{marginRight:'3px'}}/>
                                Filter
                        </div>
                        <div className="logged_user">
                            <div className='logged_circle'>
                                <img src='images/user_img1.jpg' />
                            </div>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>


            {/* FILTER PANEL */}
            <Drawer
                anchor = 'right'
                open={isDrawerOpen}
                onClose = {()=> {setIsDrawerOpen(false)}}
                
            >
                <Box p={2} width="320px" textAlign='center' role='presentation'>
                    <FilterContext.Provider value={value}>
                        <Filter/>
                    </FilterContext.Provider>
                </Box>
            </Drawer>

            {/* Tab content */}
            <Box className="page_body">
                {React.cloneElement(Children,{analytics,value})}
            </Box>

            <Footer/>

        </>
    )
}


export default Header

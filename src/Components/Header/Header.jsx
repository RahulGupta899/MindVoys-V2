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

    // SIDE PANEL
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    // FILTER STATES
    const [dateRange,setDateRange]              = useState([new Date(), new Date()])
    const [l2Manager, setL2Manager]             = useState([])
    const [l1Manager, setL1Manager]             = useState([])
    const [agentName, setAgentName]             = useState([])
    const [tenure, setTenure]                   = useState([])
    const [section, setSection]                 = useState([])
    const [tagName, setTagName]                 = useState([])
    const [callDuration,setCallDuration]        = useState([0,60])
    const [employeeDetails,setEmployeeDetails]  = useState(null)

    // FILTER CONTROLLER (TO RE-RENDER COMPONENTS AFTER APPLYING FILTERS)                                                      
    const [filterController,setFilterController] = useState(false)

    // STATES IN SINGLE OBJECT
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
        filterController,setFilterController
    }


    // FETCH DEFAULT DATES AND EMPLOYEE DETAILS (INITIAL RENDER)
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
        setDateRange.backup = dateRanges          
        setFilterController((state)=>!state)        // UPDATE CONTROLLER (FILTER)
      }
      fetchDates()

      const fetchEmployees = async()=>{
        const {data} = await axios.get(API_GET_EmployeeList)
        const {employees,l2Managers} = data
        setEmployeeDetails({employees,l2Managers})
      }
      fetchEmployees()
    }, [])


    // JSX
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
                {React.cloneElement(Children,{value})}
            </Box>

            <Footer/>

        </>
    )
}


export default Header

/*
mindVoys: Speech Analytics application to track the performace of agents of a call center
progress: so as of now we have built the Dashboard page where the end user will have access to all the stats related to calls and 
          we have Transcription page - where user can see the list of all calls attended by the agents , also word or text searching is also there


        - we have started building this recently
        - Haven't made any authentication system
        - we are trying to first achieve the main part then we will moving on the users 
        



          */
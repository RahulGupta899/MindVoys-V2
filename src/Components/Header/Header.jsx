import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Stack,
    Button,
    Menu,
    MenuItem,
    Drawer,
    Box,
    TextField
} from '@mui/material'
import { CatchingPokemon } from '@mui/icons-material'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {useState} from 'react'
import {Link, NavLink} from 'react-router-dom'
import Filter from './Filter'
import {FilterContext} from './FilterContext'
import Test from './Test'
import Footer from '../Footer/Footer'

function Header({Children}){ 

    const [anchorEl, setAnchorEl] = useState(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)



    const open = Boolean(anchorEl)
    const handleClick = (e)=>{
        setAnchorEl(e.target)
    }
    const handleClose = ()=>{
        setAnchorEl(null)
    }



    //Filter states
    const [dateRange,setDateRange]          = useState([new Date(), new Date()])
    const [l2Manager, setL2Manager]         = useState([])
    const [l1Manager, setL1Manager]         = useState([])
    const [agentName, setAgentName]         = useState([])
    const [tenure, setTenure]               = useState([])
    const [section, setSection]             = useState([])
    const [tagName, setTagName]             = useState([])
    const [callDuration,setCallDuration]    = useState([20,38])
    const [age,setAge]                      = useState("")

    console.log("Call Duration: ",callDuration)

    const value = {
        dateRange, setDateRange,
        l2Manager, setL2Manager,
        l1Manager, setL1Manager,
        agentName, setAgentName,
        tenure, setTenure,
        section, setSection, 
        tagName, setTagName,
        callDuration, setCallDuration,
        age,setAge
    }
    console.log("Filter States: ",value)
    

    return(
        <>

            {/* <AppBar>
                <Toolbar>
                    <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                        <CatchingPokemon/>
                    </IconButton>
                    <Typography variant='h6' component='div' sx={{flexGrow:1}} >
                        MIND VOYS
                    </Typography>
                    <Stack direction='row' spacing={2}>
                        
                        <Button color='inherit'>
                            <NavLink  to='/dashboard' style={{color:'white',textDecoration:'none'}}>DashBoard</NavLink>
                        </Button>
                        <Button color='inherit'>
                            <NavLink  to='/scorecard' style={{color:'white',textDecoration:'none'}}>Scorecard</NavLink>
                        </Button>
                        <Button color='inherit'>
                            <NavLink  to='/transcriptions' style={{color:'white',textDecoration:'none'}}>Transcriptions</NavLink>
                        </Button>
                        <Button color='inherit'>
                            <NavLink  to='/configuration' style={{color:'white',textDecoration:'none'}}>Configuration</NavLink>
                        </Button>
                        
                        
                    </Stack>
                    <FilterAltIcon 
                            color='inherit'
                            onClick={()=>{setIsDrawerOpen(true)}}
                            sx={{marginLeft:'45px'}}
                    />
                    
                    
                </Toolbar>
            </AppBar> */}
            
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
                {Children}
            </Box>

            <Footer/>

        </>
    )
}
export default Header
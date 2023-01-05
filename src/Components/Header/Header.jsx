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

function Header({Children}){ 

    const [anchorEl, setAnchorEl] = useState(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [callDuration, setCallDuration] = useState(20)
    const open = Boolean(anchorEl)
    const handleClick = (e)=>{
        setAnchorEl(e.target)
    }
    const handleClose = ()=>{
        setAnchorEl(null)
    }

    return(
        <>
            <AppBar>
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
            </AppBar>

            <Drawer
                anchor = 'right'
                open={isDrawerOpen}
                onClose = {()=> {setIsDrawerOpen(false)}}
            >
                <Box p={2} width='250px' textAlign='center' role='presentation'>
                    <Typography variant='h6' component='div'>Side Panel</Typography>
                    <TextField value={callDuration} onChange={(e)=> {setCallDuration(e.target.value)}} />
                    <Button size='sm' onClick={handleClick}> Apply </Button>
                    <Typography disable sx={{marginTop:'30px'}} variant='body1'> Calls Should be Greater than <br/> {`${callDuration} mins`}</Typography>
                </Box>
            </Drawer>
            <Box sx={{margin:'500px'}}>
                {Children}
            </Box>
        </>
    )
}
export default Header
import React,{useContext} from 'react'
import { FilterContext } from './FilterContext'
import {
    Box,
    Typography,
    Stack,
    TextField,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    Select
} from '@mui/material'
import {DateRangePicker} from 'rsuite'
import RangePicker from './RangePicker'
import moment from 'moment'



const Filter = ()=>{
    const {
        dateRange,setDateRange,
        l1Manager,setL1Manager,
        l2Manager,setL2Manager,
        agentName,setAgentName,
        tenure, setTenure,
        section, setSection,
        tagName, setTagName,
        callDuration,
        age,setAge
    } = useContext(FilterContext)

    const handleDateRangeChange = (dates)=>{
        console.log("DATES: ",dates)
        setDateRange(dates)  
    }
    
    return(
        <Box>
            <Typography sx={{marginBottom: '30px'}}>Filter Search</Typography>
            <Stack spacing={2}>

                {/* DATEPICKER */}
                <DateRangePicker 
                    value={dateRange} 
                    onChange={handleDateRangeChange}
                    format = "yyyy-MM-dd"
                    renderValue={(value)=>{

                        const startDateMoment = moment(value[0]).format('DD-MMM-YYYY')
                        const endDateMoment = moment(value[1]).format('DD-MMM-YYYY')
                        

                        return `${startDateMoment} --- ${endDateMoment} `
                    }}
                />
                
                


                {/* L2 MANAGER */}
                <FormControl fullWidth>
                <InputLabel id="l2Manager">L2 Manager</InputLabel>
                <Select
                    multiple
                    labelId="l2Manager"
                    id="l2Manager"
                    value={l2Manager}
                    label="L2 Manager"
                    onChange={(e)=>{setL2Manager(e.target.value)}}
                >
                    <MenuItem value="Kiran Suryavansi">Kiran Suryavansi</MenuItem>
                    <MenuItem value="Anurag Bose">Anurag Bose</MenuItem>
                    <MenuItem value="Shreya Bask">Shreya Bask</MenuItem>
                    <MenuItem value="Hitesh Raj">Hitesh Raj</MenuItem>
                    <MenuItem value="Lata Sheikh">Lata Sheikh</MenuItem>
                </Select>
                </FormControl>

                {/* L1 MANAGER */}
                <FormControl fullWidth>
                <InputLabel id="l1Manager">L1 Manager</InputLabel>
                <Select
                    multiple
                    labelId="l1Manager"
                    id="l1Manager"
                    value={l1Manager}
                    label="L1 Manager"
                    onChange={(e)=>{setL1Manager(e.target.value)}}
                >
                    <MenuItem value="Hussain Verma">Hussain Verma</MenuItem>
                    <MenuItem value="Simran Deb">Simran Deb</MenuItem>
                    <MenuItem value="Rajay Bask">Rajay Bask</MenuItem>
                    <MenuItem value="Chirag Jaiswal">Chirag Jaiswal</MenuItem>
                    <MenuItem value="Anand Prakash">Anand Prakash</MenuItem>
                    <MenuItem value="Bipasha Bose">Bipasha Bose</MenuItem>
                    <MenuItem value="Rakesh Gupta">Rakesh Gupta</MenuItem>
                    <MenuItem value="Shikha Sharma">Shikha Sharma</MenuItem>
                </Select>
                </FormControl>

                {/* AGENT */}
                <FormControl fullWidth>
                <InputLabel id="agent">Agent</InputLabel>
                <Select
                    multiple
                    labelId="agent"
                    id="agent"
                    value={agentName}
                    label="Agent"
                    onChange={(e)=>{setAgentName(e.target.value)}}
                >
                    <MenuItem value="Shital Verma">Shital Verma</MenuItem>
                    <MenuItem value="Jay Deb">Jay Deb</MenuItem>
                    <MenuItem value="Rahul Gupta">Rahul Gupta</MenuItem>
                    <MenuItem value="Naman Ojha">Naman Ojha</MenuItem>
                    <MenuItem value="Meghna Sharma">Meghna Sharma</MenuItem>
                    <MenuItem value="Bipasha Verma">Bipasha Verma</MenuItem>
                    <MenuItem value="Ujwal Gupta"> Ujwal Gupta</MenuItem>
                    <MenuItem value="Denny Dale">Denny Dale</MenuItem>
                    <MenuItem value="Pooja Sharma">Pooja Sharma</MenuItem>
                    <MenuItem value="Tejas Verma">Tejas Verma</MenuItem>
                    <MenuItem value="Aditya Gupta">Aditya Gupta</MenuItem>
                    <MenuItem value="Kirtan Sharma">Kirtan Sharma</MenuItem>
                    <MenuItem value=" Sharma">Meghna Sharma</MenuItem>
                    <MenuItem value="ddk Verma">Bipasha Sha</MenuItem>
                    <MenuItem value="fjk Gupta">Pratap Gupta</MenuItem>
                    <MenuItem value="ddkf Dale">Siram Dale</MenuItem>
                    <MenuItem value="ji Sharma">Alka Sharma</MenuItem>
                    <MenuItem value="fida Verma">Shivani Verma</MenuItem>
                    <MenuItem value="hi Gupta">Preeti Gupta</MenuItem>
                    <MenuItem value="kim Sharma">Suresh Sharma</MenuItem>
                </Select>
                </FormControl>

                {/* TENURE */}
                <FormControl fullWidth>
                <InputLabel id="tenure">Tenure</InputLabel>
                <Select
                    multiple
                    labelId="tenure"
                    id="tenure"
                    value={tenure}
                    label="Tenure"
                    onChange={(e)=>{setTenure(e.target.value)}}
                >
                    <MenuItem value="0-30">0-30 Days</MenuItem>
                    <MenuItem value="31-60">31-60 Days</MenuItem>
                    <MenuItem value="61-90">61-90 Days</MenuItem>
                    <MenuItem value="91-180">91-180 Days</MenuItem>
                    <MenuItem value="181-270">181-270 Days</MenuItem>
                    <MenuItem value="271-365">271-365 Days</MenuItem>
                    <MenuItem value=">365">{`>365 Days`}</MenuItem>
                </Select>
                </FormControl> 

                <hr/> 
                {/* CALL DURATION */}
                <Box>
                    <Stack direction="row">
                        <Typography variant='body' sx={{marginRight:'15px'}}>Call Duration : </Typography>
                        <Typography variant='body'> {`${callDuration[0]} mins - ${callDuration[1]} mins`} </Typography>
                    </Stack>
                    <RangePicker/>
                </Box>
                <hr/>
                
                {/* SECTION */}
                
                <FormControl fullWidth>
                <InputLabel id="section">Section</InputLabel>
                <Select
                    multiple
                    labelId="section"
                    id="section"
                    value={section}
                    label="Section"
                    onChange={(e)=>{setSection(e.target.value)}}
                >
                    <MenuItem value="0-30">Opening</MenuItem>
                    <MenuItem value="31-60">Closing</MenuItem>
                    <MenuItem value="61-90">Greetings</MenuItem>
                    <MenuItem value="91-180">Bills</MenuItem>
                    <MenuItem value="181-270">Issues</MenuItem>
                    <MenuItem value="271-365">Access</MenuItem>
                </Select>
                </FormControl>  

                {/* TAG NAME */}
                <FormControl fullWidth>
                <InputLabel id="tagName">Tag Name</InputLabel>
                <Select
                    multiple
                    labelId="tagName"
                    id="tagName"
                    value={tagName}
                    label="Tag Name"
                    onChange={(e)=>{setTagName(e.target.value)}}
                >
                    <MenuItem value="0-30">Bank Cheque</MenuItem>
                    <MenuItem value="31-60">Transaction</MenuItem>
                    <MenuItem value="61-90">Legal</MenuItem>
                    <MenuItem value="91-180">Humble</MenuItem>
                    <MenuItem value="181-270">Digit</MenuItem>
                    <MenuItem value="1">Command</MenuItem>
                    <MenuItem value="2">Profession</MenuItem>
                    <MenuItem value="20">Week</MenuItem>
                    <MenuItem value="24">Racist</MenuItem>
                    <MenuItem value="5">Commercial</MenuItem>
                    <MenuItem value="4">Emotions</MenuItem>
                </Select>
                </FormControl> 

                {/* APPLY BUTTON */}
                <Button variant="contained">APPLY</Button>
                         
            
            </Stack>
        </Box>
    )
}

export default Filter
import React,{useContext} from 'react'
import { FilterContext } from './FilterContext'
import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Typography,
    Stack,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    Select
} from '@mui/material'
import RangePicker from './RangePicker'
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import {formatName} from '../../Helper/helper'



const Filter = ()=>{
    console.log("##### Filter component Re-render #####")
    
    const {
        dateRange,setDateRange,
        l1Manager,setL1Manager,
        l2Manager,setL2Manager,
        agentName,setAgentName,
        tenure, setTenure,
        section, setSection,
        tagName, setTagName,
        callDuration,setCallDuration,
        setIsDrawerOpen,
        employeeDetails,
        setAnalytics,
        setController,
        fetchDashBoardAnalytics
    } = useContext(FilterContext)

    // ON APPLY BUTTON
    const handleApplyFilters = ()=>{
        fetchDashBoardAnalytics()
        setIsDrawerOpen(false)
    }

    // ON CLEAR BUTTON
    const handleClearFilters = ()=>{
        setDateRange(setDateRange.backup)
        setL2Manager([])
        setL1Manager([])
        setAgentName([])
        setTenure([])
        setSection([])
        setTagName([])
        setCallDuration([0,60])
        setAnalytics(setController.analyticsBackup)
        setIsDrawerOpen(false)
    }

    return(
        <Box className='filter_form_style'>

            <div className='side_filter_head'>
                <h3>Filter Search</h3>
                <Button className='filter_apply_btn' color='error' variant="contained" onClick={handleClearFilters}>CLEAR</Button>
                <div className='f_close'><CloseIcon onClick={()=>{setIsDrawerOpen(false)}}/></div>
            </div>

            <Stack spacing={2}>
                
                {/* DATEPICKER */}
                <DateRangePicker 
                    value={dateRange} 
                    onChange={(dates)=>{setDateRange(dates)}}
                    format="dd-MM-y"
                    rangeDivider="~"
                />


                {/* L2 MANAGER */}
                <FormControl fullWidth>
                <InputLabel id="l2Manager">L2 Manager</InputLabel>
                <Select
                    className='form_control'
                    multiple
                    labelId="l2Manager"
                    id="l2Manager"
                    value={l2Manager}
                    label="L2 Manager"
                    onChange={(e)=>{setL2Manager(e.target.value)}}
                >
                    {   employeeDetails.l2Managers.length>0
                        &&
                        employeeDetails.l2Managers.map((item,idx)=>{
                            return <MenuItem value={item.l2SupervisorId+","+item.l2SupervisorName} key={idx}>{item.l2SupervisorName}</MenuItem>
                        })
                    }
                </Select>
                </FormControl>


                {/* L1 MANAGER */}
                <FormControl fullWidth>
                <InputLabel id="l1Manager">L1 Manager</InputLabel>
                <Select className='form_control'
                    multiple
                    labelId="l1Manager"
                    id="l1Manager"
                    value={l1Manager}
                    label="L1 Manager"
                    onChange={(e)=>{setL1Manager(e.target.value)}}
                >
                    {
                        (l2Manager.length>0)
                        ?
                            l2Manager.map((l2Supervisor)=>{
                                l2Supervisor = l2Supervisor.split(",");
                                const l2SupervisorId = l2Supervisor[0];
                                const l2SupervisorName = l2Supervisor[1];

                                const l1Supervisors = employeeDetails.employees[l2SupervisorId]
                                const data = l1Supervisors.map((item,idx)=>{
                                    return  <MenuItem value={item.l1SupervisorId+","+formatName(item.l1SupervisorName+"      ")} key={idx}>{item.l1SupervisorName}</MenuItem>
                                })
                                data.unshift(<Typography className='selected_title' variant='body' sx={{margin:'4px',background:'#dadce7'}}>Under L2 {formatName(l2SupervisorName)}</Typography>)
                                return data
                            })
                        :
                        <MenuItem>Select L2 Manager</MenuItem>
                    }
                </Select>
                </FormControl>

                {/* AGENT */}
                <FormControl fullWidth>
                <InputLabel id="agent">Agent</InputLabel>
                <Select className='form_control'
                    multiple
                    labelId="agent"
                    id="agent"
                    value={agentName}
                    label="Agent"
                    onChange={(e)=>{setAgentName(e.target.value)}}
                >
                    {
                        (l1Manager.length>0)
                        ?
                            l1Manager.map((l1Supervisor)=>{
                                l1Supervisor = l1Supervisor.split(",");
                                const l1SupervisorId = l1Supervisor[0];
                                const l1SupervisorName = l1Supervisor[1];

                                const agents = employeeDetails.employees[l1SupervisorId]
                                console.log("AGENTS: ",agents)
                                const data = agents.map((item,idx)=>{
                                    return  <MenuItem value={item.agentId+","+formatName(item.name)} key={idx}>{item.name}</MenuItem>
                                })
                                data.unshift(<Typography className='selected_title' variant='body' sx={{margin:'4px',background:'#dadce7'}}>Under L1 {formatName(l1SupervisorName)}</Typography>)
                                return data
                            })
                        :
                        <MenuItem>Select L1 Manager</MenuItem>
                    }
                </Select>
                </FormControl>

                {/* TENURE */}
                <FormControl fullWidth>
                <InputLabel id="tenure">Tenure</InputLabel>
                <Select className='form_control'
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

                {/* CALL DURATION */}
                <Box>
                    <Stack direction="row">
                        <Typography variant='body' sx={{marginRight:'15px'}}>Call Duration : </Typography>
                        <Typography variant='body'> {`${callDuration[0]} mins - ${callDuration[1]} mins`} </Typography>
                    </Stack>
                    <RangePicker/>
                </Box>

                {/* SECTION */}
                <FormControl fullWidth>
                <InputLabel disabled={true} id="section">Section</InputLabel>
                <Select className='form_control'
                    multiple
                    labelId="section"
                    id="section"
                    value={section}
                    label="Section"
                    onChange={(e)=>{setSection(e.target.value)}}
                    disabled={true}
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
                <InputLabel disabled={true} id="tagName">Tag Name</InputLabel>
                <Select className='form_control'
                    multiple
                    labelId="tagName"
                    id="tagName"
                    value={tagName}
                    label="Tag Name"
                    onChange={(e)=>{setTagName(e.target.value)}}
                    disabled={true}
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

                {/* BUTTON */}
                <Button className='blue_btn filter_apply_btn'  variant="contained" onClick={handleApplyFilters}>APPLY</Button>
                

            </Stack>
        </Box>
    )
}
export default Filter
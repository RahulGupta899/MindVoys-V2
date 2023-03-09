import React,{useState} from 'react'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import {ToggleButton,ToggleButtonGroup,Stack,Typography} from '@mui/material'

const ToggleButtons = () => {


    // For Exclusive
    const [formatExc,setFormatExc] = useState(null)

    function handleOnChangeExclusive(e,icon){
        setFormatExc(icon)
    }

  return (
    <div style={{marginBottom:'5px'}}>
        <Stack direction="row">
            <ToggleButtonGroup 
                value={formatExc} 
                onChange={handleOnChangeExclusive} 
                exclusive
                size="small"
                orientation="horizontal"
                color="primary"
            >
                <ToggleButton value='bold'>Agent</ToggleButton>
                <ToggleButton value='italic'>L1 Manager</ToggleButton>
                <ToggleButton value='underline'>L2 Manage</ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    </div>
  )
}

export default ToggleButtons
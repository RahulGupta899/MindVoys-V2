import React,{useContext} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {FilterContext} from './FilterContext'


const minDistance = 10;

function RangePicker() {
    
    const {callDuration, setCallDuration} = useContext(FilterContext)

  const handleRangeChange = (event, newValue, activeThumb) => {

    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setCallDuration([clamped, clamped + minDistance]);
      }else {
        const clamped = Math.max(newValue[1], minDistance);
        setCallDuration([clamped - minDistance, clamped]);
      }
    } else {
      setCallDuration(newValue);
    }
  };

  return (
    <Box sx={{ }}>
      
      <Slider
        max={60}
        value={callDuration}
        onChange={handleRangeChange}
        valueLabelDisplay="auto"
        disableSwap
      />
    </Box>
  );
}

export default RangePicker

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useState} from 'react'

function MuiAccordian(){

  const [expanded, setExpanded] = useState(null)
  function handleChange(isExpanded,panel){
      console.log("Handle Change Executed")
      console.log(isExpanded+": "+panel)

      if(isExpanded)      // If the req is to Expand(true) then set this
          setExpanded(panel)
      else                // If the req is to Close(false) then set it to null
          setExpanded(null)
      
      // Smarter way
      // setExpanded(isExpanded ? panel : null)
  }

  return(
      <div style={{marginTop:'50px'}}>
          <Accordion 
              expanded={expanded === 'panel1'}
              onChange={(e,isExpanded)=>handleChange(isExpanded,'panel1')}
          >
              <AccordionSummary
                  id='panel1-header'
                  expandIcon={<ExpandMoreIcon/>}
              >
                  <Typography variant='h6' >ITEM 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <hr />
                  <Typography variant='body1'>
                  Fugiat voluptate non laborum tempor duis ad. 
                  Quis sunt culpa in amet. Sunt ea ut ea
                  incididunt culpa aute. Laboris consectetur 
                  velit est eiusmod dolor</Typography>
              </AccordionDetails>
          </Accordion>

          <Accordion 
              expanded={expanded === 'panel2'}
              onChange={(e,isExpanded)=>handleChange(isExpanded,'panel2')}
          >
              <AccordionSummary
                  id='panel1-header'
                  expandIcon={<ExpandMoreIcon/>}
              >
                  <Typography variant='h6'>ITEM 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <hr/>
                  <Typography variant='body1'>
                  Fugiat voluptate non laborum tempor duis ad. 
                  Quis sunt culpa in amet. Sunt ea ut ea
                  incididunt culpa aute. Laboris consectetur 
                  velit est eiusmod dolor</Typography>
              </AccordionDetails>
          </Accordion>

          <Accordion 
              expanded={expanded === 'panel3'} 
              onChange={(e,isExpanded)=>handleChange(isExpanded,'panel3')}
          >
              <AccordionSummary
                  id='panel1-header'
                  expandIcon={<ExpandMoreIcon/>}
              >
                  <Typography variant='h6'>ITEM 3</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <hr/>
                  <Typography variant='body1'>
                  Fugiat voluptate non laborum tempor duis ad. 
                  Quis sunt culpa in amet. Sunt ea ut ea
                  incididunt culpa aute. Laboris consectetur 
                  velit est eiusmod dolor</Typography>
              </AccordionDetails>
          </Accordion>

          <Accordion 
              expanded={expanded === 'panel4'} 
              onChange={(e,isExpanded)=>handleChange(isExpanded,'panel4')}
          >
              <AccordionSummary
                  id='panel1-header'
                  expandIcon={<ExpandMoreIcon/>}
              >
                  <Typography variant='h6'>ITEM 4</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <hr/>
                  <Typography variant='body1'>
                  Fugiat voluptate non laborum tempor duis ad. 
                  Quis sunt culpa in amet. Sunt ea ut ea
                  incididunt culpa aute. Laboris consectetur 
                  velit est eiusmod dolor</Typography>
              </AccordionDetails>
          </Accordion>
      </div>
  )
}
export default MuiAccordian
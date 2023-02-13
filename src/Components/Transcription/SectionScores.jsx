import React,{useState} from 'react'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const SectionScores = ({jumpToText,sections})=>{

    // TO HANDLE THE SECTION ACCORDION
    const [expanded,setExpanded] = useState(null)
    const handleChange = (isExpanded,panel)=>{
        if(isExpanded) setExpanded(panel)
        else setExpanded(null)
    }

    // TO HANDLE THE TAG ACCORDION
    const [tagExpanded,setTagExpanded] = useState(null)
    const handleTagChange = (isExpanded,panel)=>{
        if(isExpanded) setTagExpanded(panel)
        else setTagExpanded(null)
    }

    return(
        <div>
            {
                sections &&
                sections.map((section)=>{
                    let sectionPercent = ((section.sectionObtained/section.sectionTotal)*100).toFixed(2)
                    sectionPercent = (sectionPercent === '0.00' ? 0 : sectionPercent)
                    // sectionPercent = (sectionPercent === '100.00' ? 100 : sectionPercent)
                    return(
                        <Accordion
                            expanded={expanded === section.sectionName}
                            onChange={(e,isExpanded)=>{handleChange(isExpanded,section.sectionName)}}
                            disableGutters={true}
                        >
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            sx={{background:'#f5f5f5'}}
                            >
                                <div  style={{display:'flex', justifyContent:'space-between', width:'100%'}}> 
                                <Typography vaiant="h6" 
                                    sx={{
                                        color:'#191992',
                                        fontWeight:'800', 
                                        marginRight:'100px',                            
                                    }}
                                >{section.sectionName}</Typography>
                                <Typography  sx={{color:'#56567a',fontSize:'15px'}}>{sectionPercent}%</Typography>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                {
                                    section.tags.map((tag)=>{
                                        const tagPercent = ((tag.obtained/tag.weightage)*100).toFixed(0)
                                        return(
                                            <Accordion
                                            expanded={tagExpanded === tag.tag}
                                            onChange={(e,isExpanded)=>{handleTagChange(isExpanded,tag.tag)}}
                                            disableGutters={true}
                                            >
                                                    <AccordionSummary
                                                        sx={{background:'#f5f5f5'}}
                                                        >
                                                            <div  style={{display:'flex', justifyContent:'space-between', width:'100%'}}> 
                                                            <Typography vaiant="subtitle" 
                                                                sx={{
                                                                    color:'#191992',
                                                                    fontWeight:'400'                           
                                                                }}
                                                            >{tag.tag}</Typography>
                                                            <Typography >{tagPercent}%</Typography>
                                                            </div>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            {   
                                                                tag.matches.map((item)=>{
                                                                    return  <div 
                                                                                className='matchedText'
                                                                                onClick={()=>{jumpToText(item.phraseTimeStamp)}} 
                                                                                style={{cursor:'pointer', color:'#000532', margin:'8px 3px'}}>
                                                                                     <span style={{color:'#05458f'}}>Time: </span> 
                                                                                     {` ${item.phraseText.substring(0,100)}... `} 
                                                                            </div>
                                                                })
                                                            }                                    
                                                        </AccordionDetails>
                                            </Accordion>
                                            )
                                    })
                                }
                            </AccordionDetails>
                        </Accordion>
                    )

                })

            }
        </div>
    )
}

export default SectionScores